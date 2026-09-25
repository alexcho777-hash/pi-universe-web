/**
 * Login Page - π Universe Web
 *
 * - In the Pi Browser: log in with the Pi SDK (Pi.authenticate); payments work.
 * - In any other browser: "Sign in with Pi" (Pi Sign-In, OAuth); login only, no payments.
 */

import { useState } from 'react';
import { Container, Paper, Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { isPiBrowser, startPiSignIn } from '../auth/piSignIn';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const inPiBrowser = isPiBrowser();

  const handlePiBrowserLogin = async () => {
    try {
      setLoginError(null);
      await login();
      navigate('/');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    }
  };

  const handlePiSignIn = () => {
    setRedirecting(true);
    startPiSignIn();
  };

  const busy = isLoading || redirecting;
  const buttonSx = { backgroundColor: '#2563EB', padding: '12px 24px', fontSize: '16px' };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#2563EB' }}>
              π Universe
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Multi-Sanctuary Faith Platform
            </Typography>
          </Box>

          {(loginError || error) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError || error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {inPiBrowser ? (
              <Button variant="contained" size="large" onClick={handlePiBrowserLogin} disabled={busy} sx={buttonSx}>
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                    登入中… Logging in
                  </>
                ) : (
                  '用 Pi 帳號登入 Login with Pi'
                )}
              </Button>
            ) : (
              <>
                <Button variant="contained" size="large" onClick={handlePiSignIn} disabled={busy} sx={buttonSx}>
                  {redirecting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      前往 Pi 登入… Redirecting
                    </>
                  ) : (
                    '用 Pi 帳號登入 Sign in with Pi'
                  )}
                </Button>
                <Alert severity="info">
                  一般瀏覽器可以登入、簽到與靜坐；捐獻 Pi 請用 <b>Pi Browser</b> 開啟本網站。
                  <br />
                  In a regular browser you can sign in, check in and meditate; to donate Pi, open this site in the Pi
                  Browser.
                </Alert>
              </>
            )}

            <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'center', mt: 1 }}>
              <a href="/privacy-policy.html">隱私權政策 Privacy</a>
              {' · '}
              <a href="/terms.html">服務條款 Terms</a>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
