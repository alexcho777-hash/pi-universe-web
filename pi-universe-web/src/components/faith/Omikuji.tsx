/**
 * 御神籤 Omikuji — shake the hexagonal box, unroll a paper fortune.
 * One free draw per day; the slip can be tied at the shrine rack or taken home.
 * Everything stays on this device (localStorage). Verses and lines are original.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Chip, Typography, keyframes } from '@mui/material';
import { Lang, tx } from '../../i18n/i18n';

type TR = (zh: string, en: string) => string;
type Pair = [string, string];

interface Rank {
  kanji: string;
  reading: string;
  en: string;
  weight: number;
  verses: Pair[];
  items: Pair[]; // wish, love, work, study, travel, health, lost
}

const LABELS: Pair[] = [
  ['願望', 'Wish'],
  ['戀愛', 'Love'],
  ['工作', 'Work'],
  ['學業', 'Study'],
  ['旅行', 'Travel'],
  ['健康', 'Health'],
  ['失物', 'Lost items'],
];

const RANKS: Rank[] = [
  {
    kanji: '大吉', reading: 'Dai-kichi', en: 'Great blessing', weight: 17,
    verses: [
      ['朝霧散盡處　一路映金光　心安步自穩　花開待有時', 'Where morning mist clears, the road gleams gold; a calm heart steadies each step, and blossoms wait their hour.'],
      ['春水初融時　舟行不費力　順風雖在側　仍須自掌舵', 'Spring melt, and the boat glides with ease; the wind is kind, yet keep your hand upon the helm.'],
    ],
    items: [
      ['心中所願，漸有回應，持續就好。', 'What you hope for begins to answer; simply keep going.'],
      ['真誠相待，緣分自會靠近。', 'Be sincere, and connection draws near.'],
      ['努力被看見，可大方接下新任務。', 'Your effort is noticed; accept the new task with confidence.'],
      ['專注有成，適合挑戰難題。', 'Focus pays off; a good time for hard problems.'],
      ['出行順利，帶著好奇心上路。', 'Travel goes smoothly; set out with curiosity.'],
      ['精神充沛，仍請按時休息。', 'Energy is high, yet keep regular rest.'],
      ['可在熟悉之處尋回，別著急。', 'Look in familiar places; no need to hurry.'],
    ],
  },
  {
    kanji: '中吉', reading: 'Chū-kichi', en: 'Middle blessing', weight: 20,
    verses: [
      ['山徑雖蜿蜒　鳥鳴自相伴　一步一回望　已在半山間', 'The path winds, but birdsong keeps you company; a glance back shows you halfway up.'],
      ['竹影映窗紗　風過不留痕　何須問前程　今日已足夠', 'Bamboo shadows on the screen, wind leaving no trace; why ask of tomorrow when today is enough?'],
    ],
    items: [
      ['願望可成，需要一點耐心。', 'Your wish can come true, with a little patience.'],
      ['溫柔傾聽，比妙語更動人。', 'Gentle listening moves hearts more than clever words.'],
      ['穩紮穩打，成果會慢慢浮現。', 'Steady work; results surface gradually.'],
      ['按計畫複習，進步看得見。', 'Review as planned; progress will show.'],
      ['小旅行有好運，提早規劃更佳。', 'A short trip is favoured; plan ahead.'],
      ['整體良好，留意肩頸與睡眠。', 'Generally good; mind your neck, shoulders and sleep.'],
      ['問問身邊的人，會有線索。', 'Ask those around you; a clue will appear.'],
    ],
  },
  {
    kanji: '小吉', reading: 'Shō-kichi', en: 'Small blessing', weight: 15,
    verses: [
      ['小小一盞燈　照亮方寸地　莫嫌光太弱　夜深自有人', 'A small lamp lights a small space; do not scorn its glow, for someone in the deep night will need it.'],
      ['檐下雨初歇　一滴映天青　微事皆有意　珍惜眼前人', 'Rain stops at the eaves, one drop holds the blue sky; small things carry meaning, so cherish who is here.'],
    ],
    items: [
      ['願望要從小處做起，累積即成。', 'Start your wish small; it grows by accumulation.'],
      ['不急於表白，日常相處最重要。', 'No rush to confess; everyday kindness matters most.'],
      ['細節決定成敗，檢查兩遍再交出。', 'Details decide; check twice before handing in.'],
      ['每天一點點，勝過一次衝刺。', 'A little each day beats one big sprint.'],
      ['行程宜寬鬆，留些空白。', 'Keep plans loose and leave some blank space.'],
      ['小毛病別拖，早點照顧自己。', 'Do not delay small aches; care for yourself early.'],
      ['可能在意外處，慢慢找。', 'It may be somewhere unexpected; search slowly.'],
    ],
  },
  {
    kanji: '吉', reading: 'Kichi', en: 'Blessing', weight: 18,
    verses: [
      ['茶煙裊裊升　窗外雲自閒　不求驚天事　平安即是緣', 'Tea steam curls upward, clouds idle outside; ask for nothing grand, for peace is its own fortune.'],
      ['石階生薄苔　步步需留心　慢行亦是行　終見山門開', 'Thin moss on stone steps asks for care; slow is still walking, and the gate will open.'],
    ],
    items: [
      ['願望持平穩，順其自然即可。', 'Your wish is steady; let it unfold naturally.'],
      ['緣分平順，坦誠是關鍵。', 'Relationships are calm; honesty is key.'],
      ['按部就班，不必與人比較。', 'Work in order; no need to compare with others.'],
      ['基礎打穩，後勁十足。', 'Solid foundations give strength later.'],
      ['近郊走走，心情自然開闊。', 'A nearby outing will open your mind.'],
      ['作息規律，身心安穩。', 'Regular routine keeps body and mind settled.'],
      ['回想最後使用的地方即可。', 'Retrace where you last used it.'],
    ],
  },
  {
    kanji: '末吉', reading: 'Sue-kichi', en: 'Future blessing', weight: 15,
    verses: [
      ['冬枝尚無葉　芽苞已藏春　今日雖清寂　來日自成蔭', 'Winter branches are bare, yet buds hold spring; today is quiet, but shade is coming.'],
      ['遠鐘隔霧來　聲淡意卻長　且慢尋答案　時至自分明', 'A far bell through the mist, faint yet lingering; do not chase answers, they clear in time.'],
    ],
    items: [
      ['願望尚在醞釀，現在是準備期。', 'Your wish is still brewing; this is a time to prepare.'],
      ['順其自然，別為等待而焦慮。', 'Let things be; do not fret over waiting.'],
      ['成果稍晚，但方向正確。', 'Results come later, but the direction is right.'],
      ['需要多一點時間，別放棄。', 'It needs more time; do not give up.'],
      ['行前多確認，延後亦無妨。', 'Double-check before leaving; a delay is fine.'],
      ['放慢步調，多喝水多休息。', 'Slow down; drink water and rest.'],
      ['稍後會出現，先做其他事。', 'It will turn up later; do something else first.'],
    ],
  },
  {
    kanji: '凶', reading: 'Kyō', en: 'Caution', weight: 8,
    verses: [
      ['雲遮月半隱　夜路宜慢行　提燈照腳下　天明自晴朗', 'Clouds hide half the moon; walk the night road slowly, light the ground at your feet, and dawn will be clear.'],
      ['風急枝輕搖　彎腰不是輸　待到風息時　依舊挺而直', 'In a sharp wind, the branch bends; bending is not losing, and when it calms you stand tall again.'],
    ],
    items: [
      ['暫緩大決定，先把基礎照顧好。', 'Pause big decisions; look after the basics first.'],
      ['先好好愛自己，再談其他。', 'Be kind to yourself first; the rest follows.'],
      ['多一次確認，可避開小失誤。', 'One extra check avoids small mistakes.'],
      ['別逼自己，休息後效率更高。', 'Do not push; rest makes study efficient.'],
      ['出行要留意安全，備好雨具。', 'Mind safety when travelling; carry rain gear.'],
      ['多睡一點，有不適請諮詢專業。', 'Sleep more; see a professional if unwell.'],
      ['可能延遲找到，保持耐心。', 'It may take longer to find; stay patient.'],
    ],
  },
];

const TOTAL_W = RANKS.reduce((s, r) => s + r.weight, 0);
const pickRank = (): number => {
  let x = Math.random() * TOTAL_W;
  for (let i = 0; i < RANKS.length; i++) {
    x -= RANKS[i].weight;
    if (x < 0) return i;
  }
  return 0;
};

interface Slip { r: number; v: number; tied?: boolean }
interface Hist { r: number; d: string; tied?: boolean }
const HKEY = 'pu-omikuji-history';
const dayKey = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const todayKey = () => `pu-omikuji-${dayKey()}`;

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
};
const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};
const validSlip = (s: Slip | null): s is Slip =>
  !!s && Number.isInteger(s.r) && s.r >= 0 && s.r < RANKS.length && Number.isInteger(s.v) && s.v >= 0 && s.v < RANKS[s.r].verses.length;

const shake = keyframes`
  0%, 100% { transform: rotate(0deg) translateY(0); }
  12% { transform: rotate(-14deg) translateY(-8px); }
  28% { transform: rotate(12deg) translateY(4px); }
  44% { transform: rotate(-11deg) translateY(-8px); }
  60% { transform: rotate(9deg) translateY(4px); }
  78% { transform: rotate(-5deg) translateY(-3px); }
`;
const stickOut = keyframes`
  from { transform: translateY(0); opacity: 0; }
  to { transform: translateY(-34px); opacity: 1; }
`;
const unroll = keyframes`
  from { clip-path: inset(0 0 100% 0); opacity: 0.4; }
  to { clip-path: inset(0 0 0 0); opacity: 1; }
`;
const tieFold = keyframes`
  0% { transform: translateY(0) scale(1, 1); }
  35% { transform: translateY(0) scale(0.22, 1); }
  70% { transform: translateY(-40px) scale(0.2, 0.34) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-96px) scale(0.16, 0.22) rotate(8deg); opacity: 0; }
`;

function Box6({ shaking }: { shaking: boolean }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 160 200"
      sx={{ width: 160, height: 200, display: 'block', mx: 'auto', animation: shaking ? `${shake} 1.1s ease-in-out` : 'none', transformOrigin: '50% 90%', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,.55))' }}
    >
      <defs>
        <linearGradient id="omWood" x1="0" x2="1">
          <stop offset="0" stopColor="#6b3a1c" />
          <stop offset="0.5" stopColor="#a8683a" />
          <stop offset="1" stopColor="#5a2f16" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={50 + i * 11} y={20} width={5} height={50} rx={1.5} fill="#e9d6a6" stroke="#8a6a35" strokeWidth={0.8} />
      ))}
      <polygon points="40,70 120,70 144,98 144,180 16,180 16,98" fill="url(#omWood)" stroke="#2a0f08" strokeWidth={2.5} />
      <polygon points="40,70 120,70 144,98 16,98" fill="#c8864f" stroke="#2a0f08" strokeWidth={2.5} />
      <line x1="80" y1="98" x2="80" y2="180" stroke="#2a0f08" strokeWidth={1.5} opacity={0.5} />
      <line x1="48" y1="98" x2="48" y2="180" stroke="#2a0f08" strokeWidth={1} opacity={0.35} />
      <line x1="112" y1="98" x2="112" y2="180" stroke="#2a0f08" strokeWidth={1} opacity={0.35} />
      <rect x="62" y="116" width="36" height="46" fill="#e8c170" stroke="#2a0f08" strokeWidth={1.5} />
      <text x="80" y="148" textAnchor="middle" fontSize="26" fontWeight="700" fill="#7a1810" fontFamily="'Noto Serif JP','Noto Serif TC',serif">御</text>
      <ellipse cx="80" cy="72" rx="26" ry="3" fill="#2a0f08" opacity={0.7} />
    </Box>
  );
}

function Rack({ count, folding }: { count: number; folding: boolean }) {
  return (
    <Box sx={{ position: 'relative', height: 64, mt: 1 }}>
      <Box component="svg" viewBox="0 0 280 64" sx={{ width: '100%', maxWidth: 320, display: 'block', mx: 'auto' }}>
        <rect x="14" y="8" width="8" height="54" fill="#6b3a1c" />
        <rect x="258" y="8" width="8" height="54" fill="#6b3a1c" />
        <rect x="8" y="10" width="264" height="7" rx="2" fill="#a8683a" stroke="#2a0f08" strokeWidth={1.2} />
        <rect x="8" y="30" width="264" height="5" rx="2" fill="#8a5028" stroke="#2a0f08" strokeWidth={1.2} />
        {Array.from({ length: Math.min(count, 16) }, (_, i) => (
          <g key={i} transform={`translate(${34 + i * 15},${i % 2 ? 30 : 10})`}>
            <line x1="3" y1="0" x2="3" y2="3" stroke="#e9d6a6" />
            <rect x="0" y="3" width="6" height="22" rx="1" fill="#f6ecd2" stroke="#b79a5e" strokeWidth={0.7} />
            <rect x="1.5" y="6" width="3" height="3" fill="#b3261e" />
          </g>
        ))}
      </Box>
      {folding && <Box sx={{ position: 'absolute', inset: 0 }} />}
    </Box>
  );
}

export function OmikujiPanel({ tr, lang }: { tr: (zh: string, en: string) => string; lang: Lang }) {
  const zh = lang === 'zh';
  const t: TR = tr;
  const pair = (p: Pair) => (zh ? p[0] : tx(p[1], lang));

  const [slip, setSlip] = useState<Slip | null>(() => {
    const s = load<Slip | null>(todayKey(), null);
    return validSlip(s) ? s : null;
  });
  const [hist, setHist] = useState<Hist[]>(() => {
    const h = load<Hist[]>(HKEY, []);
    return Array.isArray(h) ? h.filter((x) => x && Number.isInteger(x.r) && x.r >= 0 && x.r < RANKS.length && typeof x.d === 'string').slice(0, 10) : [];
  });
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'out'>('idle');
  const [folding, setFolding] = useState(false);
  const [msg, setMsg] = useState('');
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach((x) => window.clearTimeout(x)), []);

  const drawn = slip !== null;

  const draw = useCallback(() => {
    if (busy.current || drawn) return;
    busy.current = true;
    setPhase('shaking');
    setMsg('');
    later(() => setPhase('out'), 1100);
    later(() => {
      const r = pickRank();
      const next: Slip = { r, v: Math.floor(Math.random() * RANKS[r].verses.length) };
      save(todayKey(), next);
      const nh = [{ r, d: dayKey() }, ...hist].slice(0, 10);
      save(HKEY, nh);
      setHist(nh);
      setSlip(next);
      busy.current = false;
    }, 1700);
  }, [drawn, hist]);

  // Phone shake: only where no permission prompt is needed (Android / desktop browsers)
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const DM = (window as unknown as { DeviceMotionEvent?: { requestPermission?: unknown } }).DeviceMotionEvent;
    if (!DM || typeof DM.requestPermission === 'function') return;
    let last = 0;
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const mag = Math.abs(a.x ?? 0) + Math.abs(a.y ?? 0) + Math.abs(a.z ?? 0);
      const now = Date.now();
      if (mag > 38 && now - last > 1500) {
        last = now;
        drawRef.current();
      }
    };
    window.addEventListener('devicemotion', onMotion);
    return () => window.removeEventListener('devicemotion', onMotion);
  }, []);

  const tie = () => {
    if (!slip || slip.tied || folding) return;
    setFolding(true);
    later(() => {
      const ns: Slip = { ...slip, tied: true };
      save(todayKey(), ns);
      setSlip(ns);
      const nh = hist.slice();
      if (nh.length) nh[0] = { ...nh[0], tied: true };
      save(HKEY, nh);
      setHist(nh);
      setFolding(false);
      setMsg(t('已結在神社的籤架上，願壞運留在此處。', 'Tied to the rack — may any bad luck stay behind at the shrine.'));
    }, 1300);
  };
  const keep = () => setMsg(t('已帶回家，好好收著，偶爾翻看提醒自己。', 'Taken home. Keep it safe and reread it now and then.'));

  const rank = slip ? RANKS[slip.r] : null;
  const tiedCount = hist.filter((h) => h.tied).length;
  const paper = '#f6ecd2';

  return (
    <Box sx={{ background: 'linear-gradient(180deg,#120603,#2a0f08)', borderRadius: 3, p: { xs: 2, sm: 3 }, color: '#f3e3c3', border: '1px solid rgba(232,193,112,.35)' }}>
      <Typography sx={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, color: '#e8c170', letterSpacing: 2 }}>
        {t('御神籤', 'Omikuji')}
      </Typography>
      <Typography sx={{ textAlign: 'center', color: 'rgba(243,227,195,.75)', mb: 2 }}>
        {t('心裡想著一件事，搖一搖籤筒。每天可抽一次。', 'Hold one thing in mind and shake the box. One free draw each day.')}
      </Typography>

      {!drawn && (
        <Box sx={{ textAlign: 'center' }}>
          <Box
            role="button"
            tabIndex={0}
            aria-label={t('搖籤筒', 'Shake the box')}
            onClick={draw}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                draw();
              }
            }}
            sx={{ position: 'relative', cursor: 'pointer', width: 180, mx: 'auto', outline: 'none', '&:focus-visible': { outline: '2px solid #e8c170', borderRadius: 2 } }}
          >
            <Box sx={{ position: 'absolute', left: '50%', top: 8, width: 12, height: 62, ml: '-6px', bgcolor: '#e9d6a6', border: '1px solid #8a6a35', borderRadius: '2px', display: phase === 'out' ? 'block' : 'none', animation: `${stickOut} .6s ease-out forwards`, zIndex: 2 }}>
              <Typography sx={{ color: '#7a1810', fontWeight: 800, fontSize: 11, writingMode: 'vertical-rl', textAlign: 'center', mx: 'auto', mt: '4px' }}>吉</Typography>
            </Box>
            <Box6 shaking={phase === 'shaking'} />
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={draw}
            disabled={phase !== 'idle'}
            sx={{ mt: 2, px: 5, fontSize: '1.1rem', bgcolor: '#F4A300', color: '#2a0f08', fontWeight: 800, '&:hover': { bgcolor: '#e8c170' } }}
          >
            {phase === 'idle' ? t('搖一搖', 'Shake') : t('搖動中…', 'Shaking…')}
          </Button>
          <Typography sx={{ mt: 1, fontSize: '.85rem', color: 'rgba(243,227,195,.6)' }}>
            {t('也可以搖動手機。', 'On a phone you can also shake the device.')}
          </Typography>
        </Box>
      )}

      {drawn && rank && slip && (
        <Box sx={{ maxWidth: 420, mx: 'auto' }}>
          {!slip.tied && (
            <Box
              sx={{
                bgcolor: paper,
                color: '#1a1008',
                borderRadius: 1,
                p: 2.2,
                boxShadow: '0 10px 24px rgba(0,0,0,.55), inset 0 0 40px rgba(160,120,50,.18)',
                border: '1px solid #c9b07a',
                transformOrigin: '50% 100%',
                animation: folding ? `${tieFold} 1.3s ease-in forwards` : `${unroll} 1.4s ease-out`,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ position: 'relative', flex: '0 0 auto', minWidth: 84, textAlign: 'center' }}>
                  <Typography
                    sx={{ writingMode: 'vertical-rl', fontFamily: "'Noto Serif JP','Noto Serif TC','Yu Mincho',serif", fontWeight: 900, fontSize: slip.r === 3 ? '4.6rem' : '4rem', lineHeight: 1.1, letterSpacing: '.12em', color: '#0c0805', mx: 'auto' }}
                  >
                    {rank.kanji}
                  </Typography>
                  <Typography sx={{ fontSize: '.8rem', color: '#6b5a3a', mt: 0.5 }}>{rank.reading}</Typography>
                  <Typography sx={{ fontSize: '.75rem', color: '#6b5a3a' }}>{t(rank.en, rank.en)}</Typography>
                  <Box sx={{ position: 'absolute', right: -6, bottom: 26, width: 34, height: 34, border: '2px solid #b3261e', color: '#b3261e', borderRadius: '4px', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '1rem', transform: 'rotate(-8deg)', fontFamily: "'Noto Serif JP','Noto Serif TC',serif", bgcolor: 'rgba(179,38,30,.07)' }}>
                    神
                  </Box>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontStyle: lang === 'en' ? 'italic' : 'normal', lineHeight: 1.8, fontSize: '1.02rem', pb: 1, borderBottom: '1px solid #c9b07a', mb: 1 }}>
                    {pair(rank.verses[slip.v])}
                  </Typography>
                  {LABELS.map((l, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1, py: 0.35 }}>
                      <Typography sx={{ flex: '0 0 auto', width: lang === 'en' ? '4.6em' : '4em', fontWeight: 800, color: '#7a1810', fontSize: '.92rem' }}>{pair(l)}</Typography>
                      <Typography sx={{ fontSize: '.92rem', lineHeight: 1.55 }}>{pair(rank.items[i])}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {slip.tied && (
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Typography sx={{ fontSize: '1.05rem', color: '#e8c170' }}>
                {t(`今日籤：${rank.kanji}（已結在籤架上）`, `Today: ${rank.kanji} ${rank.reading} (tied at the rack)`)}
              </Typography>
            </Box>
          )}

          {!slip.tied && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={tie} disabled={folding} sx={{ flex: 1, minWidth: 140, bgcolor: '#F4A300', color: '#2a0f08', fontWeight: 800, '&:hover': { bgcolor: '#e8c170' } }}>
                {t('結ぶ — 結在神社籤架', '結ぶ — tie it at the shrine')}
              </Button>
              <Button variant="outlined" onClick={keep} disabled={folding} sx={{ flex: 1, minWidth: 140, color: '#e8c170', borderColor: 'rgba(232,193,112,.6)' }}>
                {t('帶回家', 'Take it home')}
              </Button>
            </Box>
          )}
          {slip.r === 5 && !slip.tied && (
            <Typography sx={{ mt: 1.2, fontSize: '.88rem', color: 'rgba(243,227,195,.8)', textAlign: 'center' }}>
              {t('傳統上，凶籤會結在松枝或籤架上，把壞運留在神社，帶著提醒繼續前行。', 'Traditionally a Kyō slip is tied to a pine branch or rack to leave the bad luck at the shrine and carry on with a gentle reminder.')}
            </Typography>
          )}
          <Rack count={tiedCount} folding={folding} />
          <Typography sx={{ textAlign: 'center', fontSize: '.85rem', color: 'rgba(243,227,195,.65)' }}>
            {t('今天已抽過，明天再來。', 'You have drawn today; come back tomorrow.')}
          </Typography>
        </Box>
      )}

      {msg && (
        <Alert severity="success" sx={{ mt: 2, bgcolor: 'rgba(232,193,112,.15)', color: '#f3e3c3', '& .MuiAlert-icon': { color: '#e8c170' } }}>
          {msg}
        </Alert>
      )}

      {hist.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: '#e8c170', fontWeight: 700, mb: 0.8 }}>{t('最近十次', 'Last 10 draws')}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {hist.map((h, i) => (
              <Chip
                key={i}
                size="small"
                label={`${h.d} · ${RANKS[h.r].kanji}${h.tied ? ' ⛩' : ''}`}
                sx={{ bgcolor: 'rgba(232,193,112,.14)', color: '#f3e3c3', border: '1px solid rgba(232,193,112,.35)' }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Typography sx={{ mt: 2.5, fontSize: '.82rem', color: 'rgba(243,227,195,.6)', textAlign: 'center', lineHeight: 1.7 }}>
        {t('御神籤是一種幫助自我反思的習俗，並非預言；請以平常心看待，行動由自己決定。', 'Omikuji is a custom for reflection, not prediction. Take it lightly; your actions are your own to choose.')}
      </Typography>
    </Box>
  );
}
