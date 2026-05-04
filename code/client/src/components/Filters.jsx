import React from 'react';

const Filters = ({ searchTerm, setSearchTerm, filterPriority, setFilterPriority, sortOption, setSortOption }) => {
  return (
    <div className="flex flex-wrap w-full sm:w-auto gap-3">
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
      <select 
        className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white cursor-pointer transition"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="Latest">Sort: Latest</option>
        <option value="Priority">Sort: Priority</option>
        <option value="Deadline">Sort: Deadline</option>
      </select>
    </div>
  );
};

export default React.memo(Filters);
