import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup from './Page/Signup';
import ForgotPassword from './Page/ForgotPassword';
import Login from './Page/login';
import MainLayout from './MainLayout';
import Assistants from './components/agentSetup/agentList';
import CreateAgent from './components/agentSetup/create';
import ConfigureAgent from './components/agentSetup/ConfigureAgent';

const App: React.FC = () => {
  // State to store login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('user'));

  // Listen for changes to local storage to update login status dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Private Routes - Protected by login check */}
        <Route path="/" element={isLoggedIn ? <MainLayout/>  : <Navigate to="/login" />}>
          <Route index element={<Assistants />} />
          <Route path="campaigns" element={<Assistants />} />
          <Route path="create-agent" element={<CreateAgent />} />
          <Route path="configure-agent" element={<ConfigureAgent />} />

        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
