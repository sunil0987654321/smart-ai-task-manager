import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogOut, Lightbulb, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className={`${darkMode ? 'bg-slate-950/70 border-slate-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-white/80 border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'} backdrop-blur-2xl sticky top-0 z-50 transition-all duration-500 border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950">
            <div className="relative">
              <img src={darkMode ? '/icon-dark.png' : '/icon-light.png'} alt="TaskIQ Logo" className="h-9 w-9 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-md -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
            </div>
            <h1 className={`text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-indigo-400 via-purple-400 to-indigo-300' : 'from-indigo-600 via-purple-600 to-indigo-700'}`}>
              TaskIQ
            </h1>
          </Link>
          <div className="flex items-center space-x-3 sm:space-x-5">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${darkMode ? 'bg-slate-800/80 hover:bg-slate-700 text-yellow-400 hover:text-yellow-300 shadow-inner border border-slate-700/50' : 'bg-gray-100 hover:bg-gray-200 text-slate-600 hover:text-slate-800 shadow-inner border border-gray-200/50'}`}
              aria-label="Toggle Theme"
            >
              <Lightbulb 
                size={20} 
                className={`transition-all duration-500 ${!darkMode ? 'glow-bulb' : ''}`} 
              />
            </button>
            <nav className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Link to="/dashboard" className={`${darkMode ? 'text-slate-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}>
                    Dashboard
                  </Link>
                  
                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center space-x-2 p-1.5 pl-3 pr-2 rounded-full font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${darkMode ? 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-200' : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-700'}`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <span className="text-sm hidden sm:block truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-inner">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border py-1 origin-top-right focus:outline-none z-50 ${darkMode ? 'bg-slate-900 border-slate-800 shadow-black/50' : 'bg-white border-gray-100'}`}
                        >
                          <div className={`px-4 py-2 border-b ${darkMode ? 'border-slate-800' : 'border-gray-100'} mb-1`}>
                            <p className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'} truncate`}>{user.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-gray-500'} truncate`}>{user.email}</p>
                          </div>
                          <button
                            onClick={onLogout}
                            className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${darkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
                          >
                            <LogOut size={16} />
                            <span>Sign out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Link to="/login" className={`${darkMode ? 'text-slate-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}>
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
