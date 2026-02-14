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
  const lenisRef = useRef(null);
  const scrollAccumulator = useRef(0);

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

  // Initialize Lenis
  useEffect(() => {
    // Lenis smooth scroll class
    class Lenis {
      constructor(options = {}) {
        this.wrapper = options.wrapper || window;
        this.content = options.content || document.documentElement;
        this.wheelMultiplier = options.wheelMultiplier || 1;
        this.smoothWheel = options.smoothWheel !== false;
        this.scrolling = false;
        this.direction = 0;
        this.velocity = 0;
        this.callbacks = [];
        
        this.onWheel = this.onWheel.bind(this);
        this.raf = this.raf.bind(this);
        
        this.addEvents();
        this.animate();
      }
      
      on(callback) {
        this.callbacks.push(callback);
      }
      
      addEvents() {
        if (this.wrapper === window) {
          window.addEventListener('wheel', this.onWheel, { passive: false });
        } else {
          this.wrapper.addEventListener('wheel', this.onWheel, { passive: false });
        }
      }
      
      onWheel(e) {
        e.preventDefault();
        const delta = e.deltaY;
        this.direction = Math.sign(delta);
        this.velocity = delta * this.wheelMultiplier;
        this.scrolling = true;
        
        this.callbacks.forEach(cb => cb({
          scroll: 0,
          limit: 0,
          velocity: this.velocity,
          direction: this.direction,
          progress: 0
        }));
      }
      
      animate() {
        this.raf();
      }
      
      raf() {
        if (this.velocity !== 0) {
          this.velocity *= 0.8;
          if (Math.abs(this.velocity) < 0.1) {
            this.velocity = 0;
            this.scrolling = false;
          }
        }
        requestAnimationFrame(this.raf);
      }
      
      destroy() {
        if (this.wrapper === window) {
          window.removeEventListener('wheel', this.onWheel);
        } else {
          this.wrapper.removeEventListener('wheel', this.onWheel);
        }
      }
    }

    lenisRef.current = new Lenis({
      wrapper: containerRef.current,
      smoothWheel: true,
      wheelMultiplier: 1
    });

    let scrollTimeout;
    
    lenisRef.current.on((e) => {
      if (isScrolling) return;
      
      scrollAccumulator.current += e.velocity;
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const threshold = 30;
        
        if (Math.abs(scrollAccumulator.current) >= threshold) {
          setIsScrolling(true);
          
          if (scrollAccumulator.current > 0) {
            goToNext();
          } else {
            goToPrev();
          }
          
          scrollAccumulator.current = 0;
          
          setTimeout(() => {
            setIsScrolling(false);
          }, 600);
        } else {
          scrollAccumulator.current = 0;
        }
      }, 50);
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      clearTimeout(scrollTimeout);
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
    }
  };

  const getItemStyle = (index) => {
    let position = index - currentIndex;
    
    if (position > totalItems / 2) {
      position -= totalItems;
    } else if (position < -totalItems / 2) {
      position += totalItems;
    }
    
    const absPosition = Math.abs(position);
    
    let scale = 1;
    let opacity = 1;
    let zIndex = 100;
    let translatePercent = position * 80;
    
    if (absPosition === 0) {
      scale = 1;
      opacity = 1;
      zIndex = 100;
    } else if (absPosition === 1) {
      scale = 0.49;
      opacity = 0.49;
      zIndex = 49;
    } else if (absPosition === 2) {
      scale = 0.16;
      opacity = 0.16;
      zIndex = 16;
    } else {
      scale = 0.01;
      opacity = 0.01;
      zIndex = 1;
      if (position > 0) {
        translatePercent = 360;
      } else {
        translatePercent = -360;
      }
    }
    
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
      <div 
        className="fixed left-0 w-full flex items-center justify-center"
        style={{
          top: 0,
          height: '100vh',
          padding: '0',
          boxSizing: 'border-box',
        }}
      >
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
          <div className="absolute inset-0 flex items-center justify-center" style={{ 
            display: 'grid',
            placeItems: 'center',
            height: '100%'
          }} data-aos="fade-up">
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
                <div className="text-center">
                  <h2 className="text-purple-500 text-4xl font-serif mt-10">
                    {item.name}
                  </h2>
                </div>

                <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full flex items-center justify-center shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-cover pointer-events-none select-none"
                    draggable="false"
                    style={{ touchAction: 'pan-y' }}
                  />
                </div>

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

      <button
        onClick={goToPrev}
        disabled={isScrolling}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        disabled={isScrolling}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      {/* <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-purple-200 text-sm z-50 bg-purple-900/60 px-4 py-2 rounded-full backdrop-blur-sm">
        Scroll up/down or drag to navigate • {currentIndex + 1} / {totalItems}
      </div> */}
    </div>
  );
};

export default ScrollCarousel;