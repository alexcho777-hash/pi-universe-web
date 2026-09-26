/**
 * "我的家中神桌" (home altar) tools: incense, offerings, joss-paper guide with a virtual
 * 金爐, 地基主 / 初一十五 reminders, 補財庫, and ancestor memorial-day reminders.
 * Everything except memorials is device-only (localStorage); memorials are kept on the
 * server so they follow the person across devices.
 */

import { useEffect, useMemo, useState } from 'react';
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
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiClient } from '../../api/ApiClient';
import { Lang } from '../../i18n/i18n';
import { JOSS_PAPER, daysBetween, nextAnniversary, nextLunarDay } from '../../faith/homeAltar';

type TR = (zh: string, en: string) => string;
const pick = (pair: [string, string], lang: Lang) => (lang === 'en' ? pair[1] : pair[0]);

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

/** 供品：勾選今天供奉了什麼，純粹記錄用途。 */
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
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{tr('今天供奉了什麼？', "What are you offering today?")}</Typography>
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
        <Typography sx={{ mt: 2, color: '#5B2A93', fontWeight: 700 }}>
          🙏 {tr('心誠則靈，感謝您的供養', 'A sincere heart is what matters — thank you for your offering')}
        </Typography>
      )}
    </Box>
  );
}

/** 金爐：依照拜的對象挑金紙，按下去有燃燒動畫（純粹是個記錄+小儀式感）。 */
export function JossPaperPanel({ tr, lang }: { tr: TR; lang: Lang }) {
  const key = `pu-jossburn-${today()}`;
  const [burned, setBurned] = useState<number>(() => load(key, 0));
  const [burning, setBurning] = useState(false);
  const burn = () => {
    setBurning(true);
    setTimeout(() => {
      setBurning(false);
      const next = burned + 1;
      setBurned(next);
      save(key, next);
    }, 900);
  };
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>{tr('金紙怎麼配？', 'Which joss paper for which offering?')}</Typography>
      <Paper variant="outlined" sx={{ mb: 2 }}>
        {JOSS_PAPER.map((p, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1.5, p: 1.2, borderTop: i ? '1px solid #eee' : 'none' }}>
            <Chip label={pick(p.name, lang)} size="small" sx={{ fontWeight: 700 }} />
            <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary' }}>{pick(p.use, lang)}</Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: '3rem' }}>{burning ? '🔥' : '🏺'}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {tr(`今天已在金爐焚化 ${burned} 次`, `Burned ${burned} time(s) at the furnace today`)}
        </Typography>
        <Button variant="contained" onClick={burn} disabled={burning} sx={{ backgroundColor: '#8B4513' }}>
          {burning ? tr('焚化中…', 'Burning…') : tr('焚燒金紙', 'Burn joss paper')}
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
