/**
 * Settings Page - π Universe Web
 */

import { Container, Paper, Box, Typography, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useI18n } from '../i18n/i18n';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { lang, setLang, tr } = useI18n();

  const handleLogout = async () => {
    if (window.confirm(tr('確定要登出嗎？', 'Are you sure you want to sign out?'))) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 1.5 }}>{tr('設定', 'Settings')}</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: '1.1rem' }}>{tr('語言 Language', 'Language 語言')}</Typography>
          <ToggleButtonGroup exclusive value={lang} onChange={(_, v) => v && setLang(v)}>
            <ToggleButton value="zh" sx={{ fontSize: '1.05rem', px: 2.5 }}>
              中文
            </ToggleButton>
            <ToggleButton value="en" sx={{ fontSize: '1.05rem', px: 2.5 }}>
              English
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>

      <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 3, mb: 1 }}>{tr('隱私與安全', 'Privacy & security')}</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '1.05rem' }}>
          {tr(
            '您的修行紀錄與捐獻都安全儲存，不會分享給任何人。',
            'Your practice records and donations are stored securely and never shared.'
          )}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <a href={`/privacy-policy.html?lang=${lang}`}>{tr('隱私權政策', 'Privacy Policy')}</a>
          {' · '}
          <a href={`/terms.html?lang=${lang}`}>{tr('服務條款', 'Terms of Service')}</a>
        </Typography>
      </Paper>

      <Button variant="contained" color="error" fullWidth onClick={handleLogout} sx={{ mt: 3, fontSize: '1.05rem' }}>
        {tr('登出', 'Sign out')}
      </Button>
    </Container>
  );
}
