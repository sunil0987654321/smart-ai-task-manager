import React from 'react';

const Filters = ({ searchTerm, setSearchTerm, filterPriority, setFilterPriority }) => {
  return (
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
  );
};

export default React.memo(Filters);
