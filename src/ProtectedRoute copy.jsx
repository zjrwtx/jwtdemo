import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
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

  if (!user) {
    return <Navigate to="/login" />;
  }
  else
    return children;

};


export default ProtectedRoute;
