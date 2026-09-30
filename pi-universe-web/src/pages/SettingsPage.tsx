/**
 * Settings Page - π Universe Web
 */

import { Container, Paper, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useI18n, Lang } from '../i18n/i18n';

const LANGS: [Lang, string][] = [
  ['zh', '中文'],
  ['en', 'English'],
  ['vi', 'Tiếng Việt'],
  ['th', 'ภาษาไทย'],
  ['ja', '日本語'],
  ['hi', 'हिन्दी'],
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { lang, setLang, tr, tr4 } = useI18n();

  const handleLogout = async () => {
    if (window.confirm(tr('確定要登出嗎？', 'Are you sure you want to sign out?'))) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 7, pb: 3 }}>
      <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 1.5 }}>{tr('設定', 'Settings')}</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '1.1rem', mb: 1.5 }}>
          {tr4('語言 Language', 'Language 語言', 'Ngôn ngữ · Language', 'ภาษา · Language')}
        </Typography>
        {/* Plain buttons (not a toggle group) so each one is easy to tap on any phone */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
          {LANGS.map(([value, label]) => (
            <Button
              key={value}
              variant={lang === value ? 'contained' : 'outlined'}
              onClick={() => setLang(value)}
              aria-pressed={lang === value}
              sx={{ fontSize: '1.05rem', py: 1.1, textTransform: 'none' }}
            >
              {label}
            </Button>
          ))}
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
