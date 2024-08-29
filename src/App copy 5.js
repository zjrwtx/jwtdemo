import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineHome, AiOutlineFileText, AiOutlineProfile, AiFillWechat , AiOutlineOrderedList, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FaVideo } from "react-icons/fa";
import './output.css';
import HomePage from './HomePage'; 
import NoteNotes from './notenotes';
import SubscriptionPlans from './paidsubscriber';
import Mindmap from './mindmap';
import Watchmindmap from './watchmindmap';
import Examkeypoints from './examkeypoints';
import brandLogo from './logo192.png';
import Videotopdf from './Videotopdf';
import Supportus from './Supportus';
import Community from './Community';
import { PiExamBold } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { PiStudentBold } from "react-icons/pi";
import Course from './chattocourse';
import Exampaper from './exampaper';
const { Header, Content, Sider, Footer } = Layout;

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const menuItems = [
    
    { key: '/', icon: <AiOutlineHome />, label: '题目生成', path: '/' },
    { key: '/exampaper', icon: <PiExamBold />, label: '试卷生成', path: '/exampaper' },
    { key: '/examkeypoints', icon: <AiOutlineFileText />, label: '考试重点大纲生成', path: '/examkeypoints'},
    { key: '/mindmap', icon: <AiOutlineProfile />, label: '思维导图生成', path: '/mindmap' },
    { key: '/Watchmindmap', icon: <AiOutlineOrderedList />, label: '实时编辑思维导图', path: '/Watchmindmap' },
    { key: '/videotopdf', icon: <FaVideo />, label: '视频转pdf图文', path: '/videotopdf'},
    { key: '/notenotes', icon: <AiOutlineFileText />, label: '文章笔记生成', path: '/notenotes' },
    { key: '/community', icon: < GoCommentDiscussion />, label: '分享社区', path: '/community' },
    { key: '/chattocourse', icon: <PiStudentBold />, label: '我的课程（开发中）', path: '/chattocourse' },
    { key: '/supportus', icon: <AiOutlineFileText />, label: '捐赠支持产品', path: '/supportus' },

    // { key: '/SubscriptionPlans', icon: <AiOutlineAppstoreAdd />, label: '升级为vip', path: '/SubscriptionPlans' },
    { key: '/contactandwebsite', icon: < AiFillWechat />, label: '联系与官网', path: 'https://n4xpgfy3fn.feishu.cn/docx/CyXEdI0LOoAQfCxv7kSc21m8nYs?from=from_copylink' },
  ];

  return (
    <Router>
      <Layout>
        <Layout>
          {!isMobile && (
            <Sider width={200} className="site-layout-background">
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
              <img src={brandLogo} alt="Brand Logo" style={{ width: '40px', marginRight: '8px' }} />
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000' }}>不挂科AI</span>
            </div>
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
                <Route path="/exampaper" element={<Exampaper />} />
                <Route path="/chattocourse" element={<Course />} />
                <Route path="/notenotes" element={<NoteNotes />} />
                <Route path="/mindmap" element={<Mindmap />} />
                <Route path="/Watchmindmap" element={<Watchmindmap />} />
                <Route path="/Videotopdf" element={<Videotopdf />} />
                <Route path="/community" element={<Community />} />
                <Route path="/supportus" element={<Supportus />} />
                <Route path="/SubscriptionPlans" element={<SubscriptionPlans />} />
                <Route path="/examkeypoints" element={<Examkeypoints />} />
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
