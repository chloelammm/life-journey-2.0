import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function MilestonePopup({ 
  isOpen, 
  milestone,
  onClaim 
}) {
  if (!isOpen || !milestone) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-b from-amber-50 to-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center"
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          {/* 慶祝動畫 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* 光環效果 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400 rounded-full"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-50px)`
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
            
            <span className="text-7xl block">{milestone.icon}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-amber-700 mt-4 mb-2">
              🎉 里程碑達成！
            </h2>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {milestone.name}
            </h3>
            <p className="text-slate-600 mb-4">
              {milestone.description}
            </p>
            
            {/* 獎勵顯示 */}
            <div className="bg-amber-100 rounded-xl p-4 mb-4">
              <p className="text-sm text-amber-700 font-medium mb-2">獎勵</p>
              <div className="flex justify-center gap-4">
                {milestone.reward.money && (
                  <div className="flex items-center gap-1">
                    <span className="text-xl">💰</span>
                    <span className="font-bold text-emerald-600">+{milestone.reward.money}</span>
                  </div>
                )}
                {milestone.reward.happiness && (
                  <div className="flex items-center gap-1">
                    <span className="text-xl">😊</span>
                    <span className="font-bold text-blue-600">+{milestone.reward.happiness}</span>
                  </div>
                )}
                {milestone.reward.stress && (
                  <div className="flex items-center gap-1">
                    <span className="text-xl">😌</span>
                    <span className="font-bold text-green-600">{milestone.reward.stress}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              onClick={onClaim}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
            >
              領取獎勵！
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}