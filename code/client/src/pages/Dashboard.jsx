import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, suggestTasks, resetTasks } from '../features/tasks/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Filters from '../components/Filters';
import { Sparkles, Loader, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { tasks: normalizedTasks, suggestions, isLoading, isError, message } = useSelector((state) => state.tasks);

  // Persistent Filters
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('task_searchTerm') || '');
  const [filterPriority, setFilterPriority] = useState(() => localStorage.getItem('task_filterPriority') || 'All');
  const [filterStatus, setFilterStatus] = useState(() => localStorage.getItem('task_filterStatus') || 'All');
  const [sortOption, setSortOption] = useState(() => localStorage.getItem('task_sortOption') || 'Latest');

  useEffect(() => {
    localStorage.setItem('task_searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('task_filterPriority', filterPriority);
  }, [filterPriority]);

  useEffect(() => {
    localStorage.setItem('task_filterStatus', filterStatus);
  }, [filterStatus]);

  useEffect(() => {
    localStorage.setItem('task_sortOption', sortOption);
  }, [sortOption]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Derive task array from normalized state
  const tasksArray = useMemo(() => {
    if (!normalizedTasks || !normalizedTasks.allIds) return [];
    return normalizedTasks.allIds.map(id => normalizedTasks.byId[id]).filter(Boolean);
  }, [normalizedTasks]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      All: tasksArray.length,
      Todo: tasksArray.filter(t => t.status === 'Todo').length,
      InProgress: tasksArray.filter(t => t.status === 'InProgress').length,
      Completed: tasksArray.filter(t => t.status === 'Completed').length,
    };
  }, [tasksArray]);

  const filteredTasks = useMemo(() => {
    return tasksArray.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                            (task.description && task.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasksArray, debouncedSearchTerm, filterPriority, filterStatus]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (a.status === 'Completed' && b.status !== 'Completed') return 1;
      if (b.status === 'Completed' && a.status !== 'Completed') return -1;
      
      if (sortOption === 'Latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } 
      else if (sortOption === 'Priority') {
        const weight = { High: 3, Medium: 2, Low: 1 };
        if (weight[a.priority] !== weight[b.priority]) {
          return weight[b.priority] - weight[a.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      } 
      else if (sortOption === 'Deadline') {
        if (a.deadline && b.deadline) {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        } else if (a.deadline && !b.deadline) {
          return -1; 
        } else if (!a.deadline && b.deadline) {
          return 1;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      return 0;
    });
  }, [filteredTasks, sortOption]);

  // Infinite Scroll Logic
  const [visibleCount, setVisibleCount] = useState(10);
  const observer = useRef();
  const lastTaskElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(10);
  }, [debouncedSearchTerm, filterPriority, filterStatus, sortOption]);

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

  // Skeleton Loaders
  const renderSkeletons = () => (
    <div className="space-y-4 w-full">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 animate-pulse">
          <div className="w-6 h-6 bg-gray-200 rounded-full mt-1"></div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
            <div className="flex space-x-2 mt-4 pt-2">
              <div className="h-4 bg-gray-200 rounded-full w-16"></div>
              <div className="h-4 bg-gray-200 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Forms and AI */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Hello, {user && user.name.split(' ')[0]} 👋</h2>
          <p className="text-indigo-100 mb-6">You have {tasksArray.filter(t => t.status !== 'Completed').length} active tasks.</p>
          
          <button 
            onClick={handleAiSuggest}
            disabled={aiLoading}
            className="w-full flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-xl transition border border-white/20 disabled:opacity-50"
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
              className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl overflow-hidden"
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

        <TaskForm onTaskAdded={() => {
          setFilterPriority('All');
          setFilterStatus('All');
          setSortOption('Latest');
          setSearchTerm('');
        }} />
      </div>

      {/* Right Column - Task List */}
      <div className="lg:col-span-2">
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[60vh] flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              Your Tasks
              <span className="ml-3 text-sm font-normal bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                {filteredTasks.length} Total
              </span>
            </h3>
            
            <Filters 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              filterPriority={filterPriority} 
              setFilterPriority={setFilterPriority} 
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>

          {/* Status Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Todo', 'InProgress', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                  filterStatus === status 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
                }`}
              >
                {status === 'InProgress' ? 'In Progress' : status} 
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  filterStatus === status ? 'bg-indigo-400 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {statusCounts[status]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-grow">
            {isLoading && tasksArray.length === 0 ? (
              renderSkeletons()
            ) : filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <CheckSquare size={32} className="text-gray-400" />
                </div>
                <p className="text-lg">No tasks found.</p>
                {tasksArray.length === 0 ? (
                  <p className="text-sm mt-1">Add one to the left to get started!</p>
                ) : (
                  <p className="text-sm mt-1">Try adjusting your filters.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {sortedTasks.slice(0, visibleCount).map((task) => (
                    <TaskItem key={task._id} task={task} />
                  ))}
                </AnimatePresence>
                
                {/* Infinite Scroll Target */}
                {visibleCount < sortedTasks.length && (
                  <div ref={lastTaskElementRef} className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
