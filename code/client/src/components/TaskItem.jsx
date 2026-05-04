import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import { Trash2, CheckCircle, Circle, Edit2, Calendar, Save, X } from 'lucide-react';
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

  const toggleStatus = () => {
    const newStatus = task.status === 'Completed' ? 'Todo' : 'Completed';
    dispatch(updateTask({ id: task._id, taskData: { status: newStatus } }));
  };

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
      className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 transition-all group ${
        task.status === 'Completed' ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <button onClick={toggleStatus} className="mt-1 flex-shrink-0 text-indigo-600 hover:text-indigo-800 transition">
        {task.status === 'Completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>
      
      <div className="flex-grow">
        <h4 className={`text-lg font-bold ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h4>
        {task.description && <p className="text-gray-600 mt-1 text-sm">{task.description}</p>}
        
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.deadline && (
            <span className="flex items-center space-x-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              <Calendar size={12} />
              <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
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
