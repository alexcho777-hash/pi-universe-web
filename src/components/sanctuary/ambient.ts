/**
 * Background sound for each sanctuary, synthesized in the browser with the Web Audio API
 * (no audio files): temple bells and a singing bowl, a church organ, a courtyard fountain
 * and birds for the mosque (no instruments), birds and suzu bells for the shrine, a tanpura
 * drone for the mandir. Only clean tones are used — no filtered noise, which sounds like hiss. It only starts when the visitor taps the speaker button.
 */
import { AmbientKind } from './sceneConfig';

export interface AmbientHandle {
  stop: () => void;
  /** Re-try starting audio after a user gesture (browsers block autoplay) */
  resume: () => void;
  /** Turn the background down while someone is being read to, back up afterwards */
  duck: (on: boolean) => void;
}

/**
 * iPhones route Web Audio through the "ringer" channel, so it stays silent when the side
 * switch is on silent (and some iOS versions stay silent regardless). Telling the page to use
 * the "playback" audio session and keeping a silent <audio> element looping makes iOS treat
 * this as media playback. Must be called from the tap that starts the sound.
 */
function unlockIosAudio(): HTMLAudioElement | null {
  try {
    const nav: any = navigator;
    if (nav.audioSession) nav.audioSession.type = 'playback';
  } catch {
    /* not supported */
  }
  try {
    // 0.1 s of silence, 8-bit mono 8 kHz WAV
    const n = 800;
    const bytes = new Uint8Array(44 + n);
    const dv = new DataView(bytes.buffer);
    const w = (o: number, t: string) => [...t].forEach((c, i) => dv.setUint8(o + i, c.charCodeAt(0)));
    w(0, 'RIFF');
    dv.setUint32(4, 36 + n, true);
    w(8, 'WAVEfmt ');
    dv.setUint32(16, 16, true);
    dv.setUint16(20, 1, true);
    dv.setUint16(22, 1, true);
    dv.setUint32(24, 8000, true);
    dv.setUint32(28, 8000, true);
    dv.setUint16(32, 1, true);
    dv.setUint16(34, 8, true);
    w(36, 'data');
    dv.setUint32(40, n, true);
    bytes.fill(128, 44);
    let bin = '';
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    const a = new Audio('data:audio/wav;base64,' + btoa(bin));
    a.loop = true;
    a.setAttribute('playsinline', '');
    a.play().catch(() => {});
    return a;
  } catch {
    return null;
  }
}

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

const activeAmbients = new Set<AmbientHandle>();

/** Silence every background sound that is still running (safety net for the speaker button). */
export function stopAllAmbient() {
  [...activeAmbients].forEach((h) => h.stop());
  activeAmbients.clear();
}

/** Only one background sound at a time: starting a new one stops any earlier one. */
export function startAmbient(kind: AmbientKind): AmbientHandle | null {
  stopAllAmbient();
  const h = startAmbientInner(kind);
  if (!h) return null;
  const rawStop = h.stop;
  const wrapped: AmbientHandle = {
    ...h,
    stop: () => {
      activeAmbients.delete(wrapped);
      rawStop();
    },
  };
  activeAmbients.add(wrapped);
  return wrapped;
}

function startAmbientInner(kind: AmbientKind): AmbientHandle | null {
  const AC: typeof AudioContext | undefined = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  const keepAlive = unlockIosAudio();
  const ctx = new AC();
  const timers: number[] = [];
  let stopped = false;
  const nodes: AudioScheduledSourceNode[] = [];

  // master → (dry + reverb) → out
  const master = ctx.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.5);
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp);
  comp.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  // Cathedral stone rings much longer; the mosque courtyard mostly dry
  const len = Math.floor(ctx.sampleRate * (kind === 'cathedral' ? 5 : kind === 'mosque' ? 1.8 : 3.5));
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  reverb.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = kind === 'cathedral' ? 0.72 : kind === 'church' ? 0.6 : kind === 'mosque' ? 0.2 : 0.4;
  reverb.connect(wet);
  wet.connect(master);
  const bus = ctx.createGain();
  bus.connect(master);
  bus.connect(reverb);

  const every = (min: number, max: number, fn: () => void, firstDelay = 0) => {
    const loop = () => {
      if (stopped) return;
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

  /** Fountain droplets: tiny rising "plip" tones (tonal, so no hiss) */
  const drips = (gain: number) => {
    const drop = () => {
      const t = ctx.currentTime + 0.02;
      const f = 700 + Math.random() * 900;
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, t);
      o.frequency.exponentialRampToValueAtTime(f * 1.7, t + 0.045);
      const g = ctx.createGain();
      const peak = gain * (0.4 + Math.random() * 0.6);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g);
      g.connect(bus);
      o.start(t);
      o.stop(t + 0.12);
    };
    every(0.18, 0.7, drop, 0.5);
  };

  /** Birdsong: short phrases of pure chirps */
  const birds = (gain: number) => {
    const phrase = () => {
      const n = 2 + Math.floor(Math.random() * 4);
      const base = 2400 + Math.random() * 1400;
      const up = Math.random() < 0.5;
      for (let k = 0; k < n; k++) {
        timers.push(
          window.setTimeout(() => {
            const t = ctx.currentTime + 0.01;
            const o = ctx.createOscillator();
            o.type = 'sine';
            const f0 = base * (1 + (Math.random() - 0.5) * 0.08);
            o.frequency.setValueAtTime(up ? f0 * 0.8 : f0 * 1.15, t);
            o.frequency.exponentialRampToValueAtTime(up ? f0 * 1.2 : f0 * 0.75, t + 0.09);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
            o.connect(g);
            g.connect(bus);
            o.start(t);
            o.stop(t + 0.14);
          }, k * (110 + Math.random() * 60))
        );
      }
    };
    every(3, 8, phrase, 1.5);
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

  /** Tanpura: Pa – Sa' – Sa' – Sa, plucked and left to ring (soft additive tone, no filter sweep) */
  const tanpura = (gain: number) => {
    const notes = [55, 60, 60, 48].map(midi);
    const partials = [1, 2, 3, 4, 5, 6];
    const amps = [1, 0.55, 0.38, 0.22, 0.14, 0.08];
    let i = 0;
    every(1.6, 1.6, () => {
      const t = ctx.currentTime + 0.02;
      const f = notes[i % 4];
      partials.forEach((h, k) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f * h * (1 + (k % 2 ? 0.0015 : -0.001)); // slight shimmer
        const g = ctx.createGain();
        const peak = (gain * amps[k]) / 2;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 5.5 / Math.sqrt(h));
        o.connect(g);
        g.connect(bus);
        o.start(t);
        o.stop(t + 5.6);
      });
      i++;
    });
  };

  /** Low ceremonial drum: a tonal thump with a fast pitch drop (no noise, no hiss) */
  const drum = (freq = 110, gain = 0.16, decay = 0.3) => {
    const t = ctx.currentTime + 0.02;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.45), t + decay);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    o.connect(g);
    g.connect(bus);
    o.start(t);
    o.stop(t + decay + 0.05);
  };

  /** Plucked lute / gong-chime note (quick decay, slight sparkle) */
  const pluck = (freq: number, gain = 0.055, decay = 1.0) => {
    const t = ctx.currentTime + 0.02;
    [1, 2, 3].forEach((h, i) => {
      const o = ctx.createOscillator();
      o.type = i ? 'sine' : 'triangle';
      o.frequency.value = freq * h * (1 + i * 0.001);
      const g = ctx.createGain();
      const peak = gain * [1, 0.35, 0.15][i];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay / h);
      o.connect(g);
      g.connect(bus);
      o.start(t);
      o.stop(t + decay / h + 0.1);
    });
  };

  /** Bansuri-style flute: sine tone with vibrato, slow attack and a glide in */
  const flute = (freq: number, gain = 0.065, dur = 3.4) => {
    const t = ctx.currentTime + 0.05;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq * 0.97, t);
    o.frequency.linearRampToValueAtTime(freq, t + 0.25);
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.2;
    const vg = ctx.createGain();
    vg.gain.value = freq * 0.006;
    vib.connect(vg);
    vg.connect(o.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.35);
    g.gain.setValueAtTime(gain, t + Math.max(0.4, dur - 0.5));
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(bus);
    o.start(t);
    vib.start(t);
    o.stop(t + dur + 0.1);
    vib.stop(t + dur + 0.1);
    nodes.push(o, vib);
  };

  // --- per sanctuary -----------------------------------------------------------------
  switch (kind) {
    case 'temple':
      // 佛寺：大磬鐘聲＋木魚誦念＋低音唱誦底，偶爾一串風鈴
      drone([98, 147, 196], 0.045);
      every(10, 14, () => bell(196, 0.22, 9), 1);
      every(24, 32, () => {
        for (let k = 0; k < 8; k++) timers.push(window.setTimeout(() => knock(0.18), k * 900));
      }, 6);
      every(16, 24, () => bell([1318, 1568, 1760][Math.floor(Math.random() * 3)], 0.04, 3, [1, 2.4], [1, 0.3]), 9);
      break;
    case 'folk':
      // 台灣宮廟：北管鑼鼓——銅鑼、大鼓、木魚、鐘
      drone([87, 130], 0.05);
      every(12, 16, () => bell(131, 0.28, 11, [1, 2.0, 3.01, 4.2], [1, 0.5, 0.3, 0.15]), 1);
      every(20, 28, () => {
        for (let k = 0; k < 6; k++) timers.push(window.setTimeout(() => knock(0.2), k * 750));
      }, 5);
      every(14, 22, () => {
        drum(116, 0.15, 0.26);
        timers.push(window.setTimeout(() => drum(92, 0.18, 0.36), 620));
      }, 4);
      every(30, 46, () => drum(60, 0.22, 0.9), 8);
      break;
    case 'vietnam':
      // 越南：鐘磬＋五聲音階撥弦（đàn nguyệt 琴聲）
      drone([110, 165], 0.05);
      every(10, 13, () => bell(220, 0.2, 8), 1);
      every(5, 9, () => bell([1046, 1175, 1397, 1568, 1760][Math.floor(Math.random() * 5)], 0.05, 2.5, [1, 2.4], [1, 0.3]), 3);
      every(4, 8, () => pluck([392, 440, 523, 587, 784][Math.floor(Math.random() * 5)], 0.05, 1.3), 2);
      break;
    case 'thai':
      // 泰國：風鈴般的高音散落＋竹木琴撥音＋低鼓
      drone([110], 0.04);
      every(1.5, 4, () => bell([1046, 1175, 1318, 1568, 1760, 2093][Math.floor(Math.random() * 6)], 0.06, 2.2, [1, 2.4], [1, 0.25]), 0.5);
      every(18, 26, () => bell(262, 0.15, 7), 4);
      every(2.5, 5, () => pluck([659, 740, 831, 988, 1109][Math.floor(Math.random() * 5)], 0.045, 0.55), 1);
      every(6, 9, () => drum(90, 0.1, 0.24), 2);
      break;
    case 'church':
      // 基督教堂：管風琴和弦＋偶爾清鐘
      organ(0.12);
      every(20, 30, () => bell(587, 0.07, 6, [1, 2.0], [1, 0.3]), 10);
      break;
    case 'cathedral':
      // 天主教堂：更深的管風琴＋5 秒石殿殘響＋遠處大鐘
      organ(0.1);
      every(28, 40, () => bell(147, 0.24, 13, [1, 2.0, 2.4, 3.0], [1, 0.5, 0.4, 0.2]), 12);
      break;
    case 'mosque':
      // 清真寺：庭院噴泉＋鳥語＋偶爾一陣深水聲（無樂器，僅自然聲）
      drips(0.08);
      birds(0.045);
      every(17, 26, () => {
        for (let k = 0; k < 4; k++) timers.push(window.setTimeout(() => drips(0.05), k * 260));
      }, 6);
      break;
    case 'shrine':
      // 神社：鳥語＋鈴鈴＋手水舍的水滴
      birds(0.04);
      every(14, 24, () => jingle(0.05), 3);
      every(7, 12, () => bell([1568, 1760][Math.floor(Math.random() * 2)], 0.02, 1.8, [1, 2.4], [1, 0.3]), 2);
      every(16, 26, () => drips(0.03), 2);
      break;
      // 印度教神廟：坦布拉持續音＋笛聲冥想＋鐘
      tanpura(0.06);
      drone([65.4, 98], 0.03);
      every(12, 18, () => bell(660, 0.12, 5, [1, 2.1, 3.3, 4.8], [1, 0.5, 0.3, 0.15]), 4);
      every(9, 15, () => flute([330, 392, 440, 494, 587][Math.floor(Math.random() * 5)], 0.06, 3.6), 5);
      break;
  }

  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  return {
    duck: (on: boolean) => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(on ? 0.06 : 0.5, ctx.currentTime + 0.8);
      } catch {
        /* ignore */
      }
    },
    resume: () => {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    },
    stop: () => {
      stopped = true;
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
        try {
          keepAlive?.pause();
        } catch {
          /* ignore */
        }
      }, 700);
    },
  };
}
