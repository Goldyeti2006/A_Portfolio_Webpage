import { useEffect, useState, Suspense, lazy, useRef} from 'react';
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
import { useScrollBreaker } from './useScrollBreaker';

gsap.registerPlugin(ScrollTrigger);
const ModelPage = lazy(() => import('./ModelPage'));

function App() {
  const [isXRayActive, setIsXRayActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2, 
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
  useScrollBreaker(lenisRef, ['home', 'projects', 'contact'], 380);
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
      <div id="home" className="max-w-7xl mx-auto px-6"></div>
        <Home />
        <div id="projects" className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex text-3xl items-center justify-center text-[#FF3831]"></div>
          <div className="h-20 flex text-6xl items-center justify-center text-[#FAF3E1]"><div className='text-[#FF3831]'>Projects__</div>i've Worked on</div>
          <ProjectFolder title="ESP32 Hardware Analysis">
            <ESP32ProjectSection />
          </ProjectFolder>
          <ProjectFolder title="Project Feather">
            <div className="h-64 bg-neutral-900 p-8 rounded-xl flex items-center justify-center">
              <p className="text-gray-500 font-mono">Loading browser data...</p>
            </div>
          </ProjectFolder>
        </div>

      <div id="contact" className="h-screen bg-[#121212] flex items-center justify-center">
        <Contact />
      </div>

    </div>
  );
}

export default App;