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
import { SacredGlow } from '../oracle/OracleArt';
import { FaithActivities, FestivalList } from '../components/faith/FaithActivities';
import { BoardPanel } from '../components/faith/BoardPanel';
import { useI18n, Lang } from '../i18n/i18n';
import { sanctuaryDescription, sanctuaryName } from '../i18n/sanctuaries';
import {
  RankRow,
  RecentRow,
  SanctuaryMerit,
  VisitCounts,
  anonymousName,
  bookTitle,
  donateVerb,
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

function RankList({ rows, empty, lang }: { rows: RankRow[]; empty: string; lang: Lang }) {
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
                {medal(r.rank)} {r.anonymous ? anonymousName(lang) : r.name}
                {r.is_me ? (lang === 'en' ? ' (me)' : '（我）') : ''}
              </Typography>
            }
            secondary={lang === 'en' ? `${r.times} time${r.times === 1 ? '' : 's'}` : `${r.times} 次`}
          />
        </ListItem>
      ))}
    </List>
  );
}

function RecentList({ rows, empty, lang }: { rows: RecentRow[]; empty: string; lang: Lang }) {
  if (rows.length === 0) return <Typography sx={{ p: 2, color: 'text.secondary', fontSize: '1.05rem' }}>{empty}</Typography>;
  return (
    <List>
      {rows.map((r, i) => (
        <ListItem
          key={i}
          sx={{ backgroundColor: r.is_me ? '#FFF6DD' : undefined }}
          secondaryAction={<Typography sx={{ fontSize: '1.1rem' }}>{piAmount(r.amount)}</Typography>}
        >
          <ListItemText
            primary={<Typography component="span" sx={{ fontSize: '1.1rem' }}>{r.anonymous ? anonymousName(lang) : r.name}{r.is_me ? (lang === 'en' ? ' (me)' : '（我）') : ''}</Typography>}
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
  const { tr, lang } = useI18n();

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
    else setError(r.error || tr('讀取失敗', 'Could not load'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Typography color="textSecondary">{tr('載入中…（伺服器喚醒可能需要數十秒）', 'Loading… (the server may take a few seconds to wake up)')}</Typography>
      </Box>
    );
  }

  const s = merit?.sanctuary;
  const word = giftWord(s?.religion_type);
  const wordEn = giftWord(s?.religion_type, 'en');
  const name = sanctuaryName(s, lang);
  const description = sanctuaryDescription(s, lang);
  const visits = merit?.visits || visit?.visits;
  const color = s?.color && s.color !== '#FFFFFF' ? s.color : '#8B4513';
  // Glow color per faith (white-gold light for the Christian chapel)
  const glowHex = s?.color && s.color !== '#FFFFFF' ? s.color : '#F4D27A';
  const glowRgb = [1, 3, 5].map((i) => parseInt(glowHex.slice(i, i + 2), 16) || 200).join(',');

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 1, fontSize: '1.05rem' }}>
        {tr('回首頁', 'Home')}
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
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'relative', height: { xs: 110, sm: 130 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SacredGlow size={150} color={glowRgb} />
              <Typography sx={{ position: 'relative', fontSize: { xs: '3.4rem', sm: '4rem' }, lineHeight: 1.1 }}>{s.icon}</Typography>
            </Box>
            <Typography sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, fontWeight: 700, color: '#5a3a1a', mt: 1 }}>
              {tr(`歡迎 ${user?.username || '善信'} 蒞臨`, `Welcome, ${user?.username || 'friend'}, to the`)}
            </Typography>
            <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 800, color: '#8B4513' }}>{name}</Typography>
            {visit && (
              <Typography sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem' }, mt: 1.5, color: '#333' }}>
                {tr('您是今天第', 'You are visitor no.')}{' '}
                <Box component="span" sx={{ fontSize: { xs: '2.2rem', sm: '2.6rem' }, fontWeight: 800, color: '#C62828' }}>
                  {visit.visitor_number}
                </Box>{' '}
                {tr('位參訪者', 'today')}
              </Typography>
            )}
            {description && <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: '1.05rem' }}>{description}</Typography>}
          </Paper>

          {/* Visitor statistics */}
          {visits && (
            <>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{tr('參訪人數', 'Visitors')}</Typography>
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Stat label={tr('今日', 'Today')} value={visits.today} />
                <Stat label={tr('本月', 'This month')} value={visits.month} />
                <Stat label={tr('累計人次', 'All time')} value={visits.total} />
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
              {tr('🎋 線上求籤・每日 3 次免費', '🎋 Temple Oracle · 3 free draws a day')}
            </Button>
          )}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setDonating(true)}
            sx={{ backgroundColor: '#8B4513', fontSize: '1.25rem', py: 1.5, mb: 3 }}
          >
            🙏 {tr(`${word}護持 ${name}`, `${donateVerb(s.religion_type, 'en')} to the ${name}`)}
          </Button>

          <FaithActivities religionType={s.religion_type} sanctuaryId={s.id} sanctuaryName={name} />
          <FestivalList religionType={s.religion_type} />
          <BoardPanel religionType={s.religion_type} tr={tr} lang={lang} />

          {/* Merit book */}
          {merit && (
            <>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{bookTitle(s.religion_type, lang)}</Typography>
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Stat label={tr(`本月${word}`, `This month`)} value={piAmount(merit.totals.month_amount)} />
                <Stat label={tr(`累計${word}`, `All time`)} value={piAmount(merit.totals.total_amount)} />
                <Stat label={tr('護持人數', 'Supporters')} value={merit.totals.donor_count} />
              </Grid>

              {merit.ranking_enabled ? (
                <Paper>
                  <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
                    <Tab label={tr('本月前十', 'Top 10 this month')} sx={{ fontSize: '1.05rem' }} />
                    <Tab label={tr('累計前五十', 'Top 50 all time')} sx={{ fontSize: '1.05rem' }} />
                    <Tab label={tr('最新芳名', 'Latest')} sx={{ fontSize: '1.05rem' }} />
                  </Tabs>
                  {tab === 0 && (
                    <RankList lang={lang} rows={merit.monthly_top} empty={tr(`本月還沒有${word}，成為第一位護持者吧 🙏`, `No ${wordEn} yet this month — be the first to give 🙏`)} />
                  )}
                  {tab === 1 && <RankList lang={lang} rows={merit.all_time_top} empty={tr(`還沒有${word}紀錄`, `No ${wordEn} yet`)} />}
                  {tab === 2 && <RecentList lang={lang} rows={merit.recent} empty={tr(`還沒有${word}紀錄`, `No ${wordEn} yet`)} />}
                </Paper>
              ) : (
                <Alert severity="info" sx={{ fontSize: '1.05rem' }}>
                  {tr(
                    `依本信仰的精神，${word}不公開個人排名，只顯示總數。您的紀錄可在「功德簿 → 我的紀錄」查看。`,
                    `In keeping with this faith, individual ${wordEn} are not ranked; only totals are shown. You can see your own record under Merit → My record.`
                  )}
                </Alert>
              )}
              <Typography sx={{ mt: 1.5, fontSize: '0.95rem', color: 'text.secondary' }}>
                {tr(
                  `※ 參訪人數每人每天計一次，「今日」「本月」依您所在地的時間計算。勾選隱名的${word}只顯示「隱名善信」。`,
                  `※ Each person counts once per day; "today" and "this month" follow your local time. Anonymous ${wordEn} are shown as "${anonymousName('en')}".`
                )}
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
