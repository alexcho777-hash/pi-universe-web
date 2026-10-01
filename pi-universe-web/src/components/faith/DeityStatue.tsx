/**
 * A small hand-drawn (SVG) statue of each Pantheon deity, sitting in a shrine niche on a
 * lotus pedestal. These are stylised icons built from a few body shapes + headwear + a held
 * object (no photos or copied artwork) so each deity reads at a glance by its traditional
 * attributes: Guan Gong's red face and long blade, Wenchang's brush, Nezha's spear and wheels…
 */
import { useId } from 'react';

export type Body = 'seated' | 'standing' | 'armor' | 'child' | 'tiger' | 'buddha' | 'fox';
export type Head =
  | 'mianliu' | 'phoenix' | 'scholar' | 'official' | 'helmet' | 'softhat' | 'veil' | 'dizang' | 'buns' | 'hair' | 'pig' | 'bald'
  | 'ushnisha' | 'elephant' | 'cone' | 'jata' | 'marian' | 'monkey' | 'hood' | 'eboshi' | 'plain';
export type Held =
  | 'blade' | 'sword' | 'spear' | 'rake' | 'staff' | 'whip' | 'ingot' | 'brush' | 'thread' | 'tablet' | 'peach' | 'baby' | 'vase' | 'pearl' | 'none'
  | 'trident' | 'mace' | 'lotus' | 'cross' | 'rosary' | 'book' | 'lily' | 'flower' | 'bow' | 'conch' | 'flute' | 'bowl' | 'wheel' | 'jar'
  | 'sheaf' | 'fish' | 'mallet' | 'mirror' | 'coin' | 'lamp' | 'drum';

export interface Look {
  body: Body;
  head: Head;
  held: Held;
  /** a second held object in the other hand (drawn mirrored) */
  held2?: Held;
  /** draw extra arms (multi-armed deities); they hold `held3`/`held4` */
  arms?: boolean;
  held3?: Held;
  held4?: Held;
  robe: string;
  trim?: string;
  skin?: string;
  beard?: 'long' | 'short' | 'none';
  beardColor?: string;
  halo?: boolean;
  extra?: 'turtle' | 'wheels' | 'lotus' | 'mouse' | 'lion';
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

export function DeityStatue({ deityKey, size = 120, look }: { deityKey: string; size?: number; look?: Look }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const L = look || LOOKS[deityKey] || LOOKS.mazu;
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

      {/* mandorla — the pointed-oval back light behind a revered figure */}
      <path d="M60 18 C 98 52 98 112 60 146 C 22 112 22 52 60 18 Z" fill="rgba(255,226,140,.07)" stroke="rgba(232,193,112,.5)" strokeWidth="0.9" />
      <path d="M60 25 C 91 56 91 108 60 138 C 29 108 29 56 60 25 Z" fill="none" stroke="rgba(232,193,112,.22)" strokeWidth="0.7" />
      {L.halo && (
        <>
          <circle cx="60" cy="46" r="27" fill="rgba(255,236,170,.2)" stroke="rgba(255,226,140,.85)" strokeWidth="1.6" />
          <circle cx="60" cy="46" r="22" fill="none" stroke="rgba(255,226,140,.4)" strokeWidth="0.8" />
          <circle cx="60" cy="46" r="30" fill="none" stroke="rgba(255,226,140,.25)" strokeWidth="0.6" strokeDasharray="1.5 2.5" />
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
      ) : L.body === 'fox' ? (
        <Fox />
      ) : (
        <>
          <g transform={L.body === 'child' ? 'translate(60 140) scale(.84) translate(-60 -140)' : undefined}>
            <Body kind={L.body} robe={`url(#robe${uid})`} robeDark={robeDark} trim={trim} gold={`url(#gold${uid})`} skin={skin} />
            {L.arms && <ExtraArms robe={`url(#robe${uid})`} robeDark={robeDark} />}
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
          <Attrs L={L} trim={trim} gold={`url(#gold${uid})`} />
        </>
      )}

      {L.extra === 'mouse' && (
        <g>
          <ellipse cx="90" cy="146" rx="8" ry="5" fill="#8d8d96" stroke="#55555d" strokeWidth="0.7" />
          <circle cx="97" cy="143" r="3.4" fill="#8d8d96" stroke="#55555d" strokeWidth="0.7" />
          <circle cx="95.5" cy="140.4" r="1.8" fill="#c4a0a0" />
          <path d="M82 147 q-8 2 -10 -4" fill="none" stroke="#c4a0a0" strokeWidth="1" />
        </g>
      )}
      {L.extra === 'lion' && (
        <g>
          <circle cx="32" cy="142" r="11" fill="#c98a2a" stroke="#7a4b10" strokeWidth="0.8" />
          <circle cx="32" cy="143" r="6.5" fill="#f0c36a" />
          <circle cx="29.5" cy="141.5" r="1" fill="#2a1608" />
          <circle cx="34.5" cy="141.5" r="1" fill="#2a1608" />
          <path d="M30 146 q2 1.6 4 0" stroke="#2a1608" strokeWidth="0.9" fill="none" />
        </g>
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

function Body({ kind, robe, robeDark, trim, gold, skin }: { kind: Body; robe: string; robeDark: string; trim: string; gold: string; skin?: string }) {
  if (kind === 'seated' || kind === 'buddha') {
    return (
      <g>
        <path d="M44 64 Q60 57 76 64 L82 100 Q98 118 102 140 L18 140 Q22 118 38 100 Z" fill={robe} stroke={robeDark} strokeWidth="1" />
        <path d="M44 64 Q30 92 40 116 L52 116 Q46 92 52 68Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
        <path d="M76 64 Q90 92 80 116 L68 116 Q74 92 68 68Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
        <path d="M54 64 L60 86 L66 64" fill="none" stroke={trim} strokeWidth="1.8" />
        <path d="M24 134 Q60 126 96 134" fill="none" stroke={trim} strokeWidth="1.2" opacity="0.8" />
        <path d="M50 100 Q44 118 34 136 M58 104 Q56 120 54 134 M70 104 Q74 120 80 134 M78 98 Q88 114 94 134" fill="none" stroke={robeDark} strokeWidth="0.9" opacity="0.55" strokeLinecap="round" />
        <path d="M44 66 Q40 80 41 96" fill="none" stroke={shade('#ffffff', 0)} strokeWidth="0.8" opacity="0.18" />
        {kind === 'buddha' ? (
          <path d="M60 64 L77 66 L80 96 Q70 104 62 100 Z" fill={skin} stroke="#a77c45" strokeWidth="0.8" />
        ) : (
          <rect x="45" y="104" width="30" height="4" rx="2" fill={gold} opacity="0.9" />
        )}
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
      {!armor && <path d="M48 96 Q46 118 44 138 M56 100 Q55 120 54 138 M64 100 Q65 120 66 138 M72 96 Q74 118 76 138" fill="none" stroke={robeDark} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />}
      <path d="M45 64 Q41 78 40 92" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.16" />
    </g>
  );
}

function Head({ kind, skin, trim, gold, beard, beardColor, robe }: { kind: Head; skin: string; trim: string; gold: string; beard?: string; beardColor?: string; robe: string }) {
  const fid = useId().replace(/:/g, '');
  const fierce = ['helmet', 'official', 'hair'].includes(kind) || skin === '#c0392b';
  const face = (
    <g>
      {kind === 'pig' ? (
        <>
          <path d="M47 36 L42 24 L54 32Z M73 36 L78 24 L66 32Z" fill={skin} stroke="#b9736c" strokeWidth="0.8" />
          <circle cx="60" cy="45" r="14" fill={skin} stroke="#b9736c" strokeWidth="0.8" />
          <ellipse cx="60" cy="50" rx="7.5" ry="5.4" fill="#f3b8b0" stroke="#b9736c" strokeWidth="0.8" />
          <circle cx="57.5" cy="50" r="1.1" fill="#7a3d38" />
          <circle cx="62.5" cy="50" r="1.1" fill="#7a3d38" />
          <path d="M49.5 39.5 L57 41.8 M70.5 39.5 L63 41.8" stroke="#3a2a1a" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M51 44 q3 -2 6 0 M63 44 q3 -2 6 0" stroke="#3a2a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <defs>
            <radialGradient id={`fs${fid}`} cx="45%" cy="38%" r="70%">
              <stop offset="0" stopColor={shade(skin, 0.14)} />
              <stop offset="0.65" stopColor={skin} />
              <stop offset="1" stopColor={shade(skin, -0.22)} />
            </radialGradient>
          </defs>
          <path d="M53.5 54 L53 65 Q60 69 67 65 L66.5 54Z" fill={shade(skin, -0.2)} stroke="#a77c45" strokeWidth="0.6" />
          <ellipse cx="48.4" cy="46.5" rx="2" ry="3.6" fill={shade(skin, -0.08)} stroke="#a77c45" strokeWidth="0.6" />
          <ellipse cx="71.6" cy="46.5" rx="2" ry="3.6" fill={shade(skin, -0.08)} stroke="#a77c45" strokeWidth="0.6" />
          <path d="M48 31 Q60 25 72 31 L71.5 40 Q60 36 48.5 40Z" fill="none" />
          <path d="M51 31 Q44 44 51 57 Q60 63.4 69 57 Q76 44 69 31 Q60 26 51 31Z" fill={`url(#fs${fid})`} stroke="#a77c45" strokeWidth="0.8" />
          <ellipse cx="53.4" cy="50" rx="3.4" ry="2.4" fill="#d9786a" opacity="0.13" />
          <ellipse cx="66.6" cy="50" rx="3.4" ry="2.4" fill="#d9786a" opacity="0.13" />
          <path d="M59 43 Q58.4 47 57.2 49.8 M61 43 Q61.6 47 62.8 49.8" stroke={shade(skin, -0.28)} strokeWidth="0.7" fill="none" opacity="0.7" strokeLinecap="round" />
          {fierce ? (
            <>
              <path d="M49.5 40.5 L57 42.2 M70.5 40.5 L63 42.2" stroke="#2a1608" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M51 44 q3 -1.8 6 0 q-3 1.8 -6 0 M63 44 q3 -1.8 6 0 q-3 1.8 -6 0" fill="#fff6e6" stroke="#2a1608" strokeWidth="0.8" />
              <circle cx="54" cy="44" r="1.1" fill="#2a1608" />
              <circle cx="66" cy="44" r="1.1" fill="#2a1608" />
              <path d="M60 45 v4.5 M56.6 52.6 q3.4 1.2 6.8 0" stroke="#6b2a1a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M60.4 49.6 q-1.6 0.8 -3 0.2 M59.6 49.6 q1.6 0.8 3 0.2" stroke="#6b2a1a" strokeWidth="0.7" fill="none" opacity="0.8" />
            </>
          ) : (
            <>
              <path d="M50.4 41 q3.4 -1.9 6.8 -0.2 M62.8 40.8 q3.4 -1.7 6.8 0.2" stroke="#4a3220" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M51.2 43.6 q3.2 -1.6 6.4 0 q-3.2 2.6 -6.4 0Z M62.4 43.6 q3.2 -1.6 6.4 0 q-3.2 2.6 -6.4 0Z" fill={shade(skin, -0.3)} opacity="0.55" />
              <path d="M51.2 43.8 q3.2 1.9 6.4 0 M62.4 43.8 q3.2 1.9 6.4 0" stroke="#2a1608" strokeWidth="1.15" fill="none" strokeLinecap="round" />
              <path d="M51.6 42.6 q3 -1.4 6 0 M62.4 42.6 q3 -1.4 6 0" stroke={shade(skin, -0.35)} strokeWidth="0.6" fill="none" opacity="0.8" />
              <path d="M60.4 49.6 q-1.6 0.8 -3 0.2 M59.6 49.6 q1.6 0.8 3 0.2" stroke="#8a4a32" strokeWidth="0.7" fill="none" opacity="0.8" />
              <path d="M56.4 52.6 q3.6 1.2 7.2 0 q-3.6 2 -7.2 0Z" fill="#b5594a" stroke="#8a4a32" strokeWidth="0.5" />
            </>
          )}
          {['ushnisha', 'veil', 'marian'].includes(kind) && <circle cx="60" cy="38" r="1" fill="#c0392b" />}
        </>
      )}
      {beard === 'short' && (
        <g fill={beardColor}>
          <path d="M52.5 50.4 Q60 46.6 67.5 50.4 Q64 52.6 60 51.4 Q56 52.6 52.5 50.4Z" />
          <path d="M56.6 55 Q60 68 63.4 55 Q60 57 56.6 55Z" />
        </g>
      )}
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
    case 'ushnisha':
      return (
        <g>
          <ellipse cx="45" cy="48" rx="2.6" ry="7" fill={skin} stroke="#a77c45" strokeWidth="0.6" />
          <ellipse cx="75" cy="48" rx="2.6" ry="7" fill={skin} stroke="#a77c45" strokeWidth="0.6" />
          {face}
          <path d="M46.5 41 Q46 28 60 28 Q74 28 73.5 41 Q60 35 46.5 41Z" fill="#2a3358" />
          <circle cx="60" cy="25" r="5.4" fill="#2a3358" />
          <path d="M60 19 q-2 -5 0 -9 q3 4 0 9Z" fill="#ffb02e" />
          {[50, 56, 62, 68].map((x) => <circle key={x} cx={x} cy={33} r="1.5" fill="#3b4778" />)}
        </g>
      );
    case 'elephant':
      return (
        <g>
          <ellipse cx="42" cy="44" rx="9" ry="13" fill="#b9a99c" stroke="#7d6e62" strokeWidth="0.8" />
          <ellipse cx="78" cy="44" rx="9" ry="13" fill="#b9a99c" stroke="#7d6e62" strokeWidth="0.8" />
          <circle cx="60" cy="43" r="14" fill="#c9baad" stroke="#7d6e62" strokeWidth="0.8" />
          <path d="M60 47 Q60 62 50 66" fill="none" stroke="#c9baad" strokeWidth="7" strokeLinecap="round" />
          <path d="M60 47 Q60 62 50 66" fill="none" stroke="#7d6e62" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M55 52 Q51 60 54 64 M65 52 Q69 60 66 64" fill="none" stroke="#fffaf0" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="54" cy="40" r="1.4" fill="#2a1608" />
          <circle cx="66" cy="40" r="1.4" fill="#2a1608" />
          <path d="M47 33 L50 22 L55 29 L60 18 L65 29 L70 22 L73 33Z" fill={gold} stroke="#8a5f12" strokeWidth="0.7" />
          <circle cx="60" cy="33" r="1.3" fill="#d8261b" />
        </g>
      );
    case 'cone':
      return (
        <g>
          {face}
          <path d="M47 35 L60 2 L73 35Z" fill={gold} stroke="#8a5f12" strokeWidth="0.7" />
          <path d="M51 28 H69 M54 20 H66 M57 12 H63" stroke="#8a5f12" strokeWidth="0.9" />
          <rect x="46" y="33" width="28" height="4" rx="1.5" fill={gold} stroke="#8a5f12" strokeWidth="0.6" />
          <circle cx="60" cy="35" r="1.6" fill="#d8261b" />
        </g>
      );
    case 'jata':
      return (
        <g>
          <path d="M44 42 Q44 24 60 24 Q76 24 76 42 L80 74 Q60 62 40 74Z" fill="#241b16" />
          {face}
          <circle cx="60" cy="19" r="7.5" fill="#241b16" />
          <path d="M66 14 a6 6 0 1 1 -2 10 a4.6 4.6 0 1 0 2 -10Z" fill="#fff6c8" stroke="#d9c26a" strokeWidth="0.5" />
          <path d="M58 33 v6" stroke="#d8261b" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M50 37 H70 M51 40 H69" stroke="#f4f0e6" strokeWidth="0.9" opacity="0.9" />
        </g>
      );
    case 'marian':
      return (
        <g>
          <path d="M43 54 Q42 26 60 26 Q78 26 77 54 L86 112 L34 112 Z" fill="#2f5aa8" stroke="#1c3a73" strokeWidth="0.8" />
          <path d="M47 50 Q47 30 60 30 Q73 30 73 50 Q60 44 47 50Z" fill="#f6f3ea" />
          {face}
          {Array.from({ length: 9 }).map((_, i) => {
            const a = Math.PI + (i / 8) * Math.PI;
            return <circle key={i} cx={60 + Math.cos(a) * 22} cy={44 + Math.sin(a) * 22} r="1.9" fill="#ffe27a" />;
          })}
        </g>
      );
    case 'monkey':
      return (
        <g>
          <circle cx="45" cy="43" r="5.5" fill="#c9783a" stroke="#7a4220" strokeWidth="0.7" />
          <circle cx="75" cy="43" r="5.5" fill="#c9783a" stroke="#7a4220" strokeWidth="0.7" />
          <circle cx="60" cy="43" r="14" fill="#d98a47" stroke="#7a4220" strokeWidth="0.8" />
          <ellipse cx="60" cy="48" rx="9" ry="8" fill="#f0c9a0" />
          <circle cx="55.5" cy="42" r="1.5" fill="#2a1608" />
          <circle cx="64.5" cy="42" r="1.5" fill="#2a1608" />
          <path d="M56 52 q4 3 8 0" stroke="#7a3d2a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M47 33 L50 24 L55 30 L60 20 L65 30 L70 24 L73 33Z" fill={gold} stroke="#8a5f12" strokeWidth="0.7" />
        </g>
      );
    case 'hood':
      return (
        <g>
          <path d="M43 54 Q42 26 60 26 Q78 26 77 54 L84 96 L36 96 Z" fill={robe} stroke="#00000055" strokeWidth="0.8" />
          {face}
        </g>
      );
    case 'eboshi':
      return (
        <g>
          {face}
          <path d="M47 36 Q47 20 62 14 Q70 24 73 36 Q60 31 47 36Z" fill="#15151b" stroke={trim} strokeWidth="0.6" />
        </g>
      );
    case 'plain':
      return face;
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
      <path d="M44 93 L56 98 M76 93 L64 98" stroke="#2a1608" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M46 99 q5 -4 10 0 q-5 3 -10 0 M64 99 q5 -4 10 0 q-5 3 -10 0" fill="#ffd34a" stroke="#2a1608" strokeWidth="0.9" />
      <ellipse cx="51" cy="99" rx="1.1" ry="2" fill="#2a1608" />
      <ellipse cx="69" cy="99" rx="1.1" ry="2" fill="#2a1608" />
      <ellipse cx="60" cy="109" rx="10" ry="7" fill="#fff0d0" />
      <path d="M56 105 h8 l-4 4z" fill="#5a1a10" />
      <path d="M60 109 v3 M52 112 q8 5 16 0" stroke="#2a1608" strokeWidth="1.3" fill="none" />
      <path d="M54.5 113 l1.6 5 l1.8 -4.2 M66 113 l-1.6 5 l-1.8 -4.2" fill="#fffdf4" stroke="#2a1608" strokeWidth="0.5" />
      <path d="M44 106 H30 M44 110 H31 M76 106 H90 M76 110 H89" stroke="#fff0d0" strokeWidth="0.8" />
    </g>
  );
}

function ExtraArms({ robe, robeDark }: { robe: string; robeDark: string }) {
  return (
    <g>
      <path d="M44 66 Q22 70 18 96 L26 98 Q32 80 46 74Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
      <path d="M76 66 Q98 70 102 96 L94 98 Q88 80 74 74Z" fill={robe} stroke={robeDark} strokeWidth="0.8" />
    </g>
  );
}

/** Small held objects. Coordinates are for the figure's right hand (x≈92); `mirror` flips them to the left. */
function HeldItem({ kind, trim, gold }: { kind: Held; trim: string; gold: string }) {
  switch (kind) {
    case 'trident':
      return (
        <g>
          <path d="M92 40 V148" stroke="#6b3a1a" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M83 30 Q83 42 92 42 Q101 42 101 30 M92 42 V14 M83 30 L83 22 M101 30 L101 22" fill="none" stroke="#dfe6ea" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case 'mace':
      return (
        <g>
          <path d="M92 74 V148" stroke="#6b3a1a" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="92" cy="64" r="11" fill={gold} stroke="#8a5f12" strokeWidth="1" />
          {[[92, 54], [82, 64], [102, 64], [92, 74]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#8a5f12" />)}
        </g>
      );
    case 'lotus':
      return (
        <g>
          <path d="M88 130 Q86 116 88 104" stroke="#4c9a4a" strokeWidth="1.8" fill="none" />
          {[-14, 0, 14].map((r) => <ellipse key={r} cx="88" cy="98" rx="4.4" ry="9" fill="#f7a6c0" stroke="#d1647f" strokeWidth="0.6" transform={`rotate(${r} 88 106)`} />)}
        </g>
      );
    case 'cross':
      return (
        <g>
          <path d="M92 46 V148" stroke="#6b3a1a" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M84 56 H100 M92 46 V66" stroke={trim} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'rosary':
      return (
        <g>
          <path d="M82 108 Q70 128 60 132" fill="none" stroke="#6b3a1a" strokeWidth="1" />
          {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={82 - i * 2.7} cy={108 + i * 2.7 + (i > 5 ? 0 : 0)} r="1.7" fill="#f3ecd6" stroke="#8a7a50" strokeWidth="0.4" />)}
          <path d="M60 132 v8 M57 136 h6" stroke={trim} strokeWidth="1.6" />
        </g>
      );
    case 'book':
      return (
        <g transform="rotate(-8 84 108)">
          <rect x="76" y="98" width="16" height="20" rx="1.5" fill="#5a2a1c" stroke={trim} strokeWidth="0.8" />
          <path d="M80 104 H88 M80 108 H88" stroke={trim} strokeWidth="0.8" />
        </g>
      );
    case 'lily':
      return (
        <g>
          <path d="M88 132 Q86 112 90 94" stroke="#4c9a4a" strokeWidth="1.8" fill="none" />
          <path d="M90 94 q-8 -8 -4 -16 q6 4 4 16 q8 -10 14 -6 q-4 8 -14 6Z" fill="#fffaf0" stroke="#cbbf9a" strokeWidth="0.6" />
        </g>
      );
    case 'flower':
      return (
        <g>
          <path d="M88 130 Q87 116 88 102" stroke="#4c9a4a" strokeWidth="1.6" fill="none" />
          {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="88" cy="96" rx="3" ry="5.4" fill="#ff9ec0" transform={`rotate(${r} 88 100)`} />)}
          <circle cx="88" cy="100" r="2.2" fill="#ffd34a" />
        </g>
      );
    case 'bow':
      return (
        <g>
          <path d="M96 48 Q112 84 96 120" fill="none" stroke="#6b3a1a" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M96 48 L96 120" stroke="#e8e0cc" strokeWidth="0.8" />
        </g>
      );
    case 'conch':
      return (
        <g>
          <path d="M80 108 Q80 96 92 98 Q100 100 96 110 Q92 118 82 114 Z" fill="#fffaf0" stroke="#bda97a" strokeWidth="0.8" />
          <path d="M84 106 q4 -4 8 0" stroke="#bda97a" strokeWidth="0.8" fill="none" />
        </g>
      );
    case 'flute':
      return <path d="M46 112 L96 92" stroke="#7a4b1c" strokeWidth="3" strokeLinecap="round" />;
    case 'bowl':
      return (
        <g>
          <path d="M46 114 Q60 134 74 114Z" fill="#1d1d24" stroke={trim} strokeWidth="0.8" />
          <ellipse cx="60" cy="114" rx="14" ry="3" fill="#2d2d38" stroke={trim} strokeWidth="0.6" />
        </g>
      );
    case 'wheel':
      return (
        <g>
          <circle cx="92" cy="98" r="10" fill="none" stroke={gold} strokeWidth="2" />
          <circle cx="92" cy="98" r="2.4" fill={gold} />
          {[0, 45, 90, 135].map((r) => <path key={r} d="M92 88 V108" stroke={gold} strokeWidth="1.2" transform={`rotate(${r} 92 98)`} />)}
        </g>
      );
    case 'jar':
      return (
        <g>
          <path d="M52 110 h16 l2 10 q0 8 -10 8 q-10 0 -10 -8Z" fill="#3a5fb0" stroke={trim} strokeWidth="0.9" />
          <rect x="54" y="106" width="12" height="5" rx="2" fill={gold} />
        </g>
      );
    case 'sheaf':
      return (
        <g>
          {[-8, -3, 2, 7].map((d) => <path key={d} d={`M${90 + d} 126 Q${88 + d * 1.4} 104 ${86 + d * 2} 84`} stroke="#d9b43a" strokeWidth="1.6" fill="none" />)}
          {[-8, -3, 2, 7].map((d) => <ellipse key={d} cx={86 + d * 2} cy={82} rx="2.4" ry="5" fill="#f0c94a" />)}
        </g>
      );
    case 'fish':
      return (
        <g>
          <path d="M72 112 Q86 100 100 112 Q86 124 72 112Z" fill="#e8553a" stroke="#8a2a1a" strokeWidth="0.8" />
          <path d="M100 112 L108 104 L108 120Z" fill="#e8553a" stroke="#8a2a1a" strokeWidth="0.8" />
          <circle cx="78" cy="110" r="1.2" fill="#2a1608" />
        </g>
      );
    case 'mallet':
      return (
        <g>
          <path d="M90 122 L84 92" stroke="#6b3a1a" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="74" y="80" width="22" height="14" rx="3" fill={gold} stroke="#8a5f12" strokeWidth="1" transform="rotate(-14 84 87)" />
        </g>
      );
    case 'mirror':
      return (
        <g>
          <path d="M90 134 L90 116" stroke="#6b3a1a" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="90" cy="104" r="11" fill="#dfe6ea" stroke={gold} strokeWidth="2.2" />
          <path d="M84 100 q4 -5 10 -3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'coin':
      return (
        <g>
          <circle cx="90" cy="102" r="9" fill={gold} stroke="#8a5f12" strokeWidth="1.2" />
          <rect x="86.5" y="98.5" width="7" height="7" fill="none" stroke="#8a5f12" strokeWidth="1" />
        </g>
      );
    case 'lamp':
      return (
        <g>
          <path d="M78 114 Q90 126 104 114 Q92 118 78 114Z" fill="#c98a2a" stroke="#7a4b10" strokeWidth="0.8" />
          <path d="M92 114 q-4 -8 0 -14 q4 6 0 14Z" fill="#ffd54a" />
        </g>
      );
    case 'drum':
      return (
        <g>
          <path d="M82 94 L102 94 L92 106 L102 118 L82 118 L92 106Z" fill="#c98a2a" stroke="#7a4b10" strokeWidth="0.8" />
          <path d="M92 106 Q104 104 104 116" fill="none" stroke="#6b3a1a" strokeWidth="0.9" />
        </g>
      );
    default:
      return null;
  }
}

function Attrs({ L, trim, gold }: { L: Look; trim: string; gold: string }) {
  const NEW: Held[] = ['trident', 'mace', 'lotus', 'cross', 'rosary', 'book', 'lily', 'flower', 'bow', 'conch', 'flute', 'bowl', 'wheel', 'jar', 'sheaf', 'fish', 'mallet', 'mirror', 'coin', 'lamp', 'drum'];
  const has = (h?: Held): h is Held => !!h && NEW.includes(h);
  return (
    <g>
      {has(L.held) && <HeldItem kind={L.held} trim={trim} gold={gold} />}
      {L.held2 && has(L.held2) && (
        <g transform="translate(120 0) scale(-1 1)">
          <HeldItem kind={L.held2} trim={trim} gold={gold} />
        </g>
      )}
      {L.held3 && has(L.held3) && (
        <g transform="translate(18 -34) scale(.55)">
          <HeldItem kind={L.held3} trim={trim} gold={gold} />
        </g>
      )}
      {L.held4 && has(L.held4) && (
        <g transform="translate(102 -34) scale(-.55 .55)">
          <HeldItem kind={L.held4} trim={trim} gold={gold} />
        </g>
      )}
    </g>
  );
}

function Fox() {
  return (
    <g>
      <path d="M84 134 Q112 128 106 98 Q100 112 88 116Z" fill="#f2f0ea" stroke="#9a9488" strokeWidth="0.8" />
      <path d="M84 134 Q104 132 100 112" fill="none" stroke="#e8923a" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="58" cy="118" rx="28" ry="22" fill="#f2f0ea" stroke="#9a9488" strokeWidth="0.9" />
      <path d="M36 134 Q58 126 80 134 L80 142 H36Z" fill="#f2f0ea" stroke="#9a9488" strokeWidth="0.8" />
      <path d="M42 70 L38 46 L54 62Z M78 70 L82 46 L66 62Z" fill="#f2f0ea" stroke="#9a9488" strokeWidth="0.9" />
      <path d="M43 62 L41 52 L49 60Z M77 62 L79 52 L71 60Z" fill="#d8261b" />
      <path d="M36 80 Q60 52 84 80 Q86 100 60 104 Q34 100 36 80Z" fill="#f2f0ea" stroke="#9a9488" strokeWidth="0.9" />
      <path d="M48 82 Q51 79 54 82 M66 82 Q69 79 72 82" stroke="#2a1608" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M56 92 L64 92 L60 97Z" fill="#2a1608" />
      <path d="M42 94 Q60 118 78 94" fill="none" stroke="#d8261b" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <circle cx="60" cy="108" r="4" fill="#ffd34a" stroke="#8a5f12" strokeWidth="0.6" />
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
