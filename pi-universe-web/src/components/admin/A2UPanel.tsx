/**
 * Admin only: send a small amount of Pi from the app wallet to one user (App-to-User payment).
 * Pi asks for payments to 5 different wallets on the Testnet app before it hands out a Mainnet wallet.
 */
import { useEffect, useState } from 'react';
import { Paper, Box, Typography, Button, TextField, Alert, LinearProgress } from '@mui/material';
import { apiClient } from '../../api/ApiClient';
import { useI18n } from '../../i18n/i18n';

interface Row {
  payment_id: string;
  to_username: string;
  amount: string | number;
  status: string;
  txid?: string | null;
  error?: string | null;
}

interface Status {
  configured: boolean;
  missing: string[];
  network: string;
  maxAmount: number;
  uniqueWalletsPaid: number;
  target: number;
  recent: Row[];
}

export default function A2UPanel() {
  const { tr } = useI18n();
  const [st, setSt] = useState<Status | null>(null);
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('0.1');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = async () => {
    const res: any = await apiClient.get('/api/admin/a2u/status');
    if (res?.success) setSt(res.data);
  };
  useEffect(() => {
    load();
  }, []);

  const run = async (path: string, body: any, okText: string) => {
    setBusy(true);
    setMsg(null);
    try {
      const res: any = await apiClient.post(path, body);
      if (res?.success) {
        setMsg({ ok: true, text: okText });
        if (path.endsWith('/send')) setUser('');
      } else {
        setMsg({ ok: false, text: res?.error || tr('失敗了', 'Failed') });
      }
    } catch (e: any) {
      setMsg({ ok: false, text: e?.response?.data?.error || e?.message || tr('失敗了', 'Failed') });
    } finally {
      setBusy(false);
      load();
    }
  };

  if (!st) return null;
  const pct = Math.min(100, (st.uniqueWalletsPaid / st.target) * 100);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 0.5 }}>
        {tr('發送測試獎勵 (App → 使用者)', 'Send Pi to a user (App → User)')}
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 1.5 }}>
        {tr(
          `網路：${st.network}。Pi 要求先對 ${st.target} 個不同的錢包完成發款，才能申請 Mainnet 錢包。`,
          `Network: ${st.network}. Pi needs payments to ${st.target} different wallets before the Mainnet wallet can be requested.`
        )}
      </Typography>

      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
        {tr('已完成的不同錢包', 'Different wallets paid')}：{st.uniqueWalletsPaid} / {st.target}
      </Typography>
      <LinearProgress variant="determinate" value={pct} sx={{ mb: 2, height: 8, borderRadius: 4 }} />

      {!st.configured && (
        <Alert severity="warning" sx={{ mb: 1.5 }}>
          {tr('伺服器還沒設定好：', 'The server is not set up yet: ')}
          {st.missing.join(', ')}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
        <TextField
          size="small"
          sx={{ flex: '2 1 160px' }}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder={tr('對方的 Pi 使用者名稱', 'Their Pi username')}
        />
        <TextField
          size="small"
          sx={{ flex: '1 1 80px' }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          slotProps={{ htmlInput: { inputMode: 'decimal' } }}
          placeholder="0.1"
        />
        <Button
          variant="contained"
          disabled={busy || !st.configured || !user.trim() || !(Number(amount) > 0) || Number(amount) > st.maxAmount}
          onClick={() => run('/api/admin/a2u/send', { username: user, amount: Number(amount) }, tr('已發送！', 'Sent!'))}
        >
          {busy ? tr('處理中…', 'Working…') : tr('發送', 'Send')}
        </Button>
      </Box>
      <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 1 }}>
        {tr(`單筆上限 ${st.maxAmount} π。對方需先用 Pi 瀏覽器登入過 π Universe。`, `Max ${st.maxAmount} π per payment. The user must have logged in to π Universe once in the Pi Browser.`)}
      </Typography>

      {msg && <Alert severity={msg.ok ? 'success' : 'error'} sx={{ mb: 1 }}>{msg.text}</Alert>}

      {st.recent.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {st.recent.map((r) => (
            <Box key={r.payment_id} sx={{ py: 0.75, borderTop: '1px solid', borderColor: 'divider', fontSize: '0.88rem' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                <span>
                  {r.to_username} · {Number(r.amount)} π
                </span>
                <span style={{ fontWeight: 600 }}>{r.status}</span>
              </Box>
              {r.status !== 'completed' && r.status !== 'cancelled' && (
                <Box sx={{ mt: 0.5, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button size="small" variant="outlined" disabled={busy} onClick={() => run('/api/admin/a2u/retry', { paymentId: r.payment_id }, tr('已完成', 'Finished'))}>
                    {tr('重試完成', 'Retry')}
                  </Button>
                  {!r.txid && (
                    <Button size="small" disabled={busy} onClick={() => run('/api/admin/a2u/cancel', { paymentId: r.payment_id }, tr('已取消', 'Cancelled'))}>
                      {tr('取消', 'Cancel')}
                    </Button>
                  )}
                  {r.error && <span style={{ opacity: 0.7 }}>{r.error}</span>}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
