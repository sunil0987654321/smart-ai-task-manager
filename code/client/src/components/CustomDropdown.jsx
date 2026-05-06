import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomDropdown = ({ value, onChange, options, label, icon: Icon, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-md text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-black/60 transition-all outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div className="flex items-center space-x-2">
          {options.find(opt => opt.value === value)?.icon ? (
            <span className={options.find(opt => opt.value === value)?.iconColor}>
              {options.find(opt => opt.value === value)?.icon}
            </span>
          ) : (
            Icon && <Icon size={16} className="text-indigo-500" />
          )}
          <span>{options.find(opt => opt.value === value)?.label || label}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 w-full min-w-[160px] bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 dark:border-indigo-500/20 overflow-hidden py-1 max-h-60 overflow-y-auto custom-scrollbar dark:shadow-glow"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-left transition-colors ${
                  value === option.value 
                    ? 'bg-indigo-500 text-white' 
                    : 'text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/20'
                }`}
              >
                {option.icon && (
                  <span className={value === option.value ? 'text-white' : option.iconColor}>
                    {option.icon}
                  </span>
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
