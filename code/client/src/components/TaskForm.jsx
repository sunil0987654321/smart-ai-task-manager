import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';
import { PlusCircle } from 'lucide-react';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    
    const taskData = { title, description, priority };
    if (deadline) {
      taskData.deadline = deadline;
    }

    dispatch(createTask(taskData));
    
    if (onTaskAdded) {
      onTaskAdded();
    }

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDeadline('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Task</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description (Optional)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-600"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition mt-2"
        >
          <PlusCircle size={18} />
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
