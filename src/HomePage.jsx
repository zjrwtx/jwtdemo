// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './output.css';
import { BrowserRouter as Router, Routes, Route, Navigate ,Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Grid, Box, TextField, Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, CssBaseline } from '@mui/material';
import { AiOutlineCopy } from 'react-icons/ai';
import LoginModal from './LoginModal'; // Ensure this import is correct

import NoteNotes from './notenotes';

const App = () => {
  const [files, setFiles] = useState([]);
  const [typeOfTopic, setTypeOfTopic] = useState('');
  const [numOfTopic, setNumOfTopic] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 定义当前版本的更新内容
  const currentUpdateContent = `
  第1版更新通知
  `;

  useEffect(() => {
    const savedResult = localStorage.getItem('result');
    if (savedResult) {
      setResult(savedResult);
    }

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const savedUpdateContent = localStorage.getItem('updateContent');
      if (savedUpdateContent !== currentUpdateContent) {
        setShowModal(true);
        localStorage.setItem('updateContent', currentUpdateContent); // 更新本地存储中的更新内容
      }
    }
  }, [currentUpdateContent]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowModal(true); // Show modal after login
    localStorage.setItem('updateContent', currentUpdateContent); // 更新本地存储中的更新内容
  };

  const handleUpload = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload at least one file!');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    formData.append('typeoftopic', typeOfTopic);
    formData.append('numoftopic', numOfTopic);
    try {
      const response = await axios.post('https://snuhatuzvlnh.gzg.sealos.run/topics', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const resultText = response.data.responses.map(res => `${res.filename}: ${res.api_response}`).join('\n\n');
      setResult(resultText);
      localStorage.setItem('result', resultText); // 保存结果到 localStorage
    } catch (error) {
      alert('Failed to extract text from file!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      alert('已经复制生成的题目了！');
    }).catch(() => {
      alert('Failed to copy text.');
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('hasSeenModal', 'true');
  };

  return (
    <div>
      <CssBaseline />
   
      <Container>
        {!isLoggedIn ? (
          <LoginModal onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Dialog open={showModal} onClose={handleCloseModal}>
              <DialogTitle>产品更新</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  欢迎使用最新版本的不挂科AI 新更新会随时出现 预计将支持：
                  <ul>
                    <li>更智能的题目生成算法</li>
                    <li>更快速的内容生成</li>
                    <li>更加友好的用户界面</li>
                    <li>学习规划、超长论文、生成ppt等</li>
                  </ul>
                  更多新的功能与建议欢迎联系开发者微信：18718250072
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  了解了
                </Button>
              </DialogActions>
            </Dialog>
            <Box my={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                题目生成
              </Typography>
              <Typography>
                不挂科AI：上传一个或多个PDF或PPTX格式的专业课件来生成您想要的题目类型、数量及其答案解释等，然后直接复制生成结果到您的笔记或其他地方！
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box p={2} border={1} borderColor="grey.300" borderRadius={8}>
                  <input
                    type="file"
                    multiple
                    onChange={handleUpload}
                    style={{ width: '100%', padding: '16px', border: '1px solid grey', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box p={2} border={1} borderColor="grey.300" borderRadius={8}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="typeOfTopic-label">选择题目类型</InputLabel>
                    <Select
                      labelId="typeOfTopic-label"
                      value={typeOfTopic}
                      onChange={(e) => setTypeOfTopic(e.target.value)}
                      label="选择题目类型"
                    >
                      <MenuItem value="" disabled>选择题目类型</MenuItem>
                      <MenuItem value="单选选择题">单选选择题</MenuItem>
                      <MenuItem value="多项选择题">多项选择题</MenuItem>
                      <MenuItem value="名词解释">名词解释</MenuItem>
                      <MenuItem value="判断题">判断题</MenuItem>
                      <MenuItem value="问答题">问答</MenuItem>
                      <MenuItem value="综合分析题">综合分析题</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    type="number"
                    placeholder="输入题目数量"
                    value={numOfTopic}
                    onChange={(e) => setNumOfTopic(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    inputProps={{ min: 1 }}
                  />
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : '开始生成题目'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} p={2} border={1} borderColor="grey.300" borderRadius={8}>
              <TextField
                value={result}
                readOnly
                multiline
                rows={10}
                fullWidth
                variant="outlined"
              />
              <Button
                onClick={handleCopy}
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<AiOutlineCopy />}
                style={{ marginTop: '16px' }}
              >
                复制生成结果
              </Button>
            </Box>
            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                ©2024 Created by 微信公众号：正经人王同学
              </Typography>
              <Typography variant="body2" color="textSecondary">
                联系微信：agi_isallyouneed
              </Typography>
            </Box>
           
          </>
        )}
      </Container>
    </div>
  );
};

export default App;
