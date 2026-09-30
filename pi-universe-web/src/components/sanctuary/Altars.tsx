/**
 * Statues for the two sanctuaries whose worship centres on one: the Thai Four-Faced
 * Buddha (Phra Phrom) and the Vietnamese Thần Tài altar. They sit at the far end of the
 * 3D hall. Everything is drawn here as SVG — no photos.
 *
 *  - FourFaceAltar: a real 3D four-sided figure (CSS 3D) that slowly turns. Each side is
 *    one face with two of the eight arms and their attributes. Tap to bring the next face
 *    round; its popular meaning is shown underneath.
 *  - ThanTaiAltar: Thần Tài and Ông Địa seated in a small red altar with offerings and
 *    rising incense smoke. Layers sit at different depths, and the whole altar tilts with
 *    the mouse (or the phone), so it reads as 3D.
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useI18n } from '../../i18n/i18n';

const GOLD_L = '#ffe28a';
const GOLD = '#e0a92e';
const GOLD_D = '#8a5a0c';

const rise = keyframes`
  0%   { transform: translateY(0) scaleX(1); opacity: 0; }
  15%  { opacity: .75; }
  100% { transform: translateY(-46px) scaleX(1.8); opacity: 0; }
`;
const flicker = keyframes`
  0%, 100% { opacity: .95; } 50% { opacity: .6; }
`;
const breathe = keyframes`
  0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: .85; transform: scale(1.06); }
`;

function reducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/* ------------------------------------------------------------------ */
/* Four-Faced Buddha                                                  */
/* ------------------------------------------------------------------ */

type Attr = 'lotus' | 'conch' | 'rosary' | 'book' | 'pot' | 'discus' | 'spear' | 'flag';
const FACE_ATTRS: [Attr, Attr][] = [
  ['lotus', 'conch'],
  ['rosary', 'book'],
  ['pot', 'discus'],
  ['spear', 'flag'],
];
/** Popular meanings of the four faces, in the order they come round (matches the wish panel). */
const FACE_MEANING: [string, string, string, string][] = [
  ['事業', 'Career', 'Sự nghiệp', 'หน้าที่การงาน'],
  ['財運', 'Wealth', 'Tài lộc', 'โชคลาภ'],
  ['愛情', 'Love', 'Tình duyên', 'ความรัก'],
  ['健康平安', 'Health', 'Sức khỏe', 'สุขภาพ'],
];

function AttrShape({ kind, x, y }: { kind: Attr; x: number; y: number }) {
  switch (kind) {
    case 'lotus':
      return (
        <g transform={`translate(${x},${y})`}>
          <path d="M0 6 C-6 0 -5 -8 0 -12 C5 -8 6 0 0 6Z" fill="#f28bb0" stroke="#b8406a" strokeWidth=".8" />
          <path d="M0 6 C-8 3 -9 -3 -6 -6 C-3 -2 -1 2 0 6Z M0 6 C8 3 9 -3 6 -6 C3 -2 1 2 0 6Z" fill="#f7a9c6" />
        </g>
      );
    case 'conch':
      return (
        <g transform={`translate(${x},${y})`}>
          <path d="M-5 5 C-7 -3 -2 -10 3 -9 C7 -6 6 2 1 6Z" fill="#fbf4e6" stroke="#b9a37a" strokeWidth=".8" />
          <path d="M-2 2 C0 -3 3 -5 4 -6" stroke="#c9b48c" strokeWidth=".8" fill="none" />
        </g>
      );
    case 'rosary':
      return (
        <g transform={`translate(${x},${y})`}>
          {Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return <circle key={i} cx={Math.cos(a) * 5} cy={Math.sin(a) * 6 - 2} r="1.5" fill="#7a3b12" />;
          })}
        </g>
      );
    case 'book':
      return (
        <g transform={`translate(${x},${y}) rotate(-12)`}>
          <rect x="-6" y="-8" width="12" height="9" rx="1" fill="#b0321e" stroke={GOLD_D} strokeWidth=".7" />
          <path d="M-6 -4 H6" stroke={GOLD_L} strokeWidth=".8" />
        </g>
      );
    case 'pot':
      return (
        <g transform={`translate(${x},${y})`}>
          <path d="M-5 -2 C-7 4 -4 7 0 7 C4 7 7 4 5 -2Z" fill={GOLD} stroke={GOLD_D} strokeWidth=".7" />
          <rect x="-2.5" y="-6" width="5" height="4" fill={GOLD} stroke={GOLD_D} strokeWidth=".6" />
        </g>
      );
    case 'discus':
      return (
        <g transform={`translate(${x},${y})`}>
          <circle r="6" fill={GOLD} stroke={GOLD_D} strokeWidth=".8" />
          <circle r="2.4" fill="#b0321e" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={Math.cos(a) * 2.6} y1={Math.sin(a) * 2.6} x2={Math.cos(a) * 6} y2={Math.sin(a) * 6} stroke={GOLD_D} strokeWidth=".6" />;
          })}
        </g>
      );
    case 'spear':
      return (
        <g transform={`translate(${x},${y})`}>
          <line x1="0" y1="10" x2="0" y2="-14" stroke={GOLD_D} strokeWidth="1.4" />
          <path d="M0 -20 L3 -13 L0 -11 L-3 -13Z" fill={GOLD_L} stroke={GOLD_D} strokeWidth=".6" />
        </g>
      );
    case 'flag':
      return (
        <g transform={`translate(${x},${y})`}>
          <line x1="0" y1="10" x2="0" y2="-14" stroke={GOLD_D} strokeWidth="1.4" />
          <path d="M0 -14 L9 -11 L0 -7Z" fill="#d4461f" />
        </g>
      );
  }
}

/** One side of the figure: crown band, face, collar, torso and two raised arms. */
function FaceSide({ attrs }: { attrs: [Attr, Attr] }) {
  return (
    <svg viewBox="0 0 80 116" width="80" height="116" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="ffSkin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffd97a" />
          <stop offset="1" stopColor="#c98a1c" />
        </linearGradient>
        <linearGradient id="ffBody" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b7801c" />
          <stop offset=".5" stopColor="#ffd97a" />
          <stop offset="1" stopColor="#b7801c" />
        </linearGradient>
      </defs>
      {/* arms (behind the body) */}
      <path d="M27 64 C18 70 12 66 11 50" stroke="url(#ffBody)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M53 64 C62 70 68 66 69 50" stroke="url(#ffBody)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="49" r="3.4" fill="#e8b344" />
      <circle cx="69" cy="49" r="3.4" fill="#e8b344" />
      <AttrShape kind={attrs[0]} x={11} y={40} />
      <AttrShape kind={attrs[1]} x={69} y={40} />
      {/* torso */}
      <path d="M26 60 C22 80 22 100 20 116 H60 C58 100 58 80 54 60Z" fill="url(#ffBody)" />
      <path d="M24 92 H56" stroke={GOLD_D} strokeWidth="1.4" />
      <path d="M31 62 L40 88 L49 62" stroke="#b0321e" strokeWidth="1.6" fill="none" />
      {/* collar */}
      <path d="M24 58 C30 70 50 70 56 58 C50 62 30 62 24 58Z" fill={GOLD_L} stroke={GOLD_D} strokeWidth=".8" />
      {[29, 34.5, 40, 45.5, 51].map((cx, i) => (
        <circle key={i} cx={cx} cy={i === 2 ? 66 : 64.5} r="1.3" fill="#b0321e" />
      ))}
      {/* neck + head */}
      <rect x="35" y="46" width="10" height="12" fill="url(#ffSkin)" />
      <ellipse cx="40" cy="34" rx="12" ry="14" fill="url(#ffSkin)" />
      {/* ears + earrings */}
      <path d="M28 31 C25 34 26 42 29 44" stroke="#c98a1c" strokeWidth="2.4" fill="none" />
      <path d="M52 31 C55 34 54 42 51 44" stroke="#c98a1c" strokeWidth="2.4" fill="none" />
      <path d="M28 44 L26 51 L30 51Z M52 44 L50 51 L54 51Z" fill={GOLD_L} stroke={GOLD_D} strokeWidth=".5" />
      {/* serene face */}
      <path d="M32 29 Q35.5 27 39 29 M41 29 Q44.5 27 48 29" stroke="#5a3508" strokeWidth="1" fill="none" />
      <path d="M33 33 Q35.5 35 38 33 M42 33 Q44.5 35 47 33" stroke="#5a3508" strokeWidth="1.1" fill="none" />
      <path d="M40 33 L39 38 L41 38" stroke="#a36a10" strokeWidth=".8" fill="none" />
      <path d="M37 41.5 Q40 43.5 43 41.5" stroke="#8a3a12" strokeWidth="1.1" fill="none" />
      <circle cx="40" cy="25" r="1" fill="#b0321e" />
      {/* crown band */}
      <path d="M27 22 C29 14 51 14 53 22 L53 17 C50 7 30 7 27 17Z" fill={GOLD_L} stroke={GOLD_D} strokeWidth=".8" />
      <path d="M30 0 L50 0 L53 17 C45 11 35 11 27 17Z" fill={GOLD} stroke={GOLD_D} strokeWidth=".8" />
      {[33, 40, 47].map((cx) => (
        <circle key={cx} cx={cx} cy="9" r="1.4" fill="#b0321e" />
      ))}
    </svg>
  );
}

/** The tall tiered crown shared by all four faces — always faces the viewer. */
function Spire() {
  const tiers = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 70 72" width="70" height="72" style={{ display: 'block' }}>
      {tiers.map((i) => {
        const y = 66 - i * 9;
        const hw = 26 - i * 3.8;
        return (
          <g key={i}>
            <path d={`M${35 - hw} ${y + 6} L${35 + hw} ${y + 6} L${35 + hw * 0.82} ${y} L${35 - hw * 0.82} ${y}Z`} fill={i % 2 ? GOLD : GOLD_L} stroke={GOLD_D} strokeWidth=".7" />
            <circle cx="35" cy={y + 3} r="1.2" fill="#b0321e" />
          </g>
        );
      })}
      <path d="M35 0 C38 6 38 10 35 12 C32 10 32 6 35 0Z" fill={GOLD_L} stroke={GOLD_D} strokeWidth=".7" />
    </svg>
  );
}

function Pedestal() {
  return (
    <svg viewBox="0 0 170 62" width="170" height="62" style={{ display: 'block' }}>
      {/* lotus petals */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 43 + i * 10.5;
        return <path key={i} d={`M${x} 18 C${x - 6} 10 ${x - 4} 2 ${x} 0 C${x + 4} 2 ${x + 6} 10 ${x} 18Z`} fill={i % 2 ? GOLD : GOLD_L} stroke={GOLD_D} strokeWidth=".6" />;
      })}
      {/* stepped plinth */}
      <rect x="32" y="18" width="106" height="10" fill="#b0321e" stroke={GOLD_D} strokeWidth=".8" />
      <rect x="22" y="28" width="126" height="12" fill={GOLD} stroke={GOLD_D} strokeWidth=".8" />
      <rect x="12" y="40" width="146" height="18" fill="#7d1e12" stroke={GOLD_D} strokeWidth=".8" />
      <path d="M12 44 H158" stroke={GOLD_L} strokeWidth="1" />
      {/* marigold garland */}
      {Array.from({ length: 15 }, (_, i) => {
        const t = i / 14;
        const x = 30 + t * 110;
        const y = 22 + Math.sin(t * Math.PI) * 11;
        return <circle key={i} cx={x} cy={y} r="3.2" fill={i % 3 === 1 ? '#fff3c4' : '#f59a1b'} stroke="#c9650b" strokeWidth=".5" />;
      })}
    </svg>
  );
}

function Elephant({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 46 40" width="46" height="40" style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined }}>
      <path
        d="M6 36 V24 C6 12 16 8 26 9 C33 9 38 13 39 19 C42 21 43 26 41 31 C40 34 38 35 37 33 C38 29 37 26 35 25 L35 36 H30 V30 H14 V36Z"
        fill="#7a4a22"
        stroke="#3f230c"
        strokeWidth=".8"
      />
      <path d="M22 13 C18 15 18 22 23 24 C26 21 26 15 22 13Z" fill="#94603a" />
      <circle cx="33" cy="16" r="1.2" fill="#1d0f04" />
      {/* garland on its neck */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={28 + i * 2} cy={23 + Math.sin(i) * 1.5} r="1.6" fill="#f59a1b" />
      ))}
    </svg>
  );
}

export function FourFaceAltar() {
  const { tr4 } = useI18n();
  const prismRef = useRef<HTMLDivElement | null>(null);
  const sideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const st = useRef({ angle: 0, target: null as number | null, holdUntil: 0 });
  const [front, setFront] = useState(0);

  useEffect(() => {
    const reduce = reducedMotion();
    let raf = 0;
    let last = performance.now();
    let shown = -1;
    const apply = () => {
      const a = st.current.angle;
      if (prismRef.current) prismRef.current.style.transform = `rotateX(-6deg) rotateY(${a}deg)`;
      sideRefs.current.forEach((el, k) => {
        if (!el) return;
        const facing = Math.cos(((a + k * 90) * Math.PI) / 180); // 1 = facing us
        el.style.filter = `brightness(${(0.55 + 0.5 * Math.max(0, facing)).toFixed(3)})`;
      });
      const idx = (((-Math.round(a / 90)) % 4) + 4) % 4;
      if (idx !== shown) {
        shown = idx;
        setFront(idx);
      }
    };
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = st.current;
      if (s.target !== null) {
        const d = s.target - s.angle;
        s.angle = Math.abs(d) < 0.05 ? s.target : s.angle + d * Math.min(1, dt * 5);
        if (s.angle === s.target) {
          s.target = null;
          s.holdUntil = now + 3500;
        }
      } else if (now > s.holdUntil) {
        s.angle -= dt * 9; // slow turn
      }
      apply();
      raf = requestAnimationFrame(frame);
    };
    apply();
    if (!reduce) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const next = () => {
    const s = st.current;
    const base = s.target ?? s.angle;
    s.target = (Math.round(base / 90) - 1) * 90; // the face after the one now in front
    if (reducedMotion()) {
      s.angle = s.target;
      s.target = null;
      if (prismRef.current) prismRef.current.style.transform = `rotateX(-6deg) rotateY(${s.angle}deg)`;
      setFront((((-Math.round(s.angle / 90)) % 4) + 4) % 4);
    }
  };

  const m = FACE_MEANING[front];
  const nth: [string, string, string, string][] = [
    ['第一面', 'Face 1', 'Mặt thứ nhất', 'หน้าที่ 1'],
    ['第二面', 'Face 2', 'Mặt thứ hai', 'หน้าที่ 2'],
    ['第三面', 'Face 3', 'Mặt thứ ba', 'หน้าที่ 3'],
    ['第四面', 'Face 4', 'Mặt thứ tư', 'หน้าที่ 4'],
  ];

  return (
    <Box
      component="button"
      onClick={next}
      aria-label={tr4('轉到下一面', 'Turn to the next face', 'Xoay sang mặt tiếp theo', 'หมุนไปหน้าถัดไป')}
      sx={{ position: 'relative', width: 200, height: 268, p: 0, border: 'none', background: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
    >
      <Box sx={{ position: 'absolute', left: '50%', top: 40, width: 220, height: 220, ml: '-110px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,110,.55) 0%, rgba(255,190,80,.18) 45%, rgba(255,190,80,0) 70%)', animation: `${breathe} 5s ease-in-out infinite` }} />
      <Box sx={{ position: 'absolute', left: '50%', top: 0, ml: '-35px' }}>
        <Spire />
      </Box>
      <Box sx={{ position: 'absolute', left: '50%', top: 62, width: 80, height: 116, ml: '-40px', perspective: '520px' }}>
        <Box ref={prismRef} sx={{ position: 'relative', width: 80, height: 116, transformStyle: 'preserve-3d' }}>
          {FACE_ATTRS.map((attrs, k) => (
            <Box
              key={k}
              ref={(el: HTMLDivElement | null) => { sideRefs.current[k] = el; }}
              sx={{ position: 'absolute', inset: 0, transform: `rotateY(${k * 90}deg) translateZ(40px)`, backfaceVisibility: 'hidden' }}
            >
              <FaceSide attrs={attrs} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', left: '50%', top: 172, ml: '-85px' }}>
        <Pedestal />
      </Box>
      <Box sx={{ position: 'absolute', left: -6, top: 190 }}>
        <Elephant />
      </Box>
      <Box sx={{ position: 'absolute', right: -6, top: 190 }}>
        <Elephant flip />
      </Box>
      <Typography sx={{ position: 'absolute', left: 0, right: 0, top: 238, fontSize: '0.95rem', fontWeight: 800, color: '#FFE3A3', textShadow: '0 1px 6px rgba(0,0,0,.8)' }}>
        {tr4(...nth[front])}・{tr4(...m)}
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Thần Tài & Ông Địa                                                  */
/* ------------------------------------------------------------------ */

function ThanTai() {
  // God of Wealth: black official's hat with side wings, red robe, holding a gold ingot
  return (
    <svg viewBox="0 0 76 96" width="76" height="96" style={{ display: 'block', overflow: 'visible' }}>
      {/* robe */}
      <path d="M10 96 C8 76 14 56 26 50 H50 C62 56 68 76 66 96Z" fill="#c62a1c" stroke="#7a130b" strokeWidth=".8" />
      <path d="M38 52 V96" stroke="#e8b344" strokeWidth="2" />
      <path d="M22 60 C26 70 50 70 54 60" stroke="#e8b344" strokeWidth="1.6" fill="none" />
      <path d="M10 88 H66" stroke="#e8b344" strokeWidth="2" />
      {/* sleeves + hands with gold ingot */}
      <path d="M22 58 C16 66 20 76 30 76 H46 C56 76 60 66 54 58" fill="#b3241a" stroke="#7a130b" strokeWidth=".8" />
      <path d="M26 70 C28 64 48 64 50 70 C48 76 28 76 26 70Z" fill={GOLD} stroke={GOLD_D} strokeWidth=".8" />
      <ellipse cx="38" cy="66" rx="6" ry="3.5" fill={GOLD_L} stroke={GOLD_D} strokeWidth=".6" />
      {/* head */}
      <ellipse cx="38" cy="34" rx="13" ry="14" fill="#f6d2a8" stroke="#c99a70" strokeWidth=".6" />
      <circle cx="30.5" cy="38" r="2.6" fill="#f3a7a0" opacity=".7" />
      <circle cx="45.5" cy="38" r="2.6" fill="#f3a7a0" opacity=".7" />
      <path d="M31 32 Q33.5 30 36 32 M40 32 Q42.5 30 45 32" stroke="#3a2210" strokeWidth="1.3" fill="none" />
      <path d="M34 40 Q38 43 42 40" stroke="#7a2a12" strokeWidth="1.2" fill="none" />
      {/* long beard */}
      <path d="M31 43 C31 52 35 60 38 64 C41 60 45 52 45 43 C42 46 34 46 31 43Z" fill="#1d1612" />
      <path d="M34 42 C35 40 41 40 42 42" stroke="#1d1612" strokeWidth="1.6" fill="none" />
      {/* official's hat with wings */}
      <path d="M24 26 C24 12 52 12 52 26Z" fill="#161616" />
      <rect x="23" y="24" width="30" height="4" fill="#e8b344" />
      <circle cx="38" cy="18" r="2.2" fill="#e8b344" />
      <ellipse cx="14" cy="22" rx="10" ry="3" fill="#161616" transform="rotate(-6 14 22)" />
      <ellipse cx="62" cy="22" rx="10" ry="3" fill="#161616" transform="rotate(6 62 22)" />
    </svg>
  );
}

function OngDia() {
  // Earth God: bald, big laugh, bare round belly, palm-leaf fan
  return (
    <svg viewBox="0 0 76 96" width="76" height="96" style={{ display: 'block', overflow: 'visible' }}>
      {/* fan (behind, raised) */}
      <g transform="rotate(-18 64 34)">
        <line x1="64" y1="52" x2="64" y2="36" stroke="#6b3f14" strokeWidth="2" />
        <path d="M64 36 C50 30 52 10 64 8 C76 10 78 30 64 36Z" fill="#c9a15a" stroke="#6b3f14" strokeWidth=".8" />
        <path d="M64 36 L64 10 M64 36 L56 14 M64 36 L72 14" stroke="#8a6a2a" strokeWidth=".6" />
      </g>
      {/* robe open over the belly, sitting cross-legged */}
      <path d="M6 96 C4 80 10 60 22 52 H54 C66 60 72 80 70 96Z" fill="#efe3c6" stroke="#9c8a62" strokeWidth=".8" />
      <path d="M6 96 C14 86 62 86 70 96Z" fill="#d9c79c" />
      <ellipse cx="38" cy="74" rx="17" ry="16" fill="#f4c69a" stroke="#c9936a" strokeWidth=".8" />
      <circle cx="38" cy="76" r="1.4" fill="#b87a52" />
      {/* arm to the fan */}
      <path d="M54 58 C60 60 62 56 62 52" stroke="#f4c69a" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* head */}
      <ellipse cx="38" cy="34" rx="15" ry="15" fill="#f6d2a8" stroke="#c99a70" strokeWidth=".6" />
      <path d="M26 24 C30 18 46 18 50 24" stroke="#fbe3c6" strokeWidth="3" fill="none" opacity=".7" />
      <ellipse cx="22.5" cy="36" rx="3" ry="5" fill="#f1c496" />
      <ellipse cx="53.5" cy="36" rx="3" ry="5" fill="#f1c496" />
      <path d="M29 32 Q32 29 35 32 M41 32 Q44 29 47 32" stroke="#3a2210" strokeWidth="1.4" fill="none" />
      <circle cx="29" cy="39" r="3" fill="#f3a7a0" opacity=".7" />
      <circle cx="47" cy="39" r="3" fill="#f3a7a0" opacity=".7" />
      <path d="M31 39 Q38 48 45 39Z" fill="#8a2a1a" />
      <path d="M33 40 Q38 43 43 40" fill="#fff" />
    </svg>
  );
}

function Smoke({ x }: { x: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: x - 5,
            bottom: 0,
            width: 10,
            height: 18,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(235,230,225,.7), rgba(235,230,225,0) 70%)',
            animation: `${rise} 4.2s ease-out ${i * 1.4}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function Layer({ z, children, sx }: { z: number; children: ReactNode; sx?: object }) {
  return <Box sx={{ position: 'absolute', transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d', ...sx }}>{children}</Box>;
}

export function ThanTaiAltar() {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = reducedMotion();
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let t0 = performance.now();
    const host = wrapRef.current?.closest('[data-scene]') as HTMLElement | null;
    const onMove = (e: PointerEvent) => {
      const r = (host || wrapRef.current)!.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target.x = Math.max(-1, Math.min(1, e.gamma / 30));
      target.y = Math.max(-1, Math.min(1, (e.beta - 45) / 40));
    };
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      // gentle idle sway when nobody is moving the mouse
      const idleX = Math.sin(t * 0.5) * 0.35;
      cur.x += (target.x + idleX - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      if (tiltRef.current) tiltRef.current.style.transform = `rotateY(${(cur.x * 16).toFixed(2)}deg) rotateX(${(8 - cur.y * 8).toFixed(2)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    if (!reduce) {
      (host || window).addEventListener('pointermove', onMove as EventListener);
      host?.addEventListener('pointerleave', onLeave);
      window.addEventListener('deviceorientation', onTilt);
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      (host || window).removeEventListener('pointermove', onMove as EventListener);
      host?.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, []);

  return (
    <Box ref={wrapRef} sx={{ position: 'relative', width: 260, height: 250, perspective: '700px' }} aria-hidden="true">
      <Box sx={{ position: 'absolute', left: '50%', top: 20, width: 260, height: 220, ml: '-130px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,205,90,.5) 0%, rgba(255,180,60,.15) 45%, rgba(255,180,60,0) 70%)', animation: `${breathe} 5s ease-in-out infinite` }} />
      <Box ref={tiltRef} sx={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: 'rotateX(8deg)' }}>
        {/* back: the red altar cabinet with its roof */}
        <Layer z={-34} sx={{ left: 20, top: 8 }}>
          <svg viewBox="0 0 220 200" width="220" height="200" style={{ display: 'block' }}>
            <path d="M4 34 C30 30 60 18 110 14 C160 18 190 30 216 34 L206 44 H14Z" fill="#8f150d" stroke={GOLD} strokeWidth="2" />
            <path d="M4 34 C0 28 2 22 8 22 M216 34 C220 28 218 22 212 22" stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="110" cy="10" r="7" fill={GOLD} stroke={GOLD_D} />
            <rect x="16" y="44" width="188" height="150" fill="#6e0f09" stroke={GOLD} strokeWidth="2.5" />
            <rect x="26" y="54" width="168" height="130" fill="#9c1d12" />
            {/* gold coin medallion */}
            <circle cx="110" cy="84" r="20" fill={GOLD} stroke={GOLD_D} strokeWidth="1.5" />
            <rect x="103" y="77" width="14" height="14" fill="#9c1d12" stroke={GOLD_D} />
            {[48, 172].map((x) => (
              <path key={x} d={`M${x} 60 C${x - 10} 90 ${x + 10} 120 ${x} 150`} stroke="#c0452a" strokeWidth="3" fill="none" opacity=".6" />
            ))}
            <rect x="16" y="176" width="188" height="18" fill="#5a0c07" stroke={GOLD} strokeWidth="2" />
          </svg>
        </Layer>
        {/* the two figures */}
        <Layer z={0} sx={{ left: 44, top: 82 }}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <ThanTai />
            <OngDia />
          </Box>
        </Layer>
        {/* front: lamps, fruit and incense */}
        <Layer z={30} sx={{ left: 10, top: 178 }}>
          <Box sx={{ position: 'relative', width: 240, height: 64 }}>
            {[10, 206].map((x) => (
              <Box key={x} sx={{ position: 'absolute', left: x, top: 4 }}>
                <Box sx={{ position: 'absolute', left: -10, top: -12, width: 44, height: 44, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,120,60,.7), rgba(255,120,60,0) 70%)', animation: `${flicker} 2.6s ease-in-out infinite` }} />
                <svg viewBox="0 0 24 34" width="24" height="34" style={{ position: 'relative', display: 'block' }}>
                  <ellipse cx="12" cy="14" rx="10" ry="12" fill="#e0301e" stroke={GOLD} strokeWidth="1.2" />
                  <path d="M2 14 H22" stroke={GOLD} />
                  <rect x="8" y="26" width="8" height="8" fill={GOLD} />
                </svg>
              </Box>
            ))}
            {/* five-fruit plate */}
            <svg viewBox="0 0 70 34" width="70" height="34" style={{ position: 'absolute', left: 42, top: 16 }}>
              <path d="M8 20 C14 6 24 4 30 12 C24 8 16 10 12 22Z" fill="#f4d23c" stroke="#a0860f" strokeWidth=".6" />
              <circle cx="34" cy="16" r="8" fill="#9ccc4a" stroke="#5f8a1f" strokeWidth=".6" />
              <circle cx="46" cy="18" r="6" fill="#f28a1e" stroke="#a8560a" strokeWidth=".6" />
              <circle cx="24" cy="20" r="5.5" fill="#f28a1e" stroke="#a8560a" strokeWidth=".6" />
              <circle cx="55" cy="21" r="4.5" fill="#d8262a" />
              <path d="M4 24 H66 L60 32 H10Z" fill={GOLD} stroke={GOLD_D} strokeWidth=".8" />
            </svg>
            {/* incense bowl */}
            <Box sx={{ position: 'absolute', left: 128, top: -30, width: 50, height: 94 }}>
              <Box sx={{ position: 'absolute', left: 0, right: 0, top: 0, height: 40 }}>
                <Smoke x={16} />
                <Smoke x={25} />
                <Smoke x={34} />
              </Box>
              <svg viewBox="0 0 50 94" width="50" height="94" style={{ position: 'absolute', left: 0, top: 0 }}>
                {[16, 25, 34].map((x, i) => (
                  <g key={x}>
                    <line x1={x} y1={42 + (i === 1 ? -4 : 0)} x2={x} y2="70" stroke="#9c2a14" strokeWidth="1.4" />
                    <circle cx={x} cy={41 + (i === 1 ? -4 : 0)} r="1.6" fill="#ff7a2a" />
                  </g>
                ))}
                <path d="M8 66 H42 C42 82 36 88 25 88 C14 88 8 82 8 66Z" fill={GOLD} stroke={GOLD_D} strokeWidth="1" />
                <path d="M8 66 H42" stroke={GOLD_L} strokeWidth="2" />
              </svg>
            </Box>
            {/* small cups */}
            {[184, 192].map((x) => (
              <svg key={x} viewBox="0 0 8 8" width="8" height="8" style={{ position: 'absolute', left: x, top: 40 }}>
                <path d="M0 0 H8 L6 8 H2Z" fill="#fff8e8" stroke="#b9a37a" strokeWidth=".6" />
              </svg>
            ))}
          </Box>
        </Layer>
      </Box>
    </Box>
  );
}

/** Statue for a sanctuary, or null when the sanctuary has none. */
export function altarFor(religionType: string): ReactNode {
  if (religionType === 'thai_four_face') return <FourFaceAltar />;
  if (religionType === 'vietnamese_folk') return <ThanTaiAltar />;
  return null;
}
