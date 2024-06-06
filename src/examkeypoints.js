import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Upload, Typography, Spin, message } from 'antd';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title, Paragraph, Link } = Typography;
// const apiurl=process.env.REACT_APP_backend_API_URL;
const Mindmap = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [examkeypointsresult, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem('examkeypointsresult');
    if (savedResult) {
      setResult(savedResult);
    }
  }, []);

  const handleUpload = ({ fileList }) => {
    setFiles(fileList);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      message.warning('Please upload at least one file!');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    files.forEach(({ originFileObj }) => {
      formData.append('files', originFileObj);
    });

    try {
      const response = await axios.post(process.env.REACT_APP_backend_API_URL+'/examkeypoints', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const resultText = response.data.responses.map(res => `${res.filename}: ${res.api_response}`).join('\n\n');
      setResult(resultText);
      localStorage.setItem('examkeypointsresult', resultText);
    } catch (error) {
      message.error('Failed to extract text from file!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(examkeypointsresult).then(() => {
      message.success('已经复制生成的考试重点大纲了！');
    }).catch(() => {
      message.error('Failed to copy text.');
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>考试重点大纲生成</Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: '40px' }}>
          上传一个或多个PDF或PPTX格式的专业课件来生成您的考试重点大纲
      </Paragraph>

      <Upload
        multiple
        beforeUpload={() => false}
        onChange={handleUpload}
        fileList={files}
        style={{ marginBottom: '20px' }}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>

      <Button
        type="primary"
        onClick={handleSubmit}
        loading={isLoading}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        开始生成考试重点大纲
      </Button>

      <TextArea
        value={examkeypointsresult}
        readOnly
        rows={10}
        style={{ marginBottom: '20px', fontSize: '0.875rem' }}
      />

      <Button
        type="primary"
        icon={<CopyOutlined />}
        onClick={handleCopy}
        style={{ marginBottom: '20px', width: '100%' }}
      >
        复制生成的考试重点大纲
      </Button>

      <Link href="https://mp.weixin.qq.com/s/iHMUPWsXQjUfImx-oCu53Q" target="_blank">
        &copy; 2024 Created by 微信公众号：正经人王同学
        <br />
        联系微信：agi_isallyouneed
      </Link>
    </div>
  );
};

export default Mindmap;
