import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogOut, CheckSquare, Lightbulb } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className={`${darkMode ? 'bg-slate-950/60 border-slate-800/50' : 'bg-white/60 border-gray-100/50'} backdrop-blur-xl sticky top-0 z-50 transition-all duration-500 border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={darkMode ? '/icon-dark.png' : '/icon-light.png'} alt="TaskIQ Logo" className="h-8 w-8 rounded-lg shadow-sm group-hover:scale-110 transition-transform" />
            <h1 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-blue-400 via-indigo-400 to-purple-400' : 'from-blue-600 via-indigo-600 to-blue-700'}`}>
              TaskIQ
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 transform active:scale-90 focus:outline-none ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              aria-label="Toggle Theme"
            >
              <Lightbulb 
                size={22} 
                className={`transition-all duration-500 ${!darkMode ? 'glow-bulb' : 'text-slate-400'}`} 
              />
            </button>
            <nav>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className={`${darkMode ? 'text-slate-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition`}>
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition ${darkMode ? 'bg-slate-800 hover:bg-red-900/30 text-red-400' : 'bg-gray-100 hover:bg-red-50 text-red-600'}`}
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className={`${darkMode ? 'text-slate-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'} font-medium transition`}>
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition shadow-md shadow-indigo-200/20"
                  >
                    Sign Up
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
