import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ModelPage from './ModelPage';
import Home from './Home';
import HeroReveal from './HeroReveal';
import ESP32ProjectSection from './ESP32ProjectSection';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectFolder from './ProjectFolder';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isXRayActive, setIsXRayActive] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2, 
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="relative w-full no-scrollbar">
      
      {/* Passing state and toggle function to the Header */}
      <Header 
        isXRayActive={isXRayActive} 
        toggleXRay={() => setIsXRayActive(!isXRayActive)} 
      />
      
      {/* HeroReveal now listens to the global state */}
      <HeroReveal isXRayActive={isXRayActive} />

      <div className="relative z-10 bg-[#121212] mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<ModelPage />} />
        </Routes>

        <div className="h-[50vh]"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <ProjectFolder title="ESP32 Hardware Analysis">
            <ESP32ProjectSection />
          </ProjectFolder>
          <ProjectFolder title="Project Feather">
            <div className="h-64 bg-neutral-900 p-8 rounded-xl flex items-center justify-center">
              <p className="text-gray-500 font-mono">Loading browser data...</p>
            </div>
          </ProjectFolder>
        </div>

        <div className="h-screen bg-neutral-900 flex items-center justify-center mt-10">
          <h2 className="text-4xl text-gray-500">Next Project Down Here..</h2>
        </div>
      </div>
      <div className="h-screen bg-[#121212] flex items-center justify-center">
        <Contact />
      </div>

    </div>
  );
}

export default App;