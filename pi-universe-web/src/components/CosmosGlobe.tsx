/**
 * 3D "cosmos" home view: sanctuaries float on a slowly turning sphere around a glowing
 * π planet, over a twinkling starfield. Drag (or swipe) to spin, tap a sanctuary to enter.
 *
 * No 3D library: points are spread evenly on a sphere (Fibonacci lattice), rotated and
 * projected with simple perspective math every animation frame. Works for any number of
 * sanctuaries. Respects "reduce motion" (no auto-spin, no shooting stars).
 */

import { useEffect, useMemo, useRef } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { Sanctuary } from '../types';
import { Lang } from '../i18n/i18n';
import { sanctuaryName } from '../i18n/sanctuaries';

interface Props {
  sanctuaries: Sanctuary[];
  lang: Lang;
  onSelect: (s: Sanctuary) => void;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const AUTO_SPIN = 0.18; // radians per second
const TAP_SLOP = 8; // px of movement still treated as a tap

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 40px 8px rgba(157,107,255,.55), inset -18px -22px 40px rgba(20,0,50,.65); }
  50% { box-shadow: 0 0 70px 18px rgba(157,107,255,.75), inset -18px -22px 40px rgba(20,0,50,.65); }
`;
const sheen = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

function hexToRgb(hex?: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '232,193,112';
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export default function CosmosGlobe({ sanctuaries, lang, onSelect }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef({ yaw: 0.6, pitch: -0.25, vYaw: 0, vPitch: 0, dragging: false, lastX: 0, lastY: 0, moved: 0, idleUntil: 0 });

  // Even spread of the sanctuaries on a unit sphere
  const points = useMemo(
    () =>
      sanctuaries.map((_, i) => {
        const n = sanctuaries.length;
        const y = 1 - (2 * (i + 0.5)) / n;
        const r = Math.sqrt(1 - y * y);
        const t = i * GOLDEN_ANGLE;
        return { x: Math.cos(t) * r, y: y * 0.85, z: Math.sin(t) * r };
      }),
    [sanctuaries]
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Starfield
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];
    let meteor: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      stars = Array.from({ length: Math.round((w * h) / 2600) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        p: Math.random() * Math.PI * 2,
        s: 0.6 + Math.random() * 1.8,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const st = state.current;

      // Spin: drag inertia, then gentle auto-rotation
      if (!st.dragging) {
        st.yaw += st.vYaw * dt;
        st.pitch += st.vPitch * dt;
        st.vYaw *= Math.pow(0.08, dt);
        st.vPitch *= Math.pow(0.08, dt);
        if (!reduceMotion && now > st.idleUntil) st.yaw += AUTO_SPIN * dt;
        st.pitch += (-0.25 - st.pitch) * Math.min(1, dt * 0.8); // ease back to a slight tilt
      }
      st.pitch = Math.max(-1.1, Math.min(1.1, st.pitch));

      // Stars
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          const a = reduceMotion ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(now / 1000 * s.s + s.p));
          ctx.globalAlpha = a;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (!reduceMotion) {
          if (!meteor && Math.random() < dt * 0.12) {
            meteor = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.3, vx: 420, vy: 160, life: 1 };
          }
          if (meteor) {
            meteor.x += meteor.vx * dt;
            meteor.y += meteor.vy * dt;
            meteor.life -= dt * 1.2;
            const g = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - 70, meteor.y - 27);
            g.addColorStop(0, `rgba(255,240,200,${Math.max(0, meteor.life)})`);
            g.addColorStop(1, 'rgba(255,240,200,0)');
            ctx.globalAlpha = 1;
            ctx.strokeStyle = g;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(meteor.x - 70, meteor.y - 27);
            ctx.stroke();
            if (meteor.life <= 0 || meteor.x > w + 80) meteor = null;
          }
        }
        ctx.globalAlpha = 1;
      }

      // Sanctuaries on the sphere
      const R = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h / 2;
      const cyaw = Math.cos(st.yaw), syaw = Math.sin(st.yaw);
      const cp = Math.cos(st.pitch), sp = Math.sin(st.pitch);
      points.forEach((p, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const x1 = p.x * cyaw + p.z * syaw;
        const z1 = -p.x * syaw + p.z * cyaw;
        const y2 = p.y * cp - z1 * sp;
        const z2 = p.y * sp + z1 * cp; // +1 = facing the viewer
        const scale = 3 / (3 - z2);
        const sx = cx + x1 * R * scale;
        const sy = cy + y2 * R * scale;
        const front = (z2 + 1) / 2; // 0 back … 1 front
        const behindPlanet = z2 < 0 && Math.hypot(sx - cx, sy - cy) < R * 0.5;
        el.style.transform = `translate(-50%, -50%) translate(${sx}px, ${sy}px) scale(${0.62 + 0.5 * front})`;
        el.style.opacity = String(behindPlanet ? 0.18 : 0.35 + 0.65 * front);
        el.style.zIndex = String(z2 > 0 ? 20 + Math.round(front * 10) : 1 + Math.round(front * 5));
        el.style.filter = front < 0.35 ? 'blur(0.6px)' : 'none';
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [points]);

  // Drag / swipe to spin
  const onPointerDown = (e: React.PointerEvent) => {
    const st = state.current;
    st.dragging = true;
    st.lastX = e.clientX;
    st.lastY = e.clientY;
    st.moved = 0;
    st.vYaw = 0;
    st.vPitch = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const st = state.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    const dy = e.clientY - st.lastY;
    st.lastX = e.clientX;
    st.lastY = e.clientY;
    st.moved += Math.abs(dx) + Math.abs(dy);
    st.yaw += dx * 0.008;
    st.pitch += dy * 0.006;
    st.vYaw = dx * 0.5;
    st.vPitch = dy * 0.35;
  };
  const endDrag = (e: React.PointerEvent) => {
    const st = state.current;
    if (!st.dragging) return;
    st.dragging = false;
    st.idleUntil = performance.now() + 3000;
    // A tap (not a drag) on a sanctuary opens it
    if (st.moved < TAP_SLOP) {
      const hit = (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null)?.closest('[data-sanctuary]');
      const idx = hit ? Number(hit.getAttribute('data-sanctuary')) : -1;
      if (idx >= 0 && sanctuaries[idx]) onSelect(sanctuaries[idx]);
    }
  };

  const planet = 'min(34vw, 150px)';

  return (
    <Box
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      sx={{
        position: 'relative',
        height: { xs: 440, sm: 520 },
        borderRadius: 3,
        overflow: 'hidden',
        mb: 2,
        touchAction: 'pan-y',
        userSelect: 'none',
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
        background:
          'radial-gradient(ellipse at 20% 15%, rgba(120,60,200,.35), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(40,90,200,.3), transparent 55%), linear-gradient(180deg, #0B0620 0%, #170B35 60%, #0B0620 100%)',
        boxShadow: '0 6px 24px rgba(20,0,60,.35)',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Central π planet with rings */}
      <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none' }}>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `calc(${planet} * 2.1)`,
            height: `calc(${planet} * 0.62)`,
            transform: 'translate(-50%, -50%) rotate(-18deg)',
            border: '2px solid rgba(244,193,82,.7)',
            borderRadius: '50%',
            boxShadow: '0 0 18px rgba(244,193,82,.45)',
          }}
        />
        <Box
          sx={{
            width: planet,
            height: planet,
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 35% 30%, #B98CFF 0%, #7A3FD0 38%, #45198A 70%, #230A4D 100%)',
            animation: `${pulse} 6s ease-in-out infinite`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: '-20%',
              background: 'conic-gradient(from 0deg, transparent 0 20%, rgba(255,255,255,.10) 25%, transparent 32% 70%, rgba(255,255,255,.07) 76%, transparent 82%)',
              animation: `${sheen} 30s linear infinite`,
            }}
          />
          <Typography
            sx={{
              position: 'relative',
              color: '#fff',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              fontSize: `calc(${planet} * 0.55)`,
              lineHeight: 1,
              textShadow: '0 0 18px rgba(255,255,255,.6)',
            }}
          >
            π
          </Typography>
        </Box>
      </Box>

      {/* Sanctuary "satellites" */}
      {sanctuaries.map((s, i) => {
        const rgb = hexToRgb(s.color && s.color !== '#FFFFFF' ? s.color : '#E8C170');
        return (
          <Box
            key={s.id}
            ref={(el: HTMLDivElement | null) => {
              nodeRefs.current[i] = el;
            }}
            data-sanctuary={i}
            role="button"
            tabIndex={0}
            aria-label={sanctuaryName(s, lang)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(s)}
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 112,
              cursor: 'pointer',
              willChange: 'transform, opacity',
              '&:focus-visible': { outline: '2px solid #F4C152', outlineOffset: 4, borderRadius: 2 },
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.9), rgba(${rgb},.85) 45%, rgba(${rgb},.35) 100%)`,
                boxShadow: `0 0 22px 6px rgba(${rgb},.55)`,
                border: '2px solid rgba(255,255,255,.7)',
              }}
            >
              {s.icon}
            </Box>
            <Typography
              sx={{
                mt: 0.6,
                px: 1,
                py: 0.2,
                borderRadius: 1.5,
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#fff',
                textAlign: 'center',
                lineHeight: 1.25,
                backgroundColor: 'rgba(10,4,30,.55)',
                textShadow: '0 1px 4px rgba(0,0,0,.8)',
              }}
            >
              {sanctuaryName(s, lang)}
            </Typography>
          </Box>
        );
      })}

      <Typography
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: 'rgba(255,255,255,.8)',
          fontSize: '0.95rem',
          zIndex: 40,
          pointerEvents: 'none',
        }}
      >
        {lang === 'en' ? 'Drag to spin · tap a sanctuary to enter' : '拖動旋轉星球・點選聖地進入參拜'}
      </Typography>
    </Box>
  );
}
