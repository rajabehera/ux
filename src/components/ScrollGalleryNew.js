import React, { useEffect, useRef, useState } from 'react';

const ScrollGalleryNew = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Define images first
  const images = [
    {
      title: "Urban Stories",
      subtitle: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      position: "right",
      bgColor: "from-slate-900 to-slate-800"
    },
    {
      title: "Nature's Canvas",
      subtitle: "Landscape",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      position: "left",
      bgColor: "from-blue-900 to-blue-800"
    },
    {
      title: "Modern Living",
      subtitle: "Interior Design",
      imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
      position: "right",
      bgColor: "from-amber-900 to-amber-800"
    },
    {
      title: "Coastal Vibes",
      subtitle: "Seascape",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      position: "left",
      bgColor: "from-cyan-900 to-cyan-800"
    },
    {
      title: "Mountain Peak",
      subtitle: "Adventure",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      position: "right",
      bgColor: "from-stone-900 to-stone-800"
    },
    {
      title: "City Lights",
      subtitle: "Urban Photography",
      imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
      position: "left",
      bgColor: "from-indigo-900 to-indigo-800"
    },
    {
      title: "Desert Dreams",
      subtitle: "Exploration",
      imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
      position: "right",
      bgColor: "from-orange-900 to-orange-800"
    },
    {
      title: "Forest Path",
      subtitle: "Nature",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      position: "left",
      bgColor: "from-green-900 to-green-800"
    },
    {
      title: "Arctic Beauty",
      subtitle: "Winter Wonderland",
      imageUrl: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22",
      position: "right",
      bgColor: "from-sky-900 to-sky-800"
    },
    {
      title: "Golden Hour",
      subtitle: "Sunset Collection",
      imageUrl: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
      position: "left",
      bgColor: "from-rose-900 to-rose-800"
    }
  ];

  // Get current background image
  const currentIndex = Math.floor(scrollProgress * images.length);
  const currentBgImage = images[Math.min(currentIndex, images.length - 1)];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollStart = rect.top;
      const scrollRange = containerHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, -scrollStart / scrollRange));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLayerStyle = (index, totalLayers) => {
    const startProgress = index / totalLayers;
    const endProgress = (index + 1) / totalLayers;
    
    let layerProgress = 0;
    if (scrollProgress >= startProgress && scrollProgress <= endProgress) {
      layerProgress = (scrollProgress - startProgress) / (endProgress - startProgress);
    } else if (scrollProgress > endProgress) {
      layerProgress = 1;
    }

    // Current active index based on scroll
    const currentIndex = Math.floor(scrollProgress * totalLayers);
    const nextIndex = currentIndex + 1;
    
    // Only show current and next layer
    const isVisible = index === currentIndex || index === nextIndex;
    
    if (!isVisible) {
      return {
        transform: 'translateZ(-1000px) scale(0.5)',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 0,
      };
    }

    // Smooth transition for current layer moving out
    if (index === currentIndex) {
      const translateZ = layerProgress * 300;
      const scale = 1 - (layerProgress * 0.2);
      const opacity = 1 - (layerProgress * 1);
      
      return {
        transform: `translateZ(${translateZ}px) scale(${scale})`,
        opacity: opacity,
        zIndex: 10,
        transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
      };
    }
    
    // Smooth transition for next layer coming in
    if (index === nextIndex) {
      const translateZ = -300 + (layerProgress * 300);
      const scale = 0.8 + (layerProgress * 0.2);
      const opacity = layerProgress;
      
      return {
        transform: `translateZ(${translateZ}px) scale(${scale})`,
        opacity: opacity,
        zIndex: 5,
        transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
      };
    }

    return {
      transform: 'translateZ(0px) scale(1)',
      opacity: 1,
      zIndex: 1,
    };
  };

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
        style={{ height: `${images.length * 120}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 transition-all duration-700"
            style={{
              backgroundImage: `url(${currentBgImage.imageUrl}?w=1920&h=1080&fit=crop)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px)',
              transform: 'scale(1.1)',
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              perspective: '1500px', 
              perspectiveOrigin: 'center center',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="absolute w-full h-full transition-all duration-500"
                style={getLayerStyle(index, images.length)}
              >
                <div className="relative w-full h-full flex items-center px-8 md:px-16 lg:px-24">
                  {/* Content Layout - Alternating Left/Right */}
                  <div className={`w-full flex items-center ${
                    image.position === 'right' ? 'justify-end' : 'justify-start'
                  }`}>
                    <div className={`flex items-center gap-12 max-w-7xl ${
                      image.position === 'right' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      {/* Text Content */}
                      <div className={`flex-1 ${image.position === 'right' ? 'text-right' : 'text-left'}`}>
                        <div className="text-sm tracking-[0.3em] uppercase text-white opacity-60 mb-4">
                          {image.subtitle}
                        </div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6">
                          {image.title}
                        </h2>
                        <div className="text-white opacity-70 text-lg mb-8 max-w-md">
                          {index + 1} / {images.length}
                        </div>
                      </div>

                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                          <img
                            src={`${image.imageUrl}?w=800&h=1000&fit=crop`}
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default ScrollGalleryNew;