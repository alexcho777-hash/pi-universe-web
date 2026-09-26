/**
 * 中文 / EN / Việt / ไทย switch, pinned to the top-right corner of every page.
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
        px: 1.1,
        py: 0.5,
        fontSize: '0.85rem',
        fontWeight: 700,
        borderRadius: 999,
        color: lang === value ? '#fff' : '#555',
        backgroundColor: lang === value ? '#5B2A93' : 'transparent',
        whiteSpace: 'nowrap',
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
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        maxWidth: 150,
        gap: 0.2,
        p: 0.4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,.92)',
        boxShadow: '0 1px 6px rgba(0,0,0,.25)',
      }}
    >
      {item('en', 'EN')}
      {item('zh', '中文')}
      {item('vi', 'Việt')}
      {item('th', 'ไทย')}
    </Box>
  );
}
