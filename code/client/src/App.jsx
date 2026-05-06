import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Elegant Loading Skeleton for Pages
const PageLoader = () => (
  <div className="flex justify-center items-center h-[60vh]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-indigo-200 border-solid rounded-full"></div>
      <div className="w-16 h-16 border-4 border-indigo-600 border-solid rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
    </div>
  </div>
);

function App() {
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleNetworkError = () => {
      setShowNetworkModal(true);
      // Auto hide after 5 seconds if not closed manually
      const timer = setTimeout(() => setShowNetworkModal(false), 5000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('network-error', handleNetworkError);
    return () => window.removeEventListener('network-error', handleNetworkError);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark-mesh text-slate-100' : 'bg-gray-50 text-gray-900'} font-sans`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="max-w-7xl mx-auto p-4 md:p-8">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Network Error Modal */}
      {showNetworkModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setShowNetworkModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-red-100 text-center animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Network Error</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We couldn't reach the server. Please check your internet connection or try again later.
            </p>
            <button 
              onClick={() => setShowNetworkModal(false)}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-200 active:scale-95"
            >
              Okay, I'll check
            </button>
          </div>
        </div>
      )}

      <Toaster position="bottom-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }} />
    </Router>
  );
}

export default App;
