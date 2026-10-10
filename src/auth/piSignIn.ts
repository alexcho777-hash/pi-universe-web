/**
 * "Sign in with Pi" (Pi Sign-In, OAuth implicit flow) for visitors in an ordinary browser.
 * Docs: https://github.com/pi-apps/pi-platform-docs/blob/master/pi-sign-in.md
 *
 * The client ID is a public identifier (there is no secret), so it can live in the frontend.
 * Pi Sign-In can only log people in; Pi payments still require the Pi Browser.
 */

import { trNow } from '../i18n/i18n';

export const PI_SIGNIN_CLIENT_ID =
  import.meta.env.VITE_PI_SIGNIN_CLIENT_ID || 'D7A9mJ-dSTDVnw6m0T6Xbe3W7V6WNqCpngnJcK62h3A';

const AUTHORIZE_URL = 'https://accounts.pinet.com/oauth/authorize';
const STATE_KEY = 'pi-signin-state';

/** Must exactly match a Redirect URI registered in the Pi Developer Portal. */
export const piSignInRedirectUri = () => `${window.location.origin}/auth/callback`;

/** True when running inside the Pi Browser (where Pi.authenticate() and payments work). */
export const isPiBrowser = () => /PiBrowser/i.test(navigator.userAgent);

export function startPiSignIn() {
  const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
  try {
    sessionStorage.setItem(STATE_KEY, state);
  } catch {
    /* storage unavailable: the server still verifies the token with Pi */
  }
  const params = new URLSearchParams({
    response_type: 'token',
    client_id: PI_SIGNIN_CLIENT_ID,
    redirect_uri: piSignInRedirectUri(),
    scope: 'username',
    state,
  });
  window.location.assign(`${AUTHORIZE_URL}?${params.toString()}`);
}

/** Read the result Pi put in the URL fragment after redirecting back to /auth/callback. */
export function readPiSignInResult(): { accessToken?: string; error?: string } {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const error = hash.get('error');
  if (error) return { error: hash.get('error_description') || error };

  const accessToken = hash.get('access_token') || undefined;
  const state = hash.get('state');
  let expected: string | null = null;
  try {
    expected = sessionStorage.getItem(STATE_KEY);
    sessionStorage.removeItem(STATE_KEY);
  } catch {
    /* ignore */
  }
  if (expected && state !== expected) return { error: trNow('登入狀態不符，請重新登入', 'Sign-in could not be verified, please sign in again') };
  if (!accessToken) return { error: trNow('沒有收到 Pi 登入憑證，請重新登入', 'No sign-in token was received from Pi, please try again') };
  return { accessToken };
}
