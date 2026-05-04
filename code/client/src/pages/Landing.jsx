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
        <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-medium mb-6">
          <Sparkles size={18} />
          <span>AI-Powered Productivity</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          Task Management, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          DekNek helps you organize your workflow, prioritize what matters, and uses AI to suggest your next best move.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition shadow-xl shadow-indigo-200"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-lg transition shadow-sm"
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
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
            <LayoutList size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Organize Anything</h3>
          <p className="text-gray-500">Break down big goals into manageable tasks with priorities and deadlines.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600 mb-4">
            <Sparkles size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Suggestions</h3>
          <p className="text-gray-500">Let DekNek's AI analyze your context and suggest what you should tackle next.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
            <Target size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Hit Deadlines</h3>
          <p className="text-gray-500">Stay on top of your schedule with visual status tracking and urgency indicators.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
