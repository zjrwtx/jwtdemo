import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@mui/material';

const LoginModal = ({ onLoginSuccess }) => {
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
      onLoginSuccess();  // 登录成功后调用传递的回调函数
     
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
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle>{isLogin ? '登录' : '注册'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isLogin ? '请输入您的手机号和密码进行登录。' : '请输入您的手机号、邮箱和密码进行注册。'}
        </DialogContentText>
        <form onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)} noValidate>
          <Box my={2}>
            <TextField
              fullWidth
              label="手机号"
              {...register('username')}
              variant="outlined"
              margin="normal"
              required
            />
            {!isLogin && (
              <TextField
                fullWidth
                label="邮箱"
                {...register('email')}
                variant="outlined"
                margin="normal"
                required
              />
            )}
            <TextField
              fullWidth
              label="密码"
              type="password"
              {...register('password')}
              variant="outlined"
              margin="normal"
              required
            />
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
          </Box>
          <DialogActions>
            <Button onClick={switchToLogin} color="primary">
              登录
            </Button>
            <Button onClick={switchToRegister} color="primary">
              注册
            </Button>
          </DialogActions>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {isLogin ? '登录' : '注册'}
          </Button>
        </form>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            关注我们的公众号
          </Typography>
          <img src="/gzh.jpg" alt="二维码" style={{ width: 160, height: 160 }} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
