// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Form, Input, Button, message } from 'antd';
const { TextArea } = Input;

const FeedbackForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success('反馈提交成功');
        form.resetFields();
      } else {
        message.error('提交失败，请重试');
      }
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入您的姓名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="电子邮件"
        rules={[{ required: true, message: '请输入您的电子邮件' }, { type: 'email', message: '请输入有效的电子邮件' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="feedback"
        label="反馈内容"
        rules={[{ required: true, message: '请输入您的反馈' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        message.error('获取反馈失败，请重试');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={feedbacks}
      renderItem={item => (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={item.name}
            description={item.email}
          />
          {item.feedback}
        </List.Item>
      )}
    />
  );
};

const App = () => {
  return (
    <div style={{ padding: 50 }}>
      <h1>产品反馈</h1>
      <FeedbackForm />
      <h2 style={{ marginTop: 50 }}>反馈列表</h2>
      <FeedbackList />
    </div>
  );
};

export default App;
