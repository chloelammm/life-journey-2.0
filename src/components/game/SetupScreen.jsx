import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const INTEREST_QUESTIONS = [
  {
    question: "放假你最想做咩？",
    options: [
      { text: "睇書溫習", trait: "stable", icon: "📚" },
      { text: "畫畫創作", trait: "creative", icon: "🎨" },
      { text: "出去玩/冒險", trait: "risk", icon: "🏃" },
      { text: "打機/睇片", trait: "creative", icon: "🎮" }
    ]
  },
  {
    question: "你理想嘅工作環境係點？",
    options: [
      { text: "大公司/政府工", trait: "stable", icon: "🏢" },
      { text: "自己創業", trait: "risk", icon: "🚀" },
      { text: "藝術工作室", trait: "creative", icon: "🎭" },
      { text: "Remote/自由工作", trait: "creative", icon: "💻" }
    ]
  },
  {
    question: "攞到$10,000你會點用？",
    options: [
      { text: "存入銀行", trait: "stable", icon: "🏦" },
      { text: "投資/創業", trait: "risk", icon: "📈" },
      { text: "買自己鍾意嘅嘢", trait: "creative", icon: "🛍️" },
      { text: "去旅行", trait: "risk", icon: "✈️" }
    ]
  },
  {
    question: "你覺得成功係...?",
    options: [
      { text: "穩定生活", trait: "stable", icon: "🏠" },
      { text: "賺大錢", trait: "risk", icon: "💰" },
      { text: "做自己鍾意嘅嘢", trait: "creative", icon: "❤️" },
      { text: "有影響力", trait: "risk", icon: "⭐" }
    ]
  }
];

export default function SetupScreen({ onStart }) {
  const [step, setStep] = useState(0); // 0: intro, 1: name/age, 2-5: questions
  const [name, setName] = useState('');
  const [age, setAge] = useState(15);
  const [gender, setGender] = useState('male');
  const [answers, setAnswers] = useState([]);
  
  const handleAnswer = (trait) => {
    setAnswers([...answers, trait]);
    if (step < 5) {
      setStep(step + 1);
    } else {
      // 計算初始傾向
      const traits = { stable: 0, risk: 0, creative: 0 };
      answers.forEach(a => traits[a] = (traits[a] || 0) + 25);
      traits[trait] = (traits[trait] || 0) + 25;
      
      onStart({
        name: name || '玩家',
        age,
        gender,
        initialTraits: traits
      });
    }
  };
  
  const handleBasicInfo = () => {
    if (name.trim()) {
      setStep(2);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-500 via-purple-500 to-indigo-600 
      flex items-center justify-center p-4">
      <motion.div
        className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-md w-full p-8 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        key={step}
      >
        {step === 0 && (
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-7xl mb-4"
            >
              🛤️
            </motion.div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">人生路</h1>
            <p className="text-slate-500 mb-6">
              一個關於選擇同未來嘅遊戲
            </p>
            
            <div className="space-y-3 text-left bg-violet-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-violet-700">
                🎯 從黃大仙出發，經歷人生大小事
              </p>
              <p className="text-sm text-violet-700">
                🎲 每個選擇都會影響你嘅金錢、壓力同快樂
              </p>
              <p className="text-sm text-violet-700">
                💼 試下唔同職業，搵出適合自己嘅路
              </p>
              <p className="text-sm text-violet-700">
                🤖 AI會分析你嘅選擇，俾你專屬建議
              </p>
            </div>
            
            <Button 
              onClick={() => setStep(1)} 
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              size="lg"
            >
              開始遊戲 🚀
            </Button>
          </motion.div>
        )}
        
        {step === 1 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
              👋 你好！先認識下你
            </h2>
            
            {/* 名字 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                你嘅名字係...
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="輸入你嘅名字"
                className="text-lg"
              />
            </div>
            
            {/* 年齡 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                你今年幾歲？ <span className="text-violet-600 font-bold">{age}歲</span>
              </label>
              <Slider
                value={[age]}
                onValueChange={(v) => setAge(v[0])}
                min={12}
                max={18}
                step={1}
                className="mt-3"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>12歲</span>
                <span>18歲</span>
              </div>
            </div>
            
            {/* 角色選擇 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-3">
                揀個角色代表你
              </label>
              <div className="flex justify-center gap-4">
                {[
                  { key: 'male', emoji: '👦', label: '男仔' },
                  { key: 'female', emoji: '👧', label: '女仔' },
                  { key: 'robot', emoji: '🤖', label: '機械人' }
                ].map((option) => (
                  <motion.button
                    key={option.key}
                    onClick={() => setGender(option.key)}
                    className={`w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-1
                      transition-all ${gender === option.key 
                        ? 'bg-violet-100 border-2 border-violet-400 shadow-lg scale-105' 
                        : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-4xl">{option.emoji}</span>
                    <span className="text-xs text-slate-600">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handleBasicInfo} 
              className="w-full"
              disabled={!name.trim()}
            >
              下一步 →
            </Button>
          </motion.div>
        )}
        
        {step >= 2 && step <= 5 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* 進度條 */}
            <div className="flex gap-1 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all
                    ${i < step - 1 ? 'bg-violet-500' : 'bg-slate-200'}`}
                />
              ))}
            </div>
            
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">🤔</span>
              <h2 className="text-lg font-bold text-slate-800">
                {INTEREST_QUESTIONS[step - 2].question}
              </h2>
            </div>
            
            <div className="space-y-3">
              {INTEREST_QUESTIONS[step - 2].options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(option.trait)}
                  className="w-full p-4 rounded-xl bg-slate-50 hover:bg-violet-50 
                    border-2 border-slate-200 hover:border-violet-300
                    text-left transition-all flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-medium text-slate-700">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}