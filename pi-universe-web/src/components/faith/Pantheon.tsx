/**
 * 眾神殿 (Pantheon) — the Taiwan folk sanctuary enshrines many deities side by side, not
 * just one. This shows them grouped by what people most often visit each one for; tapping
 * a deity opens a short introduction plus a lightweight incense + wish flow of its own.
 *
 * Wishes reuse the existing /api/wishes endpoint (so they sync across devices and show up
 * in "My records" like any other wish), tagged with the deity's name in brackets and filed
 * under the closest of the six existing wish categories — the grouping shown here is purely
 * for display and isn't sent to the server.
 */

import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Card, CardActionArea, Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { apiClient } from '../../api/ApiClient';
import { Lang, tx } from '../../i18n/i18n';
import { DEITIES, Deity, GROUPS, GroupKey } from '../../faith/pantheon';

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

interface Wish {
  id: number;
  sanctuary_id: number;
  category: string;
  wish_text: string | null;
  status: 'pending' | 'fulfilled';
  created_at: string;
}

/** Incense just for this one deity: burns until midnight, remembered per device. */
function DeityIncense({ deityKey, tr }: { deityKey: string; tr: TR }) {
  const key = `pu-pantheon-incense-${deityKey}-${today()}`;
  const [lit, setLit] = useState<boolean>(() => load(key, false));
  return (
    <Box sx={{ textAlign: 'center', py: 1 }}>
      <Typography sx={{ fontSize: '2.6rem' }}>{lit ? '🕯️' : '🪔'}</Typography>
      {lit ? (
        <>
          <Typography sx={{ mt: 0.5, fontWeight: 700 }}>{tr('香已點燃，亮到今晚 12 點', 'Incense lit — burns until midnight')}</Typography>
          <Button size="small" sx={{ mt: 1 }} onClick={() => (setLit(false), save(key, false))}>
            {tr('熄香', 'Put out')}
          </Button>
        </>
      ) : (
        <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#8B4513' }} onClick={() => (setLit(true), save(key, true))}>
          🪔 {tr('上香', 'Light incense')}
        </Button>
      )}
    </Box>
  );
}

/** One deity's dialog: introduction, incense, and a short wish (with fulfil-tracking). */
function DeityDialog({ deity, sanctuaryId, tr, lang, onClose }: { deity: Deity; sanctuaryId: number; tr: TR; lang: Lang; onClose: () => void }) {
  const prefix = `[${deity.title[0]}] `;
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [text, setText] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadWishes = async () => {
    const res: any = await apiClient.getWishes();
    if (res.success) setWishes((res.data || []).filter((w: Wish) => w.sanctuary_id === sanctuaryId && (w.wish_text || '').startsWith(prefix)));
  };
  useEffect(() => {
    loadWishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deity.key]);

  const submit = async () => {
    setError('');
    setNotice('');
    setLoading(true);
    const res: any = await apiClient.createWish({ sanctuary_id: sanctuaryId, category: deity.wishCategory, wish_text: prefix + text.trim() });
    setLoading(false);
    if (res.success) {
      setNotice(tr('已記錄您的心願 🙏', 'Your wish has been recorded 🙏'));
      setText('');
      loadWishes();
    } else {
      setError(res.error || tr('許願失敗', 'Could not save the wish'));
    }
  };
  const markFulfilled = async (id: number) => {
    const res: any = await apiClient.fulfilWish(id);
    if (res.success) loadWishes();
  };

  const pending = wishes.filter((w) => w.status === 'pending');
  const fulfilled = wishes.filter((w) => w.status === 'fulfilled');

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm" scroll="body">
      <DialogTitle sx={{ fontSize: '1.4rem', fontWeight: 800, pr: 6 }}>
        {deity.icon} {pick(deity.title, lang)}
        <IconButton aria-label={tr('關閉', 'Close')} onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>{pick(deity.intro, lang)}</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', fontStyle: 'italic', mb: 2 }}>
          {tr('各地廟宇的說法與習俗略有不同，僅供參考。', 'Traditions and customs vary by temple and region — shown here for reference only.')}
        </Typography>

        <DeityIncense deityKey={deity.key} tr={tr} />

        <Typography sx={{ fontWeight: 700, mt: 2, mb: 1 }}>{tr('向祂許願', 'Make a wish')}</Typography>
        <TextField
          fullWidth
          multiline
          minRows={2}
          label={tr('心願內容（可留空）', 'What you wish for (optional)')}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 200))}
          sx={{ mb: 1.5 }}
        />
        <Button variant="contained" fullWidth disabled={loading} onClick={submit} sx={{ backgroundColor: '#F4A300', mb: 1.5 }}>
          🙏 {tr('許願', 'Make this wish')}
        </Button>
        {error && <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert>}
        {notice && <Alert severity="success" sx={{ mb: 1.5 }}>{notice}</Alert>}

        {pending.length > 0 && (
          <>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              {tr('尚未還願', 'Not yet fulfilled')} ({pending.length})
            </Typography>
            {pending.map((w) => (
              <Paper key={w.id} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
                {w.wish_text && <Typography sx={{ mb: 1 }}>{w.wish_text.slice(prefix.length)}</Typography>}
                <Button size="small" variant="outlined" onClick={() => markFulfilled(w.id)}>
                  {tr('標記還願', 'Mark as fulfilled')}
                </Button>
              </Paper>
            ))}
          </>
        )}
        {fulfilled.length > 0 && (
          <>
            <Typography sx={{ fontWeight: 700, mb: 1, mt: pending.length ? 1.5 : 0 }}>
              {tr('已還願', 'Fulfilled')} ({fulfilled.length})
            </Typography>
            {fulfilled.map((w) => (
              <Paper key={w.id} variant="outlined" sx={{ p: 1.5, mb: 1, opacity: 0.75 }}>
                {w.wish_text && <Typography sx={{ fontSize: '0.95rem' }}>{w.wish_text.slice(prefix.length)}</Typography>}
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>✓</Typography>
              </Paper>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PantheonPanel({ sanctuaryId, tr, lang }: { sanctuaryId: number; tr: TR; lang: Lang }) {
  const [group, setGroup] = useState<GroupKey | 'all'>('all');
  const [selected, setSelected] = useState<Deity | null>(null);
  const shown = useMemo(() => (group === 'all' ? DEITIES : DEITIES.filter((d) => d.group === group)), [group]);

  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {tr(
          '台灣廟宇經常合祀多位神明。這裡依照大家常去祈求的事項分類，方便您找到想拜的神明；同一座廟實際供奉哪些神明，各地不盡相同。',
          'Taiwanese folk temples often enshrine many deities together. They are grouped here by what people most often go to each one for, to help you find the one you want; which deities any one temple actually enshrines varies by place.'
        )}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
        <Chip
          label={tr('全部', 'All')}
          onClick={() => setGroup('all')}
          color={group === 'all' ? 'primary' : 'default'}
          variant={group === 'all' ? 'filled' : 'outlined'}
        />
        {GROUPS.map((g) => (
          <Chip
            key={g.key}
            label={`${g.icon} ${pick(g.label, lang)}`}
            onClick={() => setGroup(g.key)}
            color={group === g.key ? 'primary' : 'default'}
            variant={group === g.key ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.2 }}>
        {shown.map((d) => (
          <Card key={d.key} variant="outlined">
            <CardActionArea onClick={() => setSelected(d)} sx={{ py: 1.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography sx={{ fontSize: '2rem' }}>{d.icon}</Typography>
              <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, textAlign: 'center', mt: 0.4, lineHeight: 1.3 }}>{pick(d.title, lang)}</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', textAlign: 'center', mt: 0.2 }}>{pick(d.short, lang)}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      {selected && <DeityDialog deity={selected} sanctuaryId={sanctuaryId} tr={tr} lang={lang} onClose={() => setSelected(null)} />}
    </Box>
  );
}
