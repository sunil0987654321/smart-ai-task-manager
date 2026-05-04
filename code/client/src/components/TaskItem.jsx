import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import { Trash2, CheckCircle, Circle, Edit2, Calendar, Save, X, PlayCircle, ChevronDown, AlertTriangle, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
  });


  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submitEdit = () => {
    if (!editData.title) return;
    dispatch(updateTask({ id: task._id, taskData: editData }));
    setIsEditing(false);
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
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
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
        className="bg-white p-5 rounded-2xl shadow-md border border-indigo-200"
      >
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Description"
            rows="2"
          ></textarea>
          <div className="flex space-x-3">
            <select
              name="priority"
              value={editData.priority}
              onChange={handleEditChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded outline-none"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={editData.deadline}
              onChange={handleEditChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded outline-none text-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button onClick={cancelEdit} className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded transition">
              <X size={16} /> <span>Cancel</span>
            </button>
            <button onClick={submitEdit} className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded transition shadow-sm">
              <Save size={16} /> <span>Save</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-white p-5 rounded-2xl shadow-sm border flex items-start space-x-4 transition-all group ${
        task.status === 'Completed' ? 'opacity-60 border-green-100' : 
        deadlineStatus === 'Overdue' ? 'border-red-400 bg-red-50/50 shadow-md ring-1 ring-red-400' :
        deadlineStatus === 'Near' ? 'border-orange-300 bg-orange-50/30 shadow-md ring-1 ring-orange-300' :
        task.status === 'InProgress' ? 'opacity-100 border-blue-200 shadow-md' : 
        'opacity-100 border-gray-100'
      }`}
    >
      <div className={`mt-1 flex-shrink-0 ${
        task.status === 'Completed' ? 'text-green-500' :
        task.status === 'InProgress' ? 'text-blue-500' :
        'text-yellow-500'
      }`}>
        {task.status === 'Completed' ? <CheckCircle size={24} /> : 
         task.status === 'InProgress' ? <PlayCircle size={24} /> : 
         <Circle size={24} />}
      </div>
      
      <div className="flex-grow">
        <h4 className={`text-lg font-bold transition-colors ${
          task.status === 'Completed' ? 'line-through text-gray-400' : 
          task.status === 'InProgress' ? 'text-blue-800' : 
          'text-gray-800'
        }`}>
          {task.title}
        </h4>
        {task.description && <p className={`mt-1 text-sm ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{task.description}</p>}
        
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="relative inline-block">
            <select
              value={task.status}
              onChange={(e) => dispatch(updateTask({ id: task._id, taskData: { status: e.target.value } }))}
              className={`text-xs font-semibold pl-3 pr-7 py-0.5 rounded-full cursor-pointer outline-none appearance-none transition-colors ${
                task.status === 'Completed' ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200' :
                task.status === 'InProgress' ? 'bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200' :
                'bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200'
              }`}
            >
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none ${
              task.status === 'Completed' ? 'text-green-600' :
              task.status === 'InProgress' ? 'text-blue-600' :
              'text-yellow-600'
            }`}>
              <ChevronDown size={12} strokeWidth={3} />
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.deadline && (
            <span className={`flex items-center space-x-1 text-xs px-2 py-0.5 rounded-md border ${
              deadlineStatus === 'Overdue' ? 'text-red-700 bg-red-100 border-red-200 font-bold' :
              deadlineStatus === 'Near' ? 'text-orange-800 bg-orange-100 border-orange-200 font-bold' :
              'text-indigo-600 bg-indigo-50 border-indigo-100'
            }`}>
              {deadlineStatus === 'Overdue' ? <AlertOctagon size={12} /> : 
               deadlineStatus === 'Near' ? <AlertTriangle size={12} /> : 
               <Calendar size={12} />}
              <span>
                {deadlineStatus === 'Overdue' ? `Overdue (${new Date(task.deadline).toLocaleDateString()})` : 
                 deadlineStatus === 'Near' ? `Due Soon (${new Date(task.deadline).toLocaleDateString()})` :
                 `Due: ${new Date(task.deadline).toLocaleDateString()}`}
              </span>
            </span>
          )}
          <span className="text-xs text-gray-400">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-shrink-0 text-gray-400 hover:text-indigo-500 p-1 transition"
          title="Edit Task"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task._id))}
          className="flex-shrink-0 text-gray-400 hover:text-red-500 p-1 transition"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default React.memo(TaskItem);
