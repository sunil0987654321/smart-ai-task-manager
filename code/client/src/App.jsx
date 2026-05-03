import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              DekNek
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<div className="flex flex-col items-center mt-20"><h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">Smart AI Task Manager</h2><p className="text-xl text-gray-600 text-center max-w-2xl">Organize your workflow, get AI suggestions, and boost your productivity.</p></div>} />
            <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
            <Route path="/signup" element={<div>Signup Page (Coming Soon)</div>} />
            <Route path="/dashboard" element={<div>Dashboard (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
