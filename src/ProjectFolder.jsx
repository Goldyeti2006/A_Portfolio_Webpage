import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProjectFolder({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  // CRUCIAL: Tell GSAP to recalculate scroll positions whenever a folder opens or closes
  useEffect(() => {
    // We add a tiny delay to let the CSS animation finish before measuring
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // Matches the 500ms duration of the Tailwind transition
    
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <div className="w-full border-t border-gray-800 last:border-b">
      
      {/* THE LABEL / BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-8 text-left group"
      >
        <h3 className="text-3xl md:text-5xl font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        {/* The Animated Plus/Minus Icon */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <span className="absolute w-full h-[2px] bg-gray-400 group-hover:bg-white transition-colors"></span>
          <span className={`absolute w-full h-[2px] bg-gray-400 group-hover:bg-white transition-all duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}></span>
        </div>
      </button>

      {/* THE COLLAPSIBLE CONTENT AREA */}
      {/* Uses CSS Grid to smoothly animate height from 0 to auto */}
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-10' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* This is where your ESP32 model or other project details will go */}
          <div className="pt-4">
             {children}
          </div>
        </div>
      </div>

    </div>
  );
}