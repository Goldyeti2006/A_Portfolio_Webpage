import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ModelPage from './ModelPage';
import Home from './Home';
// import Landing from './Landing';
import HeroReveal from './HeroReveal';
import ESP32ProjectSection from './ESP32ProjectSection';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectFolder from './ProjectFolder';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isXRayActive, setIsXRayActive] = useState(true);
  useEffect(() => {
    // 1. Initialize Lenis physics
    const lenis = new Lenis({
      duration: 1.2, // The "weight" of the scroll (1.2 is standard for portfolios)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing math
      smoothWheel: true,
      touchMultiplier: 2, 
    });

    // 2. THE GLUE: Tell GSAP ScrollTrigger to update whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect Lenis to GSAP's internal ticker (animation loop)
    // This guarantees the 3D model rotation and the scroll bar are perfectly locked together
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from trying to "catch up" on lag, which causes jumps
    gsap.ticker.lagSmoothing(0, 0);

    // 4. Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
  return (
    <div className="relative w-full no-scrollbar">
      
      {/* 1. The Fixed Background (Sits behind everything) */}
      <HeroReveal />

      {/* 2. The Content Wrapper */}
      {/* ADDED 'mt-[100vh]': This pushes your site down so the landing page shows first */}
      <div className="relative z-10 bg-[#121212] mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<ModelPage />} />
        </Routes>

        {/* Extra space to make sure you can scroll and see the effect */}
        <div className="h-[50vh]"></div>
        <ProjectFolder title="ESP32 Hardware Analysis">
            {/* The folder hides this until clicked */}
            <ESP32ProjectSection />
          </ProjectFolder>
          <ProjectFolder title="Project Feather">
            <div className="h-64 bg-neutral-900 p-8 rounded-xl flex items-center justify-center">
              <p className="text-gray-500 font-mono">Loading browser data...</p>
            </div>
          </ProjectFolder>
        <div className="h-screen bg-neutral-900 flex items-center justify-center mt-10">
        <h2 className="text-4xl text-gray-500">Next Project Down Here...</h2>
      </div>
      </div>

    </div>
  );
}

export default App;