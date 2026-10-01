/**
 * 今日農民曆 — compact card for the home page (loaded lazily with the almanac engine).
 */

import { Paper, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { japanDay, taiwanDay } from '../calendar/almanac';
import CalendarHealth from './CalendarHealth';
import { useI18n, tx } from '../i18n/i18n';
import { OBSERVANCE_EN, chongEn, lunarDateEn, yijiEn } from '../calendar/almanacEn';

const lunarMonthName = (m: string) => (m === '冬' ? '十一' : m === '臘' ? '十二' : m);

export default function TodayAlmanacCard() {
  const navigate = useNavigate();
  const now = new Date();
  const d = taiwanDay(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const color = d.huangDao ? '#2E7D32' : '#C62828';
  const { lang } = useI18n();
  const jp = japanDay(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const jpKyu = jp.kyureki.startsWith('旧暦') ? jp.kyureki : `旧暦${jp.kyureki}`;
  const jpInfo = (
    <Typography component="span" sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#8B4513' }}>
      日本の暦　<span style={{ color: jp.rokuyo === '大安' ? '#2E7D32' : jp.rokuyo === '仏滅' || jp.rokuyo === '赤口' ? '#C62828' : 'inherit' }}>{jp.rokuyo}</span>　{jpKyu}
    </Typography>
  );
  const jpButton = (
    <Button variant="outlined" onClick={() => navigate('/calendar?mode=jp')} sx={{ fontSize: '1.05rem' }}>
      日本の暦 →
    </Button>
  );
  // Chinese and Japanese readers get the almanac in its own characters; others get the English wording
  if (lang !== 'zh' && lang !== 'ja') {
    return (
      <>
        <CalendarHealth date={now} lang="en" />
        <Paper sx={{ p: 2.5, mb: 2, borderLeft: `6px solid ${color}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 800 }}>{tx("Today's almanac", lang)}</Typography>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color }}>{tx(d.huangDao ? 'Auspicious day' : 'Inauspicious day', lang)}</Typography>
          </Box>
          <Typography sx={{ fontSize: '1.15rem', color: '#8B4513', fontWeight: 700, mt: 0.5 }}>
            {lunarDateEn(d)} · {chongEn(d)}
          </Typography>
          <Box sx={{ mt: 0.3 }}>{jpInfo}</Box>
          {d.observances.map((o) => {
            const en = OBSERVANCE_EN[o.name];
            return (
              <Typography key={o.name} sx={{ fontSize: '1.05rem', mt: 0.5 }}>
                🙏 {en?.name || o.name}
                {en?.hint ? ` — ${en.hint}` : ''}
              </Typography>
            );
          })}
          <Typography sx={{ fontSize: '1.05rem', mt: 1 }}>
            <b style={{ color: '#2E7D32' }}>{tx('Good for', lang)}</b>　{d.yi.slice(0, 4).map(yijiEn).join(', ') || '—'}
          </Typography>
          <Typography sx={{ fontSize: '1.05rem' }}>
            <b style={{ color: '#C62828' }}>{tx('Avoid', lang)}</b>　{d.ji.slice(0, 4).map(yijiEn).join(', ') || '—'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1.5 }}>
            <Button variant="outlined" onClick={() => navigate('/calendar')} sx={{ fontSize: '1.05rem' }}>
              {tx('Full almanac & good-day finder →', lang)}
            </Button>
            {jpButton}
          </Box>
        </Paper>
      </>
    );
  }
  return (
    <>
    <CalendarHealth date={now} />
    <Paper sx={{ p: 2.5, mb: 2, borderLeft: `6px solid ${color}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 800 }}>{lang === 'ja' ? tx("Today's almanac", lang) : '今日農民曆'}</Typography>
        <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, color }}>
          {lang === 'ja' ? tx(d.huangDao ? 'Auspicious day' : 'Inauspicious day', lang) : d.huangDao ? '黃道吉日' : '黑道日'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 3, rowGap: 0.3, mt: 0.5 }}>
        <Typography sx={{ fontSize: '1.2rem', color: '#8B4513', fontWeight: 700 }}>
          農曆{lunarMonthName(d.lunarMonth)}月{d.lunarDay}　{d.chong}
        </Typography>
        {jpInfo}
      </Box>
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
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1.5 }}>
        <Button variant="outlined" onClick={() => navigate('/calendar')} sx={{ fontSize: '1.05rem' }}>
          {lang === 'ja' ? tx('Full almanac & good-day finder →', lang) : '查看完整農民曆・擇日 →'}
        </Button>
        {jpButton}
      </Box>
    </Paper>
    </>
  );
}
