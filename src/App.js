// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './output.css';
import { BrowserRouter as Router, Routes, Route, Navigate ,Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Grid, Box, TextField, Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, CssBaseline } from '@mui/material';
import { AiOutlineCopy } from 'react-icons/ai';
import LoginModal from './LoginModal'; // Ensure this import is correct
import HomePage from './HomePage'; // Assume this is the main component after login
import NoteNotes from './notenotes';

const App = () => {

  return (

    <Router>
            
    <CssBaseline />
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        不挂科AI
      </Typography>
      <Button color="inherit" component={Link} to="/">题目生成</Button>
      <Button color="inherit" component={Link} to="/notenotes">文章笔记生成</Button>
      <Button color="inherit" href="https://n4xpgfy3fn.feishu.cn/docx/CyXEdI0LOoAQfCxv7kSc21m8nYs">思维导图生成</Button>
     
      
      <Button color="inherit" href="https://n4xpgfy3fn.feishu.cn/docx/CyXEdI0LOoAQfCxv7kSc21m8nYs">联系与官网</Button>
      {/* {isLoggedIn && <Button color="inherit" href="https://n4xpgfy3fn.feishu.cn/docx/CyXEdI0LOoAQfCxv7kSc21m8nYs">联系与官网</Button>} */}
    </Toolbar>
  </AppBar>
     
        <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notenotes" element={<NoteNotes />} />
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    </Router>
  );
};

export default App;
