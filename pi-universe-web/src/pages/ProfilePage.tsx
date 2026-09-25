/**
 * Profile Page - π Universe Web
 */

import { Container, Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import { useAuthStore } from '../stores/authStore';
import { useI18n } from '../i18n/i18n';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { tr, lang } = useI18n();

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: '#F5E6D3' }}>
        <Typography sx={{ fontSize: '2rem', fontWeight: 700 }}>{user?.username || tr('信眾', 'Visitor')}</Typography>
      </Paper>

      <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1 }}>{tr('個人資訊', 'My information')}</Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">{tr('Pi 帳號', 'Pi username')}</Typography>
              <Typography sx={{ fontSize: '1.1rem' }}>{user?.username || '-'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">{tr('加入日期', 'Member since')}</Typography>
              <Typography sx={{ fontSize: '1.1rem' }}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-TW') : '-'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
