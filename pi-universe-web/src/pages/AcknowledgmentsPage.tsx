/**
 * Merit Book Page (功德簿) - π Universe Web
 *  - 各聖地: visitors and donations for every sanctuary (tap one for its full merit book)
 *  - 我的紀錄: the user's own donations and rank (private; includes anonymous gifts)
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { apiClient } from '../api/ApiClient';
import { MyMerit, OverviewRow, giftWord, piAmount, shortDate } from '../merit/merit';
import { useI18n } from '../i18n/i18n';
import { sanctuaryName } from '../i18n/sanctuaries';

export default function AcknowledgmentsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const { tr, lang } = useI18n();
  const [overview, setOverview] = useState<OverviewRow[] | null>(null);
  const [mine, setMine] = useState<MyMerit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [o, m] = await Promise.all([apiClient.getMeritOverview(), apiClient.getMyMerit()]);
        if (o.success) setOverview(o.data as OverviewRow[]);
        else setError(o.error || tr('讀取失敗', 'Could not load'));
        if (m.success) setMine(m.data as MyMerit);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const totalAmount = (overview || []).reduce((a, r) => a + r.total_amount, 0);
  const todayVisits = (overview || []).reduce((a, r) => a + r.visits_today, 0);
  const myTotal = (mine?.sanctuaries || []).reduce((a, r) => a + r.total, 0);
  const typeOf: Record<number, string> = Object.fromEntries((overview || []).map((o) => [o.id, o.religion_type]));
  const visitsText = mine
    ? tr(
        `已參訪 ${mine.visits.total} 次・${mine.visits.sanctuaries} 個聖地`,
        `Visited ${mine.visits.total} time${mine.visits.total === 1 ? '' : 's'} · ${mine.visits.sanctuaries} sanctuar${mine.visits.sanctuaries === 1 ? 'y' : 'ies'}`
      )
    : '';

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 2, backgroundColor: '#F5E6D3', textAlign: 'center' }}>
        <Typography sx={{ fontSize: '2.2rem', fontWeight: 800, color: '#8B4513' }}>{tr('功德簿', 'Merit Book')}</Typography>
        <Typography sx={{ fontSize: '1.15rem', color: '#5a3a1a' }}>
          {tr(`全站累計 ${piAmount(totalAmount)}　·　今日參訪 ${todayVisits} 人`, `Total given ${piAmount(totalAmount)}  ·  Visitors today ${todayVisits}`)}
        </Typography>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" sx={{ mb: 2 }}>
        <Tab label={tr('各聖地', 'Sanctuaries')} sx={{ fontSize: '1.15rem' }} />
        <Tab label={tr('我的紀錄', 'My record')} sx={{ fontSize: '1.15rem' }} />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={1.5}>
          {(overview || []).map((r) => (
            <Grid size={12} key={r.id}>
              <Card sx={{ borderLeft: `6px solid ${r.color && r.color !== '#FFFFFF' ? r.color : '#8B4513'}` }}>
                <CardActionArea onClick={() => navigate(`/sanctuary/${r.id}`)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 1 }}>
                      <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        {r.icon} {sanctuaryName(r, lang)}
                      </Typography>
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#8B4513', whiteSpace: 'nowrap' }}>
                        {piAmount(r.total_amount)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '1.02rem', color: 'text.secondary', mt: 0.5 }}>
                      {tr(
                        `今日參訪 ${r.visits_today}・本月 ${r.visits_month}・累計 ${r.visits_total}`,
                        `Visitors: today ${r.visits_today} · this month ${r.visits_month} · all time ${r.visits_total}`
                      )}
                    </Typography>
                    <Typography sx={{ fontSize: '1.02rem', color: 'text.secondary' }}>
                      {tr(
                        `本月${giftWord(r.religion_type)} ${piAmount(r.month_amount)}・護持 ${r.donor_count} 人${r.ranking_enabled ? '' : '（不公開排名）'}`,
                        `This month ${piAmount(r.month_amount)} · ${r.donor_count} supporter${r.donor_count === 1 ? '' : 's'}${r.ranking_enabled ? '' : ' (no public ranking)'}`
                      )}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid size={12}>
            <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary' }}>{tr('點選聖地可看本月前十、累計前五十與最新芳名。', 'Tap a sanctuary to see its top 10 this month, top 50 of all time and latest donors.')}</Typography>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <>
          <Alert severity="info" sx={{ mb: 2, fontSize: '1.02rem' }}>
            {tr('這一頁只有您自己看得到，包含隱名的紀錄。', 'Only you can see this page, including your anonymous donations.')}
          </Alert>
          {!mine || mine.history.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.15rem' }}>{tr('您還沒有捐獻紀錄 🙏', 'You have not donated yet 🙏')}</Typography>
              {mine && (
                <Typography sx={{ mt: 1, color: 'text.secondary' }}>{visitsText}</Typography>
              )}
            </Paper>
          ) : (
            <>
              <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {tr('累計', 'Total')} <b>{piAmount(myTotal)}</b>・{tr(`${mine.history.length} 筆`, `${mine.history.length} gift${mine.history.length === 1 ? '' : 's'}`)}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{visitsText}</Typography>
              </Paper>

              <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1 }}>{tr('各聖地', 'By sanctuary')}</Typography>
              <Paper sx={{ mb: 2 }}>
                <List>
                  {mine.sanctuaries.map((r) => (
                    <ListItem key={r.sanctuary_id} secondaryAction={<Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{piAmount(r.total)}</Typography>}>
                      <ListItemText
                        primary={<Typography component="span" sx={{ fontSize: '1.15rem' }}>{r.icon} {sanctuaryName(r, lang)}</Typography>}
                        secondary={
                          lang === 'en'
                            ? `${r.times} time${r.times === 1 ? '' : 's'}${r.rank ? ` · rank #${r.rank} all time` : ''}`
                            : r.rank ? `${r.times} 次・累計排名第 ${r.rank} 名` : `${r.times} 次`
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1 }}>{tr('明細', 'Details')}</Typography>
              <Paper>
                <List>
                  {mine.history.map((h) => (
                    <ListItem key={h.id} secondaryAction={<Typography sx={{ fontSize: '1.1rem' }}>{piAmount(h.amount)}</Typography>}>
                      <ListItemText
                        primary={
                          <Typography component="span" sx={{ fontSize: '1.1rem' }}>
                            {h.icon} {sanctuaryName({ name: h.name, religion_type: typeOf[h.sanctuary_id] || '' }, lang)}{' '}
                            {h.is_anonymous && <Chip label={tr('隱名', 'Anonymous')} size="small" sx={{ ml: 0.5 }} />}
                          </Typography>
                        }
                        secondary={shortDate(h.created_at)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </>
          )}
        </>
      )}
    </Container>
  );
}
