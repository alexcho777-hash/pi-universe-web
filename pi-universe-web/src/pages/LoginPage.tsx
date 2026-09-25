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
import { useI18n } from '../i18n/i18n';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const inPiBrowser = isPiBrowser();
  const { tr, lang } = useI18n();

  const handlePiBrowserLogin = async () => {
    try {
      setLoginError(null);
      await login();
      navigate('/');
    } catch (err: any) {
      setLoginError(err.message || tr('登入失敗', 'Sign-in failed'));
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
            <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
              {tr('多元信仰心靈聖地', 'A home for many faiths')}
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
                    {tr('登入中…', 'Signing in…')}
                  </>
                ) : (
                  tr('用 Pi 帳號登入', 'Sign in with Pi')
                )}
              </Button>
            ) : (
              <>
                <Button variant="contained" size="large" onClick={handlePiSignIn} disabled={busy} sx={buttonSx}>
                  {redirecting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                      {tr('前往 Pi 登入…', 'Opening Pi sign-in…')}
                    </>
                  ) : (
                    tr('用 Pi 帳號登入', 'Sign in with Pi')
                  )}
                </Button>
                <Alert severity="info" sx={{ fontSize: '1rem' }}>
                  {tr(
                    '一般瀏覽器可以登入、參拜、求籤與靜坐；捐獻 Pi 請用 Pi Browser 開啟本網站。',
                    'In a regular browser you can sign in, visit sanctuaries, draw oracle lots and meditate. To donate Pi, open this site in the Pi Browser.'
                  )}
                </Alert>
              </>
            )}

            <Button variant="outlined" size="large" href="/calendar" sx={{ fontSize: '1.05rem' }}>
              {tr('📅 查看今日農民曆・擇日（免登入）', "📅 Today's almanac & auspicious days (no sign-in)")}
            </Button>

            <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'center', mt: 1 }}>
              <a href={`/privacy-policy.html?lang=${lang}`}>{tr('隱私權政策', 'Privacy Policy')}</a>
              {' · '}
              <a href={`/terms.html?lang=${lang}`}>{tr('服務條款', 'Terms of Service')}</a>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
