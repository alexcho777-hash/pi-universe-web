/**
 * A small hand-drawn (SVG) statue of each Pantheon deity, sitting in a shrine niche on a
 * lotus pedestal. These are stylised icons built from a few body shapes + headwear + a held
 * object (no photos or copied artwork) so each deity reads at a glance by its traditional
 * attributes: Guan Gong's red face and long blade, Wenchang's brush, Nezha's spear and wheels…
 */
import { useId } from 'react';

type Body = 'seated' | 'standing' | 'armor' | 'child' | 'tiger';
type Head = 'mianliu' | 'phoenix' | 'scholar' | 'official' | 'helmet' | 'softhat' | 'veil' | 'dizang' | 'buns' | 'hair' | 'pig' | 'bald';
type Held = 'blade' | 'sword' | 'spear' | 'rake' | 'staff' | 'whip' | 'ingot' | 'brush' | 'thread' | 'tablet' | 'peach' | 'baby' | 'vase' | 'pearl' | 'none';

interface Look {
  body: Body;
  head: Head;
  held: Held;
  robe: string;
  trim?: string;
  skin?: string;
  beard?: 'long' | 'short' | 'none';
  beardColor?: string;
  halo?: boolean;
  extra?: 'turtle' | 'wheels' | 'lotus';
}

const GOLD = '#e8c170';
const SKIN = '#f0d3a2';

export const LOOKS: Record<string, Look> = {
  mazu: { body: 'seated', head: 'mianliu', held: 'tablet', robe: '#b3261e', trim: GOLD },
  yaochi: { body: 'seated', head: 'phoenix', held: 'peach', robe: '#c6892a', trim: '#f6dc8a' },
  guangong: { body: 'armor', head: 'scholar', held: 'blade', robe: '#2e6b3a', trim: GOLD, skin: '#c0392b', beard: 'long', beardColor: '#16120f' },
  tudigong: { body: 'seated', head: 'softhat', held: 'staff', robe: '#d9a93a', trim: '#8a5f12', beard: 'long', beardColor: '#f2f2f2' },
  wucaishen: { body: 'armor', head: 'helmet', held: 'whip', robe: '#c6892a', trim: GOLD, skin: '#6b4a32', beard: 'short', beardColor: '#16120f' },
  huye: { body: 'tiger', head: 'bald', held: 'none', robe: '#e0902a' },
  yuelao: { body: 'seated', head: 'softhat', held: 'thread', robe: '#b3261e', trim: '#f0e6d0', beard: 'long', beardColor: '#f2f2f2' },
  wenchang: { body: 'seated', head: 'scholar', held: 'brush', robe: '#3a4f9a', trim: GOLD, beard: 'short', beardColor: '#16120f' },
  xuantian: { body: 'armor', head: 'hair', held: 'sword', robe: '#23272f', trim: GOLD, beard: 'short', beardColor: '#16120f', extra: 'turtle' },
  chenghuang: { body: 'seated', head: 'official', held: 'tablet', robe: '#7a1a14', trim: GOLD, skin: '#d9a66a', beard: 'long', beardColor: '#16120f' },
  nezha: { body: 'child', head: 'buns', held: 'spear', robe: '#d8261b', trim: GOLD, extra: 'wheels' },
  zhushengniangniang: { body: 'seated', head: 'phoenix', held: 'baby', robe: '#c24a6a', trim: GOLD },
  guanyin: { body: 'seated', head: 'veil', held: 'vase', robe: '#f2efe6', trim: '#cbbf9a', halo: true, extra: 'lotus' },
  tianpeng: { body: 'armor', head: 'pig', held: 'rake', robe: '#a07a2a', trim: GOLD, skin: '#e8a8a0' },
  dizang: { body: 'seated', head: 'dizang', held: 'pearl', robe: '#d98b1f', trim: '#f6dc8a', halo: true, extra: 'lotus' },
};

export function DeityStatue({ deityKey, size = 120 }: { deityKey: string; size?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const L = LOOKS[deityKey] || LOOKS.mazu;
  const skin = L.skin || SKIN;
  const trim = L.trim || GOLD;
  const robeDark = shade(L.robe, -0.35);
  const robeLight = shade(L.robe, 0.2);
  const W = 120;
  const H = 164;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={size} height={(size * H) / W} role="img" aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`niche${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a160c" />
          <stop offset="1" stopColor="#140604" />
        </linearGradient>
        <radialGradient id={`glow${uid}`} cx="50%" cy="38%" r="55%">
          <stop offset="0" stopColor="rgba(255,190,90,.55)" />
          <stop offset="1" stopColor="rgba(255,190,90,0)" />
        </radialGradient>
        <linearGradient id={`robe${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={robeDark} />
          <stop offset="0.45" stopColor={robeLight} />
          <stop offset="1" stopColor={robeDark} />
        </linearGradient>
        <linearGradient id={`gold${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#b8862a" />
        </linearGradient>
      </defs>

      {/* niche */}
      <path d="M8 156 V66 Q8 10 60 10 Q112 10 112 66 V156 Z" fill={`url(#niche${uid})`} stroke={trim} strokeWidth="1.6" />
      <path d="M14 156 V66 Q14 17 60 17 Q106 17 106 66 V156" fill="none" stroke="rgba(232,193,112,.35)" strokeWidth="0.8" />
      <ellipse cx="60" cy="70" rx="46" ry="60" fill={`url(#glow${uid})`} />

      {L.halo && (
        <>
          <circle cx="60" cy="46" r="27" fill="rgba(255,236,170,.18)" stroke="rgba(255,226,140,.8)" strokeWidth="1.6" />
          <circle cx="60" cy="46" r="22" fill="none" stroke="rgba(255,226,140,.35)" strokeWidth="0.8" />
        </>
      )}

      {/* things behind the figure */}
      {L.held === 'blade' && <Blade />}
      {L.held === 'spear' && <Spear />}
      {L.held === 'rake' && <Rake />}
      {L.held === 'staff' && <Staff dragon={deityKey === 'tudigong'} />}
      {L.held === 'sword' && <Sword />}

      {L.body === 'tiger' ? (
        <Tiger />
      ) : (
        <>
          <g transform={L.body === 'child' ? 'translate(60 140) scale(.84) translate(-60 -140)' : undefined}>
            <Body kind={L.body} robe={`url(#robe${uid})`} robeDark={robeDark} trim={trim} gold={`url(#gold${uid})`} />
            {L.beard === 'long' && <path d="M51 49 Q60 92 69 49 Q60 56 51 49Z" fill={L.beardColor} opacity="0.95" />}
            <Head kind={L.head} skin={skin} trim={trim} gold={`url(#gold${uid})`} beard={L.beard} beardColor={L.beardColor} robe={L.robe} />
          </g>
          {L.held === 'tablet' && <rect x="52" y="94" width="16" height="26" rx="2" fill="#f3ecd6" stroke={trim} strokeWidth="1" />}
          {L.held === 'ingot' && <Ingot x={34} y={108} />}
          {L.held === 'whip' && <path d="M88 100 Q104 90 98 70 Q94 58 100 48" fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />}
          {L.held === 'brush' && (
            <g>
              <path d="M88 118 L94 70" stroke="#6b3a1a" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M94 70 Q97 58 92 56 Q89 62 94 70Z" fill="#1a1a1a" />
            </g>
          )}
          {L.held === 'thread' && <path d="M38 112 Q60 138 82 112" fill="none" stroke="#e8302a" strokeWidth="2" strokeLinecap="round" />}
          {L.held === 'peach' && (
            <g>
              <circle cx="84" cy="110" r="6.5" fill="#f7a6b8" stroke="#d1647f" strokeWidth="0.8" />
              <path d="M84 104 q5 -3 7 0 q-3 3 -7 0z" fill="#4c9a4a" />
            </g>
          )}
          {L.held === 'baby' && (
            <g>
              <circle cx="60" cy="108" r="6" fill={SKIN} />
              <path d="M52 114 Q60 134 68 114Z" fill="#fff4dc" stroke={trim} strokeWidth="0.8" />
            </g>
          )}
          {L.held === 'vase' && (
            <g>
              <path d="M32 98 q-3 -8 0 -14" stroke="#4c9a4a" strokeWidth="1.6" fill="none" />
              <path d="M28 106 h10 l-1.5 14 h-7z" fill={`url(#gold${uid})`} stroke={trim} strokeWidth="0.8" />
            </g>
          )}
          {L.held === 'pearl' && (
            <g>
              <circle cx="38" cy="108" r="7" fill="rgba(255,244,190,.35)" />
              <circle cx="38" cy="108" r="4.4" fill="#fff6c8" stroke="#e8c170" strokeWidth="0.8" />
            </g>
          )}
        </>
      )}

      {L.extra === 'turtle' && (
        <g>
          <ellipse cx="60" cy="146" rx="22" ry="7" fill="#2f4a3a" stroke={trim} strokeWidth="0.8" />
          <circle cx="84" cy="144" r="4" fill="#2f4a3a" />
          <path d="M40 146 q-8 0 -10 6" stroke="#2f4a3a" strokeWidth="2.4" fill="none" />
        </g>
      )}
      {L.extra === 'wheels' && (
        <g>
          {[40, 80].map((x) => (
            <g key={x}>
              <circle cx={x} cy="146" r="8" fill="#ffb347" stroke="#d8261b" strokeWidth="1.4" />
              <circle cx={x} cy="146" r="3" fill="#d8261b" />
            </g>
          ))}
        </g>
      )}

      {/* lotus pedestal */}
      <g>
        <ellipse cx="60" cy="154" rx="40" ry="6" fill="#1b0a05" stroke={trim} strokeWidth="0.8" />
        {[-26, -13, 0, 13, 26].map((dx, i) => (
          <path key={i} d={`M${60 + dx - 7} 153 Q${60 + dx} ${140 - (i === 2 ? 3 : 0)} ${60 + dx + 7} 153Z`} fill={`url(#gold${uid})`} stroke="#8a5f12" strokeWidth="0.6" opacity="0.95" />
        ))}
      </g>
    </svg>
  );
}

/* ---------- parts ---------- */

function Body({ kind, robe, robeDark, trim, gold }: { kind: Body; robe: string; robeDark: string; trim: string; gold: string }) {
  if (kind === 'seated') {
    return (
      <g>
        <path d="M44 64 Q60 57 76 64 L82 100 Q98 118 102 140 L18 140 Q22 118 38 100 Z" fill={robe} stroke={robeDark} strokeWidth="1" />
        <path d="M44 64 Q30 92 40 116 L52 116 Q46 92 52 68Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
        <path d="M76 64 Q90 92 80 116 L68 116 Q74 92 68 68Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
        <path d="M54 64 L60 86 L66 64" fill="none" stroke={trim} strokeWidth="1.8" />
        <path d="M24 134 Q60 126 96 134" fill="none" stroke={trim} strokeWidth="1.2" opacity="0.8" />
        <rect x="45" y="104" width="30" height="4" rx="2" fill={gold} opacity="0.9" />
      </g>
    );
  }
  if (kind === 'child') {
    return (
      <g>
        <path d="M46 68 Q60 62 74 68 L78 140 L42 140 Z" fill={robe} stroke={robeDark} strokeWidth="1" />
        <path d="M46 68 Q36 96 40 120 L48 120 Q47 94 52 72Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
        <path d="M74 68 Q84 96 80 120 L72 120 Q73 94 68 72Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
        <path d="M44 84 Q60 94 76 84" fill="none" stroke="#fff4dc" strokeWidth="3" opacity="0.9" />
        <rect x="46" y="106" width="28" height="4" fill={gold} />
      </g>
    );
  }
  const armor = kind === 'armor';
  return (
    <g>
      <path d="M45 64 Q60 57 75 64 L82 140 L38 140 Z" fill={robe} stroke={robeDark} strokeWidth="1" />
      <path d="M45 64 Q33 94 37 122 L47 122 Q46 94 52 68Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
      <path d="M75 64 Q87 94 83 122 L73 122 Q74 94 68 68Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
      {armor && (
        <>
          <circle cx="42" cy="68" r="8" fill={gold} stroke="#8a5f12" strokeWidth="0.8" />
          <circle cx="78" cy="68" r="8" fill={gold} stroke="#8a5f12" strokeWidth="0.8" />
          <path d="M48 68 H72 L70 100 H50Z" fill={gold} stroke="#8a5f12" strokeWidth="0.8" />
          <path d="M60 68 V100 M50 84 H70" stroke="#8a5f12" strokeWidth="0.8" />
          <rect x="46" y="100" width="28" height="6" fill={trim} />
          <path d="M44 106 L48 128 H72 L76 106Z" fill={gold} opacity="0.85" stroke="#8a5f12" strokeWidth="0.6" />
        </>
      )}
      {!armor && <path d="M54 64 L60 88 L66 64" fill="none" stroke={trim} strokeWidth="1.8" />}
    </g>
  );
}

function Head({ kind, skin, trim, gold, beard, beardColor, robe }: { kind: Head; skin: string; trim: string; gold: string; beard?: string; beardColor?: string; robe: string }) {
  const face = (
    <g>
      {kind === 'pig' ? (
        <>
          <path d="M47 36 L42 24 L54 32Z M73 36 L78 24 L66 32Z" fill={skin} stroke="#b9736c" strokeWidth="0.8" />
          <circle cx="60" cy="45" r="14" fill={skin} stroke="#b9736c" strokeWidth="0.8" />
          <ellipse cx="60" cy="50" rx="7.5" ry="5.4" fill="#f3b8b0" stroke="#b9736c" strokeWidth="0.8" />
          <circle cx="57.5" cy="50" r="1.1" fill="#7a3d38" />
          <circle cx="62.5" cy="50" r="1.1" fill="#7a3d38" />
          <path d="M51 41 q2 -2 5 0 M64 41 q2 -2 5 0" stroke="#3a2a1a" strokeWidth="1.2" fill="none" />
        </>
      ) : (
        <>
          <circle cx="60" cy="45" r="13.5" fill={skin} stroke="#a77c45" strokeWidth="0.8" />
          <path d="M52 43 q2.2 2 4.4 0 M63.6 43 q2.2 2 4.4 0" stroke="#3a2a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M57 51 q3 2 6 0" stroke="#7a3d2a" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          {kind !== 'dizang' && kind !== 'bald' && <circle cx="60" cy="38" r="0.9" fill="#c0392b" />}
        </>
      )}
      {beard === 'short' && <path d="M50 49 Q60 62 70 49 Q60 54 50 49Z" fill={beardColor} />}
    </g>
  );

  switch (kind) {
    case 'veil':
      return (
        <g>
          <path d="M43 54 Q42 26 60 26 Q78 26 77 54 L84 96 L36 96 Z" fill="#faf7ee" stroke="#cbbf9a" strokeWidth="0.8" />
          {face}
          <path d="M50 30 L60 22 L70 30Z" fill={gold} stroke="#8a5f12" strokeWidth="0.6" />
        </g>
      );
    case 'mianliu':
      return (
        <g>
          {face}
          <rect x="38" y="26" width="44" height="5" rx="1.5" fill={gold} stroke="#8a5f12" strokeWidth="0.6" />
          <path d="M40 31 V45 M46 31 V42 M74 31 V42 M80 31 V45" stroke="#f6e7b0" strokeWidth="1" strokeDasharray="1.6 1.4" />
          <rect x="48" y="21" width="24" height="6" rx="1.5" fill={gold} stroke="#8a5f12" strokeWidth="0.6" />
        </g>
      );
    case 'phoenix':
      return (
        <g>
          {face}
          <path d="M44 32 L46 20 L52 28 L60 16 L68 28 L74 20 L76 32Z" fill={gold} stroke="#8a5f12" strokeWidth="0.7" />
          <circle cx="60" cy="24" r="2.4" fill="#d8261b" />
          <path d="M44 32 Q36 34 36 44 M76 32 Q84 34 84 44" fill="none" stroke={gold} strokeWidth="1.6" />
        </g>
      );
    case 'scholar':
      return (
        <g>
          {face}
          <rect x="45" y="26" width="30" height="8" rx="2" fill="#1c1c24" stroke={trim} strokeWidth="0.8" />
          <rect x="34" y="29" width="12" height="3" fill="#1c1c24" stroke={trim} strokeWidth="0.5" />
          <rect x="74" y="29" width="12" height="3" fill="#1c1c24" stroke={trim} strokeWidth="0.5" />
        </g>
      );
    case 'official':
      return (
        <g>
          {face}
          <rect x="46" y="24" width="28" height="10" rx="2" fill="#16161c" stroke={trim} strokeWidth="0.8" />
          <rect x="26" y="28" width="22" height="4" rx="1" fill="#16161c" stroke={trim} strokeWidth="0.6" />
          <rect x="72" y="28" width="22" height="4" rx="1" fill="#16161c" stroke={trim} strokeWidth="0.6" />
        </g>
      );
    case 'helmet':
      return (
        <g>
          {face}
          <path d="M45 40 Q60 14 75 40 L72 34 Q60 22 48 34Z" fill={gold} stroke="#8a5f12" strokeWidth="0.8" />
          <path d="M60 18 V8" stroke="#d8261b" strokeWidth="2" />
          <circle cx="60" cy="8" r="2.4" fill="#d8261b" />
        </g>
      );
    case 'softhat':
      return (
        <g>
          {face}
          <path d="M44 38 Q46 20 60 20 Q74 20 76 38 Q60 32 44 38Z" fill={robe === '#b3261e' ? '#f0e6d0' : gold} stroke="#8a5f12" strokeWidth="0.8" />
        </g>
      );
    case 'dizang':
      return (
        <g>
          {face}
          <path d="M47 33 L49 21 L54 29 L60 17 L66 29 L71 21 L73 33Z" fill={gold} stroke="#8a5f12" strokeWidth="0.7" />
        </g>
      );
    case 'buns':
      return (
        <g>
          <circle cx="47" cy="32" r="6.5" fill="#16120f" />
          <circle cx="73" cy="32" r="6.5" fill="#16120f" />
          <path d="M44 38 Q60 22 76 38 Q60 31 44 38Z" fill="#16120f" />
          {face}
          <path d="M46 36 Q60 29 74 36" fill="none" stroke={gold} strokeWidth="1.6" />
        </g>
      );
    case 'hair':
      return (
        <g>
          <path d="M44 40 Q44 22 60 22 Q76 22 76 40 L80 74 Q60 60 40 74Z" fill="#16120f" />
          {face}
          <path d="M45 34 Q60 28 75 34" fill="none" stroke={gold} strokeWidth="1.8" />
        </g>
      );
    case 'pig':
      return (
        <g>
          {face}
          <path d="M47 33 Q60 20 73 33 Q60 28 47 33Z" fill={gold} stroke="#8a5f12" strokeWidth="0.6" />
        </g>
      );
    default:
      return face;
  }
}

function Ingot({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 9} ${y} q-3 -7 4 -6 h10 q7 -1 4 6 q-4 5 -9 5 q-5 0 -9 -5z`} fill="#f2c34a" stroke="#8a5f12" strokeWidth="0.8" />
    </g>
  );
}

function Blade() {
  return (
    <g>
      <path d="M96 44 V148" stroke="#6b3a1a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M96 22 Q112 24 108 46 Q104 56 96 52Z" fill="#dfe6ea" stroke="#8a97a0" strokeWidth="0.8" />
      <path d="M96 52 V44" stroke="#d8261b" strokeWidth="3" />
    </g>
  );
}
function Spear() {
  return (
    <g>
      <path d="M92 34 V148" stroke="#6b3a1a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M92 14 L97 34 H87Z" fill="#dfe6ea" stroke="#8a97a0" strokeWidth="0.8" />
      <path d="M92 34 q8 6 4 16 q-6 -2 -4 -16z" fill="#d8261b" />
    </g>
  );
}
function Rake() {
  return (
    <g>
      <path d="M94 62 V148" stroke="#6b3a1a" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="84" y="58" width="20" height="4" rx="1" fill="#cfd6da" stroke="#8a97a0" strokeWidth="0.6" />
      {[86, 90, 94, 98, 102].map((x) => (
        <path key={x} d={`M${x} 62 V72`} stroke="#cfd6da" strokeWidth="1.6" strokeLinecap="round" />
      ))}
    </g>
  );
}
function Staff({ dragon }: { dragon: boolean }) {
  return (
    <g>
      <path d="M92 46 V148" stroke="#6b3a1a" strokeWidth="2.6" strokeLinecap="round" />
      {dragon ? (
        <path d="M92 46 q-10 -4 -8 -14 q6 -4 10 2" fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
      ) : (
        <circle cx="92" cy="40" r="6" fill="none" stroke={GOLD} strokeWidth="2" />
      )}
    </g>
  );
}
function Sword() {
  return (
    <g>
      <path d="M92 52 V128" stroke="#dfe6ea" strokeWidth="3" strokeLinecap="round" />
      <path d="M84 128 H100" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      <path d="M92 128 V142" stroke="#6b3a1a" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Tiger() {
  return (
    <g>
      <ellipse cx="60" cy="122" rx="36" ry="20" fill="#e0902a" stroke="#8a4b0c" strokeWidth="1" />
      {[34, 44, 76, 86].map((x) => (
        <path key={x} d={`M${x} 106 q4 8 -1 16`} stroke="#2a1608" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      ))}
      <rect x="38" y="128" width="12" height="14" rx="5" fill="#f0a63a" stroke="#8a4b0c" strokeWidth="0.8" />
      <rect x="70" y="128" width="12" height="14" rx="5" fill="#f0a63a" stroke="#8a4b0c" strokeWidth="0.8" />
      <circle cx="42" cy="86" r="6" fill="#e0902a" stroke="#8a4b0c" strokeWidth="0.8" />
      <circle cx="78" cy="86" r="6" fill="#e0902a" stroke="#8a4b0c" strokeWidth="0.8" />
      <circle cx="60" cy="98" r="22" fill="#f0a63a" stroke="#8a4b0c" strokeWidth="1" />
      <path d="M52 80 v8 M60 78 v10 M68 80 v8 M56 82 h8" stroke="#2a1608" strokeWidth="2" strokeLinecap="round" />
      <circle cx="51" cy="98" r="3" fill="#fff6d8" />
      <circle cx="69" cy="98" r="3" fill="#fff6d8" />
      <circle cx="51" cy="98" r="1.6" fill="#2a1608" />
      <circle cx="69" cy="98" r="1.6" fill="#2a1608" />
      <ellipse cx="60" cy="108" rx="9" ry="7" fill="#fff0d0" />
      <path d="M56 105 h8 l-4 4z" fill="#8a2a1a" />
      <path d="M60 109 v3 M54 113 q6 4 12 0" stroke="#2a1608" strokeWidth="1.2" fill="none" />
      <path d="M44 106 H30 M44 110 H31 M76 106 H90 M76 110 H89" stroke="#fff0d0" strokeWidth="0.8" />
    </g>
  );
}

/** lighten (+) or darken (−) a #rrggbb colour */
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(amt >= 0 ? c + (255 - c) * amt : c * (1 + amt))));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
