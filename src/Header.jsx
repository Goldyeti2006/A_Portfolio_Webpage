import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

export default function Header({ isXRayActive, toggleXRay, startTransition }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const handleNavClick = (targetId) => {
    setIsSidebarOpen(false); 
    startTransition(targetId);
    // 2. Start : black liquid curve animation
    startTransition(); 
    setTimeout(() => {
      const target = document.querySelector(targetId);
      if (target) {
        // Lenis will still keep it physically smooth
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'instant' 
        });
      }
    }, 800); 
  };
  const getPageName = () => {
    if (location.pathname === '/') return 'HOME';
    if (location.pathname === '/model') return '3D MODEL';
    return location.pathname.substring(1).toUpperCase();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] p-6 mix-blend-difference text-white pointer-events-none `}>
        <nav className="flex justify-between items-center max-w-7xl mx-auto w-full pointer-events-auto">
          
          {/* LEFT: Current Page Name */}
          <div className="w-1/3 text-left">
            <span className="text-base text-3xl tracking-[0.3em] font-semibold uppercase opacity-80">
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
   <div className="w-1/3 flex justify-end
                    gap-8 
                    text-xl 
                    tracking-widest 
                    font-semibold 
                    uppercase 
                    opacity-80 
                    isolate">
  
  {/* Contact - boxed with slide fill */}
  <button onClick={() => {}} className="
          group relative overflow-hidden
          px-5 py-2
          border border-white/40 hover:border-white
          bg-[#FF3831] hover:bg-#000000/0
          text-[#fffdd0] hover:text-white
          outline-none appearance-none
          cursor-pointer
          transition-all duration-200
          corner rounded-lg
        ">
    {/* White fill that slides in from left */}
   <span className={`
      absolute inset-0
      ${isXRayActive ? 'bg-emerald-400' : 'bg-[#fffdc9]'}
      -translate-x-full group-hover:translate-x-0
      transition-transform duration-200 ease-out z-0
    `}/>
    {/* Text flips color as fill slides in */}
     <span className={`relative z-10 transition-colors duration-200 vintage-font text-2xl
    ${isXRayActive ? 'group-hover:text-#000000/0' : 'group-hover:text-[#FF3831]'}`}>
      Lets Connect
    </span>
  </button>

  {/* Menu stays as plain text */}
  <button 
    onClick={() => setIsSidebarOpen(true)}
    className='
    group relative overflow-hidden
    px-5 py-2
    border border-white/40 hover:border-white
    bg-[#FF3831] hover:bg-#000000/0
    text-[#fffdd0] hover:text-white
    outline-none appearance-none
    cursor-pointer
    transition-all duration-200
    corner rounded-lg
  '>
    {/* White fill that slides in from left */}
        <span className={`
      absolute inset-0
      ${isXRayActive ? 'bg-emerald-400' : 'bg-[#fffdc9]'}
      -translate-x-full group-hover:translate-x-0
      transition-transform duration-200 ease-out z-0
    `}/>
    {/* Text flips color as fill slides in */}
    <span className={`relative z-10 transition-colors duration-200 text-2xl
    ${isXRayActive ? 'group-hover:text-#000000/0' : 'group-hover:text-[#FF3831]'}`}>
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
            <li><Link to="/model" onClick={() => setIsSidebarOpen(false)} className="hover:text-emerald-400 transition-colors">3D Archive</Link></li>
            <li><button 
              onClick={() => handleNavClick('#projects')} 
              className="text-2xl hover:text-emerald-400 transition-colors tracking-widest"
            >
              Projects
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