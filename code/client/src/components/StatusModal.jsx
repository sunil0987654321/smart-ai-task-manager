import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, X } from 'lucide-react';

const ConfettiPiece = ({ color, style }) => (
  <motion.div
    initial={{ y: 0, x: 0, opacity: 1, scale: 0 }}
    animate={{ 
      y: [0, -100, 300], 
      x: [0, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 400],
      opacity: [1, 1, 0],
      rotate: [0, Math.random() * 360, Math.random() * 720],
      scale: [0, 1, 1]
    }}
    transition={{ duration: 2.5, ease: "easeOut" }}
    className={`absolute w-2 h-2 rounded-sm ${color}`}
    style={{ ...style, top: '50%', left: '50%' }}
  />
);

const Confetti = () => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  // Keep confetti pieces stable during render
  const [pieces] = useState(() => [...Array(40)].map((_, i) => colors[Math.floor(Math.random() * colors.length)]));
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((color, i) => (
        <ConfettiPiece key={i} color={color} />
      ))}
    </div>
  );
};

const StatusModal = ({ isOpen, onClose, type }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const isCompleted = type === 'Completed';

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl border ${
              isCompleted 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/80 dark:to-emerald-950/80 border-green-200 dark:border-green-500/30 shadow-green-900/20' 
                : 'bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/80 dark:to-blue-950/80 border-indigo-200 dark:border-indigo-500/30 shadow-indigo-900/20'
            }`}
            role="dialog"
            aria-modal="true"
          >
            {isCompleted && <Confetti />}
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-900"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            <div className="p-8 text-center relative z-0">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.1, type: "spring", damping: 15 }}
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-inner mb-5 ${
                  isCompleted 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' 
                    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                }`}
              >
                {isCompleted ? <CheckCircle size={40} /> : <Zap size={40} className="text-yellow-500 dark:text-yellow-400" />}
              </motion.div>
              
              <h3 className={`text-2xl font-bold mb-3 ${
                isCompleted ? 'text-green-800 dark:text-green-300' : 'text-indigo-800 dark:text-indigo-300'
              }`}>
                {isCompleted ? 'Congratulations! 🎉' : 'All the Best! 🚀'}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {isCompleted 
                  ? 'Task completed successfully. Great work!' 
                  : 'Stay focused and make progress step by step.'
                }
              </p>
            </div>
            
            {/* Subtle bottom accent glow */}
            <div className={`absolute bottom-0 left-0 right-0 h-1.5 blur-sm ${
              isCompleted ? 'bg-green-500/60' : 'bg-indigo-500/60'
            }`}></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default StatusModal;
