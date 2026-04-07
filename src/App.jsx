import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import PartnerDashboard from './pages/PartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ element, authState, requiredRole }) => {
  if (!authState?.isLoggedIn) return <Navigate to="/login" replace />;

  const currentRole = authState?.roleKey || authState?.role?.toLowerCase();
  const expectedRole = requiredRole?.toLowerCase();
  if (expectedRole && currentRole !== expectedRole) return <Navigate to="/" replace />;

  return element;
};

const App = () => {
  const { authState, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-indigo-600 font-semibold">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home authState={authState} onLogout={logout} />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/partner"
          element={<ProtectedRoute element={<PartnerDashboard authState={authState} />} authState={authState} requiredRole="partner" />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard authState={authState} />} authState={authState} requiredRole="admin" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
