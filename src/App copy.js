import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginModal from './LoginModal';
import Dashboard from './Dashboard';
import HomePage from './HomePage';

// const HomePage = () => <div>欢迎来到主页</div>;

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => setShowModal(true));
    } else {
      setShowModal(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        {showModal && <LoginModal onLoginSuccess={handleLoginSuccess} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
