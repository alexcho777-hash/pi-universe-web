/**
 * Sanctuary Page - π Universe Web
 *
 * Opening a sanctuary records today's visit (once per person per day) and greets the
 * visitor in large text: "歡迎 ○○○ 蒞臨 …, 您是今天第 N 位參訪者".
 * Below: visitor statistics and the merit book (monthly top 10, all-time top 50,
 * latest 20). Christian and Islamic sanctuaries show totals only.
 */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { apiClient } from '../api/ApiClient';
import { useAuthStore } from '../stores/authStore';
import DonateDialog from '../components/DonateDialog';
import {
  RankRow,
  RecentRow,
  SanctuaryMerit,
  VisitCounts,
  bookTitle,
  giftWord,
  piAmount,
  shortDate,
} from '../merit/merit';

interface VisitResult {
  visitor_number: number;
  first_visit_today: boolean;
  visits: VisitCounts;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Grid size={{ xs: 4 }}>
      <Card variant="outlined" sx={{ height: '100%' }}>
        <CardContent sx={{ textAlign: 'center', px: 0.5, py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem' }, fontWeight: 700 }}>{value}</Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary' }}>{label}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const medal = (rank: number) => (rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`);

function RankList({ rows, empty }: { rows: RankRow[]; empty: string }) {
  if (rows.length === 0) return <Typography sx={{ p: 2, color: 'text.secondary', fontSize: '1.05rem' }}>{empty}</Typography>;
  return (
    <List>
      {rows.map((r) => (
        <ListItem
          key={`${r.rank}-${r.name}`}
          sx={{ backgroundColor: r.is_me ? '#FFF6DD' : undefined }}
          secondaryAction={<Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{piAmount(r.total)}</Typography>}
        >
          <ListItemText
            primary={
              <Typography component="span" sx={{ fontSize: '1.15rem' }}>
                {medal(r.rank)} {r.name}
                {r.is_me ? '（我）' : ''}
              </Typography>
            }
            secondary={`${r.times} 次`}
          />
        </ListItem>
      ))}
    </List>
  );
}

function RecentList({ rows, word }: { rows: RecentRow[]; word: string }) {
  if (rows.length === 0) return <Typography sx={{ p: 2, color: 'text.secondary', fontSize: '1.05rem' }}>還沒有{word}紀錄</Typography>;
  return (
    <List>
      {rows.map((r, i) => (
        <ListItem
          key={i}
          sx={{ backgroundColor: r.is_me ? '#FFF6DD' : undefined }}
          secondaryAction={<Typography sx={{ fontSize: '1.1rem' }}>{piAmount(r.amount)}</Typography>}
        >
          <ListItemText
            primary={<Typography component="span" sx={{ fontSize: '1.1rem' }}>{r.name}{r.is_me ? '（我）' : ''}</Typography>}
            secondary={shortDate(r.at)}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default function SanctuaryPage() {
  const { id } = useParams();
  const sanctuaryId = parseInt(id || '', 10);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [visit, setVisit] = useState<VisitResult | null>(null);
  const [merit, setMerit] = useState<SanctuaryMerit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [donating, setDonating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; severity: 'success' | 'info' | 'error' } | null>(null);

  const loadMerit = useCallback(async () => {
    const r = await apiClient.getSanctuaryMerit(sanctuaryId);
    if (r.success) setMerit(r.data as SanctuaryMerit);
    else setError(r.error || '讀取失敗');
  }, [sanctuaryId]);

  useEffect(() => {
    if (!Number.isFinite(sanctuaryId)) {
      navigate('/');
      return;
    }
    (async () => {
      setLoading(true);
      const v = await apiClient.visitSanctuary(sanctuaryId);
      if (v.success) setVisit(v.data as VisitResult);
      await loadMerit();
      setLoading(false);
    })();
  }, [sanctuaryId, navigate, loadMerit]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
        <CircularProgress />
        <Typography color="textSecondary">載入中…（伺服器喚醒可能需要數十秒）</Typography>
      </Box>
    );
  }

  const s = merit?.sanctuary;
  const word = giftWord(s?.religion_type);
  const visits = merit?.visits || visit?.visits;
  const color = s?.color && s.color !== '#FFFFFF' ? s.color : '#8B4513';

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1, fontSize: '1.05rem' }}>
        回首頁
      </Button>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {s && (
        <>
          {/* Big welcome */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, sm: 4 },
              mb: 2,
              textAlign: 'center',
              background: 'linear-gradient(180deg, #FFF8E7 0%, #F5E6D3 100%)',
              borderTop: `6px solid ${color}`,
            }}
          >
            <Typography sx={{ fontSize: { xs: '3rem', sm: '3.6rem' }, lineHeight: 1.1 }}>{s.icon}</Typography>
            <Typography sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, fontWeight: 700, color: '#5a3a1a', mt: 1 }}>
              歡迎 {user?.username || '善信'} 蒞臨
            </Typography>
            <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 800, color: '#8B4513' }}>{s.name}</Typography>
            {visit && (
              <Typography sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem' }, mt: 1.5, color: '#333' }}>
                您是今天第{' '}
                <Box component="span" sx={{ fontSize: { xs: '2.2rem', sm: '2.6rem' }, fontWeight: 800, color: '#C62828' }}>
                  {visit.visitor_number}
                </Box>{' '}
                位參訪者
              </Typography>
            )}
            {s.description && <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: '1.05rem' }}>{s.description}</Typography>}
          </Paper>

          {/* Visitor statistics */}
          {visits && (
            <>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>參訪人數</Typography>
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Stat label="今日" value={visits.today} />
                <Stat label="本月" value={visits.month} />
                <Stat label="累計人次" value={visits.total} />
              </Grid>
            </>
          )}

          {s.religion_type === 'taiwan_folk' && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate(`/oracle?sanctuary=${s.id}`)}
              sx={{
                background: 'linear-gradient(180deg,#B3261E,#6B0B0F)',
                color: '#F5D98B',
                border: '2px solid #E8C170',
                fontSize: '1.3rem',
                fontWeight: 800,
                py: 1.6,
                mb: 1.5,
                boxShadow: '0 0 18px rgba(232,193,112,.5)',
              }}
            >
              🎋 線上求籤・每日 3 次免費
            </Button>
          )}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setDonating(true)}
            sx={{ backgroundColor: '#8B4513', fontSize: '1.25rem', py: 1.5, mb: 3 }}
          >
            🙏 {word}護持 {s.name}
          </Button>

          {/* Merit book */}
          {merit && (
            <>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{bookTitle(s.religion_type)}</Typography>
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Stat label={`本月${word}`} value={piAmount(merit.totals.month_amount)} />
                <Stat label={`累計${word}`} value={piAmount(merit.totals.total_amount)} />
                <Stat label="護持人數" value={merit.totals.donor_count} />
              </Grid>

              {merit.ranking_enabled ? (
                <Paper>
                  <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
                    <Tab label="本月前十" sx={{ fontSize: '1.05rem' }} />
                    <Tab label="累計前五十" sx={{ fontSize: '1.05rem' }} />
                    <Tab label="最新芳名" sx={{ fontSize: '1.05rem' }} />
                  </Tabs>
                  {tab === 0 && <RankList rows={merit.monthly_top} empty={`本月還沒有${word}，成為第一位護持者吧 🙏`} />}
                  {tab === 1 && <RankList rows={merit.all_time_top} empty={`還沒有${word}紀錄`} />}
                  {tab === 2 && <RecentList rows={merit.recent} word={word} />}
                </Paper>
              ) : (
                <Alert severity="info" sx={{ fontSize: '1.05rem' }}>
                  依本信仰的精神，{word}不公開個人排名，只顯示總數。您的紀錄可在「功德簿 → 我的紀錄」查看。
                </Alert>
              )}
              <Typography sx={{ mt: 1.5, fontSize: '0.95rem', color: 'text.secondary' }}>
                ※ 參訪人數每人每天計一次，「今日」「本月」依您所在地的時間計算。勾選隱名的{word}只顯示「隱名善信」。
              </Typography>
            </>
          )}
        </>
      )}

      <DonateDialog
        sanctuary={donating && s ? s : null}
        onClose={() => setDonating(false)}
        onResult={(r) => {
          setToast({ msg: r.message, severity: r.ok ? 'success' : r.cancelled ? 'info' : 'error' });
          if (r.ok) loadMerit();
        }}
      />

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        {toast ? (
          <Alert severity={toast.severity} onClose={() => setToast(null)} sx={{ width: '100%', fontSize: '1.05rem' }}>
            {toast.msg}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Container>
  );
}
