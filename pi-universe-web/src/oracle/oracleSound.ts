/**
 * 求籤音效（程式合成，不需要音檔）：
 *   rattleLots  搖籤筒：竹籤在筒內互相碰撞的「嘩啦嘩啦」聲
 *   dropStick   一支籤跳出來落地：清脆的「叩」
 *   castBlocks  擲筊：兩個木筊拋起、落地、彈跳的「叩、叩叩」聲
 * 每個函式都要在使用者點擊後呼叫（手機瀏覽器才允許出聲）。出錯時安靜略過，不影響求籤流程。
 */

let shared: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    const AC: typeof AudioContext | undefined = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    if (!shared) shared = new AC();
    if (shared.state === 'suspended') void shared.resume();
    return shared;
  } catch {
    return null;
  }
}

let noiseBuf: AudioBuffer | null = null;
function noise(ctx: BaseAudioContext): AudioBuffer {
  if (!noiseBuf || noiseBuf.sampleRate !== ctx.sampleRate) {
    const len = Math.floor(ctx.sampleRate * 0.5);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

/** 一聲木頭或竹子的「叩」：短促雜訊 + 衰減很快的音高 */
function knock(ctx: BaseAudioContext, out: AudioNode, t: number, o: { freq: number; vol: number; decay: number; bright?: number }) {
  const n = ctx.createBufferSource();
  n.buffer = noise(ctx);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = o.freq * (o.bright ?? 2.2);
  bp.Q.value = 1.2;
  const g = ctx.createGain();
  g.gain.setValueAtTime(o.vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.decay * 0.6);
  n.connect(bp);
  bp.connect(g);
  g.connect(out);
  n.start(t, Math.random() * 0.3, o.decay);

  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(o.freq * 1.25, t);
  osc.frequency.exponentialRampToValueAtTime(o.freq, t + 0.02);
  const og = ctx.createGain();
  og.gain.setValueAtTime(o.vol * 0.9, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + o.decay);
  osc.connect(og);
  og.connect(out);
  osc.start(t);
  osc.stop(t + o.decay + 0.02);
}

function bus(ctx: BaseAudioContext, gain: number): GainNode {
  const comp = ctx.createDynamicsCompressor();
  const g = ctx.createGain();
  g.gain.value = gain;
  g.connect(comp);
  comp.connect(ctx.destination);
  return g;
}

/** 搖籤筒（durationMs 內持續嘩啦作響，節奏像一下一下地搖） */
export function scheduleRattle(ctx: BaseAudioContext, start: number, durationMs: number) {
  const out = bus(ctx, 0.9);
  const dur = durationMs / 1000;
  const shakeEvery = 0.2; // 約每秒 5 下
  for (let s = 0; s < dur; s += shakeEvery) {
    const t0 = start + s + Math.random() * 0.02;
    // 越接近尾聲越緩和
    const fade = s > dur - 0.4 ? Math.max(0.35, (dur - s) / 0.4) : 1;
    const clicks = 7 + Math.floor(Math.random() * 6);
    for (let i = 0; i < clicks; i++) {
      const t = t0 + Math.random() * 0.12;
      knock(ctx, out, t, {
        freq: 900 + Math.random() * 1500,
        vol: (0.12 + Math.random() * 0.2) * fade,
        decay: 0.025 + Math.random() * 0.03,
        bright: 2 + Math.random(),
      });
    }
    // 每一下搖到筒底的悶響
    knock(ctx, out, t0 + 0.06, { freq: 220, vol: 0.18 * fade, decay: 0.07, bright: 1.5 });
  }
}

export function scheduleDropStick(ctx: BaseAudioContext, start: number) {
  const out = bus(ctx, 0.9);
  knock(ctx, out, start, { freq: 1500, vol: 0.5, decay: 0.09, bright: 1.6 });
  knock(ctx, out, start + 0.09, { freq: 1700, vol: 0.28, decay: 0.07, bright: 1.6 });
  knock(ctx, out, start + 0.15, { freq: 1800, vol: 0.14, decay: 0.06, bright: 1.6 });
}

/** 擲筊：拋起一小段時間後落地，兩片木筊先後「叩」一聲，再彈跳幾下 */
export function scheduleBlocks(ctx: BaseAudioContext, start: number, landAtMs: number) {
  const out = bus(ctx, 0.9);
  const land = start + landAtMs / 1000;
  // 兩片筊落地時間略有先後
  knock(ctx, out, land, { freq: 520, vol: 0.55, decay: 0.12, bright: 1.8 });
  knock(ctx, out, land + 0.045, { freq: 430, vol: 0.5, decay: 0.12, bright: 1.8 });
  // 彈跳：間隔越來越短、越來越小
  let gap = 0.13;
  let vol = 0.32;
  let t = land + 0.1;
  for (let i = 0; i < 4; i++) {
    t += gap;
    knock(ctx, out, t, { freq: 480 + Math.random() * 120, vol, decay: 0.09, bright: 1.8 });
    knock(ctx, out, t + 0.03 + Math.random() * 0.02, { freq: 400 + Math.random() * 100, vol: vol * 0.85, decay: 0.09, bright: 1.8 });
    gap *= 0.62;
    vol *= 0.55;
  }
}

export function rattleLots(durationMs: number) {
  const ctx = getCtx();
  if (!ctx) return;
  try { scheduleRattle(ctx, ctx.currentTime + 0.02, durationMs); } catch { /* ignore */ }
}

export function dropStick() {
  const ctx = getCtx();
  if (!ctx) return;
  try { scheduleDropStick(ctx, ctx.currentTime + 0.02); } catch { /* ignore */ }
}

export function castBlocks(landAtMs = 650) {
  const ctx = getCtx();
  if (!ctx) return;
  try { scheduleBlocks(ctx, ctx.currentTime + 0.02, landAtMs); } catch { /* ignore */ }
}
