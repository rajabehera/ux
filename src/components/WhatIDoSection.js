import React from 'react';
import { Code, Palette, Database, Layers } from 'lucide-react';

// Sample roles data for demo
const defaultRoles = [
  { title: 'Frontend Dev', icon: Code, delay: 0 },
  { title: 'UI/UX Design', icon: Palette, delay: 100 },
  { title: 'Backend Dev', icon: Database, delay: 200 },
  { title: 'Full Stack', icon: Layers, delay: 300 }
];

export default function WhatIDoSection({ 
  scrollY = 0, 
  roles = defaultRoles, 
  hoveredCard, 
  setHoveredCard 
}) {
  const [hovered, setHovered] = React.useState(null);
  const activeHovered = hoveredCard !== undefined ? hoveredCard : hovered;
  const activeSetHovered = setHoveredCard || setHovered;

  return (
    <div className="relative w-screen h-screen flex items-center justify-center  overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 " />
      
      {/* Ambient light effect */}
      <div 
        className="absolute  opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + Math.sin(scrollY * 0.01) * 20}% ${50 + Math.cos(scrollY * 0.01) * 20}%, rgba(139, 92, 246, 0.15), transparent 50%)`
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 w-full">
        {/* Header */}
        <div 
          className="mb-16 text-center"
          style={{
            opacity: Math.min(1, scrollY / 150),
            transform: `translateY(${Math.max(0, 20 - scrollY * 0.1)}px)`
          }}
        >
          <h2 className="text-7xl md:text-8xl font-light text-white tracking-tight">
            What I Do
          </h2>
          <div className="mt-4 w-16 h-px bg-white/30 mx-auto" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const shouldAnimate = scrollY > 100 + (index * 50);
            const isHovered = activeHovered === index;
            
            return (
              <div
                key={index}
                className="relative"
                style={{
                  opacity: shouldAnimate ? 1 : 0,
                  transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${role.delay}ms`
                }}
                onMouseEnter={() => activeSetHovered(index)}
                onMouseLeave={() => activeSetHovered(null)}
              >
                <div 
                  className="relative aspect-square p-8 rounded-2xl backdrop-blur-sm cursor-pointer overflow-hidden group"
                  style={{
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute  group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent 70%)'
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <Icon 
                      className="w-12 h-12 text-white/80 mb-6 transition-all duration-500" 
                      style={{
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        opacity: isHovered ? 1 : 0.8
                      }}
                    />
                    
                    <h3 
                      className="text-lg font-light text-white/90 text-center tracking-wide transition-all duration-300"
                      style={{
                        opacity: isHovered ? 1 : 0.7,
                        transform: isHovered ? 'translateY(0)' : 'translateY(2px)'
                      }}
                    >
                      {role.title}
                    </h3>

                    {/* Bottom indicator line */}
                    <div 
                      className="absolute bottom-6 left-1/2 h-px bg-white/40 transition-all duration-500"
                      style={{
                        width: isHovered ? '48px' : '24px',
                        transform: 'translateX(-50%)',
                        opacity: isHovered ? 1 : 0.3
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}