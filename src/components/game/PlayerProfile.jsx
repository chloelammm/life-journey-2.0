import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlayerProfile({ 
  isOpen,
  player,
  collectedValues = [],
  collectedSuperpowers = [],
  collectedSkills = [],
  completedMilestones = [],
  onClose 
}) {
  if (!isOpen) return null;
  
  const PLAYER_AVATARS = {
    male: '👦',
    female: '👧',
    robot: '🤖'
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* 頭部 */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg mb-3">
              <span className="text-4xl">{PLAYER_AVATARS[player.gender] || '👦'}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{player.name}</h2>
            <p className="text-white/70 text-sm">{player.age}歲 • 第{player.position}步</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* 當前路徑 */}
          {player.path && (
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium"
                style={{ 
                  backgroundColor: player.path === 'stable' ? '#22c55e' : 
                    player.path === 'creative' ? '#8b5cf6' : 
                    player.path === 'business' ? '#f59e0b' : '#3b82f6'
                }}>
                {player.path === 'stable' ? '🏢 穩定之路' : 
                 player.path === 'creative' ? '🎨 創意之路' : 
                 player.path === 'business' ? '💼 商業之路' : '💻 科技之路'}
              </span>
            </div>
          )}
          
          {/* 收集到的價值觀卡 */}
          <div>
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-xl">💎</span>
              價值觀卡
            </h3>
            {collectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {collectedValues.map((card) => (
                  <span key={card.id} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center gap-1">
                    {card.icon} {card.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">未收集到任何價值觀卡</p>
            )}
          </div>
          
          {/* 收集到的超能力卡 */}
          <div>
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span>
              超能力卡
            </h3>
            {collectedSuperpowers.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {collectedSuperpowers.map((card) => (
                  <span key={card.id} className="px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                    {card.icon} {card.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">未收集到任何超能力卡</p>
            )}
          </div>
          
          {/* 收集到的技能卡 */}
          <div>
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              技能卡
            </h3>
            {collectedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {collectedSkills.map((card) => (
                  <span key={card.id} className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm flex items-center gap-1">
                    {card.icon} {card.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">未收集到任何技能卡</p>
            )}
          </div>
          
          {/* 完成的里程碑 */}
          <div>
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-xl">🏆</span>
              里程碑成就
            </h3>
            {completedMilestones.length > 0 ? (
              <div className="space-y-2">
                {completedMilestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg">
                    <span className="text-2xl">{milestone.icon}</span>
                    <div>
                      <p className="font-medium text-slate-800">{milestone.name}</p>
                      <p className="text-xs text-slate-500">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">未完成任何里程碑</p>
            )}
          </div>
          
          {/* 性格傾向 */}
          <div>
            <h3 className="font-bold text-slate-700 mb-3">性格傾向</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-14 text-sm">🏠 穩定</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${player.stableScore}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-bold">{player.stableScore}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-14 text-sm">🚀 冒險</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${player.riskScore}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-bold">{player.riskScore}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-14 text-sm">🎨 創意</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${player.creativeScore}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-bold">{player.creativeScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}