import React, { useEffect, useRef, useState, useMemo } from 'react';

const Gallery3D = () => {
  const gridWrapRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sample images
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

  // Generate random motion factors per image (once)
  const randomFactors = useMemo(
    () =>
      images.map(() => ({
        speed: 0.6 + Math.random() * 1.2, // individual scroll speed
        scaleIntensity: 0.5 + Math.random() * 0.8,
        rotateIntensity: 10 + Math.random() * 20,
        scatter: 1 + Math.random() * 2,
      })),
    [images.length]
  );

  // Smooth scroll listener
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const progress = scrollTop / (scrollHeight - clientHeight);
        setScrollProgress(progress);
      }
    };

    const loop = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    const container = scrollContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Randomized per-item transform
  const getItemTransform = (index) => {
    const { speed, rotateIntensity, scatter } = randomFactors[index];
    const maxScroll = 4000 * speed;
    const scrollZ = scrollProgress * maxScroll;

    const cols = 8;
    const row = Math.floor(index / cols);
    const col = index % cols;

    const baseX = (col - cols / 2) * 15 + Math.sin(index) * 25;
    const baseY = row * 30 + Math.cos(index * 0.7) * 20;
    const baseZ = -1800 - index * 150 - Math.sin(index * 0.5) * 300;

    const translateX = baseX * (1 + scrollProgress * scatter);
    const translateY = baseY * (1 + scrollProgress * scatter);
    const translateZ = baseZ + scrollZ;

    const rotateX = -10 + Math.sin(index * 0.4) * 10 + scrollProgress * rotateIntensity;
    const brightness = Math.max(25, 100 - Math.abs(translateZ) / 60);

    return {
      transform: `translate(${translateX}%, ${translateY}%) translate3d(0,0,${translateZ}px) rotateX(${rotateX}deg)`,
      filter: `brightness(${brightness}%)`,
      transition: 'transform 0.15s ease-out, filter 0.15s ease-out',
    };
  };

  // Smooth per-item scaling
  const getInnerTransform = (index) => {
    const { scaleIntensity } = randomFactors[index];
    const scale = 0.8 + scrollProgress * scaleIntensity;
    return {
      transform: `scale(${scale})`,
      transition: 'transform 0.15s ease-out',
    };
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        background: 'transparent',
        position: 'relative',
      }}
    >
      <div style={{ height: '200vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '70vh',
            display: 'grid',
            placeItems: 'center',
            perspective: '1500px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={gridWrapRef}
            style={{
              width: '105%',
              height: '80%',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '1rem',
              transformStyle: 'preserve-3d',
              transform: `translate3d(${scrollProgress * 300}px, ${-scrollProgress * 300}px, ${scrollProgress * 1800}px)`,
              transition: 'transform 0.25s ease-out',
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  aspectRatio: '0.75',
                  width: '80%',
                  display: 'grid',
                  placeItems: 'center',
                  overflow: 'hidden',
                  transformOrigin: 'center',
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
              bottom: '35%',
              left: '10%',
              color: 'white',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '300',
              lineHeight: '1.3',
              opacity: 1 - scrollProgress,
              transition: 'opacity 0.3s ease',
              maxWidth: '400px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            I don't shoot what it looks like, I shoot what it feels like.
          </h2>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '13px',
          fontFamily: 'monospace',
          pointerEvents: 'none',
        }}
      >
        Scroll: {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
};

export default Gallery3D;
