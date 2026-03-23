import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import PartnerDashboard from './pages/PartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ element, authState, requiredRole }) => {
  if (!authState?.isLoggedIn) return <Navigate to="/login" replace />;
  if (requiredRole && authState.role !== requiredRole) return <Navigate to="/" replace />;
  return element;
};

const App = () => {
  const [authState, setAuthState] = useState(null);

  const handleLogin = (userData) => {
    setAuthState({ ...userData, isLoggedIn: true });
  };

  const handleLogout = () => {
    setAuthState(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home authState={authState} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
        <Route
          path="/partner"
          element={<ProtectedRoute element={<PartnerDashboard authState={authState} />} authState={authState} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard authState={authState} />} authState={authState} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
