/**
 * 迎接儀式（寫實版）——訪客走進聖地時，兩旁列隊的數百位信眾在金光中迎來、
 * 齊身一拜，再隨金光散去，讓訪客安心參拜。
 *
 * 構成：三張「實攝感人群景深圖」（遠景／中景／近景）分層疊在大殿之上，
 * 各自緩慢推進形成視差縱深感——不用數百個 DOM 或 Canvas 節點，手機不卡。
 * 先前的扁平 SVG 小人已移除，改以真實莊嚴的人群質感呈現。
 */
import { useEffect } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { useI18n, tx } from '../../i18n/i18n';
import crowdFar from '../../assets/crowd/c_far.jpg';
import crowdMid from '../../assets/crowd/c_mid.jpg';
import crowdNear from '../../assets/crowd/c_near.jpg';
import { crowdFor } from './backdrops';

/** 一次儀式的長度（秒），以下所有動畫都以此為刻度 */
const T = 16;

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

// ---------------------------------------------------------------- animation

/** 全場生命週期：開場淡入，尾聲隨金光散去 */
const life = keyframes`
  0%   { opacity: 0; }
  3%   { opacity: 1; }
  90%  { opacity: 1; }
  98%  { opacity: 0; }
  100% { opacity: 0; }
`;

/** 中央走道的柔金光 */
const aisleGlow = keyframes`
  0%   { opacity: 0; }
  20%  { opacity: .8; }
  88%  { opacity: .7; }
  97%  { opacity: 0; }
  100% { opacity: 0; }
`;

/** 遠景：最先現身，緩慢推進 */
const farIn = keyframes`
  0%   { opacity: 0; transform: scale(1.14); }
  16%  { opacity: .88; transform: scale(1.17); }
  90%  { opacity: .72; transform: scale(1.30); }
  97%  { opacity: 0; transform: scale(1.33); }
  100% { opacity: 0; transform: scale(1.33); }
`;

/** 中景：延後現身，推進稍快（視差） */
const midIn = keyframes`
  0%   { opacity: 0; transform: scale(1.08); }
  22%  { opacity: .92; transform: scale(1.11); }
  90%  { opacity: .8; transform: scale(1.38); }
  97%  { opacity: 0; transform: scale(1.42); }
  100% { opacity: 0; transform: scale(1.42); }
`;

/** 近景：最後現身，兩側裁邊、推進最快 */
const nearIn = keyframes`
  0%   { opacity: 0; transform: scale(1.02); }
  30%  { opacity: 1; }
  90%  { opacity: .9; transform: scale(1.50); }
  97%  { opacity: 0; transform: scale(1.55); }
  100% { opacity: 0; transform: scale(1.55); }
`;

/** 該宗教專屬的迎賓人群照：鏡頭緩緩走進列隊、全場一同俯身致敬（輕微下沉），最後穿過光暈接進大殿 */
const ownIn = keyframes`
  0%   { opacity: 0; transform: scale(1) translateY(0); }
  9%   { opacity: 1; transform: scale(1.03) translateY(0); }
  44%  { opacity: 1; transform: scale(1.10) translateY(0); }
  50%  { opacity: 1; transform: scale(1.115) translateY(1.6%); }
  58%  { opacity: 1; transform: scale(1.125) translateY(0); }
  80%  { opacity: 1; transform: scale(1.18) translateY(0); }
  100% { opacity: 0; transform: scale(1.30) translateY(0); }
`;

/** 結尾的暖金光暈：把人群照與後面的大殿內景融在一起 */
const bloom = keyframes`
  0%   { opacity: 0; }
  66%  { opacity: 0; }
  86%  { opacity: .55; }
  100% { opacity: 0; }
`;

/** 四周暗角：讓人群照與大殿內景有同樣的光線質感 */
const vignetteIn = keyframes`
  0%   { opacity: 0; }
  8%   { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; }
`;

/** 歡祝詞浮現：下方淡入、停留、淡出 */
const pop = keyframes`
  0%   { opacity: 0; transform: translate(-50%, 6px); }
  22%  { opacity: 0; transform: translate(-50%, 6px); }
  32%  { opacity: 1; transform: translate(-50%, 0); }
  74%  { opacity: 1; transform: translate(-50%, 0); }
  86%  { opacity: 0; transform: translate(-50%, -4px); }
  100% { opacity: 0; transform: translate(-50%, -4px); }
`;

// ---------------------------------------------------------------- the ceremony

export function WelcomeCeremony({ religionType, onDone }: { religionType: string; onDone: () => void }) {
  const { tr, lang } = useI18n();

  // welcomehold=1：把儀式「停格」在中段（截圖／設計檢視用），只對帶此參數的頁面生效
  const hold = typeof window !== 'undefined' && window.location.href.includes('welcomehold=1');

  useEffect(() => {
    if (hold) return;
    const id = window.setTimeout(onDone, (T + 0.5) * 1000);
    return () => window.clearTimeout(id);
  }, [onDone, hold]);

  const own = crowdFor(religionType);
  const layers = [
    { src: crowdFar, anim: farIn, delay: hold ? 0 : 0, staticOpacity: 0.88, pos: 'center 42%', z: 1 },
    { src: crowdMid, anim: midIn, delay: hold ? 0 : 1.6, staticOpacity: 0.9, pos: 'center 52%', z: 2 },
    { src: crowdNear, anim: nearIn, delay: hold ? 0 : 3.6, staticOpacity: 0.95, pos: 'center 62%', z: 3 },
  ];

  return (
    <Box
      aria-hidden="false"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: hold ? 1 : undefined,
        animation: hold ? 'none' : `${life} ${T}s ease-in-out both`,
      }}
    >
      {/* 中央走道的柔金光，把隊伍「請」出來 */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 55%, rgba(255,214,130,.30), rgba(255,214,130,0) 62%)',
          mixBlendMode: 'screen',
          opacity: hold ? 0.75 : 0,
          animation: hold ? 'none' : `${aisleGlow} ${T}s ease-in-out both`,
        }}
      />

      {/* 該宗教專屬的迎賓人群照（有的話就用它，不再每個聖地都一樣） */}
      {own && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            backgroundImage: `url(${own})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 55%',
            opacity: hold ? 1 : 0,
            transform: hold ? 'scale(1.12)' : undefined,
            animation: hold ? 'none' : `${ownIn} ${T}s cubic-bezier(.3,.1,.4,1) both`,
            pointerEvents: 'none',
          }}
        />
      )}
      {own && (
        <>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, rgba(8,4,0,.55) 100%), linear-gradient(180deg, rgba(8,4,0,.25) 0%, rgba(8,4,0,0) 30%, rgba(8,4,0,.45) 100%)',
              opacity: hold ? 1 : 0,
              animation: hold ? 'none' : `${vignetteIn} ${T}s ease-in-out both`,
              pointerEvents: 'none',
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 4,
              background: 'radial-gradient(ellipse at 50% 48%, rgba(255,214,130,.85), rgba(255,170,70,.25) 45%, rgba(255,170,70,0) 70%)',
              mixBlendMode: 'screen',
              opacity: 0,
              animation: hold ? 'none' : `${bloom} ${T}s ease-in-out both`,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* 通用三層人群（只有找不到專屬照片時才用）：遠 → 中 → 近 */}
      {!own && layers.map((L, i) => (
        <Box
          key={i}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: L.z,
            backgroundImage: `url(${L.src})`,
            backgroundSize: 'cover',
            backgroundPosition: L.pos,
            mixBlendMode: 'screen',
            opacity: hold ? L.staticOpacity : 0,
            transform: hold ? 'scale(1.18)' : undefined,
            animation: hold ? 'none' : `${L.anim} ${T}s cubic-bezier(.25,.6,.35,1) ${L.delay}s both`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* the greeting：下方的金色題字，不用方框與表情符號，和照片同一種質感 */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: { xs: '15%', sm: '14%' },
          width: 'max-content',
          maxWidth: '86%',
          px: 3,
          pt: 1.2,
          pb: 1.1,
          textAlign: 'center',
          wordBreak: 'keep-all',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(10,5,0,.62), rgba(10,5,0,0) 72%)',
          zIndex: 9,
          opacity: hold ? 1 : 0,
          transform: hold ? 'translate(-50%, 0)' : undefined,
          animation: hold ? 'none' : `${pop} ${T}s ease-out both`,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            fontFamily: '"Noto Serif TC", Georgia, serif',
            fontSize: { xs: '1.55rem', sm: '1.9rem' },
            fontWeight: 700,
            letterSpacing: '.04em',
            lineHeight: 1.25,
            color: '#f7dd9a',
            textShadow: '0 2px 10px rgba(0,0,0,.85), 0 0 18px rgba(255,200,110,.35)',
          }}
        >
          {greeting(religionType, lang).replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '').trim()}
        </Box>
        <Box sx={{ width: 54, height: '1px', mx: 'auto', my: 0.7, background: 'linear-gradient(90deg, transparent, rgba(247,221,154,.9), transparent)' }} />
        <Box sx={{ fontSize: { xs: '0.98rem', sm: '1.1rem' }, color: 'rgba(255,243,212,.92)', letterSpacing: '.12em', textShadow: '0 1px 6px rgba(0,0,0,.85)' }}>
          {tr('歡迎蒞臨', 'Welcome')}
        </Box>
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
