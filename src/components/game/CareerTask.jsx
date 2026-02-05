import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// 護士病人分流任務
function NurseTask({ task, onComplete }) {
  const [patients, setPatients] = useState([...task.data]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newPatients = [...patients];
    const [dragged] = newPatients.splice(draggedIndex, 1);
    newPatients.splice(index, 0, dragged);
    setPatients(newPatients);
    setDraggedIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  
  const checkAnswer = () => {
    // 檢查是否按緊急程度排序 (3 > 2 > 1)
    let score = 0;
    const sortedCorrectly = patients.every((p, i) => {
      if (i === 0) return true;
      return patients[i - 1].urgency >= p.urgency;
    });
    
    if (sortedCorrectly) {
      score = 100;
    } else {
      // 部分分數
      score = 50;
    }
    
    onComplete(score);
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600 text-center">
        將病人由最緊急到最唔緊急排列（拖放調整）
      </p>
      
      <div className="space-y-2">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.name}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`p-3 rounded-xl bg-white border-2 cursor-move
              ${draggedIndex === index ? 'border-blue-400 shadow-lg' : 'border-slate-200'}
              hover:border-blue-300 transition-all`}
            layout
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏥</span>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-slate-500">{patient.condition}</p>
                </div>
              </div>
              <span className="text-slate-400">⋮⋮</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <Button onClick={checkAnswer} className="w-full">
        確認順序
      </Button>
    </div>
  );
}

// 會計計數任務
function CalculationTask({ task, onComplete }) {
  const [answer, setAnswer] = useState('');
  
  const checkAnswer = () => {
    const numAnswer = parseInt(answer);
    const score = numAnswer === task.correctAnswer ? 100 : 0;
    onComplete(score);
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-slate-600 mb-3">計算以下支出總額：</p>
        {task.items.map((item, i) => (
          <div key={i} className="flex justify-between py-1 border-b border-slate-200 last:border-0">
            <span>{item.name}</span>
            <span className="font-mono">${item.amount}</span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <span className="text-2xl self-center">$</span>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="flex-1 p-3 rounded-xl border-2 border-slate-200 focus:border-blue-400 
            outline-none text-xl font-mono text-center"
          placeholder="總額"
        />
      </div>
      
      <Button onClick={checkAnswer} className="w-full" disabled={!answer}>
        提交答案
      </Button>
    </div>
  );
}

// YouTuber標題選擇任務
function ChoiceTask({ task, onComplete }) {
  const [selected, setSelected] = useState(null);
  
  const handleSelect = (index) => {
    setSelected(index);
  };
  
  const handleSubmit = () => {
    if (selected !== null) {
      onComplete(task.options[selected].score);
    }
  };
  
  return (
    <div className="space-y-3">
      {task.options.map((option, i) => (
        <motion.button
          key={i}
          onClick={() => handleSelect(i)}
          className={`w-full p-4 rounded-xl text-left transition-all
            ${selected === i 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
              : 'bg-white border-2 border-slate-200 hover:border-purple-300'}
          `}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">{option.text}</span>
        </motion.button>
      ))}
      
      <Button onClick={handleSubmit} className="w-full mt-4" disabled={selected === null}>
        確定選擇
      </Button>
    </div>
  );
}

export default function CareerTask({ task, isOpen, onComplete, onClose }) {
  const [timeLeft, setTimeLeft] = useState(task?.timeLimit || 30);
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  useEffect(() => {
    if (!isOpen || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen, showResult]);
  
  const handleComplete = (taskScore) => {
    setScore(taskScore);
    setShowResult(true);
  };
  
  const handleFinish = () => {
    const passed = score >= task.passScore;
    onComplete(passed, score);
    setShowResult(false);
    setScore(null);
    setTimeLeft(task?.timeLimit || 30);
  };
  
  if (!task || !isOpen) return null;
  
  const renderTask = () => {
    switch (task.type) {
      case 'sorting':
        return <NurseTask task={task} onComplete={handleComplete} />;
      case 'calculation':
        return <CalculationTask task={task} onComplete={handleComplete} />;
      case 'choice':
        return <ChoiceTask task={task} onComplete={handleComplete} />;
      default:
        return <div>任務類型唔支援</div>;
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
          className="bg-gradient-to-b from-slate-50 to-white rounded-3xl max-w-md w-full p-6 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          {!showResult ? (
            <>
              {/* 任務標題 */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl">👔</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {task.career} 試工
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800">{task.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{task.description}</p>
              </div>
              
              {/* 計時器 */}
              <div className="flex justify-center mb-4">
                <div className={`px-4 py-2 rounded-full ${timeLeft <= 10 ? 'bg-red-100' : 'bg-slate-100'}`}>
                  <span className={`font-mono text-lg font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-slate-700'}`}>
                    ⏱️ {timeLeft}秒
                  </span>
                </div>
              </div>
              
              {/* 任務內容 */}
              {renderTask()}
            </>
          ) : (
            /* 結果畫面 */
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <span className="text-6xl">
                  {score >= task.passScore ? '🎉' : '💪'}
                </span>
              </motion.div>
              
              <h2 className="text-2xl font-bold mt-4">
                {score >= task.passScore ? '做得好！' : '再接再厲！'}
              </h2>
              
              <div className="my-4">
                <span className="text-4xl font-bold" style={{ 
                  color: score >= task.passScore ? '#22c55e' : '#f59e0b' 
                }}>
                  {score}分
                </span>
                <p className="text-slate-500 text-sm mt-1">
                  合格分數：{task.passScore}分
                </p>
              </div>
              
              <p className="text-slate-600 mb-4">
                {score >= task.passScore 
                  ? `你好適合做${task.career}！繼續努力💪` 
                  : `${task.career}呢份工都幾有挑戰性，繼續練習！`}
              </p>
              
              <Button onClick={handleFinish} className="w-full">
                繼續遊戲
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}