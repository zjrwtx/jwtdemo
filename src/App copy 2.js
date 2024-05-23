import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginModal from './LoginModal';
import Dashboard from './Dashboard';
import HomePage from './HomePage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data);
      })
      .catch(() => setShowModal(true));
    } else {
      setShowModal(true);
    }
  }, []);

  const handleLoginSuccess = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true);
      setUser(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        {showModal && <LoginModal onLoginSuccess={handleLoginSuccess} />}
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
