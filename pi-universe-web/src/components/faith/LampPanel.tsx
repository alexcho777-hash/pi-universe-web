/**
 * 線上點燈 (online lamp lighting): 光明燈 / 太歲燈 / 文昌燈, paid in Pi (3.14 π, lights for
 * one year). No tax receipt is issued — this mirrors the temple donation box, not a
 * commercial purchase.
 */

import { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardActionArea, CircularProgress, Grid, Paper, TextField, Typography, keyframes } from '@mui/material';
import { apiClient } from '../../api/ApiClient';
import { usePiPayment, PaymentCancelledError } from '../../hooks/usePiPayment';

type TR = (zh: string, en: string) => string;

const LAMP_PRICE = 3.14;
const LAMP_TYPES: { key: 'guangming' | 'taisui' | 'wenchang'; icon: string; label: [string, string]; blurb: [string, string] }[] = [
  { key: 'guangming', icon: '🏮', label: ['光明燈', 'Blessing lamp'], blurb: ['祈求平安順遂、闔家光明', 'For general peace and blessings'] },
  { key: 'taisui', icon: '☯️', label: ['太歲燈', 'Tai Sui lamp'], blurb: ['值年太歲、沖犯生肖者安太歲', 'For those whose zodiac year clashes with the reigning Tai Sui'] },
  { key: 'wenchang', icon: '📚', label: ['文昌燈', 'Wenchang lamp'], blurb: ['祈求考試順利、學業進步', 'For exam success and academic progress'] },
];

const lampFlicker = keyframes`
  0%, 100% { transform: scale(1, 1); opacity: 0.96; }
  25% { transform: scale(0.94, 1.12); opacity: 1; }
  50% { transform: scale(1.05, 0.95); opacity: 0.92; }
  75% { transform: scale(0.96, 1.08); opacity: 1; }
`;
const lampGlow = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
`;

const PLATE: Record<'guangming' | 'taisui' | 'wenchang', { top: string; bottom: string; text: string; zh: string }> = {
  guangming: { top: '#c8402f', bottom: '#7a1f17', text: '#f6dc8a', zh: '光明' },
  taisui: { top: '#5a1620', bottom: '#2a0a10', text: '#f3d27a', zh: '太歲' },
  wenchang: { top: '#2b8a5e', bottom: '#14503a', text: '#f6e7a8', zh: '文昌' },
};

/** A brass oil lamp with a flickering flame and a coloured name plate. */
function LampArt({ kind, size = 110, lit = true }: { kind: 'guangming' | 'taisui' | 'wenchang'; size?: number; lit?: boolean }) {
  const c = PLATE[kind];
  const id = `lp${kind}`;
  return (
    <Box
      component="svg"
      viewBox="0 0 120 140"
      width={size}
      height={(size * 140) / 120}
      sx={{ display: 'block', mx: 'auto', overflow: 'visible', '& .fl': { transformBox: 'fill-box', transformOrigin: '50% 100%', animation: lit ? `${lampFlicker} 0.5s ease-in-out infinite` : 'none' }, '& .fl2': { animationDuration: '0.38s', animationDelay: '0.12s' }, '& .gl': { animation: lit ? `${lampGlow} 1.2s ease-in-out infinite` : 'none' } }}
    >
      <defs>
        <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ff8a2a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d27a" />
          <stop offset="1" stopColor="#a8761c" />
        </linearGradient>
        <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.top} />
          <stop offset="1" stopColor={c.bottom} />
        </linearGradient>
      </defs>
      {lit && <circle className="gl" cx="60" cy="52" r="54" fill={`url(#${id}g)`} />}
      {/* pedestal and plate */}
      <rect x="44" y="88" width="32" height="10" rx="2" fill={`url(#${id}b)`} stroke="#6b4a10" strokeWidth="0.8" />
      <rect x="26" y="98" width="68" height="34" rx="4" fill={`url(#${id}p)`} stroke="#e8c170" strokeWidth="1.4" />
      <rect x="31" y="103" width="58" height="24" rx="2" fill="none" stroke="#e8c170" strokeWidth="0.7" opacity="0.7" />
      <text x="60" y="121" textAnchor="middle" fontSize="15" fontWeight={800} fill={c.text} fontFamily="serif">{c.zh}</text>
      {/* oil bowl */}
      <path d="M30 76 Q60 104 90 76 Q90 70 60 70 Q30 70 30 76Z" fill={`url(#${id}b)`} stroke="#6b4a10" strokeWidth="1" />
      <ellipse cx="60" cy="71" rx="26" ry="4" fill="#3a2410" />
      <path d="M44 80 Q60 90 76 80" stroke="#fff3b0" strokeWidth="1" fill="none" opacity="0.45" />
      {/* wick and flame */}
      <rect x="59" y="62" width="2" height="9" fill="#2a1a0c" />
      {lit && (
        <>
          <path className="fl" d="M60 26 C47 44 49 60 60 64 C71 60 73 44 60 26Z" fill="#ff8a2a" />
          <path className="fl fl2" d="M60 38 C53 49 54 59 60 62 C66 59 67 49 60 38Z" fill="#ffd45a" />
          <path className="fl" d="M60 50 C57 55 57 60 60 61 C63 60 63 55 60 50Z" fill="#fffbe0" />
        </>
      )}
    </Box>
  );
}

export function LampPanel({ sanctuaryId, sanctuaryName: name, tr }: { sanctuaryId: number; sanctuaryName: string; tr: TR }) {
  const [lampType, setLampType] = useState<'guangming' | 'taisui' | 'wenchang'>('guangming');
  const [dedicateName, setDedicateName] = useState('');
  const [counts, setCounts] = useState<Record<string, number>>({ guangming: 0, taisui: 0, wenchang: 0 });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const { lightLamp, isLoading: paying } = usePiPayment();

  const loadCounts = async () => {
    const res: any = await apiClient.getSanctuaryLamps(sanctuaryId);
    if (res.success) setCounts(res.data.counts || {});
  };
  useEffect(() => {
    loadCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanctuaryId]);

  const submit = async () => {
    setError('');
    setNotice('');
    try {
      await lightLamp({
        amount: LAMP_PRICE,
        sanctuaryId,
        memo: `${LAMP_TYPES.find((l) => l.key === lampType)?.label[1]} (π Universe)`,
        lampType,
        dedicateName: dedicateName.trim(),
      });
      setNotice(tr('點燈成功！燈已點亮一年 🙏', 'Lamp lit! It will stay lit for one year 🙏'));
      setDedicateName('');
      loadCounts();
    } catch (err: any) {
      if (err instanceof PaymentCancelledError) setError(tr('已取消付款', 'Payment cancelled'));
      else setError(err?.message || tr('點燈失敗', 'Failed to light the lamp'));
    }
  };

  const selected = LAMP_TYPES.find((l) => l.key === lampType)!;

  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr(`為 ${name} 點一盞燈，${LAMP_PRICE} π，效期一年（不開立收據）。`, `Light a lamp for the ${name} — ${LAMP_PRICE} π, lasts one year (no receipt is issued).`)}
      </Typography>

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {LAMP_TYPES.map((l) => (
          <Grid size={4} key={l.key}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderColor: lampType === l.key ? '#F5D67B' : '#3a2f1d',
                borderWidth: lampType === l.key ? 2 : 1,
                bgcolor: lampType === l.key ? 'rgba(212,175,55,.10)' : '#17130d',
                borderRadius: 3,
                boxShadow: lampType === l.key ? '0 0 22px rgba(245,214,123,.28)' : 'none',
                transition: 'box-shadow .2s ease',
              }}
            >
              <CardActionArea onClick={() => setLampType(l.key)} sx={{ height: '100%', py: 1.5, display: 'flex', flexDirection: 'column' }}>
                <LampArt kind={l.key} size={52} lit={lampType === l.key} />
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, textAlign: 'center', color: '#f2ead9' }}>{tr(l.label[0], l.label[1])}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: '#c9a24b' }}>
                  {tr('目前', 'Now')} {counts[l.key] || 0}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'rgba(212,175,55,.10)', textAlign: 'center' }}>
        <LampArt kind={lampType} size={120} />
        <Typography sx={{ fontWeight: 700, mt: 0.5 }}>{tr(selected.label[0], selected.label[1])}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{tr(selected.blurb[0], selected.blurb[1])}</Typography>
        {dedicateName.trim() && (
          <Typography sx={{ mt: 0.75, color: '#F5D67B', fontWeight: 700 }}>
            {tr('點燈人：', 'Lit for: ')}
            {dedicateName.trim()}
          </Typography>
        )}
      </Paper>

      <TextField
        fullWidth
        label={tr('點燈人姓名（會顯示在燈上，可留空）', "Name for the lamp (shown on it, optional)")}
        value={dedicateName}
        onChange={(e) => setDedicateName(e.target.value.slice(0, 100))}
        sx={{ mb: 2 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {notice && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {notice}
        </Alert>
      )}

      <Button variant="contained" fullWidth size="large" onClick={submit} disabled={paying} sx={{ backgroundColor: '#B8912F' }}>
        {paying ? <CircularProgress size={22} sx={{ color: 'white' }} /> : tr(`用 Pi 點燈 ${LAMP_PRICE} π`, `Light with ${LAMP_PRICE} π`)}
      </Button>
    </Box>
  );
}
