import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, LayoutList, Target } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-medium mb-6 transition-colors">
          <Sparkles size={18} />
          <span>AI-Powered Productivity</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight mb-6">
          Task Management, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Reimagined.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-slate-400 mb-10 leading-relaxed">
          TaskIQ helps you organize your workflow, prioritize what matters, and uses AI to suggest your next best move.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition shadow-xl shadow-indigo-200 dark:shadow-indigo-500/20"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/60 dark:bg-slate-800/40 border border-gray-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-gray-800 dark:text-slate-100 font-bold text-lg transition backdrop-blur-sm shadow-sm"
          >
            Log In
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 dark:bg-black/40 border-gray-100 dark:border-white/5">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-blue-600 dark:text-blue-400 mb-4">
            <LayoutList size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-slate-100">Organize Anything</h3>
          <p className="text-gray-500 dark:text-slate-400">Break down big goals into manageable tasks with priorities and deadlines.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 dark:bg-black/40 border-gray-100 dark:border-white/5">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full text-purple-600 dark:text-purple-400 mb-4">
            <Sparkles size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-slate-100">AI Suggestions</h3>
          <p className="text-gray-500 dark:text-slate-400">Let TaskIQ's AI analyze your context and suggest what you should tackle next.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 dark:bg-black/40 border-gray-100 dark:border-white/5">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600 dark:text-green-400 mb-4">
            <Target size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-slate-100">Hit Deadlines</h3>
          <p className="text-gray-500 dark:text-slate-400">Stay on top of your schedule with visual status tracking and urgency indicators.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
