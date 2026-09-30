/**
 * The 3D hall at the top of a sanctuary page, with the welcome text over it and a
 * speaker button for the (optional, off by default) ambient sound.
 */
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { sceneFor } from './sceneConfig';
import { Camera, Particle, renderScene, spawnParticle, stepParticles } from './renderScene';
import { AmbientHandle, startAmbient } from './ambient';

export function SanctuaryScene({
  religionType,
  children,
  altar,
  soundOnLabel,
  soundOffLabel,
}: {
  religionType: string;
  children?: ReactNode;
  /** A statue shown at the far end of the hall (only some sanctuaries have one) */
  altar?: ReactNode;
  soundOnLabel: string;
  soundOffLabel: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const ambient = useRef<AmbientHandle | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cfg = sceneFor(religionType);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const cam: Camera = { z: 0, x: 0, y: 0, t: 0 };
    const ps: Particle[] = Array.from({ length: cfg.particles.count }, () => spawnParticle(cfg, cam, true));
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) renderScene(ctx, w, h, cfg, cam, ps);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      cam.t += dt;
      cam.z += cfg.speed * dt;
      cam.x += (target.current.x * 0.9 + Math.sin(cam.t * 0.25) * 0.08 - cam.x) * Math.min(1, dt * 2.5);
      cam.y += (target.current.y * 0.45 - cam.y) * Math.min(1, dt * 2.5);
      stepParticles(ps, cfg, cam, dt);
      if (w > 0 && h > 0) renderScene(ctx, w, h, cfg, cam, ps);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
      else raf = 0;
    };
    const kick = () => {
      if (!raf && visible && !document.hidden && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      kick();
    });
    io.observe(wrap);
    document.addEventListener('visibilitychange', kick);
    if (reduce) renderScene(ctx, w, h, cfg, cam, ps);
    else kick();

    // Tilt the phone to look around (where the browser allows it without asking)
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target.current = { x: Math.max(-1, Math.min(1, e.gamma / 30)), y: Math.max(-1, Math.min(1, (e.beta - 45) / 40)) };
    };
    window.addEventListener('deviceorientation', onTilt);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', kick);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, [religionType]);

  // Stop the sound when leaving the page
  useEffect(() => () => ambient.current?.stop(), []);

  const toggleSound = () => {
    if (soundOn) {
      ambient.current?.stop();
      ambient.current = null;
      setSoundOn(false);
    } else {
      ambient.current = startAmbient(sceneFor(religionType).ambient);
      setSoundOn(!!ambient.current);
    }
  };

  const onPointer = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    target.current = { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: -(((e.clientY - r.top) / r.height) * 2 - 1) };
  };

  return (
    <Box
      ref={wrapRef}
      data-scene=""
      onPointerMove={onPointer}
      onPointerLeave={() => (target.current = { x: 0, y: 0 })}
      sx={{
        position: 'relative',
        height: altar ? { xs: 500, sm: 540 } : { xs: 360, sm: 420 },
        borderRadius: 2,
        overflow: 'hidden',
        mb: 2,
        backgroundColor: '#120804',
        boxShadow: '0 6px 24px rgba(0,0,0,.35)',
        touchAction: 'pan-y',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} aria-hidden="true" />
      {altar && (
        <Box sx={{ position: 'absolute', left: 0, right: 0, top: { xs: 14, sm: 18 }, display: 'flex', justifyContent: 'center' }}>{altar}</Box>
      )}
      <Tooltip title={soundOn ? soundOffLabel : soundOnLabel}>
        <IconButton
          onClick={toggleSound}
          aria-label={soundOn ? soundOffLabel : soundOnLabel}
          aria-pressed={soundOn}
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,.35)',
            border: '1px solid rgba(255,255,255,.35)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,.5)' },
          }}
        >
          {soundOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Tooltip>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          px: { xs: 2, sm: 3 },
          pt: 6,
          pb: { xs: 2, sm: 2.5 },
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 45%, rgba(0,0,0,.75) 100%)',
          textShadow: '0 2px 8px rgba(0,0,0,.6)',
          pointerEvents: 'none',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
