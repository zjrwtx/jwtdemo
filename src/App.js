import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import HomePage from './HomePage';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentUpdateContent = `
  第1版更新通知
  `;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const savedUpdateContent = localStorage.getItem('updateContent');
      if (savedUpdateContent !== currentUpdateContent) {
        setShowModal(true);
        localStorage.setItem('updateContent', currentUpdateContent);
      }
    }
  }, [currentUpdateContent]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowModal(true);
    localStorage.setItem('updateContent', currentUpdateContent);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('hasSeenModal', 'true');
  };

  return (
    <Router>
      <CssBaseline />
      <Routes>
      
        <Route path="/" element={<HomePage
          isLoggedIn={isLoggedIn} 
          showModal={showModal} 
          handleCloseModal={handleCloseModal} 
          onLoginSuccess={handleLoginSuccess} 
        />} />
      </Routes>
    </Router>
  );
};

export default App;
