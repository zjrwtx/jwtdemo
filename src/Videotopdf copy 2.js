// src/App.js
import React, { useState } from 'react';
import { Layout, Upload, Button, message, Progress, Typography, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    axios.post('http://localhost:8000/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
      responseType: 'blob', // Expecting a blob as a response
    })
    .then((response) => {
      message.success('Upload successful!');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'slides.pdf');
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      message.error('Upload failed.');
    })
    .finally(() => {
      setUploading(false);
      setProgress(0);
    });
  };

  return (
    <Layout className="layout">
      <Header style={{ textAlign: 'center', color: 'white', backgroundColor: '#001529' }}>
        <Title level={2} style={{ color: 'white' }}>Video to Slides Converter</Title>
      </Header>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '600px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Title level={4}>Upload Your Video</Title>
          <Text type="secondary">Convert your video to a PDF of unique slides.</Text>
          <div style={{ marginTop: '20px' }}>
            <Upload customRequest={handleUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} type="primary" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Click to Upload'}
              </Button>
            </Upload>
            {uploading && <Progress percent={progress} style={{ marginTop: '20px' }} />}
          </div>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Video to Slides Converter ©2024 Created by YourName</Footer>
    </Layout>
  );
};

export default App;
