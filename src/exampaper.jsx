// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, Menu, Upload, Button, Select, Input, Typography, Spin, message, Form, Checkbox, Row, Col } from 'antd';
import { AiOutlineCopy } from 'react-icons/ai';
import { UploadOutlined } from '@ant-design/icons';

import './output.css';
import LoginModal from './LoginModal'; // Ensure this import is correct

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const App = () => {
  const [files, setFiles] = useState([]);
  const [typeOfTopic, setTypeOfTopic] = useState([]);
  const [numOfTopic, setNumOfTopic] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem('result');
    if (savedResult) {
      setResult(savedResult);
    }
  }, []);

  const handleUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
    return false; // Prevent upload
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      message.warning('Please upload at least one file!');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('typeoftopic', typeOfTopic.join(','));
    formData.append('numoftopic', numOfTopic);
    try {
      const response = await axios.post(process.env.REACT_APP_backend_API_URL + '/topics', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const resultText = response.data.responses.map(res => `${res.filename}: ${res.api_response}`).join('\n\n');
      setResult(resultText);
      localStorage.setItem('result', resultText); // 保存结果到 localStorage
    } catch (error) {
      message.error('Failed to extract text from file!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      message.success('已经复制生成的试卷了！');
    }).catch(() => {
      message.error('Failed to copy text.');
    });
  };

  return (
    <Layout>
     
      <Content style={{ padding: '50px' }}>
        <Title level={2}>试卷生成</Title>
        <Text>
          不挂科AI：上传一个或多个PDF或PPTX格式的专业课件  然后自定义您想要的试卷的题型与数目等  生成试卷后直接复制生成结果到您的笔记或其他地方！
        </Text>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="上传文件">
            <Upload beforeUpload={handleUpload} multiple>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="选择试卷包含的题目类型">
            <Checkbox.Group value={typeOfTopic} onChange={(value) => setTypeOfTopic(value)}>
              <Row>
                <Col span={8}><Checkbox value="单选选择题">单选选择题</Checkbox></Col>
                <Col span={8}><Checkbox value="多项选择题">多项选择题</Checkbox></Col>
                <Col span={8}><Checkbox value="名词解释">名词解释</Checkbox></Col>
                <Col span={8}><Checkbox value="判断题">判断题</Checkbox></Col>
                <Col span={8}><Checkbox value="问答题">问答</Checkbox></Col>
                <Col span={8}><Checkbox value="综合分析题">综合分析题</Checkbox></Col>
                <Col span={8}><Checkbox value="综合分析题">计算题</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="输入试卷题目数量">
            <Input
              type="number"
              placeholder="输入试卷题目数量"
              value={numOfTopic}
              onChange={(e) => setNumOfTopic(e.target.value)}
              min={1}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? '正在生成...' : '开始生成试卷'}
            </Button>
          </Form.Item>
        </Form>
        <TextArea
          value={result}
          readOnly
          rows={10}
          style={{ marginTop: '20px' }}
        />
        <Button
          onClick={handleCopy}
          type="primary"
          icon={<AiOutlineCopy />}
          style={{ marginTop: '10px' }}
        >
          复制生成结果
        </Button>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2024 Created by 微信公众号：正经人王同学
        <br />
        联系微信：agi_isallyouneed
      </Footer>
    </Layout>
  );
};

export default App;
