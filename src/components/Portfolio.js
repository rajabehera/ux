import React, { useState, useEffect, useRef, useMemo } from 'react';
import CustomCursor from './CustomCursor';
import MagneticTrail from './MagneticTraill';
import Testimonials3D from './Testimonial';
import HoverLetterEffect from './HoverLetterEffect';
import GlassCursor from './GlassCursor';


// Lenis Smooth Scroll Hook
const useLenisScroll = () => {
  const lenisRef = useRef({
    scrollTo: (target, options = {}) => {
      const element = typeof target === 'string'
        ? document.querySelector(target)
        : target;

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
  });

  const rafRef = useRef(null);

  useEffect(() => {
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

      {/* <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="fixed top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} /> */}

      {/* Main Content */}
      <div className="relative z-10 text-center" data-aos="fade-down">

        <div
          className="mb-8 transition-all duration-700"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1 - scrollY * 0.0005})`,
            opacity: 1 - scrollY * 0.002
          }}
        >
          <div className="inline-block">
            <div className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 text-sm uppercase tracking-widest mb-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent glass-text" />
              I am Raja Behera
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            </div>
          </div>
          {/* <h1
            className="text-7xl md:text-9xl font-bold my-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent  font-serif designer"
            style={{
              textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
              transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg)`
            }}
          >
            UX ENGINEER
          </h1> */}
          <HoverLetterEffect  scrollY={scrollY}/>
          <p className="text-2xl md:text-4xl text-gray-300 font-light tracking-wide">
            Crafting Digital Experiences
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className="mt-16 animate-bounce cursor-pointer transition-transform hover:scale-110 z-100"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.005)
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (lenis) {
              lenis.scrollTo('#gallery-section', { duration: 1500 });
            }
            if (!lenis) {
              console.warn("Lenis not ready");
              return;
            }
            lenis.scrollTo('#gallery-section', { duration: 1500 });
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
    '../img/logo/claude-ai-icon.svg',
    '../img/logo/github-mark-white.svg',
    '../img/logo/javascript-original.svg',
    '../img/logo/mysql-original.svg',
    '../img/logo/nextjs-original.svg',
    '../img/logo/react-original.svg',
    '../img/logo/nodejs-original.svg',
    '../img/logo/Bootstrap_logo.svg',
    '../img/logo/expressjs.svg',
    '../img/logo/tailwindcss-mark.d52e9897.svg',
    '../img/logo/threejs-original.svg',
    '../img/logo/greensock-gsap-icon-seeklogo.svg',
    '../img/logo/framer-motion-seeklogo.svg',
    '../img/logo/chatgpt-icon.svg',
    '../img/logo/adobe-illustrator-cc-3.svg',
    '../img/logo/icon full color.svg',
  ];

  const randomFactors = useMemo(
    () =>
      images.map(() => ({
        speed: 0.6 + Math.random() * 1.2,
        scaleIntensity: 0.5 + Math.random(2) * 0.8,
        rotateIntensity: 10 + Math.random(5) * 10,
        scatter: 1 + Math.random() * 4,
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
        const current = window.scrollY - 300;
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

    const translateX = baseX * (6 + localScrollProgress * scatter);
    const translateY = baseY * (2 + localScrollProgress * scatter);
    const translateZ = baseZ + scrollZ - 200;

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
    // const scale = 1 + localScrollProgress * scaleIntensity - Math.sin(index) * 0.05;
    const scale = 1
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
        minHeight: '100vh',
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
          perspective: '2200px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '50%',
            height: '50%',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.5rem',
            padding: '0 2rem',
            transformStyle: 'preserve-3d',
            transform: `translate3d(${localScrollProgress * 300}px, ${-localScrollProgress * 200}px, ${localScrollProgress * 1800}px)`,
            transition: 'transform 0.25s ease-out',
            marginTop: ' -30%',
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
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...getInnerTransform(index),
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        <h2
          style={{
            position: 'absolute',
            top: '2%',
            left: '5%',
            color: 'white',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: '300',
            lineHeight: '1.4',
            opacity: 1 - localScrollProgress * 0.7,
            // transform: `translateY( ${scrollY * 0.4}px)`,
            transition: 'opacity 0.3s ease',
            maxWidth: '600px',
            zIndex: 10,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          “I design beyond the pixels —
          <br />
          <span className="text-purple-400">I design the experience,</span>
        </h2>

        <h2
          style={{
            position: 'absolute',
            bottom: '12%',
            right: '5%',
            color: 'white',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: '300',
            lineHeight: '1.4',
            opacity: 1 - localScrollProgress * 0.7,
            // transform: `translateY( ${scrollY * 0.4}px)`,
            transition: 'opacity 0.3s ease',
            maxWidth: '600px',
            zIndex: 10,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          and I engineer the magic
          <br />
          <span className="text-purple-400"> that makes it unforgettable.”</span>
        </h2>
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
        background: 'transparent',
        cursor: 'none',
        marginTop: '-70px'
      }}
    >

      {/*  background: 'radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0612 50%, #000000 100%)', */}
      <HeroSection lenis={lenis} scrollY={scrollY} />
      {/* <GlassCursor /> */}
      {/* <Testimonials3D scrollY={scrollY}/> */}
      <Gallery3D scrollY={scrollY} />

      {/* <ProjectsScroll3D scrollY={scrollY} /> */}


    </div>
  );
}