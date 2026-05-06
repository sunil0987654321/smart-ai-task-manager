import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';
import { PlusCircle, PenTool, Check, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomDropdown from './CustomDropdown';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const dispatch = useDispatch();

  const priorityOptions = [
    { value: 'High', label: 'High Priority', icon: <AlertCircle size={14} />, iconColor: 'text-rose-500' },
    { value: 'Medium', label: 'Medium Priority', icon: <AlertCircle size={14} />, iconColor: 'text-amber-500' },
    { value: 'Low', label: 'Low Priority', icon: <AlertCircle size={14} />, iconColor: 'text-emerald-500' },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    
    setIsSubmitting(true);
    const taskData = { title, description, priority };
    if (deadline) {
      taskData.deadline = deadline;
    }

    try {
      await dispatch(createTask(taskData)).unwrap();
      
      // Delay to show pen animation longer
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }, 1500); 

      if (onTaskAdded) {
        onTaskAdded();
      }

      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDeadline('');
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl dark:shadow-glow mb-8 transition-all duration-500 border-indigo-500/10 dark:border-indigo-500/20">
      <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
        <PlusCircle size={20} className="text-indigo-500" />
        <span>Add New Task</span>
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description (Optional)"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] outline-none transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomDropdown 
            value={priority}
            onChange={setPriority}
            options={priorityOptions}
            label="Priority"
            className="w-full"
          />
          <div className="relative group">
            <div className="flex items-center w-full pl-11 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-md text-sm font-medium transition-all min-h-[42px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none group-hover:scale-110 transition-transform">
                <Clock size={16} />
              </div>
              
              <span className={`transition-all ${deadline ? 'text-gray-700 dark:text-slate-200' : 'text-gray-400 dark:text-slate-500'}`}>
                {deadline ? new Date(deadline).toLocaleDateString() : 'deadline'}
              </span>

              <input
                type="date"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer custom-date-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!title || isSubmitting}
          aria-label="Add New Task"
          className={`w-full flex items-center justify-center space-x-2 px-6 py-2 font-medium rounded-lg transition mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover-line-animation ${
            showSuccess 
              ? 'bg-green-500 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-300 dark:disabled:bg-slate-800'
          }`}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="submitting"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ 
                    x: [0, 5, 0, 5, 0],
                    y: [0, -2, 0, -2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <PenTool size={18} />
                </motion.div>
                <span>Noting task...</span>
              </motion.div>
            ) : showSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-2"
              >
                <Check size={18} />
                <span>Task Added!</span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                className="flex items-center space-x-2"
              >
                <PlusCircle size={18} />
                <span>Add Task</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </div>
  );
};

export default TaskForm;
