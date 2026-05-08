import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskSuggestions, resetTaskSuggestionsResult } from '../features/tasks/taskSlice';

const AiTaskSuggestionsModal = ({ isOpen, onClose, tasks }) => {
  const dispatch = useDispatch();
  const { isTaskSuggestionsLoading, taskSuggestionsResult } = useSelector(state => state.tasks);

  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  // Filter tasks for selection
  const eligibleTasks = tasks.filter(t => t.status === 'Todo' || t.status === 'InProgress');

  useEffect(() => {
    if (isOpen) {
      setSelectedTaskIds([]);
      dispatch(resetTaskSuggestionsResult());
    }
  }, [isOpen, dispatch]);

  const handleToggleTask = (id) => {
    setSelectedTaskIds(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const handleGetSuggestions = () => {
    if (selectedTaskIds.length === 0) return;
    dispatch(getTaskSuggestions({
      selectedTaskIds,
      allTasks: tasks
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
              <Sparkles className="w-6 h-6" />
              Get AI Suggestions
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {!taskSuggestionsResult && !isTaskSuggestionsLoading && (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Select Tasks:
                </p>
                {eligibleTasks.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No Todo or In Progress tasks available.</p>
                ) : (
                  <div className="space-y-3">
                    {eligibleTasks.map(task => (
                      <div 
                        key={task._id || task.id} 
                        onClick={() => handleToggleTask(task._id || task.id)}
                        className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${selectedTaskIds.includes(task._id || task.id) ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-slate-800 hover:border-indigo-300'}`}
                      >
                        <div className="mt-1">
                          <input 
                            type="checkbox" 
                            checked={selectedTaskIds.includes(task._id || task.id)}
                            onChange={() => {}}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-800"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                              Priority: {task.priority}
                            </span>
                            {task.deadline && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Deadline: {new Date(task.deadline).toLocaleDateString()}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Status: {task.status === 'InProgress' ? 'In Progress' : task.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {isTaskSuggestionsLoading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader className="w-10 h-10 text-indigo-500 animate-spin" />
                <p className="text-gray-600 dark:text-gray-300 animate-pulse">Generating AI insights...</p>
              </div>
            )}

            {taskSuggestionsResult && !isTaskSuggestionsLoading && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Warnings */}
                {taskSuggestionsResult.warnings && taskSuggestionsResult.warnings.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Needs Attention
                    </h3>
                    <div className="grid gap-3">
                      {taskSuggestionsResult.warnings.map((warning, i) => (
                        <div key={i} className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4 rounded-xl text-red-800 dark:text-red-200 text-sm">
                          <span className="font-bold">{warning.task}:</span> {warning.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {taskSuggestionsResult.selectedTaskSuggestions && taskSuggestionsResult.selectedTaskSuggestions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-500" /> Action Plan
                    </h3>
                    {taskSuggestionsResult.selectedTaskSuggestions.map((sug, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-400">{sug.task}</h4>
                          {sug.estimatedTime && (
                            <span className="text-xs bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {sug.estimatedTime}
                            </span>
                          )}
                        </div>
                        
                        {sug.priorityRecommendation && (
                          <div className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4 border border-amber-100 dark:border-amber-500/20">
                            <strong>Recommendation:</strong> {sug.priorityRecommendation}
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          {sug.steps && sug.steps.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Completion Steps</h5>
                              <ul className="space-y-1">
                                {sug.steps.map((step, j) => (
                                  <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {sug.tips && sug.tips.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Pro Tips</h5>
                              <ul className="space-y-1">
                                {sug.tips.map((tip, j) => (
                                  <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Motivation */}
                {taskSuggestionsResult.motivation && (
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-2xl text-center shadow-lg">
                    <p className="font-medium">"{taskSuggestionsResult.motivation}"</p>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-slate-900/50">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {taskSuggestionsResult ? 'Close' : 'Cancel'}
            </button>
            {!taskSuggestionsResult && (
              <button
                onClick={handleGetSuggestions}
                disabled={isTaskSuggestionsLoading || selectedTaskIds.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200/50 dark:shadow-indigo-900/20 active:scale-95"
              >
                {isTaskSuggestionsLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Get Suggestions
              </button>
            )}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiTaskSuggestionsModal;
