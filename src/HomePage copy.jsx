import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import MainPage from './beforehomepage';

const HomePage = ({ user }) => {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {!user ? (
        <MainPage/>
      ) : (
        <div>
          <MainPage/>
          <h2>Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
