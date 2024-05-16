import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      // 检查用户是否存在
      const userCheckResponse = await axios.post('http://127.0.0.1:8000/check_user', {
        username: data.username,
      });

      if (!userCheckResponse.data.exists) {
        setErrorMessage('账号不存在,请先注册');
        return;
      }

      // 用户存在，进行登录
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
      setErrorMessage('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input {...register('username')} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register('password')} />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
