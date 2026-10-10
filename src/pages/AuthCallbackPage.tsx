/**
 * /auth/callback — Pi Sign-In redirects here with the access token in the URL fragment.
 */

import { useEffect, useRef, useState } from 'react';
import { Container, Paper, Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { readPiSignInResult } from '../auth/piSignIn';
import { useI18n } from '../i18n/i18n';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const signInWithPiToken = useAuthStore((s) => s.signInWithPiToken);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);
  const { tr } = useI18n();

  useEffect(() => {
    if (started.current) return; // React StrictMode runs effects twice in development
    started.current = true;

    const result = readPiSignInResult();
    // Remove the token from the address bar right away
    window.history.replaceState(null, '', '/auth/callback');

    if (!result.accessToken) {
      setError(result.error || tr('登入失敗', 'Sign-in failed'));
      return;
    }
    signInWithPiToken(result.accessToken)
      .then(() => navigate('/', { replace: true }))
      .catch((err: any) => setError(err?.message || tr('登入失敗', 'Sign-in failed')));
  }, [navigate, signInWithPiToken]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
          {error ? (
            <>
              <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
                {error}
              </Alert>
              <Button variant="contained" onClick={() => navigate('/login', { replace: true })}>
                {tr('回到登入頁', 'Back to sign-in')}
              </Button>
            </>
          ) : (
            <>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography sx={{ fontSize: '1.1rem' }}>{tr('正在以 Pi 帳號登入…', 'Signing in with Pi…')}</Typography>
              <Typography variant="body2" color="textSecondary">
                {tr('伺服器喚醒可能需要數十秒', 'The server may take a few seconds to wake up')}
              </Typography>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
