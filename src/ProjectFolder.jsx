import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverPopup from './HoverPopup';

export default function ProjectFolder({ title, children, preview }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <div className="w-full border-t border-gray-800 last:border-b">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-8 text-left group relative"
        // ↓ pass mouse events up only when closed
        onMouseEnter={!isOpen ? preview?.onEnter : undefined}
        onMouseMove={!isOpen ? preview?.onMove : undefined}
        onMouseLeave={!isOpen ? preview?.onLeave : undefined}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <div className="relative w-8 h-8 flex items-center justify-center">
          <span className="absolute w-full h-[2px] bg-gray-400 group-hover:bg-white transition-colors"></span>
          <span className={`absolute w-full h-[2px] bg-gray-400 group-hover:bg-white transition-all duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}></span>
        </div>
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100 pb-10' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>

    </div>
  );
}