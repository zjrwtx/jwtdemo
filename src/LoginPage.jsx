import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
      navigate('/');
    } catch (error) {
      alert('登录失败，请检查用户名和密码');
      navigate('/register');
    }
  };

  return (
    <div>
      <h2>还没登录这样 要Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input {...register('username')} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register('password')} />
        </div>
      
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;

