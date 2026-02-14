import React, { useState } from 'react';

export default function HoverLetterEffect({ scrollY }) {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const text = "UX ENGINEER";
  
  return (
    <div >
      <h1
        className="text-7xl md:text-9xl font-bold my-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent designer px-10"
        style={{
          textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
          transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg)`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
      {text.split('').map((char, index) => (
  <span
    key={index}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
    className="inline-block transition-all duration-300 ease-out"
    style={{
      // Existing styles
      filter: hoveredIndex === index ? 'blur(40px)' : 'blur(20px)',
      transform: hoveredIndex === index 
        ? 'skew(-20deg, 5deg) scale(1.1)' 
        : 'skew(0deg, 0deg) scale(1)',
        transition: 'all 0.3s ease-in-out',
      
    
      
      // Text shadow for glow effect
      textShadow: hoveredIndex === index 
        ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.6)' 
        : '0 0 10px rgba(255, 255, 255, 0.3)',
      
      // Translate for movement
      translateY: hoveredIndex === index ? '-5px' : '0px',
      
      // Rotate for spinning effect
      rotate: hoveredIndex === index ? '1deg' : '0deg',
      
    
      
      // Brightness/contrast filters
      filter: hoveredIndex === index 
        ? 'blur(40px) brightness(1.5) contrast(1.2)' 
        : 'blur(20px) brightness(1) contrast(1)',
      
      // Transition timing for different effects
      transitionTimingFunction: hoveredIndex === index 
        ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' // bounce effect
        : 'ease-out',
    }}
  >
    {char === ' ' ? '\u00A0' : char}
  </span>
))}
      </h1>
    </div>
  );
}