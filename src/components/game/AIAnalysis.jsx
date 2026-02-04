import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AI_ANALYSIS_TEMPLATES } from './GameData';

export default function AIAnalysis({ 
  isOpen, 
  stableScore, 
  riskScore, 
  creativeScore,
  money,
  stress,
  happiness,
  choicesHistory,
  onClose 
}) {
  if (!isOpen) return null;
  
  // 計算主要傾向
  const getAnalysis = () => {
    if (stableScore >= riskScore && stableScore >= creativeScore && stableScore > 30) {
      return AI_ANALYSIS_TEMPLATES.stable_high;
    }
    if (riskScore >= stableScore && riskScore >= creativeScore && riskScore > 30) {
      return AI_ANALYSIS_TEMPLATES.risk_high;
    }
    if (creativeScore >= stableScore && creativeScore >= riskScore && creativeScore > 30) {
      return AI_ANALYSIS_TEMPLATES.creative_high;
    }
    return AI_ANALYSIS_TEMPLATES.balanced;
  };
  
  const analysis = getAnalysis();
  
  // 生成個性化建議
  const getAdvice = () => {
    const advices = [];
    
    if (stress > 60) {
      advices.push('😰 壓力有啲高，記得搵人傾下或者做運動減壓！');
    }
    if (money < 30) {
      advices.push('💸 理財方面要小心啲，學習儲蓄同投資！');
    }
    if (happiness < 40) {
      advices.push('😢 快樂指數有啲低，試下做啲自己鍾意嘅嘢！');
    }
    if (happiness > 70) {
      advices.push('😊 你嘅快樂指數好高，繼續保持正能量！');
    }
    
    if (advices.length === 0) {
      advices.push('✨ 你嘅各項指標都好平衡，繼續保持！');
    }
    
    return advices;
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
          className="bg-gradient-to-b from-violet-50 to-white rounded-3xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* AI頭像 */}
          <div className="text-center mb-4">
            <motion.div
              className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-400 to-purple-500 
                rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                boxShadow: ['0 0 20px rgba(139, 92, 246, 0.3)', '0 0 40px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.3)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-4xl">🤖</span>
            </motion.div>
            <h2 className="text-xl font-bold text-slate-800 mt-3">AI 分析報告</h2>
            <p className="text-sm text-slate-500">根據你嘅選擇，我幫你分析咗...</p>
          </div>
          
          {/* 性格類型 */}
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-md mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{analysis.icon}</span>
              <div>
                <p className="text-xs text-slate-500">你嘅性格類型</p>
                <h3 className="text-lg font-bold text-violet-600">{analysis.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {analysis.message}
            </p>
          </motion.div>
          
          {/* 推薦職業 */}
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-md mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-bold text-slate-700 mb-2">💼 推薦職業</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.careers.map((career, i) => (
                <motion.span
                  key={career}
                  className="px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 
                    text-violet-700 rounded-full text-sm font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {career}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          {/* 分數概覽 */}
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-md mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="font-bold text-slate-700 mb-3">📊 傾向分數</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>🏠 穩定</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stableScore}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-10">{stableScore}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚀 冒險</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${riskScore}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-10">{riskScore}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎨 創意</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${creativeScore}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-10">{creativeScore}%</span>
              </div>
            </div>
          </motion.div>
          
          {/* 個人化建議 */}
          <motion.div
            className="bg-amber-50 rounded-2xl p-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="font-bold text-amber-700 mb-2">💡 AI 建議</h4>
            <div className="space-y-2">
              {getAdvice().map((advice, i) => (
                <p key={i} className="text-sm text-amber-800">{advice}</p>
              ))}
            </div>
          </motion.div>
          
          {/* 廣東話語音提示 */}
          <motion.div
            className="bg-violet-100 rounded-xl p-3 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm text-violet-700">
              🎤 「{analysis.message.slice(0, 30)}...」
            </p>
          </motion.div>
          
          <Button onClick={onClose} className="w-full">
            繼續遊戲
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}