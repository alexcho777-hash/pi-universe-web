/**
 * π Universe Web - Main App Component
 */

import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box, CssBaseline, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import { useAuthStore } from './stores/authStore';
import HomePage from './pages/HomePage';
import AcknowledgmentsPage from './pages/AcknowledgmentsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import { useAdminStore } from './stores/adminStore';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import SanctuaryPage from './pages/SanctuaryPage';
import Navigation from './components/Navigation';
import LanguageSwitch from './components/LanguageSwitch';
import { useI18n } from './i18n/i18n';
import { PREVIEW } from './preview/demoData';

// The almanac engine is large, so the calendar page loads only when opened
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const OraclePage = lazy(() => import('./pages/OraclePage'));
const calendarRoute = (
  <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
    <CalendarPage />
  </Suspense>
);

// Create Material-UI theme (replace React Native Paper colors).
// Arabic is right-to-left: the page gets dir="rtl" (set in useI18n) and the theme knows it.
const makeTheme = (rtl: boolean) =>
  createTheme({
    direction: rtl ? 'rtl' : 'ltr',
      palette: {
      // 夜色莊準主題：全站每一頁共享深色炭黑＋燸金蠟光的廟宇氣勢
      mode: 'dark',
      primary: {
        main: '#D4AF37', // temple gold
        contrastText: '#241a08',
      },
      secondary: {
        main: '#F5D67B', // warm glow gold
      },
      background: {
        default: '#100c07',
        paper: '#17130d',
      },
      text: {
        primary: '#f2ead9',
        secondary: '#d8cdb6',
      },
    },
    typography: {
      fontFamily: 'Roboto, "Noto Sans TC", "Noto Sans JP", "Noto Sans Arabic", Tahoma, sans-serif',
      // Larger base size so the site is easy to read for all ages (MUI default is 14)
      fontSize: 16,
      // Keep "π" and "Pi" as written (the default uppercase turns them into "Π" / "PI")
      button: { textTransform: 'none' },
    },
  });
const THEMES = { ltr: makeTheme(false), rtl: makeTheme(true) };

export default function App() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  // Design preview (URL contains "preview=1"): browse with demo data, no login needed
  const authed = PREVIEW || isAuthenticated;
  const { tr, rtl } = useI18n();
  const theme = rtl ? THEMES.rtl : THEMES.ltr;

  useEffect(() => {
    // Design preview (URL has "preview=1"): skip Pi authentication entirely
    if (PREVIEW) return;
    // Initialize auth on app load
    initialize();
  }, [initialize]);

  // Ask the server whether this user is the owner / an administrator (it decides, not the app)
  const refreshAdmin = useAdminStore((s) => s.refresh);
  const clearAdmin = useAdminStore((s) => s.clear);
  useEffect(() => {
    if (isAuthenticated) refreshAdmin();
    else clearAdmin();
  }, [isAuthenticated, refreshAdmin, clearAdmin]);

  if (isLoading && !PREVIEW) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Right-to-left: back / previous / next arrows (className="flip-rtl") point the other way */}
      <GlobalStyles
        styles={{
          '[dir="rtl"] .flip-rtl': {
            transform: 'scaleX(-1)',
          },
        }}
      />
      <LanguageSwitch />
      <Router>
        {authed ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Main content */}
            <Box sx={{ flex: 1, overflow: 'auto', pb: 11 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/acknowledgments" element={<AcknowledgmentsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/calendar" element={calendarRoute} />
                <Route path="/sanctuary/:id" element={<SanctuaryPage />} />
                <Route
                  path="/oracle"
                  element={
                    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
                      <OraclePage />
                    </Suspense>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>

            {/* Bottom navigation */}
            <Navigation />
          </Box>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route
              path="/calendar"
              element={
                <Box sx={{ minHeight: '100vh' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1.5 }}>
                    <a href="/login" style={{ fontSize: '1.05rem' }}>{tr('登入 π Universe →', 'Sign in to π Universe →')}</a>
                  </Box>
                  {calendarRoute}
                </Box>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}
