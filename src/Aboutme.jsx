import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Aboutme() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Simple stagger fade-in for the dashboard cards
      gsap.from(".stat-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-6 max-w-7xl mx-auto text-white font-sans">
      
      {/* HEADER */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl text-[#fffdd0] font-bold mb-4 tracking-wide vintage-font">
          About Me
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* =========================================
            COLUMN 1: EDUCATION & BIO (Spans 1 Col)
            ========================================= */}
        <div className="stat-card flex flex-col gap-6">
          
          {/* Identity Block */}
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3831] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#fffdd0]">
              <span className="text-[#FF3831]">_</span> Background
            </h3>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Cybersecurity enthusiast bridging the gap between offensive security and robust application development. Focused on hybrid roles that combine penetration testing with secure web architectures.
            </p>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Degree</span>
                <span className="text-emerald-400 text-right">B.Tech Computer Science</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Institute</span>
                <span className="text-right">IIIT Dharwad</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">Graduation</span>
                <span className="text-[#FF3831]">Class of 2028</span>
              </div>
            </div>
          </div>

          {/* Current Tech Stack */}
          <div className="stat-card bg-[#0a0a0a] border border-white/10 p-8 rounded-xl group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3831] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-sm tracking-widest uppercase text-[#fffdd0] font-mono mb-4">Active Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Tailwind', 'Three.js', 'Python', 'C++', 'Burp Suite', 'Nmap', 'Arch/Hyprland', 'Kali', 'Docker', 'Git', 'GitHub' ,'Flutter', 'Dart', 'GoBuster'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300 hover:border-[#FF3831] hover:text-[#FF3831] transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            COLUMN 2 & 3: THE GRIND (Spans 2 Cols)
            ========================================= */}
        <div className="lg:col-span-2 flex flex-col gap-6">
    
          {/* Top Row: CTF & LeetCode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CTF Progress */}
            <div className="stat-card bg-[#0a0a0a] border border-white/10 p-8 rounded-xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3831] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-xl text-[#fffdd0] font-bold mb-6">Offensive Security</h3>
               
               <div className="space-y-6">
                 {/* HackTheBox */}
                 <div>
                   <div className="flex justify-between text-sm font-mono mb-2">
                     <span className="text-emerald-500">Hack The Box</span>
                     <span className="text-gray-400">Apprentice Hacker</span>
                   </div>
                   <div className="w-full bg-black rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                   </div>
                 </div>

                 {/* PortSwigger */}
                 <div>
                   <div className="flex justify-between text-sm font-mono mb-2">
                     <span className="text-blue-400">PortSwigger Web Security</span>
                     <span className="text-gray-400">Apprentice</span>
                   </div>
                   <div className="w-full bg-black rounded-full h-2">
                     <div className="bg-blue-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                   </div>
                 </div>

                 <div className="pt-4 border-t border-white/5 text-xs font-mono text-gray-500 flex flex-col gap-1">
                   <span> Latest Target: DarkHole VM</span>
                   <span>Active Protocols: Enumeration, PrivEsc</span>
                 </div>
               </div>
            </div>

            {/* LeetCode DSA */}
            <div className="stat-card bg-[#0a0a0a] border border-white/10 p-8 rounded-xl overflow-hidden relative group">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3831] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-xl font-bold mb-6 flex items-center text-[#fffdd0] justify-between">
                 Algorithmic DSA
                 <span className="text-xs font-mono bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">LeetCode</span>
               </h3>
               
               <div className="flex items-end gap-4 mb-6">
                 <span className="text-5xl font-extrabold">70+</span>
                 <span className="text-gray-500 font-mono mb-1">Total Solved</span>
               </div>

               <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-emerald-400">Easy</span>
                    <div className="flex-1 bg-black h-1.5 rounded-full"><div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '60%'}}></div></div>
                    <span className="w-8 text-right">40+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-yellow-400">Medium</span>
                    <div className="flex-1 bg-black h-1.5 rounded-full"><div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '30%'}}></div></div>
                    <span className="w-8 text-right">25+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-[#FF3831]">Hard</span>
                    <div className="flex-1 bg-black h-1.5 rounded-full"><div className="bg-[#FF3831] h-1.5 rounded-full" style={{width: '10%'}}></div></div>
                    <span className="w-8 text-right">3</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Row: Certifications & Badges */}
          <div className="stat-card bg-[#0a0a0a] border border-white/10 p-8 rounded-xl flex-1 group overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3831] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#fffdd0] ">Certifications & Badges</h3>
              <span className="text-xs font-mono text-gray-500">Verified Credentials</span>
            </div>

            {/* Grid for Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
               {/* Empty Slot / Upcoming */}
               <div className="border border-dashed border-white/10 bg-transparent p-4 rounded-lg flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-12 h-12 mb-3 rounded-full flex items-center justify-center text-xl text-gray-600">
                  🔒
                </div>
                <h4 className="text-xs font-bold text-gray-600 mb-1">CompTIA Sec+</h4>
                <p className="text-[10px] text-gray-600">In Progress...</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}