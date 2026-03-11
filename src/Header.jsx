import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ toggleXRay }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageName = () => {
    if (location.pathname === '/') return 'HOME';
    if (location.pathname === '/model') return '3D MODEL';
    return location.pathname.substring(1).toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] p-6 mix-blend-difference text-white pointer-events-none">
        <nav className="flex justify-between items-center max-w-7xl mx-auto w-full pointer-events-auto">
          
          {/* LEFT: Current Page Name */}
          <div className="w-1/3 text-left">
            <span className="text-base tracking-[0.3em] font-semibold uppercase opacity-80">
              {getPageName()}
            </span>
          </div>

          {/* CENTER: Rune Logo (The X-Ray Switch) */}
          <div className="w-1/3 flex justify-center">
            <button 
              onClick={toggleXRay} 
              className="group hover:scale-110 transition-transform duration-300"
              title="Toggle X-Ray"
            >
              {/* Ensure logo.png is in your public folder */}
              <img 
  src="/image.png" 
  alt="Rune Logo" 
  width="52" 
  height="60" // Explicit dimensions stop the page from jumping
  className="h-10 w-auto invert opacity-90 group-hover:opacity-100" 
/>
            </button>
          </div>

          {/* RIGHT: Contact & Sidebar Trigger */}
          <div className="w-1/3 flex justify-end gap-8 text-base tracking-widest font-semibold uppercase opacity-80">
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

      {/* SIDEBAR NAVIGATION */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

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
          </ul>

          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-xs text-gray-500 font-mono">SECURE_LINK: _ESTABLISHED</p>
          </div>
        </div>
      </div>
    </>
  );
}