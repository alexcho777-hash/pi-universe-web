/**
 * The welcome ceremony: when someone arrives at a sanctuary, a small company dressed
 * after that faith's own tradition walks in from both sides, lines the aisle, greets
 * the visitor with a bow and the faith's own greeting, then melts away in golden
 * light so the visitor can worship in peace.
 *
 * The figures are deliberately plain silhouettes (no facial features) — the same quiet
 * style in every hall, and respectful in the halls where faces are not depicted.
 * Pure SVG + CSS animation: nothing to download, nothing running afterwards.
 */
import { useEffect, useId, useRef } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { useI18n, tx } from '../../i18n/i18n';

/** Length of one ceremony, seconds (every animation below is scaled to this) */
const T = 30;

type Garment = 'robe' | 'flare' | 'pants';
type Head = 'none' | 'conical' | 'turban' | 'kufi' | 'hijab' | 'veil' | 'eboshi' | 'crown' | 'bun';
type Pose = 'palms' | 'wai' | 'chest' | 'hold' | 'tray';
type Prop = 'none' | 'lantern' | 'candle' | 'cross';

interface Look {
  skin: string;
  g: Garment;
  cloth: string;
  /** trousers (pants), lower garment (hakama) */
  cloth2?: string;
  hair?: string;
  head?: Head;
  headColor?: string;
  sash?: string;
  collar?: boolean;
  garland?: string;
  tilak?: boolean;
  pose: Pose;
  prop?: Prop;
}

const SKIN = ['#f0c9a4', '#e2ae85', '#c98d62', '#a9703f', '#8a5a34'];
const HAIR = '#26211d';

// ---------------------------------------------------------------- crews (left far→near, right far→near)

const monk = (skin: string): Look => ({ skin, g: 'robe', cloth: '#d98a1c', cloth2: '#8a4b0f', sash: '#8f2a12', pose: 'palms' });
const lay = (skin: string, cloth = '#5d636b', bun = false): Look => ({ skin, g: 'robe', cloth, hair: HAIR, head: bun ? 'bun' : 'none', pose: 'palms' });

const CREWS: Record<string, Look[]> = {
  buddhist: [monk(SKIN[1]), lay(SKIN[0], '#5d636b', true), monk(SKIN[2]), lay(SKIN[1]), monk(SKIN[0]), lay(SKIN[2], '#5d636b', true), monk(SKIN[1]), lay(SKIN[0])],
  taiwan_folk: [
    { skin: SKIN[1], g: 'pants', cloth: '#b72a1c', cloth2: '#1f2a44', hair: HAIR, pose: 'hold', prop: 'lantern' },
    { skin: SKIN[0], g: 'flare', cloth: '#d6a21b', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[2], g: 'pants', cloth: '#f4efe4', cloth2: '#1f2a44', hair: HAIR, sash: '#b72a1c', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#1f4a8a', hair: HAIR, pose: 'palms' },
    { skin: SKIN[0], g: 'pants', cloth: '#b72a1c', cloth2: '#1f2a44', hair: HAIR, pose: 'hold', prop: 'lantern' },
    { skin: SKIN[1], g: 'flare', cloth: '#b72a1c', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[2], g: 'robe', cloth: '#1f4a8a', hair: HAIR, pose: 'palms' },
    { skin: SKIN[0], g: 'pants', cloth: '#f4efe4', cloth2: '#1f2a44', hair: HAIR, sash: '#b72a1c', pose: 'palms' },
  ],
  vietnamese_folk: [
    { skin: SKIN[0], g: 'robe', cloth: '#e0a920', cloth2: '#f4f1e8', hair: HAIR, head: 'conical', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#1f3a8a', hair: HAIR, head: 'turban', headColor: '#16161c', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#c82b2b', cloth2: '#f4f1e8', hair: HAIR, head: 'conical', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#2c6e49', cloth2: '#f4f1e8', hair: HAIR, head: 'conical', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#7a2fa0', cloth2: '#f4f1e8', hair: HAIR, head: 'conical', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#1f3a8a', hair: HAIR, head: 'turban', headColor: '#16161c', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#e0a920', cloth2: '#f4f1e8', hair: HAIR, head: 'conical', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#c82b2b', cloth2: '#f4f1e8', hair: HAIR, head: 'conical', pose: 'palms' },
  ],
  thai_four_face: [
    { skin: SKIN[1], g: 'flare', cloth: '#7b2fa0', sash: '#e0b83c', hair: HAIR, head: 'crown', pose: 'wai' },
    { skin: SKIN[2], g: 'pants', cloth: '#f4f1e8', cloth2: '#1b2a5c', sash: '#d4af37', hair: HAIR, pose: 'wai' },
    { skin: SKIN[1], g: 'flare', cloth: '#c8921a', sash: '#7b2fa0', hair: HAIR, head: 'crown', pose: 'wai' },
    { skin: SKIN[0], g: 'flare', cloth: '#1f7a6a', sash: '#e0b83c', hair: HAIR, head: 'bun', pose: 'wai' },
    { skin: SKIN[2], g: 'flare', cloth: '#c8921a', sash: '#7b2fa0', hair: HAIR, head: 'crown', pose: 'wai' },
    { skin: SKIN[1], g: 'pants', cloth: '#f4f1e8', cloth2: '#1b2a5c', sash: '#d4af37', hair: HAIR, pose: 'wai' },
    { skin: SKIN[0], g: 'flare', cloth: '#7b2fa0', sash: '#e0b83c', hair: HAIR, head: 'crown', pose: 'wai' },
    { skin: SKIN[1], g: 'flare', cloth: '#1f7a6a', sash: '#e0b83c', hair: HAIR, head: 'bun', pose: 'wai' },
  ],
  christian: [
    { skin: SKIN[0], g: 'robe', cloth: '#7a1f2b', collar: true, hair: HAIR, pose: 'palms' },
    { skin: SKIN[1], g: 'pants', cloth: '#1d2433', cloth2: '#1d2433', collar: true, hair: HAIR, pose: 'palms' },
    { skin: SKIN[2], g: 'robe', cloth: '#7a1f2b', collar: true, hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#f1ede2', sash: '#7a1f2b', hair: HAIR, pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#7a1f2b', collar: true, hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[0], g: 'pants', cloth: '#1d2433', cloth2: '#1d2433', collar: true, hair: HAIR, pose: 'palms' },
    { skin: SKIN[3], g: 'robe', cloth: '#7a1f2b', collar: true, hair: HAIR, pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#f1ede2', sash: '#7a1f2b', hair: HAIR, head: 'bun', pose: 'palms' },
  ],
  catholic: [
    { skin: SKIN[0], g: 'robe', cloth: '#1a1a1f', head: 'veil', headColor: '#1a1a1f', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#f3efe4', cloth2: '#c9a227', hair: HAIR, pose: 'palms', prop: 'candle' },
    { skin: SKIN[0], g: 'robe', cloth: '#15151a', collar: true, hair: '#8c8c92', pose: 'palms', prop: 'cross' },
    { skin: SKIN[2], g: 'robe', cloth: '#f3efe4', cloth2: '#c9a227', hair: HAIR, pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#1a1a1f', head: 'veil', headColor: '#1a1a1f', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#f3efe4', cloth2: '#c9a227', hair: HAIR, pose: 'palms', prop: 'candle' },
    { skin: SKIN[1], g: 'robe', cloth: '#15151a', collar: true, hair: HAIR, pose: 'palms', prop: 'cross' },
    { skin: SKIN[3], g: 'robe', cloth: '#f3efe4', cloth2: '#c9a227', hair: HAIR, pose: 'palms' },
  ],
  islamic: [
    { skin: SKIN[1], g: 'robe', cloth: '#f3f1ea', head: 'kufi', headColor: '#ffffff', hair: HAIR, pose: 'chest' },
    { skin: SKIN[0], g: 'robe', cloth: '#2f6f73', head: 'hijab', headColor: '#2f6f73', pose: 'chest' },
    { skin: SKIN[2], g: 'robe', cloth: '#f3f1ea', head: 'kufi', headColor: '#ffffff', hair: HAIR, pose: 'chest' },
    { skin: SKIN[1], g: 'robe', cloth: '#b58a4a', head: 'hijab', headColor: '#e6d6b0', pose: 'chest' },
    { skin: SKIN[1], g: 'robe', cloth: '#f3f1ea', head: 'kufi', headColor: '#ffffff', hair: HAIR, pose: 'chest' },
    { skin: SKIN[0], g: 'robe', cloth: '#7a4a6a', head: 'hijab', headColor: '#7a4a6a', pose: 'chest' },
    { skin: SKIN[2], g: 'robe', cloth: '#e6e2d6', head: 'kufi', headColor: '#ffffff', hair: HAIR, pose: 'chest' },
    { skin: SKIN[1], g: 'robe', cloth: '#2f6f73', head: 'hijab', headColor: '#2f6f73', pose: 'chest' },
  ],
  shinto: [
    { skin: SKIN[0], g: 'robe', cloth: '#f6f2ea', cloth2: '#c8321f', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#e9eef2', cloth2: '#5a6f8c', hair: HAIR, head: 'eboshi', headColor: '#17171b', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#f6f2ea', cloth2: '#c8321f', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#f6f2ea', cloth2: '#c8321f', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#f6f2ea', cloth2: '#c8321f', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#e9eef2', cloth2: '#5a6f8c', hair: HAIR, head: 'eboshi', headColor: '#17171b', pose: 'palms' },
    { skin: SKIN[0], g: 'robe', cloth: '#f6f2ea', cloth2: '#c8321f', hair: HAIR, head: 'bun', pose: 'palms' },
    { skin: SKIN[1], g: 'robe', cloth: '#f6f2ea', cloth2: '#c8321f', hair: HAIR, head: 'bun', pose: 'palms' },
  ],
  hindu: [
    { skin: SKIN[3], g: 'flare', cloth: '#d6336c', sash: '#e8a317', hair: HAIR, head: 'bun', tilak: true, pose: 'tray' },
    { skin: SKIN[2], g: 'pants', cloth: '#f0e6d2', cloth2: '#f0e6d2', hair: HAIR, garland: '#ff9f1a', tilak: true, pose: 'palms' },
    { skin: SKIN[3], g: 'flare', cloth: '#e8a317', sash: '#1c7c54', hair: HAIR, head: 'bun', tilak: true, pose: 'tray' },
    { skin: SKIN[4], g: 'pants', cloth: '#f0e6d2', cloth2: '#f0e6d2', hair: HAIR, garland: '#ff9f1a', tilak: true, pose: 'palms' },
    { skin: SKIN[3], g: 'flare', cloth: '#1c7c54', sash: '#e8a317', hair: HAIR, head: 'bun', tilak: true, pose: 'tray' },
    { skin: SKIN[2], g: 'pants', cloth: '#f0e6d2', cloth2: '#f0e6d2', hair: HAIR, garland: '#ff9f1a', tilak: true, pose: 'palms' },
    { skin: SKIN[3], g: 'flare', cloth: '#d6336c', sash: '#e8a317', hair: HAIR, head: 'bun', tilak: true, pose: 'tray' },
    { skin: SKIN[4], g: 'pants', cloth: '#f0e6d2', cloth2: '#f0e6d2', hair: HAIR, garland: '#ff9f1a', tilak: true, pose: 'palms' },
  ],
};

const crewFor = (religionType: string): Look[] => CREWS[religionType] || CREWS.buddhist;

// ---------------------------------------------------------------- one person

function Person({ look }: { look: Look }) {
  const uid = useId().replace(/:/g, '');
  const { skin, g, cloth, cloth2, hair, head = 'none', headColor, sash, collar, garland, tilak, pose, prop = 'none' } = look;
  const shade = `sh${uid}`;
  const body =
    g === 'robe'
      ? 'M17 52 Q30 45 43 52 L46 126 Q30 130 14 126 Z'
      : g === 'flare'
        ? 'M18 52 Q30 46 42 52 L39 78 L52 126 Q30 131 8 126 L21 78 Z'
        : 'M18 52 Q30 46 42 52 L41 92 L19 92 Z';
  const covered = head === 'hijab' || head === 'veil';
  const sleeve = cloth;
  // arms: [path, hands...]
  const arms: Record<Pose, { l: string; r: string; hands: [number, number][] }> = {
    palms: { l: 'M19 54 Q13 70 28 65', r: 'M41 54 Q47 70 32 65', hands: [[30, 63]] },
    wai: { l: 'M19 54 Q12 66 28 52', r: 'M41 54 Q48 66 32 52', hands: [[30, 50]] },
    chest: { l: 'M19 54 Q14 70 27 61', r: 'M41 54 Q46 70 34 63', hands: [[26, 61], [34, 63]] },
    hold: { l: 'M19 54 Q14 70 27 62', r: 'M41 54 Q50 62 48 74', hands: [[27, 62], [48, 75]] },
    tray: { l: 'M19 54 Q10 72 21 74', r: 'M41 54 Q50 72 39 74', hands: [[21, 74], [39, 74]] },
  };
  const a = arms[pose];
  return (
    <svg viewBox="0 0 60 132" width="100%" height="100%" aria-hidden="true" focusable="false" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id={shade} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="128" rx="17" ry="3.2" fill="#000" opacity=".38" />

      {/* lantern pole (behind the body) */}
      {prop === 'lantern' && (
        <g>
          <line x1="48" y1="20" x2="48" y2="118" stroke="#6b3d1a" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 20 L48 17" stroke="#d4af37" strokeWidth="2" />
          <ellipse cx="48" cy="30" rx="7" ry="9" fill="#d8261b" />
          <ellipse cx="48" cy="30" rx="7" ry="9" fill="none" stroke="#f0c14b" strokeWidth=".8" />
          <rect x="43" y="19.5" width="10" height="2.4" rx="1" fill="#d4af37" />
          <rect x="43" y="38" width="10" height="2.4" rx="1" fill="#d4af37" />
          <line x1="48" y1="40.5" x2="48" y2="48" stroke="#d4af37" strokeWidth="1" />
          <ellipse cx="48" cy="30" rx="9" ry="11" fill="rgba(255,150,60,.28)" />
        </g>
      )}

      {/* legs for shirt-and-trousers */}
      {g === 'pants' && (
        <g>
          <path d="M20 90 H29 V124 H20 Z" fill={cloth2 || '#222'} />
          <path d="M31 90 H40 V124 H31 Z" fill={cloth2 || '#222'} />
          <path d="M19 124 H29.5 V127 H19 Z M30.5 124 H41 V127 H30.5 Z" fill="#17171b" />
        </g>
      )}

      {/* body */}
      <path d={body} fill={cloth} />
      {/* lower garment (hakama / skirt) */}
      {g === 'robe' && cloth2 && cloth2 !== '#f4f1e8' && cloth2 !== '#c9a227' && cloth2 !== cloth && (
        <path d="M18 80 L46 80 L46 126 Q30 130 14 126 Z" fill={cloth2} />
      )}
      {/* áo dài trousers / cincture */}
      {g === 'robe' && cloth2 === '#f4f1e8' && <path d="M26 104 L34 104 L35 126 Q30 128 25 126 Z" fill={cloth2} opacity=".9" />}
      {g === 'robe' && cloth2 === '#c9a227' && <path d="M16.5 86 L45 86 L45.4 90 L16.2 90 Z" fill={cloth2} />}
      <path d={body} fill={`url(#${shade})`} />
      {/* robe fold */}
      {g !== 'pants' && <path d="M30 70 L30 126" stroke="#000" strokeOpacity=".14" strokeWidth=".8" />}

      {/* sash across the chest */}
      {sash && <path d="M19 53 L26 53 L44 96 L36 96 Z" fill={sash} opacity=".95" />}
      {/* clergy collar */}
      {collar && <path d="M26.5 50 L33.5 50 L33 55 L27 55 Z" fill="#fafafa" />}
      {/* flower garland */}
      {garland && (
        <g fill={garland}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const t = i / 8;
            return <circle key={i} cx={21 + 18 * t} cy={52 + Math.sin(Math.PI * t) * 22} r="2.3" opacity={i % 2 ? 0.95 : 0.78} />;
          })}
        </g>
      )}
      {/* pectoral cross */}
      {prop === 'cross' && (
        <g>
          <path d="M26 52 L30 72 L34 52" stroke="#d4af37" strokeWidth=".8" fill="none" />
          <rect x="29.2" y="70" width="1.6" height="7" fill="#d4af37" />
          <rect x="27.6" y="72" width="4.8" height="1.6" fill="#d4af37" />
        </g>
      )}

      {/* head covering that sits behind the face */}
      {head === 'hijab' && <path d="M18.5 36 Q18.5 19 30 19 Q41.5 19 41.5 36 Q44 47 45 58 L15 58 Q16 47 18.5 36 Z" fill={headColor} />}
      {head === 'veil' && <path d="M19 36 Q19 19.5 30 19.5 Q41 19.5 41 36 Q43 48 44 60 L16 60 Q17 48 19 36 Z" fill={headColor} />}
      {head === 'bun' && <circle cx="30" cy="18.5" r="4.2" fill={hair || HAIR} />}

      {/* neck + head */}
      <rect x="27" y="43" width="6" height="10" fill={skin} />
      <ellipse cx="30" cy="34" rx={covered ? 6.9 : 8.6} ry={covered ? 8.7 : 10} fill={skin} />
      <ellipse cx="27" cy="31" rx="3" ry="4" fill="#fff" opacity=".1" />
      {tilak && <circle cx="30" cy="29" r="1.1" fill="#c8102e" />}

      {/* hair / hats */}
      {hair && !covered && head !== 'turban' && head !== 'conical' && (
        <path d="M21.2 34 Q20.8 21.5 30 21.2 Q39.2 21.5 38.8 34 Q35.5 27.5 30 27.5 Q24.5 27.5 21.2 34 Z" fill={hair} />
      )}
      {head === 'veil' && <path d="M22.5 29.5 Q30 25 37.5 29.5 L37.5 31.8 Q30 27.8 22.5 31.8 Z" fill="#f7f7f2" />}
      {head === 'kufi' && <path d="M21.5 28.5 Q30 17 38.5 28.5 Q30 30.5 21.5 28.5 Z" fill={headColor} stroke="#d8d8d0" strokeWidth=".5" />}
      {head === 'turban' && <path d="M20.5 30 Q22 15.5 30 15.5 Q38 15.5 39.5 30 Q30 26 20.5 30 Z" fill={headColor} />}
      {head === 'conical' && (
        <g>
          <path d="M8 28 L30 3 L52 28 Q30 34 8 28 Z" fill="#e9d79f" stroke="#b79b52" strokeWidth=".8" />
          <path d="M16 26 Q30 31 44 26" stroke="#b79b52" strokeWidth=".6" fill="none" />
          <path d="M23 33 Q30 37 37 33" stroke="#c8321f" strokeWidth=".9" fill="none" />
        </g>
      )}
      {head === 'eboshi' && <path d="M23.5 26 L25.5 9 Q30 5.5 34.5 9 L36.5 26 Z" fill={headColor} />}
      {head === 'crown' && (
        <path d="M21.5 27.5 L23.5 14 L27 22 L30 8.5 L33 22 L36.5 14 L38.5 27.5 Z" fill="#e0b83c" stroke="#a9811a" strokeWidth=".6" />
      )}

      {/* arms and hands */}
      <path d={a.l} stroke={sleeve} strokeWidth="7.2" strokeLinecap="round" fill="none" />
      <path d={a.r} stroke={sleeve} strokeWidth="7.2" strokeLinecap="round" fill="none" />
      <path d={a.l} stroke={`url(#${shade})`} strokeWidth="7.2" strokeLinecap="round" fill="none" opacity=".6" />
      {a.hands.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={pose === 'palms' || pose === 'wai' ? 3 : 3.4} ry={pose === 'palms' || pose === 'wai' ? 5 : 3.4} fill={skin} />
      ))}

      {/* offerings held in the hands */}
      {pose === 'tray' && (
        <g>
          <ellipse cx="30" cy="75" rx="15" ry="3.6" fill="#c9a04a" stroke="#8a6a1c" strokeWidth=".7" />
          <ellipse cx="30" cy="74.2" rx="12" ry="2.5" fill="#e0bf6a" />
          {[22, 30, 38].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="73.6" rx="2.6" ry="1.2" fill="#a8541f" />
              <path className="fl" d={`M${x} 72.6 Q${x - 2} 68.6 ${x} 65 Q${x + 2} 68.6 ${x} 72.6 Z`} fill="#ffd45a" />
            </g>
          ))}
        </g>
      )}
      {prop === 'candle' && (
        <g>
          <rect x="29" y="53" width="2.2" height="12" rx=".8" fill="#f6efd8" />
          <path className="fl" d="M30.1 52.6 Q28.2 49.2 30.1 45.5 Q32 49.2 30.1 52.6 Z" fill="#ffd45a" />
        </g>
      )}

      {/* golden dust that rises as the figure fades */}
      <g className="sp" fill="#ffe08a">
        {[
          [18, 60, 0],
          [42, 70, 1],
          [28, 90, 2],
          [36, 50, 3],
          [22, 110, 4],
          [40, 100, 5],
        ].map(([x, y, i]) => (
          <circle key={i} className="spk" cx={x} cy={y} r={1.6} style={{ ['--i' as string]: i }} />
        ))}
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------- animation

const proc = keyframes`
  0%   { transform: translateX(var(--dx)); opacity: 0; filter: none; }
  1%   { opacity: 1; }
  7%   { transform: translateX(0) rotate(0) translateY(0); opacity: 1; filter: none; }
  21%  { transform: translateX(0) rotate(0) translateY(0); }
  23%  { transform: translateX(0) rotate(var(--bow)) translateY(3px); }
  26%  { transform: translateX(0) rotate(0) translateY(0); }
  45%  { transform: translateX(0) rotate(0) translateY(0); }
  47%  { transform: translateX(0) rotate(var(--bow)) translateY(3px); }
  50%  { transform: translateX(0) rotate(0) translateY(0); }
  68%  { transform: translateX(0) rotate(0) translateY(0); }
  70%  { transform: translateX(0) rotate(var(--bow)) translateY(3px); }
  73%  { transform: translateX(0) rotate(0) translateY(0); }
  88%  { transform: translateX(0) translateY(0); opacity: 1; filter: none; }
  98%  { transform: translateX(0) translateY(-8px); opacity: 0; filter: blur(5px) brightness(2.2); }
  100% { transform: translateX(0) translateY(-8px); opacity: 0; filter: blur(5px) brightness(2.2); }
`;
const bob = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-3px); }
`;
const pop = keyframes`
  0%   { opacity: 0; transform: translate(-50%, -100%) scale(.82); }
  20%  { opacity: 0; transform: translate(-50%, -100%) scale(.82); }
  23%  { opacity: 1; transform: translate(-50%, -100%) scale(1.06); }
  24%  { opacity: 1; transform: translate(-50%, -100%) scale(1); }
  88%  { opacity: 1; transform: translate(-50%, -100%) scale(1); }
  95%  { opacity: 0; transform: translate(-50%, -112%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -112%) scale(1); }
`;
const flick = keyframes`
  0%, 100% { transform: scaleY(1); }
  50%      { transform: scaleY(1.18) translateY(-.6px); }
`;
const spark = keyframes`
  0%, 88% { opacity: 0; transform: translateY(0); }
  91%     { opacity: 1; transform: translateY(0); }
  99%     { opacity: 0; transform: translateY(-26px); }
  100%    { opacity: 0; transform: translateY(-26px); }
`;
const rise = keyframes`
  0%, 12% { opacity: 0; }
  24%     { opacity: .8; }
  88%     { opacity: .8; }
  99%     { opacity: 0; }
  100%    { opacity: 0; }
`;

// ---------------------------------------------------------------- the crowd behind them
// Three hundred further people, drawn on one canvas (cheap, even on a phone), arrive in
// waves from both sides, fill the hall to the far end, bow together and vanish with the rest.

interface Fig {
  look: Look;
  side: -1 | 1;
  p: number;
  col: number;
  jx: number;
  startT: number;
  bowT: number;
  vanT: number;
  phase: number;
}

/** How many rows and columns of people each hall holds: roomy halls get a bigger crowd */
const DENSITY: Record<string, [number, number]> = {
  vietnamese_folk: [11, 4],
  thai_four_face: [22, 7],
  taiwan_folk: [28, 8],
  buddhist: [30, 9],
  hindu: [30, 9],
  christian: [34, 10],
  catholic: [34, 10],
  islamic: [34, 10],
  shinto: [34, 10],
};
const densityFor = (religionType: string): [number, number] => DENSITY[religionType] || [28, 8];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCrowd(religionType: string, ROWS_N: number, COLS_N: number): Fig[] {
  const crew = crewFor(religionType);
  const rand = rng(religionType.length * 7919 + religionType.charCodeAt(0) * 131);
  const out: Fig[] = [];
  for (let r = 0; r < ROWS_N; r++) {
    const wave = r / ROWS_N >= 0.64 ? 0 : r / ROWS_N >= 0.36 ? 1 : 2; // nearest rows come first
    for (let c = 0; c < COLS_N; c++) {
      for (const side of [-1, 1] as const) {
        const p = 0.1 + 0.9 * Math.pow(r / (ROWS_N - 1), 1.25) + (c % 2) * 0.03;
        out.push({
          look: crew[(r * 3 + c * 5 + (side > 0 ? 3 : 0)) % crew.length],
          side,
          p,
          col: c,
          jx: (rand() - 0.5) * 0.02,
          startT: 1.2 + wave * 0.9 + rand() * 0.6,
          bowT: 6.5 + rand() * 0.3,
          vanT: 26.6 + rand() * 1.2,
          phase: rand() * 6.28,
        });
      }
    }
  }
  return out.sort((a, b) => a.p - b.p);
}

const P = (d: string) => new Path2D(d);
const BODY = {
  robe: P('M17 52 Q30 45 43 52 L46 126 Q30 130 14 126 Z'),
  flare: P('M18 52 Q30 46 42 52 L39 78 L52 126 Q30 131 8 126 L21 78 Z'),
  pants: P('M18 52 Q30 46 42 52 L41 92 L19 92 Z'),
};
const LOWER = P('M18 80 L46 80 L46 126 Q30 130 14 126 Z');
const SASH = P('M19 53 L26 53 L44 96 L36 96 Z');
const HAIR_CAP = P('M21.2 34 Q20.8 21.5 30 21.2 Q39.2 21.5 38.8 34 Q35.5 27.5 30 27.5 Q24.5 27.5 21.2 34 Z');
const HIJAB = P('M18.5 36 Q18.5 19 30 19 Q41.5 19 41.5 36 Q44 47 45 58 L15 58 Q16 47 18.5 36 Z');
const CONICAL = P('M8 28 L30 3 L52 28 Q30 34 8 28 Z');
const KUFI = P('M21.5 28.5 Q30 17 38.5 28.5 Q30 30.5 21.5 28.5 Z');
const TURBAN = P('M20.5 30 Q22 15.5 30 15.5 Q38 15.5 39.5 30 Q30 26 20.5 30 Z');
const EBOSHI = P('M23.5 26 L25.5 9 Q30 5.5 34.5 9 L36.5 26 Z');
const CROWN = P('M21.5 27.5 L23.5 14 L27 22 L30 8.5 L33 22 L36.5 14 L38.5 27.5 Z');
const ARMS: Record<Pose, [Path2D, Path2D]> = {
  palms: [P('M19 54 Q13 70 28 65'), P('M41 54 Q47 70 32 65')],
  wai: [P('M19 54 Q12 66 28 52'), P('M41 54 Q48 66 32 52')],
  chest: [P('M19 54 Q14 70 27 61'), P('M41 54 Q46 70 34 63')],
  hold: [P('M19 54 Q14 70 27 62'), P('M41 54 Q46 70 34 63')],
  tray: [P('M19 54 Q14 70 27 62'), P('M41 54 Q46 70 34 63')],
};

/** Draw one simplified person in the same 60 x 132 box as the SVG figure (feet at 30,128) */
function drawLook(ctx: CanvasRenderingContext2D, l: Look) {
  const covered = l.head === 'hijab' || l.head === 'veil';
  ctx.fillStyle = 'rgba(0,0,0,.38)';
  ctx.beginPath();
  ctx.ellipse(30, 128, 17, 3.2, 0, 0, 6.3);
  ctx.fill();
  if (l.g === 'pants') {
    ctx.fillStyle = l.cloth2 || '#222';
    ctx.fillRect(20, 90, 9, 34);
    ctx.fillRect(31, 90, 9, 34);
  }
  ctx.fillStyle = l.cloth;
  ctx.fill(BODY[l.g]);
  if (l.g === 'robe' && l.cloth2 && l.cloth2 !== '#f4f1e8' && l.cloth2 !== '#c9a227' && l.cloth2 !== l.cloth) {
    ctx.fillStyle = l.cloth2;
    ctx.fill(LOWER);
  }
  ctx.fillStyle = 'rgba(0,0,0,.12)';
  ctx.fill(BODY[l.g]);
  if (l.sash) {
    ctx.fillStyle = l.sash;
    ctx.fill(SASH);
  }
  if (l.collar) {
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(26.5, 50, 7, 5);
  }
  if (l.head === 'hijab' || l.head === 'veil') {
    ctx.fillStyle = l.headColor || '#222';
    ctx.fill(HIJAB);
  }
  if (l.head === 'bun') {
    ctx.fillStyle = l.hair || HAIR;
    ctx.beginPath();
    ctx.arc(30, 18.5, 4.2, 0, 6.3);
    ctx.fill();
  }
  ctx.fillStyle = l.skin;
  ctx.fillRect(27, 43, 6, 10);
  ctx.beginPath();
  ctx.ellipse(30, 34, covered ? 6.9 : 8.6, covered ? 8.7 : 10, 0, 0, 6.3);
  ctx.fill();
  if (l.hair && !covered && l.head !== 'turban' && l.head !== 'conical') {
    ctx.fillStyle = l.hair;
    ctx.fill(HAIR_CAP);
  }
  if (l.head === 'veil') {
    ctx.fillStyle = '#f7f7f2';
    ctx.fillRect(22.5, 28, 15, 3);
  }
  if (l.head === 'kufi') {
    ctx.fillStyle = '#ffffff';
    ctx.fill(KUFI);
  }
  if (l.head === 'turban') {
    ctx.fillStyle = l.headColor || '#16161c';
    ctx.fill(TURBAN);
  }
  if (l.head === 'conical') {
    ctx.fillStyle = '#e9d79f';
    ctx.fill(CONICAL);
  }
  if (l.head === 'eboshi') {
    ctx.fillStyle = l.headColor || '#17171b';
    ctx.fill(EBOSHI);
  }
  if (l.head === 'crown') {
    ctx.fillStyle = '#e0b83c';
    ctx.fill(CROWN);
  }
  const arms = ARMS[l.pose];
  ctx.lineCap = 'round';
  ctx.lineWidth = 7.2;
  ctx.strokeStyle = l.cloth;
  ctx.stroke(arms[0]);
  ctx.stroke(arms[1]);
  ctx.fillStyle = l.skin;
  ctx.beginPath();
  ctx.ellipse(30, l.pose === 'wai' ? 50 : 63, 3, 5, 0, 0, 6.3);
  ctx.fill();
}

function Crowd({ religionType }: { religionType: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const [ROWS_N, COLS_N] = densityFor(religionType);
    const figs = buildCrowd(religionType, ROWS_N, COLS_N);
    let W = 0;
    let H = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const accent = crewFor(religionType)[0].cloth;
    const COLORS = ['#ffd25a', '#fff1b8', '#ff9a5c', accent];
    const bits = Array.from({ length: 130 }, (_, i) => {
      const r1 = ((i * 7919) % 1000) / 1000;
      const r2 = ((i * 104729) % 1000) / 1000;
      const r3 = ((i * 15485863) % 1000) / 1000;
      return { x: r1, sway: r2 * 6.28, t0: 6.5 + r3 * 17, speed: 0.22 + r2 * 0.2, size: 3 + r3 * 4, color: COLORS[i % COLORS.length], spin: r1 * 6.28 };
    });
    const t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const f of figs) {
        const u = clamp01((t - f.startT) / 1.8);
        if (u <= 0) continue;
        const v = clamp01((t - f.vanT) / 1.4);
        if (v >= 1) continue;
        const e = 1 - Math.pow(1 - u, 3);
        const aisle = 0.12 + 0.28 * f.p;
        const xEnd = 0.5 + f.side * (aisle + (f.col / (COLS_N - 1)) * (0.56 - aisle)) + f.jx;
        const xStart = f.side < 0 ? -0.12 : 1.12;
        const x = (xStart + (xEnd - xStart) * e) * W;
        const hpx = H * 0.5 * Math.pow(f.p, 0.9) * (1 - 0.045 * f.col);
        const k = hpx / 132;
        // outer columns stand on higher tiers, so the crowd rises like a wall on both sides
        const foot = H * (0.385 + 0.5 * f.p - f.col * 0.03 * (0.35 + 0.65 * f.p));
        const bobY = u < 1 ? Math.abs(Math.sin(t * 13 + f.phase)) * 2.2 * k : 0;
        const bw1 = clamp01((t - f.bowT) / 0.9);
        const bw2 = clamp01((t - f.bowT - 7.2) / 0.9);
        const bw3 = clamp01((t - f.bowT - 14.4) / 0.9);
        const sn = (w: number) => (w > 0 && w < 1 ? Math.sin(w * Math.PI) : 0);
        const bow = sn(bw1) + sn(bw2) + sn(bw3);
        const rot = -f.side * 0.2 * bow;
        const y = foot - bobY - v * 12 * k;
        ctx.save();
        ctx.globalAlpha = clamp01(u * 5) * (1 - v);
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.scale(k, k);
        ctx.translate(-30, -128);
        drawLook(ctx, f.look);
        ctx.restore();
        if (v > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = '#ffd77a';
          for (let j = 0; j < 3; j++) {
            ctx.globalAlpha = (1 - v) * v * 3.2;
            ctx.beginPath();
            ctx.arc(x + (j - 1) * 7 * k, foot - (20 + j * 28) * k - v * 26 * k, Math.max(1, 1.8 * k), 0, 6.3);
            ctx.fill();
          }
          ctx.restore();
        }
      }
      // golden petals and confetti rain over the aisle once everyone bows
      for (const b of bits) {
        const life = (t - b.t0) * b.speed;
        if (life <= 0 || life >= 1.15) continue;
        const bx = (b.x + Math.sin(t * 1.6 + b.sway) * 0.025) * W;
        const by = (-0.08 + life * 1.1) * H;
        ctx.save();
        ctx.globalAlpha = Math.min(1, life * 6) * (1 - clamp01((t - 26.8) / 1.6)) * 0.95;
        ctx.translate(bx, by);
        ctx.rotate(b.spin + t * 3 * (b.x > 0.5 ? 1 : -1));
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.size / 2, -b.size / 4, b.size, b.size / 2);
        ctx.restore();
      }
      if (t < T + 0.4) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [religionType]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />;
}

// ---------------------------------------------------------------- the greeting

function greeting(religionType: string, lang: string): string {
  switch (religionType) {
    case 'buddhist':
      return '阿彌陀佛 🙏';
    case 'taiwan_folk':
      return '平安順心 🏮';
    case 'vietnamese_folk':
      return 'Xin chào! 🙏';
    case 'thai_four_face':
      return 'สวัสดีค่ะ 🙏';
    case 'christian':
      return lang === 'zh' ? '願主賜你平安' : tx('Peace be with you', lang as never);
    case 'catholic':
      return lang === 'zh' ? '願主與你同在' : tx('The Lord be with you', lang as never);
    case 'islamic':
      return 'السلام عليكم';
    case 'shinto':
      return 'いらっしゃいませ';
    case 'hindu':
      return 'नमस्ते 🙏';
    default:
      return '🙏';
  }
}

// feet position (% of the hall height), figure height (px) and distance from the aisle centre (%) for each row, far → near
const ROWS = [
  { y: 40, h: 0.25, d: 22 },
  { y: 52, h: 0.33, d: 27 },
  { y: 66, h: 0.43, d: 32 },
  { y: 82, h: 0.56, d: 37 },
];

export function WelcomeCeremony({ religionType, onDone }: { religionType: string; onDone: () => void }) {
  const { tr, lang } = useI18n();
  const crew = crewFor(religionType);

  useEffect(() => {
    const id = window.setTimeout(onDone, (T + 0.5) * 1000);
    return () => window.clearTimeout(id);
  }, [onDone]);

  return (
    <Box
      aria-hidden="false"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        containerType: 'size',
        '& .fl': { transformOrigin: '50% 100%', transformBox: 'fill-box', animation: `${flick} .5s ease-in-out infinite` },
      }}
    >
      {/* a soft light along the aisle while they are there */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 52%, rgba(255,214,130,.30), rgba(255,214,130,0) 62%)',
          opacity: 0,
          animation: `${rise} ${T}s ease-in-out both`,
        }}
      />

      <Crowd religionType={religionType} />

      {crew.slice(0, 8).map((look, i) => {
        const side = i < 4 ? -1 : 1;
        const row = ROWS[i % 4];
        const delay = ((i % 4) * 0.12 + (side === 1 ? 0.05 : 0)).toFixed(2);
        const bow = side === -1 ? 11 : -11;
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${50 + side * row.d}%`,
              top: `${row.y}%`,
              height: `min(${row.h * 100}cqh, ${row.h * 115}cqw)`,
              aspectRatio: '60 / 132',
              transform: 'translate(-50%, -100%)',
              zIndex: i % 4,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                transformOrigin: '50% 100%',
                '--dx': `${side * (58 - row.d)}cqw`,
                '--bow': `${bow}deg`,
                opacity: 0,
                animation: `${proc} ${T}s cubic-bezier(.3,.6,.3,1) ${delay}s both`,
                '& .sp .spk': { opacity: 0, animation: `${spark} ${T}s ease-out ${delay}s both`, animationDelay: `calc(${delay}s + var(--i) * .08s)` },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  animation: `${bob} .36s ease-in-out ${delay}s 6 alternate`,
                }}
              >
                <Person look={look} />
              </Box>
            </Box>
          </Box>
        );
      })}

      {/* the greeting */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '62%',
          width: 'max-content',
          maxWidth: '58%',
          wordBreak: 'keep-all',
          px: 2.2,
          py: 1,
          borderRadius: 3,
          textAlign: 'center',
          color: '#fff3d4',
          background: 'linear-gradient(180deg, rgba(60,28,10,.82), rgba(30,12,4,.86))',
          border: '1.5px solid rgba(240,200,120,.75)',
          boxShadow: '0 4px 18px rgba(0,0,0,.45), 0 0 22px rgba(255,200,110,.35)',
          textShadow: '0 1px 4px rgba(0,0,0,.6)',
          opacity: 0,
          animation: `${pop} ${T}s ease-out both`,
          zIndex: 9,
        }}
      >
        <Box sx={{ fontSize: { xs: '1.3rem', sm: '1.7rem' }, fontWeight: 800, lineHeight: 1.25, color: '#ffe3a3' }}>{greeting(religionType, lang)}</Box>
        <Box sx={{ fontSize: { xs: '1rem', sm: '1.15rem' }, mt: 0.2 }}>{tr('歡迎蒞臨', 'Welcome')}</Box>
      </Box>

      <ButtonBase
        onClick={onDone}
        sx={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          pointerEvents: 'auto',
          px: 1.6,
          py: 0.6,
          borderRadius: 5,
          fontSize: '0.95rem',
          color: '#fff',
          backgroundColor: 'rgba(0,0,0,.45)',
          border: '1px solid rgba(255,255,255,.4)',
          zIndex: 10,
          '&:hover': { backgroundColor: 'rgba(0,0,0,.62)' },
        }}
      >
        {tr('略過', 'Skip')} ›
      </ButtonBase>
    </Box>
  );
}
