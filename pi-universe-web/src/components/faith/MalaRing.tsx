/**
 * A 3D prayer-bead ring (mala / tasbih) used as the tap counter.
 *
 * The beads lie on a ring seen from slightly above, drawn in perspective (nearer beads are
 * bigger and brighter). Each tap slides the whole ring along by one bead, so the next bead
 * comes round to the front — like passing a bead through your fingers. Beads already
 * counted in this round turn gold; finishing a round makes the whole ring glow.
 * The larger "guru" bead with its tassel marks where a round starts.
 */

import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export interface MalaColors {
  /** Beads not yet counted in this round: [light, dark] */
  bead: [string, string];
  /** Beads already counted: [light, dark] */
  done: [string, string];
  /** Guru bead and tassel */
  guru: string;
}

export const MALA_COLORS: Record<string, MalaColors> = {
  buddhist: { bead: ['#c89060', '#5e3312'], done: ['#ffe39a', '#b07818'], guru: '#b3261e' },
  hindu: { bead: ['#a0603a', '#3e1d0c'], done: ['#ffe39a', '#b07818'], guru: '#d8521c' },
  islamic: { bead: ['#5fae8c', '#1c4a36'], done: ['#ffe39a', '#b07818'], guru: '#1c4a36' },
};

const TWO_PI = Math.PI * 2;

export function MalaRing({
  value,
  beads,
  onTap,
  label,
  sublabel,
  ariaLabel,
  colors = MALA_COLORS.buddhist,
}: {
  /** Total taps so far (keeps increasing — the ring position follows it) */
  value: number;
  /** Beads in one round (108, 33…) */
  beads: number;
  onTap: () => void;
  /** Big text in the middle of the ring (usually the count in this round) */
  label: string | number;
  sublabel?: string;
  ariaLabel: string;
  colors?: MalaColors;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const state = useRef({ pos: value, flashUntil: 0, raf: 0, last: 0, draw: () => {} });
  const prev = useRef(value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const st = state.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const n = beads;
      const cx = w / 2;
      const cy = h * 0.44;
      const R = Math.min(w * 0.42, h * 0.62);
      const elev = 0.62; // how far we look down on the ring (radians)
      const sinE = Math.sin(elev);
      const cosE = Math.cos(elev);
      const f = R * 4.2; // perspective strength
      const baseR = Math.max(3.4, Math.min(13, ((Math.PI * R) / n) * 0.98));
      const now = performance.now();
      const flash = now < st.flashUntil ? (st.flashUntil - now) / 1400 : 0;
      const doneCount = ((value % n) + n) % n;
      const rot = -(st.pos / n) * TWO_PI;

      const project = (theta: number) => {
        const a = theta + rot;
        const x = R * Math.sin(a);
        const z = R * Math.cos(a); // + = toward the viewer
        const depth = z * cosE;
        const s = f / (f - depth);
        return { x: cx + x * s, y: cy + z * sinE * s, s, depth, front: Math.cos(a) };
      };

      // The thread
      ctx.save();
      ctx.beginPath();
      for (let k = 0; k <= 96; k++) {
        const p = project((k / 96) * TWO_PI);
        if (k === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(120,70,30,.45)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();

      // Soft glow when a round is completed
      if (flash > 0) {
        const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.3);
        g.addColorStop(0, `rgba(255,215,110,${0.45 * flash})`);
        g.addColorStop(1, 'rgba(255,215,110,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      type Item = { depth: number; paint: () => void };
      const items: Item[] = [];

      const bead = (theta: number, r: number, light: string, dark: string, glow: number) => {
        const p = project(theta);
        items.push({
          depth: p.depth,
          paint: () => {
            const rr = r * p.s;
            const shade = 0.55 + 0.45 * ((p.front + 1) / 2); // far beads a little darker
            if (glow > 0) {
              ctx.save();
              ctx.shadowColor = `rgba(255,200,80,${glow})`;
              ctx.shadowBlur = rr * 3;
            }
            const g = ctx.createRadialGradient(p.x - rr * 0.35, p.y - rr * 0.4, rr * 0.1, p.x, p.y, rr);
            g.addColorStop(0, light);
            g.addColorStop(1, dark);
            ctx.globalAlpha = shade;
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, rr, 0, TWO_PI);
            ctx.fill();
            ctx.globalAlpha = 1;
            if (glow > 0) ctx.restore();
            // highlight
            ctx.fillStyle = `rgba(255,255,255,${0.35 * shade})`;
            ctx.beginPath();
            ctx.arc(p.x - rr * 0.35, p.y - rr * 0.4, rr * 0.28, 0, TWO_PI);
            ctx.fill();
          },
        });
      };

      for (let i = 0; i < n; i++) {
        const theta = (i / n) * TWO_PI;
        const counted = i < doneCount || flash > 0;
        const isCurrent = i === doneCount && flash === 0;
        const [light, dark] = counted ? colors.done : colors.bead;
        // The bead being "pulled" sits a little larger at the front
        bead(theta, baseR * (isCurrent ? 1.55 : 1), light, dark, isCurrent ? 0.9 : counted ? 0.25 : 0);
      }

      // Guru bead + tassel between the last and the first bead
      const gTheta = -0.5 / n * TWO_PI;
      const gp = project(gTheta);
      items.push({
        depth: gp.depth + 0.01,
        paint: () => {
          const rr = Math.max(baseR * 1.35, 7) * gp.s;
          const len = rr * 2.2;
          ctx.strokeStyle = colors.guru;
          ctx.lineCap = 'round';
          for (let k = -3; k <= 3; k++) {
            ctx.lineWidth = Math.max(1, rr * 0.18);
            ctx.beginPath();
            ctx.moveTo(gp.x, gp.y + rr * 0.8);
            ctx.lineTo(gp.x + k * rr * 0.16, gp.y + rr * 0.8 + len);
            ctx.stroke();
          }
          const g = ctx.createRadialGradient(gp.x - rr * 0.3, gp.y - rr * 0.35, rr * 0.1, gp.x, gp.y, rr);
          g.addColorStop(0, '#ffe7a8');
          g.addColorStop(1, colors.guru);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(gp.x, gp.y, rr, 0, TWO_PI);
          ctx.fill();
        },
      });

      items.sort((a, b) => a.depth - b.depth).forEach((it) => it.paint());
    };
    st.draw = draw;

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - (st.last || t)) / 1000);
      st.last = t;
      const diff = value - st.pos;
      st.pos = Math.abs(diff) < 0.002 ? value : st.pos + diff * Math.min(1, dt * 9);
      draw();
      if (st.pos !== value || performance.now() < st.flashUntil) st.raf = requestAnimationFrame(frame);
      else st.raf = 0;
    };

    // A new tap: start the slide (and the glow at the end of a round)
    if (value !== prev.current) {
      if (value > prev.current && value % beads === 0) st.flashUntil = performance.now() + 1400;
      if (value < prev.current || Math.abs(value - prev.current) > beads) st.pos = value; // reset / jump
      prev.current = value;
    }
    if (reduce) {
      st.pos = value;
      draw();
    } else if (!st.raf) {
      st.last = 0;
      st.raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
  }, [value, beads, colors]);

  return (
    <Box
      component="button"
      onClick={onTap}
      aria-label={ariaLabel}
      sx={{
        position: 'relative',
        display: 'block',
        width: '100%',
        maxWidth: 340,
        mx: 'auto',
        p: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        // Fast taps count as double-clicks; don't let them select the number as text
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        '&:focus-visible': { outline: '3px solid #5B2A93', outlineOffset: 4, borderRadius: 3 },
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', aspectRatio: '1 / 0.9' }} aria-hidden="true" />
      <Box sx={{ position: 'absolute', left: 0, right: 0, top: '44%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <Typography sx={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1, color: '#3A2206' }}>{label}</Typography>
        {sublabel && <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#6b4410', mt: 0.3 }}>{sublabel}</Typography>}
      </Box>
    </Box>
  );
}
