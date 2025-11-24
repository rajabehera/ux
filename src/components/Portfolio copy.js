import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Layers, Palette, MousePointer2 } from 'lucide-react';

// Lenis Smooth Scroll Hook
const useLenisScroll = () => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const initLenis = async () => {
      lenisRef.current = {
        scrollTo: (target, options = {}) => {
          const element = typeof target === 'string' ? document.querySelector(target) : target;
          if (element) {
            const targetPosition = element.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = options.duration || 1500;
            let startTime = null;

            function animation(currentTime) {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const progress = Math.min(timeElapsed / duration, 1);
              
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              
              window.scrollTo(0, startPosition + distance * easeInOutCubic);
              
              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              }
            }
            
            requestAnimationFrame(animation);
          }
        }
      };
    };

    initLenis();

    const raf = (time) => {
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return lenisRef.current;
};

// Hero Section Component
const HeroSection = ({ lenis, scrollY }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseTimeoutRef = useRef(null);
  const lastPositionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setMousePosition(newPoint);
      setIsMouseMoving(true);
      
      setCursorTrail(prev => {
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

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          opacity: isMouseMoving ? 1 : 0,
          transition: 'left 0.02s linear, top 0.02s linear, opacity 0.3s ease-out',
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>

      {/* Cursor Trail */}
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
            if (lenis) {
              lenis.scrollTo('#gallery-section', { duration: 1500 });
            }
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 3D Gallery Component with Z-axis Scroll
const Gallery3D = ({ scrollY }) => {
  const galleryRef = useRef(null);
  const [localScrollProgress, setLocalScrollProgress] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
    'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
  ];

  const randomFactors = useMemo(
    () =>
      images.map(() => ({
        speed: 0.6 + Math.random() * 1.2,
        scaleIntensity: 0.5 + Math.random() * 0.8,
        rotateIntensity: 10 + Math.random() * 20,
        scatter: 1 + Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress based on element position
        const start = rect.top + window.scrollY - viewportHeight;
        const end = rect.bottom + window.scrollY;
        const current = window.scrollY;
        
        const progress = Math.max(0, Math.min(1, (current - start) / (end - start)));
        setLocalScrollProgress(progress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getItemTransform = (index) => {
    const { speed, rotateIntensity, scatter } = randomFactors[index];
    const maxScroll = 4000 * speed;
    const scrollZ = localScrollProgress * maxScroll;

    const cols = 5;
    const row = Math.floor(index / cols);
    const col = index % cols;

    const baseX = (col - cols / 2) * 20 + Math.sin(index) * 25;
    const baseY = row * 40 + Math.cos(index * 0.7) * 20;
    const baseZ = -1800 - index * 150 - Math.sin(index * 0.5) * 300;

    const translateX = baseX * (1 + localScrollProgress * scatter);
    const translateY = baseY * (1 + localScrollProgress * scatter);
    const translateZ = baseZ + scrollZ;

    const rotateX = -10 + Math.sin(index * 0.4) * 10 + localScrollProgress * rotateIntensity;
    const brightness = Math.max(25, 100 - Math.abs(translateZ) / 60);

    return {
      transform: `translate(${translateX}%, ${translateY}%) translate3d(0,0,${translateZ}px) rotateX(${rotateX}deg)`,
      filter: `brightness(${brightness}%)`,
      transition: 'transform 0.15s ease-out, filter 0.15s ease-out',
    };
  };

  const getInnerTransform = (index) => {
    const { scaleIntensity } = randomFactors[index];
    const scale = 0.8 + localScrollProgress * scaleIntensity;
    return {
      transform: `scale(${scale})`,
      transition: 'transform 0.15s ease-out',
    };
  };

  return (
    <div
      id="gallery-section"
      ref={galleryRef}
      style={{
        width: '100%',
        minHeight: '200vh',
        background: 'transparent',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1500px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '80%',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.5rem',
            padding: '0 2rem',
            transformStyle: 'preserve-3d',
            transform: `translate3d(${localScrollProgress * 300}px, ${-localScrollProgress * 200}px, ${localScrollProgress * 1800}px)`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '0.7',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transformOrigin: 'center',
                borderRadius: '12px',
                ...getItemTransform(index),
              }}
            >
              <div
                style={{
                  width: '120%',
                  height: '120%',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  ...getInnerTransform(index),
                }}
              />
            </div>
          ))}
        </div>

        <h2
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            color: 'white',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: '300',
            lineHeight: '1.4',
            opacity: 1 - localScrollProgress * 1.5,
            transition: 'opacity 0.3s ease',
            maxWidth: '500px',
            zIndex: 10,
          }}
        >
          I don't shoot what it looks like,
          <br />
          <span className="text-purple-400">I shoot what it feels like.</span>
        </h2>

        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '14px',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.3)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
          }}
        >
          3D Scroll: {Math.round(localScrollProgress * 100)}%
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const lenis = useLenisScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0612 50%, #000000 100%)',
        cursor: 'none'
      }}
    >
      <HeroSection lenis={lenis} scrollY={scrollY} />
      
      <Gallery3D scrollY={scrollY} />
      
      {/* Placeholder for next component */}
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center px-6">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Ready for Next Component
          </h2>
          <p className="text-xl text-gray-400 mb-8">Choose your next scroll style:</p>
          <div className="flex flex-col gap-4 text-lg max-w-md mx-auto">
            <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-purple-500/30">
              <span className="text-purple-400 font-semibold">✓</span> Vertical Scroll
            </div>
            <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-pink-500/30">
              <span className="text-pink-400 font-semibold">○</span> Horizontal Scroll
            </div>
            <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-blue-500/30">
              <span className="text-blue-400 font-semibold">✓</span> 3D Z-axis Scroll (Active)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}