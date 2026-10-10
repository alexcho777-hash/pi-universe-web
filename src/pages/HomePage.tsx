/**
 * Home Page - π Universe Web
 * Daily practice (check-in, meditation) and sanctuary donations with Pi.
 */

import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import {
  Container,
  Paper,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { apiClient } from '../api/ApiClient';
import { Sanctuary } from '../types';
import DonateDialog from '../components/DonateDialog';
import { BrandLogo, BrandWordmark } from '../components/BrandLogo';
import CosmosGlobe from '../components/CosmosGlobe';
import { useI18n } from '../i18n/i18n';
import { sanctuaryName, sanctuaryDescription, faithName } from '../i18n/sanctuaries';
import { PREVIEW, DEMO_SANCTUARIES, DEMO_SUMMARY } from '../preview/demoData';
import heroPortal from '../assets/hero-portal.jpg';

const TodayAlmanacCard = lazy(() => import('../components/TodayAlmanacCard'));

interface PracticeSummary {
  checkins: number;
  meditations: number;
  meditation_minutes: number;
  checked_in_today: boolean;
  donations: number;
  donated: number;
}


export default function HomePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { tr, lang } = useI18n();
  const [sanctuaries, setSanctuaries] = useState<Sanctuary[]>([]);
  const [summary, setSummary] = useState<PracticeSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; severity: 'success' | 'info' | 'error' } | null>(null);
  const [checkingIn, setCheckingIn] = useState(false);

  // Meditation timer
  const [meditationStart, setMeditationStart] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Donation dialog
  const [donateTo, setDonateTo] = useState<Sanctuary | null>(null);

  useEffect(() => {
    loadAll();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const loadSummary = async () => {
    const r = await apiClient.getPracticeSummary();
    if (r.success && r.data) setSummary(r.data as PracticeSummary);
  };

  const loadAll = async () => {
    // Design preview (URL has "preview=1"): no backend, show demo data
    if (PREVIEW) {
      setSanctuaries(DEMO_SANCTUARIES as Sanctuary[]);
      setSummary(DEMO_SUMMARY);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiClient.getSanctuaries();
      if (response.success && response.data) {
        setSanctuaries(Array.isArray(response.data) ? (response.data as Sanctuary[]) : []);
      } else {
        setError(response.error || 'Failed to load sanctuaries');
      }
      await loadSummary();
    } catch (err: any) {
      setError(err.message || 'Error loading sanctuaries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDailyCheckIn = async () => {
    setCheckingIn(true);
    const r: any = await apiClient.dailyCheckIn();
    setCheckingIn(false);
    if (r.success) {
      setToast({
        msg: r.data?.already ? tr('今天已經簽到過了', 'You already checked in today') : tr('簽到成功，願你今天平安喜樂', 'Checked in — may your day be peaceful'),
        severity: r.data?.already ? 'info' : 'success',
      });
      loadSummary();
    } else {
      setToast({ msg: `${tr('簽到失敗', 'Check-in failed')}: ${r.error}`, severity: 'error' });
    }
  };

  const startMeditation = () => {
    const start = Date.now();
    setMeditationStart(start);
    setElapsed(0);
    timerRef.current = window.setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
  };

  const endMeditation = async () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    const minutes = Math.max(1, Math.round(elapsed / 60));
    setMeditationStart(null);
    const r: any = await apiClient.logMeditation(minutes);
    if (r.success) {
      setToast({ msg: tr(`已記錄 ${minutes} 分鐘靜坐 🙏`, `Recorded ${minutes} min of meditation 🙏`), severity: 'success' });
      loadSummary();
    } else {
      setToast({ msg: `${tr('記錄失敗', 'Could not save')}: ${r.error}`, severity: 'error' });
    }
  };

  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 2 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary">{tr('載入中…（伺服器喚醒可能需要數十秒）', 'Loading… (the server may take a few seconds to wake up)')}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Hero: the grand entrance — six faiths along one golden avenue */}
      <Box
        sx={{
          position: 'relative',
          mt: 3,
          mb: 2,
          borderRadius: 4,
          overflow: 'hidden',
          height: { xs: 320, sm: 400 },
          boxShadow: '0 10px 40px rgba(20,12,2,.45)',
        }}
      >
        {/* 慢推進：背景像走進去的鏡頭般緩慢放大 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroPortal})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transformOrigin: 'center',
            animation: 'pu-hero-zoom 36s ease-in-out infinite alternate',
          }}
        />
        {/* 薄雜杋動的霧光 */}
        <Box
          sx={{
            position: 'absolute',
            inset: '-12%',
            background: 'radial-gradient(ellipse at 50% 62%, rgba(255,240,200,.10), rgba(0,0,0,0) 62%)',
            animation: 'pu-hero-mist 22s ease-in-out infinite alternate',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            px: { xs: 3, sm: 4 },
            pb: { xs: 3, sm: 4 },
            background: 'linear-gradient(to top, rgba(8,6,3,.88) 0%, rgba(8,6,3,.38) 45%, rgba(8,6,3,.05) 75%)',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Noto Serif TC", serif',
              fontWeight: 900,
              color: '#f5d67b',
              fontSize: { xs: '2.2rem', sm: '3rem' },
              lineHeight: 1.15,
              textShadow: '0 2px 16px rgba(0,0,0,.65)',
            }}
          >
            {tr('十三聖地·一道場', 'Thirteen Sanctuaries, One Sacred Way')}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Noto Serif TC", serif',
              color: '#f2ead9',
              fontSize: { xs: '1.15rem', sm: '1.35rem' },
              mt: 0.5,
              textShadow: '0 1px 8px rgba(0,0,0,.6)',
            }}
          >
            {tr(
              `歡迎 ${user?.username || (PREVIEW ? '示範善信' : '善信')} 蒞臨·多元信仰心靈聖地`,
              `Welcome, ${user?.username || (PREVIEW ? 'guest' : 'friend')} · A home for many faiths`,
            )}
          </Typography>
          {summary && (
            <Typography sx={{ mt: 1, color: '#d8cdb6', fontSize: '1.02rem' }}>
              {tr(
                `簽到 ${summary.checkins} 次 · 靜坐 ${summary.meditation_minutes} 分鐘 · 捐獻 ${summary.donated} π`,
                `Check-ins ${summary.checkins} · Meditation ${summary.meditation_minutes} min · Donated ${summary.donated} π`,
              )}
            </Typography>
          )}
        </Box>
      </Box>

      {sanctuaries.length > 0 && (
        <CosmosGlobe sanctuaries={sanctuaries} lang={lang} onSelect={(sanctuary) => navigate(`/sanctuary/${sanctuary.id}`)} />
      )}

      <Suspense fallback={null}>
        <TodayAlmanacCard />
      </Suspense>

      <Alert severity="warning" sx={{ mb: 2 }}>
        {tr('測試版：目前使用 Pi Testnet 的 Test-Pi，不是真的 Pi。', 'Test version: payments use Test-Pi on the Pi Testnet, not real Pi.')}
      </Alert>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Daily practice */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Noto Serif TC", serif', color: '#f5d67b', fontWeight: 600 }}>
          {tr('每日修行', 'Daily practice')}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card>
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#D4AF37', color: '#000' }}
                  onClick={handleDailyCheckIn}
                  disabled={checkingIn || !!summary?.checked_in_today}
                >
                  {summary?.checked_in_today ? tr('今日已簽到 ✓', 'Checked in today ✓') : tr('每日簽到', 'Daily check-in')}
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {tr('敲響晨鐘，開始美好的一天', 'Ring the morning bell and start a good day')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card>
              <CardContent>
                {meditationStart === null ? (
                  <Button variant="contained" fullWidth sx={{ backgroundColor: '#D4AF37' }} onClick={startMeditation}>
                    {tr('開始靜坐', 'Start meditation')}
                  </Button>
                ) : (
                  <Button variant="contained" fullWidth color="success" onClick={endMeditation}>
                    {tr('結束靜坐', 'End meditation')} {mmss(elapsed)}
                  </Button>
                )}
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {meditationStart === null
                    ? tr('靜心片刻，結束時自動記錄', 'Sit quietly; the time is recorded when you finish')
                    : tr('靜坐中…結束時按下按鈕', 'Meditating… press the button when you finish')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Sanctuaries */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Noto Serif TC", serif', color: '#f5d67b', fontWeight: 600 }}>
          {tr('聖地一覽', 'Sanctuaries')}（{sanctuaries.length}）
        </Typography>
        <Grid container spacing={2}>
          {sanctuaries.map((sanctuary) => (
            <Grid size={12} key={sanctuary.id}>
              <Card
                elevation={2}
                sx={{
                  backgroundColor: '#17130d',
                  color: '#f2ead9',
                  border: '1px solid #3a2f1d',
                  borderLeft: `6px solid ${sanctuary.color || '#D4AF37'}`,
                  borderRadius: 3,
                  transition: 'transform .25s ease, box-shadow .25s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(20,12,2,.5)' },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: '"Noto Serif TC", serif', color: '#f5d67b', fontWeight: 700 }}
                  >
                    {sanctuary.icon} {sanctuaryName(sanctuary, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#c9a24b', letterSpacing: '.02em' }} gutterBottom>
                    {faithName(sanctuary.religion_type, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ my: 1, color: '#d8cdb6' }}>
                    {sanctuaryDescription(sanctuary, lang)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#D4AF37', color: '#241a08', fontSize: '1.05rem', fontWeight: 600, '&:hover': { backgroundColor: '#c9a24b' } }}
                      onClick={() => navigate(`/sanctuary/${sanctuary.id}`)}
                    >
                      {tr('進入參拜・功德簿', 'Enter · Merit book')}
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ color: '#f5d67b', borderColor: '#8a6f2a', fontSize: '1.05rem', '&:hover': { borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,.08)' } }}
                      onClick={() => setDonateTo(sanctuary)}
                    >
                      {tr('捐獻 Pi', 'Donate Pi')}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Donation dialog */}
      <DonateDialog
        sanctuary={donateTo}
        onClose={() => setDonateTo(null)}
        onResult={(r) => {
          setToast({ msg: r.message, severity: r.ok ? 'success' : r.cancelled ? 'info' : 'error' });
          if (r.ok) loadSummary();
        }}
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {toast ? (
          <Alert severity={toast.severity} onClose={() => setToast(null)} sx={{ width: '100%' }}>
            {toast.msg}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Container>
  );
}
