import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ModelPage from './ModelPage';
import Home from './Home';
import Landing from './Landing';

function App() {
  return (
    <div className="relative w-full">
      
      {/* 1. The Fixed Background (Sits behind everything) */}
      <Landing />

      {/* 2. The Content Wrapper */}
      {/* ADDED 'mt-[100vh]': This pushes your site down so the landing page shows first */}
      <div className="relative z-10 bg-[#121212] mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<ModelPage />} />
        </Routes>

        {/* Extra space to make sure you can scroll and see the effect */}
        <div className="h-96"></div>
      </div>

    </div>
  );
}

export default App;