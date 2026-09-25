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
import { anonymousName, bookTitle, donateVerb, giftWord } from '../merit/merit';
import { useI18n } from '../i18n/i18n';
import { sanctuaryName } from '../i18n/sanctuaries';

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
  const { tr, lang } = useI18n();
  const word = giftWord(sanctuary?.religion_type, lang);
  const verb = donateVerb(sanctuary?.religion_type, lang);
  const name = sanctuary ? sanctuaryName(sanctuary as any, lang) : '';

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
      onResult({ ok: false, message: tr('請輸入正確的金額', 'Please enter a valid amount') });
      return;
    }
    try {
      await donate({
        amount: value,
        sanctuaryId: sanctuary.id,
        memo: `Donation to ${sanctuaryName(sanctuary as any, 'en')} (π Universe)`,
        anonymous,
      });
      onResult({
        ok: true,
        message: tr(`感謝您的${word}！已向 ${name} ${verb} ${value} π 🙏`, `Thank you! You gave ${value} π to the ${name} 🙏`),
      });
      onClose();
    } catch (err: any) {
      if (err instanceof PaymentCancelledError) onResult({ ok: false, cancelled: true, message: tr('已取消付款', 'Payment cancelled') });
      else onResult({ ok: false, message: err?.message || tr('付款失敗', 'Payment failed') });
    }
  };

  return (
    <Dialog open={!!sanctuary} onClose={() => !paying && onClose()} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontSize: '1.4rem' }}>
        {tr(`${verb}給`, `${verb} to`)} {sanctuary?.icon} {name}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          {tr(`自願隨喜，將記錄在${bookTitle(sanctuary?.religion_type)}。`, `Give what you wish. It will be recorded in the ${bookTitle(sanctuary?.religion_type, 'en')}.`)}
        </Typography>
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
          label={tr('金額 (π)', 'Amount (π)')}
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          slotProps={{ htmlInput: { min: 0.01, step: 0.01, inputMode: 'decimal' } }}
        />
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#FBF6EC' }}>
          <FormControlLabel
            control={<Checkbox checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />}
            label={<Typography sx={{ fontSize: '1.1rem' }}>{tr(`隱名${verb}（不公開我的名字）`, "Give anonymously (don't show my name)")}</Typography>}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4 }}>
            {tr(
              '勾選後，公開名單只顯示「隱名善信」；您自己仍可在「功德簿 → 我的紀錄」看到。',
              `Public lists will show "${anonymousName('en')}". You can still see it under Merit → My record.`
            )}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={paying} sx={{ fontSize: '1.05rem' }}>
          {tr('取消', 'Cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleDonate}
          disabled={paying}
          sx={{ backgroundColor: '#8B4513', fontSize: '1.05rem' }}
        >
          {paying ? <CircularProgress size={22} sx={{ color: 'white' }} /> : tr(`用 Pi ${verb} ${amount || 0} π`, `${verb} ${amount || 0} π with Pi`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
