// src/App.js
import React, { useState } from 'react';
import { Layout, Upload, Button, message, Progress, Typography, Card } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';

import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleUpload = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    axios.post('https://snuhatuzvlnh.gzg.sealos.run/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
      responseType: 'blob', // Expecting a blob as a response
    })
    .then((response) => {
      message.success('处理好了 下载转换后的pdf文档吧!');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    })
    .catch((error) => {
      message.error('上传失败 检查一下视频格式这样');
    })
    .finally(() => {
      setUploading(false);
      setProgress(0);
    });
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'slides.pdf');
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <Layout className="layout">
     
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '600px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Title level={4}>随机卷掉一批人：上传视频转pdf文档</Title>
          <Text type="secondary">成功转换为pdf文档后即可下载</Text>
          <br />
          <Text>推荐的视频下载网站 支持b站、youtube、腾讯视频等平台：https://api.spapi.cn</Text>
          <br />
          <Text>卷王、网课人、期末人、考研党加分小工具啦 微信公众号：正经人王同学</Text>
          <div style={{ marginTop: '20px' }}>
            <Upload customRequest={handleUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} type="primary" disabled={uploading}>
                {uploading ? '上传处理中' : '开始上传'}
              </Button>
            </Upload>
            {uploading && <Progress percent={progress} style={{ marginTop: '20px' }} />}
          </div>
          {downloadUrl && (
            <div style={{ marginTop: '20px' }}>
              <Button 
                icon={<DownloadOutlined />} 
                type="primary" 
                onClick={handleDownload}
              >
                下载视频转换后的pdf
              </Button>
            </div>
          )}
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2024 Created by 微信公众号：正经人王同学
联系微信：agi_isallyouneed</Footer>
    </Layout>
  );
};

export default App;
