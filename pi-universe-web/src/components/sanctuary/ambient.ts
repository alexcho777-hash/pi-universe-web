/**
 * Background sound for each sanctuary, synthesized in the browser with the Web Audio API
 * (no audio files): temple bells and a singing bowl, a church organ, wind and flowing
 * water for the mosque (no instruments), wind and suzu bells for the shrine, a tanpura
 * drone for the mandir. It only starts when the visitor taps the speaker button.
 */
import { AmbientKind } from './sceneConfig';

export interface AmbientHandle {
  stop: () => void;
}

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

export function startAmbient(kind: AmbientKind): AmbientHandle | null {
  const AC: typeof AudioContext | undefined = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  const timers: number[] = [];
  const nodes: AudioScheduledSourceNode[] = [];

  // master → (dry + reverb) → out
  const master = ctx.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.5);
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp);
  comp.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 3.5);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  reverb.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = kind === 'church' || kind === 'cathedral' ? 0.6 : 0.4;
  reverb.connect(wet);
  wet.connect(master);
  const bus = ctx.createGain();
  bus.connect(master);
  bus.connect(reverb);

  const every = (min: number, max: number, fn: () => void, firstDelay = 0) => {
    const loop = () => {
      fn();
      timers.push(window.setTimeout(loop, (min + Math.random() * (max - min)) * 1000));
    };
    timers.push(window.setTimeout(loop, firstDelay * 1000));
  };

  // --- building blocks ---------------------------------------------------------------

  /** Bell / singing bowl: inharmonic partials with long decays */
  const bell = (freq: number, gain: number, decay: number, ratios = [1, 2.76, 5.4, 8.93], amps = [1, 0.45, 0.22, 0.1]) => {
    const t = ctx.currentTime + 0.02;
    ratios.forEach((r, i) => {
      for (const detune of [1, 1.0025]) {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = freq * r * detune;
        const g = ctx.createGain();
        const peak = (gain * amps[i]) / 2;
        const d = decay / Math.sqrt(r);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g);
        g.connect(bus);
        o.start(t);
        o.stop(t + d + 0.1);
      }
    });
  };

  /** 木魚 wooden fish: a short hollow knock */
  const knock = (gain = 0.25) => {
    const t = ctx.currentTime + 0.02;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(330, t + 0.06);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g);
    g.connect(bus);
    o.start(t);
    o.stop(t + 0.2);
  };

  /** A soft sustained drone of a few sine tones that slowly breathe */
  const drone = (freqs: number[], gain: number, type: OscillatorType = 'sine') => {
    freqs.forEach((fr, i) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = fr;
      const g = ctx.createGain();
      g.gain.value = gain / freqs.length;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.023;
      const lg = ctx.createGain();
      lg.gain.value = (gain / freqs.length) * 0.5;
      lfo.connect(lg);
      lg.connect(g.gain);
      if (type !== 'sine') {
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 700;
        o.connect(lp);
        lp.connect(g);
      } else o.connect(g);
      g.connect(bus);
      o.start();
      lfo.start();
      nodes.push(o, lfo);
    });
  };

  /** Filtered noise: wind (low) or running water (high, fluttering) */
  const noise = (type: 'wind' | 'water' | 'leaves', gain: number) => {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filt = ctx.createBiquadFilter();
    filt.type = type === 'wind' ? 'lowpass' : 'bandpass';
    filt.frequency.value = type === 'wind' ? 380 : type === 'water' ? 1800 : 4200;
    filt.Q.value = type === 'water' ? 0.8 : 0.5;
    const g = ctx.createGain();
    g.gain.value = gain;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = type === 'water' ? 6 : 0.08;
    const lg = ctx.createGain();
    lg.gain.value = type === 'water' ? gain * 0.35 : gain * 0.6;
    lfo.connect(lg);
    lg.connect(g.gain);
    const lfo2 = ctx.createOscillator();
    lfo2.frequency.value = 0.06;
    const lg2 = ctx.createGain();
    lg2.gain.value = type === 'wind' ? 180 : 500;
    lfo2.connect(lg2);
    lg2.connect(filt.frequency);
    src.connect(filt);
    filt.connect(g);
    g.connect(bus);
    src.start();
    lfo.start();
    lfo2.start();
    nodes.push(src, lfo, lfo2);
  };

  /** Pipe-organ chord pad, changing chord every few seconds */
  const organ = (gain: number) => {
    const chords = [
      [48, 55, 60, 64],
      [41, 57, 60, 65],
      [45, 57, 60, 64],
      [43, 55, 59, 62],
    ];
    let idx = 0;
    const play = () => {
      const t = ctx.currentTime + 0.05;
      const dur = 9;
      chords[idx % chords.length].forEach((n) => {
        [1, 2, 3].forEach((h, hi) => {
          const o = ctx.createOscillator();
          o.type = 'sine';
          o.frequency.value = midi(n) * h;
          const g = ctx.createGain();
          const peak = (gain / 4) * [1, 0.35, 0.15][hi];
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(peak, t + 2.5);
          g.gain.setValueAtTime(peak, t + dur - 1);
          g.gain.linearRampToValueAtTime(0.0001, t + dur + 2);
          o.connect(g);
          g.connect(bus);
          o.start(t);
          o.stop(t + dur + 2.2);
        });
      });
      idx++;
    };
    every(9, 9, play);
  };

  /** Suzu / small bells: a quick bright jingle */
  const jingle = (gain: number) => {
    const n = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < n; i++) {
      timers.push(
        window.setTimeout(() => bell(2200 + Math.random() * 1400, gain, 0.9, [1, 2.4], [1, 0.3]), i * (60 + Math.random() * 70))
      );
    }
  };

  /** Tanpura: Pa – Sa' – Sa' – Sa, plucked and left to ring */
  const tanpura = (gain: number) => {
    const notes = [55, 60, 60, 48].map(midi);
    let i = 0;
    every(1.25, 1.25, () => {
      const t = ctx.currentTime + 0.02;
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = notes[i % 4];
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(400, t);
      lp.frequency.linearRampToValueAtTime(1400, t + 1.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);
      o.connect(lp);
      lp.connect(g);
      g.connect(bus);
      o.start(t);
      o.stop(t + 4.6);
      i++;
    });
  };

  // --- per sanctuary -----------------------------------------------------------------
  switch (kind) {
    case 'temple':
      drone([98, 147], 0.05);
      every(10, 14, () => bell(196, 0.22, 9), 1);
      every(24, 32, () => {
        for (let k = 0; k < 8; k++) timers.push(window.setTimeout(() => knock(0.18), k * 900));
      }, 6);
      break;
    case 'folk':
      drone([87, 130], 0.05);
      every(12, 16, () => bell(131, 0.28, 11, [1, 2.0, 3.01, 4.2], [1, 0.5, 0.3, 0.15]), 1);
      every(20, 28, () => {
        for (let k = 0; k < 6; k++) timers.push(window.setTimeout(() => knock(0.2), k * 750));
      }, 5);
      break;
    case 'vietnam':
      drone([110, 165], 0.05);
      every(10, 13, () => bell(220, 0.2, 8), 1);
      every(5, 9, () => bell([1046, 1175, 1397, 1568, 1760][Math.floor(Math.random() * 5)], 0.05, 2.5, [1, 2.4], [1, 0.3]), 3);
      break;
    case 'thai':
      drone([110], 0.04);
      every(1.5, 4, () => bell([1046, 1175, 1318, 1568, 1760, 2093][Math.floor(Math.random() * 6)], 0.06, 2.2, [1, 2.4], [1, 0.25]), 0.5);
      every(18, 26, () => bell(262, 0.15, 7), 4);
      break;
    case 'church':
      organ(0.12);
      break;
    case 'cathedral':
      organ(0.1);
      every(28, 40, () => bell(147, 0.2, 10, [1, 2.0, 2.4, 3.0], [1, 0.5, 0.4, 0.2]), 12);
      break;
    case 'mosque':
      noise('wind', 0.05);
      noise('water', 0.025);
      break;
    case 'shrine':
      noise('wind', 0.06);
      noise('leaves', 0.012);
      every(14, 24, () => jingle(0.05), 3);
      break;
    case 'mandir':
      tanpura(0.05);
      drone([65.4], 0.03, 'sawtooth');
      every(12, 18, () => bell(660, 0.12, 5, [1, 2.1, 3.3, 4.8], [1, 0.5, 0.3, 0.15]), 4);
      break;
  }

  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  return {
    stop: () => {
      timers.forEach((t) => window.clearTimeout(t));
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        nodes.forEach((n) => {
          try {
            n.stop();
          } catch {
            /* already stopped */
          }
        });
        ctx.close().catch(() => {});
      }, 700);
    },
  };
}
