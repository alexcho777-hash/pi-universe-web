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

const TodayAlmanacCard = lazy(() => import('../components/TodayAlmanacCard'));

interface PracticeSummary {
  checkins: number;
  meditations: number;
  meditation_minutes: number;
  checked_in_today: boolean;
  donations: number;
  donated: number;
}

const RELIGION_LABEL: Record<string, string> = {
  buddhist: '佛教 Buddhist',
  christian: '基督教 Christian',
  catholic: '天主教 Catholic',
  islamic: '伊斯蘭教 Islamic',
  shinto: '神道 Shinto',
  hindu: '印度教 Hindu',
  taiwan_folk: '台灣民間信仰 Taiwanese Folk',
};

export default function HomePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
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
      setToast({ msg: r.message || '簽到成功', severity: r.data?.already ? 'info' : 'success' });
      loadSummary();
    } else {
      setToast({ msg: `簽到失敗：${r.error}`, severity: 'error' });
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
      setToast({ msg: `已記錄 ${minutes} 分鐘靜坐 🙏`, severity: 'success' });
      loadSummary();
    } else {
      setToast({ msg: `記錄失敗：${r.error}`, severity: 'error' });
    }
  };

  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 2 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary">載入中…（伺服器喚醒可能需要數十秒）</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Welcome Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 2, backgroundColor: '#F5E6D3' }}>
        <Typography sx={{ fontSize: { xs: '1.9rem', sm: '2.3rem' }, fontWeight: 800, color: '#8B4513', lineHeight: 1.3 }}>
          歡迎 {user?.username || '善信'} 蒞臨
        </Typography>
        <Typography sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' }, fontWeight: 700, color: '#5a3a1a' }}>π Universe 心靈聖地</Typography>
        {summary && (
          <Typography sx={{ mt: 1, color: '#5a3a1a', fontSize: '1.1rem' }}>
            簽到 {summary.checkins} 次 · 靜坐 {summary.meditation_minutes} 分鐘 · 捐獻 {summary.donated} π
          </Typography>
        )}
      </Paper>

      <Suspense fallback={null}>
        <TodayAlmanacCard />
      </Suspense>

      <Alert severity="warning" sx={{ mb: 2 }}>
        測試版：目前使用 Pi Testnet 的 Test-Pi，不是真的 Pi。
      </Alert>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Daily practice */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
          每日修行
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
                  {summary?.checked_in_today ? '今日已簽到 ✓' : '每日簽到 Daily Check-in'}
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  敲響晨鐘，開始美好的一天
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card>
              <CardContent>
                {meditationStart === null ? (
                  <Button variant="contained" fullWidth sx={{ backgroundColor: '#2563EB' }} onClick={startMeditation}>
                    開始靜坐 Start Meditation
                  </Button>
                ) : (
                  <Button variant="contained" fullWidth color="success" onClick={endMeditation}>
                    結束靜坐 {mmss(elapsed)}
                  </Button>
                )}
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {meditationStart === null ? '靜心片刻，結束時自動記錄' : '靜坐中…結束時按下按鈕'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Sanctuaries */}
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
          聖地一覽（{sanctuaries.length}）
        </Typography>
        <Grid container spacing={2}>
          {sanctuaries.map((sanctuary) => (
            <Grid size={12} key={sanctuary.id}>
              <Card elevation={1} sx={{ borderLeft: `6px solid ${sanctuary.color || '#D4AF37'}` }}>
                <CardContent>
                  <Typography variant="h6">
                    {sanctuary.icon} {sanctuary.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {RELIGION_LABEL[sanctuary.religion_type] || sanctuary.religion_type}
                  </Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>
                    {sanctuary.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#2563EB', fontSize: '1.05rem' }}
                      onClick={() => navigate(`/sanctuary/${sanctuary.id}`)}
                    >
                      進入參拜・功德簿
                    </Button>
                    <Button variant="outlined" sx={{ color: '#8B4513', borderColor: '#8B4513', fontSize: '1.05rem' }} onClick={() => setDonateTo(sanctuary)}>
                      捐獻 Pi
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
