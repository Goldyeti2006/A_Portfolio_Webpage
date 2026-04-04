import CyclingText from "./CyclingText";
import './App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";
export default function Home() {
  const navigate = useNavigate();
  const handleNavClick = (targetId) => {
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
  return (
    
    <div className="min-h-screen flex flex-col justify-center py-20">
      <div className="mb-2 flex justify-center">
      <div className="w-64">  {/* Fixed width large enough for longest word */}
        <CyclingText 
          words={['Greetings', 'ご挨拶', 'Grüße', 'ನಮಸ್ತೆ', 'Salutations']} 
          className="text-5xl font-bold text-center" 
          direction="up"
        />
      </div>
      </div>
      {/* Decorative */}
      <div className="text-[#FF3831] text-2xl mb-6">//</div>
      
      {/* Greeting */}
      <div className="flex items-baseline gap-4 mb-4">
      <p className="text-[#FF3831] font-mono text-lg mb-4">I'm</p>
      
      {/* Name */}
      <h1 className="text-6xl md:text-6xl font-bold text-[#fffdd0] vintage-font mb-4">
        Sharanprakash R Kasbag
      </h1>
      </div>
      {/* Tagline */}
      <p className="text-xl md:text-2xl text-gray-400 mb-6">
        Full-stack Developer <span className="text-[#FF3831]">|</span> Security Enthusiast
      </p>
      
      {/* Bio */}
      <p className="text-[#fffdd0]/80 max-w-xl text-sm md:text-base leading-relaxed mb-8">
        I turn complex problems into simple, secure interfaces. 
        Specializing in 3D web experiences and hardware integration.
      </p>
      
      {/* Skills inline */}
      <div className="flex flex-wrap gap-3 mb-10">
        {['React', 'Three.js', 'ESP32', 'Tailwind', 'Flutter'].map(skill => (
          <span key={skill} className="px-3 py-1 border border-[#FF3831]/30 text-[#FF3831] text-sm rounded-full">
            {skill}
          </span>
        ))}
      </div>
      
      {/* CTA */}
      <button 
         onClick={() => document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-fit px-8 py-3 group relative overflow-hidden
          border border-white/40
          bg-[#FF3831]
          text-[#fffdd0]
          outline-none appearance-none
          cursor-pointer
          rounded-lg
          transition-all duration-200"
      >
        {/* Fill layer - slides in from left */}
        <span className={`
          absolute inset-0
          bg-[#fffdc9]
          -translate-x-full group-hover:translate-x-0
          transition-transform duration-200 ease-out z-0
        `} />
        
        {/* Text layer */}
        <span className={`relative z-10 transition-colors duration-200 text-2xl
          group-hover:text-[#FF3831]`}>Explore My Work →</span>
      </button>
       
    </div>
  )
}
