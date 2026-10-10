/**
 * Statues for the two sanctuaries whose worship centres on one: the Thai Four-Faced
 * Buddha (Phra Phrom, as at the Erawan Shrine) and the Vietnamese Thần Tài altar. They sit
 * at the far end of the 3D hall. Everything is drawn here as SVG — no photos — with
 * metallic shading rather than flat colours, so they read as statues, not cartoons.
 *
 * Both are built from layers at different depths (backdrop → figures → offerings) and
 * tilt with the mouse or the phone, so they read as 3D.
 *  - FourFaceAltar: the seated, gilded Phra Phrom seen from the front — the main face and
 *    the two side faces in profile, eight arms with their attributes, a tall tiered crown —
 *    in a flame-edged golden arch. Tap to step through the four faces and their popular
 *    meanings; the statue turns a little each time.
 *  - ThanTaiAltar: Ông Địa (left) and Thần Tài (right) standing on an altar with a
 *    "Chúc đại phát đại lợi" banner, a bronze coin, flowers, fruit, gold and rising
 *    incense smoke.
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useI18n } from '../../i18n/i18n';

const rise = keyframes`
  0%   { transform: translateY(0) scaleX(1); opacity: 0; }
  15%  { opacity: .7; }
  100% { transform: translateY(-52px) scaleX(2); opacity: 0; }
`;
const breathe = keyframes`
  0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: .85; transform: scale(1.06); }
`;

function reducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Tilt a stack of layers with the mouse / phone, plus a slow idle sway.
 * `kick` adds a short extra turn (used when the Four-Faced Buddha is tapped).
 */
function useTilt(maxY = 16) {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const extra = useRef({ v: 0 });

  useEffect(() => {
    const reduce = reducedMotion();
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const t0 = performance.now();
    const host = (wrapRef.current?.closest('[data-scene]') as HTMLElement | null) || null;
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
      const idleX = Math.sin(t * 0.45) * 0.3;
      cur.x += (target.x + idleX - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      extra.current.v *= 0.93;
      if (tiltRef.current)
        tiltRef.current.style.transform = `rotateY(${(cur.x * maxY + extra.current.v).toFixed(2)}deg) rotateX(${(6 - cur.y * 7).toFixed(2)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    if (!reduce) {
      const src: EventTarget = host || window;
      src.addEventListener('pointermove', onMove as EventListener);
      host?.addEventListener('pointerleave', onLeave);
      window.addEventListener('deviceorientation', onTilt);
      raf = requestAnimationFrame(frame);
      return () => {
        cancelAnimationFrame(raf);
        src.removeEventListener('pointermove', onMove as EventListener);
        host?.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('deviceorientation', onTilt);
      };
    }
    return undefined;
  }, [maxY]);

  const kick = (deg: number) => {
    extra.current.v += deg;
  };
  return { tiltRef, wrapRef, kick };
}

function Layer({ z, children, sx }: { z: number; children: ReactNode; sx?: object }) {
  return <Box sx={{ position: 'absolute', transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d', ...sx }}>{children}</Box>;
}

function Smoke({ x, bottom }: { x: number; bottom: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: x - 6,
            bottom,
            width: 12,
            height: 20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(235,230,225,.65), rgba(235,230,225,0) 70%)',
            animation: `${rise} 4.4s ease-out ${i * 1.45}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

/** Shared metallic gradients (ids are unique per statue so both can be on one page) */
function GoldDefs({ p }: { p: string }) {
  return (
    <defs>
      <linearGradient id={`${p}gH`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#6b4006" />
        <stop offset=".22" stopColor="#c28a1c" />
        <stop offset=".48" stopColor="#ffe9a6" />
        <stop offset=".62" stopColor="#e2b44a" />
        <stop offset="1" stopColor="#6b4006" />
      </linearGradient>
      <linearGradient id={`${p}gV`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#fff0b8" />
        <stop offset=".35" stopColor="#e8b848" />
        <stop offset=".75" stopColor="#a8700f" />
        <stop offset="1" stopColor="#5e3805" />
      </linearGradient>
      <radialGradient id={`${p}gFace`} cx=".4" cy=".35" r=".75">
        <stop offset="0" stopColor="#fff3c4" />
        <stop offset=".45" stopColor="#e9bd52" />
        <stop offset="1" stopColor="#8a560a" />
      </radialGradient>
      <radialGradient id={`${p}gDark`} cx=".5" cy=".4" r=".7">
        <stop offset="0" stopColor="#d9a53a" />
        <stop offset="1" stopColor="#5e3805" />
      </radialGradient>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/* Four-Faced Buddha (Phra Phrom)                                     */
/* ------------------------------------------------------------------ */

const FACE_MEANING: [string, string, string, string][] = [
  ['事業', 'Career', 'Sự nghiệp', 'หน้าที่การงาน'],
  ['財運', 'Wealth', 'Tài lộc', 'โชคลาภ'],
  ['愛情', 'Love', 'Tình duyên', 'ความรัก'],
  ['健康平安', 'Health', 'Sức khỏe', 'สุขภาพ'],
];
const NTH: [string, string, string, string][] = [
  ['第一面', 'Face 1', 'Mặt thứ nhất', 'หน้าที่ 1'],
  ['第二面', 'Face 2', 'Mặt thứ hai', 'หน้าที่ 2'],
  ['第三面', 'Face 3', 'Mặt thứ ba', 'หน้าที่ 3'],
  ['第四面', 'Face 4', 'Mặt thứ tư', 'หน้าที่ 4'],
];

const G = (p: string, k: string) => `url(#${p}${k})`;
const LINE = '#5a3606';

/** A tapered limb segment from a (width wa) to b (width wb) */
function limb(a: [number, number], b: [number, number], wa: number, wb: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const P = (p: [number, number], w: number, k: number) => `${(p[0] + nx * w * k).toFixed(2)} ${(p[1] + ny * w * k).toFixed(2)}`;
  // slightly bulging sides so it reads as a rounded arm, not a pipe
  const m: [number, number] = [a[0] + dx * 0.45, a[1] + dy * 0.45];
  const wm = (wa + wb) / 2 + 0.5;
  return `M${P(a, wa / 2, 1)} Q${P(m, wm / 2, 1.15)} ${P(b, wb / 2, 1)} L${P(b, wb / 2, -1)} Q${P(m, wm / 2, -1.15)} ${P(a, wa / 2, -1)}Z`;
}

/** One arm: shoulder → elbow → hand, tapered, with an armlet and a bracelet */
function Arm({ p, s, e, h }: { p: string; s: [number, number]; e: [number, number]; h: [number, number] }) {
  const at = (a: [number, number], b: [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const armlet = at(s, e, 0.35);
  const bracelet = at(e, h, 0.8);
  return (
    <g>
      <path d={limb(s, e, 6.4, 4.6)} fill={G(p, 'gH')} stroke={LINE} strokeWidth=".55" />
      <path d={limb(e, h, 4.4, 3.2)} fill={G(p, 'gH')} stroke={LINE} strokeWidth=".55" />
      <circle cx={e[0]} cy={e[1]} r="2.3" fill={G(p, 'gFace')} />
      <circle cx={armlet[0]} cy={armlet[1]} r="2.1" fill="#fff0b8" stroke={LINE} strokeWidth=".4" />
      <circle cx={bracelet[0]} cy={bracelet[1]} r="1.9" fill="#ffe7a0" stroke={LINE} strokeWidth=".4" />
      <path d={`M${h[0] - 2.6} ${h[1] + 1.5} C${h[0] - 3.2} ${h[1] - 2.5} ${h[0] - 1} ${h[1] - 3.8} ${h[0] + 0.6} ${h[1] - 3.6} C${h[0] + 2.8} ${h[1] - 3.4} ${h[0] + 3.4} ${h[1] - 1} ${h[0] + 2.6} ${h[1] + 1.5} C${h[0] + 1} ${h[1] + 3} ${h[0] - 1} ${h[1] + 3} ${h[0] - 2.6} ${h[1] + 1.5}Z`} fill={G(p, 'gFace')} stroke={LINE} strokeWidth=".45" />
    </g>
  );
}

type Attr = 'spear' | 'flag' | 'discus' | 'book' | 'conch' | 'pot' | 'rosary' | 'lotus';
function Attribute({ kind, x, y }: { kind: Attr; x: number; y: number }) {
  switch (kind) {
    case 'spear':
      return (
        <g>
          <line x1={x} y1={y + 12} x2={x} y2={y - 26} stroke="#7a4b08" strokeWidth="1.6" />
          <path d={`M${x} ${y - 36} L${x + 3.2} ${y - 27} L${x} ${y - 24} L${x - 3.2} ${y - 27}Z`} fill="#fff0b8" stroke={LINE} strokeWidth=".6" />
        </g>
      );
    case 'flag':
      return (
        <g>
          <line x1={x} y1={y + 12} x2={x} y2={y - 30} stroke="#7a4b08" strokeWidth="1.6" />
          <path d={`M${x} ${y - 30} C${x + 8} ${y - 31} ${x + 10} ${y - 24} ${x + 16} ${y - 25} L${x + 12} ${y - 19} C${x + 8} ${y - 18} ${x + 5} ${y - 22} ${x} ${y - 21}Z`} fill="#c8321c" />
          <circle cx={x} cy={y - 31} r="1.6" fill="#ffe7a0" />
        </g>
      );
    case 'discus':
      return (
        <g transform={`translate(${x},${y - 9})`}>
          <circle r="7.5" fill="#e8b848" stroke={LINE} strokeWidth=".7" />
          <circle r="4.8" fill="none" stroke="#fff0b8" strokeWidth=".8" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <line key={i} x1={Math.cos(a) * 2} y1={Math.sin(a) * 2} x2={Math.cos(a) * 7} y2={Math.sin(a) * 7} stroke="#8a560a" strokeWidth=".5" />;
          })}
          <circle r="1.8" fill="#b0321e" />
        </g>
      );
    case 'book':
      return (
        <g transform={`translate(${x},${y - 7}) rotate(-8)`}>
          <rect x="-7" y="-5" width="14" height="9" rx="1" fill="#8e1f14" stroke={LINE} strokeWidth=".6" />
          <path d="M-7 -1 H7 M-7 2 H7" stroke="#e8b848" strokeWidth=".7" />
        </g>
      );
    case 'conch':
      return (
        <g transform={`translate(${x},${y - 8})`}>
          <path d="M-5 5 C-8 -2 -3 -9 3 -8 C8 -5 7 3 1 6Z" fill="#fbf6ea" stroke="#9c8a62" strokeWidth=".7" />
          <path d="M-2 2 C0 -3 3 -5 4 -6 M-1 4 C2 1 4 -1 6 -2" stroke="#c9b48c" strokeWidth=".6" fill="none" />
        </g>
      );
    case 'pot':
      return (
        <g transform={`translate(${x},${y - 9})`}>
          <path d="M-5.5 -1 C-8 5 -4 8.5 0 8.5 C4 8.5 8 5 5.5 -1Z" fill="#e8b848" stroke={LINE} strokeWidth=".7" />
          <rect x="-2.6" y="-6" width="5.2" height="5" fill="#d9a53a" stroke={LINE} strokeWidth=".6" />
          <path d="M-2.6 -6 C-1 -9 1 -9 2.6 -6" fill="#fff0b8" />
        </g>
      );
    case 'rosary':
      return (
        <g transform={`translate(${x},${y + 4})`}>
          {Array.from({ length: 11 }, (_, i) => {
            const a = (i / 11) * Math.PI * 2;
            return <circle key={i} cx={Math.cos(a) * 4.5} cy={Math.sin(a) * 5.5 + 4} r="1.4" fill="#6b2e10" />;
          })}
        </g>
      );
    case 'lotus':
      return (
        <g transform={`translate(${x},${y - 9})`}>
          <path d="M0 6 C-5 1 -4 -6 0 -9 C4 -6 5 1 0 6Z" fill="#f4a3c0" stroke="#b8406a" strokeWidth=".6" />
          <path d="M0 6 C-7 4 -8 -1 -5 -4 C-3 0 -1 3 0 6Z M0 6 C7 4 8 -1 5 -4 C3 0 1 3 0 6Z" fill="#f8c0d4" />
        </g>
      );
  }
}

/** A Thai-style serene face, seen from the front */
function FrontFace({ p }: { p: string }) {
  return (
    <g>
      <path d="M88.5 84 C88.5 70 111.5 70 111.5 84 C111.5 96 104.5 104.5 100 104.5 C95.5 104.5 88.5 96 88.5 84Z" fill={G(p, 'gFace')} stroke={LINE} strokeWidth=".7" />
      {/* joined arched brows */}
      <path d="M91 83 C94 79.5 97.5 79.5 99.4 82.6 M100.6 82.6 C102.5 79.5 106 79.5 109 83" stroke="#6b4006" strokeWidth=".9" fill="none" />
      {/* downcast almond eyes */}
      <path d="M92.5 87.4 C94.5 88.8 96.8 88.8 98.3 87.4 M101.7 87.4 C103.2 88.8 105.5 88.8 107.5 87.4" stroke="#4a2b04" strokeWidth=".95" fill="none" />
      <path d="M92.8 86.8 C94.8 85.6 96.8 85.8 98.1 86.9 M101.9 86.9 C103.2 85.8 105.2 85.6 107.2 86.8" stroke="#a8700f" strokeWidth=".5" fill="none" />
      {/* long straight nose */}
      <path d="M100 84 L99.3 94 C99.8 95.3 100.8 95.3 101.4 94.4" stroke="#8a560a" strokeWidth=".7" fill="none" />
      {/* gentle smile */}
      <path d="M96.2 98.6 C98.2 100.2 101.8 100.2 103.8 98.6" stroke="#7a3a10" strokeWidth=".9" fill="none" />
      <path d="M97.4 98.4 C99 97.7 101 97.7 102.6 98.4" stroke="#a0561a" strokeWidth=".5" fill="none" />
      <circle cx="100" cy="79.2" r=".9" fill="#b0321e" />
      {/* highlight */}
      <ellipse cx="95" cy="80" rx="3.2" ry="5" fill="#fff8dc" opacity=".35" />
    </g>
  );
}

/** A face in profile (the side faces). dir = -1 looks left, 1 looks right */
function SideFace({ p, dir }: { p: string; dir: -1 | 1 }) {
  const cx = 100 + dir * 13.5;
  const f = (dx: number) => cx + dir * dx;
  return (
    <g>
      <path
        d={`M${f(-7)} 72 C${f(2)} 70 ${f(7.5)} 76 ${f(7.8)} 83 L${f(9.8)} 90 L${f(7.6)} 91 C${f(8)} 94 ${f(7.4)} 96 ${f(6.8)} 97.5 C${f(7)} 99 ${f(5.6)} 102 ${f(2)} 103 C${f(-3)} 103.5 ${f(-7)} 98 ${f(-8)} 90Z`}
        fill={G(p, 'gDark')}
        stroke={LINE}
        strokeWidth=".6"
      />
      <path d={`M${f(2.2)} 87.6 C${f(3.6)} 88.6 ${f(5)} 88.4 ${f(6)} 87.4`} stroke="#4a2b04" strokeWidth=".8" fill="none" />
      <path d={`M${f(1.8)} 83.4 C${f(3.8)} 81.6 ${f(5.8)} 81.8 ${f(7)} 83`} stroke="#6b4006" strokeWidth=".7" fill="none" />
      <path d={`M${f(4.2)} 97.6 L${f(6.4)} 97.4`} stroke="#7a3a10" strokeWidth=".8" />
    </g>
  );
}

/** Phra Phrom, seated, front view. viewBox 0 0 200 300 */
function PhraPhrom() {
  const p = 'ff';
  const L: { s: [number, number]; e: [number, number]; h: [number, number]; a: Attr }[] = [
    { s: [75, 128], e: [53, 114], h: [45, 86], a: 'spear' },
    { s: [75, 132], e: [45, 131], h: [32, 111], a: 'discus' },
    { s: [76, 138], e: [46, 152], h: [30, 146], a: 'conch' },
  ];
  const R = L.map((x, i) => ({
    s: [200 - x.s[0], x.s[1]] as [number, number],
    e: [200 - x.e[0], x.e[1]] as [number, number],
    h: [200 - x.h[0], x.h[1]] as [number, number],
    a: (['flag', 'book', 'pot'] as Attr[])[i],
  }));
  return (
    <svg viewBox="0 0 200 300" width="200" height="300" style={{ display: 'block', overflow: 'visible' }}>
      <GoldDefs p={p} />
      {/* raised arms (behind the body) */}
      {[...L, ...R].map((a, i) => (
        <g key={i}>
          <Arm p={p} s={a.s} e={a.e} h={a.h} />
          <Attribute kind={a.a} x={a.h[0]} y={a.h[1]} />
        </g>
      ))}

      {/* lotus throne and plinth */}
      <rect x="36" y="262" width="128" height="30" rx="2" fill="#6d1109" stroke="#e2b44a" strokeWidth="1.4" />
      <path d="M36 270 H164 M36 284 H164" stroke="#e2b44a" strokeWidth=".9" />
      {Array.from({ length: 11 }, (_, i) => (
        <circle key={i} cx={44 + i * 11.2} cy="277" r="2" fill="#e8b848" />
      ))}
      <path d="M44 262 C44 256 156 256 156 262Z" fill={G(p, 'gV')} stroke={LINE} strokeWidth=".6" />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 47 + i * 9.6;
        return <path key={`b${i}`} d={`M${x} 259 C${x - 5} 252 ${x - 3} 244 ${x + 0.5} 242 C${x + 4} 244 ${x + 6} 252 ${x + 1} 259Z`} fill={G(p, 'gH')} stroke={LINE} strokeWidth=".5" />;
      })}
      {Array.from({ length: 11 }, (_, i) => {
        const x = 52 + i * 9.6;
        return <path key={`t${i}`} d={`M${x} 250 C${x - 4.5} 244 ${x - 3} 237 ${x} 235 C${x + 3} 237 ${x + 4.5} 244 ${x} 250Z`} fill="#f3cf6e" stroke={LINE} strokeWidth=".45" />;
      })}

      {/* crossed legs with pleated lower garment */}
      <path d="M52 238 C50 218 66 204 84 200 L116 200 C134 204 150 218 148 238 C130 246 70 246 52 238Z" fill={G(p, 'gH')} stroke={LINE} strokeWidth=".7" />
      <path d="M60 232 C75 226 90 225 100 228 C110 225 125 226 140 232" stroke="#8a560a" strokeWidth=".7" fill="none" />
      {[70, 80, 90, 110, 120, 130].map((x) => (
        <path key={x} d={`M${x} 205 C${x + (x < 100 ? -3 : 3)} 220 ${x + (x < 100 ? -4 : 4)} 232 ${x + (x < 100 ? -4 : 4)} 240`} stroke="#9a640e" strokeWidth=".45" fill="none" />
      ))}
      <path d="M92 200 L100 236 L108 200" fill="#c28a1c" stroke={LINE} strokeWidth=".5" />
      {/* soles in the lotus pose */}
      <ellipse cx="74" cy="228" rx="8" ry="3.4" fill={G(p, 'gFace')} stroke={LINE} strokeWidth=".5" transform="rotate(-10 74 228)" />
      <ellipse cx="126" cy="228" rx="8" ry="3.4" fill={G(p, 'gFace')} stroke={LINE} strokeWidth=".5" transform="rotate(10 126 228)" />

      {/* torso */}
      <path d="M70 121 C70 142 80 160 85 176 C86 186 84 196 84 202 L116 202 C116 196 114 186 115 176 C120 160 130 142 130 121 C116 115 84 115 70 121Z" fill={G(p, 'gH')} stroke={LINE} strokeWidth=".7" />
      <path d="M82 142 C88 148 96 148 99 144 M101 144 C104 148 112 148 118 142" stroke="#9a640e" strokeWidth=".55" fill="none" />
      <path d="M86 176 C95 180 105 180 114 176" stroke="#9a640e" strokeWidth=".5" fill="none" />
      {/* belt */}
      <path d="M83 196 C95 200 105 200 117 196 L117 204 C105 208 95 208 83 204Z" fill="#b8801a" stroke={LINE} strokeWidth=".6" />
      <circle cx="100" cy="202" r="2.6" fill="#b0321e" stroke="#ffe7a0" strokeWidth=".6" />
      {/* crossed chest chains (sangwan) */}
      {[
        [78, 132, 113, 197],
        [122, 132, 87, 197],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff0b8" strokeWidth="1.6" />
          {Array.from({ length: 9 }, (_, k) => (
            <circle key={k} cx={x1 + ((x2 - x1) * (k + 0.5)) / 9} cy={y1 + ((y2 - y1) * (k + 0.5)) / 9} r=".9" fill="#b0321e" />
          ))}
        </g>
      ))}
      <path d="M100 157 L104.5 162.5 L100 168 L95.5 162.5Z" fill="#b0321e" stroke="#ffe7a0" strokeWidth=".8" />

      {/* front arms: one hand in blessing, one holding a rosary on the lap */}
      <Arm p={p} s={[78, 140]} e={[66, 172]} h={[84, 186]} />
      <Attribute kind="rosary" x={84} y={186} />
      <Arm p={p} s={[122, 140]} e={[136, 168]} h={[122, 160]} />
      <Attribute kind="lotus" x={122} y={160} />

      {/* pointed shoulder ornaments (inthanu) */}
      {[-1, 1].map((d) => (
        <path
          key={d}
          d={`M${100 + d * 22} 121 C${100 + d * 30} 116 ${100 + d * 35} 112 ${100 + d * 39} 104 C${100 + d * 36} 114 ${100 + d * 33} 124 ${100 + d * 27} 131Z`}
          fill={G(p, 'gV')}
          stroke={LINE}
          strokeWidth=".6"
        />
      ))}
      {/* wide collar */}
      <path d="M76 120 C84 136 116 136 124 120 C116 126 84 126 76 120Z" fill={G(p, 'gV')} stroke={LINE} strokeWidth=".7" />
      {[83, 88, 94, 100, 106, 112, 117].map((x, i) => (
        <path key={x} d={`M${x} ${128 + (i === 3 ? 3 : Math.abs(3 - i) < 2 ? 1.5 : 0)} l1.6 4 l-1.6 1.6 l-1.6 -1.6Z`} fill="#b0321e" stroke="#ffe7a0" strokeWidth=".4" />
      ))}
      {/* neck */}
      <path d="M94.5 108 L94 119 C97 121 103 121 106 119 L105.5 108Z" fill={G(p, 'gH')} stroke={LINE} strokeWidth=".6" />

      <g transform="translate(0 7)">
      {/* the three faces we can see: two in profile, the main one in front */}
      <SideFace p={p} dir={-1} />
      <SideFace p={p} dir={1} />
      {/* ear flares and earrings */}
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={`M${100 + d * 11.8} 84 C${100 + d * 15} 88 ${100 + d * 15} 98 ${100 + d * 12} 104`} stroke={G(p, 'gV')} strokeWidth="2.4" fill="none" />
          <path d={`M${100 + d * 12} 102 L${100 + d * 14.5} 112 L${100 + d * 12} 116 L${100 + d * 9.5} 112Z`} fill="#fff0b8" stroke={LINE} strokeWidth=".5" />
        </g>
      ))}
      <FrontFace p={p} />

      {/* diadem band with flame points */}
      <path d="M79 76 C86 66 114 66 121 76 L121 70 C114 60 86 60 79 70Z" fill={G(p, 'gV')} stroke={LINE} strokeWidth=".7" />
      {[86, 93, 100, 107, 114].map((x) => (
        <circle key={x} cx={x} cy={x === 100 ? 67.5 : 68.6} r={x === 100 ? 1.8 : 1.1} fill="#b0321e" />
      ))}
      {[-1, 1].map((d) => (
        <path key={d} d={`M${100 + d * 21} 73 C${100 + d * 27} 70 ${100 + d * 29} 64 ${100 + d * 29} 58 C${100 + d * 26} 63 ${100 + d * 23} 66 ${100 + d * 19} 67Z`} fill={G(p, 'gV')} stroke={LINE} strokeWidth=".5" />
      ))}
      {/* tall tiered crown (chada) ending in a slender spire */}
      {Array.from({ length: 7 }, (_, i) => {
        const yb = 64 - i * 7.2;
        const w = 17 - i * 2.05;
        const wt = w - 1.6;
        return (
          <g key={i}>
            <path d={`M${100 - w} ${yb} C${100 - w} ${yb - 3} ${100 - wt} ${yb - 7.2} ${100 - wt} ${yb - 7.2} L${100 + wt} ${yb - 7.2} C${100 + wt} ${yb - 7.2} ${100 + w} ${yb - 3} ${100 + w} ${yb}Z`} fill={G(p, 'gH')} stroke={LINE} strokeWidth=".55" />
            <path d={`M${100 - w + 0.6} ${yb - 1.2} H${100 + w - 0.6}`} stroke="#fff0b8" strokeWidth=".7" />
            {i % 2 === 0 && <circle cx="100" cy={yb - 3.8} r=".9" fill="#b0321e" />}
          </g>
        );
      })}
      <path d="M97.6 14 C98.6 6 99.4 1 100 -6 C100.6 1 101.4 6 102.4 14Z" fill={G(p, 'gH')} stroke={LINE} strokeWidth=".5" />
      <circle cx="100" cy="15" r="1.4" fill="#fff0b8" />
      </g>
    </svg>
  );
}

/** The flame-edged golden arch (sum) behind the statue */
function ThaiArch() {
  const p = 'fa';
  const pts: string[] = [];
  // an ogee arch: sides rise, then curve in to a pointed top
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const y = 300 - t * 290;
    const half = t < 0.55 ? 104 : 104 * Math.cos(((t - 0.55) / 0.45) * (Math.PI / 2)) ** 0.85;
    pts.push(`${(120 - half).toFixed(1)},${y.toFixed(1)}`);
  }
  const left = pts;
  const right = pts.map((s) => {
    const [x, y] = s.split(',').map(Number);
    return `${(240 - x).toFixed(1)},${y}`;
  });
  const outline = [...left, ...right.reverse()].join(' ');
  return (
    <svg viewBox="0 0 240 310" width="240" height="310" style={{ display: 'block', overflow: 'visible' }}>
      <GoldDefs p={p} />
      <defs>
        <radialGradient id="faIn" cx=".5" cy=".45" r=".6">
          <stop offset="0" stopColor="#8e2414" />
          <stop offset="1" stopColor="#3a0805" />
        </radialGradient>
      </defs>
      {/* flame points (kranok) along the edge */}
      {left.concat(right).map((s, i) => {
        if (i % 3 !== 0) return null;
        const [x, y] = s.split(',').map(Number);
        const dx = x < 120 ? -1 : 1;
        return <path key={i} d={`M${x} ${y + 4} C${x + dx * 7} ${y + 2} ${x + dx * 9} ${y - 6} ${x + dx * 6} ${y - 10} C${x + dx * 4} ${y - 4} ${x + dx * 2} ${y - 2} ${x} ${y - 4}Z`} fill="url(#fagV)" opacity=".95" />;
      })}
      <polygon points={outline} fill={G(p, 'gV')} stroke={LINE} strokeWidth="1" />
      <polygon points={outline} fill="url(#faIn)" transform="translate(120 160) scale(.92) translate(-120 -160)" />
    </svg>
  );
}

function Elephant({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 50 42" width="50" height="42" style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined }}>
      <defs>
        <linearGradient id="elW" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a4724a" />
          <stop offset="1" stopColor="#4e2c12" />
        </linearGradient>
      </defs>
      <path d="M6 38 V25 C6 13 16 9 27 10 C35 10 40 14 41 20 C44 22 45 27 43 33 C42 36 40 37 39 35 C40 31 39 28 37 27 L37 38 H31 V32 H15 V38Z" fill="url(#elW)" stroke="#2e1706" strokeWidth=".7" />
      <path d="M23 14 C19 16 19 23 24 25 C27 22 27 16 23 14Z" fill="#b8865c" opacity=".7" />
      <path d="M37 22 C35 25 33 25 31 24" stroke="#f5efe2" strokeWidth="1.2" fill="none" />
      <circle cx="34.5" cy="17" r="1.1" fill="#140a02" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={27 + i * 2} cy={25 + Math.sin(i * 0.9) * 1.6} r="1.7" fill={i % 2 ? '#fff3c4' : '#f59a1b'} />
      ))}
    </svg>
  );
}

function Garland({ w }: { w: number }) {
  const n = Math.round(w / 6);
  return (
    <svg viewBox={`0 0 ${w} 26`} width={w} height="26" style={{ display: 'block' }}>
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return <circle key={i} cx={4 + t * (w - 8)} cy={6 + Math.sin(t * Math.PI) * 14} r="3.6" fill={i % 4 === 1 ? '#fff3c4' : i % 4 === 3 ? '#e2521c' : '#f59a1b'} stroke="#b0560a" strokeWidth=".4" />;
      })}
    </svg>
  );
}

export function FourFaceAltar() {
  const { tr4 } = useI18n();
  const [face, setFace] = useState(0);
  const { tiltRef, wrapRef, kick } = useTilt(14);
  const next = () => {
    setFace((f) => (f + 1) % 4);
    kick(-38);
  };
  return (
    <Box
      ref={wrapRef}
      component="button"
      onClick={next}
      aria-label={tr4('看下一面', 'Show the next face', 'Xem mặt tiếp theo', 'ดูหน้าถัดไป')}
      sx={{ position: 'relative', width: 240, height: 340, p: 0, border: 'none', background: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent', perspective: '760px' }}
    >
      <Box sx={{ position: 'absolute', left: '50%', top: 60, width: 260, height: 260, ml: '-130px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,110,.5) 0%, rgba(255,190,80,.16) 45%, rgba(255,190,80,0) 70%)', animation: `${breathe} 5s ease-in-out infinite` }} />
      <Box ref={tiltRef} sx={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: 'rotateX(6deg)' }}>
        <Layer z={-40} sx={{ left: 0, top: 0 }}>
          <ThaiArch />
        </Layer>
        <Layer z={0} sx={{ left: 20, top: 6 }}>
          <PhraPhrom />
        </Layer>
        <Layer z={26} sx={{ left: 50, top: 262 }}>
          <Garland w={140} />
        </Layer>
        <Layer z={34} sx={{ left: -6, top: 262 }}>
          <Elephant />
        </Layer>
        <Layer z={34} sx={{ right: -6, top: 262 }}>
          <Elephant flip />
        </Layer>
      </Box>
      <Typography sx={{ position: 'absolute', left: 0, right: 0, top: 312, fontSize: '0.95rem', fontWeight: 800, color: '#FFE3A3', textShadow: '0 1px 6px rgba(0,0,0,.85)', userSelect: 'none' }}>
        {tr4(...NTH[face])}・{tr4(...FACE_MEANING[face])}
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Thần Tài & Ông Địa                                                  */
/* ------------------------------------------------------------------ */

const SKIN = 'url(#ttSkin)';

/** Gold ingot (nguyên bảo) */
function Ingot({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-11 0 C-12 -6 -8 -7 -6 -4 C-3 -8 3 -8 6 -4 C8 -7 12 -6 11 0 C8 6 -8 6 -11 0Z" fill="url(#ttGold)" stroke="#7a4b08" strokeWidth=".7" />
      <ellipse cx="0" cy="-4.2" rx="4.4" ry="3" fill="#ffe9a6" stroke="#b8801a" strokeWidth=".5" />
    </g>
  );
}

/** Ông Địa (the Earth God): bald, laughing, bare round belly, palm-leaf fan and a gold ingot */
function OngDia() {
  return (
    <g>
      {/* fan held up (behind) */}
      <g transform="rotate(-14 44 104)">
        <line x1="46" y1="148" x2="44" y2="104" stroke="#6b3f14" strokeWidth="2.4" />
        <path d="M44 106 C24 100 20 62 42 56 C62 58 66 98 44 106Z" fill="url(#ttFan)" stroke="#7a5a24" strokeWidth=".8" />
        {[-14, -7, 0, 7, 14].map((d) => (
          <path key={d} d={`M44 104 L${43 + d} 60`} stroke="#a4843e" strokeWidth=".6" />
        ))}
        <path d="M24 84 C34 88 54 88 64 84" stroke="#a4843e" strokeWidth=".5" fill="none" />
      </g>
      {/* robe: brown, draped open over the belly */}
      <path d="M52 110 C40 118 34 150 36 206 H122 C124 150 118 118 106 110 C96 104 62 104 52 110Z" fill="url(#ttBrown)" stroke="#4a2a0c" strokeWidth=".8" />
      <path d="M60 206 C62 180 66 160 70 150 M98 150 C102 160 106 180 104 206" stroke="#5e3612" strokeWidth=".7" fill="none" />
      {/* lower garment and sash */}
      <path d="M58 172 C70 180 90 180 102 172 L104 206 H56Z" fill="#6e4414" />
      <path d="M58 172 C70 178 90 178 102 172" stroke="#4a2a0c" strokeWidth="2.6" fill="none" />
      <path d="M80 176 C76 186 74 194 76 200 M80 176 C84 186 86 194 84 200" stroke="#4a2a0c" strokeWidth="2" fill="none" />
      {/* big bare belly and chest */}
      <ellipse cx="79" cy="148" rx="24" ry="27" fill={SKIN} stroke="#b07a52" strokeWidth=".7" />
      <path d="M62 128 C70 124 88 124 96 128" stroke="#d09a6e" strokeWidth=".8" fill="none" />
      <circle cx="79" cy="152" r="1.6" fill="#a2663e" />
      <ellipse cx="72" cy="140" rx="7" ry="10" fill="#fff" opacity=".18" />
      {/* arm raised to the fan */}
      <path d="M56 116 C46 124 44 134 46 146" stroke="#8a5a24" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="147" r="5" fill={SKIN} stroke="#b07a52" strokeWidth=".6" />
      {/* other hand holding a gold ingot */}
      <path d="M104 116 C114 126 114 142 104 150" stroke="#8a5a24" strokeWidth="10" strokeLinecap="round" fill="none" />
      <Ingot x={104} y={150} s={1.05} />
      <path d="M98 152 C102 157 108 157 111 153" stroke="#b07a52" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      {/* bare feet */}
      <ellipse cx="68" cy="207" rx="8" ry="3.4" fill={SKIN} stroke="#b07a52" strokeWidth=".5" />
      <ellipse cx="92" cy="207" rx="8" ry="3.4" fill={SKIN} stroke="#b07a52" strokeWidth=".5" />
      {/* head: bald, big laugh */}
      <ellipse cx="57.5" cy="86" rx="4.5" ry="7" fill="#eab98a" />
      <ellipse cx="100.5" cy="86" rx="4.5" ry="7" fill="#eab98a" />
      <path d="M79 58 C94 58 101 70 101 84 C101 100 92 110 79 110 C66 110 57 100 57 84 C57 70 64 58 79 58Z" fill={SKIN} stroke="#b07a52" strokeWidth=".7" />
      <ellipse cx="72" cy="68" rx="9" ry="5" fill="#fff" opacity=".28" />
      <path d="M66 77 C68.5 74.5 72 74.5 74 77 M84 77 C86 74.5 89.5 74.5 92 77" stroke="#6b3a1a" strokeWidth="1.2" fill="none" />
      <path d="M65.6 83 C68 80.4 72 80.4 74 83 M84 83 C86 80.4 90 80.4 92.4 83" stroke="#3a1c0a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="67" cy="91" rx="4.6" ry="3" fill="#f0908a" opacity=".45" />
      <ellipse cx="91" cy="91" rx="4.6" ry="3" fill="#f0908a" opacity=".45" />
      <path d="M79 84 C77.6 88 78 90 80 90.4" stroke="#b07a52" strokeWidth=".9" fill="none" />
      <path d="M69 94 C73 104 85 104 89 94 C84 96.5 74 96.5 69 94Z" fill="#7a2418" />
      <path d="M71 95 C75 97.4 83 97.4 87 95 L86 97 C82 98.4 76 98.4 72 97Z" fill="#fff" />
      <path d="M73 101 C76 102.6 82 102.6 85 101" stroke="#d45a4a" strokeWidth="1.4" fill="none" />
    </g>
  );
}

/** Thần Tài (God of Wealth): jewelled official's hat, gold dragon robe, ruyi and gold ingot */
function ThanTai() {
  const cx = 221;
  return (
    <g>
      {/* robe */}
      <path d={`M${cx - 30} 110 C${cx - 44} 122 ${cx - 48} 160 ${cx - 46} 206 H${cx + 46} C${cx + 48} 160 ${cx + 44} 122 ${cx + 30} 110 C${cx + 18} 104 ${cx - 18} 104 ${cx - 30} 110Z`} fill="url(#ttRobe)" stroke="#7a4b08" strokeWidth=".8" />
      {/* red lining and hem */}
      <path d={`M${cx - 46} 196 H${cx + 46} V206 H${cx - 46}Z`} fill="#b3261a" />
      {/* sea waves (hải thủy) at the hem */}
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${cx - 44 + i * 11} 196 C${cx - 44 + i * 11} 188 ${cx - 33 + i * 11} 188 ${cx - 33 + i * 11} 196`} stroke="#fff0b8" strokeWidth="1" fill="none" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <path key={`w${i}`} d={`M${cx - 38 + i * 11} 188 C${cx - 38 + i * 11} 182 ${cx - 29 + i * 11} 182 ${cx - 29 + i * 11} 188`} stroke="#c28a1c" strokeWidth=".8" fill="none" />
      ))}
      {/* front panel with a dragon medallion */}
      <path d={`M${cx - 14} 112 L${cx - 18} 186 H${cx + 18} L${cx + 14} 112Z`} fill="#f7cf5c" stroke="#b8801a" strokeWidth=".6" />
      <circle cx={cx} cy={138} r="12" fill="#d8901f" stroke="#fff0b8" strokeWidth="1.2" />
      <path d={`M${cx - 8} 140 C${cx - 6} 130 ${cx + 2} 128 ${cx + 6} 134 C${cx + 9} 139 ${cx + 4} 146 ${cx - 2} 143 C${cx - 5} 141 ${cx - 2} 136 ${cx + 1} 137`} stroke="#8e1f14" strokeWidth="1.2" fill="none" />
      <circle cx={cx + 5} cy={133} r="1" fill="#8e1f14" />
      {/* cloud scrolls on the robe */}
      {[
        [cx - 30, 160],
        [cx + 28, 164],
        [cx - 32, 132],
        [cx + 32, 128],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x - 6} ${y} C${x - 6} ${y - 6} ${x} ${y - 6} ${x} ${y - 2} C${x} ${y - 7} ${x + 7} ${y - 6} ${x + 6} ${y}`} stroke="#b8801a" strokeWidth=".9" fill="none" />
      ))}
      {/* jade belt */}
      <path d={`M${cx - 34} 156 C${cx - 12} 162 ${cx + 12} 162 ${cx + 34} 156 L${cx + 34} 164 C${cx + 12} 170 ${cx - 12} 170 ${cx - 34} 164Z`} fill="#2f7a55" stroke="#1d4a33" strokeWidth=".7" />
      {[-22, -8, 8, 22].map((d) => (
        <rect key={d} x={cx + d - 3.5} y={157 + Math.abs(d) * -0.02} width="7" height="8" rx="1" fill="#e8b848" stroke="#7a4b08" strokeWidth=".5" />
      ))}
      {/* wide sleeves */}
      <path d={`M${cx - 30} 112 C${cx - 46} 120 ${cx - 50} 142 ${cx - 40} 152 C${cx - 32} 150 ${cx - 26} 146 ${cx - 22} 140`} fill="url(#ttRobe)" stroke="#7a4b08" strokeWidth=".7" />
      <path d={`M${cx + 30} 112 C${cx + 46} 120 ${cx + 50} 142 ${cx + 40} 152 C${cx + 32} 150 ${cx + 26} 146 ${cx + 22} 140`} fill="url(#ttRobe)" stroke="#7a4b08" strokeWidth=".7" />
      <path d={`M${cx - 40} 152 C${cx - 34} 146 ${cx - 28} 144 ${cx - 22} 140`} stroke="#b3261a" strokeWidth="2.2" fill="none" />
      <path d={`M${cx + 40} 152 C${cx + 34} 146 ${cx + 28} 144 ${cx + 22} 140`} stroke="#b3261a" strokeWidth="2.2" fill="none" />
      {/* ruyi scepter (his right hand, our left) */}
      <path d={`M${cx - 36} 150 L${cx - 20} 102`} stroke="url(#ttGold)" strokeWidth="3.4" strokeLinecap="round" />
      <path d={`M${cx - 22} 104 C${cx - 30} 96 ${cx - 22} 86 ${cx - 14} 92 C${cx - 8} 96 ${cx - 14} 106 ${cx - 22} 104Z`} fill="#3f9a72" stroke="#1d4a33" strokeWidth=".8" />
      <path d={`M${cx - 20} 97 C${cx - 18} 94 ${cx - 14} 95 ${cx - 15} 98`} stroke="#bdf0d6" strokeWidth=".8" fill="none" />
      <ellipse cx={cx - 36} cy={150} rx="5" ry="4.4" fill={SKIN} stroke="#b07a52" strokeWidth=".6" />
      {/* gold ingot in the other hand */}
      <Ingot x={cx + 38} y={146} s={1.15} />
      <ellipse cx={cx + 38} cy={152} rx="6" ry="3.4" fill={SKIN} stroke="#b07a52" strokeWidth=".6" />
      {/* black shoes */}
      <path d={`M${cx - 22} 206 C${cx - 22} 212 ${cx - 8} 212 ${cx - 6} 206Z M${cx + 6} 206 C${cx + 8} 212 ${cx + 22} 212 ${cx + 22} 206Z`} fill="#1d1612" />
      {/* face */}
      <path d={`M${cx} 66 C${cx + 14} 66 ${cx + 18} 76 ${cx + 18} 86 C${cx + 18} 100 ${cx + 10} 108 ${cx} 108 C${cx - 10} 108 ${cx - 18} 100 ${cx - 18} 86 C${cx - 18} 76 ${cx - 14} 66 ${cx} 66Z`} fill={SKIN} stroke="#b07a52" strokeWidth=".7" />
      <ellipse cx={cx - 6} cy={80} rx="6" ry="4" fill="#fff" opacity=".22" />
      <path d={`M${cx - 12} 82 C${cx - 9} 79.5 ${cx - 5} 79.5 ${cx - 3} 81.5 M${cx + 3} 81.5 C${cx + 5} 79.5 ${cx + 9} 79.5 ${cx + 12} 82`} stroke="#241208" strokeWidth="1.5" fill="none" />
      <path d={`M${cx - 11} 87.5 C${cx - 8.6} 85.4 ${cx - 5.4} 85.4 ${cx - 3.6} 87.5 M${cx + 3.6} 87.5 C${cx + 5.4} 85.4 ${cx + 8.6} 85.4 ${cx + 11} 87.5`} stroke="#2a150a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <ellipse cx={cx - 11} cy={94} rx="4" ry="2.6" fill="#f0908a" opacity=".4" />
      <ellipse cx={cx + 11} cy={94} rx="4" ry="2.6" fill="#f0908a" opacity=".4" />
      <path d={`M${cx} 87 C${cx - 1.4} 92 ${cx - 1} 94 ${cx + 1.4} 94`} stroke="#b07a52" strokeWidth=".9" fill="none" />
      {/* moustache and goatee */}
      <path d={`M${cx} 97 C${cx - 5} 95 ${cx - 11} 97 ${cx - 15} 102 C${cx - 10} 100 ${cx - 5} 99.6 ${cx} 99.4 C${cx + 5} 99.6 ${cx + 10} 100 ${cx + 15} 102 C${cx + 11} 97 ${cx + 5} 95 ${cx} 97Z`} fill="#1d1612" />
      <path d={`M${cx - 3.5} 101 C${cx - 4} 108 ${cx - 2} 116 ${cx} 121 C${cx + 2} 116 ${cx + 4} 108 ${cx + 3.5} 101Z`} fill="#1d1612" />
      <path d={`M${cx - 4.5} 99.6 C${cx - 2} 101 ${cx + 2} 101 ${cx + 4.5} 99.6`} stroke="#9a2e1e" strokeWidth="1.1" fill="none" />
      {/* jewelled official's hat with upturned wings */}
      <path d={`M${cx - 20} 72 C${cx - 22} 50 ${cx + 22} 50 ${cx + 20} 72Z`} fill="#b3261a" stroke="#6e1109" strokeWidth=".8" />
      <path d={`M${cx - 20} 70 C${cx - 8} 66 ${cx + 8} 66 ${cx + 20} 70 L${cx + 20} 76 C${cx + 8} 72 ${cx - 8} 72 ${cx - 20} 76Z`} fill="url(#ttGold)" stroke="#7a4b08" strokeWidth=".6" />
      {[-14, -7, 0, 7, 14].map((d) => (
        <circle key={d} cx={cx + d} cy={71.5} r={d === 0 ? 2.4 : 1.4} fill={d === 0 ? '#2f9a6a' : '#d8262a'} stroke="#ffe7a0" strokeWidth=".4" />
      ))}
      <path d={`M${cx - 14} 58 C${cx - 6} 52 ${cx + 6} 52 ${cx + 14} 58 L${cx + 12} 64 C${cx + 4} 60 ${cx - 4} 60 ${cx - 12} 64Z`} fill="url(#ttGold)" stroke="#7a4b08" strokeWidth=".5" />
      <circle cx={cx} cy={50} r="3.4" fill="#ffe9a6" stroke="#b8801a" strokeWidth=".6" />
      {[-1, 1].map((d) => (
        <g key={d}>
          <path d={`M${cx + d * 18} 66 C${cx + d * 30} 62 ${cx + d * 36} 54 ${cx + d * 40} 48 C${cx + d * 42} 54 ${cx + d * 38} 60 ${cx + d * 32} 64 C${cx + d * 28} 66 ${cx + d * 22} 68 ${cx + d * 18} 70Z`} fill="url(#ttGold)" stroke="#7a4b08" strokeWidth=".6" />
          <circle cx={cx + d * 39} cy={50} r="2.4" fill="#d8262a" stroke="#ffe7a0" strokeWidth=".4" />
        </g>
      ))}
    </g>
  );
}

/** Altar back: banner and bronze coin. viewBox 0 0 300 210 */
function AltarBack() {
  return (
    <svg viewBox="0 0 300 210" width="300" height="210" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="ttCoin" cx=".45" cy=".4" r=".65">
          <stop offset="0" stopColor="#b08a52" />
          <stop offset=".7" stopColor="#6e5028" />
          <stop offset="1" stopColor="#3e2a12" />
        </radialGradient>
      </defs>
      {/* bronze coin with a square hole and a sun-star pattern */}
      <circle cx="150" cy="116" r="72" fill="url(#ttCoin)" opacity=".85" />
      <circle cx="150" cy="116" r="66" fill="none" stroke="#c8a468" strokeWidth="1.2" opacity=".7" />
      <circle cx="150" cy="116" r="52" fill="none" stroke="#c8a468" strokeWidth=".8" opacity=".55" />
      {Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * Math.PI * 2;
        return <line key={i} x1={150 + Math.cos(a) * 55} y1={116 + Math.sin(a) * 55} x2={150 + Math.cos(a) * 63} y2={116 + Math.sin(a) * 63} stroke="#c8a468" strokeWidth=".8" opacity=".5" />;
      })}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <path key={`s${i}`} d={`M${150 + Math.cos(a) * 20} ${116 + Math.sin(a) * 20} L${150 + Math.cos(a + 0.11) * 46} ${116 + Math.sin(a + 0.11) * 46} L${150 + Math.cos(a + 0.22) * 20} ${116 + Math.sin(a + 0.22) * 20}`} fill="#9a7a44" opacity=".45" />;
      })}
      <rect x="138" y="104" width="24" height="24" fill="#2a1a0a" stroke="#c8a468" strokeWidth="1" />
      {/* banner */}
      <rect x="78" y="8" width="144" height="30" rx="2" fill="#c0281c" stroke="#e8b848" strokeWidth="2" />
      <rect x="82" y="12" width="136" height="22" rx="1" fill="none" stroke="#e8b848" strokeWidth=".7" />
      <rect x="72" y="5" width="6" height="36" rx="2" fill="#7a4b08" />
      <rect x="222" y="5" width="6" height="36" rx="2" fill="#7a4b08" />
      <text x="150" y="28.5" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffe28a" style={{ letterSpacing: '0.04em', fontFamily: 'Georgia, "Times New Roman", serif' }}>
        CHÚC ĐẠI PHÁT ĐẠI LỢI
      </text>
    </svg>
  );
}

/** The two figures on their pedestals. viewBox 0 0 300 230 */
function AltarFigures() {
  return (
    <svg viewBox="0 0 300 230" width="300" height="230" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="ttSkin" cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#ffe6c8" />
          <stop offset=".6" stopColor="#f2c49a" />
          <stop offset="1" stopColor="#d49a6c" />
        </radialGradient>
        <linearGradient id="ttBrown" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5e3612" />
          <stop offset=".45" stopColor="#b07a3a" />
          <stop offset="1" stopColor="#5e3612" />
        </linearGradient>
        <linearGradient id="ttRobe" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b8701a" />
          <stop offset=".45" stopColor="#ffd466" />
          <stop offset=".6" stopColor="#f2b53a" />
          <stop offset="1" stopColor="#b8701a" />
        </linearGradient>
        <linearGradient id="ttGold" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset=".5" stopColor="#e8b040" />
          <stop offset="1" stopColor="#9a620e" />
        </linearGradient>
        <radialGradient id="ttFan" cx=".45" cy=".4" r=".7">
          <stop offset="0" stopColor="#f2dfa8" />
          <stop offset="1" stopColor="#c9a560" />
        </radialGradient>
      </defs>
      {/* pedestals */}
      {[28, 168].map((x) => (
        <g key={x}>
          <rect x={x} y="206" width="104" height="18" fill="#8e1a10" stroke="#e8b848" strokeWidth="1.2" />
          <path d={`M${x + 4} 215 H${x + 100}`} stroke="#e8b848" strokeWidth=".7" strokeDasharray="3 2" />
        </g>
      ))}
      <OngDia />
      <ThanTai />
    </svg>
  );
}

/** Offerings on the altar table. viewBox 0 0 320 80 */
function AltarFront() {
  return (
    <svg viewBox="0 0 320 80" width="320" height="80" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="tfWood" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6b3418" />
          <stop offset="1" stopColor="#2e1408" />
        </linearGradient>
        <linearGradient id="tfBronze" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6e4a12" />
          <stop offset=".45" stopColor="#e8c060" />
          <stop offset="1" stopColor="#6e4a12" />
        </linearGradient>
        <linearGradient id="tfGold2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#c08418" />
        </linearGradient>
      </defs>
      {/* table */}
      <rect x="0" y="58" width="320" height="22" fill="url(#tfWood)" />
      <path d="M0 58 H320" stroke="#a0643a" strokeWidth="1.2" />
      {/* left vase: yellow chrysanthemums */}
      <path d="M14 58 C8 50 10 38 16 34 L16 28 H24 V34 C30 38 32 50 26 58Z" fill="#f5f7fb" stroke="#8a9ab8" strokeWidth=".6" />
      <path d="M13 44 C18 40 22 48 28 44 M12 50 C18 47 22 54 28 50" stroke="#2c4f9a" strokeWidth="1" fill="none" />
      {[
        [10, 6],
        [22, 0],
        [32, 8],
        [16, 14],
        [28, 16],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="20" y1="30" x2={x} y2={y + 6} stroke="#3f7a2a" strokeWidth="1" />
          {Array.from({ length: 10 }, (_, k) => {
            const a = (k / 10) * Math.PI * 2;
            return <ellipse key={k} cx={x + Math.cos(a) * 3.4} cy={y + Math.sin(a) * 3.4} rx="2.4" ry="1.1" transform={`rotate(${(a * 180) / Math.PI} ${x + Math.cos(a) * 3.4} ${y + Math.sin(a) * 3.4})`} fill={i === 3 ? '#b86ac8' : '#f7c526'} />;
          })}
          <circle cx={x} cy={y} r="2" fill={i === 3 ? '#8a3aa0' : '#d8960e'} />
        </g>
      ))}
      {/* fruit plate: coconut, pomelo, bananas, mango */}
      <ellipse cx="66" cy="58" rx="26" ry="4" fill="#f5f2ea" stroke="#b8b0a0" strokeWidth=".6" />
      <circle cx="56" cy="46" r="11" fill="#7cb34a" stroke="#4a7a22" strokeWidth=".6" />
      <circle cx="74" cy="44" r="9.5" fill="#b8d65a" stroke="#6e8a22" strokeWidth=".6" />
      <path d="M62 56 C64 46 76 44 86 50 C78 48 70 50 66 57Z" fill="#f5d02e" stroke="#a88a0a" strokeWidth=".5" />
      <path d="M66 57 C70 49 80 48 88 53 C80 52 72 54 69 58Z" fill="#f0c418" stroke="#a88a0a" strokeWidth=".5" />
      <ellipse cx="80" cy="54" rx="5" ry="4" fill="#e8462e" />
      {/* gold ingots plate */}
      <ellipse cx="112" cy="58" rx="16" ry="3.5" fill="#f5f2ea" stroke="#b8b0a0" strokeWidth=".6" />
      {[
        [104, 52],
        [118, 52],
        [111, 46],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d="M-8 0 C-9 -4.4 -6 -5 -4.4 -3 C-2 -6 2 -6 4.4 -3 C6 -5 9 -4.4 8 0 C6 4.4 -6 4.4 -8 0Z" fill="url(#tfGold2)" stroke="#7a4b08" strokeWidth=".5" />
        </g>
      ))}
      {/* bronze tripod incense burner */}
      <path d="M142 38 C140 50 146 56 160 56 C174 56 180 50 178 38Z" fill="url(#tfBronze)" stroke="#5a3a08" strokeWidth=".7" />
      <path d="M140 38 H180" stroke="#fff0b8" strokeWidth="1.6" />
      <path d="M140 40 C132 36 132 30 138 30 M180 40 C188 36 188 30 182 30" stroke="url(#tfBronze)" strokeWidth="3" fill="none" />
      <path d="M146 54 L143 60 M160 56 V60 M174 54 L177 60" stroke="#6e4a12" strokeWidth="2.4" />
      {[153, 160, 167].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={i === 1 ? 6 : 10} x2={x} y2="38" stroke="#a02a14" strokeWidth="1.3" />
          <circle cx={x} cy={i === 1 ? 5.6 : 9.6} r="1.5" fill="#ff7a2a" />
        </g>
      ))}
      {/* gold treasure pot */}
      <path d="M190 42 C186 52 190 58 206 58 C222 58 226 52 222 42Z" fill="url(#tfGold2)" stroke="#7a4b08" strokeWidth=".7" />
      <path d="M188 42 H224" stroke="#fff0b8" strokeWidth="1.4" />
      {[194, 202, 210].map((x, i) => (
        <rect key={x} x={x} y={34 - (i % 2) * 3} width="9" height="8" rx="1" fill="url(#tfGold2)" stroke="#7a4b08" strokeWidth=".5" />
      ))}
      {/* sticky rice */}
      <ellipse cx="246" cy="58" rx="16" ry="3.5" fill="#f5f2ea" stroke="#b8b0a0" strokeWidth=".6" />
      <path d="M233 57 C234 46 258 46 259 57Z" fill="#f7eec8" stroke="#d8c890" strokeWidth=".6" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={236 + ((i * 7) % 21)} cy={50 + (i % 3) * 2} r=".8" fill="#e8d070" />
      ))}
      {/* paper money */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={264 + i * 2} y={50 - i * 3} width="22" height="11" rx="1" fill={i === 2 ? '#e8d27a' : '#d8e8b8'} stroke="#8a8a5a" strokeWidth=".5" transform={`rotate(${-6 + i * 3} ${275} ${55})`} />
      ))}
      {/* right vase: orchids */}
      <path d="M294 58 C288 50 290 38 296 34 L296 28 H304 V34 C310 38 312 50 306 58Z" fill="#f5f7fb" stroke="#8a9ab8" strokeWidth=".6" />
      <path d="M293 44 C298 40 302 48 308 44" stroke="#2c4f9a" strokeWidth="1" fill="none" />
      <path d="M300 30 C298 20 302 10 310 4 M300 30 C304 22 312 18 316 18" stroke="#4a7a2a" strokeWidth="1" fill="none" />
      {[
        [302, 18],
        [307, 9],
        [312, 4],
        [312, 19],
        [297, 24],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <ellipse rx="3.4" ry="2" fill="#c864b8" />
          <ellipse rx="2" ry="3.4" fill="#e08ad4" />
          <circle r="1" fill="#f7e05a" />
        </g>
      ))}
    </svg>
  );
}

export function ThanTaiAltar() {
  const { tiltRef, wrapRef } = useTilt(16);
  return (
    <Box ref={wrapRef} sx={{ position: 'relative', width: 320, height: 330, perspective: '760px' }} aria-hidden="true">
      <Box sx={{ position: 'absolute', left: '50%', top: 30, width: 320, height: 280, ml: '-160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,205,90,.42) 0%, rgba(255,180,60,.12) 45%, rgba(255,180,60,0) 70%)', animation: `${breathe} 5s ease-in-out infinite` }} />
      <Box ref={tiltRef} sx={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: 'rotateX(6deg)' }}>
        <Layer z={-40} sx={{ left: 10, top: 0 }}>
          <AltarBack />
        </Layer>
        <Layer z={0} sx={{ left: 10, top: 18 }}>
          <AltarFigures />
        </Layer>
        <Layer z={32} sx={{ left: 0, top: 240 }}>
          <Box sx={{ position: 'relative' }}>
            <AltarFront />
            <Smoke x={160} bottom={78} />
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
