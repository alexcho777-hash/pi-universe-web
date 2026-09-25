/**
 * π Universe Web - Main App Component
 */

import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useAuthStore } from './stores/authStore';
import HomePage from './pages/HomePage';
import AcknowledgmentsPage from './pages/AcknowledgmentsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import SanctuaryPage from './pages/SanctuaryPage';
import Navigation from './components/Navigation';
import LanguageSwitch from './components/LanguageSwitch';
import { useI18n } from './i18n/i18n';

// The almanac engine is large, so the calendar page loads only when opened
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const OraclePage = lazy(() => import('./pages/OraclePage'));
const calendarRoute = (
  <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}>
    <CalendarPage />
  </Suspense>
);

// Create Material-UI theme (replace React Native Paper colors)
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // π Universe primary blue
    },
    secondary: {
      main: '#D4AF37', // Gold
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Noto Sans TC", "Noto Sans JP", sans-serif',
    // Larger base size so the site is easy to read for all ages (MUI default is 14)
    fontSize: 16,
    // Keep "π" and "Pi" as written (the default uppercase turns them into "Π" / "PI")
    button: { textTransform: 'none' },
  },
});

export default function App() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  const { tr } = useI18n();

  useEffect(() => {
    // Initialize auth on app load
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageSwitch />
      <Router>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Main content */}
            <Box sx={{ flex: 1, overflow: 'auto', pb: 8 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/acknowledgments" element={<AcknowledgmentsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
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
