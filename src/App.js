import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineHome, AiOutlineFileText, AiOutlineProfile, AiFillWechat , AiOutlineOrderedList, AiOutlineAppstoreAdd } from 'react-icons/ai';

import './output.css';
import HomePage from './HomePage'; 
import NoteNotes from './notenotes';
import SubscriptionPlans from './paidsubscriber';
import Mindmap from './mindmap';
import Watchmindmap from './watchmindmap';

const { Header, Content, Sider, Footer } = Layout;

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const menuItems = [
    { key: '/', icon: <AiOutlineHome />, label: '题目生成', path: '/' },
    { key: '/notenotes', icon: <AiOutlineFileText />, label: '文章笔记生成', path: '/notenotes' },
    { key: '/mindmap', icon: <AiOutlineProfile />, label: '思维导图生成', path: '/mindmap' },
    { key: '/Watchmindmap', icon: <AiOutlineOrderedList />, label: '实时编辑思维导图', path: '/Watchmindmap' },
    { key: '/SubscriptionPlans', icon: <AiOutlineAppstoreAdd />, label: '升级为vip', path: '/SubscriptionPlans' },
    { key: '/contactandwebsite', icon: < AiFillWechat />, label: '联系与官网', path: 'https://n4xpgfy3fn.feishu.cn/docx/CyXEdI0LOoAQfCxv7kSc21m8nYs?from=from_copylink' },
  ];

  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flexGrow: 1 }}>
              <h1 style={{ color: 'white' }}>不挂科AI:让大学生一天拿下一门期末</h1>
            </div>
            {!isMobile && (
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                {menuItems.map(item => (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            )}
          </div>
        </Header>
        <Layout>
          {!isMobile && (
            <Sider width={200} className="site-layout-background">
              <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
                {menuItems.map(item => (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          )}
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notenotes" element={<NoteNotes />} />
                <Route path="/mindmap" element={<Mindmap />} />
                <Route path="/Watchmindmap" element={<Watchmindmap />} />
                <Route path="/SubscriptionPlans" element={<SubscriptionPlans />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
        {isMobile && (
          <Footer>
            <Menu mode="horizontal">
              {menuItems.map(item => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Footer>
        )}
      </Layout>
    </Router>
  );
};

export default App;
