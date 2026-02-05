import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AI_ANALYSIS_TEMPLATES, BOARD_PATHS } from './GameData';

export default function GameReport({ 
  isOpen,
  playerName,
  finalCareer,
  currentPath,
  money,
  stress,
  happiness,
  stableScore,
  riskScore,
  creativeScore,
  choicesHistory,
  onRestart,
  onClose
}) {
  if (!isOpen) return null;
  
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
  const pathInfo = currentPath ? BOARD_PATHS.paths[currentPath] : null;
  
  // 計算總分
  const overallScore = Math.round((money + (100 - stress) + happiness) / 3);
  
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-violet-900 to-slate-900 flex items-center justify-center z-50 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl my-8"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* 頂部裝飾 */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-20" />
            <div className="absolute inset-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
          </motion.div>
          
          <h1 className="text-2xl font-bold text-slate-800 mt-4">恭喜完成人生路！</h1>
          <p className="text-slate-500">{playerName} 嘅人生報告</p>
        </div>
        
        {/* 最終路徑 */}
        {pathInfo && (
          <div className="bg-gradient-to-r rounded-2xl p-4 mb-4 text-white text-center"
            style={{ background: `linear-gradient(135deg, ${pathInfo.color}, ${pathInfo.color}dd)` }}>
            <span className="text-3xl">{pathInfo.icon}</span>
            <h2 className="text-lg font-bold mt-1">你選擇咗{pathInfo.name}</h2>
            <p className="text-sm opacity-90">可能成為：{pathInfo.careers.join('、')}</p>
          </div>
        )}
        
        {/* 性格分析 */}
        <div className="bg-violet-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{analysis.icon}</span>
            <div>
              <p className="text-xs text-violet-600">性格類型</p>
              <h3 className="font-bold text-violet-800">{analysis.title}</h3>
            </div>
          </div>
          <p className="text-sm text-violet-700 mt-2">{analysis.message}</p>
        </div>
        
        {/* 指標結果 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-xs text-emerald-600 mt-1">金錢</p>
            <p className="text-xl font-bold text-emerald-700">{money}%</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <span className="text-2xl">😤</span>
            <p className="text-xs text-red-600 mt-1">壓力</p>
            <p className="text-xl font-bold text-red-700">{stress}%</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <span className="text-2xl">😊</span>
            <p className="text-xs text-blue-600 mt-1">快樂</p>
            <p className="text-xl font-bold text-blue-700">{happiness}%</p>
          </div>
        </div>
        
        {/* 傾向分數 */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <h4 className="font-bold text-slate-700 mb-3">性格傾向</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-16 text-sm">🏠 穩定</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${stableScore}%` }} />
              </div>
              <span className="w-10 text-right text-sm font-bold">{stableScore}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-sm">🚀 冒險</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${riskScore}%` }} />
              </div>
              <span className="w-10 text-right text-sm font-bold">{riskScore}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-sm">🎨 創意</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${creativeScore}%` }} />
              </div>
              <span className="w-10 text-right text-sm font-bold">{creativeScore}%</span>
            </div>
          </div>
        </div>
        
        {/* 總評分 */}
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-4 mb-4 text-center">
          <p className="text-sm text-amber-700">人生滿意度</p>
          <div className="text-4xl font-bold text-amber-600 my-2">{overallScore}%</div>
          <p className="text-xs text-amber-600">
            {overallScore >= 80 ? '🌟 人生勝利組！' : 
             overallScore >= 60 ? '😊 生活充實！' :
             overallScore >= 40 ? '💪 仲有進步空間！' : '🤗 人生係一場學習！'}
          </p>
        </div>
        
        {/* 選擇回顧 */}
        {choicesHistory && choicesHistory.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 max-h-40 overflow-y-auto">
            <h4 className="font-bold text-slate-700 mb-2">📝 選擇回顧</h4>
            <div className="space-y-1">
              {choicesHistory.slice(-5).map((choice, i) => (
                <p key={i} className="text-xs text-slate-600">
                  • {choice.choice}
                </p>
              ))}
            </div>
          </div>
        )}
        
        {/* 推薦職業 */}
        <div className="mb-4">
          <h4 className="font-bold text-slate-700 mb-2">💼 推薦你嘅職業</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.careers.map((career) => (
              <span key={career} className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
                {career}
              </span>
            ))}
          </div>
        </div>
        
        {/* 按鈕 */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            關閉
          </Button>
          <Button onClick={onRestart} className="flex-1">
            🔄 再玩一次
          </Button>
        </div>
        
        <p className="text-center text-xs text-slate-400 mt-4">
          💡 記住：人生有好多可能性，呢個只係其中一條路！
        </p>
      </motion.div>
    </motion.div>
  );
}