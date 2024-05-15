import axios from 'axios';
import { Navigate} from 'react-router-dom';
import qs from 'qs';

const API_URL = 'http://127.0.0.1:8000';

export  const login = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/token', qs.stringify({
        username: data.username,
        password: data.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      localStorage.setItem('token', response.data.access_token);
      Navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

export const register = async (user) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};

export const getUser = async (token) => {
    const response = await axios.get(`${API_URL}/users/me/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const logout = async (token) => {
    await axios.post(`${API_URL}/logout`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
