import { scale } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const ScrollGallery = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollProgress2, setScrollProgress2] = useState(0);
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

  // 🔹 Scroll progress for first animation (starts when top touches top)
  const scrollStart = scroll - containerTop;
  const scrollRange = containerHeight - windowHeight;
  const progress1 = Math.max(0, Math.min(1, scrollStart / scrollRange));

  // 🔹 Scroll progress for second animation (starts when 50% height crosses top)
  const secondTriggerPoint = containerTop - windowHeight / 2;
  const scrollStart2 = scroll - secondTriggerPoint;
  const scrollRange2 = containerHeight - windowHeight / 2;
  const progress2 = Math.max(0, Math.min(1, scrollStart2 / scrollRange2));

  setScrollProgress(progress1);
  setScrollProgress2(progress2);
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
    let brightness = 1;

    if (relativePos === 0) {
      // Current active image - zooms out and fades
      scale = 0.7 + (localProgress * 1.1);
      translateZ = localProgress * 600;
      opacity = 1;
      brightness = 1;
    } else if (relativePos === 1) {
      // Next image - comes from behind
      scale = 0.3 + (localProgress * 0.4);
      translateZ = -300 + (localProgress * 300);
      opacity = 0.7 + (localProgress * 0.3);
      brightness = 0.7 + (localProgress * 0.3);
    } else if (relativePos === 2) {
      // Second next - visible in background
      scale = 0.1 + (localProgress * 0.2);
      translateZ = -600 + (localProgress * 300);
      opacity = 0.4 + (localProgress * 0.3);
      brightness = 0.5 + (localProgress * 0.2);
    } else if (relativePos === 3) {
      // Third - barely visible
      scale = 0.001 + (localProgress * 0.1);
      translateZ = -900 + (localProgress * 300);
      opacity = 0.2 * localProgress;
      brightness = 0.4;
    } else if (relativePos < 0) {
      // Past images - pushed forward and hidden
      scale = 1.2;
      translateZ = 400;
      opacity = 0;
      brightness = 1;
    } else {
      // Future images - hidden behind
      scale = 0.3;
      translateZ = -1200;
      opacity = 0;
    }

    return {
      transform: `translateZ(${translateZ}px) scale(${scale})`,
      transition: "transform 0.5s, opacity 0.5s",
      opacity,
      filter: `brightness(${brightness})`,
      zIndex: relativePos === 0 ? 40 : relativePos === 1 ? 30 : relativePos === 2 ? 20 : relativePos === 3 ? 10 : relativePos < 0 ? 0 : 5,
      pointerEvents: relativePos === 0 || relativePos === 1 ? 'auto' : 'none',
    };
  };

  const images = [
    {
      title: "Trivedi Films",
      subtitle: "Website Development",
      imageUrl: "../img/tf.png",
    },
    {
      title: "SuDrives",
      subtitle: "Mobile App UI/UX Design",
      imageUrl: "../img/sup.png",
    },
    {
      title: "Seatrans Agencies",
      subtitle: "Website Development",
      imageUrl: "../img/st.png",
    },
    {
      title: "PickTailor",
      subtitle: "Mobile App UI/UX Design",
      imageUrl: "../img/Pickta.png",
    },
    {
      title: "Seatech Digital",
      subtitle: "Website Development",
      imageUrl: "../img/std.png",
    },
    {
      title: "Shayoag",
      subtitle: "Mobile App UI/UX Design",
      imageUrl: "../img/shayoag.png",
    },
    {
      title: "SuDrives",
      subtitle: "UI/UX Design & Website Development",
      imageUrl: "../img/sd.png",
    },
    {
      title: "Optimus",
      subtitle: "ServiceNow App UI/UX Design",
      imageUrl: "../img/opti.png",
    },
    {
      title: "SellSpark",
      subtitle: "UI/UX Design & Website Development",
      imageUrl: "../img/sp.png",
    },
    {
      title: "SuDrives",
      subtitle: "Mobile App UI/UX Design",
      imageUrl: "../img/sduser.png",
    },
    {
      title: "Maa Ashram",
      subtitle: "Mobile App UI/UX Design",
      imageUrl: "../img/maa.png",
    }
  ];

  const currentIndex = Math.floor(scrollProgress / (1 / (images.length - 1)));
  const currentImage = images[Math.min(currentIndex, images.length - 1)];



  return (
    <div className="bg-transprent" style={{   opacity: scrollProgress2 > 0 ?  13 * scrollProgress2 : 0}} id='works'>
      {/* Hero Section */}
      {/* style={{ transform: `translate3d(0, 0, ${scrollProgress}px) scale(${scrollProgress})`}}    transformStyle: 'preserve-3d', transform: `translate3d(0, 0, 100px) scale(1)` */}
      {/* <div className="h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-serif text-white mb-4">Portfolio</h1>
          <p className="text-xl text-zinc-400 tracking-wider">Scroll to explore</p>
        </div>
      </div> */}

      {/* Sticky 3D Scroll Container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${images.length * 100}vh` }}
        
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background with current image blurred */}
          <div
            className={`absolute inset-0 transition-all duration-1000  `}
            style={{
              backgroundImage: `url(${currentImage.imageUrl}?w=1920&h=1080&fit=crop)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(140px) brightness(0.8)',
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
                <div className="relative w-full h-full flex items-center px-8 md:px-16 lg:px-24">
                  {/* Alternate left and right positioning */}
                  <div className={`w-full flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="flex flex-col items-center max-w-4xl">
                      {/* Title Above Image */}
                        <h2 className="text-4xl md:text-6xl lg:text-8xl  text-white mb-8 text-center designer">
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
              </div>
            ))}
          </div>

          {/* Progress indicator */}
           {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-3">
              <div className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">
                Scroll
              </div>
              <div className="flex items-center gap-4">
                <div className="text-white text-4xl font-light">
                  {Math.round(scrollProgress * 100)}%
                </div>
                <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-white/40 text-xs">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* End Section */}
      {/* <div className="h-screen flex items-center justify-center bg-gradient-to-t from-zinc-900 to-black">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Let's Work Together
          </h2>
          <button className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg tracking-wider">
            GET IN TOUCH
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ScrollGallery;