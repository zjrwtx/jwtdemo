// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route, Navigate, Link, } from 'react-router-dom';
import { AiOutlineUpload, AiOutlineCopy } from 'react-icons/ai';

const Watchmindmap = () => {


  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50 font-sans w-full">
      <header >
       
        <p className="bg-blue-600 text-white w-full p-6 flex flex-col items-center shadow-md">复制生成思维导图的结果到这就好 支持思维导图内容即时修改 下载为html文件后可转为pdf思维导图</p>
        <a href='https://www.freeconvert.com/' target="blank"  className="bg-blue-600" >点击使用html转pdf思维导图</a>
      </header>

      <div className="flex-grow w-full flex">
        <iframe
          className="flex-grow"
          title="描述性的标题，说明这个 iframe 展示的内容"
          src="https://markmap.js.org/repl"
        ></iframe>
      </div>
    </div>
  );
};

export default Watchmindmap;
