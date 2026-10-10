/**
 * "Listen" button: reads the given lines aloud with the phone's / computer's own voice and
 * turns the sanctuary's background sound down meanwhile. No audio files are used.
 */
import { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';

function pickVoice(tag: string): SpeechSynthesisVoice | null {
  try {
    const voices = window.speechSynthesis.getVoices();
    const base = tag.split('-')[0].toLowerCase();
    return voices.find((v) => v.lang.replace('_', '-').toLowerCase() === tag.toLowerCase()) || voices.find((v) => v.lang.toLowerCase().startsWith(base)) || null;
  } catch {
    return null;
  }
}

/** true when this device has a speech voice for the language (voices can load a moment late) */
export function useVoiceAvailable(tag: string): boolean {
  const [ok, setOk] = useState<boolean>(() => !!pickVoice(tag));
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const update = () => setOk(!!pickVoice(tag));
    update();
    window.speechSynthesis.addEventListener?.('voiceschanged', update);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', update);
  }, [tag]);
  return ok;
}

export const NO_VOICE_NOTE: [string, string] = ['這個裝置沒有此語言的語音，目前無法朗讀（尚無錄音檔）。', 'This device has no voice for this language, so it cannot be read aloud (no recordings yet).'];

export function ListenButton({ lines, voice, label, stopLabel, slow = true, sx, noVoiceText }: { lines: string[]; voice: string; label: string; stopLabel: string; slow?: boolean; sx?: object; noVoiceText?: string }) {
  const hasVoiceForLang = useVoiceAvailable(voice);
  const [playing, setPlaying] = useState(false);
  const run = useRef(0);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = () => {
    run.current += 1;
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    setPlaying(false);
  };
  useEffect(() => stop, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!playing) return;
    window.dispatchEvent(new CustomEvent('pu-reading', { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent('pu-reading', { detail: false }));
    };
  }, [playing]);

  if (!supported) return null;
  if (!hasVoiceForLang) {
    return noVoiceText ? <Typography sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'text.secondary', mt: 1 }}>{noVoiceText}</Typography> : null;
  }

  const start = () => {
    const my = ++run.current;
    setPlaying(true);
    const v = pickVoice(voice);
    const next = (i: number) => {
      if (my !== run.current) return;
      if (i >= lines.length) {
        setPlaying(false);
        return;
      }
      const u = new SpeechSynthesisUtterance(lines[i]);
      u.lang = voice;
      if (v) u.voice = v;
      u.rate = slow ? 0.7 : 0.9;
      u.onend = () => window.setTimeout(() => next(i + 1), 300);
      u.onerror = () => {
        if (my === run.current) setPlaying(false);
      };
      try {
        window.speechSynthesis.speak(u);
      } catch {
        setPlaying(false);
      }
    };
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
    next(0);
  };

  return (
    <Button variant="outlined" onClick={playing ? stop : start} sx={{ color: '#e8c170', borderColor: '#e8c170', ...sx }}>
      {playing ? `⏹ ${stopLabel}` : `🔊 ${label}`}
    </Button>
  );
}
