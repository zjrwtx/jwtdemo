import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, DocumentTextIcon, MapIcon, VideoCameraIcon, 
  ChatBubbleBottomCenterTextIcon, AcademicCapIcon, HeartIcon 
} from '@heroicons/react/24/outline';

const menuItems = [
  { icon: HomeIcon, label: '题目生成' },
  { icon: DocumentTextIcon, label: '试卷生成' },
  { icon: MapIcon, label: '思维导图' },
  { icon: VideoCameraIcon, label: '视频转PDF' },
  { icon: ChatBubbleBottomCenterTextIcon, label: '分享社区' },
  { icon: AcademicCapIcon, label: '我的课程' },
  { icon: HeartIcon, label: '捐赠支持' },
];

const MobileApp = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">不挂科AI</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with actual content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-lg text-gray-500">Content for "{menuItems[activeIndex].label}"</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-lg">
        <ul className="flex justify-around items-center h-16">
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              <button
                onClick={() => setActiveIndex(index)}
                className={`p-2 rounded-full focus:outline-none transition-colors duration-200 ${
                  activeIndex === index ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                <item.icon className="h-6 w-6" />
                {activeIndex === index && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-500 rounded-full"
                    layoutId="underline"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileApp;