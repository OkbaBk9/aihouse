import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import PublicLayout from './components/layout/PublicLayout';
import PrivateLayout from './components/layout/PrivateLayout';
import BrainLoader from './components/core/BrainLoader';
import LanguageSwitcher from './components/core/LanguageSwitcher';
import CursorAshes from './components/core/CursorAshes';

// Public Pages
import Home from './pages/public/Home';
import { Discover, Blogs, News } from './pages/public/PublicPages';

// Auth Flow
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboards
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import Formation from './pages/dashboard/Formation';
import Heatmap from './pages/dashboard/Heatmap';
import Network from './pages/dashboard/Network';
import WorkshopList from './pages/dashboard/workshops/WorkshopList';
import CreateWorkshop from './pages/dashboard/workshops/CreateWorkshop';
import AdminUsers from './pages/dashboard/admin/AdminUsers';
import AdminContent from './pages/dashboard/admin/AdminContent';
import StudentCourses from './pages/dashboard/StudentCourses';
import RectorateView from './pages/dashboard/RectorateView';

// Utility
import { Privacy, Contact } from './pages/utility/StaticPages';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/auth/login" />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" /> : children;
}

function AppContent() {
  const { isChanging } = useLanguage();
  return (
    <>
      <CursorAshes />
      {isChanging && <BrainLoader />}
      <Routes>
        {/* PUBLIC LAYOUT */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="news" element={<News />} />

          <Route path="auth/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="auth/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="auth/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

          <Route path="privacy" element={<Privacy />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* PRIVATE DASHBOARD LAYOUT */}
        <Route path="/dashboard" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="formation" element={<Formation />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="network" element={<Network />} />
          <Route path="profile" element={<Profile />} />
          <Route path="workshops" element={<WorkshopList />} />
          <Route path="workshops/new" element={<CreateWorkshop />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/content" element={<AdminContent />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="rectorate" element={<RectorateView />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
