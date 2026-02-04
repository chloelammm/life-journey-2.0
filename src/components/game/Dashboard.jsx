import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard({ money, stress, happiness, mood }) {
  const getMoodEmoji = () => {
    if (stress > 70) return '😰';
    if (happiness > 70) return '😊';
    if (money > 70) return '💰';
    if (happiness < 30) return '😢';
    return '😐';
  };
  
  const stats = [
    { 
      label: '金錢', 
      value: money, 
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-100',
      icon: '💰',
      textColor: 'text-emerald-700'
    },
    { 
      label: '壓力', 
      value: stress, 
      color: 'from-red-400 to-rose-500',
      bgColor: 'bg-red-100',
      icon: '😤',
      textColor: 'text-red-700',
      inverse: true
    },
    { 
      label: '快樂', 
      value: happiness, 
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-100',
      icon: '😊',
      textColor: 'text-blue-700'
    }
  ];
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-100">
      {/* 心情指標 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-4xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {getMoodEmoji()}
          </motion.span>
          <div>
            <p className="text-xs text-slate-500">心情狀態</p>
            <p className="font-bold text-slate-700">
              {stress > 70 ? '好大壓力！' : 
               happiness > 70 ? '超開心！' : 
               happiness < 30 ? '有啲唔開心...' : '普普通通'}
            </p>
          </div>
        </div>
      </div>
      
      {/* 三大指標 */}
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium text-slate-600">
                <span>{stat.icon}</span>
                {stat.label}
              </span>
              <span className={`text-sm font-bold ${stat.textColor}`}>
                {stat.value}%
              </span>
            </div>
            <div className={`h-3 rounded-full ${stat.bgColor} overflow-hidden`}>
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${stat.value}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* 警告提示 */}
      {stress > 80 && (
        <motion.div 
          className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <p className="text-xs text-red-600 font-medium text-center">
            ⚠️ 壓力爆錶！記得休息下～
          </p>
        </motion.div>
      )}
      
      {money < 20 && (
        <motion.div 
          className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <p className="text-xs text-amber-600 font-medium text-center">
            💸 荷包乾塘！小心使錢～
          </p>
        </motion.div>
      )}
    </div>
  );
}