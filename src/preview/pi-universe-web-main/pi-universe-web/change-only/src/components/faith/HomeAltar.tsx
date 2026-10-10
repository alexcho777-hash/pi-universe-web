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
import furnaceGodUrl from '../../assets/ritual/furnace_god.jpg';
import furnaceDeadUrl from '../../assets/ritual/furnace_dead.jpg';
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
          <Button variant="contained" onClick={() => (setLit(true), save(key, true))} sx={{ backgroundColor: '#B8912F' }}>
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
/**
 * 金爐 / 銀紙爐：用實體擬真照片（furnace_god.jpg / furnace_dead.jpg），保留燃燒時的煙霧飄升動畫與光暈。
 */
function Furnace({ burning, kind = 'god' }: { burning: boolean; kind?: 'god' | 'dead' }) {
  const dead = kind === 'dead';
  const k = 1.45; // display scale
  const imgW = 170 * k;
  const imgH = 226 * k;
  const imgSrc = dead ? furnaceDeadUrl : furnaceGodUrl;
  return (
    <Box sx={{ position: 'relative', width: imgW, mx: 'auto', pt: `${70 * k}px` }}>
      {burning &&
        Array.from({ length: 9 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: '50%',
              top: `${22 * k}px`,
              ml: `${(-(11 + (i % 4) * 3) + ((i % 3) - 1) * 3) * k}px`,
              width: (22 + (i % 4) * 6) * k,
              height: (22 + (i % 4) * 6) * k,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,225,190,.95) 0%, rgba(180,160,150,.45) 55%, rgba(180,160,150,0) 75%)',
              animation: `${smokeRise} ${2.2 + (i % 4) * 0.3}s ease-out ${i * 0.28}s infinite`,
              '--dx': `${(i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 4) * k}px`,
              '--dy': `${-110 * k}px`,
              zIndex: 2,
              mixBlendMode: 'screen',
            }}
          />
        ))}
      <Box
        component="img"
        src={imgSrc}
        alt={dead ? '銀紙爐' : '金爐'}
        sx={{
          display: 'block',
          width: imgW,
          height: imgH,
          objectFit: 'contain',
          filter: burning ? `drop-shadow(0 0 ${24 * k}px rgba(255,170,80,.55))` : 'drop-shadow(0 4px 12px rgba(0,0,0,.6))',
          transition: 'filter .4s ease',
        }}
      />
      {burning && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: `${130 * k}px`,
            ml: `${-30 * k}px`,
            width: `${60 * k}px`,
            height: `${24 * k}px`,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,180,80,.85) 0%, rgba(255,120,40,.4) 45%, rgba(255,80,0,0) 75%)',
            filter: 'blur(2px)',
            animation: `${glowPulse} 0.85s ease-in-out infinite`,
            zIndex: 1,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </Box>
  );
}

/** 金爐：先選要燒哪種金紙，再按下去有燃燒動畫（純粹是個記錄+小儀式感）。 */
export function JossPaperPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const key = `pu-jossburn-${today()}`;
  const [kind, setKind] = useState<'god' | 'dead'>('god');
  const [picked, setPicked] = useState(0);
  const [burnedLog, setBurnedLog] = useState<string[]>(() => load(key, []));
  const [burning, setBurning] = useState(false);
  const list = JOSS_PAPER.filter((p) => p.furnace === kind);
  const burn = () => {
    setBurning(true);
    setTimeout(() => {
      setBurning(false);
      const next = [...burnedLog, list[picked].name[0]];
      setBurnedLog(next);
      save(key, next);
    }, 3800);
  };
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('先選哪一個爐', 'First choose the furnace')}</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
        <Button
          variant={kind === 'god' ? 'contained' : 'outlined'}
          onClick={() => (setKind('god'), setPicked(0))}
          sx={{ textTransform: 'none', py: 1, lineHeight: 1.3, ...(kind === 'god' ? { backgroundColor: '#B8912F' } : {}) }}
        >
          {tr('金爐', 'Gold furnace')}
          <br />
          <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>{tr('敬神明', 'for the gods')}</span>
        </Button>
        <Button
          variant={kind === 'dead' ? 'contained' : 'outlined'}
          onClick={() => (setKind('dead'), setPicked(0))}
          sx={{ textTransform: 'none', py: 1, lineHeight: 1.3, ...(kind === 'dead' ? { backgroundColor: '#4b5563' } : {}) }}
        >
          {tr('銀紙爐', 'Silver-paper furnace')}
          <br />
          <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>{tr('祖先與往生者', 'ancestors & the departed')}</span>
        </Button>
      </Box>
      <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 1.5 }}>
        {kind === 'god'
          ? tr('敬神的金紙燒在金爐；祖先與往生者的紙錢另外燒，不可混在一起。', 'Paper for the gods goes in the gold furnace; paper for ancestors and the departed is burned separately.')
          : tr('祖先與往生者的紙錢燒在獨立的銀紙爐，和敬神的金爐分開。', 'Paper for ancestors and the departed is burned in its own furnace, apart from the one for the gods.')}
      </Typography>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('再選要燒哪一種紙', 'Then choose the paper')}</Typography>
      <Paper variant="outlined" sx={{ mb: 2 }}>
        {list.map((p, i) => (
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
              bgcolor: picked === i ? 'rgba(212,175,55,.10)' : undefined,
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
            {picked === i && <Typography sx={{ color: '#D4AF37', fontWeight: 700 }}>✓</Typography>}
          </Box>
        ))}
      </Paper>
      <Box sx={{ textAlign: 'center' }}>
        <Furnace burning={burning} kind={kind} />
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {burnedLog.length > 0
            ? tr(`今天已焚化：${burnedLog.join('、')}`, `Burned today: ${burnedLog.join(', ')}`)
            : tr('今天還沒有焚化金紙', 'No joss paper burned yet today')}
        </Typography>
        <Button variant="contained" onClick={burn} disabled={burning} sx={{ backgroundColor: '#B8912F' }}>
          {burning
            ? tr('焚化中…', 'Burning…')
            : tr(`焚燒「${pick(list[picked].name, lang)}」`, `Burn "${pick(list[picked].name, lang)}"`)}
        </Button>
      </Box>
    </Box>
  );
}

function CountdownCard({ title, days, lunarText, tr }: { title: string; days: number; lunarText: [string, string]; tr: TR }) {
  return (
    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: days === 0 ? 'rgba(212,175,55,.14)' : undefined }}>
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: days === 0 ? '#C62828' : '#D4AF37' }}>
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
        <Button variant="contained" onClick={() => (setDone(true), save(key, true))} sx={{ backgroundColor: '#B8912F' }}>
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
          <Paper key={m.id} sx={{ p: 1.5, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: m.days === 0 ? 'rgba(212,175,55,.14)' : undefined }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{m.name}</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                {m.calendar_type === 'lunar' ? tr('農曆', 'Lunar')  : tr('國曆', 'Solar')} {m.month}/{m.day}
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800, color: m.days === 0 ? '#C62828' : '#D4AF37' }}>
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
