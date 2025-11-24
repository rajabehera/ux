import React, { useState, useEffect, useRef} from 'react';
import './HeroSection.css';

import { Sparkles, Layers, Palette, MousePointer2 } from 'lucide-react';
import WhatIDoSection from './WhatIDoSection';
import Gallery3D from './Gallery3D';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseTimeoutRef = useRef(null);
  const lastPositionRef = useRef(null);
  
  // New state and ref for scroll animation
  const [whatIDoVisible, setWhatIDoVisible] = useState(false);
  const gallery3DRef = useRef(null);

  const roles = [
    { title: 'UI Design', icon: Palette, delay: 100 },
    { title: 'Frontend Dev', icon: Layers, delay: 200 },
    { title: 'Animation', icon: Sparkles, delay: 300 },
    { title: 'Interaction', icon: MousePointer2, delay: 400 },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setMousePosition(newPoint);
      setIsMouseMoving(true);
      
      setCursorTrail(prev => {
        // If we have a stored last position and trail is empty, connect from there
        if (lastPositionRef.current && prev.length === 0) {
          const connectionTrail = [lastPositionRef.current, newPoint];
          lastPositionRef.current = newPoint;
          return connectionTrail;
        }
        
        const newTrail = [...prev, newPoint];
        lastPositionRef.current = newPoint;
        return newTrail.slice(-50);
      });

      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }

      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
        // Store the last position and clear trail after fade completes
        setTimeout(() => {
          setCursorTrail(prev => {
            if (prev.length > 0) {
              lastPositionRef.current = prev[prev.length - 1];
            }
            return [];
          });
        }, 800);
      }, 100);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);


  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden relative -top-10" style={{
      background: 'radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0612 50%, #000000 100%)',
      cursor: hoveredCard !== null ? 'pointer' : 'none'
    }}>
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 "
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          opacity: isMouseMoving ? 1 : 0,
          transition: 'left 0.02s linear, top 0.02s linear, opacity 0.3s ease-out',
          display: hoveredCard !== null ? 'none' : 'block'
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>

      {/* Cursor Trail with Smooth Bezier Curves */}
      <svg className="fixed inset-0 pointer-events-none z-40 w-full h-full">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
          </linearGradient>
          <filter id="trailGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {cursorTrail.length > 2 && (
          <path
            d={(() => {
              if (cursorTrail.length < 2) return '';
              
              let path = `M ${cursorTrail[0].x} ${cursorTrail[0].y}`;
              
              for (let i = 1; i < cursorTrail.length - 1; i++) {
                const current = cursorTrail[i];
                const next = cursorTrail[i + 1];
                const controlX = (current.x + next.x) / 2;
                const controlY = (current.y + next.y) / 2;
                
                path += ` Q ${current.x} ${current.y} ${controlX} ${controlY}`;
              }
              
              const last = cursorTrail[cursorTrail.length - 1];
              path += ` L ${last.x} ${last.y}`;
              
              return path;
            })()}
            stroke="url(#trailGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#trailGlow)"
            style={{
              opacity: isMouseMoving ? 1 : 0,
              transition: 'opacity 0.8s ease-out'
            }}
          />
        )}
      </svg>

      {/* Hero Section */}
 
      <div className="relative min-h-screen flex items-center justify-center px-6">
        {/* Floating Particles */}

        {/* Main Content */}
        <div className="relative z-10 text-center">
          <div 
            className="mb-8 transition-all duration-700"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollY * 0.0005})`,
              opacity: 1 - scrollY * 0.002
            }}
          >
            <h1 
              className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
                transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg)`
              }}
            >
              DESIGNER
            </h1>
            <p className="text-2xl md:text-4xl text-gray-300 font-light tracking-wide">
              Crafting Digital Experiences
            </p>
          </div>

      {/* Scroll Indicator */}
          <div 
            className="mt-16 animate-bounce cursor-pointer transition-transform hover:scale-110"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.005)
            }}
            onClick={() => {
              const targetPosition = window.innerHeight + 70;
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              const duration = 1500; // 1.5 seconds for smooth slow scroll
              let startTime = null;

              function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smooth deceleration
                const easeInOutCubic = progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + distance * easeInOutCubic);
                
                if (timeElapsed < duration) {
                  requestAnimationFrame(animation);
                }
              }
              
              requestAnimationFrame(animation);
            }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery3D Section with ref for intersection observer */}
    
 {/* <Gallery3D/> */}
  
      {/* Roles Section with 3D Cards - Animated on scroll */}
 
        {/* <WhatIDoSection
          scrollY={scrollY}
          roles={roles}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        /> */}
    

      {/* Footer */}
      {/* <div 
        className="relative py-20 text-center text-white"
        style={{
          opacity: Math.min(1, (scrollY - 800) / 200)
        }}
      >
        <p className="text-xl">Let's create something amazing together</p>
      </div> */}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}