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

type Step = 'loading' | 'age' | 'ask' | 'pray' | 'permit' | 'shake' | 'verify' | 'poem' | 'limit';

const STEPS: { key: Step; label: string }[] = [
  { key: 'ask', label: '虔誠求問' },
  { key: 'pray', label: '默唸稟報' },
  { key: 'permit', label: '請示神明' },
  { key: 'shake', label: '搖籤求籤' },
  { key: 'verify', label: '擲筊驗籤' },
  { key: 'poem', label: '籤詩' },
];

const TOPICS = ['事業工作', '財運', '感情姻緣', '健康', '家庭家運', '學業考試', '出行搬遷', '官司是非', '其他'];
const SHICHEN = ['不知道', '子時 23-1', '丑時 1-3', '寅時 3-5', '卯時 5-7', '辰時 7-9', '巳時 9-11', '午時 11-13', '未時 13-15', '申時 15-17', '酉時 17-19', '戌時 19-21', '亥時 21-23'];
const DEITY = '天上聖母 媽祖';
const PRAY_SECONDS = 20;

const THROW_INFO: Record<ThrowResult, { name: string; meaning: string }> = {
  sheng: { name: '聖筊', meaning: '一正一反，神明應允。' },
  xiao: { name: '笑筊', meaning: '兩面皆平，神明笑而未答，可能問題不夠清楚。請再稟報清楚後重新擲筊。' },
  yin: { name: '陰筊', meaning: '兩面皆凸，神明暫不同意或時機未到。請靜心再稟報一次後重新擲筊。' },
};

function randomThrow(): ThrowResult {
  const a = new Uint8Array(1);
  crypto.getRandomValues(a);
  const r = a[0] % 4;
  return r < 2 ? 'sheng' : r === 2 ? 'xiao' : 'yin';
}

const lotLabel = (lot: Lot) => `第${lot.no}籤 ${lot.ganzhi}`;
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
const fieldSx = {
  '& .MuiInputBase-root': { backgroundColor: 'rgba(255,245,220,.95)', fontSize: '1.1rem' },
  '& .MuiInputLabel-root': { color: '#5a2a1a' },
};

function Stepper({ step }: { step: Step }) {
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
          <Typography sx={{ fontSize: { xs: '0.72rem', sm: '0.9rem' }, mt: 0.5, color: i <= idx ? GOLD : '#b99' }}>{s.label}</Typography>
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

const Title = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem' }, fontWeight: 800, color: GOLD, textAlign: 'center', mb: 1.5, letterSpacing: '0.1em' }}>
    {children}
  </Typography>
);

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

  const [step, setStep] = useState<Step>('loading');
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(3);
  const [todayLots, setTodayLots] = useState<number[]>([]);

  // 1. question
  const [mode, setMode] = useState<'quick' | 'form'>('quick');
  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [shichen, setShichen] = useState(SHICHEN[0]);
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
      setError(r.error || '讀取失敗');
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
    const who = mode === 'form' && name.trim() ? name.trim() : user?.username || '信眾';
    const born =
      mode === 'form' && birth
        ? `，${birth.split('-').map(Number).map((v, i) => `${v} ${'年月日'[i]}`).join(' ')}${shichen !== SHICHEN[0] ? ` ${shichen.split(' ')[0]}` : ''}生`
        : '';
    const home = mode === 'form' && address.trim() ? `，現居 ${address.trim()}` : '';
    const matter = mode === 'form' && question.trim() ? question.trim() : topic || '心中所問之事';
    return `${DEITY}在上，弟子 ${who}${born}${home}。今日誠心祈求，為「${matter}」之事，懇請聖母慈悲指點迷津，賜予靈籤。`;
  }, [mode, name, birth, shichen, address, question, topic, user]);

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
    u.lang = 'zh-TW';
    u.rate = 0.85;
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
      } else {
        setError(r.error || '搖籤失敗');
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
        setError(r.error || '擲筊失敗');
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
        setVerifyMsg(`${THROW_INFO[r.data.throw as ThrowResult].name}：聖母示意不是這支籤，請再搖一次。`);
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
      <Typography sx={{ position: 'relative', fontSize: { xs: '2rem', sm: '2.4rem' }, fontWeight: 900, color: GOLD, letterSpacing: '0.2em' }}>線上求籤</Typography>
      <Typography sx={{ position: 'relative', fontSize: '1.05rem', color: '#F3D9A4' }}>天上聖母 · 六十甲子籤</Typography>
      <Typography sx={{ position: 'relative', mt: 1, fontSize: '1.1rem', fontWeight: 700 }}>全程約 3 分鐘，共 6 步驟　·　今日還可求 {remaining} 支</Typography>
    </Box>
  );

  return (
    <Box sx={pageSx}>
      <Container maxWidth="sm" sx={{ pt: 1 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(sanctuaryId ? `/sanctuary/${sanctuaryId}` : '/')} sx={{ color: GOLD, fontSize: '1.05rem' }}>
          返回
        </Button>
        {header}
        {['ask', 'pray', 'permit', 'shake', 'verify', 'poem'].includes(step) && <Stepper step={step} />}
        {error && <Alert severity="error" sx={{ mb: 2, fontSize: '1.05rem' }}>{error}</Alert>}

        {step === 'loading' && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CircularProgress sx={{ color: GOLD }} />
          </Box>
        )}

        {step === 'age' && (
          <Panel>
            <Title>求籤須知</Title>
            <Big>
              線上求籤免費，每人每天可求 3 支籤。
              <br />
              籤詩與解說僅供參考，重大決定請審慎評估。
              <br />
              本服務僅供 <b>年滿 20 歲</b> 者使用。
            </Big>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                sx={goldButton}
                onClick={async () => {
                  const r = await apiClient.confirmAdult();
                  if (r.success) setStep(remaining > 0 ? 'ask' : 'limit');
                  else setError(r.error || '確認失敗');
                }}
              >
                我已年滿 20 歲
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'ask' && (
          <Panel>
            <Title>一、虔誠求問</Title>
            <Big>請先靜心，想清楚要請示聖母的事情。</Big>
            <ToggleButtonGroup
              exclusive
              fullWidth
              value={mode}
              onChange={(_, v) => v && setMode(v)}
              sx={{ my: 2, '& .MuiToggleButton-root': { color: '#F3D9A4', borderColor: GOLD, fontSize: '1.05rem' }, '& .Mui-selected': { backgroundColor: 'rgba(232,193,112,.25) !important', color: `${GOLD} !important` } }}
            >
              <ToggleButton value="quick">快速選擇</ToggleButton>
              <ToggleButton value="form">填表稟報</ToggleButton>
            </ToggleButtonGroup>

            {mode === 'quick' ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {TOPICS.map((t) => (
                  <Chip
                    key={t}
                    label={t}
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
                <TextField label="姓名" value={name} onChange={(e) => setName(e.target.value)} sx={fieldSx} slotProps={{ htmlInput: { maxLength: 20 } }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField label="生辰（國曆）" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} sx={{ ...fieldSx, flex: 1 }} slotProps={{ inputLabel: { shrink: true } }} />
                  <TextField select label="時辰" value={shichen} onChange={(e) => setShichen(e.target.value)} sx={{ ...fieldSx, width: 140 }}>
                    {SHICHEN.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <TextField label="現居地（選填，例如：台中市）" value={address} onChange={(e) => setAddress(e.target.value)} sx={fieldSx} slotProps={{ htmlInput: { maxLength: 30 } }} />
                <TextField label="所問之事" value={question} onChange={(e) => setQuestion(e.target.value)} multiline minRows={2} sx={fieldSx} slotProps={{ htmlInput: { maxLength: 80 } }} />
                <Typography sx={{ fontSize: '0.95rem', color: '#d9b98a' }}>※ 這些資料只用來組成稟報內容，不會儲存。</Typography>
              </Box>
            )}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button sx={goldButton} disabled={!canAsk} onClick={startPrayer}>
                下一步：默唸稟報
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'pray' && (
          <Panel>
            <Title>二、默唸稟報</Title>
            <Big>請雙手合十，在心中默唸以下內容：</Big>
            <Box sx={{ my: 2, p: 2.5, backgroundColor: PAPER, color: '#3A1A0A', borderRadius: 1, border: '2px solid #9A6B2F' }}>
              <Typography sx={{ fontFamily: '"Noto Serif TC", serif', fontSize: '1.3rem', lineHeight: 2, fontWeight: 700 }}>{petition}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              {'speechSynthesis' in window && (
                <Button onClick={readAloud} sx={{ color: GOLD, fontSize: '1.05rem', mb: 1 }}>
                  🔊 代為稟報（唸出來）
                </Button>
              )}
              <Typography sx={{ fontSize: '1.3rem', my: 1 }}>{prayLeft > 0 ? `靜心默唸… ${prayLeft} 秒` : '稟報完成 🙏'}</Typography>
              <Button sx={goldButton} disabled={prayLeft > PRAY_SECONDS - 8} onClick={() => { window.speechSynthesis?.cancel(); setThrowResult(null); setStep('permit'); }}>
                稟報完畢，請示聖母
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'permit' && (
          <Panel>
            <Title>三、請示神明</Title>
            <Big>擲筊請問聖母：是否允許求籤？<br />需擲出「聖筊」（一正一反）。</Big>
            <Box sx={{ my: 3 }}>
              <MoonBlocks result={throwResult} tossing={tossing} />
            </Box>
            {throwResult && !tossing && (
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 900, color: throwResult === 'sheng' ? GOLD : '#F3D9A4' }}>{THROW_INFO[throwResult].name}</Typography>
                <Typography sx={{ fontSize: '1.1rem' }}>{THROW_INFO[throwResult].meaning}</Typography>
                {throwResult !== 'sheng' && failedPermits >= 3 && (
                  <Typography sx={{ fontSize: '1rem', color: '#d9b98a', mt: 1 }}>若多次未獲聖筊，可以換個方式詢問，或改日再來。</Typography>
                )}
              </Box>
            )}
            <Box sx={{ textAlign: 'center' }}>
              {throwResult === 'sheng' && !tossing ? (
                <Button sx={goldButton} onClick={() => { setDraw(null); setStep('shake'); }}>
                  聖母應允，前往搖籤
                </Button>
              ) : (
                <Button sx={goldButton} disabled={tossing} onClick={permitThrow}>
                  {throwResult ? '再擲一次' : '擲筊'}
                </Button>
              )}
            </Box>
          </Panel>
        )}

        {step === 'shake' && (
          <Panel>
            <Title>四、搖籤求籤</Title>
            <Big>心中默念所問之事，搖動籤筒，直到一支籤跳出。</Big>
            {verifyMsg && <Alert severity="info" sx={{ mt: 2, fontSize: '1.05rem' }}>{verifyMsg}</Alert>}
            <Box sx={{ my: 3, position: 'relative' }}>
              <LotCylinder shaking={shaking} lotLabel={draw ? lotLabel(draw.lot) : null} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              {draw ? (
                <>
                  <Typography sx={{ fontSize: '1.6rem', fontWeight: 900, color: GOLD, mb: 1 }}>{lotLabel(draw.lot)}</Typography>
                  <Button sx={goldButton} onClick={verifyLot}>
                    擲筊驗籤
                  </Button>
                </>
              ) : (
                <Button sx={goldButton} disabled={shaking} onClick={shakeLot}>
                  {shaking ? '搖籤中…' : '搖籤'}
                </Button>
              )}
            </Box>
          </Panel>
        )}

        {step === 'verify' && draw && (
          <Panel>
            <Title>五、擲筊驗籤</Title>
            <Big>請問聖母：是否就是「{lotLabel(draw.lot)}」？</Big>
            <Box sx={{ my: 3 }}>
              <MoonBlocks result={throwResult} tossing={tossing} />
            </Box>
            {throwResult && !tossing && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 900, color: GOLD }}>{THROW_INFO[throwResult].name}</Typography>
                {throwResult === 'sheng' ? (
                  <Typography sx={{ fontSize: '1.15rem' }}>聖母應允，就是這支籤 🙏</Typography>
                ) : (
                  <>
                    <Typography sx={{ fontSize: '1.1rem', mb: 2 }}>聖母示意不是這支籤，請重新搖籤。</Typography>
                    <Button sx={goldButton} onClick={() => { setDraw(null); setThrowResult(null); setStep('shake'); }}>
                      重新搖籤
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Panel>
        )}

        {step === 'poem' && result && (
          <Panel>
            <Title>六、籤詩</Title>
            <PoemSlip lot={result} />
            <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,240,210,.08)', border: '1px solid rgba(232,193,112,.4)' }}>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: GOLD, mb: 1 }}>白話解說（僅供參考）</Typography>
              <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.9 }}>{result.explain_zh}</Typography>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: GOLD, mt: 2 }}>English interpretation (for reference only)</Typography>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: '#EBD7B0' }}>{result.explain_en}</Typography>
            </Box>
            <Typography sx={{ mt: 2, fontSize: '0.95rem', color: '#d9b98a' }}>
              ※ 籤詩原文依台灣宮廟通行的六十甲子籤；解說為平台整理的白話參考，詳細解籤可請教宮廟的解籤老師。
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
              <Button sx={goldButton} disabled={remaining <= 0} onClick={again}>
                {remaining > 0 ? `再求一籤（今日還有 ${remaining} 支）` : '今日 3 支籤已求完'}
              </Button>
              <Button onClick={() => navigate(sanctuaryId ? `/sanctuary/${sanctuaryId}` : '/')} sx={{ color: GOLD, fontSize: '1.1rem' }}>
                返回聖地
              </Button>
            </Box>
          </Panel>
        )}

        {step === 'limit' && (
          <Panel>
            <Title>今日已求 3 支籤</Title>
            <Big>感恩聖母指引 🙏 每人每天可求 3 支籤，請明天再來。</Big>
            {todayLots.length > 0 && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.05rem', mb: 1 }}>今天求得的籤（點選可再看一次）：</Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {todayLots.map((n, i) => (
                    <Chip
                      key={i}
                      label={lotLabel(findLot(n))}
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
