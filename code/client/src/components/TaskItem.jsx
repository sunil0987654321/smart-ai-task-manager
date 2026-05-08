import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import { Trash2, CheckCircle, Circle, Edit2, Calendar, Save, X, PlayCircle, ChevronDown, AlertTriangle, AlertOctagon, Clock, PenTool, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import CustomDropdown from './CustomDropdown';
import StatusModal from './StatusModal';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: null });
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
  });


  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    if (!editData.title) return;
    try {
      await dispatch(updateTask({ id: task._id, taskData: editData })).unwrap();
      toast.success('Task updated!');
      setIsEditing(false);
    } catch (error) {
      // Error is handled by global interceptor
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task deleted!');
    } catch (error) {
      // Error handled globally
    }
  };

  const cancelEdit = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
    });
    setIsEditing(false);
  };

  const priorityColors = {
    Low: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20',
    Medium: 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
    High: 'bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20',
  };

  const getDeadlineStatus = () => {
    if (!task.deadline || task.status === 'Completed') return 'Normal';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const taskDeadline = new Date(task.deadline);
    taskDeadline.setHours(0, 0, 0, 0);
    
    const diffTime = taskDeadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays <= 2) return 'Near';
    return 'Normal';
  };

  const deadlineStatus = getDeadlineStatus();

  if (isEditing) {
    return (
      <motion.div
        layout
        className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border border-indigo-200 dark:border-indigo-500/30 transition-colors"
      >
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="Description"
            rows="2"
          ></textarea>
          <div className="flex space-x-3">
            <select
              name="priority"
              value={editData.priority}
              onChange={handleEditChange}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-indigo-500 outline-none transition"
            >
              <option value="Low" className="dark:bg-slate-900">Low Priority</option>
              <option value="Medium" className="dark:bg-slate-900">Medium Priority</option>
              <option value="High" className="dark:bg-slate-900">High Priority</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={editData.deadline}
              onChange={handleEditChange}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-indigo-500 outline-none transition"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button onClick={cancelEdit} className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
              <X size={16} /> <span>Cancel</span>
            </button>
            <button onClick={submitEdit} className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 active:scale-95">
              <Save size={16} /> <span>Save</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
      className={`p-5 rounded-3xl border flex items-start space-x-4 transition-all duration-500 group relative hover:z-50 ${
        task.status === 'Completed' ? 'bg-white/40 dark:bg-black/40 opacity-70 border-green-200 dark:border-green-900/20' : 
        deadlineStatus === 'Overdue' ? 'bg-red-50/80 dark:bg-red-950/40 border-red-400 dark:border-red-600 shadow-lg dark:shadow-red-900/20 ring-1 ring-red-400 dark:ring-red-600/30' :
        deadlineStatus === 'Near' ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-300 dark:border-orange-500 shadow-lg dark:shadow-orange-900/20 ring-1 ring-orange-300 dark:ring-orange-500/30' :
        task.status === 'InProgress' ? 'glass-card opacity-100 border-indigo-200 dark:border-indigo-500/30 shadow-xl dark:shadow-indigo-900/20' : 
        'glass-card opacity-100 border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Subtle background glow for active tasks */}
      {!task.status === 'Completed' && (
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
      )}
      <motion.div 
        className={`mt-1 flex-shrink-0 ${
          task.status === 'Completed' ? 'text-green-500' :
          task.status === 'InProgress' ? 'text-blue-500' :
          'text-yellow-500'
        }`}
        initial={false}
        animate={{ scale: task.status === 'Completed' ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {task.status === 'Completed' ? <CheckCircle size={24} /> : 
         task.status === 'InProgress' ? <PlayCircle size={24} /> : 
         <Circle size={24} />}
      </motion.div>
      
      <div className="flex-grow">
        <h4 className={`text-lg font-bold transition-colors ${
          task.status === 'Completed' ? 'line-through text-gray-400 dark:text-slate-500' : 
          task.status === 'InProgress' ? 'text-blue-800 dark:text-blue-400' : 
          'text-gray-800 dark:text-slate-100'
        }`}>
          {task.title}
        </h4>
        {task.description && <p className={`mt-1 text-sm ${task.status === 'Completed' ? 'text-gray-400 dark:text-slate-500 line-through' : 'text-gray-600 dark:text-slate-400'}`}>{task.description}</p>}
        
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <CustomDropdown
            value={task.status}
            options={[
              { value: 'Todo', label: 'Todo', icon: <Clock size={12} />, iconColor: 'text-yellow-500' },
              { value: 'InProgress', label: 'In Progress', icon: <PenTool size={12} />, iconColor: 'text-blue-500' },
              { value: 'Completed', label: 'Completed', icon: <CheckCircle size={12} />, iconColor: 'text-green-500' },
            ]}
            onChange={async (newStatus) => {
              if (newStatus === task.status) return;
              try {
                await dispatch(updateTask({ id: task._id, taskData: { status: newStatus } })).unwrap();
                if (newStatus === 'InProgress' || newStatus === 'Completed') {
                  setModalState({ isOpen: true, type: newStatus });
                } else {
                  toast.success(`Status updated to ${newStatus}`);
                }
              } catch (error) {
                // Handled globally
              }
            }}
            className="w-32"
          />
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.deadline && (
            <span className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md border ${
              deadlineStatus === 'Overdue' ? 'text-white bg-red-600 border-red-600 font-bold shadow-sm animate-pulse text-sm' :
              deadlineStatus === 'Near' ? 'text-white bg-orange-500 border-orange-500 font-bold shadow-sm text-sm' :
              'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800 text-xs'
            }`}>
              {deadlineStatus === 'Overdue' ? <AlertOctagon size={14} /> : 
               deadlineStatus === 'Near' ? <AlertTriangle size={14} /> : 
               <Calendar size={12} />}
              <span>
                {deadlineStatus === 'Overdue' ? `OVERDUE: ${new Date(task.deadline).toLocaleDateString()}` : 
                 deadlineStatus === 'Near' ? `DUE SOON: ${new Date(task.deadline).toLocaleDateString()}` :
                 `Due: ${new Date(task.deadline).toLocaleDateString()}`}
              </span>
            </span>
          )}
          <span className="text-xs text-gray-400">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-shrink-0 text-gray-400 hover:text-indigo-500 p-1 transition rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          title="Edit Task"
          aria-label="Edit Task"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="flex-shrink-0 text-gray-400 hover:text-red-500 p-1 transition rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          title="Delete Task"
          aria-label="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <StatusModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))} 
        type={modalState.type} 
      />
    </motion.div>
  );
};

export default React.memo(TaskItem);
