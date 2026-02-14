import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScrollCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const scrollAccumulator = useRef(0);
  const scrollTimeout = useRef(null);

  const items = [
    {
      id: 1,
      name: 'Trivedi Films',
      subtitle: 'Web Development',
      image: '..ux/img/tf.png',
      link: 'www.trivedifilms.com'
    },
    {
      id: 2,
      name: 'SuDrives Pvt. Ltd.',
      subtitle: 'Mobile App UI/UX Design',
      image: '..ux/img/sup.png',
      link: '/'
    },
    {
      id: 3,
      name: 'Seatrans Agencies Pvt. Ltd.',
      subtitle: 'Web Development',
      image: '..ux/img/st.png',
      link: 'www.seatransagencies.com'
    },
    {
      id: 4,
      name: 'PickTailor',
      subtitle: 'Mobile App UI/UX Design',
      image: '..ux/img/Pickta.png',
      link: '/'
    },
    {
      id: 5,
      name: 'Seatech Digital Pvt. Ltd.',
      subtitle: 'Web Development',
      image: '..ux/img/std.png',
      link: 'www.seatechdigital.com'
    },
    {
      id: 6,
      name: 'Shayoag',
      subtitle: 'Mobile App UI/UX Design',
      image: '..ux/img/shayoag.png',
      link: '/'
    },
    {
      id: 7,
      name: 'SuDrives Pvt. Ltd.',
      subtitle: 'UI/UX Design & Website Development',
      image: '..ux/img/sd.png',
      link: '/'
    },
    {
      id: 8,
      name: 'Optimus',
      subtitle: 'ServiceNow App UI/UX Design',
      image: '..ux/img/opti.png',
      link: '/'
    },
    {
      id: 9,
      name: 'SellSpark',
      subtitle: 'UI/UX Design & Web Development',
      image: '..ux/img/sp.png',
      link: 'www.sellspark.in'
    },
    {
      id: 10,
      name: 'SuDrives Pvt. Ltd.',
      subtitle: 'Mobile App UI/UX Design',
      image: '..ux/img/sduser.png',
      link: '/'
    },
    {
      id: 11,
      name: 'Maa Ashram',
      subtitle: 'Mobile App UI/UX Design',
      image: '..ux/img/maa.png',
      link: '/'
    }
  ];

  const totalItems = items.length;

  // Handle wheel scroll with accumulation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Don't accumulate if already scrolling
      if (isScrolling) return;
      
      // Accumulate scroll delta
      scrollAccumulator.current += e.deltaY;
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set new timeout to process scroll
      scrollTimeout.current = setTimeout(() => {
        const threshold = 50; // Adjust sensitivity
        
        if (Math.abs(scrollAccumulator.current) >= threshold) {
          setIsScrolling(true);
          
          if (scrollAccumulator.current > 0) {
            goToNext();
          } else {
            goToPrev();
          }
          
          // Reset accumulator
          scrollAccumulator.current = 0;
          
          // Allow next scroll after animation completes
          setTimeout(() => {
            setIsScrolling(false);
          }, 600); // Match transition duration
        } else {
          // Reset if below threshold
          scrollAccumulator.current = 0;
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isScrolling, currentIndex]);

  const goToNext = () => {
    if (!isDragging && !isScrolling) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const goToPrev = () => {
    if (!isDragging && !isScrolling) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  // Handle mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const distance = e.pageX - startX;
    setDragDistance(distance);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const threshold = 50;
      if (dragDistance > threshold) {
        goToPrev();
      } else if (dragDistance < -threshold) {
        goToNext();
      }
      setDragDistance(0);
      setIsDragging(false);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setDragDistance(0);
      setIsDragging(false);
    }
  };

  // Handle touch drag
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX);
    setDragDistance(0);
  };

  const handleTouchMove = (e) => {
    const distance = e.touches[0].pageX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (dragDistance > threshold) {
      goToPrev();
    } else if (dragDistance < -threshold) {
      goToNext();
    }
    setDragDistance(0);
  };

  const handleImageClick = (link) => {
    if (Math.abs(dragDistance) < 10) {
      console.log(`Navigating to: ${link}`);
      alert(`Would navigate to: ${link}`);
    }
  };

  const getItemStyle = (index) => {
    // Calculate position relative to current index
    let position = index - currentIndex;
    
    // Handle wraparound for circular behavior
    if (position > totalItems / 2) {
      position -= totalItems;
    } else if (position < -totalItems / 2) {
      position += totalItems;
    }
    
    const absPosition = Math.abs(position);
    
    // Calculate scale and opacity based on position
    let scale = 1;
    let opacity = 1;
    let zIndex = 100;
    let translatePercent = position * 80;
    
    if (absPosition === 0) {
      // Center item
      scale = 1;
      opacity = 1;
      zIndex = 100;
    } else if (absPosition === 1) {
      // Adjacent items (±1)
      scale = 0.49;
      opacity = 0.49;
      zIndex = 49;
    } else if (absPosition === 2) {
      // Second level (±2)
      scale = 0.16;
      opacity = 0.16;
      zIndex = 16;
    } else {
      // Far items
      scale = 0.01;
      opacity = 0.01;
      zIndex = 1;
      // Move far items way off screen
      if (position > 0) {
        translatePercent = 360;
      } else {
        translatePercent = -360;
      }
    }
    
    // Add drag offset
    if (isDragging && dragDistance !== 0) {
      translatePercent += (dragDistance / window.innerWidth) * 100;
    }
    
    return {
      transform: `translate3d(${translatePercent}%, 0px, 0px) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      touchAction: 'pan-y',
      translate: 'none',
      rotate: 'none',
      scale: 'none',
    };
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Works List Wrapper */}
      <div 
        className="fixed left-0 w-full flex items-center justify-center"
        style={{
          top: 0,
          height: '100vh',
          padding: '0',
          boxSizing: 'border-box',
        }}
        data-aos="fade-up"
      >
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className={`relative w-full h-full flex items-center justify-center ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            perspective: '1000px',
            touchAction: 'pan-y',
            userSelect: 'none'
          }}
        >
          {/* Items Grid Container */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ 
            display: 'grid',
            placeItems: 'center',
            height: '100%'
          }}>
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemsRef.current[index] = el}
                className="group"
                style={{
                  ...getItemStyle(index),
                  position: 'absolute',
                  gridColumn: 1,
                  gridRow: 1,
                  display: 'grid',
                  gridTemplateRows: 'auto 50vh auto',
                  gridTemplateColumns: 'minmax(30ch, 1fr)',
                  placeItems: 'center',
                  textAlign: 'center',
                  aspectRatio: '1 / 1.2',
                  height: '90%',
                  gap: '1rem',
                }}
                onClick={() => handleImageClick(item.link)}
              >
                {/* Text Above Image */}
                <div className="text-center">
                  <h2 className="text-purple-400 text-4xl font-serif mt-10 designer">
                    {item.name}
                  </h2>
                  {/* <p className="text-amber-700 text-sm tracking-widest uppercase">
                    {item.subtitle}
                  </p> */}
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full flex items-center justify-center shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-cover pointer-events-none select-none"
                    draggable="false"
                    style={{ touchAction: 'pan-y' }}
                  />
                </div>

                {/* Publication Name */}
                <div className="text-center">
                  <p className="text-purple-600 text-sm tracking-widest uppercase">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        disabled={isScrolling}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        disabled={isScrolling}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      {/* Instruction Text */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-purple-700 text-sm z-50 bg-purple-100/80 px-4 py-2 rounded-full backdrop-blur-sm">
        Scroll up/down or drag to navigate • {currentIndex + 1} / {totalItems}
      </div>
    </div>
  );
};

export default ScrollCarousel;