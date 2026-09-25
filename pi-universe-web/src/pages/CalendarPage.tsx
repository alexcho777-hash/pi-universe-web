/**
 * 農民曆 / 日本の暦 — daily almanac, month view and good-day search.
 * Public page (no login needed). Large, high-contrast text for all ages.
 */

import { useMemo, useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import CalendarHealth from '../components/CalendarHealth';
import { useI18n, Lang } from '../i18n/i18n';
import {
  OBSERVANCE_EN,
  TIANSHEN_EN,
  ZHIXING_EN,
  JIEQI_EN,
  chongEn,
  directionEn,
  ganzhiEn,
  lunarDateEn,
  shaEn,
  yijiEn,
  zodiacEn,
} from '../calendar/almanacEn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  taiwanDay,
  japanDay,
  findGoodDays,
  ACTIVITIES,
  ZODIACS,
  ROKUYO_INFO,
  SENJITSU_INFO,
  SenjitsuKey,
  Rokuyo,
} from '../calendar/almanac';

type Mode = 'tw' | 'jp';

const WEEK_TW = ['日', '一', '二', '三', '四', '五', '六'];
const WEEK_JP = ['日', '月', '火', '水', '木', '金', '土'];
const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ACTIVITY_EN: Record<string, string> = {
  move: 'Moving house',
  wedding: 'Wedding',
  engage: 'Engagement',
  open: 'Opening a business',
  contract: 'Signing a contract',
  build: 'Construction',
  bed: 'Placing a new bed',
  travel: 'Travel',
  pray: 'Prayer & offerings',
  money: 'Receiving money',
};
const GOOD = '#2E7D32';
const BAD = '#C62828';
const GOLD = '#8B4513';

const pad = (n: number) => String(n).padStart(2, '0');
const toParts = (dt: Date) => [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()] as const;
const addDays = (dt: Date, n: number) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
/** 冬月/臘月 -> 十一月/十二月 for readability */
const lunarMonthName = (m: string) => (m === '冬' ? '十一' : m === '臘' ? '十二' : m);

export default function CalendarPage() {
  const [mode, setMode] = useState<Mode>(() => (navigator.language || '').toLowerCase().startsWith('ja') ? 'jp' : 'tw');
  const [date, setDate] = useState<Date>(() => new Date());
  const today = new Date();
  const { tr, lang } = useI18n();

  return (
    <Container maxWidth="md" sx={{ pt: 7, pb: 12 }}>
      <ToggleButtonGroup
        exclusive
        fullWidth
        value={mode}
        onChange={(_, v) => v && setMode(v)}
        sx={{ mb: 2, '& .MuiToggleButton-root': { fontSize: '1.1rem', py: 1.2, fontWeight: 700 } }}
      >
        <ToggleButton value="tw">{tr('台灣農民曆', 'Taiwanese Almanac')}</ToggleButton>
        <ToggleButton value="jp">{tr('日本の暦', '日本の暦 (Japan)')}</ToggleButton>
      </ToggleButtonGroup>

      {/* Date navigation */}
      <Paper sx={{ p: 1.5, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton aria-label="前一天" onClick={() => setDate(addDays(date, -1))} size="large">
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <TextField
            type="date"
            size="small"
            value={`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split('-').map(Number);
              if (y && m && d) setDate(new Date(y, m - 1, d));
            }}
            slotProps={{ htmlInput: { style: { fontSize: '1.1rem' } } }}
          />
        </Box>
        {!sameDay(date, today) && (
          <Button variant="outlined" onClick={() => setDate(new Date())} sx={{ fontSize: '1rem' }}>
            {mode === 'jp' ? '今日' : tr('今天', 'Today')}
          </Button>
        )}
        <IconButton aria-label="後一天" onClick={() => setDate(addDays(date, 1))} size="large">
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </Paper>

      <CalendarHealth date={date} lang={mode === 'jp' ? 'jp' : lang === 'en' ? 'en' : 'tw'} />
      {mode === 'tw' ? <TaiwanDayCard date={date} lang={lang} /> : <JapanDayCard date={date} />}
      <MonthGrid mode={mode} date={date} onPick={setDate} lang={lang} />
      {mode === 'tw' ? <TaiwanGoodDaySearch onPick={setDate} lang={lang} /> : <JapanLuckySearch onPick={setDate} />}

      <Typography sx={{ mt: 3, color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.8 }}>
        {mode === 'tw'
          ? tr(
              '※ 本農民曆依傳統曆法推算，各家農民曆的宜忌偶有差異，僅供參考。結婚、動土等重大事項，建議再請教專業擇日老師。',
              '※ This almanac is calculated with the traditional Chinese calendar. Almanacs differ slightly in their advice, so treat it as a reference. For weddings, construction and other big events, many families also consult a professional date selector.'
            )
          : '※ 暦注は伝統的な暦法に基づいて計算しています（旧暦は日本時間）。暦によって異なる場合があります。参考としてご利用ください。'}
      </Typography>
    </Container>
  );
}

// ---------------------------------------------------------------------------
function TaiwanDayCard({ date, lang }: { date: Date; lang: Lang }) {
  const d = useMemo(() => taiwanDay(...toParts(date)), [date]);
  const [y, m, dd] = toParts(date);
  if (lang === 'en') return <TaiwanDayCardEn date={date} />;
  return (
    <Paper sx={{ p: { xs: 2.5, sm: 3 }, mb: 2, borderTop: `6px solid ${d.huangDao ? GOOD : BAD}` }}>
      <Typography sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>
        國曆 {y}年{m}月{dd}日　星期{WEEK_TW[d.weekday]}
      </Typography>
      <Typography sx={{ fontSize: { xs: '2rem', sm: '2.4rem' }, fontWeight: 800, color: GOLD, lineHeight: 1.3, my: 0.5 }}>
        農曆 {lunarMonthName(d.lunarMonth)}月{d.lunarDay}
      </Typography>
      <Typography sx={{ fontSize: '1.15rem' }}>
        {d.lunarYear}年（{d.zodiac}年）　{d.dayGanZhi}日{d.jieQi ? `　今日${d.jieQi}` : ''}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
        <Box
          sx={{
            px: 2,
            py: 0.8,
            borderRadius: 2,
            bgcolor: d.huangDao ? GOOD : BAD,
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 800,
          }}
        >
          {d.huangDao ? '黃道吉日' : '黑道日'}
        </Box>
        <Typography sx={{ fontSize: '1.15rem' }}>
          值神 {d.tianShen}・建除 {d.zhiXing}
        </Typography>
      </Box>

      {d.observances.length > 0 && (
        <Box sx={{ mt: 2, p: 1.5, bgcolor: '#FFF8E1', borderRadius: 2 }}>
          {d.observances.map((o) => (
            <Typography key={o.name} sx={{ fontSize: '1.2rem', fontWeight: 700, color: GOLD }}>
              🙏 {o.name}
              {o.hint && <span style={{ fontWeight: 400, color: '#5a3a1a' }}>　{o.hint}</span>}
            </Typography>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 2.5 }}>
        <TermRow label="宜" color={GOOD} terms={d.yi} />
        <TermRow label="忌" color={BAD} terms={d.ji} />
      </Box>

      <Divider sx={{ my: 2 }} />
      <InfoGrid
        rows={[
          ['沖煞', `${d.chong}　${d.sha}`],
          ['喜神', d.xiShen],
          ['財神', d.caiShen],
          ['福神', d.fuShen],
          ['胎神', d.taiShen],
          ['彭祖百忌', d.pengZu.join('　')],
        ]}
      />
    </Paper>
  );
}

function TaiwanDayCardEn({ date }: { date: Date }) {
  const d = useMemo(() => taiwanDay(...toParts(date)), [date]);
  const gregorian = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <Paper sx={{ p: { xs: 2.5, sm: 3 }, mb: 2, borderTop: `6px solid ${d.huangDao ? GOOD : BAD}` }} lang="en">
      <Typography sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>{gregorian}</Typography>
      <Typography sx={{ fontSize: { xs: '1.7rem', sm: '2.1rem' }, fontWeight: 800, color: GOLD, lineHeight: 1.3, my: 0.5 }}>
        {lunarDateEn(d)}
      </Typography>
      <Typography sx={{ fontSize: '1.1rem' }} lang="zh-Hant">
        農曆 {lunarMonthName(d.lunarMonth)}月{d.lunarDay}
      </Typography>
      <Typography sx={{ fontSize: '1.1rem', mt: 0.5 }}>
        Year of the {zodiacEn(d.zodiac)} ({ganzhiEn(d.lunarYear)} {d.lunarYear}) · Day {ganzhiEn(d.dayGanZhi)} {d.dayGanZhi}
        {d.jieQi ? ` · Solar term: ${JIEQI_EN[d.jieQi] || d.jieQi} (${d.jieQi})` : ''}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
        <Box sx={{ px: 2, py: 0.8, borderRadius: 2, bgcolor: d.huangDao ? GOOD : BAD, color: '#fff', fontSize: '1.3rem', fontWeight: 800 }}>
          {d.huangDao ? 'Auspicious day' : 'Inauspicious day'}
        </Box>
        <Typography sx={{ fontSize: '1.05rem' }}>
          Day spirit: {TIANSHEN_EN[d.tianShen] || d.tianShen} ({d.tianShen}) · Day officer: {ZHIXING_EN[d.zhiXing] || d.zhiXing} ({d.zhiXing})
        </Typography>
      </Box>

      {d.observances.length > 0 && (
        <Box sx={{ mt: 2, p: 1.5, bgcolor: '#FFF8E1', borderRadius: 2 }}>
          {d.observances.map((o) => {
            const en = OBSERVANCE_EN[o.name];
            return (
              <Typography key={o.name} sx={{ fontSize: '1.15rem', fontWeight: 700, color: GOLD }}>
                🙏 {en?.name || o.name}
                {en?.hint && <span style={{ fontWeight: 400, color: '#5a3a1a' }}> — {en.hint}</span>}
              </Typography>
            );
          })}
        </Box>
      )}

      <Box sx={{ mt: 2.5 }}>
        <TermRow label="Good for" color={GOOD} terms={d.yi} en />
        <TermRow label="Avoid" color={BAD} terms={d.ji} en />
      </Box>

      <Divider sx={{ my: 2 }} />
      <InfoGrid
        rows={[
          ['Clash', `${chongEn(d)} · ${shaEn(d.sha)}`],
          ['God of Joy', directionEn(d.xiShen)],
          ['God of Wealth', directionEn(d.caiShen)],
          ['God of Fortune', directionEn(d.fuShen)],
        ]}
      />
      <Typography sx={{ mt: 1.5, fontSize: '0.95rem', color: 'text.secondary' }}>
        People born in the clashing zodiac year are advised to avoid big events on this day. The gods' directions are
        traditionally faced for luck.
      </Typography>
    </Paper>
  );
}

function TermRow({ label, color, terms, en }: { label: string; color: string; terms: string[]; en?: boolean }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'flex-start' }}>
      <Box
        sx={{
          minWidth: en ? 92 : 48,
          height: 48,
          px: en ? 1 : 0,
          borderRadius: en ? 24 : '50%',
          bgcolor: color,
          color: '#fff',
          fontSize: en ? '1rem' : '1.5rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {label}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 0.5 }}>
        {terms.length === 0 ? (
          <Typography sx={{ fontSize: '1.15rem' }}>—</Typography>
        ) : (
          terms.map((t) => (
            <Chip
              key={t}
              label={en ? `${yijiEn(t)} ${t}` : t}
              sx={{
                fontSize: en ? '1rem' : '1.1rem',
                height: en ? 'auto' : 36,
                minHeight: 36,
                py: en ? 0.5 : 0,
                color,
                borderColor: color,
                '& .MuiChip-label': { whiteSpace: en ? 'normal' : 'nowrap' },
              }}
              variant="outlined"
            />
          ))
        )}
      </Box>
    </Box>
  );
}

function InfoGrid({ rows }: { rows: [string, string][] }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 2, rowGap: 1 }}>
      {rows.map(([k, v]) => (
        <Box key={k} sx={{ display: 'contents' }}>
          <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary', whiteSpace: 'nowrap' }}>{k}</Typography>
          <Typography sx={{ fontSize: '1.1rem' }}>{v || '—'}</Typography>
        </Box>
      ))}
    </Box>
  );
}

// ---------------------------------------------------------------------------
function JapanDayCard({ date }: { date: Date }) {
  const d = useMemo(() => japanDay(...toParts(date)), [date]);
  const info = ROKUYO_INFO[d.rokuyo];
  const [y, m, dd] = toParts(date);
  const color = info.luck === 'good' ? GOOD : info.luck === 'bad' ? BAD : '#E65100';
  return (
    <Paper sx={{ p: { xs: 2.5, sm: 3 }, mb: 2, borderTop: `6px solid ${color}` }} lang="ja">
      <Typography sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>
        {y}年{m}月{dd}日（{WEEK_JP[d.weekday]}）
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap', my: 0.5 }}>
        <Typography sx={{ fontSize: { xs: '2.6rem', sm: '3rem' }, fontWeight: 800, color, lineHeight: 1.2 }}>
          {d.rokuyo}
        </Typography>
        <Typography sx={{ fontSize: '1.15rem', color: 'text.secondary' }}>{info.reading}</Typography>
      </Box>
      <Typography sx={{ fontSize: '1.2rem', mb: 1 }}>{info.note}</Typography>
      <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
        {d.kyureki}　干支：{d.eto}{d.jieQi ? `　二十四節気：${d.jieQi}` : ''}
      </Typography>

      <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        {d.senjitsu.length === 0 ? (
          <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>本日は特別な選日はありません</Typography>
        ) : (
          d.senjitsu.map((k) => <SenjitsuLine key={k} k={k} />)
        )}
      </Box>
    </Paper>
  );
}

function SenjitsuLine({ k }: { k: SenjitsuKey }) {
  const s = SENJITSU_INFO[k];
  const c = s.luck === 'good' ? GOOD : BAD;
  return (
    <Box sx={{ p: 1.5, borderRadius: 2, border: `2px solid ${c}`, bgcolor: s.luck === 'good' ? '#E8F5E9' : '#FFEBEE' }}>
      <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: c }}>
        {k}
        <span style={{ fontSize: '0.95rem', fontWeight: 400, marginLeft: 8 }}>{s.reading}</span>
      </Typography>
      <Typography sx={{ fontSize: '1.1rem' }}>{s.note}</Typography>
    </Box>
  );
}

// ---------------------------------------------------------------------------
function MonthGrid({ mode, date, onPick, lang }: { mode: Mode; date: Date; onPick: (d: Date) => void; lang: Lang }) {
  const en = mode === 'tw' && lang === 'en';
  const y = date.getFullYear();
  const m = date.getMonth();
  const first = new Date(y, m, 1);
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(first.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(y, m, i + 1)),
  ];
  const today = new Date();
  const week = mode === 'jp' ? WEEK_JP : en ? WEEK_EN : WEEK_TW;

  return (
    <Paper sx={{ p: 1.5, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <IconButton aria-label="上個月" onClick={() => onPick(new Date(y, m - 1, 1))}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>
          {en ? `${MONTH_EN[m]} ${y}` : `${y}年${m + 1}月`}
        </Typography>
        <IconButton aria-label="下個月" onClick={() => onPick(new Date(y, m + 1, 1))}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
        {week.map((w, i) => (
          <Typography key={w} sx={{ textAlign: 'center', fontWeight: 700, color: i === 0 ? BAD : 'text.secondary' }}>
            {w}
          </Typography>
        ))}
        {cells.map((c, i) => {
          if (!c) return <Box key={`e${i}`} />;
          const selected = sameDay(c, date);
          const isToday = sameDay(c, today);
          let top = '';
          let sub = '';
          let color = 'inherit';
          let mark = '';
          if (mode === 'tw') {
            const t = taiwanDay(...toParts(c));
            top = en
              ? t.lunarDayNumber === 1
                ? `M${lunarDateEn(t).match(/(\d+)\w\w month/)?.[1] || ''}`
                : String(t.lunarDayNumber)
              : t.lunarDayNumber === 1
                ? `${lunarMonthName(t.lunarMonth)}月`
                : t.lunarDay;
            sub = en ? (t.huangDao ? 'good' : 'bad') : t.huangDao ? '吉' : '凶';
            color = t.huangDao ? GOOD : BAD;
            mark = t.observances.some((o) => !['初一', '十五', '做牙'].includes(o.name)) ? '●' : '';
          } else {
            const j = japanDay(...toParts(c));
            top = j.rokuyo;
            color = j.rokuyo === '大安' ? GOOD : j.rokuyo === '仏滅' || j.rokuyo === '赤口' ? BAD : 'text.secondary';
            if (j.senjitsu.includes('天赦日')) sub = '天赦';
            else if (j.senjitsu.includes('一粒万倍日')) sub = '万倍';
            else if (j.senjitsu.includes('寅の日')) sub = '寅';
            else if (j.senjitsu.includes('己巳の日') || j.senjitsu.includes('巳の日')) sub = '巳';
          }
          return (
            <Box
              key={c.getDate()}
              onClick={() => onPick(c)}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                borderRadius: 1.5,
                py: 0.5,
                border: isToday ? `2px solid ${GOLD}` : '2px solid transparent',
                bgcolor: selected ? '#FFF3E0' : 'transparent',
              }}
            >
              <Typography sx={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3 }}>{c.getDate()}</Typography>
              <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.25, color }}>{top}</Typography>
              <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.25, color: GOLD, minHeight: '1.05rem' }}>
                {sub}
                {mark}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {en && (
        <Typography sx={{ mt: 1.5, fontSize: '0.95rem', color: 'text.secondary' }}>
          Under each date: the lunar day (M8 = first day of the 8th lunar month) and whether the day is good or bad. ● = festival
          or deity's birthday.
        </Typography>
      )}
    </Paper>
  );
}

// ---------------------------------------------------------------------------
function TaiwanGoodDaySearch({ onPick, lang }: { onPick: (d: Date) => void; lang: Lang }) {
  const en = lang === 'en';
  const tr = (zh: string, e: string) => (en ? e : zh);
  const [activity, setActivity] = useState('move');
  const [months, setMonths] = useState(3);
  const [zodiac, setZodiac] = useState('');
  const [huangDaoOnly, setHuangDaoOnly] = useState(false);
  const results = useMemo(
    () => findGoodDays(activity, new Date(), months * 30, { avoidZodiac: zodiac || undefined, huangDaoOnly }),
    [activity, months, zodiac, huangDaoOnly]
  );

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, mb: 1.5 }}>{tr('擇日查詢', 'Find an auspicious day')}</Typography>
      <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>{tr('想做什麼事？', 'What are you planning?')}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {ACTIVITIES.map((a) => (
          <Chip
            key={a.key}
            label={en ? ACTIVITY_EN[a.key] || a.label : a.label}
            onClick={() => setActivity(a.key)}
            color={activity === a.key ? 'primary' : 'default'}
            variant={activity === a.key ? 'filled' : 'outlined'}
            sx={{ fontSize: '1.05rem', height: 40 }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 1 }}>
        <TextField select label={tr('查詢範圍', 'Look ahead')} value={months} onChange={(e) => setMonths(Number(e.target.value))} sx={{ minWidth: 140 }}>
          <MenuItem value={1}>{tr('未來 1 個月', 'Next month')}</MenuItem>
          <MenuItem value={3}>{tr('未來 3 個月', 'Next 3 months')}</MenuItem>
          <MenuItem value={6}>{tr('未來 6 個月', 'Next 6 months')}</MenuItem>
        </TextField>
        <TextField select label={tr('您的生肖', 'Your zodiac sign')} value={zodiac} onChange={(e) => setZodiac(e.target.value)} sx={{ minWidth: 190 }}>
          <MenuItem value="">{tr('不指定（不避沖）', 'Any (no clash check)')}</MenuItem>
          {ZODIACS.map((z) => (
            <MenuItem key={z} value={z}>
              {en ? `${zodiacEn(z)} (${z})` : `屬${z}`}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={<Switch checked={huangDaoOnly} onChange={(e) => setHuangDaoOnly(e.target.checked)} />}
          label={<Typography sx={{ fontSize: '1.05rem' }}>{tr('只看黃道吉日', 'Auspicious days only')}</Typography>}
        />
      </Box>
      <Typography sx={{ fontSize: '1.1rem', my: 1.5, fontWeight: 700 }}>
        {tr(`找到 ${results.length} 個適合的日子`, `Found ${results.length} suitable day${results.length === 1 ? '' : 's'}`)}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {results.slice(0, 60).map((d) => {
          const [yy, mm, dd] = d.ymd.split('-').map(Number);
          return (
            <Box
              key={d.ymd}
              onClick={() => {
                onPick(new Date(yy, mm - 1, dd));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sx={{
                cursor: 'pointer',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                '&:hover': { bgcolor: '#FFF8E1' },
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {en ? `${WEEK_EN[d.weekday]}, ${MONTH_EN[mm - 1]} ${dd}` : `${mm}月${dd}日（${WEEK_TW[d.weekday]}）`}
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>
                  {en ? `${lunarDateEn(d)} · ${chongEn(d)}` : `農曆${lunarMonthName(d.lunarMonth)}月${d.lunarDay}　${d.chong}`}
                </Typography>
              </Box>
              <Chip
                label={d.huangDao ? tr('黃道', 'Auspicious') : tr('黑道', 'Ordinary')}
                sx={{ fontSize: '1rem', bgcolor: d.huangDao ? GOOD : '#9E9E9E', color: '#fff' }}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

// ---------------------------------------------------------------------------
type JpTarget = 'daian' | SenjitsuKey;
const JP_TARGETS: { key: JpTarget; label: string }[] = [
  { key: 'daian', label: '大安' },
  { key: '天赦日', label: '天赦日' },
  { key: '一粒万倍日', label: '一粒万倍日' },
  { key: '寅の日', label: '寅の日' },
  { key: '巳の日', label: '巳の日・己巳の日' },
];

function JapanLuckySearch({ onPick }: { onPick: (d: Date) => void }) {
  const [target, setTarget] = useState<JpTarget>('一粒万倍日');
  const [months, setMonths] = useState(3);
  const [avoidBad, setAvoidBad] = useState(true);
  const results = useMemo(() => {
    const out: { date: Date; rokuyo: Rokuyo; senjitsu: SenjitsuKey[] }[] = [];
    const start = new Date();
    for (let i = 0; i < months * 30; i++) {
      const dt = addDays(start, i);
      const j = japanDay(...toParts(dt));
      const hit =
        target === 'daian'
          ? j.rokuyo === '大安'
          : target === '巳の日'
            ? j.senjitsu.includes('巳の日') || j.senjitsu.includes('己巳の日')
            : j.senjitsu.includes(target);
      if (!hit) continue;
      if (avoidBad && (j.senjitsu.includes('不成就日') || j.senjitsu.includes('三隣亡'))) continue;
      out.push({ date: dt, rokuyo: j.rokuyo, senjitsu: j.senjitsu });
    }
    return out;
  }, [target, months, avoidBad]);

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 2 }} lang="ja">
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, mb: 1.5 }}>吉日検索</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {JP_TARGETS.map((t) => (
          <Chip
            key={t.key}
            label={t.label}
            onClick={() => setTarget(t.key)}
            color={target === t.key ? 'primary' : 'default'}
            variant={target === t.key ? 'filled' : 'outlined'}
            sx={{ fontSize: '1.05rem', height: 40 }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField select label="期間" value={months} onChange={(e) => setMonths(Number(e.target.value))} sx={{ minWidth: 140 }}>
          <MenuItem value={1}>1か月</MenuItem>
          <MenuItem value={3}>3か月</MenuItem>
          <MenuItem value={6}>6か月</MenuItem>
          <MenuItem value={12}>12か月</MenuItem>
        </TextField>
        <FormControlLabel
          control={<Switch checked={avoidBad} onChange={(e) => setAvoidBad(e.target.checked)} />}
          label={<Typography sx={{ fontSize: '1.05rem' }}>不成就日・三隣亡を除く</Typography>}
        />
      </Box>
      <Typography sx={{ fontSize: '1.1rem', my: 1.5, fontWeight: 700 }}>{results.length} 日見つかりました</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {results.map(({ date, rokuyo, senjitsu }) => (
          <Box
            key={date.toDateString()}
            onClick={() => {
              onPick(date);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            sx={{ cursor: 'pointer', p: 1.5, borderRadius: 2, border: '1px solid #ddd', '&:hover': { bgcolor: '#E8F5E9' } }}
          >
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {date.getMonth() + 1}月{date.getDate()}日（{WEEK_JP[date.getDay()]}）　{rokuyo}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>{senjitsu.join('・') || '—'}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
