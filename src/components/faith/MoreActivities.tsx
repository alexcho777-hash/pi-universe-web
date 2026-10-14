/**
 * Extra activities so every faith has several things to do:
 *  Christian  — gratitude journal, prayer list
 *  Catholic   — Angelus, Stations of the Cross, feast of the day
 *  Islam      — 99 Names of God, Ramadan countdown
 *  Shinto     — votive lantern, omamori, tsukinami-sai reminder
 *  Hindu      — Gayatri mantra, deity of the day, home puja steps
 *  Thai       — how to pay respects at the four faces, incense/candle/garland offering
 * Everything is kept on this device only (localStorage) — nothing is sent to the server.
 */

import { ListenButton } from './ListenButton';
import { useMemo, useState } from 'react';
import { Alert, Box, Button, Chip, Divider, IconButton, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import { MalaRing, MALA_COLORS } from './MalaRing';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Lang, tx, localeOf } from '../../i18n/i18n';
import { ANGELUS, ANGELUS_PRAYER, FEASTS, GAYATRI, NAMES_99, STATIONS, STATION_ACCLAMATION } from '../../faith/moreTexts';
import { hijri } from '../../faith/festivals';
import { daysBetween } from '../../faith/homeAltar';
import { Flame } from './FaithTools';

type TR = (zh: string, en: string) => string;
type Pair = [string, string];

const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
};
const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};
/** Content text (prayers, names): Chinese for 中文, otherwise the English original */
const orig = (pair: Pair, lang: Lang) => (lang === 'zh' ? pair[0] : pair[1]);
/** Interface text given as a pair: Chinese, or English run through the VI/TH dictionary */
const ui = (pair: Pair, lang: Lang) => (lang === 'zh' ? pair[0] : tx(pair[1], lang));
const Big = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: '1.12rem', lineHeight: 1.8 }}>{children}</Typography>;

/** A simple one-step-at-a-time guide */
function StepGuide({ steps, tr, doneText, onDone }: { steps: { icon: string; title: string; body?: string; extra?: string }[]; tr: TR; doneText: string; onDone?: () => void }) {
  const [step, setStep] = useState(0);
  const done = step >= steps.length;
  const s = steps[Math.min(step, steps.length - 1)];
  return (
    <Box sx={{ textAlign: 'center' }}>
      <LinearProgress variant="determinate" value={(Math.min(step, steps.length) / steps.length) * 100} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
      {!done ? (
        <>
          <Typography sx={{ fontSize: '3rem', lineHeight: 1.2 }}>{s.icon}</Typography>
          <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>{tr(`第 ${step + 1} / ${steps.length} 步`, `Step ${step + 1} of ${steps.length}`)}</Typography>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, my: 1 }}>{s.title}</Typography>
          {s.body && <Big>{s.body}</Big>}
          {s.extra && <Typography sx={{ mt: 1.2, fontStyle: 'italic', color: '#5B2A93' }}>{s.extra}</Typography>}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {step > 0 && (
              <Button variant="outlined" onClick={() => setStep(step - 1)} sx={{ flex: 1 }}>
                {tr('上一步', 'Back')}
              </Button>
            )}
            <Button
              variant="contained"
              size="large"
              sx={{ flex: 2, fontSize: '1.1rem' }}
              onClick={() => {
                if (step + 1 >= steps.length) onDone?.();
                setStep(step + 1);
              }}
            >
              {step + 1 >= steps.length ? tr('完成', 'Finish') : tr('下一步', 'Next')}
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: '3rem' }}>🙏</Typography>
          <Big>{doneText}</Big>
          <Button sx={{ mt: 2 }} onClick={() => setStep(0)}>
            {tr('從頭再來', 'Start again')}
          </Button>
        </>
      )}
    </Box>
  );
}

function Countdown({ title, days, sub, tr }: { title: string; days: number; sub: string; tr: TR }) {
  return (
    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: days === 0 ? '#FFF6DD' : undefined }}>
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: days === 0 ? '#C62828' : '#5B2A93' }}>
        {days === 0 ? tr('就是今天', 'Today') : tr(`還有 ${days} 天`, `${days} day(s) left`)}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>{sub}</Typography>
    </Paper>
  );
}

// =====================================================================================
// Christian
// =====================================================================================

/** 感恩日記：每天寫下三件感謝的事 */
export function GratitudePanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const KEY = 'pu-gratitude';
  const [all, setAll] = useState<Record<string, string[]>>(() => load(KEY, {}));
  const [text, setText] = useState('');
  const today = dayKey();
  const list = all[today] || [];
  const add = () => {
    const v = text.trim();
    if (!v || list.length >= 3) return;
    const next = { ...all, [today]: [...list, v] };
    setAll(next);
    save(KEY, next);
    setText('');
  };
  const past = Object.keys(all)
    .filter((d) => d !== today)
    .sort()
    .reverse()
    .slice(0, 7);
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {tr('每天寫下三件想感謝上帝的事。只存在這支手機裡。', 'Write down three things you thank God for today. Kept on this device only.')}
      </Typography>
      {[0, 1, 2].map((i) => (
        <Paper key={i} variant="outlined" sx={{ p: 1.2, mb: 1, display: 'flex', gap: 1, alignItems: 'center', bgcolor: list[i] ? '#F7FBF3' : undefined }}>
          <Typography sx={{ fontWeight: 800, color: '#2E7D32' }}>{i + 1}.</Typography>
          <Typography sx={{ color: list[i] ? 'text.primary' : 'text.disabled' }}>{list[i] || tr('（還沒寫）', '(not yet)')}</Typography>
        </Paper>
      ))}
      {list.length < 3 ? (
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField fullWidth size="small" label={tr('今天我感謝…', 'Today I am thankful for…')} value={text} onChange={(e) => setText(e.target.value.slice(0, 80))} onKeyDown={(e) => e.key === 'Enter' && add()} />
          <Button variant="contained" onClick={add}>
            {tr('寫下', 'Add')}
          </Button>
        </Box>
      ) : (
        <Alert severity="success" sx={{ mt: 1 }}>
          {tr('今天的三件感恩都寫好了。願主賜福你 🙏', "Today's three thanks are written. God bless you 🙏")}
        </Alert>
      )}
      {past.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('最近的感恩', 'Recent thanks')}</Typography>
          {past.map((d) => (
            <Box key={d} sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{new Date(d + 'T12:00:00').toLocaleDateString(localeOf(lang))}</Typography>
              <Typography>{all[d].join(' · ')}</Typography>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

interface PrayerItem {
  id: number;
  text: string;
  answered?: string;
}

/** 代禱事項：為人代禱，應允後可以標記 */
export function PrayerListPanel({ tr }: { tr: TR }) {
  const KEY = 'pu-prayer-list';
  const [items, setItems] = useState<PrayerItem[]>(() => load(KEY, []));
  const [text, setText] = useState('');
  const put = (next: PrayerItem[]) => {
    setItems(next);
    save(KEY, next);
  };
  const add = () => {
    const v = text.trim();
    if (!v) return;
    put([{ id: Date.now(), text: v }, ...items].slice(0, 50));
    setText('');
  };
  const open = items.filter((i) => !i.answered);
  const answered = items.filter((i) => i.answered);
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {tr('記下想為誰、為什麼事禱告；蒙應允時打個勾，回頭看看上帝的信實。只存在這支手機裡。', 'Note who and what you are praying for; tick it when the prayer is answered and look back on God’s faithfulness. Kept on this device only.')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField fullWidth size="small" label={tr('為誰／為什麼事禱告', 'Who or what to pray for')} value={text} onChange={(e) => setText(e.target.value.slice(0, 100))} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <Button variant="contained" onClick={add}>
          {tr('加入', 'Add')}
        </Button>
      </Box>
      {open.length === 0 && answered.length === 0 && <Typography sx={{ color: 'text.secondary' }}>{tr('還沒有代禱事項。', 'No prayer requests yet.')}</Typography>}
      {open.map((i) => (
        <Paper key={i.id} variant="outlined" sx={{ p: 1.2, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ flex: 1 }}>🙏 {i.text}</Typography>
          <Button size="small" onClick={() => put(items.map((x) => (x.id === i.id ? { ...x, answered: dayKey() } : x)))}>
            {tr('蒙應允', 'Answered')}
          </Button>
          <IconButton size="small" aria-label={tr('刪除', 'Delete')} onClick={() => put(items.filter((x) => x.id !== i.id))}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Paper>
      ))}
      {answered.length > 0 && (
        <>
          <Typography sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
            {tr(`蒙應允的禱告（${answered.length}）`, `Answered prayers (${answered.length})`)}
          </Typography>
          {answered.map((i) => (
            <Paper key={i.id} variant="outlined" sx={{ p: 1.2, mb: 1, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#F7FBF3' }}>
              <Typography sx={{ flex: 1 }}>✅ {i.text}</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>{i.answered}</Typography>
              <IconButton size="small" aria-label={tr('刪除', 'Delete')} onClick={() => put(items.filter((x) => x.id !== i.id))}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Paper>
          ))}
        </>
      )}
    </Box>
  );
}

// =====================================================================================
// Catholic
// =====================================================================================

/** 三鐘經：早上 6 點、中午 12 點、傍晚 6 點 */
export function AngelusPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const h = new Date().getHours();
  const next = h < 6 ? 6 : h < 12 ? 12 : h < 18 ? 18 : 6;
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        {tr('傳統上每天早上 6 點、中午 12 點、傍晚 6 點誦念三鐘經，紀念天主聖言降生成人。', 'The Angelus is traditionally prayed at 6 am, noon and 6 pm, remembering the Incarnation.')}
      </Typography>
      <Chip label={tr(`下一次：${next} 點`, `Next: ${next === 12 ? '12 noon' : next === 6 ? '6 am' : '6 pm'}`)} color="primary" sx={{ mb: 2 }} />
      {ANGELUS.map((a, i) => (
        <Box key={i} sx={{ mb: 1.5 }}>
          <Typography sx={{ fontSize: '1.1rem' }}>
            <b>℣.</b> {orig(a.v, lang)}
          </Typography>
          <Typography sx={{ fontSize: '1.1rem' }}>
            <b>℟.</b> {orig(a.r, lang)}
          </Typography>
          {a.hail && <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>{tr('（念一遍聖母經）', '(Hail Mary…)')}</Typography>}
        </Box>
      ))}
      <Paper sx={{ p: 2, bgcolor: '#FFF9EC', borderLeft: '5px solid #D4AF37' }}>
        <Typography sx={{ fontSize: '1.08rem', lineHeight: 1.9 }}>{orig(ANGELUS_PRAYER, lang)}</Typography>
        <ListenButton lines={[...ANGELUS.flatMap((a) => [orig(a.v, lang), orig(a.r, lang)]), orig(ANGELUS_PRAYER, lang)]} voice={lang === 'zh' ? 'zh-TW' : 'en-US'} label={tr('聽', 'Listen')} stopLabel={tr('停止', 'Stop')} sx={{ color: '#5B2A93', borderColor: '#5B2A93', mt: 1, mb: 1 }} />
      </Paper>
    </Box>
  );
}

/** 苦路十四處 */
export function StationsPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const steps = STATIONS.map((s, i) => ({
    icon: '✝️',
    title: tr(`第 ${i + 1} 處：${s[0]}`, `Station ${i + 1}: ${s[1]}`),
    extra: orig(STATION_ACCLAMATION, lang),
  }));
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr('跟隨耶穌走過受難的路，每一處默想片刻，約 15 分鐘。', 'Walk with Jesus on the way of the cross, pausing at each station to reflect · about 15 minutes.')}
      </Typography>
      <StepGuide steps={steps} tr={tr} doneText={tr('苦路完成。願主的平安與你同在。', 'You have completed the Stations of the Cross. Peace be with you.')} />
    </Box>
  );
}

/** 今日聖人：固定日期的聖人與聖母慶日；今天沒有就顯示下一個 */
export function SaintPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const { today, upcoming } = useMemo(() => {
    const now = new Date();
    const key = (d: Date) => `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const todayFeast = FEASTS[key(now)] || null;
    const list: { date: Date; name: Pair }[] = [];
    for (let i = 1; i <= 366 && list.length < 5; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const f = FEASTS[key(d)];
      if (f) list.push({ date: d, name: f });
    }
    return { today: todayFeast, upcoming: list };
  }, []);
  const dateText = (d: Date) => (lang === 'zh' ? `${d.getMonth() + 1} 月 ${d.getDate()} 日` : d.toLocaleDateString(localeOf(lang), { month: 'short', day: 'numeric' }));
  return (
    <Box>
      {today ? (
        <Paper sx={{ p: 2.5, textAlign: 'center', bgcolor: '#FFF9EC', borderTop: '5px solid #D4AF37', mb: 2 }}>
          <Typography sx={{ color: 'text.secondary' }}>{tr('今天紀念', 'Today the Church celebrates')}</Typography>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, mt: 0.5 }}>{orig(today, lang)}</Typography>
        </Paper>
      ) : (
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>{tr('今天沒有列在這裡的大慶日，以下是接下來的慶日：', 'No major feast listed here today. Coming up:')}</Typography>
      )}
      {upcoming.map((u) => (
        <Box key={u.date.toISOString()} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', py: 1, borderTop: '1px solid #eee' }}>
          <Typography sx={{ minWidth: 72, fontWeight: 700, color: '#5B2A93' }}>{dateText(u.date)}</Typography>
          <Typography sx={{ flex: 1 }}>{orig(u.name, lang)}</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{tr(`${daysBetween(new Date(), u.date)} 天後`, `in ${daysBetween(new Date(), u.date)}d`)}</Typography>
        </Box>
      ))}
      <Typography sx={{ mt: 2, fontSize: '0.85rem', color: 'text.secondary' }}>
        {tr('※ 只收錄日期固定、廣為人知的聖人與聖母慶日；完整禮儀日曆請參考教區公布。', '※ Only well-known feasts with a fixed date are listed; see your diocese for the full liturgical calendar.')}
      </Typography>
    </Box>
  );
}

// =====================================================================================
// Islam
// =====================================================================================

/** 真主九十九尊名：每天一個，也可以看完整列表 */
export function NamesPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const [showAll, setShowAll] = useState(false);
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const idx = dayOfYear % 99;
  const n = NAMES_99[idx];
  const meaning = (x: [string, string, string]) => (lang === 'zh' ? x[2] : x[1]);
  return (
    <Box>
      <Paper sx={{ p: 3, textAlign: 'center', mb: 2, background: 'linear-gradient(180deg,#0f3b3a,#145c4f)', color: '#fff' }}>
        <Typography sx={{ opacity: 0.8 }}>{tr(`今天的尊名・第 ${idx + 1} / 99`, `Today's name · ${idx + 1} of 99`)}</Typography>
        <Typography sx={{ fontSize: '2rem', fontWeight: 800, mt: 1, color: '#F1D98A' }}>{n[0]}</Typography>
        <Typography sx={{ fontSize: '1.3rem', mt: 0.5 }}>{meaning(n)}</Typography>
      </Paper>
      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        {tr('可以在心中默念今天的尊名，思考它的意義。', 'Reflect on today’s name and repeat it quietly in remembrance (dhikr).')}
      </Typography>
      <Button onClick={() => setShowAll(!showAll)}>{showAll ? tr('收起列表', 'Hide the list') : tr('看全部 99 個尊名', 'See all 99 names')}</Button>
      {showAll && (
        <Box sx={{ mt: 1 }}>
          {NAMES_99.map((x, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, py: 0.8, borderTop: '1px solid #eee', bgcolor: i === idx ? '#EAF6F1' : undefined }}>
              <Typography sx={{ minWidth: 28, color: 'text.secondary' }}>{i + 1}</Typography>
              <Typography sx={{ fontWeight: 700, minWidth: 150 }}>{x[0]}</Typography>
              <Typography>{meaning(x)}</Typography>
            </Box>
          ))}
          <Typography sx={{ mt: 1, fontSize: '0.85rem', color: 'text.secondary' }}>
            {tr('※ 中文釋義僅供參考，各譯本用字略有不同。', '※ Meanings are brief renderings; translations vary.')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

/** 齋戒月倒數（依烏姆庫拉曆推算，實際以當地見月為準） */
export function RamadanPanel({ tr }: { tr: TR }) {
  const info = useMemo(() => {
    const now = new Date();
    const h = hijri(now);
    if (!h) return null;
    if (h.month === 9) {
      // In Ramadan now: count to Eid al-Fitr (1 Shawwal)
      for (let i = 1; i < 40; i++) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
        const x = hijri(d);
        if (x && x.month === 10 && x.day === 1) return { during: true, day: h.day, days: i };
      }
      return { during: true, day: h.day, days: 0 };
    }
    for (let i = 0; i < 400; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const x = hijri(d);
      if (x && x.month === 9 && x.day === 1) return { during: false, day: 0, days: i, date: d };
    }
    return null;
  }, []);
  if (!info) return <Typography>{tr('這個瀏覽器無法計算伊斯蘭曆。', 'This browser cannot calculate the Islamic calendar.')}</Typography>;
  return (
    <Box>
      {info.during ? (
        <>
          <Paper sx={{ p: 2.5, textAlign: 'center', mb: 2, bgcolor: '#EAF6F1' }}>
            <Typography sx={{ fontSize: '1.4rem', fontWeight: 800 }}>{tr(`齋戒月第 ${info.day} 天`, `Ramadan, day ${info.day}`)}</Typography>
            <Typography sx={{ mt: 0.5 }}>{tr(`距離開齋節約 ${info.days} 天`, `About ${info.days} day(s) until Eid al-Fitr`)}</Typography>
          </Paper>
          <Typography sx={{ color: 'text.secondary' }}>{tr('願您齋戒順利，Ramadan Mubarak 🌙', 'Ramadan Mubarak — may your fast be blessed 🌙')}</Typography>
        </>
      ) : (
        <Countdown title={tr('距離齋戒月開始', 'Until Ramadan begins')} days={info.days} sub={info.date ? info.date.toLocaleDateString() : ''} tr={tr} />
      )}
      <Typography sx={{ mt: 2, fontSize: '0.85rem', color: 'text.secondary' }}>
        {tr('※ 依烏姆庫拉曆推算，實際開始日期以當地見月為準，可能相差一天。', '※ Calculated with the Umm al-Qura calendar; the actual start follows local moon sighting and may differ by a day.')}
      </Typography>
    </Box>
  );
}

// =====================================================================================
// Shinto
// =====================================================================================

/** 奉納燈籠：點一盞燈籠到今晚 12 點 */
export function LanternPanel({ tr }: { tr: TR }) {
  const key = `pu-lantern-${dayKey()}`;
  const [lit, setLit] = useState<{ wish: string } | null>(() => load(key, null));
  const [wish, setWish] = useState('');
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ py: 3, borderRadius: 2, background: 'linear-gradient(180deg,#0e1a12,#23321f)' }}>
        <Box
          sx={{
            width: 90,
            height: 120,
            mx: 'auto',
            borderRadius: '40% 40% 30% 30%',
            border: '4px solid #2b1b10',
            background: lit ? 'radial-gradient(circle at 50% 55%, #fff4c9 0%, #ffcf6b 35%, #d8401f 100%)' : '#e9e1cf',
            boxShadow: lit ? '0 0 50px 12px rgba(255,190,90,.55)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: '#2b1b10',
            transition: 'all .8s',
          }}
        >
          奉納
        </Box>
      </Box>
      {lit ? (
        <Box sx={{ mt: 2 }}>
          {lit.wish && <Typography sx={{ mb: 1, fontStyle: 'italic', fontSize: '1.1rem' }}>「{lit.wish}」</Typography>}
          <Big>{tr('燈籠會亮到今晚 12 點。願神明守護您。', 'Your lantern stays lit until midnight tonight. May the kami watch over you.')}</Big>
          <Button variant="outlined" color="inherit" sx={{ mt: 2 }} onClick={() => { setLit(null); save(key, null); }}>
            {tr('熄燈', 'Put out the lantern')}
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{tr('在神前奉納一盞燈籠，表達感謝或祈願。', 'Offer a lantern before the kami, with thanks or a wish.')}</Typography>
          <TextField fullWidth label={tr('心願（選填，只存在你的手機）', 'Your wish (optional, kept on this device only)')} value={wish} onChange={(e) => setWish(e.target.value.slice(0, 60))} />
          <Button variant="contained" size="large" fullWidth sx={{ mt: 1.5, backgroundColor: '#d8401f' }} onClick={() => { const v = { wish: wish.trim() }; setLit(v); save(key, v); }}>
            {tr('🏮 奉納燈籠', '🏮 Offer the lantern')}
          </Button>
        </Box>
      )}
    </Box>
  );
}

const OMAMORI: { key: string; color: string; name: Pair }[] = [
  { key: 'kotsu', color: '#1f5fa8', name: ['交通安全', 'Safe travels'] },
  { key: 'gakugyo', color: '#6a3fa0', name: ['學業成就', 'Success in studies'] },
  { key: 'enmusubi', color: '#d1477a', name: ['良緣', 'Good relationships'] },
  { key: 'shobai', color: '#c9962a', name: ['生意興隆', 'Prosperous business'] },
  { key: 'kenko', color: '#2e7d32', name: ['無病息災', 'Good health'] },
  { key: 'kanai', color: '#b3261e', name: ['家內安全', 'Family safety'] },
];

/** 御守：選一個御守，一年後記得歸還神社 */
export function OmamoriPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const KEY = 'pu-omamori';
  const [mine, setMine] = useState<{ key: string; date: string }[]>(() => load(KEY, []));
  const put = (v: { key: string; date: string }[]) => {
    setMine(v);
    save(KEY, v);
  };
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {tr('選一個想求的御守。御守一般帶在身上一年，之後帶回神社歸還、感謝保佑。', 'Choose the omamori (charm) you wish for. It is usually carried for a year, then returned to a shrine with thanks.')}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, mb: 2 }}>
        {OMAMORI.map((o) => {
          const has = mine.some((m) => m.key === o.key);
          return (
            <Button
              key={o.key}
              variant={has ? 'contained' : 'outlined'}
              disabled={has}
              onClick={() => put([...mine, { key: o.key, date: dayKey() }])}
              sx={{ flexDirection: 'column', py: 1.2, borderColor: o.color, color: has ? '#fff' : o.color, '&.Mui-disabled': { backgroundColor: o.color, color: '#fff' } }}
            >
              <Box sx={{ width: 26, height: 36, borderRadius: '6px 6px 3px 3px', bgcolor: o.color, border: '2px solid #e8c170', mb: 0.5 }} />
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{ui(o.name, lang)}</Typography>
            </Button>
          );
        })}
      </Box>
      {mine.length > 0 && (
        <>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('我的御守', 'My omamori')}</Typography>
          {mine.map((m) => {
            const o = OMAMORI.find((x) => x.key === m.key);
            if (!o) return null;
            const due = new Date(m.date + 'T12:00:00');
            due.setFullYear(due.getFullYear() + 1);
            const left = daysBetween(new Date(), due);
            return (
              <Paper key={m.key} variant="outlined" sx={{ p: 1.2, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 14, height: 20, borderRadius: 1, bgcolor: o.color }} />
                <Typography sx={{ flex: 1 }}>{ui(o.name, lang)}</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: left <= 0 ? '#C62828' : 'text.secondary' }}>
                  {left <= 0 ? tr('已滿一年，可以歸還了', 'A year has passed — time to return it') : tr(`還有 ${left} 天滿一年`, `${left} day(s) until a year`)}
                </Typography>
                <Button size="small" onClick={() => put(mine.filter((x) => x.key !== m.key))}>
                  {tr('歸還', 'Return')}
                </Button>
              </Paper>
            );
          })}
        </>
      )}
    </Box>
  );
}

/** 月次祭：每月 1 日、15 日 */
export function TsukinamiPanel({ tr }: { tr: TR }) {
  const now = new Date();
  const d = now.getDate();
  const next = d === 1 || d === 15 ? now : d < 15 ? new Date(now.getFullYear(), now.getMonth(), 15) : new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const days = daysBetween(now, next);
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr(
          '許多神社在每月 1 日、15 日舉行月次祭，感謝神明並祈求平安；每月 1 日去參拜稱為「朔日參」。',
          'Many shrines hold tsukinami-sai on the 1st and 15th of each month to give thanks and pray for peace; visiting on the 1st is called tsuitachi-mairi.'
        )}
      </Typography>
      <Countdown title={tr('下次月次祭', 'Next tsukinami-sai')} days={days} sub={next.toLocaleDateString()} tr={tr} />
    </Box>
  );
}

// =====================================================================================
// Hindu
// =====================================================================================

/** Gayatri 咒語：看經文並計數（108 遍為一圈） */
export function GayatriPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const key = `pu-gayatri-${dayKey()}`;
  const [n, setN] = useState<number>(() => load(key, 0));
  const tap = () => {
    const v = n + 1;
    setN(v);
    save(key, v);
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ignore */
    }
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Paper sx={{ p: 2, mb: 2, bgcolor: '#FFF4E5', borderLeft: '5px solid #E39B2D', textAlign: 'left' }}>
        <Typography sx={{ fontSize: '1.3rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{GAYATRI.devanagari}</Typography>
        <Typography sx={{ mt: 1, fontStyle: 'italic', whiteSpace: 'pre-line', color: '#6b3f10' }}>{GAYATRI.roman}</Typography>
        <Typography sx={{ mt: 1.2 }}>{orig(GAYATRI.meaning, lang)}</Typography>
        <ListenButton lines={GAYATRI.devanagari.split('\n')} voice="hi-IN" label={tr('聽', 'Listen')} stopLabel={tr('停止', 'Stop')} sx={{ color: '#5B2A93', borderColor: '#5B2A93', mt: 1, mb: 1 }} />
      </Paper>
      <MalaRing
        value={n}
        beads={108}
        onTap={tap}
        label={n % 108}
        sublabel={tr('念一遍，點一下', 'Tap once per recitation')}
        ariaLabel={tr('念一遍', 'Tap once per recitation')}
        colors={MALA_COLORS.hindu}
      />
      <Typography sx={{ color: 'text.secondary' }}>{tr(`今天共 ${n} 遍・完成 ${Math.floor(n / 108)} 圈（108 遍一圈）`, `${n} today · ${Math.floor(n / 108)} full round(s) of 108`)}</Typography>
    </Box>
  );
}

const DEITY_OF_DAY: { icon: string; deity: Pair; note: Pair }[] = [
  { icon: '☀️', deity: ['蘇利耶（太陽神）', 'Surya, the Sun'], note: ['清晨面向太陽獻水、念誦 Gayatri。', 'Offer water to the rising sun and recite the Gayatri.'] },
  { icon: '🔱', deity: ['濕婆', 'Shiva'], note: ['許多人在星期一為濕婆齋戒、獻水與牛奶。', 'Many fast for Shiva on Mondays and offer water or milk.'] },
  { icon: '🐒', deity: ['哈奴曼', 'Hanuman'], note: ['念誦 Hanuman Chalisa，祈求勇氣與力量。', 'Recite the Hanuman Chalisa for courage and strength.'] },
  { icon: '🐘', deity: ['象頭神甘尼許', 'Ganesha'], note: ['祈求除去障礙，開始新事物的好日子。', 'Pray for obstacles to be removed — a good day to begin new things.'] },
  { icon: '🪷', deity: ['毗濕奴', 'Vishnu'], note: ['許多人在星期四敬拜毗濕奴與上師（Guru）。', 'Many honor Vishnu and their guru on Thursdays.'] },
  { icon: '🌸', deity: ['吉祥天女拉克什米／杜爾迦女神', 'Lakshmi / Durga'], note: ['敬拜女神，祈求福祉與家庭興旺。', 'Worship the Goddess for well-being and a prosperous home.'] },
  { icon: '🪐', deity: ['沙尼（土星神）', 'Shani (Saturn)'], note: ['點芝麻油燈，祈求度過困難。', 'Light a sesame-oil lamp and pray to get through hard times.'] },
];

/** 今日守護神（依星期，常見說法） */
export function DeityOfDayPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const wd = new Date().getDay();
  const names = [['星期日', 'Sunday'], ['星期一', 'Monday'], ['星期二', 'Tuesday'], ['星期三', 'Wednesday'], ['星期四', 'Thursday'], ['星期五', 'Friday'], ['星期六', 'Saturday']] as Pair[];
  const d = DEITY_OF_DAY[wd];
  return (
    <Box>
      <Paper sx={{ p: 3, textAlign: 'center', mb: 2, background: 'linear-gradient(180deg,#6b2a08,#a8541a)', color: '#fff' }}>
        <Typography sx={{ opacity: 0.85 }}>{ui(names[wd], lang)}</Typography>
        <Typography sx={{ fontSize: '2.6rem' }}>{d.icon}</Typography>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 800 }}>{ui(d.deity, lang)}</Typography>
        <Typography sx={{ mt: 1 }}>{ui(d.note, lang)}</Typography>
      </Paper>
      {DEITY_OF_DAY.map((x, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1.5, py: 0.8, borderTop: '1px solid #eee', fontWeight: i === wd ? 800 : 400, bgcolor: i === wd ? '#FFF4E5' : undefined }}>
          <Typography sx={{ minWidth: 80, fontWeight: 'inherit' }}>{ui(names[i], lang)}</Typography>
          <Typography sx={{ fontWeight: 'inherit' }}>
            {x.icon} {ui(x.deity, lang)}
          </Typography>
        </Box>
      ))}
      <Typography sx={{ mt: 1.5, fontSize: '0.85rem', color: 'text.secondary' }}>
        {tr('※ 這是常見的說法，各地區與家庭傳統不同。', '※ A common tradition; practices differ by region and family.')}
      </Typography>
    </Box>
  );
}

/** Puja 供奉步驟（家中簡易版） */
export function PujaPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const S: { icon: string; t: Pair; b: Pair }[] = [
    { icon: '🚿', t: ['淨身與清潔神龕', 'Cleanse yourself and the altar'], b: ['洗手洗臉，擦拭神龕，讓心安靜下來。', 'Wash your hands and face, wipe the altar and quiet your mind.'] },
    { icon: '🪔', t: ['點燃油燈', 'Light the lamp'], b: ['點燃酥油燈或油燈（diya），象徵驅走黑暗。', 'Light a ghee or oil lamp (diya), dispelling darkness.'] },
    { icon: '🐘', t: ['先向甘尼許祈請', 'Invoke Ganesha first'], b: ['傳統上先敬拜象頭神，祈求一切順利。', 'By tradition Ganesha is honored first, so that all goes well.'] },
    { icon: '💧', t: ['獻水與鮮花', 'Offer water and flowers'], b: ['以清水與鮮花（如金盞花）供奉。', 'Offer clean water and fresh flowers such as marigolds.'] },
    { icon: '🌫️', t: ['獻香', 'Offer incense'], b: ['在神前以順時針方向繞香。', 'Wave the incense clockwise before the deity.'] },
    { icon: '🍌', t: ['獻供食物', 'Offer food (naivedya)'], b: ['供上水果或甜點，心中奉獻。', 'Offer fruit or sweets with devotion.'] },
    { icon: '🔥', t: ['Aarti 獻燈', 'Perform aarti'], b: ['以燈順時針繞行，同時唱誦或祈禱。', 'Circle the lamp clockwise while singing or praying.'] },
    { icon: '🙏', t: ['分享供品（prasad）', 'Share the prasad'], b: ['把供過的食物與家人分享，接受祝福。', 'Share the offered food with your family as a blessing.'] },
  ];
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>{tr('在家中簡單供奉的步驟，約 10 分鐘。', 'Simple steps for a home puja · about 10 minutes.')}</Typography>
      <StepGuide steps={S.map((s) => ({ icon: s.icon, title: ui(s.t, lang), body: ui(s.b, lang) }))} tr={tr} doneText={tr('供奉完成。Om Shanti 🙏', 'Your puja is complete. Om Shanti 🙏')} />
    </Box>
  );
}

// =====================================================================================
// Thai Four-Faced Buddha
// =====================================================================================

/** 四面參拜順序導覽 */
export function ThaiVisitPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const S: { icon: string; t: Pair; b: Pair }[] = [
    { icon: '🧺', t: ['準備供品', 'Prepare your offerings'], b: ['常見的做法是每一面各供 3 支香、1 根蠟燭、1 串花環，四面共 12 支香、4 根蠟燭、4 串花環。', 'A common practice is 3 incense sticks, 1 candle and 1 garland for each face — 12 sticks, 4 candles and 4 garlands in all.'] },
    { icon: '🛕', t: ['從正面開始', 'Begin at the front face'], b: ['先到面向入口的正面。', 'Start at the face looking toward the entrance.'] },
    { icon: '🕯️', t: ['點香、點燭', 'Light the incense and candle'], b: ['雙手持香，默念自己的名字與心願。', 'Hold the incense with both hands and silently say your name and your wish.'] },
    { icon: '🌼', t: ['獻上花環', 'Offer the garland'], b: ['把香與蠟燭插好，花環掛上或放在供台。', 'Place the incense and candle, then hang or lay the garland.'] },
    { icon: '🔁', t: ['順時針到下一面', 'Walk clockwise to the next face'], b: ['依順時針方向，在另外三面重複同樣的步驟。', 'Going clockwise, repeat the same at the other three faces.'] },
    { icon: '🙏', t: ['心願實現後記得還願', 'Return when your wish comes true'], b: ['願望成真時再回來答謝，可以在「許願還願」記錄。', 'When your wish comes true, come back to give thanks — you can record it under “Wish & fulfil”.'] },
  ];
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr('參拜四面佛的常見順序（各地做法略有不同，僅供參考）。', 'A common way to pay respects at the four faces (practices vary; for reference only).')}
      </Typography>
      <StepGuide steps={S.map((s) => ({ icon: s.icon, title: ui(s.t, lang), body: ui(s.b, lang) }))} tr={tr} doneText={tr('四面都參拜完成了，願您心想事成 🙏', 'You have paid respects at all four faces. May your wishes come true 🙏')} />
    </Box>
  );
}

const FACES: Pair[] = [
  ['正面', 'Front face'],
  ['右面', 'Right face'],
  ['背面', 'Back face'],
  ['左面', 'Left face'],
];
const ITEMS: { key: string; icon: string; name: Pair }[] = [
  { key: 'incense', icon: '🪔', name: ['香', 'Incense'] },
  { key: 'candle', icon: '🕯️', name: ['蠟燭', 'Candle'] },
  { key: 'garland', icon: '🌼', name: ['花環', 'Garland'] },
];

/** 上香獻花：四面各獻香、燭、花環（今日紀錄） */
export function ThaiOfferingPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const key = `pu-thai-offer-${dayKey()}`;
  const [done, setDone] = useState<string[]>(() => load(key, []));
  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    save(key, next);
  };
  const total = FACES.length * ITEMS.length;
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {tr('依序在四面各獻上香、蠟燭與花環。這是給自己的紀錄，不會送出任何東西。', 'Offer incense, a candle and a garland at each of the four faces. This is your own record — nothing is sent anywhere.')}
      </Typography>
      {FACES.map((f, fi) => (
        <Paper key={fi} variant="outlined" sx={{ p: 1.2, mb: 1 }}>
          <Typography sx={{ fontWeight: 700, mb: 0.8 }}>
            {fi + 1}. {ui(f, lang)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {ITEMS.map((it) => {
              const id = `${fi}-${it.key}`;
              const on = done.includes(id);
              return <Chip key={id} label={`${it.icon} ${ui(it.name, lang)}`} onClick={() => toggle(id)} color={on ? 'warning' : 'default'} variant={on ? 'filled' : 'outlined'} />;
            })}
          </Box>
        </Paper>
      ))}
      <LinearProgress variant="determinate" value={(done.length / total) * 100} sx={{ height: 8, borderRadius: 4, my: 1.5 }} color="warning" />
      {done.length >= total ? (
        <Alert severity="success">{tr('四面都已獻上香、燭、花。心誠則靈 🙏', 'Incense, candles and garlands offered at all four faces. A sincere heart is what matters 🙏')}</Alert>
      ) : (
        <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>{tr(`已完成 ${done.length} / ${total}`, `${done.length} of ${total} done`)}</Typography>
      )}
      {done.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Flame size={0.8} />
        </Box>
      )}
    </Box>
  );
}
