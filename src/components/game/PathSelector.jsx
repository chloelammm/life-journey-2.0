import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOARD_PATHS } from './GameData';

export default function PathSelector({ isOpen, onSelect }) {
  if (!isOpen) return null;
  
  const paths = [
    {
      key: 'stable',
      name: '穩定之路',
      icon: '🏢',
      color: '#22c55e',
      description: '穩定收入，Work-life balance',
      careers: ['護士', '老師', '公務員', '會計師'],
      traits: '安全感高、有規律'
    },
    {
      key: 'creative',
      name: '創意之路',
      icon: '🎨',
      color: '#8b5cf6',
      description: '自由創作，展現才華',
      careers: ['設計師', 'YouTuber', '音樂人', '作家'],
      traits: '創意爆棚、獨立思考'
    },
    {
      key: 'business',
      name: '商業之路',
      icon: '💼',
      color: '#f59e0b',
      description: '創業做老闆，賺取財富',
      careers: ['老闆', '投資者', '銷售', '顧問'],
      traits: '敢拼敢闖、有野心'
    },
    {
      key: 'tech',
      name: '科技之路',
      icon: '💻',
      color: '#3b82f6',
      description: '科技改變世界',
      careers: ['程式員', '數據分析', 'AI專家', '遊戲開發'],
      traits: '邏輯強、愛學習'
    }
  ];
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <motion.span 
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🔀
            </motion.span>
            <h2 className="text-2xl font-bold text-slate-800 mt-2">人生分岔路</h2>
            <p className="text-slate-500 mt-1">揀一條路，開始你嘅旅程！</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {paths.map((path, i) => (
              <motion.button
                key={path.key}
                onClick={() => onSelect(path.key)}
                className="p-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: `${path.color}15`, borderColor: path.color, borderWidth: 2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ boxShadow: `0 10px 30px ${path.color}30` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{path.icon}</span>
                  <span className="font-bold" style={{ color: path.color }}>{path.name}</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{path.description}</p>
                <div className="flex flex-wrap gap-1">
                  {path.careers.map(c => (
                    <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-white/60" 
                      style={{ color: path.color }}>
                      {c}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-4">
            💡 每條路都有唔同嘅機遇同挑戰！
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}