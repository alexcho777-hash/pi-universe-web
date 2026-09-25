/**
 * π Universe emblem: a glowing purple disc with a large π and an orbit ring.
 * Our own design in a purple palette (not the official Pi Network logo).
 */
import { Box, Typography } from '@mui/material';

export const BRAND_PURPLE = '#5B2A93';
export const BRAND_PURPLE_LIGHT = '#8B5CF6';
export const BRAND_GOLD = '#F4C152';

export function BrandLogo({ size = 96 }: { size?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 120 120"
      role="img"
      aria-label="π Universe"
      sx={{ width: size, height: size, display: 'block', filter: 'drop-shadow(0 4px 14px rgba(91,42,147,.45))' }}
    >
      <defs>
        <radialGradient id="brandDisc" cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#9D6BFF" />
          <stop offset="0.55" stopColor="#6A33B5" />
          <stop offset="1" stopColor="#3A1668" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#brandDisc)" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#C9A6FF" strokeOpacity="0.55" strokeWidth="2" />
      {/* orbit */}
      <ellipse cx="60" cy="60" rx="57" ry="19" fill="none" stroke={BRAND_GOLD} strokeWidth="3" transform="rotate(-22 60 60)" opacity="0.95" />
      <circle cx="108" cy="41" r="5" fill={BRAND_GOLD} />
      {/* π */}
      <text x="60" y="80" textAnchor="middle" fontSize="64" fontWeight="700" fill="#FFFFFF" fontFamily="Georgia, 'Times New Roman', serif">
        π
      </text>
    </Box>
  );
}

/** "π Universe" wordmark with a purple π */
export function BrandWordmark({ fontSize = '2.6rem', color = '#2B1A45' }: { fontSize?: string; color?: string }) {
  return (
    <Typography component="span" sx={{ fontSize, fontWeight: 800, color, lineHeight: 1.1, letterSpacing: '0.01em' }}>
      <Box component="span" sx={{ color: BRAND_PURPLE, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '1.15em', mr: '0.12em' }}>
        π
      </Box>
      Universe
    </Typography>
  );
}
