import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

export default function ActivityBoard({ choicesHistory = [], completedTasks = [] }) {
  const sortedHistory = [...choicesHistory].reverse();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-violet-600" />
        <h3 className="font-bold text-slate-800">活動記錄板</h3>
        <span className="ml-auto text-xs text-slate-500">{choicesHistory.length} 個決定</span>
      </div>
      
      <ScrollArea className="h-[calc(100%-3rem)]">
        <div className="space-y-3 pr-4">
          {sortedHistory.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-2">📭</span>
              <p className="text-sm text-slate-400">未有任何記錄</p>
            </div>
          ) : (
            sortedHistory.map((choice, index) => {
              const timeDiff = new Date() - new Date(choice.timestamp);
              const minutesAgo = Math.floor(timeDiff / 60000);
              const timeText = minutesAgo < 1 ? '剛剛' : `${minutesAgo}分鐘前`;
              
              return (
                <motion.div
                  key={`${choice.event_id}_${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-3 border-l-4 border-violet-400"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎲</span>
                      <div>
                        <p className="text-xs text-violet-600 font-medium">事件 #{sortedHistory.length - index}</p>
                        <p className="text-xs text-slate-400">{timeText}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 mb-2">
                    <span className="font-medium">你嘅決定：</span>
                    {choice.choice}
                  </p>
                  
                  {/* 顯示效果 */}
                  {choice.effects && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {choice.effects.money !== undefined && choice.effects.money !== 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1
                          ${choice.effects.money > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          💰 {choice.effects.money > 0 ? '+' : ''}{choice.effects.money}
                        </span>
                      )}
                      {choice.effects.stress !== undefined && choice.effects.stress !== 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1
                          ${choice.effects.stress > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          😤 {choice.effects.stress > 0 ? '+' : ''}{choice.effects.stress}
                        </span>
                      )}
                      {choice.effects.happiness !== undefined && choice.effects.happiness !== 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1
                          ${choice.effects.happiness > 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                          😊 {choice.effects.happiness > 0 ? '+' : ''}{choice.effects.happiness}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
          
          {/* 完成的任務 */}
          {completedTasks.length > 0 && (
            <div className="pt-4 mt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-600 mb-2">✅ 完成咗嘅試工</h4>
              <div className="space-y-2">
                {completedTasks.map((taskId, index) => (
                  <div key={taskId} className="bg-emerald-50 rounded-lg p-2 border border-emerald-200">
                    <span className="text-xs text-emerald-700 font-medium">🎯 職業試工 #{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}