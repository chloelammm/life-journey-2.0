import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpinWheel({ 
  event, 
  onSelect, 
  isOpen 
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rotation, setRotation] = useState(0);
  
  if (!event || !isOpen) return null;
  
  const options = event.options || [];
  const segmentAngle = 360 / options.length;
  
  const colors = [
    'from-emerald-400 to-green-500',
    'from-blue-400 to-cyan-500',
    'from-purple-400 to-violet-500',
    'from-amber-400 to-orange-500'
  ];
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedIndex(null);
    
    // 隨機選擇結果
    const randomIndex = Math.floor(Math.random() * options.length);
    // 計算旋轉角度 (多轉幾圈 + 目標角度)
    const extraSpins = 3 + Math.floor(Math.random() * 2);
    const targetAngle = 360 * extraSpins + (randomIndex * segmentAngle) + segmentAngle / 2;
    
    setRotation(prev => prev + targetAngle);
    
    // 動畫結束後顯示結果
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedIndex(randomIndex);
    }, 3000);
  };
  
  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onSelect(options[selectedIndex], selectedIndex);
    }
  };
  
  const handleManualSelect = (index) => {
    if (isSpinning) return;
    setSelectedIndex(index);
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
        >
          {/* 事件標題 */}
          <div className="text-center mb-4">
            <motion.span 
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {event.icon}
            </motion.span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">{event.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{event.description}</p>
          </div>
          
          {/* 轉盤 */}
          <div className="relative w-64 h-64 mx-auto mb-4">
            {/* 指針 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-20">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-slate-800" />
            </div>
            
            {/* 轉盤本體 */}
            <motion.div
              className="w-full h-full rounded-full shadow-lg overflow-hidden relative"
              style={{ rotate: rotation }}
              animate={{ rotate: rotation }}
              transition={{ duration: 3, ease: [0.17, 0.67, 0.12, 0.99] }}
            >
              {options.map((option, i) => {
                const startAngle = i * segmentAngle - 90;
                const endAngle = startAngle + segmentAngle;
                
                // 計算扇形路徑
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const centerX = 128;
                const centerY = 128;
                const radius = 128;
                
                const x1 = centerX + radius * Math.cos(startRad);
                const y1 = centerY + radius * Math.sin(startRad);
                const x2 = centerX + radius * Math.cos(endRad);
                const y2 = centerY + radius * Math.sin(endRad);
                
                const largeArc = segmentAngle > 180 ? 1 : 0;
                
                const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
                
                // 文字位置 (扇形中心)
                const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                const textRadius = radius * 0.6;
                const textX = centerX + textRadius * Math.cos(midAngle);
                const textY = centerY + textRadius * Math.sin(midAngle);
                
                return (
                  <svg key={i} className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={['#34d399', '#60a5fa', '#a78bfa', '#fbbf24'][i % 4]} />
                        <stop offset="100%" stopColor={['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b'][i % 4]} />
                      </linearGradient>
                    </defs>
                    <path
                      d={pathD}
                      fill={`url(#gradient-${i})`}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${(startAngle + endAngle) / 2 + 90}, ${textX}, ${textY})`}
                    >
                      {option.text.length > 8 ? option.text.slice(0, 8) + '...' : option.text}
                    </text>
                  </svg>
                );
              })}
            </motion.div>
            
            {/* 中心按鈕 */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-16 h-16 rounded-full bg-white shadow-lg border-4 border-slate-200
                flex items-center justify-center z-10
                hover:scale-105 active:scale-95 transition-transform
                disabled:opacity-50"
            >
              <span className="text-2xl">{isSpinning ? '🎰' : '🎲'}</span>
            </button>
          </div>
          
          {/* 選項列表 (手動選擇) */}
          <div className="space-y-2 mb-4">
            <p className="text-xs text-slate-400 text-center">或者直接揀：</p>
            {options.map((option, i) => (
              <motion.button
                key={i}
                onClick={() => handleManualSelect(i)}
                disabled={isSpinning}
                className={`w-full p-3 rounded-xl text-left transition-all
                  ${selectedIndex === i 
                    ? 'bg-gradient-to-r ' + colors[i % 4] + ' text-white shadow-lg scale-[1.02]' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'}
                  disabled:opacity-50`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{option.text}</span>
                  <div className="flex gap-1 text-xs">
                    {option.effect.money !== 0 && (
                      <span className={option.effect.money > 0 ? 'text-emerald-500' : 'text-red-500'}>
                        💰{option.effect.money > 0 ? '+' : ''}{option.effect.money}
                      </span>
                    )}
                    {option.effect.stress !== 0 && (
                      <span className={option.effect.stress < 0 ? 'text-emerald-500' : 'text-red-500'}>
                        😤{option.effect.stress > 0 ? '+' : ''}{option.effect.stress}
                      </span>
                    )}
                    {option.effect.happiness !== 0 && (
                      <span className={option.effect.happiness > 0 ? 'text-emerald-500' : 'text-red-500'}>
                        😊{option.effect.happiness > 0 ? '+' : ''}{option.effect.happiness}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* 確認按鈕 */}
          {selectedIndex !== null && (
            <motion.button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 
                text-white font-bold shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              確定選擇 ✓
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}