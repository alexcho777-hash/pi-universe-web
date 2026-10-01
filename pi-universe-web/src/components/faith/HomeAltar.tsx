/**
 * "我的家中神桌" (home altar) tools: incense, offerings, joss-paper guide with a virtual
 * 金爐, 地基主 / 初一十五 reminders, 補財庫, and ancestor memorial-day reminders.
 * Everything except memorials is device-only (localStorage); memorials are kept on the
 * server so they follow the person across devices.
 */

import { useEffect, useId, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
  keyframes,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiClient } from '../../api/ApiClient';
import { Lang, tx } from '../../i18n/i18n';
import { JOSS_PAPER, daysBetween, nextAnniversary, nextLunarDay } from '../../faith/homeAltar';

type TR = (zh: string, en: string) => string;
const pick = (pair: [string, string], lang: Lang) => (lang === 'zh' ? pair[0] : tx(pair[1], lang));

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const load = (key: string, fallback: any) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};
const save = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

/** 上香：燒到今晚 12 點，跟點蠟燭同一種邏輯。 */
export function IncensePanel({ tr }: { tr: TR }) {
  const key = `pu-incense-${today()}`;
  const [lit, setLit] = useState<boolean>(() => load(key, false));
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const minsLeft = Math.max(0, Math.round((midnight.getTime() - Date.now()) / 60000));

  return (
    <Box sx={{ textAlign: 'center', py: 1 }}>
      <Typography sx={{ fontSize: '3.5rem' }}>{lit ? '🕯️' : '🪔'}</Typography>
      {lit ? (
        <>
          <Typography sx={{ mt: 1, fontWeight: 700 }}>{tr('香已點燃', 'Incense is lit')}</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            {tr(`還會亮 ${Math.floor(minsLeft / 60)} 小時 ${minsLeft % 60} 分`, `${Math.floor(minsLeft / 60)}h ${minsLeft % 60}m left`)}
          </Typography>
          <Button variant="outlined" onClick={() => (setLit(false), save(key, false))}>
            {tr('熄香', 'Put out')}
          </Button>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 1, color: 'text.secondary', mb: 2 }}>
            {tr('點三炷香，向神明稟報心願', 'Light three sticks of incense and speak your wish')}
          </Typography>
          <Button variant="contained" onClick={() => (setLit(true), save(key, true))} sx={{ backgroundColor: '#8B4513' }}>
            {tr('上香', 'Light incense')}
          </Button>
        </>
      )}
    </Box>
  );
}

const OFFERINGS: [string, string][] = [
  ['鮮花', 'Flowers'],
  ['水果', 'Fruit'],
  ['淨水', 'Clean water'],
  ['糕點', 'Cakes/sweets'],
  ['茶', 'Tea'],
  ['三牲', 'Meat offerings'],
];

/** 供品：勾選今天供奉了什麼，純粹是給自己看的記錄，不會通知神明或送出任何東西。 */
export function OfferingsPanel({ tr }: { tr: TR }) {
  const key = `pu-offerings-${today()}`;
  const [chosen, setChosen] = useState<string[]>(() => load(key, []));
  const toggle = (name: string) => {
    const next = chosen.includes(name) ? chosen.filter((n) => n !== name) : [...chosen, name];
    setChosen(next);
    save(key, next);
  };
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>
        {tr('點選你今天準備了哪些供品，方便自己記錄。', 'Tap what you are offering today, as a personal record.')}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5, fontSize: '0.9rem' }}>
        {tr(
          '這只是您自己的清單，不會通知神明、不會送出任何東西，也不用另外按確認 — 點選之後就算記錄完成，隨時可以增減。',
          "This is only your own checklist — it doesn't notify anyone or send anything. There's no separate confirm step; tapping is enough, and you can change it anytime."
        )}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {OFFERINGS.map(([zh, en]) => (
          <Chip
            key={zh}
            label={tr(zh, en)}
            onClick={() => toggle(zh)}
            color={chosen.includes(zh) ? 'primary' : 'default'}
            variant={chosen.includes(zh) ? 'filled' : 'outlined'}
            sx={{ fontSize: '1rem', py: 2 }}
          />
        ))}
      </Box>
      {chosen.length > 0 && (
        <Alert severity="success" sx={{ mt: 2 }}>
          🙏 {tr(
            `已記錄今天供奉：${chosen.join('、')}。心誠則靈，感謝您的供養。`,
            `Recorded today's offerings: ${chosen.join(', ')}. A sincere heart is what matters.`
          )}
        </Alert>
      )}
    </Box>
  );
}

const flicker = keyframes`
  0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.96; }
  25% { transform: scaleY(1.14) scaleX(0.93); opacity: 1; }
  50% { transform: scaleY(0.94) scaleX(1.06); opacity: 0.92; }
  75% { transform: scaleY(1.1) scaleX(0.96); opacity: 1; }
`;
const smokeRise = keyframes`
  0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
  10% { opacity: 0.85; }
  55% { opacity: 0.55; }
  100% { transform: translate(var(--dx, 6px), var(--dy, -92px)) scale(2.5); opacity: 0; }
`;
const glowPulse = keyframes`
  0%, 100% { opacity: 0.65; }
  50% { opacity: 1; }
`;

/**
 * A Taiwanese-temple 金爐 (joss-paper burner): stone base, a red two-tier pagoda body that is
 * closed except for an arched mouth in front and a window on each side, a tiled roof with up-turned
 * eaves, and a chimney on top that carries the smoke away.
 */
function Furnace({ burning }: { burning: boolean }) {
  const uid = useId().replace(/:/g, '');
  const k = 1.45; // display scale
  const arch = 'M58 196 V160 Q58 143 85 143 Q112 143 112 160 V196 Z';
  return (
    <Box sx={{ position: 'relative', width: 170 * k, mx: 'auto', pt: `${70 * k}px` }}>
      {burning &&
        Array.from({ length: 9 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: '50%',
              top: `${76 * k}px`,
              ml: `${(-(11 + (i % 4) * 3) + ((i % 3) - 1) * 3) * k}px`,
              width: (22 + (i % 4) * 6) * k,
              height: (22 + (i % 4) * 6) * k,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(215,215,220,.92) 0%, rgba(175,175,180,.42) 55%, rgba(175,175,180,0) 75%)',
              animation: `${smokeRise} ${2.2 + (i % 4) * 0.3}s ease-out ${i * 0.28}s infinite`,
              '--dx': `${(i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 4) * k}px`,
              '--dy': `${-92 * k}px`,
              zIndex: 2,
            }}
          />
        ))}
      <Box
        component="svg"
        viewBox="0 0 170 226"
        width={170 * k}
        height={226 * k}
        sx={{
          display: 'block',
          '& .fl': { transformBox: 'fill-box', transformOrigin: '50% 100%', animation: `${flicker} 0.46s ease-in-out infinite` },
          '& .fl2': { animationDuration: '0.38s', animationDelay: '0.1s' },
          '& .fl3': { animationDuration: '0.3s', animationDelay: '0.2s' },
          '& .gl': { animation: `${glowPulse} 0.9s ease-in-out infinite` },
        }}
      >
        <defs>
          <linearGradient id={`wall${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b8372b" />
            <stop offset="1" stopColor="#7a1f17" />
          </linearGradient>
          <linearGradient id={`roof${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0cd6a" />
            <stop offset="1" stopColor="#b8872a" />
          </linearGradient>
          <linearGradient id={`stone${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a7e70" />
            <stop offset="1" stopColor="#5a5046" />
          </linearGradient>
          <radialGradient id={`fire${uid}`} cx="50%" cy="100%" r="80%">
            <stop offset="0" stopColor="#ffb347" stopOpacity="0.95" />
            <stop offset="1" stopColor="#c0392b" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`arch${uid}`}>
            <path d={arch} />
          </clipPath>
        </defs>

        {/* stone base: two steps */}
        <rect x="10" y="210" width="150" height="14" rx="2" fill={`url(#stone${uid})`} stroke="#2e2820" strokeWidth="1" />
        <rect x="20" y="198" width="130" height="14" rx="2" fill={`url(#stone${uid})`} stroke="#2e2820" strokeWidth="1" />
        <path d="M30 205 H140" stroke="#463e34" strokeWidth="0.8" opacity="0.7" />

        {/* lower tier body */}
        <rect x="28" y="126" width="114" height="72" fill={`url(#wall${uid})`} stroke="#3a0f0a" strokeWidth="1.4" />
        <rect x="24" y="190" width="122" height="8" fill="#d6a93e" stroke="#7a5a12" strokeWidth="0.8" />
        {/* corner pillars */}
        <rect x="28" y="126" width="7" height="64" fill="#d6a93e" opacity="0.9" />
        <rect x="135" y="126" width="7" height="64" fill="#d6a93e" opacity="0.9" />
        {/* plaque */}
        <rect x="68" y="130" width="34" height="11" rx="1.5" fill="#2c0b07" stroke="#e8c170" strokeWidth="0.9" />
        <text x="85" y="139" textAnchor="middle" fontSize="9" fontWeight={800} fill="#f3d27a" fontFamily="serif">
          金爐
        </text>

        {/* side windows (the burner is open on three sides) */}
        {[34, 120].map((x) => (
          <g key={x}>
            <path d={`M${x} 184 V160 Q${x} 150 ${x + 8} 150 Q${x + 16} 150 ${x + 16} 160 V184 Z`} fill="#17080a" stroke="#e8c170" strokeWidth="1.6" />
            <path d={`M${x} 184 V160 Q${x} 150 ${x + 8} 150 Q${x + 16} 150 ${x + 16} 160 V184 Z`} fill="#ff8a2a" className={burning ? 'gl' : undefined} opacity={burning ? 0.85 : 0.22} />
            <path d={`M${x + 5.3} 152 V184 M${x + 10.6} 152 V184 M${x} 168 H${x + 16}`} stroke="#3a0f0a" strokeWidth="1.2" />
          </g>
        ))}

        {/* front mouth */}
        <path d={arch} fill="#120605" />
        <g clipPath={`url(#arch${uid})`}>
          <rect x="58" y="150" width="54" height="46" fill={`url(#fire${uid})`} opacity={burning ? 1 : 0.28} className={burning ? 'gl' : undefined} />
          {burning && (
            <>
              <path className="fl" d="M85 197 C64 197 59 178 68 165 C71 171 75 171 76 164 C73 154 80 149 84 143 C86 153 94 155 96 165 C100 159 101 166 101 171 C108 184 101 197 85 197Z" fill="#ff7a1a" />
              <path className="fl fl2" d="M85 197 C73 197 71 184 77 176 C79 180 82 180 83 173 C81 167 85 163 88 158 C90 166 96 169 96 177 C98 185 94 197 85 197Z" fill="#ffc93a" />
              <path className="fl fl3" d="M85 197 C79 197 78 189 82 183 C84 186 86 186 87 182 C91 187 91 197 85 197Z" fill="#fff3b0" />
              <path className="fl fl2" d="M66 197 C58 197 58 187 62 181 C64 185 66 185 67 181 C71 187 72 197 66 197Z" fill="#ff9a2a" />
              <path className="fl fl3" d="M104 197 C97 197 97 187 101 181 C103 185 105 185 106 181 C110 187 111 197 104 197Z" fill="#ff9a2a" />
            </>
          )}
          {!burning && <ellipse cx="85" cy="193" rx="18" ry="4" fill="#ff7a1a" opacity="0.5" className="gl" />}
        </g>
        <path d={arch} fill="none" stroke="#e8c170" strokeWidth="3" />
        <path d={arch} fill="none" stroke="#7a5a12" strokeWidth="0.8" />

        {/* lower roof with up-turned eaves */}
        <path d="M6 138 Q8 124 26 121 L144 121 Q162 124 164 138 Q152 132 144 133 L26 133 Q18 132 6 138Z" fill={`url(#roof${uid})`} stroke="#6b4a10" strokeWidth="1.2" />
        <path d="M24 124 V132 M36 123 V132 M48 123 V132 M60 123 V132 M72 123 V132 M84 123 V132 M96 123 V132 M108 123 V132 M120 123 V132 M132 123 V132 M146 124 V132" stroke="#8a5f12" strokeWidth="0.9" opacity="0.6" />
        <path d="M6 138 Q4 132 8 128 M164 138 Q166 132 162 128" stroke="#6b4a10" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* upper tier */}
        <rect x="50" y="94" width="70" height="28" fill={`url(#wall${uid})`} stroke="#3a0f0a" strokeWidth="1.2" />
        <rect x="50" y="94" width="6" height="28" fill="#d6a93e" opacity="0.9" />
        <rect x="114" y="94" width="6" height="28" fill="#d6a93e" opacity="0.9" />
        <path d="M78 118 V106 Q78 99 85 99 Q92 99 92 106 V118 Z" fill="#17080a" stroke="#e8c170" strokeWidth="1.4" />
        <path d="M78 118 V106 Q78 99 85 99 Q92 99 92 106 V118 Z" fill="#ff8a2a" className={burning ? 'gl' : undefined} opacity={burning ? 0.8 : 0.2} />

        {/* upper roof */}
        <path d="M36 98 Q38 86 54 83 L116 83 Q132 86 134 98 Q124 93 116 94 L54 94 Q46 93 36 98Z" fill={`url(#roof${uid})`} stroke="#6b4a10" strokeWidth="1.2" />
        <path d="M36 98 Q34 92 38 88 M134 98 Q136 92 132 88" stroke="#6b4a10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="66" y="79" width="38" height="5" rx="2" fill="#d6a93e" stroke="#6b4a10" strokeWidth="0.8" />

        {/* chimney */}
        <rect x="78" y="34" width="14" height="46" fill={`url(#wall${uid})`} stroke="#3a0f0a" strokeWidth="1.1" />
        <rect x="76" y="48" width="18" height="4" fill="#d6a93e" stroke="#7a5a12" strokeWidth="0.6" />
        <rect x="76" y="64" width="18" height="4" fill="#d6a93e" stroke="#7a5a12" strokeWidth="0.6" />
        <path d="M72 35 L98 35 L94 27 L76 27Z" fill={`url(#roof${uid})`} stroke="#6b4a10" strokeWidth="1" />
        <ellipse cx="85" cy="27" rx="9" ry="2" fill="#1a0c06" />
        <circle cx="85" cy="24" r="2" fill="#f3d27a" />
      </Box>
    </Box>
  );
}

/** 金爐：先選要燒哪種金紙，再按下去有燃燒動畫（純粹是個記錄+小儀式感）。 */
export function JossPaperPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const key = `pu-jossburn-${today()}`;
  const [picked, setPicked] = useState(0);
  const [burnedLog, setBurnedLog] = useState<string[]>(() => load(key, []));
  const [burning, setBurning] = useState(false);
  const burn = () => {
    setBurning(true);
    setTimeout(() => {
      setBurning(false);
      const next = [...burnedLog, JOSS_PAPER[picked].name[0]];
      setBurnedLog(next);
      save(key, next);
    }, 3800);
  };
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('先選要燒哪一種金紙', 'Choose which joss paper to burn')}</Typography>
      <Paper variant="outlined" sx={{ mb: 2 }}>
        {JOSS_PAPER.map((p, i) => (
          <Box
            key={i}
            onClick={() => setPicked(i)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.2,
              borderTop: i ? '1px solid #eee' : 'none',
              cursor: 'pointer',
              bgcolor: picked === i ? '#FBF6EC' : undefined,
            }}
          >
            <Chip
              label={pick(p.name, lang)}
              size="small"
              color={picked === i ? 'primary' : 'default'}
              variant={picked === i ? 'filled' : 'outlined'}
              sx={{ fontWeight: 700 }}
            />
            <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary', flex: 1 }}>{pick(p.use, lang)}</Typography>
            {picked === i && <Typography sx={{ color: '#5B2A93', fontWeight: 700 }}>✓</Typography>}
          </Box>
        ))}
      </Paper>
      <Box sx={{ textAlign: 'center' }}>
        <Furnace burning={burning} />
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {burnedLog.length > 0
            ? tr(`今天已焚化：${burnedLog.join('、')}`, `Burned today: ${burnedLog.join(', ')}`)
            : tr('今天還沒有焚化金紙', 'No joss paper burned yet today')}
        </Typography>
        <Button variant="contained" onClick={burn} disabled={burning} sx={{ backgroundColor: '#8B4513' }}>
          {burning
            ? tr('焚化中…', 'Burning…')
            : tr(`焚燒「${pick(JOSS_PAPER[picked].name, lang)}」`, `Burn "${pick(JOSS_PAPER[picked].name, lang)}"`)}
        </Button>
      </Box>
    </Box>
  );
}

function CountdownCard({ title, days, lunarText, tr }: { title: string; days: number; lunarText: [string, string]; tr: TR }) {
  return (
    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: days === 0 ? '#FFF6DD' : undefined }}>
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: days === 0 ? '#C62828' : '#5B2A93' }}>
        {days === 0 ? tr('就是今天', 'Today') : tr(`還有 ${days} 天`, `${days} day(s) left`)}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>{tr(lunarText[0], lunarText[1])}</Typography>
    </Paper>
  );
}

/** 地基主：每月初二、十六，傍晚祭拜。 */
export function DiJiZhuPanel({ tr }: { tr: TR }) {
  const { date, lunarText } = useMemo(() => nextLunarDay([2, 16]), []);
  const days = daysBetween(new Date(), date);
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr('地基主保佑居家平安，通常在每月初二、十六的傍晚祭拜，供品放低處、面向屋內。', 'The house spirit (地基主) is honored on the 2nd and 16th of the lunar month, in the evening, with offerings placed low and facing into the house.')}
      </Typography>
      <CountdownCard title={tr('下次拜地基主', 'Next 地基主 offering')} days={days} lunarText={lunarText} tr={tr} />
    </Box>
  );
}

/** 初一十五：每月初一、十五祭拜。 */
export function ShuoyiPanel({ tr }: { tr: TR }) {
  const { date, lunarText } = useMemo(() => nextLunarDay([1, 15]), []);
  const days = daysBetween(new Date(), date);
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr('每月初一、十五，是傳統上香敬神、祭祖的日子。', 'The 1st and 15th of the lunar month are the traditional days to burn incense for the gods and ancestors.')}
      </Typography>
      <CountdownCard title={tr('下次初一／十五', 'Next 1st / 15th')} days={days} lunarText={lunarText} tr={tr} />
    </Box>
  );
}

/** 補財庫：儀式說明 + 今日完成打勾（不涉及付款）。 */
export function FortuneVaultPanel({ tr }: { tr: TR }) {
  const key = `pu-fortune-${today()}`;
  const [done, setDone] = useState<boolean>(() => load(key, false));
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr(
          '補財庫是向財神／土地公稟報並祈求財運，傳統上會準備刈金、福金，誠心祝禱後焚化。可在農曆正月初五（迎財神）或初二、十六（土地公）進行。',
          'Replenishing the fortune vault is a prayer to wealth deities / the Earth God. Traditionally done with joss paper, prayed sincerely and then burned — good days are the 5th of the lunar new year, or the 2nd/16th of the month.'
        )}
      </Typography>
      {done ? (
        <Alert severity="success">{tr('今天已完成補財庫 🙏', "You've completed today's ritual 🙏")}</Alert>
      ) : (
        <Button variant="contained" onClick={() => (setDone(true), save(key, true))} sx={{ backgroundColor: '#8B4513' }}>
          {tr('完成補財庫祝禱', "I've prayed")}
        </Button>
      )}
    </Box>
  );
}

interface Memorial {
  id: number;
  name: string;
  calendar_type: 'lunar' | 'solar';
  month: number;
  day: number;
  note?: string;
}

/** 忌日提醒：伺服器保存，跨裝置同步。 */
export function MemorialPanel({ tr }: { tr: TR }) {
  const [list, setList] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [calendarType, setCalendarType] = useState<'lunar' | 'solar'>('lunar');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const res: any = await apiClient.getMemorials();
    if (res.success) setList(res.data || []);
    setLoading(false);
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const withCountdown = useMemo(
    () =>
      list
        .map((m) => {
          const date = nextAnniversary(m.month, m.day, m.calendar_type);
          return { ...m, days: daysBetween(new Date(), date) };
        })
        .sort((a, b) => a.days - b.days),
    [list]
  );

  const add = async () => {
    setError('');
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (!name.trim()) return setError(tr('請輸入稱呼', 'Please enter a name'));
    if (!(m >= 1 && m <= 12) || !(d >= 1 && d <= 30)) return setError(tr('日期不正確', 'Please enter a valid date'));
    setSaving(true);
    const res: any = await apiClient.addMemorial({ name: name.trim(), calendar_type: calendarType, month: m, day: d });
    setSaving(false);
    if (res.success) {
      setName('');
      setMonth('');
      setDay('');
      setList((l) => [...l, res.data]);
    } else {
      setError(res.error || tr('新增失敗', 'Failed to add'));
    }
  };

  const remove = async (id: number) => {
    const res: any = await apiClient.deleteMemorial(id);
    if (res.success) setList((l) => l.filter((m) => m.id !== id));
  };

  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr('記錄祖先的忌日（過世紀念日），系統會幫您算好距離下次還有幾天。', "Add an ancestor's memorial day and we'll count down to the next one for you.")}
      </Typography>
      {loading ? (
        <Typography sx={{ color: 'text.secondary' }}>{tr('載入中…', 'Loading…')}</Typography>
      ) : (
        withCountdown.map((m) => (
          <Paper key={m.id} sx={{ p: 1.5, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: m.days === 0 ? '#FFF6DD' : undefined }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{m.name}</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                {m.calendar_type === 'lunar' ? tr('農曆', 'Lunar')  : tr('國曆', 'Solar')} {m.month}/{m.day}
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800, color: m.days === 0 ? '#C62828' : '#5B2A93' }}>
              {m.days === 0 ? tr('今天', 'Today') : tr(`${m.days} 天後`, `in ${m.days}d`)}
            </Typography>
            <IconButton size="small" onClick={() => remove(m.id)} aria-label={tr('刪除', 'Delete')}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))
      )}

      <Paper variant="outlined" sx={{ p: 1.5, mt: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('新增忌日', 'Add a memorial day')}</Typography>
        <TextField
          fullWidth
          size="small"
          label={tr('稱呼（例如：阿公）', 'Name (e.g. Grandpa)')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <TextField select size="small" label={tr('曆法', 'Calendar')} value={calendarType} onChange={(e) => setCalendarType(e.target.value as any)} sx={{ minWidth: 110 }}>
            <MenuItem value="lunar">{tr('農曆', 'Lunar')}</MenuItem>
            <MenuItem value="solar">{tr('國曆', 'Solar')}</MenuItem>
          </TextField>
          <TextField size="small" type="number" label={tr('月', 'Month')} value={month} onChange={(e) => setMonth(e.target.value)} sx={{ width: 90 }} />
          <TextField size="small" type="number" label={tr('日', 'Day')} value={day} onChange={(e) => setDay(e.target.value)} sx={{ width: 90 }} />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" onClick={add} disabled={saving} fullWidth>
          {tr('新增', 'Add')}
        </Button>
      </Paper>
    </Box>
  );
}
