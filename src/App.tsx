import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import MainLayout from './components/layout/MainLayout';
import ConfigureAgent from './components/agent/ConfigureAgent';
import CreateAgent from './components/agent/Create';
import Login from './components/auth/Login';
import Agents from './components/agent/AgentList';
import Profile from './components/home/Profile';
import PhoneNumbers from './components/phone-numbers/ImportPhoneNumber';
import Overview from './components/home/Overview';

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
          <Route index element={<Overview />} />
          <Route path="agents" element={<Agents />} />
          <Route path="create-agent" element={<CreateAgent />} />
          <Route path="configure-agent" element={<ConfigureAgent />} />
          <Route path="profile" element={<Profile />} />
          <Route path='phone-numbers' element={<PhoneNumbers/>}/>

        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
