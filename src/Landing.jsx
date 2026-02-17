import React from 'react';

export default function Landing() {
  return (
    // CHANGED: 'fixed' instead of 'sticky'. 
    // This pins it to the background permanently.
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-red-500">
      
      {/* BACKGROUND IMAGE */}
      {/* Uses the file from the public folder directly */}
      <img 
        src="/ME1.jpg" 
        alt="Portfolio Intro" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
}