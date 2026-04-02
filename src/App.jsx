import { useEffect, useState, Suspense, lazy, useRef } from 'react';
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
import CyclingText from './CyclingText';
import './index.css';
import ProjectsSection from './ProjectSection';
gsap.registerPlugin(ScrollTrigger);
const ModelPage = lazy(() => import('./ModelPage'));
function App() {
  const [isXRayActive, setIsXRayActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTarget, setPendingTarget] = useState(null);
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
  useEffect(() => {
  const handleScroll = () => {
    const heroHeight = window.innerHeight; // hero is 100vh
    if (window.scrollY > heroHeight * 0.8) { // 80% past hero
      setIsXRayActive(false);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  useScrollBreaker(lenisRef, ['home', 'Projects', 'contact'], 380);

  return (
  <div className="relative w-full no-scrollbar">
    
    <PageTransition 
      isTriggered={isTransitioning} 
      onCover={() => {
        if (pendingTarget) {
          const el = document.querySelector(pendingTarget);
          if (el) window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
          setPendingTarget(null);
        }
      }}
      onComplete={() => setIsTransitioning(false)} 
    />

    {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

    <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
      <Header 
        isXRayActive={isXRayActive} 
        toggleXRay={() => setIsXRayActive(!isXRayActive)} 
        startTransition={(targetId) => { setIsTransitioning(true); setPendingTarget(targetId); }}
      />
    </div>
    
    <HeroReveal isXRayActive={isXRayActive} />

    <div id="home" className="max-w-7xl mx-auto px-6">  {/* ← keep open */}
      <Home />
    </div>
     <div id="Projects" className="max-w-7xl mx-auto px-6 min-h-screen">
    <ProjectsSection />  {/* ← no space after < */}
     </div>
    <div id="contact" className="bg-[#121212] flex items-center justify-center">
      <Contact />
    </div>

  </div>
);
}

export default App;