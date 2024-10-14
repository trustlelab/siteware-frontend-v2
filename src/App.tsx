import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import MainLayout from './components/layout/MainLayout';
import ConfigureAgent from './components/agent/ConfigureAgent';
import CreateAgent from './components/agent/Create';
import Login from './components/auth/Login';
import Agents from './components/agent/AgentList';
import Profile from './components/dashboard/Profile';
import PhoneNumbers from './components/phone-numbers/ImportPhoneNumber';
import Overview from './components/dashboard/Overview';
import SetNewPassword from './components/dashboard/SetNewPassword';
import Voices from './components/dashboard/Voices';
import Files from './components/dashboard/Files';

/**
 *
 */
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('user'));

  const handleStorageChange = useCallback((): void => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, []);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return (): void => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" />}>
          <Route index element={<Overview />} />
          <Route path="agents" element={<Agents />} />
          <Route path="create-agent" element={<CreateAgent />} />
          <Route path="configure-agent" element={<ConfigureAgent />} />
          <Route path="profile" element={<Profile />} />
          <Route path="phone-numbers" element={<PhoneNumbers />} />
          <Route path="update-password" element={<SetNewPassword />} />
          <Route path='voices' element={<Voices/>}/>
          <Route path='files' element={<Files/>}/>

        </Route>

        <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
