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
const onIncompletePaymentFound = (payment: any) => {
  console.warn('Incomplete Pi payment found:', payment?.identifier);
};

// Pi.authenticate() only resolves inside the Pi Browser. In any other browser it
// never answers, so we stop waiting after a timeout instead of spinning forever.
// Short wait on page load (outside the Pi Browser nothing will answer), but a long
// wait when the user taps Login, so there is time to read and approve Pi's consent dialog.
const PI_AUTH_TIMEOUT_ON_LOAD_MS = 8000;
const PI_AUTH_TIMEOUT_ON_LOGIN_MS = 60000;
const NOT_PI_BROWSER_MSG = '請在 Pi Browser 中開啟此網站以登入 (Please open this site in the Pi Browser to log in)';

const authenticateWithTimeout = (timeoutMs: number): Promise<any> =>
  Promise.race([
    window.Pi.authenticate(['username', 'payments'], onIncompletePaymentFound),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(NOT_PI_BROWSER_MSG)), timeoutMs)
    ),
  ]);

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
          const errorMsg = err.message || 'Login failed';
          set({
            error: errorMsg,
            isAuthenticated: false,
          });
          throw err;
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
