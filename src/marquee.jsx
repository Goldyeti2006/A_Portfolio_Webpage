import React from 'react';

export default function Marquee() {
  // 1. The Core Data
  const items = [
    { text: "Penetration Testing", icon: "|" },
    { text: "Zero Trust Architecture", icon: "|" },
    { text: "Network Traffic Analysis", icon: "|" },
    { text: "Vulnerability Research", icon: "|" },
    { text: "Secure Web Dev", icon: "|" },
  ];

  // 2. The Illusion Setup
  // We combine the array with itself so the loop has something to seamlessly scroll into.
  const duplicatedItems = [...items, ...items];

  return (
    // 'overflow-hidden' acts as the window. Anything outside this box is invisible.
    <div className="w-full overflow-hidden bg-[#FF3831] border-y border-white/10 py-4 relative flex items-center">
      
      {/* Visual Polish: Left and Right gradient fades so text doesn't just hard-cut at the edge */}
      <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-[#FF3831] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-[#FF3831] to-transparent z-10 pointer-events-none"></div>

      {/* The Scrolling Track */}
      {/* CRITICAL: 'w-max' forces the track to be exactly as wide as its content, preventing it from wrapping to a new line */}
      <div className="flex w-max animate-marquee">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-8">
            <span className="text-xl">{item.icon}</span>
            <span className="text-[#121212] bg-[#FF3831] font-mono text-sm tracking-widest uppercase whitespace-nowrap">
              {item.text}
            </span>
            {/* The Divider Element */}
            <span className="text-emerald-500/30 ml-8">/</span> 
          </div>
        ))}
      </div>
      
    </div>
  );
}