/**
 * Bottom Navigation Component
 */

import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const navItems = [
  { path: '/', label: ['首頁', 'Home'], icon: HomeIcon },
  { path: '/calendar', label: ['農民曆', 'Almanac'], icon: CalendarMonthIcon },
  { path: '/acknowledgments', label: ['功德簿', 'Merit'], icon: StarIcon },
  { path: '/profile', label: ['資料', 'Profile'], icon: PersonIcon },
  { path: '/settings', label: ['設置', 'Settings'], icon: SettingsIcon },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { tr } = useI18n();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        // Above page content (the home globe's floating labels), below dialogs and menus
        zIndex: 1100,
        boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
      }}
      elevation={3}
    >
      <BottomNavigation value={currentPath} onChange={handleChange} showLabels sx={{ height: 'auto', minHeight: 64 }}>
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={tr(item.label[0], item.label[1])}
            value={item.path}
            icon={<item.icon />}
            sx={{
              // Dark enough to read easily (older eyes, bright screens); the current page is purple and bold
              color: currentPath === item.path ? '#D4AF37' : '#9c8b64',
              minWidth: 0,
              px: 0.25,
              py: 0.8,
              '& .MuiSvgIcon-root': { fontSize: '1.75rem' },
              '& .MuiBottomNavigationAction-label': { fontSize: '0.9rem', fontWeight: 600, mt: 0.2, lineHeight: 1.15, textAlign: 'center', wordBreak: 'keep-all' },
              '&.Mui-selected': {
                color: '#D4AF37',
              },
              '&.Mui-selected .MuiBottomNavigationAction-label': { fontSize: '0.95rem', fontWeight: 800 },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
