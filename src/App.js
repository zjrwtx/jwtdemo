import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, } from 'react-router-dom';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};
const Homepage =() => {
  return (
    <div>
      <h1>这是根域名首屏加载页面，无导航，仿https://chatglm.cn/ 用于介绍产品公司和联系方式等</h1>
      <h2>上中下三部分布局（antd），上面简要文字介绍+视频演示（加立即体验按钮），中间各种功能详细介绍（加立即体验按钮），下面是联系方式（邮箱+微信）与加入我们（飞书招聘页面），且旁边有虚拟导航按钮导航到各个上中下部分内容</h2>
      <Link to="/products" >立即体验qfactory</Link>
      {/* 主页内容 */}
    </div>
  );
};
const Products = () => (
  <div>
    <h2>这是qfactory产品的使用主页面666</h2>
    <p>展示暂存使用过程，然后用户点击创建自己的qfactory的时候就悬浮验证登录注册组件，开始保护路由</p>
    <Link to="/protected" >创建我的ppt</Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Products" element={<Products />} />
        <Route
          path="/protected"
          element={
            <PrivateRoute>
              <ProtectedPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App
