/**
 * Auth Store - π Universe Web
 *
 * Two ways to log in, both verified by our backend with the Pi Platform API:
 *  - Pi Browser: Pi.authenticate() -> accessToken -> POST /api/users/sync
 *  - Other browsers: Pi Sign-In (OAuth) -> accessToken -> POST /api/users/pi-signin
 * The backend answers with a session token, sent on every request as
 * `Authorization: Bearer <token>` (see api/ApiClient.ts).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { apiClient, AUTH_STORAGE_KEY } from '../api/ApiClient';
import { isPiBrowser } from '../auth/piSignIn';

declare global {
  interface Window {
    Pi?: any;
  }
}

// Pi SDK callback for an unfinished payment from a previous session: the backend
// completes it (if the user already paid) or cancels it, so new payments aren't blocked.
const onIncompletePaymentFound = (payment: any) => {
  const paymentId = payment?.identifier;
  if (paymentId) {
    apiClient.handleIncompletePayment(paymentId).catch((err) =>
      console.error('Failed to resolve incomplete payment:', err)
    );
  }
};

// Pi.authenticate() only answers inside the Pi Browser. Wait briefly on page load,
// and longer when the user taps Login (time to read and approve Pi's consent dialog).
const PI_AUTH_TIMEOUT_ON_LOAD_MS = 8000;
const PI_AUTH_TIMEOUT_ON_LOGIN_MS = 60000;
const NOT_PI_BROWSER_MSG = '請在 Pi Browser 中開啟此網站以登入 (Please open this site in the Pi Browser to log in)';

// Only ever run one Pi.authenticate() at a time: if the automatic attempt on page
// load is still waiting, the Login button reuses it instead of starting a second one.
let pendingAuth: Promise<any> | null = null;

const authenticateWithTimeout = (timeoutMs: number): Promise<any> => {
  if (!pendingAuth) {
    pendingAuth = Promise.resolve()
      .then(() => window.Pi.authenticate(['username', 'payments'], onIncompletePaymentFound))
      .finally(() => {
        pendingAuth = null;
      });
  }
  return Promise.race([
    pendingAuth,
    new Promise((_, reject) => setTimeout(() => reject(new Error(NOT_PI_BROWSER_MSG)), timeoutMs)),
  ]);
};

type LoginEndpoint = '/api/users/sync' | '/api/users/pi-signin';

/** Exchange a Pi access token for our own session (the server verifies it with Pi). */
async function exchangePiToken(endpoint: LoginEndpoint, accessToken: string) {
  const response: any = await apiClient.post(endpoint, { accessToken });
  if (!response?.success || !response.data?.session_token) {
    throw new Error(response?.error || 'Pi 登入失敗 (login failed)');
  }
  const d = response.data;
  const user: User = {
    pi_uid: d.pi_uid,
    username: d.username,
    user_id: d.user_id,
    sanctuary_id: d.sanctuary_id,
    created_at: d.created_at,
  };
  return { user, sessionToken: d.session_token as string };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      sessionToken: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      initialize: async () => {
        // A login saved by an older version (no session token) is no longer valid.
        if (get().isAuthenticated && !get().sessionToken) {
          set({ user: null, isAuthenticated: false });
        }

        // Outside the Pi Browser, Pi.authenticate() never answers: keep any saved
        // session (e.g. from Pi Sign-In) instead of making the visitor wait.
        if (!window.Pi || !isPiBrowser()) {
          set({ isLoading: false });
          return;
        }

        try {
          set({ isLoading: true });
          const authResult = await authenticateWithTimeout(PI_AUTH_TIMEOUT_ON_LOAD_MS);
          if (authResult?.accessToken) {
            const { user, sessionToken } = await exchangePiToken('/api/users/sync', authResult.accessToken);
            set({ user, sessionToken, isAuthenticated: true, error: null });
          }
        } catch (err: any) {
          // Keep a still-valid saved session; otherwise show the login page.
          if (!get().sessionToken) set({ isAuthenticated: false });
          console.warn('Auto login skipped:', err?.message);
        } finally {
          set({ isLoading: false });
        }
      },

      login: async () => {
        try {
          set({ isLoading: true, error: null });
          if (!window.Pi) throw new Error(NOT_PI_BROWSER_MSG);

          const authResult = await authenticateWithTimeout(PI_AUTH_TIMEOUT_ON_LOGIN_MS);
          if (!authResult?.accessToken) throw new Error('Pi 登入失敗 (authentication failed)');

          const { user, sessionToken } = await exchangePiToken('/api/users/sync', authResult.accessToken);
          set({ user, sessionToken, isAuthenticated: true, error: null });
        } catch (err: any) {
          const errorMsg = err?.message || String(err) || 'Login failed';
          set({ error: errorMsg, isAuthenticated: false });
          throw new Error(errorMsg);
        } finally {
          set({ isLoading: false });
        }
      },

      // Pi Sign-In (ordinary browsers)
      signInWithPiToken: async (accessToken: string) => {
        set({ error: null });
        const { user, sessionToken } = await exchangePiToken('/api/users/pi-signin', accessToken);
        set({ user, sessionToken, isAuthenticated: true, error: null });
      },

      logout: async () => {
        try {
          await apiClient.post('/api/users/logout', {});
        } catch {
          /* the session is dropped locally either way */
        }
        set({ user: null, sessionToken: null, isAuthenticated: false, error: null, isLoading: false });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        sessionToken: state.sessionToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
