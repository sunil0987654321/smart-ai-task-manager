import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, AlertCircle, Clock, List } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomDropdown from './CustomDropdown';
import { useDebounce } from '../hooks/useDebounce';

const Filters = ({ searchTerm, setSearchTerm, filterPriority, setFilterPriority, sortOption, setSortOption }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Sync parent search term changes back to local state (e.g. on reset/clear)
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  // Sync debounced search value to parent
  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  const priorityOptions = [
    { value: 'All', label: 'All Priorities', icon: <Filter size={14} />, iconColor: 'text-indigo-500' },
    { value: 'High', label: 'High', icon: <AlertCircle size={14} />, iconColor: 'text-rose-500' },
    { value: 'Medium', label: 'Medium', icon: <AlertCircle size={14} />, iconColor: 'text-amber-500' },
    { value: 'Low', label: 'Low', icon: <AlertCircle size={14} />, iconColor: 'text-emerald-500' },
  ];

  const sortOptions = [
    { value: 'Latest', label: 'Sort: Latest', icon: <Clock size={14} />, iconColor: 'text-indigo-400' },
    { value: 'Priority', label: 'Sort: Priority', icon: <AlertCircle size={14} />, iconColor: 'text-indigo-400' },
    { value: 'Deadline', label: 'Sort: Deadline', icon: <List size={14} />, iconColor: 'text-indigo-400' },
  ];

  return (
    <div className="flex flex-wrap items-center w-full sm:w-auto gap-3">
      {/* Expandable Search Bar */}
      <motion.div 
        initial={false}
        animate={{ width: isExpanded || localSearch ? '200px' : '40px' }}
        className="relative flex items-center h-10 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-md group"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => !localSearch && setIsExpanded(false)}
        onClick={() => setIsExpanded(true)}
      >
        <div className="absolute left-3 text-gray-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors pointer-events-none">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className={`w-full pl-10 pr-4 py-2 bg-transparent outline-none text-sm text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-opacity duration-300 ${isExpanded || localSearch ? 'opacity-100' : 'opacity-0'}`}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !localSearch && setIsExpanded(false)}
        />
      </motion.div>

      <CustomDropdown 
        value={filterPriority} 
        onChange={setFilterPriority} 
        options={priorityOptions} 
        label="Priority" 
        icon={Filter}
      />

      <CustomDropdown 
        value={sortOption} 
        onChange={setSortOption} 
        options={sortOptions} 
        label="Sort" 
        icon={SortAsc}
      />
    </div>
  );
};

export default React.memo(Filters);
