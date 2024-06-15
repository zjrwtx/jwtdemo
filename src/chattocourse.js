import React, { useState } from 'react';
import { Layout, Menu, Input, List, Avatar, Button } from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';


const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const courses = [
  { id: 1, name: '病理学聊天助手', icon: <UserOutlined /> },
  { id: 2, name: '生理学视频教学助手', icon: <VideoCameraOutlined /> },
  { id: 3, name: '基因工程学实验科研助手', icon: <MessageOutlined /> },
];

const messages = {
  1: [
    { id: 1, sender: 'Teacher', content: 'Welcome to Mathematics!' },
    { id: 2, sender: 'Student', content: 'Thank you!' },
  ],
  2: [
    { id: 1, sender: 'Teacher', content: 'Welcome to Physics!' },
    { id: 2, sender: 'Student', content: 'Looking forward to it!' },
  ],
  3: [
    { id: 1, sender: 'Teacher', content: 'Welcome to Chemistry!' },
    { id: 2, sender: 'Student', content: 'Excited to learn!' },
  ],
};

const CourseChat = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    setChatMessages(messages[courseId]);
  };

  const handleSendMessage = () => {
    if (newMessage && selectedCourse) {
      const newChatMessage = {
        id: chatMessages.length + 1,
        sender: 'Student',
        content: newMessage,
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" width={200}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          onSelect={({ key }) => handleCourseSelect(key)}
        >
          {courses.map((course) => (
            <Menu.Item key={course.id} icon={course.icon}>
              {course.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {selectedCourse
            ? courses.find((course) => course.id === selectedCourse).name
            : '选择或上传一个课程资料先'}
        </Header>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          {selectedCourse ? (
            <>
              <List
                itemLayout="horizontal"
                dataSource={chatMessages}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.sender}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
              <TextArea
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <Button type="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
                Send
              </Button>
            </>
          ) : (
            <div>上传你的课程资料，以后就可以直接与你的课程对话啦，视频对话，语音对话......开发中啦</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CourseChat;
