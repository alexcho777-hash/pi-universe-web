/**
 * 線上點燈 (online lamp lighting): 光明燈 / 太歲燈 / 文昌燈, paid in Pi (3.14 π, lights for
 * one year). No tax receipt is issued — this mirrors the temple donation box, not a
 * commercial purchase.
 */

import { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardActionArea, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { apiClient } from '../../api/ApiClient';
import { usePiPayment, PaymentCancelledError } from '../../hooks/usePiPayment';

type TR = (zh: string, en: string) => string;

const LAMP_PRICE = 3.14;
const LAMP_TYPES: { key: 'guangming' | 'taisui' | 'wenchang'; icon: string; label: [string, string]; blurb: [string, string] }[] = [
  { key: 'guangming', icon: '🏮', label: ['光明燈', 'Blessing lamp'], blurb: ['祈求平安順遂、闔家光明', 'For general peace and blessings'] },
  { key: 'taisui', icon: '☯️', label: ['太歲燈', 'Tai Sui lamp'], blurb: ['值年太歲、沖犯生肖者安太歲', 'For those whose zodiac year clashes with the reigning Tai Sui'] },
  { key: 'wenchang', icon: '📚', label: ['文昌燈', 'Wenchang lamp'], blurb: ['祈求考試順利、學業進步', 'For exam success and academic progress'] },
];

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
                borderColor: lampType === l.key ? '#8B4513' : undefined,
                borderWidth: lampType === l.key ? 2 : 1,
                bgcolor: lampType === l.key ? '#FBF6EC' : undefined,
              }}
            >
              <CardActionArea onClick={() => setLampType(l.key)} sx={{ height: '100%', py: 1.5, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '1.6rem' }}>{l.icon}</Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, textAlign: 'center' }}>{tr(l.label[0], l.label[1])}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>
                  {tr('目前', 'Now')} {counts[l.key] || 0}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: '#FBF6EC' }}>
        <Typography sx={{ fontWeight: 700 }}>
          {selected.icon} {tr(selected.label[0], selected.label[1])}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{tr(selected.blurb[0], selected.blurb[1])}</Typography>
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

      <Button variant="contained" fullWidth size="large" onClick={submit} disabled={paying} sx={{ backgroundColor: '#8B4513' }}>
        {paying ? <CircularProgress size={22} sx={{ color: 'white' }} /> : tr(`用 Pi 點燈 ${LAMP_PRICE} π`, `Light with ${LAMP_PRICE} π`)}
      </Button>
    </Box>
  );
}
