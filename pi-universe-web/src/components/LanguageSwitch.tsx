/**
 * Language picker pinned to the top-right corner of every page: a small button showing
 * the current language, which opens a menu of 中文 / English / Tiếng Việt / ภาษาไทย.
 */
import { useState } from 'react';
import { ButtonBase, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useI18n, Lang } from '../i18n/i18n';

const LANGS: { value: Lang; short: string; label: string }[] = [
  { value: 'zh', short: '中文', label: '中文' },
  { value: 'en', short: 'EN', label: 'English' },
  { value: 'vi', short: 'Việt', label: 'Tiếng Việt' },
  { value: 'th', short: 'ไทย', label: 'ภาษาไทย' },
];

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const current = LANGS.find((l) => l.value === lang) || LANGS[0];

  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-label="Language / 語言"
        aria-haspopup="menu"
        aria-expanded={!!anchor}
        sx={{
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          gap: 0.4,
          pl: 1.1,
          pr: 0.4,
          py: 0.5,
          borderRadius: 999,
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#5B2A93',
          backgroundColor: 'rgba(255,255,255,.92)',
          boxShadow: '0 1px 6px rgba(0,0,0,.25)',
        }}
      >
        <TranslateIcon sx={{ fontSize: '1.05rem' }} />
        {current.short}
        <ArrowDropDownIcon sx={{ fontSize: '1.3rem' }} />
      </ButtonBase>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 1400 }}
      >
        {LANGS.map((l) => (
          <MenuItem
            key={l.value}
            selected={l.value === lang}
            onClick={() => {
              setLang(l.value);
              setAnchor(null);
            }}
            sx={{ minWidth: 170 }}
          >
            <ListItemText>{l.label}</ListItemText>
            {l.value === lang && (
              <ListItemIcon sx={{ minWidth: 0, ml: 1 }}>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
