import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    setLoggedOut(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (loggedOut) {
    return <Navigate to="/logout" />;
  }

  if (!user) {
    return <div>目前没有用户</div>;
  }

  return (
    <div>
      <h1>这是受路由保护的主页面啦</h1>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;