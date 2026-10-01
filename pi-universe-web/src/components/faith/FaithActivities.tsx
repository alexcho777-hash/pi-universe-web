/**
 * "Practice & activities" and "Upcoming festivals" sections of a sanctuary page.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useI18n, localeOf } from '../../i18n/i18n';
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
import {
  DiJiZhuPanel,
  FortuneVaultPanel,
  IncensePanel,
  JossPaperPanel,
  MemorialPanel,
  OfferingsPanel,
  ShuoyiPanel,
} from './HomeAltar';
import { LampPanel } from './LampPanel';
import { WishVowPanel } from './WishVowPanel';
import { PantheonPanel } from './Pantheon';
import { ThanTaiInfoPanel, ThanTaiDayPanel } from './VietnameseFolk';
import {
  AngelusPanel,
  DeityOfDayPanel,
  GayatriPanel,
  GratitudePanel,
  LanternPanel,
  NamesPanel,
  OmamoriPanel,
  PrayerListPanel,
  PujaPanel,
  RamadanPanel,
  SaintPanel,
  StationsPanel,
  ThaiOfferingPanel,
  ThaiVisitPanel,
  TsukinamiPanel,
} from './MoreActivities';

interface Activity {
  key: string;
  icon: string;
  title: [string, string];
  minutes: [string, string];
  /** navigate instead of opening a panel */
  href?: string;
  soon?: boolean;
}

const HOME_ALTAR: Activity[] = [
  { key: 'incense', icon: '🪔', title: ['上香', 'Light incense'], minutes: ['亮到今晚 12 點', 'Burns until midnight'] },
  { key: 'offerings', icon: '🍊', title: ['供品', 'Offerings'], minutes: ['約 1 分鐘', 'About 1 min'] },
  { key: 'jossPaper', icon: '🏺', title: ['金爐燒金紙', 'Joss-paper furnace'], minutes: ['約 2 分鐘', 'About 2 min'] },
  { key: 'dijizhu', icon: '🏠', title: ['地基主提醒', '地基主 reminder'], minutes: ['自動倒數', 'Auto countdown'] },
  { key: 'shuoyi', icon: '🌕', title: ['初一十五提醒', '1st/15th reminder'], minutes: ['自動倒數', 'Auto countdown'] },
  { key: 'fortune', icon: '💰', title: ['補財庫', 'Fortune vault'], minutes: ['約 2 分鐘', 'About 2 min'] },
  { key: 'memorial', icon: '🕊️', title: ['忌日提醒', 'Memorial days'], minutes: ['跨裝置同步', 'Synced to your account'] },
];
const LAMP_ACTIVITY: Activity = { key: 'lamp', icon: '🏮', title: ['線上點燈', 'Light a lamp online'], minutes: ['3.14 π／一年', '3.14 π / year'] };

const VIETNAMESE_ALTAR: Activity[] = [
  { key: 'incense', icon: '🪔', title: ['上香', 'Light incense'], minutes: ['亮到今晚 12 點', 'Burns until midnight'] },
  { key: 'thantaiOfferings', icon: '🍊', title: ['供品', 'Offerings'], minutes: ['約 1 分鐘', 'About 1 min'] },
  { key: 'thantaiInfo', icon: '🪙', title: ['認識財神爺', 'About Thần Tài'], minutes: ['約 2 分鐘', 'About 2 min'] },
  { key: 'thantaiDay', icon: '📅', title: ['財神爺聖誕倒數', "Thần Tài's Day countdown"], minutes: ['自動倒數', 'Auto countdown'] },
  { key: 'shuoyi', icon: '🌕', title: ['初一十五提醒', '1st/15th reminder'], minutes: ['自動倒數', 'Auto countdown'] },
];

const ACTIVITIES: Record<string, Activity[]> = {
  buddhist: [
    { key: 'beads', icon: '📿', title: ['念佛計數', 'Recite the Buddha’s name'], minutes: ['約 5–10 分鐘', '5–10 min'] },
    LAMP_ACTIVITY,
    ...HOME_ALTAR,
  ],
  taiwan_folk: [
    { key: 'pantheon', icon: '🏯', title: ['眾神殿', 'Pantheon'], minutes: ['15 尊神明', '15 deities'] },
    { key: 'oracle', icon: '🎋', title: ['線上求籤', 'Temple oracle'], minutes: ['約 3 分鐘', 'About 3 min'], href: '/oracle' },
    { key: 'jiao', icon: '🌙', title: ['擲筊問事', 'Ask with moon blocks'], minutes: ['約 1 分鐘', 'About 1 min'] },
    LAMP_ACTIVITY,
    ...HOME_ALTAR,
  ],
  thai_four_face: [
    { key: 'wishvow', icon: '🛕', title: ['許願還願', 'Wish & fulfil'], minutes: ['免費許願', 'Free to wish'] },
    { key: 'thaiVisit', icon: '🧭', title: ['四面參拜順序', 'How to visit the four faces'], minutes: ['約 3 分鐘', 'About 3 min'] },
    { key: 'thaiOffer', icon: '🌼', title: ['上香獻花', 'Incense, candles & garlands'], minutes: ['約 2 分鐘', 'About 2 min'] },
    { key: 'candleThai', icon: '🕯️', title: ['點燭祈福', 'Light a candle'], minutes: ['亮到今晚 12 點', 'Burns until midnight'] },
  ],
  vietnamese_folk: VIETNAMESE_ALTAR,
  christian: [
    { key: 'verse', icon: '📖', title: ['每日經文', 'Verse of the day'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'prayer', icon: '🙏', title: ['主禱文與默禱', "Lord's Prayer & quiet prayer"], minutes: ['約 4 分鐘', 'About 4 min'] },
    { key: 'candleChristian', icon: '🕯️', title: ['點蠟燭祈禱', 'Light a prayer candle'], minutes: ['亮到今晚 12 點', 'Burns until midnight'] },
    { key: 'gratitude', icon: '📝', title: ['感恩日記', 'Gratitude journal'], minutes: ['每天三件', 'Three a day'] },
    { key: 'prayerList', icon: '🤲', title: ['代禱事項', 'Prayer list'], minutes: ['記錄與回顧', 'Keep and look back'] },
  ],
  catholic: [
    { key: 'rosary', icon: '📿', title: ['玫瑰經', 'Pray the Rosary'], minutes: ['約 20 分鐘', 'About 20 min'] },
    { key: 'candle', icon: '🕯️', title: ['點蠟燭祈禱', 'Light a prayer candle'], minutes: ['亮到今晚 12 點', 'Burns until midnight'] },
    { key: 'verse', icon: '📖', title: ['每日經文', 'Verse of the day'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'angelus', icon: '🔔', title: ['三鐘經', 'The Angelus'], minutes: ['約 3 分鐘', 'About 3 min'] },
    { key: 'stations', icon: '✝️', title: ['苦路十四處', 'Stations of the Cross'], minutes: ['約 15 分鐘', 'About 15 min'] },
    { key: 'saint', icon: '😇', title: ['今日聖人', 'Feast of the day'], minutes: ['約 1 分鐘', 'About 1 min'] },
  ],
  islamic: [
    { key: 'times', icon: '🕌', title: ['今日禮拜時間', "Today's prayer times"], minutes: ['即時計算', 'Calculated for you'] },
    { key: 'qibla', icon: '🧭', title: ['朝拜方向', 'Qibla direction'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'beads', icon: '📿', title: ['讚念（Tasbih）', 'Tasbih (dhikr)'], minutes: ['約 3 分鐘', 'About 3 min'] },
    { key: 'names99', icon: '✨', title: ['真主九十九尊名', 'The 99 Names'], minutes: ['每天一個', 'One a day'] },
    { key: 'ramadan', icon: '🌙', title: ['齋戒月倒數', 'Ramadan countdown'], minutes: ['自動倒數', 'Auto countdown'] },
  ],
  shinto: [
    { key: 'shrine', icon: '⛩️', title: ['參拜作法', 'How to visit a shrine'], minutes: ['約 2 分鐘', 'About 2 min'] },
    { key: 'ema', icon: '🪧', title: ['繪馬許願', 'Write an ema wish'], minutes: ['最多掛 20 個', 'Up to 20 wishes'] },
    { key: 'lantern', icon: '🏮', title: ['奉納燈籠', 'Offer a lantern'], minutes: ['亮到今晚 12 點', 'Burns until midnight'] },
    { key: 'omamori', icon: '🧧', title: ['御守', 'Omamori charms'], minutes: ['約 1 分鐘', 'About 1 min'] },
    { key: 'tsukinami', icon: '📅', title: ['月次祭提醒', 'Tsukinami-sai reminder'], minutes: ['每月 1 日、15 日', '1st & 15th monthly'] },
  ],
  hindu: [
    { key: 'beads', icon: '📿', title: ['108 念珠持咒', 'Japa mala (108)'], minutes: ['約 10 分鐘', 'About 10 min'] },
    { key: 'aarti', icon: '🪔', title: ['Aarti 獻燈', 'Aarti (offering light)'], minutes: ['約 2 分鐘', 'About 2 min'] },
    { key: 'gayatri', icon: '🕉️', title: ['Gayatri 咒語', 'Gayatri mantra'], minutes: ['108 遍一圈', '108 per round'] },
    { key: 'deityDay', icon: '🌺', title: ['今日守護神', 'Deity of the day'], minutes: ['依星期', 'By weekday'] },
    { key: 'puja', icon: '🍌', title: ['Puja 供奉步驟', 'Home puja steps'], minutes: ['約 10 分鐘', 'About 10 min'] },
  ],
};

export function FaithActivities({
  religionType,
  sanctuaryId,
  sanctuaryName,
}: {
  religionType: string;
  sanctuaryId: number;
  sanctuaryName: string;
}) {
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
      case 'lamp':
        return <LampPanel sanctuaryId={sanctuaryId} sanctuaryName={sanctuaryName} tr={tr} />;
      case 'incense':
        return <IncensePanel tr={tr} />;
      case 'offerings':
        return <OfferingsPanel tr={tr} />;
      case 'jossPaper':
        return <JossPaperPanel tr={tr} lang={lang} />;
      case 'dijizhu':
        return <DiJiZhuPanel tr={tr} />;
      case 'shuoyi':
        return <ShuoyiPanel tr={tr} />;
      case 'fortune':
        return <FortuneVaultPanel tr={tr} />;
      case 'memorial':
        return <MemorialPanel tr={tr} />;
      case 'wishvow':
        return <WishVowPanel sanctuaryId={sanctuaryId} sanctuaryName={sanctuaryName} />;
      case 'pantheon':
        return <PantheonPanel sanctuaryId={sanctuaryId} tr={tr} lang={lang} />;
      case 'thantaiOfferings':
        return <OfferingsPanel tr={tr} />;
      case 'thantaiInfo':
        return <ThanTaiInfoPanel />;
      case 'thantaiDay':
        return <ThanTaiDayPanel />;
      case 'thaiVisit':
        return <ThaiVisitPanel tr={tr} lang={lang} />;
      case 'thaiOffer':
        return <ThaiOfferingPanel tr={tr} lang={lang} />;
      case 'candleThai':
        return <CandlePanel tr={tr} scope="thai" />;
      case 'candleChristian':
        return <CandlePanel tr={tr} scope="christian" />;
      case 'gratitude':
        return <GratitudePanel tr={tr} lang={lang} />;
      case 'prayerList':
        return <PrayerListPanel tr={tr} />;
      case 'angelus':
        return <AngelusPanel tr={tr} lang={lang} />;
      case 'stations':
        return <StationsPanel tr={tr} lang={lang} />;
      case 'saint':
        return <SaintPanel tr={tr} lang={lang} />;
      case 'names99':
        return <NamesPanel tr={tr} lang={lang} />;
      case 'ramadan':
        return <RamadanPanel tr={tr} />;
      case 'lantern':
        return <LanternPanel tr={tr} />;
      case 'omamori':
        return <OmamoriPanel tr={tr} lang={lang} />;
      case 'tsukinami':
        return <TsukinamiPanel tr={tr} />;
      case 'gayatri':
        return <GayatriPanel tr={tr} lang={lang} />;
      case 'deityDay':
        return <DeityOfDayPanel tr={tr} lang={lang} />;
      case 'puja':
        return <PujaPanel tr={tr} lang={lang} />;
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
            lang === 'zh'
              ? `${f.date.getFullYear()}年${f.date.getMonth() + 1}月${f.date.getDate()}日（${'日一二三四五六'[f.date.getDay()]}）`
              : f.date.toLocaleDateString(localeOf(lang), { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
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
