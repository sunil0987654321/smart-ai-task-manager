import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, suggestTasks, resetTasks } from '../features/tasks/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { Sparkles, Loader, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { tasks, suggestions, isLoading, isError, message } = useSelector((state) => state.tasks);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTasks());
    }

    return () => {
      dispatch(resetTasks());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleAiSuggest = async () => {
    setAiLoading(true);
    await dispatch(suggestTasks());
    setAiLoading(false);
    setShowAiSuggestions(true);
  };

  if (isLoading && tasks.length === 0) {
    return <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-indigo-600 h-10 w-10" /></div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Forms and AI */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Hello, {user && user.name.split(' ')[0]} 👋</h2>
          <p className="text-indigo-100 mb-6">You have {tasks.filter(t => t.status !== 'Completed').length} active tasks.</p>
          
          <button 
            onClick={handleAiSuggest}
            disabled={aiLoading}
            className="w-full flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl transition border border-white/20"
          >
            {aiLoading ? <Loader className="animate-spin" size={18} /> : <Sparkles size={18} />}
            <span>Get AI Suggestions</span>
          </button>
        </div>

        <AnimatePresence>
          {showAiSuggestions && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl"
            >
              <h3 className="font-bold text-indigo-800 flex items-center space-x-2 mb-3">
                <Sparkles size={16} /> <span>AI Recommended</span>
              </h3>
              <div className="space-y-3">
                {suggestions && suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      dispatch(createTask(suggestion));
                      setShowAiSuggestions(false);
                    }}
                    className="bg-white p-3 rounded-lg text-sm border border-indigo-100 shadow-sm cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition flex justify-between items-center group"
                    title="Click to add as a task"
                  >
                    <div>
                      <strong className="text-gray-800">{suggestion.title}</strong>
                      <span className="text-xs text-gray-500 ml-2">({suggestion.priority})</span>
                      {suggestion.description && <p className="text-xs text-gray-500 mt-1">{suggestion.description}</p>}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-100 text-indigo-700 opacity-0 group-hover:opacity-100 transition whitespace-nowrap ml-2">
                      + Add
                    </span>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAiSuggestions(false)}
                  className="text-xs text-indigo-600 w-full mt-2 hover:underline"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <TaskForm />
      </div>

      {/* Right Column - Task List */}
      <div className="lg:col-span-2">
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[60vh]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              Your Tasks
              <span className="ml-3 text-sm font-normal bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                {filteredTasks.length} Total
              </span>
            </h3>
            
            <div className="flex w-full sm:w-auto space-x-3">
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="w-full sm:w-48 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white cursor-pointer transition"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <CheckSquare size={32} className="text-gray-400" />
              </div>
              <p className="text-lg">No tasks found.</p>
              {tasks.length === 0 ? (
                <p className="text-sm mt-1">Add one to the left to get started!</p>
              ) : (
                <p className="text-sm mt-1">Try adjusting your filters.</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {[...filteredTasks].sort((a, b) => {
                  // 1. Move completed tasks to the bottom
                  if (a.status === 'Completed' && b.status !== 'Completed') return 1;
                  if (b.status === 'Completed' && a.status !== 'Completed') return -1;
                  
                  // 2. Sort by nearest Deadline
                  if (a.deadline && b.deadline) {
                    const diff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                    if (diff !== 0) return diff;
                  } else if (a.deadline && !b.deadline) {
                    return -1; // Tasks with deadline come first
                  } else if (!a.deadline && b.deadline) {
                    return 1;
                  }
                  
                  // 3. Sort by highest Priority
                  const weight = { High: 3, Medium: 2, Low: 1 };
                  if (weight[a.priority] !== weight[b.priority]) {
                    return weight[b.priority] - weight[a.priority];
                  }
                  
                  // 4. Default: Newest created first
                  return new Date(b.createdAt) - new Date(a.createdAt);
                }).map((task) => (
                  <TaskItem key={task._id} task={task} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
