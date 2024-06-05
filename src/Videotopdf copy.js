// src/UploadComponent.js
import React, { useState } from 'react';
import { Upload, Button, message, Progress ,Layout, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const UploadComponent = () => {
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
    <div style={{ margin: '100px auto', width: '50%' }}>
      <Upload 
        customRequest={handleUpload} 
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Click to Upload'}
        </Button>
      </Upload>
      {uploading && <Progress percent={progress} />}
    </div>
  );
};


const App = () => (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Title style={{ color: 'white' }} level={3}>Video to Slides Converter</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <UploadComponent />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Video to Slides Converter ©2024 Created by YourName</Footer>
    </Layout>
  );

export default App;