import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 清除本地存储中的令牌
    localStorage.removeItem('token');
    // 重定向到登录页面
    navigate('/Products');
  }, [navigate]);

  return null;  // 不需要显示任何内容
};

export default LogoutPage;