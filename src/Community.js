// src/App.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, message } from 'antd';
import axios from 'axios';


const { TextArea } = Input;

const App = () => {
  const [form] = Form.useForm();
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      message.error('获取反馈失败，请重试');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/feedback', values);
      if (response.status === 200) {
        message.success('反馈提交成功');
        form.resetFields();
        setFeedbacks([response.data, ...feedbacks]);
      } else {
        message.error('提交失败，请重试');
      }
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>分享您生成的学习内容或进行产品反馈与建议等都可以！但会有内容审核与监控的</h1>
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
          label="内容"
          rules={[{ required: true, message: '请输入您的内容' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <h2 style={{ marginTop: 50 }}>社区内容列表</h2>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={feedbacks}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={`${item.name} (${new Date(item.created_at).toLocaleString()})`}
              description={item.email}
            />
            {item.feedback}
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
