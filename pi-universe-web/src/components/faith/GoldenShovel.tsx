/**
 * 金鏟子 — after a wish is made to 註生娘娘 the Goddess "gives" the visitor a golden shovel
 * (a Taiwanese folk blessing for children). It is only a moment on screen: nothing is stored
 * and nothing is sent to the server.
 */
import { useId } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const descend = keyframes`
  0%   { opacity: 0; transform: translateY(-120px) rotate(-14deg) scale(.7); }
  55%  { opacity: 1; transform: translateY(8px) rotate(5deg) scale(1.03); }
  100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
`;
const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50%      { transform: translateY(-7px) rotate(2deg); }
`;
const glow = keyframes`
  0%, 100% { opacity: .55; transform: scale(1); }
  50%      { opacity: .95; transform: scale(1.12); }
`;
const twinkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(.3); }
  50%      { opacity: 1; transform: scale(1); }
`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

function ShovelSvg() {
  const uid = useId().replace(/:/g, '');
  const g = `gs${uid}`;
  const g2 = `gh${uid}`;
  return (
    <svg viewBox="0 0 120 172" width="100%" height="100%" aria-hidden="true" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id={g} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#a8741a" />
          <stop offset=".3" stopColor="#ffe9a0" />
          <stop offset=".55" stopColor="#f2c24a" />
          <stop offset="1" stopColor="#9a6410" />
        </linearGradient>
        <linearGradient id={g2} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8a5a10" />
          <stop offset=".4" stopColor="#f6d572" />
          <stop offset="1" stopColor="#8a5a10" />
        </linearGradient>
      </defs>
      {/* D-shaped grip */}
      <path d="M38 14 Q38 2 60 2 Q82 2 82 14 L82 26 L74 26 L74 15 Q74 9 60 9 Q46 9 46 15 L46 26 L38 26 Z" fill={`url(#${g2})`} stroke="#7a4e0c" strokeWidth="1" />
      {/* shaft */}
      <rect x="55" y="24" width="10" height="62" rx="5" fill={`url(#${g2})`} stroke="#7a4e0c" strokeWidth="1" />
      {/* red ribbon with a knot */}
      <path d="M53 52 L67 52 L67 60 L53 60 Z" fill="#c8102e" />
      <path d="M60 60 Q50 76 44 92 L52 90 Q55 80 60 70 Q65 80 68 90 L76 92 Q70 76 60 60 Z" fill="#b30d27" />
      <circle cx="60" cy="56" r="4.2" fill="#e5334d" stroke="#8a0a1f" strokeWidth=".7" />
      {/* collar */}
      <rect x="49" y="82" width="22" height="10" rx="5" fill={`url(#${g2})`} stroke="#7a4e0c" strokeWidth="1" />
      {/* blade */}
      <path d="M22 110 Q22 92 42 92 L78 92 Q98 92 98 110 Q98 138 74 156 Q64 164 60 168 Q56 164 46 156 Q22 138 22 110 Z" fill={`url(#${g})`} stroke="#7a4e0c" strokeWidth="1.2" />
      <path d="M60 98 L60 158" stroke="#fff6cf" strokeOpacity=".55" strokeWidth="1.6" />
      <path d="M32 104 Q30 128 46 148" stroke="#fff6cf" strokeOpacity=".45" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 福 on the blade */}
      <text x="60" y="132" textAnchor="middle" fontSize="30" fontWeight="700" fill="#9b1b1b" stroke="#6b0e0e" strokeWidth=".4" fontFamily="'Noto Serif TC','Songti TC','PMingLiU',serif">
        福
      </text>
    </svg>
  );
}

const SPARKS: [number, number, number][] = [
  [8, 20, 0],
  [88, 14, 0.5],
  [4, 62, 1.1],
  [94, 58, 0.3],
  [14, 90, 0.8],
  [84, 88, 1.4],
  [50, 4, 0.2],
  [30, 40, 1.7],
  [72, 36, 1.0],
];

export function GoldenShovelGift({ tr, onClose }: { tr: (zh: string, en: string) => string; onClose: () => void }) {
  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-label={tr('註生娘娘賜您金鏟子', 'Zhusheng Niangniang bestows a golden shovel upon you')}
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        background: 'radial-gradient(circle at 50% 38%, rgba(90,40,10,.88), rgba(10,4,2,.96) 70%)',
      }}
    >
      <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 10,
            width: 300,
            height: 240,
            ml: '-150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,214,120,.55), rgba(255,214,120,0) 68%)',
            animation: `${glow} 2.6s ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', width: 140, height: 205, mx: 'auto', animation: `${descend} 1.5s cubic-bezier(.2,.8,.3,1) both` }}>
          <Box sx={{ width: '100%', height: '100%', animation: `${bob} 3.2s ease-in-out 1.5s infinite`, filter: 'drop-shadow(0 8px 14px rgba(0,0,0,.55)) drop-shadow(0 0 18px rgba(255,208,100,.7))' }}>
            <ShovelSvg />
          </Box>
          {SPARKS.map(([x, y, d], i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                fontSize: '1.3rem',
                color: '#ffe9a0',
                opacity: 0,
                animation: `${twinkle} 1.8s ease-in-out ${1.2 + d}s infinite`,
              }}
            >
              ✦
            </Box>
          ))}
        </Box>
        <Box sx={{ opacity: 0, animation: `${fadeUp} .8s ease-out 1.4s both` }}>
          <Typography sx={{ mt: 1, fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 800, color: '#ffe3a3', lineHeight: 1.3 }}>
            {tr('註生娘娘賜您金鏟子', 'Zhusheng Niangniang bestows a golden shovel upon you')}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: { xs: '1.05rem', sm: '1.2rem' }, color: '#f3e3c0', lineHeight: 1.6 }}>
            {tr('祝您早生貴子，平安順遂', 'May your family be blessed with children, peace and good fortune')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{ mt: 2.5, px: 4, fontSize: '1.15rem', fontWeight: 700, color: '#5a1a0a', background: 'linear-gradient(180deg,#ffe08a,#e8b030)', '&:hover': { background: 'linear-gradient(180deg,#ffe9a8,#f0bc3c)' } }}
          >
            🙏 {tr('收下，謝謝娘娘', 'Accept with thanks')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
