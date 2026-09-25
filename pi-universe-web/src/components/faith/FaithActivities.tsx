/**
 * "Practice & activities" and "Upcoming festivals" sections of a sanctuary page.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useI18n } from '../../i18n/i18n';
import { daysUntil, upcomingFestivals } from '../../faith/festivals';
import {
  AartiPanel,
  BeadCounter,
  CandlePanel,
  EmaPanel,
  JiaoPanel,
  PrayerPanel,
  PrayerTimesPanel,
  QiblaPanel,
  RosaryGuide,
  ShrinePanel,
  VersePanel,
} from './FaithTools';

interface Activity {
  key: string;
  icon: string;
  title: [string, string];
  minutes: [string, string];
  /** navigate instead of opening a panel */
  href?: string;
  soon?: boolean;
}

const ACTIVITIES: Record<string, Activity[]> = {
  buddhist: [
    { key: 'beads', icon: '📿', title: ['念佛計數', 'Recite the Buddha’s name'], minutes: ['約 5–10 分鐘', '5–10 min'] },
    { key: 'lamp', icon: '🪔', title: ['點光明燈', 'Light a blessing lamp'], minutes: ['即將推出', 'Coming soon'], soon: true },
  ],
  taiwan_folk: [
    { key: 'oracle', icon: '🎋', title: ['線上求籤', 'Temple oracle'], minutes: ['約 3 分鐘', 'About 3 min'], href: '/oracle' },
    { key: 'jiao', icon: '🌙', title: ['擲筊問事', 'Ask with moon blocks'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'lamp', icon: '🏮', title: ['點光明燈', 'Light a blessing lamp'], minutes: ['即將推出', 'Coming soon'], soon: true },
  ],
  christian: [
    { key: 'verse', icon: '📖', title: ['每日經文', 'Verse of the day'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'prayer', icon: '🙏', title: ['主禱文與默禱', "Lord's Prayer & quiet prayer"], minutes: ['約 4 分鐘', 'About 4 min'] },
  ],
  catholic: [
    { key: 'rosary', icon: '📿', title: ['玫瑰經', 'Pray the Rosary'], minutes: ['約 20 分鐘', 'About 20 min'] },
    { key: 'candle', icon: '🕯️', title: ['點蠟燭祈禱', 'Light a prayer candle'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'verse', icon: '📖', title: ['每日經文', 'Verse of the day'], minutes: ['約 1 分鐘', 'About 1 min'] },
  ],
  islamic: [
    { key: 'times', icon: '🕌', title: ['今日禮拜時間', "Today's prayer times"], minutes: ['即時計算', 'Calculated for you'] },
    { key: 'qibla', icon: '🧭', title: ['朝拜方向', 'Qibla direction'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'beads', icon: '📿', title: ['讚念（Tasbih）', 'Tasbih (dhikr)'], minutes: ['約 3 分鐘', 'About 3 min'] },
  ],
  shinto: [
    { key: 'shrine', icon: '⛩️', title: ['參拜作法', 'How to visit a shrine'], minutes: ['約 2 分鐘', 'About 2 min'] },
    { key: 'ema', icon: '🪧', title: ['繪馬許願', 'Write an ema wish'], minutes: ['約 1 分鐘', 'About 1 min'] },
  ],
  hindu: [
    { key: 'beads', icon: '📿', title: ['108 念珠持咒', 'Japa mala (108)'], minutes: ['約 10 分鐘', 'About 10 min'] },
    { key: 'aarti', icon: '🪔', title: ['Aarti 獻燈', 'Aarti (offering light)'], minutes: ['約 2 分鐘', 'About 2 min'] },
  ],
};

export function FaithActivities({ religionType, sanctuaryId }: { religionType: string; sanctuaryId: number }) {
  const { tr, lang } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState<Activity | null>(null);
  const list = ACTIVITIES[religionType] || [];
  if (list.length === 0) return null;

  const panel = (key: string) => {
    switch (key) {
      case 'beads':
        return <BeadCounter faith={religionType as 'buddhist' | 'hindu' | 'islamic'} lang={lang} tr={tr} />;
      case 'rosary':
        return <RosaryGuide lang={lang} tr={tr} />;
      case 'verse':
        return <VersePanel lang={lang} tr={tr} />;
      case 'prayer':
        return <PrayerPanel lang={lang} tr={tr} />;
      case 'candle':
        return <CandlePanel tr={tr} />;
      case 'times':
        return <PrayerTimesPanel lang={lang} tr={tr} />;
      case 'qibla':
        return <QiblaPanel lang={lang} tr={tr} />;
      case 'shrine':
        return <ShrinePanel lang={lang} tr={tr} />;
      case 'ema':
        return <EmaPanel tr={tr} />;
      case 'aarti':
        return <AartiPanel tr={tr} />;
      case 'jiao':
        return <JiaoPanel tr={tr} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{tr('修行與活動', 'Practice & activities')}</Typography>
      <Grid container spacing={1.5}>
        {list.map((a) => (
          <Grid size={{ xs: 6, sm: 4 }} key={a.key}>
            <Card sx={{ height: '100%', opacity: a.soon ? 0.55 : 1 }}>
              <CardActionArea
                disabled={a.soon}
                onClick={() => (a.href ? navigate(`${a.href}?sanctuary=${sanctuaryId}`) : setOpen(a))}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography sx={{ fontSize: '2.2rem', lineHeight: 1.2 }}>{a.icon}</Typography>
                  <Typography sx={{ fontSize: '1.08rem', fontWeight: 700, mt: 0.5 }}>{tr(a.title[0], a.title[1])}</Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{tr(a.minutes[0], a.minutes[1])}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!open} onClose={() => setOpen(null)} fullWidth maxWidth="sm" scroll="body">
        {open && (
          <>
            <DialogTitle sx={{ fontSize: '1.4rem', fontWeight: 800, pr: 6 }}>
              {open.icon} {tr(open.title[0], open.title[1])}
              <IconButton aria-label={tr('關閉', 'Close')} onClick={() => setOpen(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>{panel(open.key)}</DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export function FestivalList({ religionType }: { religionType: string }) {
  const { tr, lang } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const list = useMemo(() => upcomingFestivals(religionType), [religionType]);
  if (list.length === 0) return null;
  const shown = showAll ? list : list.slice(0, 5);
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{tr('近期節慶', 'Upcoming festivals')}</Typography>
      <Paper>
        {shown.map((f, i) => {
          const n = daysUntil(f.date);
          const dateText =
            lang === 'en'
              ? f.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
              : `${f.date.getFullYear()}年${f.date.getMonth() + 1}月${f.date.getDate()}日（${'日一二三四五六'[f.date.getDay()]}）`;
          return (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.6, borderTop: i ? '1px solid #eee' : 'none', bgcolor: n === 0 ? '#FFF6DD' : undefined }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '1.12rem', fontWeight: 700 }}>{tr(f.name[0], f.name[1])}</Typography>
                <Typography sx={{ fontSize: '0.98rem', color: 'text.secondary' }}>
                  {dateText}
                  {f.note ? ` · ${tr(f.note[0], f.note[1])}` : ''}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 64 }}>
                <Typography sx={{ fontSize: '1.35rem', fontWeight: 800, color: n === 0 ? '#C62828' : '#5B2A93' }}>{n === 0 ? tr('今天', 'Today') : n}</Typography>
                {n > 0 && <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{tr('天後', n === 1 ? 'day' : 'days')}</Typography>}
              </Box>
            </Box>
          );
        })}
      </Paper>
      {list.length > 5 && (
        <Button onClick={() => setShowAll(!showAll)} sx={{ mt: 1 }}>
          {showAll ? tr('收起', 'Show less') : tr(`顯示全部 ${list.length} 個節慶`, `Show all ${list.length} festivals`)}
        </Button>
      )}
    </Box>
  );
}
