/**
 * Activity tools for each faith. Everything runs on the device; counts and personal
 * wishes are kept only in this browser (nothing is sent to the server).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Box, Button, Chip, LinearProgress, MenuItem, TextField, Typography, keyframes } from '@mui/material';
import { Lang } from '../../i18n/i18n';
import { LORDS_PRAYER, MYSTERIES, RECITATIONS, ROSARY_PRAYERS, verseOfTheDay } from '../../faith/texts';
import { CITIES, hhmm, prayerTimes, qiblaBearing } from '../../faith/prayerTimes';
import { MoonBlocks, ThrowResult } from '../../oracle/OracleArt';

type TR = (zh: string, en: string) => string;
const pick = (pair: [string, string], lang: Lang) => (lang === 'en' ? pair[1] : pair[0]);
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
const buzz = (ms = 8) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* no vibration */
  }
};

const Big = ({ children }: { children: React.ReactNode }) => <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}>{children}</Typography>;

// ---------------------------------------------------------------------------
// Bead counter: 念佛 / japa mala / tasbih
// ---------------------------------------------------------------------------
export function BeadCounter({ faith, lang, tr }: { faith: 'buddhist' | 'hindu' | 'islamic'; lang: Lang; tr: TR }) {
  const options = RECITATIONS[faith];
  const [idx, setIdx] = useState(0);
  const rec = options[idx];
  const key = `pu-beads-${faith}-${idx}`;
  const [count, setCount] = useState<number>(() => load(`${key}-${today()}`, 0));
  const [total, setTotal] = useState<number>(() => load(`${key}-total`, 0));

  useEffect(() => {
    setCount(load(`${key}-${today()}`, 0));
    setTotal(load(`${key}-total`, 0));
  }, [key]);

  const tap = () => {
    const c = count + 1;
    const t = total + 1;
    setCount(c);
    setTotal(t);
    save(`${key}-${today()}`, c);
    save(`${key}-total`, t);
    buzz(c % rec.target === 0 ? 120 : 8);
  };
  const round = count % rec.target;
  const rounds = Math.floor(count / rec.target);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
        {options.map((o, i) => (
          <Chip
            key={i}
            label={pick(o.label, lang)}
            onClick={() => setIdx(i)}
            color={i === idx ? 'primary' : 'default'}
            variant={i === idx ? 'filled' : 'outlined'}
            sx={{ fontSize: '1rem', height: 38 }}
          />
        ))}
      </Box>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, mb: 0.5 }}>{rec.text}</Typography>
      {lang === 'en' && rec.romanized && <Typography sx={{ fontSize: '1.1rem', fontStyle: 'italic', mb: 0.5 }}>{rec.romanized}</Typography>}
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>{pick(rec.hint, lang)}</Typography>
      <Box
        component="button"
        onClick={tap}
        sx={{
          width: 190,
          height: 190,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'radial-gradient(circle at 35% 30%, #FFE7A8, #D9A441 55%, #8A5A12)',
          boxShadow: '0 8px 24px rgba(138,90,18,.45), inset 0 -6px 14px rgba(0,0,0,.25)',
          color: '#3A2206',
          fontSize: '3.2rem',
          fontWeight: 800,
          transition: 'transform .08s',
          '&:active': { transform: 'scale(.95)' },
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label={tr('點一下計數', 'Tap to count')}
      >
        {round}
      </Box>
      <Typography sx={{ mt: 1, color: 'text.secondary' }}>{tr('點圓珠計數一次', 'Tap the bead for each recitation')}</Typography>
      <LinearProgress variant="determinate" value={(round / rec.target) * 100} sx={{ height: 10, borderRadius: 5, my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        {[
          [tr('本輪', 'This round'), `${round} / ${rec.target}`],
          [tr('今日', 'Today'), tr(`${count}（${rounds} 輪）`, `${count} (${rounds} rounds)`)],
          [tr('累計', 'All time'), String(total)],
        ].map(([k, v]) => (
          <Box key={k}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800 }}>{v}</Typography>
            <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{k}</Typography>
          </Box>
        ))}
      </Box>
      {round === 0 && count > 0 && <Alert severity="success" sx={{ mt: 2, fontSize: '1.05rem' }}>{tr('一輪圓滿，功德無量 🙏', 'A full round completed 🙏')}</Alert>}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Rosary
// ---------------------------------------------------------------------------
export function RosaryGuide({ lang, tr }: { lang: Lang; tr: TR }) {
  const weekday = new Date().getDay();
  const set = MYSTERIES.find((m) => m.days.includes(weekday)) || MYSTERIES[0];
  // Each decade: Our Father, 10 Hail Marys, Glory Be = 12 beads
  const [step, setStep] = useState(0);
  const decade = Math.floor(step / 12);
  const bead = step % 12;
  const done = decade >= 5;
  const prayer = bead === 0 ? ROSARY_PRAYERS.ourFather : bead === 11 ? ROSARY_PRAYERS.gloryBe : ROSARY_PRAYERS.hailMary;

  return (
    <Box>
      <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
        {tr(`今天默想：${set.name[0]}`, `Today's mysteries: ${set.name[1]}`)}
      </Typography>
      {!done ? (
        <>
          <Chip label={tr(`第 ${decade + 1} 端：${set.items[decade][0]}`, `Decade ${decade + 1}: ${set.items[decade][1]}`)} color="primary" sx={{ fontSize: '1rem', mb: 2, height: 'auto', py: 0.6, '& .MuiChip-label': { whiteSpace: 'normal' } }} />
          <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap', mb: 2 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <Box
                key={i}
                sx={{
                  width: i === 0 || i === 11 ? 20 : 14,
                  height: i === 0 || i === 11 ? 20 : 14,
                  borderRadius: '50%',
                  bgcolor: i < bead ? '#5B2A93' : i === bead ? '#F4C152' : '#ddd',
                  alignSelf: 'center',
                }}
              />
            ))}
          </Box>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: 800 }}>
            {pick(prayer.name, lang)}
            {bead >= 1 && bead <= 10 ? ` (${bead}/10)` : ''}
          </Typography>
          <Box sx={{ my: 1.5, p: 2, bgcolor: '#F8F4FF', borderRadius: 2 }}>
            <Big>{pick(prayer.text, lang)}</Big>
          </Box>
          <Button variant="contained" size="large" fullWidth onClick={() => setStep(step + 1)} sx={{ fontSize: '1.15rem', py: 1.4 }}>
            {tr('唸完，下一顆', 'Done — next bead')}
          </Button>
          <Typography sx={{ mt: 1, color: 'text.secondary', textAlign: 'center' }}>
            {tr(`全程約 20 分鐘・已完成 ${decade} / 5 端`, `About 20 minutes · ${decade} of 5 decades done`)}
          </Typography>
        </>
      ) : (
        <Alert severity="success" sx={{ fontSize: '1.1rem' }}>
          {tr('玫瑰經五端已圓滿，願天主降福你 🙏', 'You have prayed all five decades. God bless you 🙏')}
          <Box>
            <Button onClick={() => setStep(0)} sx={{ mt: 1 }}>
              {tr('重新開始', 'Start again')}
            </Button>
          </Box>
        </Alert>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Daily verse, the Lord's Prayer and a quiet prayer timer
// ---------------------------------------------------------------------------
export function VersePanel({ lang, tr }: { lang: Lang; tr: TR }) {
  const v = verseOfTheDay();
  return (
    <Box>
      <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: '#FFF9EC', borderLeft: '5px solid #D4AF37' }}>
        <Typography sx={{ fontSize: '1.3rem', lineHeight: 1.9, fontFamily: '"Noto Serif TC", Georgia, serif' }}>{lang === 'en' ? v.en : v.zh}</Typography>
        <Typography sx={{ mt: 1, textAlign: 'right', fontWeight: 700 }}>— {pick(v.ref, lang)}</Typography>
      </Box>
      <Typography sx={{ mt: 1, fontSize: '0.9rem', color: 'text.secondary' }}>
        {tr('經文：和合本（公共領域）・每天更新', 'Scripture: King James Version (public domain) · a new verse every day')}
      </Typography>
    </Box>
  );
}

export function PrayerPanel({ lang, tr }: { lang: Lang; tr: TR }) {
  const [left, setLeft] = useState<number | null>(null);
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current) window.clearInterval(timer.current);
  }, []);
  const start = () => {
    setLeft(180);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setLeft((s) => {
        if (s === null || s <= 1) {
          if (timer.current) window.clearInterval(timer.current);
          buzz(200);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };
  return (
    <Box>
      <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, mb: 1 }}>{tr('主禱文', "The Lord's Prayer")}</Typography>
      <Box sx={{ p: 2, bgcolor: '#F8F4FF', borderRadius: 2 }}>
        <Big>{pick(LORDS_PRAYER, lang)}</Big>
      </Box>
      <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, mt: 3, mb: 1 }}>{tr('安靜禱告 3 分鐘', '3 minutes of quiet prayer')}</Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {tr('把心中的感謝、憂慮與盼望，安靜地交託給神。', 'Quietly bring your thanks, worries and hopes to God.')}
      </Typography>
      {left === null ? (
        <Button variant="contained" size="large" fullWidth onClick={start} sx={{ fontSize: '1.15rem' }}>
          {tr('開始禱告', 'Begin')}
        </Button>
      ) : left > 0 ? (
        <>
          <LinearProgress variant="determinate" value={((180 - left) / 180) * 100} sx={{ height: 10, borderRadius: 5 }} />
          <Typography sx={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, mt: 1 }}>{`${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}</Typography>
        </>
      ) : (
        <Alert severity="success" sx={{ fontSize: '1.1rem' }}>{tr('阿們 🙏', 'Amen 🙏')}</Alert>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Catholic candle
// ---------------------------------------------------------------------------
const flicker = keyframes`
  0%, 100% { transform: scaleY(1) translateX(0); opacity: .95; }
  25% { transform: scaleY(1.08) translateX(-1px); opacity: 1; }
  50% { transform: scaleY(.94) translateX(1px); opacity: .9; }
  75% { transform: scaleY(1.04) translateX(0); opacity: 1; }
`;

function Flame({ size = 1 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: 26 * size,
        height: 52 * size,
        mx: 'auto',
        borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%',
        background: 'radial-gradient(ellipse at 50% 75%, #fff 0%, #FFE9A8 25%, #FFB23F 55%, rgba(255,120,30,.2) 100%)',
        boxShadow: `0 0 ${30 * size}px ${12 * size}px rgba(255,190,80,.55)`,
        transformOrigin: '50% 90%',
        animation: `${flicker} 1.6s ease-in-out infinite`,
      }}
    />
  );
}

export function CandlePanel({ tr }: { tr: TR }) {
  const key = `pu-candle-${today()}`;
  const [lit, setLit] = useState<{ intention: string } | null>(() => load(key, null));
  const [intention, setIntention] = useState('');
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ py: 3, borderRadius: 2, background: 'linear-gradient(180deg,#1b1030,#2d1a4d)' }}>
        {lit ? <Flame /> : <Box sx={{ height: 52 }} />}
        <Box sx={{ width: 6, height: 10, bgcolor: '#333', mx: 'auto' }} />
        <Box sx={{ width: 60, height: 120, mx: 'auto', borderRadius: '6px 6px 4px 4px', background: 'linear-gradient(90deg,#f3eee3,#fffdf6,#e6dfcf)' }} />
      </Box>
      {lit ? (
        <Box sx={{ mt: 2 }}>
          <Big>{tr('蠟燭已點燃，今天都會為你的心意燃燒。', 'Your candle is lit and will burn for your intention all day.')}</Big>
          {lit.intention && <Typography sx={{ mt: 1, fontStyle: 'italic' }}>「{lit.intention}」</Typography>}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={tr('祈禱意向（選填，只存在你的手機）', 'Prayer intention (optional, kept on this device only)')}
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            slotProps={{ htmlInput: { maxLength: 60 } }}
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 1.5, fontSize: '1.15rem' }}
            onClick={() => {
              const v = { intention: intention.trim() };
              setLit(v);
              save(key, v);
              buzz(40);
            }}
          >
            {tr('🕯️ 點燃蠟燭', '🕯️ Light the candle')}
          </Button>
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Islamic prayer times & Qibla
// ---------------------------------------------------------------------------
type Place = { lat: number; lng: number; name: string };

function usePlace(tr: TR) {
  const [place, setPlace] = useState<Place | null>(() => load('pu-place', null));
  const [error, setError] = useState<string | null>(null);
  const locate = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError(tr('此裝置無法定位，請選擇城市', 'Location is not available — please choose a city'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude, name: tr('我的位置', 'My location') };
        setPlace(p);
        save('pu-place', p);
      },
      () => setError(tr('無法取得位置，請選擇城市', 'Could not get your location — please choose a city')),
      { timeout: 10000, maximumAge: 600000 }
    );
  };
  const choose = (p: Place) => {
    setPlace(p);
    save('pu-place', p);
  };
  return { place, locate, choose, error };
}

function PlacePicker({ lang, tr, place, locate, choose, error }: { lang: Lang; tr: TR } & ReturnType<typeof usePlace>) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
      <Button variant="outlined" onClick={locate}>
        📍 {tr('使用我的位置', 'Use my location')}
      </Button>
      <TextField
        select
        size="small"
        label={tr('或選擇城市', 'Or choose a city')}
        value={CITIES.findIndex((c) => place && c.lat === place.lat && c.lng === place.lng)}
        onChange={(e) => {
          const c = CITIES[Number(e.target.value)];
          if (c) choose({ lat: c.lat, lng: c.lng, name: pick(c.name, lang) });
        }}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value={-1} disabled>
          —
        </MenuItem>
        {CITIES.map((c, i) => (
          <MenuItem key={i} value={i}>
            {pick(c.name, lang)}
          </MenuItem>
        ))}
      </TextField>
      {error && <Alert severity="warning" sx={{ width: '100%' }}>{error}</Alert>}
    </Box>
  );
}

export function PrayerTimesPanel({ lang, tr }: { lang: Lang; tr: TR }) {
  const loc = usePlace(tr);
  const now = new Date();
  const times = useMemo(() => {
    if (!loc.place) return null;
    const tz = -now.getTimezoneOffset() / 60;
    return prayerTimes(now, loc.place.lat, loc.place.lng, tz);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.place]);
  const nowH = now.getHours() + now.getMinutes() / 60;
  const rows: [string, string, number | null][] = times
    ? [
        ['晨禮 Fajr', 'Fajr', times.fajr],
        ['日出', 'Sunrise', times.sunrise],
        ['晌禮 Dhuhr', 'Dhuhr', times.dhuhr],
        ['晡禮 Asr', 'Asr', times.asr],
        ['昏禮 Maghrib', 'Maghrib', times.maghrib],
        ['宵禮 Isha', 'Isha', times.isha],
      ]
    : [];
  const next = rows.find(([, en, t]) => en !== 'Sunrise' && t !== null && t > nowH);
  return (
    <Box>
      <PlacePicker lang={lang} tr={tr} {...loc} />
      {loc.place && times && (
        <>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>
            {loc.place.name} · {now.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-TW')}
          </Typography>
          {rows.map(([zh, en, t]) => {
            const isNext = next && next[1] === en;
            return (
              <Box
                key={en}
                sx={{ display: 'flex', justifyContent: 'space-between', p: 1.3, borderRadius: 1.5, mb: 0.5, bgcolor: isNext ? '#E8F5E9' : '#fafafa', border: isNext ? '2px solid #2E7D32' : '1px solid #eee' }}
              >
                <Typography sx={{ fontSize: '1.15rem', fontWeight: isNext ? 800 : 500 }}>
                  {lang === 'en' ? en : zh}
                  {isNext ? tr('（下一個）', ' (next)') : ''}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>{hhmm(t)}</Typography>
              </Box>
            );
          })}
          <Typography sx={{ mt: 1.5, fontSize: '0.9rem', color: 'text.secondary' }}>
            {tr(
              '計算方法：Muslim World League（晨禮 18°、宵禮 17°）。與當地清真寺公告可能相差幾分鐘，請以當地為準。',
              'Method: Muslim World League (Fajr 18°, Isha 17°). Times may differ from your local mosque by a few minutes; follow your local mosque.'
            )}
          </Typography>
        </>
      )}
    </Box>
  );
}

export function QiblaPanel({ lang, tr }: { lang: Lang; tr: TR }) {
  const loc = usePlace(tr);
  const [heading, setHeading] = useState<number | null>(null);
  const bearing = loc.place ? qiblaBearing(loc.place.lat, loc.place.lng) : null;

  useEffect(() => {
    const onOrient = (e: any) => {
      const h = typeof e.webkitCompassHeading === 'number' ? e.webkitCompassHeading : e.absolute && typeof e.alpha === 'number' ? 360 - e.alpha : null;
      if (h !== null) setHeading(h);
    };
    window.addEventListener('deviceorientationabsolute', onOrient as any, true);
    window.addEventListener('deviceorientation', onOrient as any, true);
    return () => {
      window.removeEventListener('deviceorientationabsolute', onOrient as any, true);
      window.removeEventListener('deviceorientation', onOrient as any, true);
    };
  }, []);

  const enableCompass = async () => {
    const D = (window as any).DeviceOrientationEvent;
    if (D && typeof D.requestPermission === 'function') {
      try {
        await D.requestPermission();
      } catch {
        /* denied */
      }
    }
  };

  // With a compass the arrow turns with the phone; without, it is drawn relative to north
  const arrow = bearing === null ? 0 : heading === null ? bearing : bearing - heading;

  return (
    <Box>
      <PlacePicker lang={lang} tr={tr} {...loc} />
      {bearing !== null && (
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative', width: 240, height: 240, mx: 'auto', borderRadius: '50%', border: '4px solid #2E7D32', bgcolor: '#F1F8E9' }}>
            {['N', 'E', 'S', 'W'].map((c, i) => (
              <Typography
                key={c}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  fontWeight: 800,
                  color: c === 'N' ? '#C62828' : '#555',
                  transform: `translate(-50%, -50%) rotate(${i * 90 - (heading ?? 0)}deg) translateY(-100px) rotate(${-(i * 90 - (heading ?? 0))}deg)`,
                }}
              >
                {c}
              </Typography>
            ))}
            <Box sx={{ position: 'absolute', inset: 0, transform: `rotate(${arrow}deg)`, transition: 'transform .2s' }}>
              <Box sx={{ position: 'absolute', left: '50%', top: 22, transform: 'translateX(-50%)', fontSize: '2.2rem' }}>🕋</Box>
              <Box sx={{ position: 'absolute', left: 'calc(50% - 3px)', top: 70, width: 6, height: 70, bgcolor: '#2E7D32', borderRadius: 3 }} />
            </Box>
          </Box>
          <Typography sx={{ mt: 2, fontSize: '1.3rem', fontWeight: 800 }}>
            {tr(`朝拜方向：由正北順時針 ${bearing.toFixed(0)}°`, `Qibla: ${bearing.toFixed(0)}° clockwise from true north`)}
          </Typography>
          {heading === null ? (
            <>
              <Typography sx={{ color: 'text.secondary', mt: 1 }}>
                {tr('圖上的北方為正北。手機有指南針時，箭頭會跟著手機轉動。', 'North on the dial is true north. On phones with a compass, the arrow turns with the phone.')}
              </Typography>
              <Button onClick={enableCompass} sx={{ mt: 1 }}>
                🧭 {tr('啟用指南針', 'Enable compass')}
              </Button>
            </>
          ) : (
            <Typography sx={{ color: 'text.secondary', mt: 1 }}>
              {tr('把手機平放，轉動身體直到 🕋 在正上方。', 'Hold the phone flat and turn until 🕋 is at the top.')}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Shinto: shrine visit etiquette & ema
// ---------------------------------------------------------------------------
const SHRINE_STEPS: [string, string, string][] = [
  ['⛩️', '在鳥居前輕輕一鞠躬，走參道時靠邊走（中央是神明走的路）。', 'Bow lightly before the torii gate. Walk along the side of the path — the center is for the kami.'],
  ['🚰', '在手水舍淨身：洗左手、洗右手，用左手掌盛水漱口，再洗左手，最後立起杓子沖洗杓柄。', 'Purify at the water basin: rinse your left hand, your right hand, your mouth (from your cupped left hand), your left hand again, then tilt the ladle to rinse its handle.'],
  ['🪙', '輕輕投入香油錢（賽錢）。', 'Gently drop a coin into the offering box.'],
  ['🔔', '若有鈴，搖鈴通知神明。', 'If there is a bell, ring it to greet the kami.'],
  ['🙇', '二拜：深深鞠躬兩次。', 'Bow deeply twice.'],
  ['👏', '二拍手：雙手在胸前拍兩下。', 'Clap your hands twice at chest height.'],
  ['🙏', '合掌，在心中說出姓名與祈願。', 'Put your palms together and silently say your name and your wish.'],
  ['🙇', '一拜：再深深鞠躬一次。', 'Bow deeply once more.'],
];

export function ShrinePanel({ lang, tr }: { lang: Lang; tr: TR }) {
  const [step, setStep] = useState(0);
  const done = step >= SHRINE_STEPS.length;
  const s = SHRINE_STEPS[Math.min(step, SHRINE_STEPS.length - 1)];
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ color: 'text.secondary' }}>{tr('二拜二拍手一拜・全程約 2 分鐘', 'Two bows, two claps, one bow · about 2 minutes')}</Typography>
      <LinearProgress variant="determinate" value={(Math.min(step, SHRINE_STEPS.length) / SHRINE_STEPS.length) * 100} sx={{ height: 8, borderRadius: 4, my: 2 }} />
      {!done ? (
        <>
          <Typography sx={{ fontSize: '4rem', lineHeight: 1.2 }}>{s[0]}</Typography>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>{tr(`步驟 ${step + 1} / ${SHRINE_STEPS.length}`, `Step ${step + 1} of ${SHRINE_STEPS.length}`)}</Typography>
          <Big>{lang === 'en' ? s[2] : s[1]}</Big>
          <Button variant="contained" size="large" fullWidth sx={{ mt: 2, fontSize: '1.15rem' }} onClick={() => { setStep(step + 1); buzz(20); }}>
            {tr('下一步', 'Next')}
          </Button>
        </>
      ) : (
        <Alert severity="success" sx={{ fontSize: '1.1rem' }}>
          {tr('參拜完成，願神明守護你 ⛩️', 'Your visit is complete. May the kami watch over you ⛩️')}
          <Box>
            <Button onClick={() => setStep(0)}>{tr('再參拜一次', 'Visit again')}</Button>
          </Box>
        </Alert>
      )}
    </Box>
  );
}

export function EmaPanel({ tr }: { tr: TR }) {
  const [wishes, setWishes] = useState<{ text: string; date: string }[]>(() => load('pu-ema', []));
  const [text, setText] = useState('');
  const add = () => {
    if (!text.trim()) return;
    const next = [{ text: text.trim(), date: today() }, ...wishes].slice(0, 20);
    setWishes(next);
    save('pu-ema', next);
    setText('');
    buzz(30);
  };
  return (
    <Box>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {tr('把心願寫在繪馬上，掛在神社祈求實現。（只存在你的手機）', 'Write your wish on a wooden ema plaque and hang it at the shrine. (Kept on this device only)')}
      </Typography>
      <TextField fullWidth multiline minRows={2} label={tr('我的心願', 'My wish')} value={text} onChange={(e) => setText(e.target.value)} slotProps={{ htmlInput: { maxLength: 60 } }} />
      <Button variant="contained" size="large" fullWidth sx={{ mt: 1.5, fontSize: '1.15rem' }} onClick={add} disabled={!text.trim()}>
        {tr('掛上繪馬', 'Hang the ema')}
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2, justifyContent: 'center' }}>
        {wishes.map((w, i) => (
          <Box
            key={i}
            sx={{
              width: 150,
              minHeight: 100,
              p: 1.5,
              pt: 3,
              position: 'relative',
              background: 'linear-gradient(180deg,#E9C48B,#D4A461)',
              clipPath: 'polygon(50% 0, 100% 22%, 100% 100%, 0 100%, 0 22%)',
              color: '#3A2206',
              fontSize: '0.95rem',
              textAlign: 'center',
            }}
          >
            <Box sx={{ position: 'absolute', top: 10, left: '50%', width: 8, height: 8, ml: '-4px', borderRadius: '50%', bgcolor: '#8B1A1A' }} />
            {w.text}
            <Typography sx={{ fontSize: '0.75rem', mt: 0.5, opacity: 0.7 }}>{w.date}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Hindu aarti
// ---------------------------------------------------------------------------
const circle = keyframes`
  from { transform: rotate(0deg) translateX(46px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(46px) rotate(-360deg); }
`;

export function AartiPanel({ tr }: { tr: TR }) {
  const [lit, setLit] = useState(false);
  const [waves, setWaves] = useState(0);
  const [waving, setWaving] = useState(false);
  const wave = () => {
    setWaving(true);
    buzz(30);
    window.setTimeout(() => {
      setWaving(false);
      setWaves((w) => w + 1);
    }, 1800);
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ color: 'text.secondary' }}>
        {tr('點亮油燈，在神像前順時針繞 7 圈獻上光明・約 2 分鐘', 'Light the diya and wave it clockwise 7 times before the deity · about 2 minutes')}
      </Typography>
      <Box sx={{ position: 'relative', height: 220, mt: 2, borderRadius: 2, background: 'radial-gradient(circle at 50% 40%, #5a1f00, #1a0800)' }}>
        <Typography sx={{ position: 'absolute', left: '50%', top: '28%', transform: 'translate(-50%,-50%)', fontSize: '3.2rem' }}>🕉️</Typography>
        <Box sx={{ position: 'absolute', left: '50%', top: '58%', ml: '-20px', animation: waving ? `${circle} 1.8s linear` : undefined }}>
          <Box sx={{ width: 40, textAlign: 'center' }}>
            {lit && <Flame size={0.6} />}
            <Box sx={{ width: 40, height: 16, borderRadius: '0 0 20px 20px', background: 'linear-gradient(180deg,#D98A3A,#8A4A12)' }} />
          </Box>
        </Box>
      </Box>
      {!lit ? (
        <Button variant="contained" size="large" fullWidth sx={{ mt: 2, fontSize: '1.15rem' }} onClick={() => { setLit(true); buzz(40); }}>
          🪔 {tr('點亮油燈', 'Light the diya')}
        </Button>
      ) : waves < 7 ? (
        <Button variant="contained" size="large" fullWidth sx={{ mt: 2, fontSize: '1.15rem' }} onClick={wave} disabled={waving}>
          {tr(`繞燈一圈（${waves} / 7）`, `Wave the lamp (${waves} / 7)`)}
        </Button>
      ) : (
        <Alert severity="success" sx={{ mt: 2, fontSize: '1.1rem' }}>{tr('Aarti 圓滿 🙏', 'Aarti complete 🙏')}</Alert>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Taiwanese temple: ask a yes/no question with the moon blocks
// ---------------------------------------------------------------------------
export function JiaoPanel({ tr }: { tr: TR }) {
  const [result, setResult] = useState<ThrowResult | null>(null);
  const [tossing, setTossing] = useState(false);
  const cast = () => {
    const a = new Uint8Array(1);
    crypto.getRandomValues(a);
    const r = a[0] % 4;
    setTossing(true);
    setResult(null);
    window.setTimeout(() => {
      setTossing(false);
      setResult(r < 2 ? 'sheng' : r === 2 ? 'xiao' : 'yin');
      buzz(30);
    }, 1200);
  };
  const info: Record<ThrowResult, [string, string, string, string]> = {
    sheng: ['聖筊', '神明同意，可以進行。', 'Holy answer', 'Yes — the gods agree.'],
    xiao: ['笑筊', '神明笑而未答，請把問題說清楚再問一次。', 'Laughing answer', 'No clear answer — ask again more clearly.'],
    yin: ['陰筊', '神明不同意，或時機未到。', 'No answer', 'No — or not yet.'],
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        {tr('心中默念一個「是或否」的問題，然後擲筊・約 1 分鐘', 'Silently ask a yes-or-no question, then cast the moon blocks · about 1 minute')}
      </Typography>
      <Box sx={{ py: 2, borderRadius: 2, background: 'radial-gradient(ellipse at 50% 0%, #6B1212, #1C0404)' }}>
        <MoonBlocks result={result} tossing={tossing} />
      </Box>
      {result && !tossing && (
        <Box sx={{ mt: 1.5 }}>
          <Typography sx={{ fontSize: '1.6rem', fontWeight: 800 }}>{tr(info[result][0], info[result][2])}</Typography>
          <Big>{tr(info[result][1], info[result][3])}</Big>
        </Box>
      )}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 2, fontSize: '1.15rem' }} onClick={cast} disabled={tossing}>
        {result ? tr('再擲一次', 'Cast again') : tr('擲筊', 'Cast the blocks')}
      </Button>
    </Box>
  );
}
