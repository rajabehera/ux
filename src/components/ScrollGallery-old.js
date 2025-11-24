import { transform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const ScrollGallery = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      console.log('progress', progress);
      setScrollProgress(progress);

      // Determine current active image
      const totalImages = images.length;
      const activeIdx = Math.floor(progress * totalImages);
      setCurrentIndex(Math.min(activeIdx, totalImages - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



    const getLayerStyle = (index, totalLayers) => {
    // Calculate progress for current transition
    const progressPerImage = 1 / totalLayers;
    const startProgress = index * progressPerImage;
    const endProgress = (index + 1) * progressPerImage;

    const curr = index === currentIndex;
    const second = index === currentIndex + 1;
    const third = index === currentIndex + 2;

    let scale = 0.7;
    let translateZ = -400;
    let opacity = 0;
    let pointerEvents = "none";

    if (curr) {
      // Current element: scale and bring to front, stay visible
      scale = 1;
      translateZ = 0;
      opacity = 1;
      pointerEvents = "auto";
    } else if (second) {
      // Second: Smaller, behind, still visible
      scale = 0.35;
      translateZ = -200;
      opacity = 0.8;
      pointerEvents = "auto";
    } else if (third) {
      // Third: Smallest, furthest back, still visible
      scale = 0.15;
      translateZ = -400;
      opacity = 0.7;
      pointerEvents = "auto";
    } else {
      // Others: hidden
      scale = 0.1;
      translateZ = -400;
      opacity = 0;
    }

    return {
      transform: `translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex: curr ? 3 : second ? 2 : third ? 1 : 0,
      transition: "transform 0.6s, opacity 0.6s",
      display: opacity !== 0 ? "block" : "none",
      pointerEvents,
    };
  };



  //   const getLayerStyle = (index, totalLayers) => {
  //   const progressPerImage = 1 / totalLayers;
  //   const startProgress = index * progressPerImage;
  //   const endProgress = (index + 1) * progressPerImage;

  //   const isCurrent = scrollProgress >= startProgress && scrollProgress < endProgress;
  //   const curr = index === currentIndex;
  //   const next = index === currentIndex + 1;

  //   let layerProgress = 0;
  //   if (isCurrent) {
  //     layerProgress = (scrollProgress - startProgress) / progressPerImage;
  //   }

  //   let scale = 1;
  //   let translateZ = 0;
  //   let opacity = 0;

  //   if (curr) {
  //     // Current element: Zoom in (scale up, move closer), then fade out
  //     scale = 0.5 + 0.5 * layerProgress; // from 1 to 1.5
  //     translateZ = 0 + 500 * layerProgress; // from 0 to 500px (closer)
  //     opacity = 1 - 0.7 * layerProgress; // fades out
  //   } else if (next && layerProgress > 0) {
  //     // Next element: appear from far/small, zoom in, fade in
  //     scale = 0.3 + 0.5 * layerProgress; // from 0.5 to 1
  //     translateZ = -500 + 500 * layerProgress; // from -500px to 0
  //     opacity = 0.7 + 0.3 * layerProgress; // from 0.3 to 1
  //   } else {
  //     // Hidden
  //     scale = 0.1;
  //     translateZ = -500;
  //     opacity = 0;
  //   }

  //   return {
  //     transform: `translateZ(${translateZ}px) scale(${scale})`,
  //     opacity,
  //     zIndex: curr ? 2 : next ? 1 : 0,
  //     transition: "transform 0.5s, opacity 0.5s",
  //     display: opacity > 0 ? "block" : "none",
  //     pointerEvents: opacity > 0 ? "auto" : "none",
  //   };
  // };

































  //// -----------------------------revrse------------------------------///

  // const getLayerStyle = (index, totalLayers) => {
  //   const progressPerImage = 1 / totalLayers;
  //   const startProgress = index * progressPerImage;
  //   const endProgress = (index + 1) * progressPerImage;

  //   // Use a progress from 0 to 1 for the "transition" between images
  //   const isCurrent = scrollProgress >= startProgress && scrollProgress < endProgress;
  //   const prev = index === currentIndex - 1;
  //   const curr = index === currentIndex;
  //   const next = index === currentIndex + 1;

  //   let layerProgress = 0;

  //   if (isCurrent) {
  //     layerProgress = (scrollProgress - startProgress) / progressPerImage;
  //   } else if (curr) {
  //     layerProgress = 1;
  //   } else {
  //     layerProgress = 0;
  //   }

  //   // Animate transform and opacity
  //   let scale = 1;
  //   let translateZ = 0;
  //   let opacity = 0;
  //   let pointerEvents = "none";

  //   if (curr) {
  //     // Current element animates out as scrolls past
  //     scale = 1 - 0.3 * layerProgress;
  //     translateZ = 200 * (1 - layerProgress); // Starts closer, moves back
  //     opacity = 1 - 0.6*layerProgress;
  //     pointerEvents = "auto";
  //   } else if (next && layerProgress > 0) {
  //     // Next element animates in
  //     scale = 0.7 + 0.3 * layerProgress;
  //     translateZ = -500 + 700 * layerProgress;
  //     opacity = 0.5 + 0.5 * layerProgress;
  //     pointerEvents = "auto";
  //   } else {
  //     // Others stay hidden
  //     scale = 0.7;
  //     translateZ = -500;
  //     opacity = 0;
  //     pointerEvents = "none";
  //   }

  //   return {
  //     transform: `translateZ(${translateZ}px) scale(${scale})`,
  //     opacity,
  //     zIndex: curr ? 2 : next ? 1 : 0,
  //     transition: "transform 0.5s, opacity 0.5s",
  //     display: opacity > 0 ? "block" : "none",
  //     pointerEvents,
  //   };
  // };



  // const getLayerStyle = (index, totalLayers) => {
  //   const startProgress = index / totalLayers;
  //   const endProgress = (index + 1) / totalLayers;

  //   let layerProgress = 0;
  //   if (scrollProgress >= startProgress && scrollProgress <= endProgress) {
  //     layerProgress = (scrollProgress - startProgress) / (endProgress - startProgress);
  //   } else if (scrollProgress > endProgress) {
  //     layerProgress = 1;
  //   }

  //   // Initial translateZ movement (coming forward)
  //   let translateZ = -500 + (layerProgress * 500);
  //   let translateX = 0;
  //   let translateY = 0;

  //   // After image is fully visible (layerProgress = 1), move it to the side
  //   if (layerProgress === 1 && scrollProgress > endProgress) {
  //     const exitProgress = Math.min(1, (scrollProgress - endProgress) / (1 / totalLayers));

  //     //  Alternate between right and left
  //     if (index % 2 === 0) {
  //       // Move to right
  //       translateY = exitProgress * 500;
  //     } else {
  //       // Move to left
  //       translateY = -exitProgress * 800;
  //     }

  //     // Optional: slight rotation for more dynamic effect
  //     translateZ = exitProgress * 200;
  //     translateY = -exitProgress * 100;
  //   }

  //   const scale = layerProgress === 1 && scrollProgress > endProgress ? 0.65 + (layerProgress * 0.35): 0.2;
  //   const opacity = layerProgress === 1 && scrollProgress > endProgress
  //     ? 1 - ((scrollProgress - endProgress) / (1 / totalLayers))
  //     : 1;
  //   const blur = 0;

  //   return {
  //     transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
  //     opacity: opacity,
  //     filter: `blur(${blur}px)`,
  //     zIndex: totalLayers - index,
  //   };
  // };

  const images = [
    {
      title: "Urban Stories",
      subtitle: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      position: "right",
    },
    {
      title: "Nature's Canvas",
      subtitle: "Landscape",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      position: "left",
    },
    {
      title: "Modern Living",
      subtitle: "Interior Design",
      imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
      position: "right",
    },
    {
      title: "Coastal Vibes",
      subtitle: "Seascape",
      imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      position: "left",
    },
    {
      title: "Mountain Peak",
      subtitle: "Adventure",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      position: "right",
    },
    {
      title: "City Lights",
      subtitle: "Urban Photography",
      imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
      position: "left",
    },
    {
      title: "Desert Dreams",
      subtitle: "Exploration",
      imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
      position: "right",
    },
    {
      title: "Forest Path",
      subtitle: "Nature",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      position: "left",
    },
    {
      title: "Arctic Beauty",
      subtitle: "Winter Wonderland",
      imageUrl: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22",
      position: "right",
    },
    {
      title: "Golden Hour",
      subtitle: "Sunset Collection",
      imageUrl: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
      position: "left",
    }
  ];

  const currentImage = images[currentIndex];

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
            className="absolute inset-0 transition-all duration-700"
            style={{
              backgroundImage: `url(${currentImage.imageUrl}?w=1920&h=1080&fit=crop)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px) brightness(0.4)',
            }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="absolute w-full h-full"
                style={getLayerStyle(index, images.length)}
              >
                <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
                  <div className={`w-full flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="flex flex-col items-center max-w-7xl">
                      {/* Title Above Image */}
                      <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 text-center">{image.title}</h2>
                      <div className="flex-shrink-0 mb-0">
                        <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
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

export default ScrollGallery;