import React, { useEffect, useRef, useState } from 'react';

const ScrollGallery = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const initLenis = () => {
      const LenisConstructor = window.Lenis;

      if (!LenisConstructor) {
        console.warn('Lenis not loaded, loading from CDN...');
        return;
      }

      // Initialize Lenis with smooth settings
      lenisRef.current = new LenisConstructor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Animation frame loop
      function raf(time) {
        lenisRef.current?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);

      // Listen to Lenis scroll events
      lenisRef.current.on('scroll', handleLenisScroll);
    };

    // Load Lenis from CDN
    if (window.Lenis) {
      initLenis();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js';
      script.async = true;
      script.onload = initLenis;
      document.head.appendChild(script);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  const handleLenisScroll = ({ scroll }) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress relative to container
    const scrollStart = scroll - containerTop;
    const scrollRange = containerHeight - windowHeight;
    const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));

    setScrollProgress(progress);
  };

  const getLayerStyle = (index, totalLayers) => {
    // Each image takes up a portion of the scroll
    const progressPerImage = 1 / (totalLayers - 1);
    
    // Calculate which image should be active
    const imageProgress = scrollProgress / progressPerImage;
    const currentIndex = Math.floor(imageProgress);
    const localProgress = imageProgress - currentIndex;
    
    // Distance from current index
    const relativePos = index - currentIndex;

    let scale = 1;
    let translateZ = 0;
    let opacity = 0;
    let rotateX = 0;
    let brightness = 1;

    if (relativePos === 0) {
      // Current active image - zooms out and fades
      scale = 1 + (localProgress * 0.3);
      translateZ = localProgress * 400;
      opacity = 1 - (localProgress * 0.3);
      rotateX = localProgress * 15;
      brightness = 1 - (localProgress * 0.3);
    } else if (relativePos === 1) {
      // Next image - comes from behind
      scale = 0.7 + (localProgress * 0.3);
      translateZ = -300 + (localProgress * 300);
      opacity = 0.7 + (localProgress * 0.3);
      rotateX = -10 + (localProgress * 10);
      brightness = 0.7 + (localProgress * 0.3);
    } else if (relativePos === 2) {
      // Second next - visible in background
      scale = 0.5 + (localProgress * 0.2);
      translateZ = -600 + (localProgress * 300);
      opacity = 0.4 + (localProgress * 0.3);
      rotateX = -15 + (localProgress * 5);
      brightness = 0.5 + (localProgress * 0.2);
    } else if (relativePos === 3) {
      // Third - barely visible
      scale = 0.4 + (localProgress * 0.1);
      translateZ = -900 + (localProgress * 300);
      opacity = 0.2 * localProgress;
      rotateX = -20 + (localProgress * 5);
      brightness = 0.4;
    } else if (relativePos < 0) {
      // Past images - pushed forward and hidden
      scale = 1.5;
      translateZ = 600;
      opacity = 0;
      rotateX = 30;
    } else {
      // Future images - hidden behind
      scale = 0.3;
      translateZ = -1200;
      opacity = 0;
      rotateX = -25;
    }

    return {
      transform: `translateZ(${translateZ}px) scale(${scale}) rotateX(${rotateX}deg)`,
      opacity,
      filter: `brightness(${brightness})`,
      zIndex: relativePos === 0 ? 40 : relativePos === 1 ? 30 : relativePos === 2 ? 20 : relativePos === 3 ? 10 : relativePos < 0 ? 0 : 5,
      pointerEvents: relativePos === 0 || relativePos === 1 ? 'auto' : 'none',
    };
  };

  const images = [
    {
      title: "Urban Stories",
      subtitle: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
    {
      title: "Nature's Canvas",
      subtitle: "Landscape",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
      title: "Modern Living",
      subtitle: "Interior Design",
      imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    },
    {
      title: "Coastal Vibes",
      subtitle: "Seascape",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
    },
    {
      title: "Mountain Peak",
      subtitle: "Adventure",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
      title: "City Lights",
      subtitle: "Urban Photography",
      imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    },
    {
      title: "Desert Dreams",
      subtitle: "Exploration",
      imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
    },
    {
      title: "Forest Path",
      subtitle: "Nature",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
    {
      title: "Arctic Beauty",
      subtitle: "Winter Wonderland",
      imageUrl: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22",
    },
    {
      title: "Golden Hour",
      subtitle: "Sunset Collection",
      imageUrl: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
    }
  ];

  const currentIndex = Math.floor(scrollProgress / (1 / (images.length - 1)));
  const currentImage = images[Math.min(currentIndex, images.length - 1)];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-serif text-white mb-4">Portfolio</h1>
          <p className="text-xl text-zinc-400 tracking-wider">Scroll to explore</p>
        </div>
      </div>

      {/* Sticky 3D Scroll Container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${images.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background with current image blurred */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              backgroundImage: `url(${currentImage.imageUrl}?w=1920&h=1080&fit=crop)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(60px) brightness(0.3)',
            }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              perspective: '1500px',
              perspectiveOrigin: 'center center'
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  ...getLayerStyle(index, images.length),
                  transformStyle: 'preserve-3d',
                  transition: 'none', // No CSS transitions - Lenis handles smoothness
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
                  <div className="flex flex-col items-center max-w-4xl">
                    {/* Title Above Image */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 text-center">
                      {image.title}
                    </h2>
                    
                    {/* Image Card */}
                    <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                      <img
                        src={`${image.imageUrl}?w=800&h=1000&fit=crop`}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Subtitle overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white/80 text-lg tracking-wider">{image.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: currentIndex === index ? 'white' : 'rgba(255,255,255,0.3)',
                  transform: currentIndex === index ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* End Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-zinc-900 to-black">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Let's Work Together
          </h2>
          <button className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg tracking-wider">
            GET IN TOUCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollGallery;