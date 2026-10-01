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
  const uid = flat ? 'jf' : 'jr';
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
          <linearGradient id={`${uid}Fill`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={flat ? '#E8574B' : '#F0584C'} />
            <stop offset="1" stopColor={flat ? '#C6362E' : '#9E1A1C'} />
          </linearGradient>
        </defs>
        {/* both faces share one half-moon outline, so the pair always looks symmetrical;
            only the surface differs: flat = matte, round = glossy dome */}
        <path
          d="M17 14 Q17 8 23 10 Q66 22 66 58 Q66 94 23 106 Q17 108 17 102 Z"
          fill={`url(#${uid}Fill)`}
          stroke={flat ? '#8E211B' : '#7A1214'}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {flat ? (
          <path d="M24 22 L24 94" stroke="rgba(255,255,255,.28)" strokeWidth="2.4" strokeLinecap="round" />
        ) : (
          <>
            <path d="M33 26 Q54 38 56 58" stroke="rgba(255,255,255,.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="72" r="2" fill="rgba(255,255,255,.35)" />
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
