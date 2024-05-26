import React, { useState } from 'react';
import axios from 'axios';
import LoginModal from './LoginModal';
import {
  AppBar, Toolbar, Typography, Container, Button, Grid, Box, TextField, 
  Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, CircularProgress
} from '@mui/material';
import { AiOutlineCopy } from 'react-icons/ai';

const MainPage = ({ isLoggedIn, showModal, handleCloseModal , handleLoginSuccess}) => {
  const [files, setFiles] = useState([]);
  const [typeOfTopic, setTypeOfTopic] = useState('');
  const [numOfTopic, setNumOfTopic] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      localStorage.setItem('result', resultText);
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

  if (!isLoggedIn) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            不挂科AI
          </Typography>
          <Button color="inherit" href="/">题目生成</Button>
          <Button color="inherit" href="/">思维导图生成</Button>
          <Button color="inherit" href="/">学习规划</Button>
          <Button color="inherit" href="/dashboard">个人中心</Button>
        </Toolbar>
      </AppBar>
      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>产品更新</DialogTitle>
        <DialogContent>
          <DialogContentText>
            欢迎使用最新版本的不挂科AI 新更新会随时出现 预计将支持：
            <ul>
              <li>更智能的题目生成算法</li>
              <li>更快速的内容生成</li>
              <li>更加友好的用户界面</li>
              <li>用户注册登录与数据存储等</li>
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
    </Container>
  );
};

export default MainPage;
