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
        boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
      }}
      elevation={3}
    >
      <BottomNavigation value={currentPath} onChange={handleChange} showLabels>
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={tr(item.label[0], item.label[1])}
            value={item.path}
            icon={<item.icon />}
            sx={{
              color: currentPath === item.path ? '#2563EB' : '#999',
              '&.Mui-selected': {
                color: '#2563EB',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
