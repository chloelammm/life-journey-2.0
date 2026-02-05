import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, BarChart3, Volume2, VolumeX } from 'lucide-react';

import SetupScreen from '@/components/game/SetupScreen';
import LargeGameBoard from '@/components/game/LargeGameBoard';
import Dashboard from '@/components/game/Dashboard';
import RadarChart from '@/components/game/RadarChart';
import Dice from '@/components/game/Dice';
import SpinWheel from '@/components/game/SpinWheel';
import PathSelector from '@/components/game/PathSelector';
import CareerTask from '@/components/game/CareerTask';
import AIAnalysis from '@/components/game/AIAnalysis';
import GameReport from '@/components/game/GameReport';
import CardDraw from '@/components/game/CardDraw';
import MilestonePopup from '@/components/game/MilestonePopup';
import PlayerProfile from '@/components/game/PlayerProfile';
import ActivityBoard from '@/components/game/ActivityBoard';
import { EVENT_CARDS, CAREER_TASKS, CANTONESE_VOICE, MILESTONES } from '@/components/game/GameData';

export default function Game() {
  // 遊戲狀態
  const [gameState, setGameState] = useState('setup'); // setup, playing, finished
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // 玩家數據
  const [player, setPlayer] = useState({
    name: '',
    age: 15,
    gender: 'male',
    position: 0,
    path: null,
    money: 50,
    stress: 30,
    happiness: 60,
    stableScore: 33,
    riskScore: 33,
    creativeScore: 33,
    choicesHistory: [],
    completedTasks: []
  });
  
  // 卡片收集
  const [collectedValues, setCollectedValues] = useState([]);
  const [collectedSuperpowers, setCollectedSuperpowers] = useState([]);
  const [collectedSkills, setCollectedSkills] = useState([]);
  const [completedMilestones, setCompletedMilestones] = useState([]);
  
  // UI狀態
  const [canRoll, setCanRoll] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showEventWheel, setShowEventWheel] = useState(false);
  const [showPathSelector, setShowPathSelector] = useState(false);
  const [showCareerTask, setShowCareerTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showCardDraw, setShowCardDraw] = useState(false);
  const [cardDrawType, setCardDrawType] = useState('value');
  const [showMilestone, setShowMilestone] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const [showPlayerProfile, setShowPlayerProfile] = useState(false);
  const [message, setMessage] = useState('');
  const [eventsTriggered, setEventsTriggered] = useState(0);
  
  // 開始遊戲
  const handleStart = (setupData) => {
    setPlayer(prev => ({
      ...prev,
      name: setupData.name,
      age: setupData.age,
      gender: setupData.gender,
      stableScore: setupData.initialTraits.stable || 33,
      riskScore: setupData.initialTraits.risk || 33,
      creativeScore: setupData.initialTraits.creative || 33
    }));
    setGameState('playing');
    showMessage(CANTONESE_VOICE.welcome);
  };
  
  // 顯示訊息
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };
  
  // 擲骰子
  const handleRoll = (value) => {
    showMessage(`🎲 擲到 ${value}！行 ${value} 步！`);
    setCanRoll(false);
    
    const newPosition = player.position + value;
    
    // 檢查是否到達分岔路
    if (player.position < 25 && newPosition >= 25 && !player.path) {
      setPlayer(prev => ({ ...prev, position: 25 }));
      setTimeout(() => {
        setShowPathSelector(true);
      }, 500);
      return;
    }
    
    // 更新位置
    setPlayer(prev => ({ ...prev, position: newPosition }));
    
    // 檢查是否觸發事件
    setTimeout(() => {
      checkForEvent(newPosition);
    }, 800);
  };
  
  // 選擇路徑
  const handlePathSelect = (path) => {
    setShowPathSelector(false);
    setPlayer(prev => ({ ...prev, path, position: 26 }));
    showMessage(`你選擇咗${path === 'stable' ? '穩定' : path === 'creative' ? '創意' : path === 'business' ? '商業' : '科技'}之路！`);
    setCanRoll(true);
  };
  
  // 檢查事件觸發
  const checkForEvent = (position) => {
    // 檢查是否完成遊戲（退休）
    if (position >= 99) {
      setGameState('finished');
      setShowReport(true);
      return;
    }
    
    // 事件觸發機率 (位置 2,4,6,8... 有事件)
    const shouldTriggerEvent = position % 2 === 0 || Math.random() < 0.4;
    
    if (shouldTriggerEvent && eventsTriggered < 10) {
      // 隨機選擇事件
      const availableEvents = EVENT_CARDS.filter(e => 
        !player.choicesHistory.some(c => c.event_id === e.id)
      );
      
      if (availableEvents.length > 0) {
        const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
        setCurrentEvent(randomEvent);
        setShowEventWheel(true);
        showMessage(CANTONESE_VOICE.event_trigger);
        setEventsTriggered(prev => prev + 1);
        return;
      }
    }
    
    // 檢查是否觸發職業試工 (每5步一次機會)
    if (position > 5 && position % 5 === 0 && player.path) {
      const availableTasks = CAREER_TASKS.filter(t => 
        t.path === player.path && !player.completedTasks.includes(t.id)
      );
      
      if (availableTasks.length > 0 && Math.random() < 0.5) {
        const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
        setCurrentTask(randomTask);
        setShowCareerTask(true);
        showMessage(CANTONESE_VOICE.task_start);
        return;
      }
    }
    
    // 檢查里程碑
    const milestone = MILESTONES.find(m => 
      m.position === position && !completedMilestones.some(cm => cm.id === m.id)
    );
    if (milestone) {
      setCurrentMilestone(milestone);
      setShowMilestone(true);
      return;
    }
    
    // 隨機觸發卡片抽取 (30%機會)
    if (Math.random() < 0.3 && position > 2) {
      const cardTypes = ['value', 'superpower', 'skill'];
      const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      setCardDrawType(randomType);
      setShowCardDraw(true);
      return;
    }
    
    setCanRoll(true);
  };
  
  // 處理卡片選擇
  const handleCardSelect = (card, cardType) => {
    setShowCardDraw(false);
    
    if (cardType === 'value') {
      setCollectedValues(prev => [...prev, card]);
      showMessage(`💎 獲得價值觀卡：${card.name}！`);
    } else if (cardType === 'superpower') {
      setCollectedSuperpowers(prev => [...prev, card]);
      showMessage(`⚡ 發現超能力：${card.name}！`);
    } else {
      setCollectedSkills(prev => [...prev, card]);
      showMessage(`🎯 學識技能：${card.name}！`);
    }
    
    setCanRoll(true);
  };
  
  // 處理里程碑獎勵
  const handleMilestoneClaim = () => {
    if (!currentMilestone) return;
    
    setCompletedMilestones(prev => [...prev, currentMilestone]);
    
    // 應用獎勵
    const reward = currentMilestone.reward;
    setPlayer(prev => ({
      ...prev,
      money: Math.min(100, prev.money + (reward.money || 0)),
      stress: Math.max(0, prev.stress + (reward.stress || 0)),
      happiness: Math.min(100, prev.happiness + (reward.happiness || 0))
    }));
    
    showMessage(`🏆 里程碑達成：${currentMilestone.name}！`);
    setShowMilestone(false);
    setCurrentMilestone(null);
    setCanRoll(true);
  };
  
  // 處理事件選擇
  const handleEventChoice = (option, index) => {
    setShowEventWheel(false);
    
    // 更新指標
    const effect = option.effect;
    setPlayer(prev => {
      const newMoney = Math.max(0, Math.min(100, prev.money + effect.money));
      const newStress = Math.max(0, Math.min(100, prev.stress + effect.stress));
      const newHappiness = Math.max(0, Math.min(100, prev.happiness + effect.happiness));
      
      // 更新性格傾向
      let stableScore = prev.stableScore;
      let riskScore = prev.riskScore;
      let creativeScore = prev.creativeScore;
      
      if (option.trait === 'stable') stableScore = Math.min(100, stableScore + 8);
      if (option.trait === 'risk') riskScore = Math.min(100, riskScore + 8);
      if (option.trait === 'creative') creativeScore = Math.min(100, creativeScore + 8);
      
      return {
        ...prev,
        money: newMoney,
        stress: newStress,
        happiness: newHappiness,
        stableScore,
        riskScore,
        creativeScore,
        choicesHistory: [...prev.choicesHistory, {
          event_id: currentEvent.id,
          choice: option.text,
          effects: effect,
          timestamp: new Date().toISOString()
        }]
      };
    });
    
    // 顯示效果動畫
    if (effect.money > 0) showMessage('💰 錢增加咗！');
    else if (effect.money < 0) showMessage('💸 花咗錢...');
    if (effect.stress > 10) showMessage('😰 壓力上升！');
    if (effect.happiness > 10) showMessage('😊 開心指數UP！');
    
    setCurrentEvent(null);
    
    // 每3個選擇顯示AI分析
    if ((eventsTriggered) % 3 === 0 && eventsTriggered > 0) {
      setTimeout(() => {
        setShowAIAnalysis(true);
      }, 1000);
    } else {
      setCanRoll(true);
    }
  };
  
  // 處理職業任務完成
  const handleTaskComplete = (passed, score) => {
    setShowCareerTask(false);
    
    if (passed) {
      showMessage(CANTONESE_VOICE.task_pass + ` 得咗${score}分！`);
      setPlayer(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 10),
        completedTasks: [...prev.completedTasks, currentTask.id]
      }));
    } else {
      showMessage(CANTONESE_VOICE.task_fail);
    }
    
    setCurrentTask(null);
    setCanRoll(true);
  };
  
  // 重新開始
  const handleRestart = () => {
    setGameState('setup');
    setPlayer({
      name: '',
      age: 15,
      gender: 'male',
      position: 0,
      path: null,
      money: 50,
      stress: 30,
      happiness: 60,
      stableScore: 33,
      riskScore: 33,
      creativeScore: 33,
      choicesHistory: [],
      completedTasks: []
    });
    setCollectedValues([]);
    setCollectedSuperpowers([]);
    setCollectedSkills([]);
    setCompletedMilestones([]);
    setEventsTriggered(0);
    setShowReport(false);
    setCanRoll(true);
  };
  
  // 設置畫面
  if (gameState === 'setup') {
    return <SetupScreen onStart={handleStart} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-violet-50 to-amber-50">
      {/* 頂部 HUD */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 p-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {player.gender === 'male' ? '👦' : player.gender === 'female' ? '👧' : '🤖'}
              </span>
              <div>
                <p className="font-bold text-slate-800">{player.name}</p>
                <p className="text-xs text-slate-500">{player.age}歲 • 第{player.position}步</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlayerProfile(true)}
                className="w-8 h-8"
                title="玩家資料"
              >
                <span className="text-lg">📋</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-8 h-8"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAIAnalysis(true)}
                className="w-8 h-8"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* 快速指標 */}
          <div className="flex gap-2">
            <div className="flex-1 bg-emerald-100 rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-xs">💰</span>
              <div className="flex-1 h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${player.money}%` }} />
              </div>
              <span className="text-xs font-bold text-emerald-700">{player.money}</span>
            </div>
            <div className="flex-1 bg-red-100 rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-xs">😤</span>
              <div className="flex-1 h-1.5 bg-red-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${player.stress}%` }} />
              </div>
              <span className="text-xs font-bold text-red-700">{player.stress}</span>
            </div>
            <div className="flex-1 bg-blue-100 rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-xs">😊</span>
              <div className="flex-1 h-1.5 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${player.happiness}%` }} />
              </div>
              <span className="text-xs font-bold text-blue-700">{player.happiness}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 訊息提示 */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium">
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 主遊戲區域 - 左右分欄 */}
      <div className="flex gap-4 p-4 max-w-[1600px] mx-auto">
        {/* 左側：控制面板 */}
        <div className="w-80 flex-shrink-0 space-y-4">
          {/* 儀表板 */}
          <Dashboard
            money={player.money}
            stress={player.stress}
            happiness={player.happiness}
          />
          
          {/* 雷達圖 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <RadarChart
              stable={player.stableScore}
              risk={player.riskScore}
              creative={player.creativeScore}
            />
          </div>
          
          {/* 骰子 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex justify-center">
            <Dice onRoll={handleRoll} disabled={!canRoll} />
          </div>
          
          {/* 活動記錄板 */}
          <div className="h-96">
            <ActivityBoard 
              choicesHistory={player.choicesHistory}
              completedTasks={player.completedTasks}
            />
          </div>
        </div>
        
        {/* 中間：超大棋盤（可滾動） */}
        <div className="flex-1 bg-white/50 rounded-3xl p-4 shadow-lg overflow-y-auto max-h-[calc(100vh-6rem)]">
          <LargeGameBoard
            playerPosition={player.position}
            playerGender={player.gender}
            currentPath={player.path}
          />
        </div>
      </div>
      
      {/* 彈窗 */}
      <SpinWheel
        event={currentEvent}
        onSelect={handleEventChoice}
        isOpen={showEventWheel}
      />
      
      <PathSelector
        isOpen={showPathSelector}
        onSelect={handlePathSelect}
      />
      
      <CareerTask
        task={currentTask}
        isOpen={showCareerTask}
        onComplete={handleTaskComplete}
        onClose={() => { setShowCareerTask(false); setCanRoll(true); }}
      />
      
      <AIAnalysis
        isOpen={showAIAnalysis}
        stableScore={player.stableScore}
        riskScore={player.riskScore}
        creativeScore={player.creativeScore}
        money={player.money}
        stress={player.stress}
        happiness={player.happiness}
        choicesHistory={player.choicesHistory}
        onClose={() => { setShowAIAnalysis(false); setCanRoll(true); }}
      />
      
      <GameReport
        isOpen={showReport}
        playerName={player.name}
        currentPath={player.path}
        money={player.money}
        stress={player.stress}
        happiness={player.happiness}
        stableScore={player.stableScore}
        riskScore={player.riskScore}
        creativeScore={player.creativeScore}
        choicesHistory={player.choicesHistory}
        onRestart={handleRestart}
        onClose={() => setShowReport(false)}
      />
      
      <CardDraw
        isOpen={showCardDraw}
        cardType={cardDrawType}
        onSelect={handleCardSelect}
        onClose={() => { setShowCardDraw(false); setCanRoll(true); }}
      />
      
      <MilestonePopup
        isOpen={showMilestone}
        milestone={currentMilestone}
        onClaim={handleMilestoneClaim}
      />
      
      <PlayerProfile
        isOpen={showPlayerProfile}
        player={player}
        collectedValues={collectedValues}
        collectedSuperpowers={collectedSuperpowers}
        collectedSkills={collectedSkills}
        completedMilestones={completedMilestones}
        onClose={() => setShowPlayerProfile(false)}
      />
    </div>
  );
}