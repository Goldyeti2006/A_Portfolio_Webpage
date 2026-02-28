import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ disableXRay }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Figure out the current page name based on the URL
  const getPageName = () => {
    if (location.pathname === '/') return 'HOME';
    if (location.pathname === '/model') return '3D MODEL';
    return location.pathname.substring(1).toUpperCase();
  };

  return (
    <>
      {/* --- MAIN GLOBAL HEADER --- */}
      {/* mix-blend-difference ensures the text is visible over both black and white backgrounds */}
      <header className="fixed top-0 left-0 w-full z-[100] p-6 mix-blend-difference text-white pointer-events-none">
        <nav className="flex justify-between items-center max-w-7xl mx-auto w-full pointer-events-auto">
          
          {/* LEFT: Current Section Name */}
          <div className="w-1/3 text-left">
            <span className="text-sm tracking-[0.3em] font-semibold uppercase opacity-80">
              {getPageName()}
            </span>
          </div>

          {/* CENTER: Logo (Click to disable X-Ray) */}
          <div className="w-1/3 flex justify-center">
            <button 
              onClick={disableXRay} 
              className="group hover:scale-105 transition-transform duration-300"
              title="Disable X-Ray Override"
            >
              {/* Assuming you saved the image as logo.png in the public folder */}
              {/* invert class flips your black logo to white so it works with mix-blend */}
              <img src="/logo.png" alt="Goldyeti Logo" className="h-10 invert opacity-90 group-hover:opacity-100" />
            </button>
          </div>

          {/* RIGHT: Contact & Menu */}
          <div className="w-1/3 flex justify-end gap-8 text-sm tracking-widest font-semibold uppercase opacity-80">
            <button className="hover:text-emerald-400 transition-colors">Contact</button>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Menu
            </button>
          </div>

        </nav>
      </header>

      {/* --- SLIDE-OUT SIDEBAR NAVIGATION --- */}
      {/* Background Dimmer */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 z-[120] transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-10 flex flex-col h-full text-white">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">Navigation</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-2xl hover:text-emerald-400">&times;</button>
          </div>
          
          <ul className="flex flex-col gap-8 text-2xl font-light tracking-wide">
            <li><Link to="/" onClick={() => setIsSidebarOpen(false)} className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li><Link to="/model" onClick={() => setIsSidebarOpen(false)} className="hover:text-emerald-400 transition-colors">3D Archive</Link></li>
            <li><a href="#projects" onClick={() => setIsSidebarOpen(false)} className="hover:text-emerald-400 transition-colors">Projects</a></li>
            <li><a href="#about" onClick={() => setIsSidebarOpen(false)} className="hover:text-emerald-400 transition-colors">About</a></li>
          </ul>

          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-xs text-gray-500 font-mono">SYS.STATUS: ONLINE</p>
          </div>
        </div>
      </div>
    </>
  );
}