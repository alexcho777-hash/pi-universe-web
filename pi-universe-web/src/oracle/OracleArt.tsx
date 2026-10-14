/**
 * Hand-drawn SVG art for the oracle: moon blocks (筊杯) and the lot cylinder (籤筒).
 * No external images, so nothing to license or download.
 */

import { Box, keyframes } from '@mui/material';

export type BlockFace = 'flat' | 'round';
export type ThrowResult = 'sheng' | 'xiao' | 'yin';

/** 聖筊 = one flat + one round; 笑筊 = both flat up; 陰筊 = both round up */
export const THROW_FACES: Record<ThrowResult, [BlockFace, BlockFace]> = {
  sheng: ['flat', 'round'],
  xiao: ['flat', 'flat'],
  yin: ['round', 'round'],
};

const toss = keyframes`
  0%   { transform: translateY(0) rotate(0deg); }
  35%  { transform: translateY(-120px) rotate(300deg); }
  70%  { transform: translateY(0) rotate(620deg); }
  82%  { transform: translateY(-14px) rotate(700deg); }
  100% { transform: translateY(0) rotate(720deg); }
`;

function Block({ face, flip, tossing, delay }: { face: BlockFace; flip?: boolean; tossing: boolean; delay: number }) {
  // Real 筊杯 are one block cut in half: the flat face is a half-moon (D shape), the round face is
  // the domed back. Both have soft, blunt ends. The tilt and mirror live on the inner svg so the
  // toss animation on the wrapper never undoes them.
  const flat = face === 'flat';
    return (
    <Box
      sx={{
        animation: tossing ? `${toss} 1.1s ease-in-out ${delay}s both` : undefined,
        filter: 'drop-shadow(0 6px 7px rgba(0,0,0,.45))',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 76 116"
        sx={{
          display: 'block',
          width: { xs: 64, sm: 80 },
          height: 'auto',
          // straight edges face the middle; both blocks lean the same amount
          transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${flip ? 9 : -9}deg)`,
        }}
      >
        <defs>
          {/* the domed back is shaded like a rounded surface: bright crown, dark rim */}
          <radialGradient id="jrDome" cx="0.62" cy="0.38" r="0.75">
            <stop offset="0" stopColor="#F2564A" />
            <stop offset="0.45" stopColor="#C42A2A" />
            <stop offset="1" stopColor="#5E0A0E" />
          </radialGradient>
          <clipPath id="jfClip">
            <path d="M20 15 Q21 9 26 11 Q66 24 66 58 Q66 92 26 105 Q21 107 20 101 Q41 58 20 15 Z" />
          </clipPath>
        </defs>
        {/* both faces share one crescent outline, so the pair always looks symmetrical;
            only the surface differs: flat = one even matte colour, round = shaded dome */}
        <path
          d="M20 15 Q21 9 26 11 Q66 24 66 58 Q66 92 26 105 Q21 107 20 101 Q41 58 20 15 Z"
          fill={flat ? '#D44A40' : 'url(#jrDome)'}
          stroke={flat ? '#A3322B' : '#4E080C'}
          strokeWidth={flat ? 1.2 : 1.8}
          strokeLinejoin="round"
        />
        {flat && (
          // matte, a little worn: one or two fine scratches that run along the curve of the block
          <g clipPath="url(#jfClip)" fill="none" strokeLinecap="round">
            <path d="M32.2 32.2 L32.8 34.3 L33.4 36.5 L33.9 38.7 L34.3 40.8 L34.7 43.0 L35.1 45.1 L35.3 47.3 L35.6 49.4 L35.8 51.5 L35.9 53.7 L36.0 55.9 L36.0 58.0 L36.0 60.2 L35.9 62.3 L35.8 64.5 L35.6 66.6 L35.3 68.8 L35.1 70.9 L34.7 73.1 L34.3 75.2 L33.9 77.4 L33.4 79.5 L32.8 81.7 L32.2 83.8" stroke="rgba(120,30,28,.4)" strokeWidth=".8" strokeLinejoin="round" />
            <path d="M33.1 32.2 L33.7 34.3 L34.3 36.5 L34.8 38.7 L35.2 40.8 L35.6 43.0 L36.0 45.1 L36.2 47.3 L36.5 49.4 L36.7 51.5 L36.8 53.7 L36.9 55.9 L36.9 58.0 L36.9 60.2 L36.8 62.3 L36.7 64.5 L36.5 66.6 L36.2 68.8 L36.0 70.9 L35.6 73.1 L35.2 75.2 L34.8 77.4 L34.3 79.5 L33.7 81.7 L33.1 83.8" stroke="rgba(255,220,210,.2)" strokeWidth=".5" strokeLinejoin="round" />
            <path d="M37.7 35.6 L38.1 37.5 L38.5 39.4 L38.9 41.2 L39.2 43.1 L39.5 45.0 L39.8 46.8 L40.0 48.7 L40.2 50.5 L40.3 52.4 L40.4 54.3 L40.5 56.1 L40.5 58.0 L40.5 59.9 L40.4 61.7 L40.3 63.6 L40.2 65.5 L40.0 67.3 L39.8 69.2 L39.5 71.0 L39.2 72.9 L38.9 74.8 L38.5 76.6 L38.1 78.5 L37.7 80.4" stroke="rgba(120,30,28,.32)" strokeWidth=".7" strokeLinejoin="round" />
          </g>
        )}
        {!flat && (
          <>
            <path d="M34 24 Q57 36 59 58" stroke="rgba(255,255,255,.55)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <circle cx="52" cy="73" r="2.2" fill="rgba(255,255,255,.4)" />
          </>
        )}
      </Box>
    </Box>
  );
}

export function MoonBlocks({ result, tossing }: { result: ThrowResult | null; tossing: boolean }) {
  const faces: [BlockFace, BlockFace] = result ? THROW_FACES[result] : ['round', 'flat'];
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1.5, sm: 2.5 }, minHeight: 110, alignItems: 'center' }}>
      <Block face={faces[0]} flip tossing={tossing} delay={0} />
      <Block face={faces[1]} tossing={tossing} delay={0.08} />
    </Box>
  );
}

const shake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(-9deg); }
  30% { transform: rotate(8deg); }
  45% { transform: rotate(-7deg); }
  60% { transform: rotate(6deg); }
  75% { transform: rotate(-4deg); }
`;

const rise = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(-38px); opacity: 1; }
`;

export function LotCylinder({ shaking, lotLabel }: { shaking: boolean; lotLabel?: string | null }) {
  const sticks = Array.from({ length: 13 }, (_, i) => i);
  return (
    <Box sx={{ position: 'relative', width: 180, height: 250, mx: 'auto' }}>
      <Box
        component="svg"
        viewBox="0 0 180 250"
        sx={{ width: 180, height: 250, transformOrigin: '50% 90%', animation: shaking ? `${shake} 0.5s ease-in-out infinite` : undefined }}
      >
        <defs>
          <linearGradient id="tube" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6B0B0F" />
            <stop offset="0.45" stopColor="#B3261E" />
            <stop offset="1" stopColor="#5A080C" />
          </linearGradient>
        </defs>
        {sticks.map((i) => (
          <rect key={i} x={44 + i * 7} y={18 + ((i * 37) % 22)} width="5" height="120" rx="2" fill="#E9CF97" stroke="#B8924A" strokeWidth="0.8" />
        ))}
        <path d="M34 92 L146 92 L138 236 Q90 246 42 236 Z" fill="url(#tube)" stroke="#E8C170" strokeWidth="3" />
        <ellipse cx="90" cy="92" rx="56" ry="10" fill="#4A0609" stroke="#E8C170" strokeWidth="3" />
        <rect x="40" y="140" width="100" height="6" fill="#E8C170" opacity="0.8" />
        <rect x="42" y="200" width="96" height="6" fill="#E8C170" opacity="0.8" />
        <text x="90" y="182" textAnchor="middle" fontSize="26" fill="#F5D98B" fontFamily="serif" fontWeight="700">
          籤
        </text>
      </Box>
      {lotLabel && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            ml: '-18px',
            width: 36,
            height: 170,
            borderRadius: '4px',
            background: 'linear-gradient(90deg,#F3DDA8,#E2C07A)',
            border: '1.5px solid #B8924A',
            boxShadow: '0 0 24px rgba(255,210,120,.9)',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Noto Serif TC", serif',
            fontWeight: 800,
            fontSize: '0.95rem',
            color: '#7A1010',
            letterSpacing: '0.02em',
            animation: `${rise} 0.8s ease-out forwards`,
          }}
        >
          {lotLabel}
        </Box>
      )}
    </Box>
  );
}

const glowPulse = keyframes`
  0%, 100% { opacity: .55; transform: scale(1); }
  50% { opacity: .9; transform: scale(1.06); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/** Soft golden halo with slowly turning rays, placed behind a centerpiece */
export function SacredGlow({ size = 260, color = '255,200,110' }: { size?: number; color?: string }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <Box
        sx={{
          position: 'absolute',
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: '50%',
          background: `repeating-conic-gradient(rgba(${color},.16) 0deg 6deg, transparent 6deg 18deg)`,
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          animation: `${spin} 60s linear infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${color},.55) 0%, rgba(${color},.18) 45%, transparent 70%)`,
          animation: `${glowPulse} 5s ease-in-out infinite`,
        }}
      />
    </Box>
  );
}
