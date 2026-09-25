/**
 * Auth Store - π Universe Web with Pi Network SDK
 * Uses Pi.authenticate() instead of JWT
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { apiClient } from '../api/ApiClient';

declare global {
  interface Window {
    Pi?: any;
  }
}

// Pi SDK callback: called if the user has an unfinished payment from a previous session
// The backend finishes it (if the user already paid) or cancels it, so new payments aren't blocked.
const onIncompletePaymentFound = (payment: any) => {
  const paymentId = payment?.identifier;
  console.warn('Incomplete Pi payment found:', paymentId);
  if (paymentId) {
    apiClient.handleIncompletePayment(paymentId).catch((err) =>
      console.error('Failed to resolve incomplete payment:', err)
    );
  }
};

// Pi.authenticate() only resolves inside the Pi Browser. In any other browser it
// never answers, so we stop waiting after a timeout instead of spinning forever.
// Short wait on page load (outside the Pi Browser nothing will answer), but a long
// wait when the user taps Login, so there is time to read and approve Pi's consent dialog.
const PI_AUTH_TIMEOUT_ON_LOAD_MS = 8000;
const PI_AUTH_TIMEOUT_ON_LOGIN_MS = 60000;
const NOT_PI_BROWSER_MSG = '請在 Pi Browser 中開啟此網站以登入 (Please open this site in the Pi Browser to log in)';

// ---- Diagnostics (temporary, for Testnet debugging) ------------------------
// This module loads before main.tsx calls Pi.init(), so we can record what
// happens with the Pi SDK and show it on screen when login fails.
const t0 = Date.now();
const diag: string[] = [];
const note = (msg: string) => {
  diag.push(`${((Date.now() - t0) / 1000).toFixed(1)}s ${msg}`);
  if (diag.length > 12) diag.shift();
};
note(`Pi SDK ${window.Pi ? 'loaded' : 'MISSING'}`);
note(`UA: ${navigator.userAgent.slice(-60)}`);
window.addEventListener('error', (e) => note(`JS error: ${e.message}`));
window.addEventListener('unhandledrejection', (e: any) =>
  note(`Unhandled: ${e?.reason?.message || String(e?.reason)}`)
);
if (window.Pi && typeof window.Pi.init === 'function') {
  const originalInit = window.Pi.init.bind(window.Pi);
  window.Pi.init = (opts: any) => {
    note(`Pi.init(${JSON.stringify(opts)})`);
    try {
      const r = originalInit(opts);
      if (r && typeof r.then === 'function') {
        r.then(() => note('Pi.init resolved')).catch((err: any) => note(`Pi.init rejected: ${err?.message || err}`));
      } else {
        note('Pi.init returned');
      }
      return r;
    } catch (err: any) {
      note(`Pi.init threw: ${err?.message || err}`);
      throw err;
    }
  };
}
const withDiag = (msg: string) => `${msg} ▸ [診斷] ${diag.join(' | ')}`;
// -----------------------------------------------------------------------------

// Only ever run one Pi.authenticate() at a time: if the automatic attempt on page
// load is still waiting, the Login button reuses it instead of starting a second one.
let pendingAuth: Promise<any> | null = null;

const authenticateWithTimeout = (timeoutMs: number): Promise<any> => {
  if (!pendingAuth) {
    note('Pi.authenticate() called');
    pendingAuth = Promise.resolve()
      .then(() => window.Pi.authenticate(['username', 'payments'], onIncompletePaymentFound))
      .then((res: any) => {
        note(`authenticate OK: ${res?.user?.username || '(no user)'}`);
        return res;
      })
      .catch((err: any) => {
        note(`authenticate error: ${err?.message || err}`);
        throw err;
      })
      .finally(() => {
        pendingAuth = null;
      });
  } else {
    note('reusing pending authenticate()');
  }
  return Promise.race([
    pendingAuth,
    new Promise((_, reject) =>
      setTimeout(() => {
        note(`no answer after ${timeoutMs / 1000}s`);
        reject(new Error(NOT_PI_BROWSER_MSG));
      }, timeoutMs)
    ),
  ]);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      initialize: async () => {
        try {
          set({ isLoading: true });

          // Check if Pi SDK is available
          if (!window.Pi) {
            console.warn('Pi SDK not loaded yet');
            set({ isLoading: false });
            return;
          }

          // Pi.authenticate() will prompt user if not logged in
          // Returns: { user: { uid, username }, accessToken, ... }
          const authResult = await authenticateWithTimeout(PI_AUTH_TIMEOUT_ON_LOAD_MS);

          if (authResult && authResult.user) {
            const piUser: User = {
              pi_uid: authResult.user.uid,
              username: authResult.user.username || `User_${authResult.user.uid.slice(0, 8)}`,
              user_id: authResult.user.uid,
            };

            // Register/sync user with backend
            try {
              const response = await apiClient.post('/api/users/sync', {
                pi_uid: piUser.pi_uid,
                username: piUser.username,
              });

              if (response?.data) {
                piUser.user_id = (response.data as any).user_id;
                piUser.sanctuary_id = (response.data as any).sanctuary_id;
                piUser.created_at = (response.data as any).created_at;
              }
            } catch (err) {
              console.error('Failed to sync user:', err);
            }

            set({
              user: piUser,
              isAuthenticated: true,
              error: null,
            });
          }
        } catch (err: any) {
          console.warn('Auth initialization:', err?.message);
          set({ isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (piUid?: string) => {
        try {
          set({ isLoading: true, error: null });

          if (!window.Pi) {
            throw new Error(NOT_PI_BROWSER_MSG);
          }

          // Trigger Pi authentication
          const authResult = await authenticateWithTimeout(PI_AUTH_TIMEOUT_ON_LOGIN_MS);

          if (!authResult?.user) {
            throw new Error('Authentication failed');
          }

          const piUser: User = {
            pi_uid: authResult.user.uid,
            username: authResult.user.username || `User_${authResult.user.uid.slice(0, 8)}`,
            user_id: authResult.user.uid,
          };

          // Sync with backend
          const response = await apiClient.post('/api/users/sync', {
            pi_uid: piUser.pi_uid,
            username: piUser.username,
          });

          if (response?.data) {
            piUser.user_id = (response.data as any).user_id;
            piUser.sanctuary_id = (response.data as any).sanctuary_id;
            piUser.created_at = (response.data as any).created_at;
          }

          set({
            user: piUser,
            isAuthenticated: true,
            error: null,
          });
        } catch (err: any) {
          const errorMsg = withDiag(err?.message || String(err) || 'Login failed');
          set({
            error: errorMsg,
            isAuthenticated: false,
          });
          throw new Error(errorMsg);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });

          if (window.Pi?.logout) {
            await window.Pi.logout();
          }

          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        } catch (err: any) {
          console.error('Logout error:', err);
          set({ error: err.message });
        } finally {
          set({ isLoading: false });
        }
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'pi-universe-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
