import { useEffect, useState, lazy, useRef, useCallback } from 'react';
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
import AboutMe from './Aboutme';
import ProjectsSection from './ProjectSection';
import Marquee from './marquee';
gsap.registerPlugin(ScrollTrigger);
const ModelPage = lazy(() => import('./ModelPage'));
// In App.jsx

function App() {
  const [isXRayActive, setIsXRayActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTarget, setPendingTarget] = useState(null);
  const lenisRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const handleLoadingComplete = useCallback(() => {
  setIsLoading(false);
}, []);
const handleMouseMove = (e) => {
  setMousePos({
    x: e.clientX,
    y: e.clientY
  });
}
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
const [canToggleXRay, setCanToggleXRay] = useState(true);

useEffect(() => {
  const handleScroll = () => {
    const heroHeight = window.innerHeight;
    const currentScroll = window.scrollY;

    // 1. Auto-disable X-Ray when scrolling past hero
    if (currentScroll > heroHeight * 0.8) {
      setIsXRayActive(false);
      setCanToggleXRay(false); // Lock the button
    } else {
      setCanToggleXRay(true); // Unlock when back at the top
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  useScrollBreaker(lenisRef, ['home', 'about', 'Projects', 'contact'], 800);

  return (
 <div 
    onMouseMove={handleMouseMove} 
    className="relative w-full no-scrollbar"
  >
    {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
   <PageTransition 
      isTriggered={isTransitioning} 
      
      // 1. When the screen is fully black, THIS runs to instantly jump the page
      onCover={() => {
        if (pendingTarget) {
          const target = document.querySelector(pendingTarget);
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: 'instant' 
            });
          }
        }
      }}
      
      // 2. When the animation finishes, reset the states
      onComplete={() => {
        setIsTransitioning(false);
        setPendingTarget(null);
      }} 
    />
    {/* 2. THE HEADER: Now outside the sticky div. It gets mousePos and stays on top. */}
    <Header 
      isXRayActive={isXRayActive} 
      toggleXRay={() => setIsXRayActive(!isXRayActive)} 
      startTransition={(targetId) => { setIsTransitioning(true); setPendingTarget(targetId); }}
      isLoading={isLoading} 
      mousePos={mousePos} // Header gets the mousePos here
    />

    {/* 3. THE HERO: Stays sticky in the background. */}
    <div className='sticky top-0 h-screen z-0'>
       <HeroReveal isXRayActive={isXRayActive} mousePos={mousePos} />
    </div>
    <div id="home" className="relative z-10 max-w-7xl bg-[#121212] max-w-[90%] mx-auto px-6" style={{ marginTop: '100vh' }}>  {/* ← keep open */}
      <Home />
    </div>
    <div id="about" className="relative z-10 bg-[#121212] max-w-[90%] mx-auto px-6 min-h-screen">
      <AboutMe />
    </div>
     <div id="Projects" className="relative z-10 bg-[#121212] max-w-[90%] mx-auto px-6 min-h-screen">
    <ProjectsSection />  {/* ← no space after < */}
     </div>
     <Marquee />
    <div id="contact" className="relative z-10 bg-[#121212] flex items-center justify-center">
      <Contact />
    </div>

  </div>
);
}

export default App;