/**
 * Donation dialog (Pi payment) with the 隱名 (anonymous) option.
 * Used on the home page and on each sanctuary page.
 */

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Sanctuary } from '../types';
import { usePiPayment, PaymentCancelledError } from '../hooks/usePiPayment';
import { donateVerb, giftWord } from '../merit/merit';

const PRESET_AMOUNTS = [1, 3.14, 10];

interface Props {
  sanctuary: Pick<Sanctuary, 'id' | 'name' | 'icon' | 'religion_type'> | null;
  onClose: () => void;
  /** Called after a finished payment, or with a message for cancel / error */
  onResult: (result: { ok: boolean; cancelled?: boolean; message: string }) => void;
}

export default function DonateDialog({ sanctuary, onClose, onResult }: Props) {
  const [amount, setAmount] = useState('1');
  const [anonymous, setAnonymous] = useState(false);
  const { donate, isLoading: paying } = usePiPayment();
  const word = giftWord(sanctuary?.religion_type);
  const verb = donateVerb(sanctuary?.religion_type);

  useEffect(() => {
    if (sanctuary) {
      setAmount('1');
      setAnonymous(false);
    }
  }, [sanctuary]);

  const handleDonate = async () => {
    if (!sanctuary) return;
    const value = Math.round(parseFloat(amount) * 1e7) / 1e7;
    if (!(value > 0)) {
      onResult({ ok: false, message: '請輸入正確的金額' });
      return;
    }
    try {
      await donate({
        amount: value,
        sanctuaryId: sanctuary.id,
        memo: `Donation to ${sanctuary.name} (π Universe)`,
        anonymous,
      });
      onResult({ ok: true, message: `感謝您的${word}！已向 ${sanctuary.name} ${verb} ${value} π 🙏` });
      onClose();
    } catch (err: any) {
      if (err instanceof PaymentCancelledError) onResult({ ok: false, cancelled: true, message: '已取消付款' });
      else onResult({ ok: false, message: err?.message || '付款失敗' });
    }
  };

  return (
    <Dialog open={!!sanctuary} onClose={() => !paying && onClose()} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontSize: '1.4rem' }}>
        {verb}給 {sanctuary?.icon} {sanctuary?.name}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>自願隨喜，將記錄在{word === '功德' ? '功德簿' : `${word}紀錄`}。</Typography>
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={PRESET_AMOUNTS.includes(parseFloat(amount)) ? parseFloat(amount) : null}
          onChange={(_, v) => v !== null && setAmount(String(v))}
          sx={{ mb: 2 }}
        >
          {PRESET_AMOUNTS.map((a) => (
            <ToggleButton key={a} value={a} sx={{ fontSize: '1.1rem' }}>
              {a} π
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TextField
          label="金額 (π)"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          slotProps={{ htmlInput: { min: 0.01, step: 0.01, inputMode: 'decimal' } }}
        />
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#FBF6EC' }}>
          <FormControlLabel
            control={<Checkbox checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />}
            label={<Typography sx={{ fontSize: '1.1rem' }}>隱名{verb}（不公開我的名字）</Typography>}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4 }}>
            勾選後，公開名單只顯示「隱名善信」；您自己仍可在「功德簿 → 我的紀錄」看到。
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={paying} sx={{ fontSize: '1.05rem' }}>
          取消
        </Button>
        <Button
          variant="contained"
          onClick={handleDonate}
          disabled={paying}
          sx={{ backgroundColor: '#8B4513', fontSize: '1.05rem' }}
        >
          {paying ? <CircularProgress size={22} sx={{ color: 'white' }} /> : `用 Pi ${verb} ${amount || 0} π`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
