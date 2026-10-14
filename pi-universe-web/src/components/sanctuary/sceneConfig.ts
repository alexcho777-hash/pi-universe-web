/**
 * What each sanctuary's 3D hall is built from: architecture, light and small floating
 * things. Statues appear only where the worship itself centres on one (the Thai
 * Four-Faced Buddha and the Vietnamese Thần Tài altar, see Altars.tsx) — never in the
 * other halls.
 */

export type ParticleKind = 'smoke' | 'dust' | 'petals' | 'leaves' | 'embers' | 'sparkle';
export type AmbientKind = 'temple' | 'folk' | 'vietnam' | 'thai' | 'church' | 'cathedral' | 'mosque' | 'shrine' | 'mandir';
/** Shape of the repeated roof-beam silhouette along the hall (the "temple trio" used to
 *  look identical apart from colour — this is what tells them apart at a glance now). */
export type BeamStyle = 'flat' | 'upturned' | 'swallowtail' | 'curved';
/** A one-off distant silhouette near the light at the far end of the hall, shaped after
 *  each religion's own landmark architecture. */
export type LandmarkKind =
  | 'pagoda'
  | 'shrine_roof'
  | 'tam_quan'
  | 'stupa'
  | 'steeple'
  | 'cathedral_facade'
  | 'dome_minarets'
  | 'torii_far'
  | 'gopuram';

export interface SceneConfig {
  /** Background (top → horizon) */
  sky: [string, string];
  /** Floor (near → far) */
  floor: [string, string];
  /** Side walls / ceiling */
  wall: string;
  /** Floor grid lines */
  grid: string;
  /** Light at the far end of the hall, "r,g,b" */
  glow: string;
  /** Distance between repeated elements (pillar pairs, gates…) */
  spacing: number;
  /** Walking speed, units per second */
  speed: number;
  pillar?: { color: string; shade: string; cap?: string; width: number; taper?: boolean };
  beam?: string;
  beamStyle?: BeamStyle;
  landmark?: LandmarkKind;
  arch?: { style: 'round' | 'pointed' | 'horseshoe'; color: string; width: number };
  torii?: { color: string; black: string };
  lantern?: { style: 'round' | 'lamp' | 'star'; color: string; glow: string };
  garland?: string;
  flames?: 'candles' | 'diyas';
  shafts?: string[];
  particles: { kind: ParticleKind; color: string; count: number };
  ambient: AmbientKind;
}

const templeBase = {
  wall: '#2a0f08',
  grid: 'rgba(255,200,120,.10)',
  spacing: 3.2,
  speed: 0.35,
  beam: '#5a1a10',
};

export const SCENES: Record<string, SceneConfig> = {
  buddhist: {
    ...templeBase,
    sky: ['#1a0a05', '#4a2410'],
    floor: ['#3b2413', '#170b05'],
    glow: '255,205,110',
    pillar: { color: '#8e1d14', shade: '#4d0d08', cap: '#d4af37', width: 0.34 },
    beamStyle: 'upturned',
    landmark: 'pagoda',
    lantern: { style: 'round', color: '#e8b04a', glow: '255,190,90' },
    particles: { kind: 'smoke', color: '220,210,200', count: 26 },
    ambient: 'temple',
  },
  taiwan_folk: {
    ...templeBase,
    sky: ['#200604', '#5c1a0c'],
    floor: ['#43200f', '#1a0804'],
    glow: '255,170,80',
    pillar: { color: '#a3170f', shade: '#560b07', cap: '#e8c170', width: 0.34 },
    beamStyle: 'swallowtail',
    landmark: 'shrine_roof',
    lantern: { style: 'round', color: '#d8261b', glow: '255,90,60' },
    particles: { kind: 'smoke', color: '225,215,205', count: 34 },
    ambient: 'folk',
  },
  vietnamese_folk: {
    ...templeBase,
    sky: ['#1c0703', '#5a200a'],
    floor: ['#4a2a0e', '#1a0a03'],
    glow: '255,200,90',
    pillar: { color: '#9c1c12', shade: '#520c07', cap: '#e0b640', width: 0.3 },
    beamStyle: 'curved',
    landmark: 'tam_quan',
    lantern: { style: 'round', color: '#f2c230', glow: '255,210,90' },
    particles: { kind: 'sparkle', color: '255,215,110', count: 30 },
    ambient: 'vietnam',
  },
  thai_four_face: {
    sky: ['#1d1004', '#6b3f0c'],
    floor: ['#5a3a12', '#1c1004'],
    wall: '#2a1805',
    grid: 'rgba(255,215,120,.12)',
    glow: '255,215,120',
    spacing: 3.0,
    speed: 0.32,
    pillar: { color: '#c9962a', shade: '#6e4b10', cap: '#ffe08a', width: 0.3, taper: true },
    garland: '#f59a1b',
    landmark: 'stupa',
    particles: { kind: 'petals', color: '250,160,40', count: 26 },
    ambient: 'thai',
  },
  christian: {
    sky: ['#0f1016', '#2a2a36'],
    floor: ['#4a443c', '#16140f'],
    wall: '#1c1b22',
    grid: 'rgba(255,255,255,.07)',
    glow: '255,245,225',
    spacing: 3.4,
    speed: 0.3,
    pillar: { color: '#b8ad98', shade: '#5f5748', width: 0.3 },
    arch: { style: 'round', color: '#a89d88', width: 0.16 },
    landmark: 'steeple',
    shafts: ['255,235,190', '255,250,235'],
    particles: { kind: 'dust', color: '255,245,220', count: 40 },
    ambient: 'church',
  },
  catholic: {
    sky: ['#0d0b12', '#2b2233'],
    floor: ['#4a3f35', '#15110c'],
    wall: '#1b1620',
    grid: 'rgba(255,230,190,.07)',
    glow: '255,225,160',
    spacing: 3.4,
    speed: 0.28,
    pillar: { color: '#b3a58a', shade: '#5a4f3e', width: 0.32 },
    arch: { style: 'pointed', color: '#a3957a', width: 0.16 },
    landmark: 'cathedral_facade',
    flames: 'candles',
    shafts: ['230,60,60', '70,110,230', '250,200,70', '120,200,120'],
    particles: { kind: 'dust', color: '255,235,200', count: 34 },
    ambient: 'cathedral',
  },
  islamic: {
    sky: ['#06141a', '#12343a'],
    floor: ['#6a2a2a', '#1c0b0b'],
    wall: '#0c1f24',
    grid: 'rgba(230,200,120,.13)',
    glow: '220,240,210',
    spacing: 3.0,
    speed: 0.3,
    pillar: { color: '#e8e2d4', shade: '#8a8474', width: 0.26 },
    arch: { style: 'horseshoe', color: '#1f7a6a', width: 0.2 },
    landmark: 'dome_minarets',
    lantern: { style: 'star', color: '#e6c36a', glow: '255,215,130' },
    particles: { kind: 'dust', color: '240,235,210', count: 30 },
    ambient: 'mosque',
  },
  shinto: {
    sky: ['#0d1410', '#2f3b2c'],
    floor: ['#8a8374', '#2a2720'],
    wall: '#101a12',
    grid: 'rgba(0,0,0,.10)',
    glow: '255,250,235',
    spacing: 1.6,
    speed: 0.45,
    torii: { color: '#d8401f', black: '#1b1b1b' },
    landmark: 'torii_far',
    particles: { kind: 'leaves', color: '120,170,90', count: 22 },
    ambient: 'shrine',
  },
  hindu: {
    sky: ['#1c0802', '#6b2a08'],
    floor: ['#5a3a1c', '#1c0f05'],
    wall: '#2b1106',
    grid: 'rgba(255,180,90,.12)',
    glow: '255,170,60',
    spacing: 3.0,
    speed: 0.32,
    pillar: { color: '#b98a55', shade: '#5c3f1f', cap: '#e39b2d', width: 0.34 },
    garland: '#ff8c1a',
    landmark: 'gopuram',
    flames: 'diyas',
    particles: { kind: 'embers', color: '255,160,60', count: 30 },
    ambient: 'mandir',
  },
};

SCENES.theravada = {
  sky: ['#1a0e03', '#7a4a0a'],
  floor: ['#6b4a14', '#1c1204'],
  wall: '#2a1a05',
  grid: 'rgba(255,215,120,.12)',
  glow: '255,200,90',
  spacing: 3.0,
  speed: 0.32,
  pillar: { color: '#d9a43a', shade: '#7a5410', cap: '#ffe08a', width: 0.3, taper: true },
  garland: '#f0b429',
  landmark: 'stupa',
  particles: { kind: 'petals', color: '255,190,80', count: 24 },
  ambient: 'thai',
};

SCENES.tibetan_buddhist = {
  ...templeBase,
  sky: ['#1a0606', '#5a1410'],
  floor: ['#4a1a10', '#160604'],
  glow: '255,190,80',
  pillar: { color: '#8e1d14', shade: '#4a0c08', cap: '#e8b73a', width: 0.34 },
  beamStyle: 'flat',
  landmark: 'stupa',
  lantern: { style: 'lamp', color: '#f2b82e', glow: '255,200,90' },
  garland: '#2f6ea5',
  particles: { kind: 'smoke', color: '230,210,190', count: 30 },
  ambient: 'temple',
};

SCENES.mongol_shaman = {
  sky: ['#06182e', '#2a6aa8'],
  floor: ['#6a7a3a', '#1a2410'],
  wall: '#0c2038',
  grid: 'rgba(255,255,255,.06)',
  glow: '200,230,255',
  spacing: 3.4,
  speed: 0.3,
  garland: '#3a8ee0',
  particles: { kind: 'leaves', color: '170,200,120', count: 22 },
  ambient: 'shrine',
};

SCENES.orthodox = {
  sky: ['#120a06', '#3a2410'],
  floor: ['#5a4020', '#180f06'],
  wall: '#1c1208',
  grid: 'rgba(255,215,120,.09)',
  glow: '255,215,130',
  spacing: 3.4,
  speed: 0.28,
  pillar: { color: '#c9a24a', shade: '#6a5018', cap: '#ffe08a', width: 0.3 },
  arch: { style: 'round', color: '#b8923a', width: 0.16 },
  landmark: 'cathedral_facade',
  flames: 'candles',
  shafts: ['255,225,150', '255,240,200'],
  particles: { kind: 'dust', color: '255,235,190', count: 36 },
  ambient: 'cathedral',
};

export const sceneFor = (religionType?: string): SceneConfig => SCENES[religionType || ''] || SCENES.buddhist;
