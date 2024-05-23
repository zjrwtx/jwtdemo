import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import "./output.css"
const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data) => {
    try {
      const userCheckResponse = await axios.post('http://127.0.0.1:8000/check_user', {
        username: data.username,
      });

      if (!userCheckResponse.data.exists) {
        setErrorMessage('账号不存在，请先注册');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/token', qs.stringify({
        username: data.username,
        password: data.password,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      localStorage.setItem('token', response.data.access_token);
      onClose();
      navigate('/');
    } catch (error) {
      setErrorMessage('登录失败，请检查用户名和密码');
    }
  };

  const handleRegister = async (data) => {
    try {
      await axios.post('http://127.0.0.1:8000/register', {
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        password: data.password,
      });
      setIsLogin(true);
    } catch (error) {
      setErrorMessage('注册失败，请检查信息');
    }
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setErrorMessage('');
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            onClick={switchToLogin}
            className={`font-bold ${isLogin ? 'text-blue-500' : 'text-gray-500'}`}
          >
            登录
          </button>
          <button
            onClick={switchToRegister}
            className={`font-bold ${!isLogin ? 'text-blue-500' : 'text-gray-500'}`}
          >
            注册
          </button>
        </div>
        {isLogin ? (
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="block text-gray-700">用户名:</label>
              <input
                {...register('username')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="请输入用户名"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">密码:</label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="请输入密码"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
            >
              登录
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <label className="block text-gray-700">用户名:</label>
              <input
                {...register('username')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="请输入用户名"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">邮箱:</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="请输入邮箱"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">全名:</label>
              <input
                {...register('full_name')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="请输入全名"
              />
            </div>
            <div>
              <label className="block text-gray-700">密码:</label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="请输入密码"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
            >
              注册
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
