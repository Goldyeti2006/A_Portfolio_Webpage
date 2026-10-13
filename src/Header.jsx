import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import { RiContactsFill } from "react-icons/ri";

export default function Header({ isXRayActive, toggleXRay, startTransition }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const handleNavClick = (targetId) => {
    setIsSidebarOpen(false); 
    
    // ONLY call this. Do not use setTimeout here.
    startTransition(targetId); 
  };
  const getPageName = () => {
    if (location.pathname === '/') return 'HOME';
    if (location.pathname === '/model') return '3D MODEL';
    return location.pathname.substring(1).toUpperCase();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 px-4 sm:px-[7%] w-full z-[100] p-4 sm:p-6 mix-blend-difference text-white pointer-events-none `}>
        <nav className="flex justify-between items-center max-w-7xl mx-auto w-full pointer-events-auto">
          
          {/* LEFT: Current Page Name */}
          <div className="w-1/3 text-left">
            <span className="text-xs sm:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.3em] font-semibold uppercase opacity-80 truncate block">
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
              className="h-8 sm:h-10 w-auto invert opacity-90 group-hover:opacity-100" 
        />
            </button>
          </div>

          {/* RIGHT: Contact & Sidebar Trigger */}
          <div className="w-1/3 flex justify-end items-center gap-3 sm:gap-8 text-base sm:text-xl tracking-widest font-semibold uppercase opacity-80">
  
            {/* Contact - Hidden on mobile (< sm), displayed on tablet & desktop */}
            <button onClick={() => handleNavClick('#contact')} className="
                    hidden sm:flex group relative overflow-hidden
                    border border-white/40 hover:border-white
                    bg-[#FF3831] hover:bg-transparent
                    items-center justify-center px-1
                    text-[#fffdd0] hover:text-white
                    outline-none appearance-none
                    cursor-pointer
                    transition-all duration-200
                    rounded-lg
                  ">
              {/* White fill that slides in from left */}
              <span className={`
                absolute inset-0
                ${isXRayActive ? 'bg-emerald-400' : 'bg-[#fffdc9]'}
                -translate-x-full group-hover:translate-x-0
                transition-transform duration-200 ease-out z-0
              `}/>

              <span className={`relative z-10 transition-colors px-3 py-1 duration-200 vintage-font text-2xl hidden sm:block lg:hidden
              ${isXRayActive ? 'group-hover:text-transparent' : 'group-hover:text-[#FF3831]'}`}>Contact</span>
              <span className={`relative z-10 transition-colors px-5 py-2 duration-200 vintage-font text-2xl hidden lg:block
              ${isXRayActive ? 'group-hover:text-transparent' : 'group-hover:text-[#FF3831]'}`}>Let's Connect</span>
            </button>

            {/* Menu - Single button on mobile (< sm), secondary on desktop */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className='
              group relative overflow-hidden
              px-3.5 py-1.5 sm:px-5 sm:py-2
              flex items-center justify-center
              border border-white/40 hover:border-white
              bg-[#FF3831] hover:bg-transparent
              text-[#fffdd0] hover:text-white
              outline-none appearance-none
              cursor-pointer
              transition-all duration-200
              rounded-lg
            '>
              {/* White fill that slides in from left */}
              <span className={`
                absolute inset-0
                ${isXRayActive ? 'bg-emerald-400' : 'bg-[#fffdc9]'}
                -translate-x-full group-hover:translate-x-0
                transition-transform duration-200 ease-out z-0
              `}/>
              {/* Text flips color as fill slides in */}
              <span className={`relative z-10 transition-colors duration-200 text-sm sm:text-2xl
              ${isXRayActive ? 'group-hover:text-transparent' : 'group-hover:text-[#FF3831]'}`}>
                Menu
              </span>
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
            <span className="text-lg tracking-[0.3em] text-gray-500 uppercase">Navigation</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-2xl hover:text-emerald-400">&times;</button>
          </div>
          
          <ul className="flex flex-col gap-8 text-2xl font-light tracking-wide">
            <li><button 
              onClick={() => handleNavClick('#home')} 
              className="text-2xl hover:text-emerald-400 transition-colors tracking-widest"
            >
              Home
            </button></li>
            <li><button 
              onClick={() => handleNavClick('#about')} 
              className="text-2xl hover:text-emerald-400 transition-colors tracking-widest"
            >
              About Me
            </button></li>
            <li><button 
              onClick={() => handleNavClick('#Projects')} 
              className="text-2xl hover:text-emerald-400 transition-colors tracking-widest"
            >
              Projects
            </button></li>
            <li><button 
              onClick={() => handleNavClick('#contact')} 
              className="text-2xl hover:text-emerald-400 transition-colors tracking-widest"
            >
              Contact Me
            </button></li>
          </ul>

          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-xs text-gray-500 font-mono">SECURE_LINK: _ESTABLISHED</p>
          </div>
        </div>
      </div>
    </>
  );
}