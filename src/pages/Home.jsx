import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play, Users, BookOpen, Gamepad2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-700 overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 text-8xl opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          🎮
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-6xl opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🎯
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-20 text-7xl opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          🚀
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-10 text-5xl opacity-20"
          animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          💼
        </motion.div>
      </div>
      
      {/* 主要內容 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mb-8"
          >
            <span className="text-8xl">🛤️</span>
          </motion.div>
          
          {/* 標題 */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            人生路
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-2">
            Life Journey
          </p>
          <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
            一個關於選擇、夢想同未來嘅互動遊戲
          </p>
          
          {/* 特色標籤 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: '🎲', text: 'Mario Party風格' },
              { icon: '🤖', text: 'AI職業分析' },
              { icon: '🇭🇰', text: '廣東話設計' },
              { icon: '📊', text: '實時數據追蹤' }
            ].map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {tag.icon} {tag.text}
              </motion.span>
            ))}
          </div>
          
          {/* 按鈕 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Game')}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-violet-600 hover:bg-white/90 text-lg px-8 py-6 rounded-2xl shadow-xl"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  開始遊戲
                </Button>
              </motion.div>
            </Link>
            
            <Link to={createPageUrl('TeacherDashboard')}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/50 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-2xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  老師入口
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
        
        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-white/50 text-sm">
            專為香港中小學生設計嘅生涯規劃遊戲
          </p>
          <p className="text-white/30 text-xs mt-1">
            適合 12-18 歲學生
          </p>
        </motion.div>
      </div>
      
      {/* 遊戲特色區域 */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            遊戲特色
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: '人生選擇模擬',
                description: '60+事件卡，模擬真實人生決定，睇下你會點揀！'
              },
              {
                icon: '💼',
                title: '職業試工',
                description: '護士、YouTuber、工程師...體驗唔同職業嘅工作！'
              },
              {
                icon: '📊',
                title: 'AI分析報告',
                description: '根據你嘅選擇，AI會分析你嘅性格同推薦職業！'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <span className="text-4xl block mb-3">{feature.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 適用對象 */}
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            適用對象
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-400/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">👨‍🎓</span>
                <div>
                  <h3 className="text-lg font-bold text-white">學生</h3>
                  <p className="text-white/70 text-sm">小四至中六學生</p>
                </div>
              </div>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ 探索自己嘅興趣同性格</li>
                <li>✓ 了解唔同職業嘅特點</li>
                <li>✓ 學習做決定同承擔後果</li>
                <li>✓ 透過遊戲認識生涯規劃</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400/20 to-cyan-400/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">👩‍🏫</span>
                <div>
                  <h3 className="text-lg font-bold text-white">老師</h3>
                  <p className="text-white/70 text-sm">班主任 / 升學輔導老師</p>
                </div>
              </div>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ 全班數據一目了然</li>
                <li>✓ 了解學生職業傾向</li>
                <li>✓ 生動有趣嘅生涯教育工具</li>
                <li>✓ 匯出報告方便跟進</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}