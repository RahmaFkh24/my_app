
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage'; // Import Signup page
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import CalendarPage from '@/pages/CalendarPage';
import SchedulerPage from '@/pages/SchedulerPage';
import PostsPage from '@/pages/PostsPage';
import MediaPage from '@/pages/MediaPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AccountsPage from '@/pages/AccountsPage';
import SettingsPage from '@/pages/SettingsPage';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster


// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isNewUser = localStorage.getItem('isNewUser') !== 'false';

  if (!isAuthenticated) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (isNewUser) {
    // Logged in but hasn't completed onboarding
    return <Navigate to="/login" replace />;
  }
  // Logged in and onboarding complete
  return children;
};

// OnboardingRoute component
const OnboardingRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isNewUser = localStorage.getItem('isNewUser') !== 'false';

  if (!isAuthenticated) {
    // Not logged in, cannot access onboarding
    return <Navigate to="/login" replace />;
  }

  if (!isNewUser) {
    // Logged in but already onboarded, go to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  // Logged in and needs onboarding
  return children;
};


// PublicOnlyRoute component (for Landing, Login, Signup)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isNewUser = localStorage.getItem('isNewUser') !== 'false';

  if (isAuthenticated) {
    // User is logged in
    if (isNewUser) {
      // Needs onboarding, redirect there
      return <Navigate to="/login" replace />;
    } else {
      // Already onboarded, redirect to dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }
  // User is not logged in, allow access to public route
  return children;
};


function AppContent() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicOnlyRoute><LandingPage /></PublicOnlyRoute>} />
          <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
          <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} /> {/* Add signup route */}

          {/* Onboarding Route */}
          <Route path="/onboarding" element={<OnboardingRoute><OnboardingPage /></OnboardingRoute>} />

          {/* Protected Routes within Layout */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scheduler"
              element={
                <ProtectedRoute>
                  <SchedulerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <PostsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/media"
              element={
                <ProtectedRoute>
                  <MediaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <AccountsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Route>


          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

// Main App component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


export default App;
