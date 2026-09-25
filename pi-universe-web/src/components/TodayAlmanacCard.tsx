/**
 * 今日農民曆 — compact card for the home page (loaded lazily with the almanac engine).
 */

import { Paper, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { taiwanDay } from '../calendar/almanac';

const lunarMonthName = (m: string) => (m === '冬' ? '十一' : m === '臘' ? '十二' : m);

export default function TodayAlmanacCard() {
  const navigate = useNavigate();
  const now = new Date();
  const d = taiwanDay(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const color = d.huangDao ? '#2E7D32' : '#C62828';
  return (
    <Paper sx={{ p: 2.5, mb: 2, borderLeft: `6px solid ${color}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 800 }}>今日農民曆</Typography>
        <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color }}>{d.huangDao ? '黃道吉日' : '黑道日'}</Typography>
      </Box>
      <Typography sx={{ fontSize: '1.2rem', color: '#8B4513', fontWeight: 700, mt: 0.5 }}>
        農曆{lunarMonthName(d.lunarMonth)}月{d.lunarDay}　{d.chong}
      </Typography>
      {d.observances.map((o) => (
        <Typography key={o.name} sx={{ fontSize: '1.1rem', mt: 0.5 }}>
          🙏 {o.name}
          {o.hint ? `：${o.hint}` : ''}
        </Typography>
      ))}
      <Typography sx={{ fontSize: '1.1rem', mt: 1 }}>
        <b style={{ color: '#2E7D32' }}>宜</b>　{d.yi.slice(0, 6).join('、') || '—'}
      </Typography>
      <Typography sx={{ fontSize: '1.1rem' }}>
        <b style={{ color: '#C62828' }}>忌</b>　{d.ji.slice(0, 6).join('、') || '—'}
      </Typography>
      <Button variant="outlined" onClick={() => navigate('/calendar')} sx={{ mt: 1.5, fontSize: '1.05rem' }}>
        查看完整農民曆・擇日 →
      </Button>
    </Paper>
  );
}
