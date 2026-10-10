/**
 * Draws a sanctuary's hall on a 2D canvas with simple perspective math (the same idea as
 * the home-page globe — no 3D library). The camera walks slowly down an endless hall of
 * repeated pillars / arches / gates toward a light at the far end; dragging or tilting
 * the phone moves the camera a little for depth.
 */
import { SceneConfig } from './sceneConfig';

export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  seed: number;
  age: number;
}

export interface Camera {
  z: number;
  x: number;
  y: number;
  t: number;
}

const HALF_W = 2.6; // half width of the hall
const HEIGHT = 4.4; // ceiling
const EYE = 1.5; // eye height
const NEAR = 0.9;
const FAR = 26;

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export function spawnParticle(cfg: SceneConfig, cam: Camera, anywhere: boolean): Particle {
  const k = cfg.particles.kind;
  const z = cam.z + (anywhere ? rnd(1.5, 14) : rnd(9, 15));
  const x = rnd(-HALF_W * 0.95, HALF_W * 0.95);
  const falling = k === 'petals' || k === 'leaves';
  const rising = k === 'smoke' || k === 'embers';
  const y = falling ? (anywhere ? rnd(0.2, HEIGHT) : HEIGHT + rnd(0, 0.6)) : rising ? (anywhere ? rnd(0, 3) : rnd(0, 0.6)) : rnd(0.2, HEIGHT * 0.9);
  return {
    x,
    y,
    z,
    vx: rnd(-0.05, 0.05),
    vy: falling ? rnd(-0.28, -0.14) : k === 'smoke' ? rnd(0.12, 0.22) : k === 'embers' ? rnd(0.2, 0.45) : rnd(-0.03, 0.03),
    vz: rnd(-0.04, 0.04),
    size: k === 'smoke' ? rnd(0.18, 0.3) : k === 'petals' || k === 'leaves' ? rnd(0.05, 0.08) : rnd(0.015, 0.035),
    seed: Math.random() * 1000,
    age: anywhere ? rnd(0, 8) : 0,
  };
}

export function stepParticles(ps: Particle[], cfg: SceneConfig, cam: Camera, dt: number) {
  const k = cfg.particles.kind;
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    p.age += dt;
    const sway = Math.sin(cam.t * 0.9 + p.seed) * (k === 'petals' || k === 'leaves' ? 0.25 : k === 'smoke' ? 0.08 : 0.03);
    p.x += (p.vx + sway) * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;
    if (k === 'smoke') p.size += dt * 0.05;
    const dz = p.z - cam.z;
    const gone = dz < NEAR + 0.2 || p.y > HEIGHT + 0.8 || p.y < -0.1 || (k === 'smoke' && p.age > 14) || (k === 'embers' && p.age > 6);
    if (gone) ps[i] = spawnParticle(cfg, cam, false);
  }
}

export function renderScene(ctx: CanvasRenderingContext2D, w: number, h: number, cfg: SceneConfig, cam: Camera, ps: Particle[]) {
  const f = Math.max(h * 0.95, w * 0.55);
  const cx = w / 2;
  const cy = h * 0.36;
  const camX = cam.x;
  const camY = EYE + cam.y;

  const P = (x: number, y: number, z: number) => {
    const dz = z - cam.z;
    const s = f / dz;
    return { x: cx + (x - camX) * s, y: cy - (y - camY) * s, s };
  };
  const zn = cam.z + NEAR;
  const zf = cam.z + FAR;
  const hasHall = !cfg.torii;

  // --- sky / back wall
  const sky = ctx.createLinearGradient(0, 0, 0, cy);
  sky.addColorStop(0, cfg.sky[0]);
  sky.addColorStop(1, cfg.sky[1]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // --- the light at the end of the hall
  const vp = P(0, EYE + 0.4, zf);
  const glow = ctx.createRadialGradient(vp.x, vp.y, 0, vp.x, vp.y, h * 0.75);
  glow.addColorStop(0, `rgba(${cfg.glow},0.85)`);
  glow.addColorStop(0.12, `rgba(${cfg.glow},0.35)`);
  glow.addColorStop(0.5, `rgba(${cfg.glow},0.08)`);
  glow.addColorStop(1, `rgba(${cfg.glow},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // --- floor
  const floorTop = P(0, 0, zf).y;
  const floor = ctx.createLinearGradient(0, floorTop, 0, h);
  floor.addColorStop(0, cfg.floor[1]);
  floor.addColorStop(1, cfg.floor[0]);
  ctx.fillStyle = floor;
  ctx.fillRect(0, floorTop, w, h - floorTop);

  // light pooling on the floor down the middle
  const pool = ctx.createRadialGradient(vp.x, h, 0, vp.x, h, h * 0.9);
  pool.addColorStop(0, `rgba(${cfg.glow},0.12)`);
  pool.addColorStop(1, `rgba(${cfg.glow},0)`);
  ctx.fillStyle = pool;
  ctx.fillRect(0, floorTop, w, h - floorTop);

  // --- walls and ceiling
  if (hasHall) {
    const quad = (a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }, d: { x: number; y: number }, fill: string | CanvasGradient) => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.lineTo(d.x, d.y);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    };
    ctx.globalAlpha = 0.92;
    for (const side of [-1, 1]) {
      const g = ctx.createLinearGradient(P(side * HALF_W, 0, zn).x, 0, vp.x, 0);
      g.addColorStop(0, cfg.wall);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      quad(P(side * HALF_W, 0, zn), P(side * HALF_W, HEIGHT, zn), P(side * HALF_W, HEIGHT, zf), P(side * HALF_W, 0, zf), g);
    }
    const cg = ctx.createLinearGradient(0, 0, 0, vp.y);
    cg.addColorStop(0, cfg.wall);
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    quad(P(-HALF_W, HEIGHT, zn), P(HALF_W, HEIGHT, zn), P(HALF_W, HEIGHT, zf), P(-HALF_W, HEIGHT, zf), cg);
    ctx.globalAlpha = 1;
  }

  // --- floor grid (the transverse lines move as we walk)
  ctx.lineWidth = 1;
  ctx.strokeStyle = cfg.grid;
  for (let i = -3; i <= 3; i++) {
    const x = (i / 3) * HALF_W;
    const a = P(x, 0, zn);
    const b = P(x, 0, zf);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  for (let z = Math.ceil(zn); z < zf; z += 1) {
    const a = P(-HALF_W, 0, z);
    const b = P(HALF_W, 0, z);
    ctx.globalAlpha = Math.max(0, 1 - (z - cam.z) / FAR);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // --- the far landmark (a one-off silhouette shaped after this religion's own architecture)
  drawLandmark(ctx, P, cfg, cam.z);

  // --- repeated elements, far to near
  const sp = cfg.spacing;
  const first = Math.floor(zn / sp);
  const last = Math.floor(zf / sp);
  for (let k = last; k >= first; k--) {
    const z = k * sp;
    const dz = z - cam.z;
    if (dz < NEAR || dz > FAR) continue;
    const fade = Math.min(1, (1 - dz / FAR) * 1.35);
    ctx.globalAlpha = fade;
    if (cfg.torii) drawTorii(ctx, P, z, cfg);
    else drawBay(ctx, P, z, cfg, cam.t + k * 1.7);
  }
  ctx.globalAlpha = 1;

  // --- light shafts from high windows
  if (cfg.shafts) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    cfg.shafts.forEach((c, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const zTop = cam.z + 4 + i * 3.3 - ((cam.z * 0.2) % 3.3);
      const top1 = P(side * HALF_W, HEIGHT * 0.95, zTop);
      const top2 = P(side * HALF_W, HEIGHT * 0.95, zTop + 1.1);
      const bot1 = P(-side * HALF_W * 0.2, 0, zTop + 1.5);
      const bot2 = P(-side * HALF_W * 0.2, 0, zTop + 2.8);
      const g = ctx.createLinearGradient(top1.x, top1.y, bot1.x, bot1.y);
      const a = 0.07 + 0.03 * Math.sin(cam.t * 0.4 + i);
      g.addColorStop(0, `rgba(${c},${a})`);
      g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(top1.x, top1.y);
      ctx.lineTo(top2.x, top2.y);
      ctx.lineTo(bot2.x, bot2.y);
      ctx.lineTo(bot1.x, bot1.y);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
  }

  // --- particles
  drawParticles(ctx, P, ps, cfg, cam);

  // --- vignette
  const v = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, h);
}

type Proj = (x: number, y: number, z: number) => { x: number; y: number; s: number };

function drawBay(ctx: CanvasRenderingContext2D, P: Proj, z: number, cfg: SceneConfig, t: number) {
  const pil = cfg.pillar;
  const spring = cfg.arch ? HEIGHT * 0.7 : HEIGHT;
  const pw = pil ? pil.width : 0.3;

  // pillars
  if (pil) {
    for (const side of [-1, 1]) {
      const x = side * (HALF_W - pw / 2 - 0.05);
      const bl = P(x - pw / 2, 0, z);
      const br = P(x + pw / 2, 0, z);
      const topW = pil.taper ? pw * 0.55 : pw;
      const tl = P(x - topW / 2, spring, z);
      const tr = P(x + topW / 2, spring, z);
      const g = ctx.createLinearGradient(bl.x, 0, br.x, 0);
      g.addColorStop(0, pil.shade);
      g.addColorStop(0.45, pil.color);
      g.addColorStop(1, pil.shade);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(bl.x, bl.y);
      ctx.lineTo(tl.x, tl.y);
      ctx.lineTo(tr.x, tr.y);
      ctx.lineTo(br.x, br.y);
      ctx.closePath();
      ctx.fill();
      if (pil.cap) {
        ctx.fillStyle = pil.cap;
        const c1 = P(x - pw * 0.62, spring, z);
        const c2 = P(x + pw * 0.62, spring - 0.22, z);
        ctx.fillRect(c1.x, c1.y, c2.x - c1.x, c2.y - c1.y);
        const b1 = P(x - pw * 0.62, 0.22, z);
        const b2 = P(x + pw * 0.62, 0, z);
        ctx.fillRect(b1.x, b1.y, b2.x - b1.x, b2.y - b1.y);
        if (pil.taper) {
          // a small spire on top (Thai style)
          const a = P(x, spring + 0.9, z);
          const l = P(x - pw * 0.4, spring, z);
          const r = P(x + pw * 0.4, spring, z);
          ctx.beginPath();
          ctx.moveTo(l.x, l.y);
          ctx.lineTo(a.x, a.y);
          ctx.lineTo(r.x, r.y);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  }

  // cross beam (temples)
  if (cfg.beam) {
    const a = P(-HALF_W, HEIGHT - 0.05, z);
    const b = P(HALF_W, HEIGHT - 0.35, z);
    ctx.fillStyle = cfg.beam;
    ctx.fillRect(a.x, a.y, b.x - a.x, b.y - a.y);
    if (pil?.cap) {
      ctx.fillStyle = pil.cap;
      const c = P(-HALF_W, HEIGHT - 0.3, z);
      const d = P(HALF_W, HEIGHT - 0.35, z);
      ctx.fillRect(c.x, c.y, d.x - c.x, Math.max(1, d.y - c.y));
    }
    // roofline silhouette above the beam — this is what tells the "temple trio" apart at a
    // glance, since they otherwise share the same pillars-and-beam bay shape.
    const style = cfg.beamStyle;
    if (style && style !== 'flat') {
      const tipRise = style === 'swallowtail' ? 0.48 : style === 'upturned' ? 0.3 : 0.16;
      const midRise = style === 'swallowtail' ? 0.62 : style === 'upturned' ? 0.35 : 0.2;
      const baseL = P(-HALF_W, HEIGHT - 0.05, z);
      const baseR = P(HALF_W, HEIGHT - 0.05, z);
      const leftTip = P(-HALF_W * 0.92, HEIGHT + tipRise, z);
      const rightTip = P(HALF_W * 0.92, HEIGHT + tipRise, z);
      const mid = P(0, HEIGHT + midRise, z);
      const belowL = P(-HALF_W, HEIGHT - 0.05 + 0.3, z);
      const belowR = P(HALF_W, HEIGHT - 0.05 + 0.3, z);
      const capColor = pil?.cap || cfg.beam;
      ctx.beginPath();
      ctx.moveTo(baseL.x, baseL.y);
      ctx.quadraticCurveTo(leftTip.x, leftTip.y, mid.x, mid.y);
      ctx.quadraticCurveTo(rightTip.x, rightTip.y, baseR.x, baseR.y);
      ctx.lineTo(belowR.x, belowR.y);
      ctx.lineTo(belowL.x, belowL.y);
      ctx.closePath();
      ctx.fillStyle = capColor;
      ctx.fill();
      if (style === 'swallowtail') {
        // twin ridge spikes near the centre, typical of Minnan-style roofs
        for (const side of [-1, 1]) {
          const spikeBase = P(side * 0.32, HEIGHT + midRise - 0.05, z);
          const spikeTip = P(side * 0.32, HEIGHT + midRise + 0.3, z);
          ctx.beginPath();
          ctx.moveTo(spikeBase.x - 3, spikeBase.y);
          ctx.lineTo(spikeTip.x, spikeTip.y);
          ctx.lineTo(spikeBase.x + 3, spikeBase.y);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  }

  // arch across the nave
  if (cfg.arch) {
    const R = HALF_W - pw - 0.05;
    const c = P(0, spring, z);
    const r = R * c.s;
    ctx.strokeStyle = cfg.arch.color;
    ctx.lineWidth = Math.max(1, cfg.arch.width * c.s);
    ctx.beginPath();
    if (cfg.arch.style === 'round') {
      ctx.arc(c.x, c.y, r, Math.PI, 0);
    } else if (cfg.arch.style === 'horseshoe') {
      ctx.arc(c.x, c.y - r * 0.12, r * 1.04, Math.PI * 0.92, Math.PI * 0.08);
    } else {
      // pointed (Gothic): two arcs meeting at the top
      const apex = P(0, spring + R * 1.35, z);
      ctx.moveTo(c.x - r, c.y);
      ctx.quadraticCurveTo(c.x - r, apex.y + (c.y - apex.y) * 0.1, apex.x, apex.y);
      ctx.quadraticCurveTo(c.x + r, apex.y + (c.y - apex.y) * 0.1, c.x + r, c.y);
    }
    ctx.stroke();
  }

  // garlands of flowers across the hall
  if (cfg.garland) {
    const a = P(-HALF_W + pw, spring - 0.3, z);
    const b = P(HALF_W - pw, spring - 0.3, z);
    const mid = P(0, spring - 1.2, z);
    ctx.fillStyle = cfg.garland;
    const n = 18;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const x = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * mid.x + u * u * b.x;
      const y = (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * (mid.y + (mid.y - (a.y + b.y) / 2)) + u * u * b.y;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.8, 0.07 * mid.s), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // hanging lanterns / lamps
  if (cfg.lantern) {
    const L = cfg.lantern;
    for (const side of [-1, 1]) {
      const swing = Math.sin(t * 0.8) * 0.05;
      const x = side * HALF_W * 0.45 + swing;
      const y = HEIGHT - 1.25;
      const top = P(x, HEIGHT, z);
      const p = P(x, y, z);
      ctx.strokeStyle = 'rgba(0,0,0,.6)';
      ctx.lineWidth = Math.max(0.5, 0.02 * p.s);
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(p.x, p.y - 0.3 * p.s);
      ctx.stroke();
      // glow
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gl = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 1.3 * p.s);
      gl.addColorStop(0, `rgba(${L.glow},0.45)`);
      gl.addColorStop(1, `rgba(${L.glow},0)`);
      ctx.fillStyle = gl;
      ctx.fillRect(p.x - 1.3 * p.s, p.y - 1.3 * p.s, 2.6 * p.s, 2.6 * p.s);
      ctx.restore();
      ctx.fillStyle = L.color;
      if (L.style === 'round') {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, 0.27 * p.s, 0.33 * p.s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,.35)';
        ctx.fillRect(p.x - 0.14 * p.s, p.y - 0.36 * p.s, 0.28 * p.s, 0.06 * p.s);
        ctx.fillRect(p.x - 0.14 * p.s, p.y + 0.3 * p.s, 0.28 * p.s, 0.06 * p.s);
      } else {
        // star / Moroccan-style lamp: a small faceted shape
        const r = 0.2 * p.s;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const rr = i % 2 ? r * 0.6 : r;
          ctx.lineTo(p.x + Math.cos(ang) * rr, p.y + Math.sin(ang) * rr * 1.3);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  // candles / diyas along the sides
  if (cfg.flames) {
    const diya = cfg.flames === 'diyas';
    for (const side of [-1, 1]) {
      for (let j = 0; j < (diya ? 3 : 2); j++) {
        const x = side * (HALF_W - 0.75 - j * 0.28);
        const zz = z + (diya ? j * 0.45 : 0.6 + j * 0.3);
        const baseY = diya ? 0.02 : 0.95;
        const b = P(x, baseY, zz);
        if (!diya) {
          const top = P(x, baseY + 0.28, zz);
          ctx.fillStyle = '#efe6cf';
          ctx.fillRect(b.x - 0.035 * b.s, top.y, 0.07 * b.s, b.y - top.y);
          const st = P(x, 0, zz);
          ctx.fillStyle = '#3a2c1c';
          ctx.fillRect(b.x - 0.01 * b.s, b.y, 0.02 * b.s, st.y - b.y);
        } else {
          ctx.fillStyle = '#8a4b1c';
          ctx.beginPath();
          ctx.ellipse(b.x, b.y, 0.09 * b.s, 0.035 * b.s, 0, 0, Math.PI);
          ctx.fill();
        }
        const fy = diya ? baseY + 0.05 : baseY + 0.32;
        const fl = P(x, fy, zz);
        const flick = 1 + 0.18 * Math.sin(t * 9 + j * 3 + side) + 0.08 * Math.sin(t * 23 + j);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const gl = ctx.createRadialGradient(fl.x, fl.y, 0, fl.x, fl.y, 0.45 * fl.s * flick);
        gl.addColorStop(0, 'rgba(255,200,100,0.55)');
        gl.addColorStop(1, 'rgba(255,160,60,0)');
        ctx.fillStyle = gl;
        ctx.fillRect(fl.x - 0.5 * fl.s, fl.y - 0.5 * fl.s, fl.s, fl.s);
        ctx.restore();
        ctx.fillStyle = '#ffd98a';
        ctx.beginPath();
        ctx.ellipse(fl.x, fl.y - 0.03 * fl.s * flick, 0.022 * fl.s, 0.055 * fl.s * flick, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

/**
 * A one-off silhouette near the light at the far end of the hall, shaped after this
 * religion's own landmark architecture (pagoda, gopuram, minarets…) so every hall reads
 * as visibly different from the moment you step in, not just differently coloured.
 */
function drawLandmark(ctx: CanvasRenderingContext2D, P: Proj, cfg: SceneConfig, camZ: number) {
  const kind = cfg.landmark;
  if (!kind) return;
  const z = camZ + FAR - 1.2;
  const dark = cfg.wall;
  const at = (x: number, y: number) => P(x, y, z);
  const poly = (pts: { x: number; y: number }[], fill: string) => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  };

  ctx.save();
  ctx.globalAlpha = 0.85;

  if (kind === 'pagoda' || kind === 'shrine_roof') {
    const tiers = kind === 'pagoda' ? 3 : 1;
    const baseW = kind === 'pagoda' ? 1.5 : 2.1;
    const roofColor = cfg.pillar?.color || dark;
    let y = 0;
    for (let i = 0; i < tiers; i++) {
      const w = baseW * (1 - i * 0.28);
      const bodyH = 0.85;
      const eaveW = w * 1.3;
      poly([at(-w * 0.7, y), at(-w * 0.7, y + bodyH), at(w * 0.7, y + bodyH), at(w * 0.7, y)], dark);
      const roofY = y + bodyH;
      poly(
        [at(-eaveW, roofY + 0.05), at(-eaveW * 0.55, roofY + 0.42), at(0, roofY + 0.5), at(eaveW * 0.55, roofY + 0.42), at(eaveW, roofY + 0.05), at(0, roofY - 0.05)],
        roofColor
      );
      y = roofY + 0.2;
    }
    poly([at(-0.06, y), at(0, y + 0.7), at(0.06, y)], cfg.pillar?.cap || dark);
  } else if (kind === 'tam_quan') {
    const w = 2.0;
    poly([at(-w, 0), at(-w, 0.9), at(w, 0.9), at(w, 0)], dark);
    const roofY = 0.9;
    poly(
      [at(-w * 1.25, roofY + 0.05), at(-w * 0.6, roofY + 0.45), at(0, roofY + 0.55), at(w * 0.6, roofY + 0.45), at(w * 1.25, roofY + 0.05), at(0, roofY - 0.05)],
      cfg.pillar?.color || dark
    );
  } else if (kind === 'stupa') {
    poly([at(-0.9, 0), at(-0.55, 0.75), at(0.55, 0.75), at(0.9, 0)], dark);
    for (let i = 0; i < 5; i++) {
      const y0 = 0.9 + i * 0.22;
      const w0 = 0.22 - i * 0.03;
      poly([at(-w0, y0), at(-w0, y0 + 0.16), at(w0, y0 + 0.16), at(w0, y0)], cfg.pillar?.cap || dark);
    }
  } else if (kind === 'steeple') {
    poly([at(-0.5, 0), at(-0.5, 1.0), at(0.5, 1.0), at(0.5, 0)], dark);
    poly([at(-0.5, 1.0), at(0, 1.9), at(0.5, 1.0)], dark);
    const c = at(0, 2.05);
    ctx.strokeStyle = dark;
    ctx.lineWidth = Math.max(1, 0.03 * c.s);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y - 0.18 * c.s);
    ctx.lineTo(c.x, c.y + 0.1 * c.s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c.x - 0.12 * c.s, c.y - 0.06 * c.s);
    ctx.lineTo(c.x + 0.12 * c.s, c.y - 0.06 * c.s);
    ctx.stroke();
  } else if (kind === 'cathedral_facade') {
    for (const side of [-1, 1]) {
      poly([at(side * 1.3 - 0.28, 0), at(side * 1.3 - 0.28, 1.3), at(side * 1.3 + 0.28, 1.3), at(side * 1.3 + 0.28, 0)], dark);
      poly([at(side * 1.3 - 0.28, 1.3), at(side * 1.3, 1.7), at(side * 1.3 + 0.28, 1.3)], dark);
    }
    const rc = at(0, 0.75);
    ctx.strokeStyle = dark;
    ctx.lineWidth = Math.max(1, 0.05 * rc.s);
    ctx.beginPath();
    ctx.arc(rc.x, rc.y, 0.45 * rc.s, 0, Math.PI * 2);
    ctx.stroke();
  } else if (kind === 'dome_minarets') {
    poly([at(-0.42, 0), at(-0.42, 0.55), at(0.42, 0.55), at(0.42, 0)], dark);
    const dc = at(0, 0.55);
    ctx.fillStyle = dark;
    ctx.beginPath();
    ctx.ellipse(dc.x, dc.y, 0.42 * dc.s, 0.5 * dc.s, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    const f = at(0, 1.05);
    ctx.strokeStyle = dark;
    ctx.lineWidth = Math.max(1, 0.02 * f.s);
    ctx.beginPath();
    ctx.moveTo(f.x, f.y);
    ctx.lineTo(f.x, f.y - 0.15 * f.s);
    ctx.stroke();
    for (const side of [-1, 1]) {
      poly([at(side * 1.15 - 0.09, 0), at(side * 1.15 - 0.09, 1.15), at(side * 1.15 + 0.09, 1.15), at(side * 1.15 + 0.09, 0)], dark);
      const mc = at(side * 1.15, 1.25);
      ctx.beginPath();
      ctx.moveTo(mc.x - 0.09 * mc.s, mc.y);
      ctx.lineTo(mc.x, mc.y - 0.22 * mc.s);
      ctx.lineTo(mc.x + 0.09 * mc.s, mc.y);
      ctx.closePath();
      ctx.fillStyle = dark;
      ctx.fill();
    }
  } else if (kind === 'torii_far') {
    const postX = 0.75;
    const pw = 0.11;
    const topY = 1.7;
    const color = cfg.torii?.color || dark;
    for (const side of [-1, 1]) {
      poly([at(side * postX - pw / 2, 0), at(side * postX - pw / 2, topY), at(side * postX + pw / 2, topY), at(side * postX + pw / 2, 0)], color);
    }
    poly([at(-postX - 0.2, topY + 0.15), at(-postX - 0.2, topY + 0.05), at(postX + 0.2, topY + 0.05), at(postX + 0.2, topY + 0.15)], color);
  } else if (kind === 'gopuram') {
    let w = 1.1;
    let y = 0;
    for (let i = 0; i < 6; i++) {
      const h = 0.32;
      poly([at(-w, y), at(-w * 0.82, y + h), at(w * 0.82, y + h), at(w, y)], dark);
      y += h;
      w *= 0.8;
    }
    poly([at(-0.08, y), at(0, y + 0.3), at(0.08, y)], cfg.pillar?.cap || dark);
  }

  ctx.restore();
}

function drawTorii(ctx: CanvasRenderingContext2D, P: Proj, z: number, cfg: SceneConfig) {
  const T = cfg.torii!;
  const postX = 1.35;
  const pw = 0.2;
  const topY = 3.1;
  // posts
  for (const side of [-1, 1]) {
    const a = P(side * postX - pw / 2, 0, z);
    const b = P(side * postX + pw / 2, topY, z);
    const g = ctx.createLinearGradient(a.x, 0, b.x, 0);
    g.addColorStop(0, '#8a2510');
    g.addColorStop(0.5, T.color);
    g.addColorStop(1, '#7a200d');
    ctx.fillStyle = g;
    ctx.fillRect(a.x, b.y, b.x - a.x, a.y - b.y);
    // black base
    const c = P(side * postX - pw * 0.6, 0.3, z);
    const d = P(side * postX + pw * 0.6, 0, z);
    ctx.fillStyle = T.black;
    ctx.fillRect(c.x, c.y, d.x - c.x, d.y - c.y);
  }
  // nuki (lower beam)
  const n1 = P(-postX - 0.3, 2.55, z);
  const n2 = P(postX + 0.3, 2.4, z);
  ctx.fillStyle = T.color;
  ctx.fillRect(n1.x, n1.y, n2.x - n1.x, n2.y - n1.y);
  // kasagi (top beam, ends curving up) with a black top
  const L = P(-postX - 0.7, topY + 0.28, z);
  const R = P(postX + 0.7, topY + 0.28, z);
  const Lb = P(-postX - 0.55, topY, z);
  const Rb = P(postX + 0.55, topY, z);
  const mid = P(0, topY + 0.1, z);
  ctx.beginPath();
  ctx.moveTo(L.x, L.y);
  ctx.quadraticCurveTo(mid.x, mid.y - 0.05 * mid.s, R.x, R.y);
  ctx.lineTo(Rb.x, Rb.y);
  ctx.quadraticCurveTo(mid.x, P(0, topY - 0.12, z).y, Lb.x, Lb.y);
  ctx.closePath();
  ctx.fillStyle = T.color;
  ctx.fill();
  const k1 = P(-postX - 0.72, topY + 0.4, z);
  const k2 = P(postX + 0.72, topY + 0.4, z);
  ctx.beginPath();
  ctx.moveTo(k1.x, k1.y);
  ctx.quadraticCurveTo(mid.x, P(0, topY + 0.2, z).y, k2.x, k2.y);
  ctx.lineTo(R.x, R.y);
  ctx.quadraticCurveTo(mid.x, mid.y - 0.05 * mid.s, L.x, L.y);
  ctx.closePath();
  ctx.fillStyle = T.black;
  ctx.fill();
}

function drawParticles(ctx: CanvasRenderingContext2D, P: Proj, ps: Particle[], cfg: SceneConfig, cam: Camera) {
  const k = cfg.particles.kind;
  const col = cfg.particles.color;
  const sorted = [...ps].sort((a, b) => b.z - a.z);
  ctx.save();
  if (k === 'embers' || k === 'sparkle' || k === 'dust') ctx.globalCompositeOperation = 'lighter';
  for (const p of sorted) {
    const dz = p.z - cam.z;
    if (dz < NEAR) continue;
    const q = P(p.x, p.y, p.z);
    const r = p.size * q.s;
    const fade = Math.max(0, 1 - dz / 16);
    if (k === 'smoke') {
      const a = 0.09 * fade * Math.min(1, p.age / 2) * Math.max(0, 1 - p.age / 14);
      const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, r);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(q.x - r, q.y - r, 2 * r, 2 * r);
    } else if (k === 'petals' || k === 'leaves') {
      ctx.globalAlpha = 0.85 * fade;
      ctx.fillStyle = `rgb(${col})`;
      ctx.beginPath();
      ctx.ellipse(q.x, q.y, Math.max(0.6, r), Math.max(0.4, r * 0.55), cam.t * 1.5 + p.seed, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const tw = k === 'sparkle' || k === 'dust' ? 0.5 + 0.5 * Math.sin(cam.t * 2.2 + p.seed) : 1;
      const a = (k === 'embers' ? 0.8 : 0.45) * fade * tw;
      const rr = Math.max(0.7, r * (k === 'embers' ? 1 : 1.4));
      const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, rr * 3);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(q.x - rr * 3, q.y - rr * 3, rr * 6, rr * 6);
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}
