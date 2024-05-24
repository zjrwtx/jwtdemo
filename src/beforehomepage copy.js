// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './output.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AiOutlineCopy } from 'react-icons/ai';
import LoginModal from './LoginModal'; // Ensure this import is correct
import HomePage from './HomePage'; // Assume this is the main component after login

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
      const response = await axios.post('https://buguakeai.zeabur.app/topics', formData, {
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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 font-sans w-full p-4">
      {!isLoggedIn ? (
        <LoginModal onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">产品更新</h2>
                <p className="mb-4">欢迎使用最新版本的不挂科AI 新更新会随时出现 预计将支持：</p>
                <ul className="list-disc list-inside mb-4">
                  <li>更智能的题目生成算法</li>
                  <li>更快速的内容生成</li>
                  <li>更加友好的用户界面</li>
                  <li>用户注册登录与数据存储等</li>
                </ul>
                更多新的功能与建议欢迎联系开发者微信：18718250072
                <button
                  onClick={handleCloseModal}
                  className="w-full p-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                >
                  了解了
                </button>
              </div>
            </div>
          )}
          <header className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white w-full p-8 flex flex-col items-center shadow-md rounded-b-3xl mb-8">
            <h1 className="text-4xl font-bold mb-2">题目生成</h1>
            <p className="text-center max-w-2xl">不挂科AI：上传一个或多个PDF或PPTX格式的专业课件来生成您想要的题目类型、数量及其答案解释等，然后直接复制生成结果到您的笔记或其他地方！</p>
          </header>

          <main className="flex flex-col items-center w-full flex-grow space-y-8">
            <div id="upload" className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
              <input
                type="file"
                multiple
                onChange={handleUpload}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            <div id="options" className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
              <select
                value={typeOfTopic}
                onChange={(e) => setTypeOfTopic(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                <option value="" disabled>选择题目类型</option>
                <option value="单选选择题">单选选择题</option>
                <option value="多项选择题">多项选择题</option>
                <option value="名词解释">名词解释</option>
                <option value="判断题">判断题</option>
                <option value="问答题">问答</option>
                <option value="综合分析题">综合分析题</option>
              </select>
              <input
                type="number"
                placeholder="输入题目数量"
                value={numOfTopic}
                onChange={(e) => setNumOfTopic(e.target.value)}
                min="1"
                className="w-full mt-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
              <button
                onClick={handleSubmit}
                className="w-full mt-4 p-4 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow hover:from-indigo-600 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                {isLoading ? '生成中...' : '开始生成题目'}
              </button>
            </div>

            <div id="result" className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md flex flex-col">
              <textarea
                value={result}
                readOnly
                className="w-full p-4 h-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
              <button
                onClick={handleCopy}
                className="w-full mt-4 p-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                <AiOutlineCopy size={24} className="inline-block mr-2" />
                复制生成结果
              </button>
            </div>
          </main>

          <footer className="text-center mt-8">
            <a href='https://mp.weixin.qq.com/s/iHMUPWsXQjUfImx-oCu53Q'>
              <p className="text-gray-600">©2024 Created by 微信公众号：正经人王同学<br />联系微信：agi_isallyouneed</p>
            </a>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
