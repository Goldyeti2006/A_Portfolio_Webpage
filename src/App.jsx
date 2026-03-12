import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import HeroReveal from './HeroReveal';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectFolder from './ProjectFolder';
import Contact from './Contact';
import LoadingScreen from './LoadingScreen';
import ESP32ProjectSection from './ESP32ProjectSection';
import PageTransition from './PageTransition';

gsap.registerPlugin(ScrollTrigger);
const ModelPage = lazy(() => import('./ModelPage'));
function App() {
  const [isXRayActive, setIsXRayActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2, 
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="relative w-full no-scrollbar">
      
      {/* 1. LOADING OVERLAY: Stays on top until it completes */}
      <PageTransition 
        isTriggered={isTransitioning} 
        onComplete={() => setIsTransitioning(false)} 
      />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header 
          isXRayActive={isXRayActive} 
          toggleXRay={() => setIsXRayActive(!isXRayActive)} 
          startTransition={() => setIsTransitioning(true)}
        />
      </div>
      
      {/* 3. LANDING PAGE CONTENT */}
      <HeroReveal isXRayActive={isXRayActive} />

      {/* 4. SCROLLING CONTENT */}
      <div className="h-60 bg-neutral-900 flex items-center justify-center mt-10"></div>
      <div id="home" className="max-w-7xl mx-auto px-6">
        <Home />
        <div id="projects" className="max-w-7xl mx-auto px-6">
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

      <div id="contact" className="h-screen bg-[#121212] flex items-center justify-center">
        <Contact />
      </div>

    </div>
  );
}

export default App;