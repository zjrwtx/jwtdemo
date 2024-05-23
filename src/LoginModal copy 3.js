import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import "./output.css"; // 确保你有一个 Tailwind CSS 文件或其他自定义样式文件

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
      setErrorMessage('登录失败，请检查手机号和密码');
    }
  };

  const handleRegister = async (data) => {
    if (data.password.length < 8) {
      setErrorMessage('密码必须大于8位');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/register', {
        username: data.username,
        email: data.email,
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">
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
              <label className="block text-gray-700">手机号:</label>
              <input
                {...register('username')}
                className="w-3/4 px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="请输入手机号"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">密码:</label>
              <input
                type="password"
                {...register('password')}
                className="w-3/4 px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="请输入密码"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="w-ful bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              登录
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <label className="block text-gray-700">手机号:</label>
              <input
                {...register('username')}
                className="w-3/4 px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="请输入手机号"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">邮箱:</label>
              <input
                type="email"
                {...register('email')}
                className="w-3/4 px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="请输入邮箱"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">密码:</label>
              <input
                type="password"
                {...register('password')}
                className="w-3/4 px-3 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="请输入密码"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="w-3/4 bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              注册
            </button>
          </form>
        )}
        <div className="mt-6 text-center">
          <p className="text-gray-600">关注我们的公众号</p>
          <img src="../public/test.png" alt="二维码" className="mx-auto w-320 h-320" />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
