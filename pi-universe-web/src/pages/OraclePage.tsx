/**
 * Online Oracle Page (線上求籤) — 六十甲子籤, Taiwanese temple style
 *
 * 1 虔誠求問  choose a topic, or fill in name / birth date / question (填表)
 * 2 默唸稟報  the petition is shown (and can be read aloud: 代為稟報)
 * 3 請示神明  throw the moon blocks until a 聖筊 grants permission
 * 4 搖籤求籤  shake the cylinder; the server draws the lot number
 * 5 擲筊驗籤  one 聖筊 confirms the lot, otherwise shake again
 * 6 籤詩      the poem, with a gentle plain-language note (for reference only)
 *
 * Free, 3 lots per person per day, adults (20+) only. Lot numbers and the confirming throw
 * come from the server; the permission throws are made here with crypto randomness.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { apiClient } from '../api/ApiClient';
import { useAuthStore } from '../stores/authStore';
import { LIUSHI_JIAZI, Lot } from '../oracle/liushiJiazi';
import { LotCylinder, MoonBlocks, SacredGlow, ThrowResult } from '../oracle/OracleArt';
import { useI18n, Lang } from '../i18n/i18n';

type Step = 'loading' | 'age' | 'ask' | 'pray' | 'permit' | 'shake' | 'verify' | 'poem' | 'limit';

const STEPS: { key: Step; label: [string, string] }[] = [
  { key: 'ask', label: ['虔誠求問', 'Ask'] },
  { key: 'pray', label: ['默唸稟報', 'Pray'] },
  { key: 'permit', label: ['請示神明', 'Permission'] },
  { key: 'shake', label: ['搖籤求籤', 'Shake'] },
  { key: 'verify', label: ['擲筊驗籤', 'Confirm'] },
  { key: 'poem', label: ['籤詩', 'Poem'] },
];

const TOPICS: [string, string][] = [
  ['事業工作', 'Career & work'],
  ['財運', 'Money'],
  ['感情姻緣', 'Love & marriage'],
  ['健康', 'Health'],
  ['家庭家運', 'Family'],
  ['學業考試', 'Studies & exams'],
  ['出行搬遷', 'Travel & moving'],
  ['官司是非', 'Disputes & legal matters'],
  ['其他', 'Something else'],
];
// Chinese double-hours (時辰); index 0 = unknown
const SHICHEN: [string, string][] = [
  ['不知道', "I don't know"],
  ['子時 23-1', '11 pm – 1 am (Zi)'],
  ['丑時 1-3', '1 – 3 am (Chou)'],
  ['寅時 3-5', '3 – 5 am (Yin)'],
  ['卯時 5-7', '5 – 7 am (Mao)'],
  ['辰時 7-9', '7 – 9 am (Chen)'],
  ['巳時 9-11', '9 – 11 am (Si)'],
  ['午時 11-13', '11 am – 1 pm (Wu)'],
  ['未時 13-15', '1 – 3 pm (Wei)'],
  ['申時 15-17', '3 – 5 pm (Shen)'],
  ['酉時 17-19', '5 – 7 pm (You)'],
  ['戌時 19-21', '7 – 9 pm (Xu)'],
  ['亥時 21-23', '9 – 11 pm (Hai)'],
];
const DEITY = '天上聖母 媽祖';

// Pinyin for the stem-branch (干支) names of the lots
const PINYIN: Record<string, string> = {
  甲: 'Jia', 乙: 'Yi', 丙: 'Bing', 丁: 'Ding', 戊: 'Wu', 己: 'Ji', 庚: 'Geng', 辛: 'Xin', 壬: 'Ren', 癸: 'Gui',
  子: 'Zi', 丑: 'Chou', 寅: 'Yin', 卯: 'Mao', 辰: 'Chen', 巳: 'Si', 午: 'Wu', 未: 'Wei', 申: 'Shen', 酉: 'You', 戌: 'Xu', 亥: 'Hai',
};
const ganzhiPinyin = (gz: string) => Array.from(gz).map((c) => PINYIN[c] || c).join('-');
const PRAY_SECONDS = 20;

const THROW_INFO: Record<ThrowResult, { name: [string, string]; meaning: [string, string] }> = {
  sheng: {
    name: ['聖筊', 'Holy answer (Sheng Jiao)'],
    meaning: ['一正一反，神明應允。', 'One flat side up and one round side up: the goddess says yes.'],
  },
  xiao: {
    name: ['笑筊', 'Laughing answer (Xiao Jiao)'],
    meaning: [
      '兩面皆平，神明笑而未答，可能問題不夠清楚。請再稟報清楚後重新擲筊。',
      'Both flat sides up: the goddess smiles without answering — perhaps the question was unclear. Pray again more clearly, then cast again.',
    ],
  },
  yin: {
    name: ['陰筊', 'No answer (Yin Jiao)'],
    meaning: [
      '兩面皆凸，神明暫不同意或時機未到。請靜心再稟報一次後重新擲筊。',
      'Both round sides up: not yet, or not this way. Calm your mind, pray once more, then cast again.',
    ],
  },
};
const pick = (pair: [string, string], lang: Lang) => (lang === 'zh' ? pair[0] : pair[1]);

function randomThrow(): ThrowResult {
  const a = new Uint8Array(1);
  crypto.getRandomValues(a);
  const r = a[0] % 4;
  return r < 2 ? 'sheng' : r === 2 ? 'xiao' : 'yin';
}

/** Label printed on the bamboo stick (always Chinese, like a real one) */
const stickLabel = (lot: Lot) => `第${lot.no}籤 ${lot.ganzhi}`;
const lotLabel = (lot: Lot, lang: Lang) =>
  lang === 'en' ? `Lot ${lot.no} · ${ganzhiPinyin(lot.ganzhi)} ${lot.ganzhi}` : `第${lot.no}籤 ${lot.ganzhi}`;
const findLot = (no: number) => LIUSHI_JIAZI.find((l) => l.no === no)!;

// Colors of the red-and-gold temple theme
const GOLD = '#E8C170';
const PAPER = '#F6E7C1';
const pageSx = {
  minHeight: '100vh',
  background: 'radial-gradient(ellipse at 50% 0%, #6B1212 0%, #3A0808 45%, #1C0404 100%)',
  color: '#F8E7C0',
  pb: 10,
};
const goldButton = {
  background: 'linear-gradient(180deg,#F5D98B,#C9993F)',
  color: '#4A0A0A',
  fontWeight: 800,
  fontSize: '1.25rem',
  py: 1.4,
  px: 4,
  borderRadius: 999,
  boxShadow: '0 0 18px rgba(245,217,139,.45)',
  '&:hover': { background: 'linear-gradient(180deg,#FFE7A3,#D6A64A)' },
  '&.Mui-disabled': { background: '#5a3a2a', color: '#bba' },
};
// Filled fields keep the label inside the cream box, so it never sits on the dark background
const fieldSx = {
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(255,245,220,.96)',
    fontSize: '1.1rem',
    borderRadius: '6px',
    '&:hover, &.Mui-focused': { backgroundColor: '#FFF6DF' },
  },
  '& .MuiInputLabel-root': { color: '#6a3a1a' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#8B1A1A' },
}

function Stepper({ step, lang }: { step: Step; lang: Lang }) {
  const idx = STEPS.findIndex((s) => s.key === step);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0.5, my: 2 }}>
      {STEPS.map((s, i) => (
        <Box key={s.key} sx={{ flex: 1, textAlign: 'center' }}>
          <Box
            sx={{
              mx: 'auto',
              width: 30,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              border: `2px solid ${GOLD}`,
              backgroundColor: i < idx ? GOLD : i === idx ? '#B3261E' : 'transparent',
              color: i < idx ? '#4A0A0A' : GOLD,
              boxShadow: i === idx ? `0 0 12px ${GOLD}` : undefined,
            }}
          >
            {i + 1}
          </Box>
          <Typography sx={{ fontSize: { xs: '0.72rem', sm: '0.9rem' }, mt: 0.5, color: i <= idx ? GOLD : '#b99' }}>{pick(s.label, lang)}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: 'relative',
        border: `1.5px solid ${GOLD}`,
        borderRadius: 3,
        p: { xs: 2.5, sm: 3.5 },
        background: 'linear-gradient(180deg, rgba(90,14,14,.85), rgba(40,6,6,.9))',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,.5), 0 0 24px rgba(232,193,112,.15)',
      }}
    >
      {children}
    </Box>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n();
  return (
    <Typography
      sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem' }, fontWeight: 800, color: GOLD, textAlign: 'center', mb: 1.5, letterSpacing: lang === 'en' ? 0 : '0.1em' }}
    >
      {children}
    </Typography>
  );
}

const Big = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.9, textAlign: 'center' }}>{children}</Typography>
);

/** The poem slip: four vertical lines read right to left, like a temple slip */
function PoemSlip({ lot }: { lot: Lot }) {
  return (
    <Box sx={{ backgroundColor: PAPER, color: '#3A1A0A', borderRadius: 1, p: 2, border: '3px double #9A6B2F', mx: 'auto', maxWidth: 420 }}>
      <Typography sx={{ textAlign: 'center', fontFamily: '"Noto Serif TC", serif', fontWeight: 900, fontSize: '1.5rem', borderBottom: '1.5px solid #9A6B2F', pb: 1, mb: 1.5 }}>
        {lot.no === 0 ? '籤首' : `第 ${lot.no} 籤　${lot.ganzhi}`}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
        {lot.poem.map((line, i) => (
          // One box per character (instead of CSS vertical writing) so every font and phone
          // shows the column the same way, read top to bottom, right to left
          <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {Array.from(line).map((ch, j) => (
              <Typography
                key={j}
                component="span"
                sx={{
                  display: 'block',
                  fontFamily: '"Noto Serif TC", "Noto Serif CJK TC", "PMingLiU", "Songti TC", serif',
                  fontWeight: 800,
                  fontSize: { xs: '1.9rem', sm: '2.2rem' },
                  lineHeight: 1.2,
                }}
              >
                {ch}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
      <Typography sx={{ textAlign: 'center', mt: 1, fontSize: '0.9rem', color: '#7a5a3a' }}>六十甲子籤</Typography>
    </Box>
  );
}

export default function OraclePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sanctuaryId = parseInt(params.get('sanctuary') || '', 10) || undefined;
  const { user } = useAuthStore();
  const { tr, lang } = useI18n();

  const [step, setStep] = useState<Step>('loading');
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(3);
  const [todayLots, setTodayLots] = useState<number[]>([]);

  // 1. question
  const [mode, setMode] = useState<'quick' | 'form'>('quick');
  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [shichen, setShichen] = useState(SHICHEN[0][0]);
  const [address, setAddress] = useState('');
  const [question, setQuestion] = useState('');

  // 2. prayer countdown
  const [prayLeft, setPrayLeft] = useState(PRAY_SECONDS);
  // 3 & 5. throws
  const [throwResult, setThrowResult] = useState<ThrowResult | null>(null);
  const [tossing, setTossing] = useState(false);
  const [failedPermits, setFailedPermits] = useState(0);
  // 4. drawing
  const [shaking, setShaking] = useState(false);
  const [draw, setDraw] = useState<{ id: number; lot: Lot } | null>(null);
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);
  // 6. result
  const [result, setResult] = useState<Lot | null>(null);

  const timer = useRef<number | null>(null);

  const loadStatus = async () => {
    const r: any = await apiClient.getOracleStatus();
    if (!r.success) {
      setError(r.error || tr('讀取失敗', 'Could not load'));
      setStep('ask');
      return;
    }
    const d = r.data;
    setRemaining(d.remaining);
    setTodayLots((d.today || []).map((t: any) => t.lot_no));
    if (!d.adult_confirmed) setStep('age');
    else if (d.remaining <= 0) setStep('limit');
    else setStep('ask');
  };

  useEffect(() => {
    loadStatus();
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const petition = useMemo(() => {
    const form = mode === 'form';
    const topicPair = TOPICS.find((t) => t[0] === topic);
    if (lang === 'en') {
      const who = form && name.trim() ? name.trim() : user?.username || 'your devotee';
      const born = form && birth ? `, born on ${birth}${shichen !== SHICHEN[0][0] ? ` at ${SHICHEN.find((h) => h[0] === shichen)?.[1]}` : ''}` : '';
      const home = form && address.trim() ? `, living in ${address.trim()}` : '';
      const matter = form && question.trim() ? question.trim() : topicPair ? topicPair[1].toLowerCase() : 'the question in my heart';
      const asked = form && question.trim() ? `to ask: "${matter}"${/[.?!]$/.test(matter) ? '' : '.'}` : `to ask about ${matter}.`;
      return `Holy Mother Mazu, Empress of Heaven: I, ${who}${born}${home}, come today with a sincere heart ${asked} In your compassion, please guide me and grant me a sacred lot.`;
    }
    const who = form && name.trim() ? name.trim() : user?.username || '信眾';
    const born =
      form && birth
        ? `，${birth.split('-').map(Number).map((v, i) => `${v} ${'年月日'[i]}`).join(' ')}${shichen !== SHICHEN[0][0] ? ` ${shichen.split(' ')[0]}` : ''}生`
        : '';
    const home = form && address.trim() ? `，現居 ${address.trim()}` : '';
    const matter = form && question.trim() ? question.trim() : topic || '心中所問之事';
    return `${DEITY}在上，弟子 ${who}${born}${home}。今日誠心祈求，為「${matter}」之事，懇請聖母慈悲指點迷津，賜予靈籤。`;
  }, [mode, name, birth, shichen, address, question, topic, user, lang]);

  const canAsk = mode === 'quick' ? !!topic : !!name.trim() && !!question.trim();

  const startPrayer = () => {
    setPrayLeft(PRAY_SECONDS);
    setStep('pray');
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setPrayLeft((s) => {
        if (s <= 1 && timer.current) window.clearInterval(timer.current);
        return Math.max(0, s - 1);
      });
    }, 1000);
  };

  const readAloud = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(petition);
    u.lang = lang === 'en' ? 'en-US' : 'zh-TW';
    u.rate = lang === 'en' ? 0.95 : 0.85;
    synth.speak(u);
  };

  const permitThrow = () => {
    setTossing(true);
    setThrowResult(null);
    const r = randomThrow();
    window.setTimeout(() => {
      setTossing(false);
      setThrowResult(r);
      if (r !== 'sheng') setFailedPermits((n) => n + 1);
    }, 1200);
  };

  const shakeLot = async () => {
    setError(null);
    setVerifyMsg(null);
    setDraw(null);
    setShaking(true);
    const started = Date.now();
    const r: any = await apiClient.drawLot(sanctuaryId);
    const wait = Math.max(0, 1800 - (Date.now() - started));
    window.setTimeout(() => {
      setShaking(false);
      if (r.success) {
        setDraw({ id: r.data.draw_id, lot: findLot(r.data.lot_no) });
      } else if (r.code === 'DAILY_LIMIT') {
        setStep('limit');
      } else if (r.code === 'AGE_REQUIRED') {
        setStep('age');
      } else if (r.code === 'DRAW_LIMIT') {
        setError(tr('今天搖籤次數已達上限，請明天再來', 'You have shaken the cylinder many times today. Please come back tomorrow.'));
      } else {
        setError(lang === 'en' ? 'Could not draw a lot. Please try again.' : r.error || '搖籤失敗');
      }
    }, wait);
  };

  const verifyLot = async () => {
    if (!draw) return;
    setStep('verify');
    setTossing(true);
    setThrowResult(null);
    setVerifyMsg(null);
    const started = Date.now();
    const r: any = await apiClient.verifyLot(draw.id);
    const wait = Math.max(0, 1200 - (Date.now() - started));
    window.setTimeout(() => {
      setTossing(false);
      if (!r.success) {
        setError(
          r.code === 'NOT_PENDING'
            ? tr('這支籤已經驗過了，請重新搖籤', 'This lot was already checked. Please shake again.')
            : lang === 'en' ? 'The blocks could not be cast. Please shake again.' : r.error || '擲筊失敗'
        );
        setStep('shake');
        setDraw(null);
        return;
      }
      setThrowResult(r.data.throw);
      setRemaining(r.data.remaining);
      if (r.data.confirmed) {
        window.setTimeout(() => {
          setResult(draw.lot);
          setTodayLots((t) => [...t, draw.lot.no]);
          setStep('poem');
        }, 1400);
      } else {
        const nm = pick(THROW_INFO[r.data.throw as ThrowResult].name, lang);
        setVerifyMsg(tr(`${nm}：聖母示意不是這支籤，請再搖一次。`, `${nm}: the goddess says this is not your lot. Please shake again.`));
      }
    }, wait);
  };

  const again = () => {
    setResult(null);
    setDraw(null);
    setThrowResult(null);
    setFailedPermits(0);
    setError(null);
    setStep(remaining > 0 ? 'ask' : 'limit');
  };

  const header = (
    <Box sx={{ position: 'relative', textAlign: 'center', pt: 2, pb: 1 }}>
      <SacredGlow size={200} />
      <Typography sx={{ position: 'relative', fontSize: '2.8rem' }}>🏮</Typography>
      <Typography sx={{ position: 'relative', fontSize: { xs: '2rem', sm: '2.4rem' }, fontWeight: 900, color: GOLD, letterSpacing: lang === 'en' ? '0.04em' : '0.2em' }}>
        {tr('線上求籤', 'Temple Oracle')}
      </Typography>
      <Typography sx={{ position: 'relative', fontSize: '1.05rem', color: '#F3D9A4' }}>
        {tr('天上聖母 · 六十甲子籤', 'Mazu, Empress of Heaven · 60 Jiazi Oracle Lots')}
      </Typography>
      <Typography sx={{ position: 'relative', mt: 1, fontSize: '1.1rem', fontWeight: 700 }}>
        {tr(`全程約 3 分鐘，共 6 步驟　·　今日還可求 ${remaining} 支`, `About 3 minutes, 6 steps  ·  ${remaining} draw${remaining === 1 ? '' : 's'} left today`)}
      </Typography>
      {lang === 'en' && (
        <Typography sx={{ position: 'relative', mt: 1.5, fontSize: '1rem', color: '#EBD7B0', lineHeight: 1.6 }}>
          Known as <i>Kau Cim</i>, this is a centuries-old Taiwanese temple tradition: you ask the goddess Mazu a question, cast moon
          blocks to ask her permission, shake a bamboo cylinder until one stick falls out, and receive a classical poem as guidance.
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={pageSx}>
      <Container maxWidth="sm" sx={{ pt: 1 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(sanctuaryId ? `/sanctuary/${sanctuaryId}` : '/')} sx={{ color: GOLD, fontSize: '1.05rem' }}>
          {tr('返回', 'Back')}
        </Button>
        {header}
        {['ask', 'pray', 'permit', 'shake', 'verify', 'poem'].includes(step) && <Stepper step={step} lang={lang} />}
        {error && <Alert severity="error" sx={{ mb: 2, fontSize: '1.05rem' }}>{error}</Alert>}

        {step === 'loading' && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CircularProgress sx={{ color: GOLD }} />
          </Box>
        )}

        {step === 'age' && (
          <Panel>
            <Title>{tr('求籤須知', 'Before you begin')}</Title>
            <Big>
              {tr('線上求籤免費，每人每天可求 3 支籤。', 'The oracle is free: up to 3 lots per person per day.')}
              <br />
              {tr('籤詩與解說僅供參考，重大決定請審慎評估。', 'Poems and interpretations are for reference only; think carefully before big decisions.')}
              <br />
              {tr('本服務僅供年滿 20 歲者使用。', 'This service is for adults aged 20 and over.')}
            </Big>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                sx={goldButton}
                onClick={async () => {
                  const r = await apiClient.confirmAdult();
                  if (r.success) setStep(remaining > 0 ? 'ask' : 'limit');
                  else setError(r.error || tr('確認失敗', 'Could not confirm'));
                }}
              >
                {tr('我已年滿 20 歲', 'I am 20 or older')}
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'ask' && (
          <Panel>
            <Title>{tr('一、虔誠求問', '1. Ask with a sincere heart')}</Title>
            <Big>{tr('請先靜心，想清楚要請示聖母的事情。', 'Calm your mind and think clearly about what you want to ask the goddess.')}</Big>
            <ToggleButtonGroup
              exclusive
              fullWidth
              value={mode}
              onChange={(_, v) => v && setMode(v)}
              sx={{ my: 2, '& .MuiToggleButton-root': { color: '#F3D9A4', borderColor: GOLD, fontSize: '1.05rem' }, '& .Mui-selected': { backgroundColor: 'rgba(232,193,112,.25) !important', color: `${GOLD} !important` } }}
            >
              <ToggleButton value="quick">{tr('快速選擇', 'Choose a topic')}</ToggleButton>
              <ToggleButton value="form">{tr('填表稟報', 'Write my question')}</ToggleButton>
            </ToggleButtonGroup>

            {mode === 'quick' ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {TOPICS.map(([t, en]) => (
                  <Chip
                    key={t}
                    label={lang === 'en' ? en : t}
                    onClick={() => setTopic(t)}
                    sx={{
                      fontSize: '1.1rem',
                      py: 2.4,
                      px: 0.5,
                      color: topic === t ? '#4A0A0A' : '#F3D9A4',
                      backgroundColor: topic === t ? GOLD : 'transparent',
                      border: `1px solid ${GOLD}`,
                      '&:hover': { backgroundColor: topic === t ? GOLD : 'rgba(232,193,112,.2)' },
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField variant="filled" label={tr('姓名', 'Name')} value={name} onChange={(e) => setName(e.target.value)} sx={fieldSx} slotProps={{ htmlInput: { maxLength: 20 } }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField variant="filled" label={tr('生辰（國曆）', 'Date of birth')} type="date" value={birth} onChange={(e) => setBirth(e.target.value)} sx={{ ...fieldSx, flex: 1 }} slotProps={{ inputLabel: { shrink: true } }} />
                  <TextField variant="filled" select label={tr('時辰', 'Hour of birth')} value={shichen} onChange={(e) => setShichen(e.target.value)} sx={{ ...fieldSx, width: lang === 'en' ? 170 : 140 }}>
                    {SHICHEN.map(([zh, en]) => (
                      <MenuItem key={zh} value={zh}>
                        {lang === 'en' ? en : zh}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <TextField variant="filled" label={tr('現居地（選填，例如：台中市）', 'Where you live (optional, e.g. Taipei)')} value={address} onChange={(e) => setAddress(e.target.value)} sx={fieldSx} slotProps={{ htmlInput: { maxLength: 30 } }} />
                <TextField variant="filled" label={tr('所問之事', 'Your question')} value={question} onChange={(e) => setQuestion(e.target.value)} multiline minRows={2} sx={fieldSx} slotProps={{ htmlInput: { maxLength: 80 } }} />
                <Typography sx={{ fontSize: '0.95rem', color: '#d9b98a' }}>
                  {tr('※ 這些資料只用來組成稟報內容，不會儲存。', '※ These details are only used to write your prayer and are not saved.')}
                </Typography>
              </Box>
            )}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button sx={goldButton} disabled={!canAsk} onClick={startPrayer}>
                {tr('下一步：默唸稟報', 'Next: pray')}
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'pray' && (
          <Panel>
            <Title>{tr('二、默唸稟報', '2. Pray silently')}</Title>
            <Big>{tr('請雙手合十，在心中默唸以下內容：', 'Put your palms together and silently say this prayer:')}</Big>
            <Box sx={{ my: 2, p: 2.5, backgroundColor: PAPER, color: '#3A1A0A', borderRadius: 1, border: '2px solid #9A6B2F' }}>
              <Typography sx={{ fontFamily: '"Noto Serif TC", serif', fontSize: '1.3rem', lineHeight: 2, fontWeight: 700 }}>{petition}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              {'speechSynthesis' in window && (
                <Button onClick={readAloud} sx={{ color: GOLD, fontSize: '1.05rem', mb: 1 }}>
                  {tr('🔊 代為稟報（唸出來）', '🔊 Read it aloud for me')}
                </Button>
              )}
              <Typography sx={{ fontSize: '1.3rem', my: 1 }}>{prayLeft > 0 ? tr(`靜心默唸… ${prayLeft} 秒`, `Praying… ${prayLeft} s`) : tr('稟報完成 🙏', 'Prayer complete 🙏')}</Typography>
              <Button sx={goldButton} disabled={prayLeft > PRAY_SECONDS - 8} onClick={() => { window.speechSynthesis?.cancel(); setThrowResult(null); setStep('permit'); }}>
                {tr('稟報完畢，請示聖母', "I'm done — ask the goddess")}
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'permit' && (
          <Panel>
            <Title>{tr('三、請示神明', '3. Ask permission')}</Title>
            <Big>
              {tr('擲筊請問聖母：是否允許求籤？', 'Cast the moon blocks to ask Mazu if you may draw a lot.')}
              <br />
              {tr('需擲出「聖筊」（一正一反）。', 'You need a holy answer: one flat side and one round side up.')}
            </Big>
            <Box sx={{ my: 3 }}>
              <MoonBlocks result={throwResult} tossing={tossing} />
            </Box>
            {throwResult && !tossing && (
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 900, color: throwResult === 'sheng' ? GOLD : '#F3D9A4' }}>{pick(THROW_INFO[throwResult].name, lang)}</Typography>
                <Typography sx={{ fontSize: '1.1rem' }}>{pick(THROW_INFO[throwResult].meaning, lang)}</Typography>
                {throwResult !== 'sheng' && failedPermits >= 3 && (
                  <Typography sx={{ fontSize: '1rem', color: '#d9b98a', mt: 1 }}>
                    {tr('若多次未獲聖筊，可以換個方式詢問，或改日再來。', 'If the answer keeps being no, try asking in a different way, or come back another day.')}
                  </Typography>
                )}
              </Box>
            )}
            <Box sx={{ textAlign: 'center' }}>
              {throwResult === 'sheng' && !tossing ? (
                <Button sx={goldButton} onClick={() => { setDraw(null); setStep('shake'); }}>
                  {tr('聖母應允，前往搖籤', 'Permission granted — shake the lots')}
                </Button>
              ) : (
                <Button sx={goldButton} disabled={tossing} onClick={permitThrow}>
                  {throwResult ? tr('再擲一次', 'Cast again') : tr('擲筊', 'Cast the blocks')}
                </Button>
              )}
            </Box>
          </Panel>
        )}

        {step === 'shake' && (
          <Panel>
            <Title>{tr('四、搖籤求籤', '4. Shake the lots')}</Title>
            <Big>{tr('心中默念所問之事，搖動籤筒，直到一支籤跳出。', 'Keep your question in mind and shake the cylinder until one stick falls out.')}</Big>
            {verifyMsg && <Alert severity="info" sx={{ mt: 2, fontSize: '1.05rem' }}>{verifyMsg}</Alert>}
            <Box sx={{ my: 3, position: 'relative' }}>
              <LotCylinder shaking={shaking} lotLabel={draw ? stickLabel(draw.lot) : null} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              {draw ? (
                <>
                  <Typography sx={{ fontSize: '1.6rem', fontWeight: 900, color: GOLD, mb: 1 }}>{lotLabel(draw.lot, lang)}</Typography>
                  <Button sx={goldButton} onClick={verifyLot}>
                    {tr('擲筊驗籤', 'Confirm with the blocks')}
                  </Button>
                </>
              ) : (
                <Button sx={goldButton} disabled={shaking} onClick={shakeLot}>
                  {shaking ? tr('搖籤中…', 'Shaking…') : tr('搖籤', 'Shake')}
                </Button>
              )}
            </Box>
          </Panel>
        )}

        {step === 'verify' && draw && (
          <Panel>
            <Title>{tr('五、擲筊驗籤', '5. Confirm your lot')}</Title>
            <Big>{tr(`請問聖母：是否就是「${lotLabel(draw.lot, 'zh')}」？`, `Ask Mazu: is ${lotLabel(draw.lot, 'en')} the right lot?`)}</Big>
            <Box sx={{ my: 3 }}>
              <MoonBlocks result={throwResult} tossing={tossing} />
            </Box>
            {throwResult && !tossing && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 900, color: GOLD }}>{pick(THROW_INFO[throwResult].name, lang)}</Typography>
                {throwResult === 'sheng' ? (
                  <Typography sx={{ fontSize: '1.15rem' }}>{tr('聖母應允，就是這支籤 🙏', 'Yes — this is your lot 🙏')}</Typography>
                ) : (
                  <>
                    <Typography sx={{ fontSize: '1.1rem', mb: 2 }}>
                      {tr('聖母示意不是這支籤，請重新搖籤。', 'The goddess says this is not your lot. Please shake again.')}
                    </Typography>
                    <Button sx={goldButton} onClick={() => { setDraw(null); setThrowResult(null); setStep('shake'); }}>
                      {tr('重新搖籤', 'Shake again')}
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Panel>
        )}

        {step === 'poem' && result && (
          <Panel>
            <Title>{tr('六、籤詩', '6. Your poem')}</Title>
            {lang === 'en' && (
              <Typography sx={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800, color: GOLD, mb: 1.5 }}>{lotLabel(result, 'en')}</Typography>
            )}
            <PoemSlip lot={result} />
            {lang === 'en' ? (
              <>
                <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,240,210,.08)', border: '1px solid rgba(232,193,112,.4)' }}>
                  <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: GOLD, mb: 1 }}>English translation</Typography>
                  {result.poem_en.map((line, i) => (
                    <Typography key={i} sx={{ fontSize: '1.12rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                      {line}
                    </Typography>
                  ))}
                  {result.note_en && (
                    <Typography sx={{ mt: 1.2, fontSize: '0.98rem', color: '#EBD7B0' }}>Note: {result.note_en}</Typography>
                  )}
                </Box>
                <Box sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,240,210,.08)', border: '1px solid rgba(232,193,112,.4)' }}>
                  <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: GOLD, mb: 1 }}>What it means (for reference only)</Typography>
                  <Typography sx={{ fontSize: '1.12rem', lineHeight: 1.8 }}>{result.explain_en}</Typography>
                </Box>
                <Typography sx={{ mt: 2, fontSize: '0.95rem', color: '#d9b98a' }}>
                  ※ The poem is the traditional 60 Jiazi oracle used in Taiwanese temples. Read it top to bottom, right to left. The translation
                  and interpretation are our own and for reference only; a temple's oracle interpreter can explain it in depth.
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,240,210,.08)', border: '1px solid rgba(232,193,112,.4)' }}>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: GOLD, mb: 1 }}>白話解說（僅供參考）</Typography>
                  <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.9 }}>{result.explain_zh}</Typography>
                </Box>
                <Typography sx={{ mt: 2, fontSize: '0.95rem', color: '#d9b98a' }}>
                  ※ 籤詩原文依台灣宮廟通行的六十甲子籤；解說為平台整理的白話參考，詳細解籤可請教宮廟的解籤老師。
                </Typography>
              </>
            )}
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
              <Button sx={goldButton} disabled={remaining <= 0} onClick={again}>
                {remaining > 0
                  ? tr(`再求一籤（今日還有 ${remaining} 支）`, `Draw another (${remaining} left today)`)
                  : tr('今日 3 支籤已求完', 'All 3 lots drawn today')}
              </Button>
              <Button onClick={() => navigate(sanctuaryId ? `/sanctuary/${sanctuaryId}` : '/')} sx={{ color: GOLD, fontSize: '1.1rem' }}>
                {tr('返回聖地', 'Back to the sanctuary')}
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'limit' && (
          <Panel>
            <Title>{tr('今日已求 3 支籤', 'You have drawn 3 lots today')}</Title>
            <Big>{tr('感恩聖母指引 🙏 每人每天可求 3 支籤，請明天再來。', 'Thank you for visiting Mazu 🙏 Each person may draw 3 lots a day — please come back tomorrow.')}</Big>
            {todayLots.length > 0 && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.05rem', mb: 1 }}>{tr('今天求得的籤（點選可再看一次）：', "Today's lots (tap to read again):")}</Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {todayLots.map((n, i) => (
                    <Chip
                      key={i}
                      label={lotLabel(findLot(n), lang)}
                      onClick={() => { setResult(findLot(n)); setStep('poem'); }}
                      sx={{ fontSize: '1.05rem', color: '#4A0A0A', backgroundColor: GOLD }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Panel>
        )}
      </Container>
    </Box>
  );
}
