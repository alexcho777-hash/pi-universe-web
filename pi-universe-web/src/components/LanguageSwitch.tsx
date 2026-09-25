/**
 * 中文 / EN switch, pinned to the top-right corner of every page.
 */
import { Box, ButtonBase } from '@mui/material';
import { useI18n, Lang } from '../i18n/i18n';

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n();
  const item = (value: Lang, label: string) => (
    <ButtonBase
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      sx={{
        px: 1.3,
        py: 0.5,
        fontSize: '0.95rem',
        fontWeight: 700,
        borderRadius: 999,
        color: lang === value ? '#fff' : '#555',
        backgroundColor: lang === value ? '#2563EB' : 'transparent',
      }}
    >
      {label}
    </ButtonBase>
  );
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex: 1300,
        display: 'flex',
        gap: 0.3,
        p: 0.4,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,.92)',
        boxShadow: '0 1px 6px rgba(0,0,0,.25)',
      }}
    >
      {item('zh', '中文')}
      {item('en', 'EN')}
    </Box>
  );
}
