import React from 'react';
import { motion } from 'framer-motion';

export default function RadarChart({ stable, risk, creative }) {
  // 計算三角形頂點
  const centerX = 100;
  const centerY = 100;
  const maxRadius = 70;
  
  // 三個頂點角度 (穩定在上, 冒險右下, 創意左下)
  const angles = [
    -90, // 穩定 (上)
    150, // 創意 (左下)
    30   // 冒險 (右下)
  ];
  
  const values = [stable, creative, risk];
  
  // 計算每個點的位置
  const getPoint = (angle, value) => {
    const normalizedValue = (value / 100) * maxRadius;
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + normalizedValue * Math.cos(rad),
      y: centerY + normalizedValue * Math.sin(rad)
    };
  };
  
  // 生成多邊形路徑
  const points = values.map((v, i) => getPoint(angles[i], v));
  const pathD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;
  
  // 背景網格線
  const gridLevels = [25, 50, 75, 100];
  
  const labels = [
    { text: '穩定', emoji: '🏠', angle: -90, value: stable },
    { text: '創意', emoji: '🎨', angle: 150, value: creative },
    { text: '冒險', emoji: '🚀', angle: 30, value: risk }
  ];
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-100">
      <h3 className="text-sm font-bold text-slate-700 mb-2 text-center">性格傾向</h3>
      
      <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
        {/* 背景網格 */}
        {gridLevels.map((level) => {
          const gridPoints = angles.map(a => getPoint(a, level));
          const gridPath = `M ${gridPoints[0].x} ${gridPoints[0].y} L ${gridPoints[1].x} ${gridPoints[1].y} L ${gridPoints[2].x} ${gridPoints[2].y} Z`;
          return (
            <path
              key={level}
              d={gridPath}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}
        
        {/* 軸線 */}
        {angles.map((angle, i) => {
          const endPoint = getPoint(angle, 100);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}
        
        {/* 數值區域 */}
        <motion.path
          d={pathD}
          fill="url(#radarGradient)"
          fillOpacity="0.5"
          stroke="url(#radarStroke)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: 'center' }}
        />
        
        {/* 漸變定義 */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        
        {/* 數值點 */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="white"
            stroke={['#22c55e', '#8b5cf6', '#f59e0b'][i]}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </svg>
      
      {/* 標籤 */}
      <div className="flex justify-between mt-2 px-2">
        {labels.map((label, i) => (
          <div key={i} className="text-center">
            <span className="text-lg">{label.emoji}</span>
            <p className="text-[10px] font-medium text-slate-600">{label.text}</p>
            <p className="text-xs font-bold" style={{ color: ['#22c55e', '#8b5cf6', '#f59e0b'][i] }}>
              {label.value}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}