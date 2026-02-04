import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { VALUE_CARDS, SUPERPOWER_CARDS, SKILL_CARDS } from './GameData';

export default function CardDraw({ 
  isOpen, 
  cardType = 'value', // 'value', 'superpower', 'skill'
  onSelect,
  onClose 
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCards, setDrawnCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  if (!isOpen) return null;
  
  const cardPool = cardType === 'value' ? VALUE_CARDS : 
                   cardType === 'superpower' ? SUPERPOWER_CARDS : SKILL_CARDS;
  
  const cardTypeInfo = {
    value: { title: '價值觀卡', emoji: '💎', color: 'from-amber-400 to-orange-500' },
    superpower: { title: '超能力卡', emoji: '⚡', color: 'from-violet-400 to-purple-500' },
    skill: { title: '技能卡', emoji: '🎯', color: 'from-cyan-400 to-blue-500' }
  };
  
  const info = cardTypeInfo[cardType];
  
  const handleDraw = () => {
    setIsDrawing(true);
    
    // 隨機抽3張卡
    const shuffled = [...cardPool].sort(() => Math.random() - 0.5);
    const drawn = shuffled.slice(0, 3);
    
    setTimeout(() => {
      setDrawnCards(drawn);
      setIsDrawing(false);
    }, 1000);
  };
  
  const handleSelect = (card) => {
    setSelectedCard(card);
  };
  
  const handleConfirm = () => {
    if (selectedCard) {
      onSelect(selectedCard, cardType);
      setDrawnCards([]);
      setSelectedCard(null);
    }
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
          className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* 標題 */}
          <div className="text-center mb-6">
            <motion.span 
              className="text-5xl block mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {info.emoji}
            </motion.span>
            <h2 className="text-2xl font-bold text-slate-800">{info.title}</h2>
            <p className="text-slate-500 text-sm mt-1">
              {cardType === 'value' ? '揀一張代表你嘅價值觀' :
               cardType === 'superpower' ? '發現你嘅超能力！' :
               '學習21世紀技能'}
            </p>
          </div>
          
          {drawnCards.length === 0 ? (
            /* 抽卡按鈕 */
            <div className="text-center">
              <motion.div
                className="relative w-40 h-56 mx-auto mb-6"
                animate={isDrawing ? { rotateY: [0, 180, 360] } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {/* 卡背 */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${info.color} 
                  shadow-lg flex items-center justify-center`}>
                  <span className="text-6xl text-white/30">?</span>
                  <div className="absolute inset-2 border-2 border-white/20 rounded-xl" />
                </div>
              </motion.div>
              
              <Button 
                onClick={handleDraw} 
                disabled={isDrawing}
                className={`bg-gradient-to-r ${info.color} text-white px-8 py-6 text-lg`}
              >
                {isDrawing ? '抽緊...' : '抽卡！'}
              </Button>
            </div>
          ) : (
            /* 顯示抽到的卡 */
            <div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {drawnCards.map((card, i) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleSelect(card)}
                    initial={{ opacity: 0, y: 20, rotateY: 180 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`relative rounded-xl p-4 text-center transition-all
                      ${selectedCard?.id === card.id 
                        ? `ring-4 ring-offset-2 scale-105 bg-gradient-to-br ${info.color} text-white` 
                        : 'bg-slate-50 hover:bg-slate-100'}
                    `}
                  >
                    <span className="text-3xl block mb-2">{card.icon}</span>
                    <h3 className={`font-bold text-sm mb-1 ${selectedCard?.id === card.id ? 'text-white' : 'text-slate-800'}`}>
                      {card.name}
                    </h3>
                    <p className={`text-[10px] leading-tight ${selectedCard?.id === card.id ? 'text-white/80' : 'text-slate-500'}`}>
                      {card.description}
                    </p>
                    
                    {/* 推薦職業 (只有超能力卡有) */}
                    {card.careers && selectedCard?.id === card.id && (
                      <div className="mt-2 flex flex-wrap gap-1 justify-center">
                        {card.careers.slice(0, 2).map(c => (
                          <span key={c} className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded-full">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {selectedCard && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button onClick={handleConfirm} className="w-full">
                    確定選擇 「{selectedCard.name}」
                  </Button>
                </motion.div>
              )}
            </div>
          )}
          
          {/* 關閉按鈕 */}
          {drawnCards.length === 0 && !isDrawing && (
            <button 
              onClick={onClose}
              className="mt-4 w-full text-sm text-slate-400 hover:text-slate-600"
            >
              跳過
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}