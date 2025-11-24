import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Layers, Palette, MousePointer2 } from 'lucide-react';

// Lenis Smooth Scroll Hook
const useLenisScroll = () => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const initLenis = async () => {
      // Simulating Lenis behavior with custom smooth scroll
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

    // RAF loop for smooth scroll
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
              lenis.scrollTo('#next-section', { duration: 1500 });
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
      className="min-h-screen overflow-hidden relative"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0612 50%, #000000 100%)',
        cursor: 'none'
      }}
    >
      <HeroSection lenis={lenis} scrollY={scrollY} />
      
      {/* Next Section Anchor */}
      <div id="next-section" className="h-20" />
      
      {/* Placeholder for future components */}
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Next Component</h2>
          <p className="text-xl text-gray-400">Tell me what type of scroll behavior you want:</p>
          <div className="mt-8 space-y-2 text-lg">
            <div className="text-purple-400">• Vertical Scroll (Default)</div>
            <div className="text-pink-400">• Horizontal Scroll</div>
            <div className="text-blue-400">• 3D Z-axis Scroll</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const ProjectsScroll3D = ({ scrollY }) => {
//   const containerRef = useRef(null);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const projects = [
//     {
//       title: "Urban Stories",
//       subtitle: "Photography",
//       imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
//     },
//     {
//       title: "Nature's Canvas",
//       subtitle: "Landscape",
//       imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
//     },
//     {
//       title: "Modern Living",
//       subtitle: "Interior Design",
//       imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
//     },
//     {
//       title: "Coastal Vibes",
//       subtitle: "Seascape",
//       imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
//     },
//     {
//       title: "Mountain Peak",
//       subtitle: "Adventure",
//       imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
//     },
//     {
//       title: "City Lights",
//       subtitle: "Urban Photography",
//       imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
//     },
//     {
//       title: "Desert Dreams",
//       subtitle: "Exploration",
//       imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
//     },
//     {
//       title: "Forest Path",
//       subtitle: "Nature",
//       imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
//     },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         const viewportHeight = window.innerHeight;
        
//         const start = rect.top + window.scrollY - viewportHeight;
//         const end = rect.bottom + window.scrollY;
//         const current = window.scrollY;
        
//         const progress = Math.max(0, Math.min(1, (current - start) / (end - start)));
//         setScrollProgress(progress);
//       }
//     };

//     handleScroll();
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const getLayerStyle = (index, totalLayers) => {
//     const progressPerImage = 1 / (totalLayers - 1);
//     const imageProgress = scrollProgress / progressPerImage;
//     const currentIndex = Math.floor(imageProgress);
//     const localProgress = imageProgress - currentIndex;
//     const relativePos = index - currentIndex;

//     let scale = 1;
//     let translateZ = 0;
//     let opacity = 0;
//     let brightness = 1;
//     let blur = 0;

//     if (relativePos === 0) {
//       // Current active image - zooms out and fades
//       scale = 0.7 + (localProgress * 1.1);
//       translateZ = localProgress * 600;
//       opacity = 1;
//       brightness = 1;
//     } else if (relativePos === 1) {
//       // Next image - comes from behind
//       scale = 0.3 + (localProgress * 0.4);
//       translateZ = -300 + (localProgress * 300);
//       opacity = 0.7 + (localProgress * 0.3);
//       brightness = 0.7 + (localProgress * 0.3);
//       blur = 5 - (localProgress * 5);
//     } else if (relativePos === 2) {
//       // Second next - visible in background
//       scale = 0.1 + (localProgress * 0.2);
//       translateZ = -600 + (localProgress * 300);
//       opacity = 0.4 + (localProgress * 0.3);
//       brightness = 0.5 + (localProgress * 0.2);
//       blur = 10 - (localProgress * 5);
//     } else if (relativePos === 3) {
//       // Third - barely visible
//       scale = 0.001 + (localProgress * 0.1);
//       translateZ = -900 + (localProgress * 300);
//       opacity = 0.2 * localProgress;
//       brightness = 0.4;
//       blur = 15;
//     } else if (relativePos < 0) {
//       // Past images - pushed forward and hidden
//       scale = 1.2;
//       translateZ = 400;
//       opacity = 0;
//       brightness = 1;
//     } else {
//       // Future images - hidden behind
//       scale = 0.3;
//       translateZ = -1200;
//       opacity = 0;
//       blur = 20;
//     }

//     return {
//       transform: `translateZ(${translateZ}px) scale(${scale})`,
//       opacity,
//       filter: `brightness(${brightness}) blur(${blur}px)`,
//       zIndex: relativePos === 0 ? 40 : relativePos === 1 ? 30 : relativePos === 2 ? 20 : relativePos === 3 ? 10 : relativePos < 0 ? 0 : 5,
//       pointerEvents: relativePos === 0 || relativePos === 1 ? 'auto' : 'none',
//     };
//   };

//   const currentIndex = Math.floor(scrollProgress / (1 / (projects.length - 1)));
//   const currentProject = projects[Math.min(currentIndex, projects.length - 1)];

//   return (
//     <div
//       id="projects-section"
//       ref={containerRef}
//       style={{
//         width: '100%',
//         minHeight: `${projects.length * 100}vh`,
//         background: 'transparent',
//         position: 'relative',
//       }}
//     >
//       <div
//         style={{
//           position: 'sticky',
//           top: 0,
//           height: '100vh',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Background with current image blurred */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             backgroundImage: `url(${currentProject.imageUrl}?w=1920)`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'blur(40px) brightness(0.3)',
//             transition: 'background-image 1s ease-out',
//           }}
//         />

//         {/* Overlay gradient */}
//         <div 
//           style={{
//             position: 'absolute',
//             inset: 0,
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
//           }}
//         />

//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             perspective: '1500px',
//             perspectiveOrigin: 'center center',
//           }}
//         >
//           {projects.map((project, index) => {
//             const layerStyle = getLayerStyle(index, projects.length);
//             return (
//               <div
//                 key={index}
//                 style={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: '100%',
//                   transformStyle: 'preserve-3d',
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, filter 0.5s ease',
//                   ...layerStyle,
//                 }}
//               >
//                 <div 
//                   style={{
//                     position: 'relative',
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '0 2rem',
//                   }}
//                 >
//                   <div 
//                     style={{
//                       width: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
//                     }}
//                   >
//                     <div 
//                       style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         maxWidth: '900px',
//                       }}
//                     >
//                       {/* Title Above Image */}
//                       <h2 
//                         style={{
//                           fontSize: 'clamp(2.5rem, 6vw, 5rem)',
//                           fontWeight: '300',
//                           color: 'white',
//                           marginBottom: '2rem',
//                           textAlign: 'center',
//                           letterSpacing: '0.02em',
//                         }}
//                       >
//                         {project.title}
//                       </h2>
                      
//                       {/* Image Card */}
//                       <div 
//                         style={{
//                           position: 'relative',
//                           width: 'clamp(280px, 80vw, 400px)',
//                           height: 'clamp(350px, 100vw, 500px)',
//                           borderRadius: '16px',
//                           overflow: 'hidden',
//                           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
//                           border: '1px solid rgba(255, 255, 255, 0.1)',
//                         }}
//                       >
//                         <img
//                           src={`${project.imageUrl}?w=800&h=1000&fit=crop`}
//                           alt={project.title}
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                           }}
//                         />
//                         <div 
//                           style={{
//                             position: 'absolute',
//                             inset: 0,
//                             background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
//                           }}
//                         />
                        
//                         {/* Subtitle overlay */}
//                         <div 
//                           style={{
//                             position: 'absolute',
//                             bottom: '1.5rem',
//                             left: '1.5rem',
//                             right: '1.5rem',
//                           }}
//                         >
//                           <p 
//                             style={{
//                               color: 'rgba(255, 255, 255, 0.8)',
//                               fontSize: '1.125rem',
//                               letterSpacing: '0.1em',
//                               textTransform: 'uppercase',
//                             }}
//                           >
//                             {project.subtitle}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Progress indicator */}
//         <div 
//           style={{
//             position: 'absolute',
//             bottom: '2rem',
//             left: '50%',
//             transform: 'translateX(-50%)',
//           }}
//         >
//           <div 
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: '0.75rem',
//             }}
//           >
//             <div 
//               style={{
//                 color: 'rgba(255, 255, 255, 0.6)',
//                 fontSize: '0.75rem',
//                 letterSpacing: '0.3em',
//                 textTransform: 'uppercase',
//                 fontWeight: '300',
//               }}
//             >
//               Projects
//             </div>
//             <div 
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '1rem',
//               }}
//             >
//               <div 
//                 style={{
//                   color: 'white',
//                   fontSize: '2.25rem',
//                   fontWeight: '300',
//                 }}
//               >
//                 {Math.round(scrollProgress * 100)}%
//               </div>
//               <div 
//                 style={{
//                   width: '8rem',
//                   height: '1px',
//                   background: 'rgba(255, 255, 255, 0.2)',
//                   position: 'relative',
//                   overflow: 'hidden',
//                 }}
//               >
//                 <div 
//                   style={{
//                     position: 'absolute',
//                     left: 0,
//                     top: 0,
//                     height: '100%',
//                     background: 'white',
//                     width: `${scrollProgress * 100}%`,
//                     transition: 'width 0.3s ease',
//                   }}
//                 />
//               </div>
//             </div>
//             <div 
//               style={{
//                 color: 'rgba(255, 255, 255, 0.4)',
//                 fontSize: '0.75rem',
//               }}
//             >
//               {currentIndex + 1} / {projects.length}
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator at top */}
//         <div
//           style={{
//             position: 'absolute',
//             top: '2rem',
//             right: '2rem',
//             color: 'rgba(255,255,255,0.4)',
//             fontSize: '14px',
//             fontFamily: 'monospace',
//             background: 'rgba(0,0,0,0.3)',
//             padding: '8px 16px',
//             borderRadius: '20px',
//             backdropFilter: 'blur(10px)',
//           }}
//         >
//           3D Project Scroll: {Math.round(scrollProgress * 100)}%
//         </div>
//       </div>
//     </div>
//   );
// };