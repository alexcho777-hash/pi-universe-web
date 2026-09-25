/**
 * Acknowledgments Page - π Universe Web
 * Totals, per-sanctuary donations and top donors (from GET /api/acknowledgments).
 */

import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import { apiClient } from '../api/ApiClient';

interface AckData {
  stats: {
    total_users: number;
    total_donations: number;
    total_donated_amount: number;
    total_donors: number;
    total_activities: number;
  };
  sanctuaries: { id: number; name: string; icon: string; total_donations: string; donor_count: string }[];
  topDonors: { username: string; donation_count: string; total_donated: string }[];
  activeContributors: { username: string; activity_count: string }[];
}

const pi = (v: string | number) => `${Math.round(Number(v || 0) * 100) / 100} π`;

export default function AcknowledgmentsPage() {
  const [data, setData] = useState<AckData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.getAcknowledgments();
        if (response.success) setData(response.data as AckData);
        else setError(response.error || '讀取失敗');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const stat = (label: string, value: string | number) => (
    <Grid size={{ xs: 4 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', px: 1 }}>
          <Typography variant="h6">{value}</Typography>
          <Typography variant="caption" color="textSecondary">
            {label}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: '#F5E6D3' }}>
        <Typography variant="h4" sx={{ color: '#8B4513' }}>
          感謝名單
        </Typography>
        <Typography variant="subtitle1">Honoring our donors and practitioners</Typography>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {data && (
        <>
          <Grid container spacing={1.5} sx={{ mb: 3 }}>
            {stat('總捐獻', pi(data.stats.total_donated_amount))}
            {stat('捐獻者', data.stats.total_donors)}
            {stat('修行者', data.stats.total_users)}
          </Grid>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            各聖地功德
          </Typography>
          <Paper sx={{ mb: 3 }}>
            <List dense>
              {data.sanctuaries.map((s) => (
                <ListItem key={s.id} secondaryAction={<Typography>{pi(s.total_donations)}</Typography>}>
                  <ListItemText primary={`${s.icon} ${s.name}`} secondary={`${s.donor_count} 位捐獻者`} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            功德榜
          </Typography>
          <Paper>
            {data.topDonors.length === 0 ? (
              <Typography sx={{ p: 2 }} color="textSecondary">
                還沒有捐獻，成為第一位護持者吧 🙏
              </Typography>
            ) : (
              <List dense>
                {data.topDonors.map((d, i) => (
                  <ListItem key={d.username} secondaryAction={<Typography>{pi(d.total_donated)}</Typography>}>
                    <ListItemText primary={`${i + 1}. ${d.username}`} secondary={`${d.donation_count} 次捐獻`} />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
}
