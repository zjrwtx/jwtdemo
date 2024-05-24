import React from 'react';
import './output.css';

const MainPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-8">
        <div className="text-white text-2xl">
          <i className="fas fa-home"></i>
        </div>
        <div className="space-y-8">
          <div className="text-gray-400 hover:text-white">
            <i className="fas fa-globe"></i>
          </div>
          <div className="text-gray-400 hover:text-white">
            <i className="fas fa-lock"></i>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">每一次，都集中全力</h1>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <i className="fas fa-rocket"></i>
            <span>快来解锁下这些用法</span>
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <i className="fas fa-lock"></i>
            <span>【emoji 翻译器】</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
