import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

// Public Pages
import PublicLayout from '@/layouts/PublicLayout';
import HomePage from '@/pages/public/HomePage';
import AppsPage from '@/pages/public/AppsPage';
import AppDetailPage from '@/pages/public/AppDetailPage';
import PremiumPage from '@/pages/public/PremiumPage';
import CategoriesPage from '@/pages/public/CategoriesPage';
import SearchPage from '@/pages/public/SearchPage';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
import ProfilePage from '@/pages/public/ProfilePage';
import AboutPage from '@/pages/public/AboutPage';
import TestimonialsPage from '@/pages/public/TestimonialsPage';

// Admin Pages
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminApps from '@/pages/admin/AdminApps';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminPremium from '@/pages/admin/AdminPremium';
import AdminTestimonials from '@/pages/admin/AdminTestimonials';
import AdminServer from '@/pages/admin/AdminServer';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminLogs from '@/pages/admin/AdminLogs';

// Hooks
import { useAuthStore } from '@/store/authStore';

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && user?.role !== 'admin' && user?.role !== 'superadmin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="axelux-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="apps" element={<AppsPage />} />
            <Route path="apps/:id" element={<AppDetailPage />} />
            <Route path="premium" element={<PremiumPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:category" element={<AppsPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route 
              path="profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="apps" element={<AdminApps />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="premium" element={<AdminPremium />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="server" element={<AdminServer />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="logs" element={<AdminLogs />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

export default App;
