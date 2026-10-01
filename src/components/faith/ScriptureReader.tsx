/**
 * Follow-along reader: the lines light up one by one while the phone's own voice reads them,
 * so the visitor can chant or pray along. Nothing is downloaded; no audio files are used.
 * Where the phone has no voice for the language, the lines still advance at a steady pace.
 */
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';
import type { Scripture } from '../../faith/scriptures';

type TR = (zh: string, en: string) => string;

const GOLD = '#e8c170';

function pickVoice(tag: string): SpeechSynthesisVoice | null {
  try {
    const voices = window.speechSynthesis.getVoices();
    const base = tag.split('-')[0].toLowerCase();
    return voices.find((v) => v.lang.replace('_', '-').toLowerCase() === tag.toLowerCase()) || voices.find((v) => v.lang.toLowerCase().startsWith(base)) || null;
  } catch {
    return null;
  }
}

export function ScriptureReader({ scripture, tr }: { scripture: Scripture; tr: TR }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(-1); // highlighted line, -1 = idle
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(true);
  const [done, setDone] = useState(0);
  const timer = useRef<number | null>(null);
  const run = useRef(0); // bumps when playback is cancelled
  const hasVoice = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = () => {
    run.current += 1;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    setPlaying(false);
  };
  useEffect(() => stop, []); // stop when closed or left

  const speak = (i: number, id: number) => {
    if (id !== run.current) return;
    if (i >= scripture.lines.length) {
      setPlaying(false);
      setPos(-1);
      setDone((n) => n + 1);
      return;
    }
    setPos(i);
    const text = scripture.lines[i];
    const next = () => speak(i + 1, id);
    const voice = hasVoice ? pickVoice(scripture.voice) : null;
    if (hasVoice && voice) {
      const u = new SpeechSynthesisUtterance(text.replace(/[，。、：；]/g, ' '));
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = slow ? 0.6 : 0.85;
      u.onend = () => window.setTimeout(next, 350);
      u.onerror = () => window.setTimeout(next, 600);
      window.speechSynthesis.speak(u);
    } else {
      // no voice on this phone: keep a steady reading pace so the visitor can chant along
      timer.current = window.setTimeout(next, Math.max(1600, text.length * (slow ? 520 : 340)));
    }
  };

  const start = () => {
    stop();
    const id = run.current;
    setPlaying(true);
    speak(0, id);
  };

  return (
    <Box sx={{ border: '1px solid rgba(228,193,112,.3)', borderRadius: 2, mb: 1, overflow: 'hidden', background: 'rgba(244,163,0,.05)' }}>
      <Box
        onClick={() => {
          if (open) stop(), setPos(-1);
          setOpen(!open);
        }}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.2, cursor: 'pointer' }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, color: '#f0dba8' }}>{tr(scripture.title[0], scripture.title[1])}</Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(230,220,205,.7)' }}>{tr(scripture.note[0], scripture.note[1])}</Typography>
        </Box>
        <Typography sx={{ color: GOLD }}>{open ? '▲' : '▼'}</Typography>
      </Box>
      <Collapse in={open} unmountOnExit>
        <Box sx={{ px: 1.5, pb: 1.5 }}>
          <Box sx={{ py: 0.5 }}>
            {scripture.lines.map((l, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize: scripture.lines.length === 1 ? '1.5rem' : '1.1rem',
                  lineHeight: 1.9,
                  textAlign: scripture.lines.length === 1 ? 'center' : 'left',
                  color: pos === i ? '#fff3c9' : 'rgba(230,220,205,.78)',
                  background: pos === i ? 'rgba(244,163,0,.25)' : 'transparent',
                  borderRadius: 1,
                  px: 0.8,
                  fontWeight: pos === i ? 800 : 500,
                  transition: 'all .25s',
                }}
              >
                {l}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mt: 1 }}>
            {playing ? (
              <Button size="small" variant="outlined" onClick={() => (stop(), setPos(-1))} sx={{ color: GOLD, borderColor: GOLD }}>
                ⏸ {tr('停止', 'Stop')}
              </Button>
            ) : (
              <Button size="small" variant="contained" onClick={start} sx={{ backgroundColor: '#F4A300' }}>
                ▶ {tr('跟著念', 'Read along')}
              </Button>
            )}
            <Button size="small" onClick={() => setSlow(!slow)} sx={{ color: GOLD }}>
              {slow ? tr('慢速', 'Slow') : tr('正常速度', 'Normal')}
            </Button>
            {scripture.times && done > 0 && (
              <Typography sx={{ fontSize: '0.85rem', color: 'rgba(230,220,205,.75)' }}>
                {tr(`已念 ${done} / ${scripture.times}`, `Done ${done} / ${scripture.times}`)}
              </Typography>
            )}
          </Box>
          {!hasVoice && (
            <Typography sx={{ fontSize: '0.78rem', color: 'rgba(230,220,205,.6)', mt: 0.8 }}>
              {tr('這個瀏覽器沒有朗讀功能，文字仍會一行一行亮起。', 'This browser has no speech voice; the lines will still light up one by one.')}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
