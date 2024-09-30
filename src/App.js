import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Page/Home';
import Signup from './Page/Signup';
import ForgotPassword from './Page/ForgotPassword';
import Login from './Page/login';


const App = () => {
  const isLoggedIn = !!localStorage.getItem('user'); // Check if user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
};

export default App;
