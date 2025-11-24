import React, { useRef, useEffect, useState, useMemo } from 'react';

const Testimonials3D = ({ scrollY }) => {
  const galleryRef = useRef(null);
  const [localScrollProgress, setLocalScrollProgress] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc',
      photo: 'https://i.pravatar.cc/150?img=1',
      testimonial: 'Outstanding work! The design exceeded all our expectations and delivered real results.',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovation Labs',
      photo: 'https://i.pravatar.cc/150?img=2',
      testimonial: 'Incredible attention to detail. Every interaction was thoughtfully crafted.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Brand Studio',
      photo: 'https://i.pravatar.cc/150?img=3',
      testimonial: 'A true professional who understands both design and business objectives perfectly.',
    },
    {
      name: 'David Park',
      role: 'Founder',
      company: 'StartupCo',
      photo: 'https://i.pravatar.cc/150?img=4',
      testimonial: 'The best designer we\'ve worked with. Transformed our vision into reality.',
    },
    {
      name: 'Lisa Anderson',
      role: 'Creative Director',
      company: 'Design House',
      photo: 'https://i.pravatar.cc/150?img=5',
      testimonial: 'Exceptional creativity combined with technical excellence. Highly recommended!',
    },
    {
      name: 'James Wilson',
      role: 'CTO',
      company: 'Tech Solutions',
      photo: 'https://i.pravatar.cc/150?img=6',
      testimonial: 'Seamless collaboration and stunning results. Will definitely work together again.',
    },
    {
      name: 'Maria Garcia',
      role: 'Head of Design',
      company: 'Creative Agency',
      photo: 'https://i.pravatar.cc/150?img=7',
      testimonial: 'Brought our brand to life with innovative design thinking and flawless execution.',
    },
    {
      name: 'Robert Taylor',
      role: 'VP Product',
      company: 'SaaS Corp',
      photo: 'https://i.pravatar.cc/150?img=8',
      testimonial: 'Incredible UX expertise. Our user engagement increased by 300% after the redesign.',
    },
    {
      name: 'Jennifer Lee',
      role: 'Founder',
      company: 'E-commerce Plus',
      photo: 'https://i.pravatar.cc/150?img=9',
      testimonial: 'Professional, creative, and always delivers on time. A pleasure to work with!',
    },
    {
      name: 'Thomas Brown',
      role: 'Design Lead',
      company: 'Digital Studio',
      photo: 'https://i.pravatar.cc/150?img=10',
      testimonial: 'Pushes boundaries while maintaining usability. Truly understands modern design.',
    },
    {
      name: 'Amanda White',
      role: 'CEO',
      company: 'Growth Agency',
      photo: 'https://i.pravatar.cc/150?img=11',
      testimonial: 'Transformed our entire digital presence. ROI was evident within weeks.',
    },
    {
      name: 'Kevin Martinez',
      role: 'Product Owner',
      company: 'FinTech Pro',
      photo: 'https://i.pravatar.cc/150?img=12',
      testimonial: 'Detail-oriented and user-focused. Created an experience our users love.',
    },
    {
      name: 'Sophia Davis',
      role: 'Marketing VP',
      company: 'Brand Collective',
      photo: 'https://i.pravatar.cc/150?img=13',
      testimonial: 'Strategic thinking meets beautiful design. Exactly what we needed.',
    },
    {
      name: 'Daniel Kim',
      role: 'Founder',
      company: 'App Ventures',
      photo: 'https://i.pravatar.cc/150?img=14',
      testimonial: 'World-class design work. Elevated our product to compete with industry leaders.',
    },
    {
      name: 'Rachel Green',
      role: 'Director',
      company: 'Digital Works',
      photo: 'https://i.pravatar.cc/150?img=15',
      testimonial: 'Innovative solutions and exceptional communication throughout the entire project.',
    },
  ];

  const randomFactors = useMemo(
    () =>
      testimonials.map(() => ({
        speed: 0.6 + Math.random() * 1.2,
        scaleIntensity: 0.5 + Math.random() * 0.8,
        rotateIntensity: 10 + Math.random() * 10,
        scatter: 1 + Math.random() * 1,
      })),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
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

    const translateX = baseX * (5 + localScrollProgress * scatter);
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
//   const getItemTransform = (index) => {
//     const { speed, rotateIntensity, scatter } = randomFactors[index];
//     const maxScroll = 4000 * speed;
//     const scrollZ = localScrollProgress * maxScroll;

//     const cols = 5;
//     const row = Math.floor(index / cols);
//     const col = index % cols;

//     // Target positions when scattered
//     const targetX = (col - cols / 2) * 20 + Math.sin(index) * 25;
//     const targetY = row * 40 + Math.cos(index * 0.7) * 20;
//     const targetZ = -1800 - index * 150 - Math.sin(index * 0.5) * 300;

//     // Start from center (0, 0) and move to target positions
//     const translateX = targetX * localScrollProgress * 0.9* (5 + localScrollProgress * scatter);
//     const translateY = targetY  * localScrollProgress * 0.9 * (2 + localScrollProgress * scatter);
//     const translateZ = targetZ  + scrollZ - 200;

//     const rotateX = -10 + Math.sin(index * 0.4) * 10 + localScrollProgress * rotateIntensity;
//     const brightness = Math.max(25, 100 - Math.abs(translateZ) / 60);

//     return {
//       transform: `translate(${translateX}%, ${translateY}%) translate3d(0,0,${translateZ}px) rotateX(${rotateX}deg)`,
//       filter: `brightness(${brightness}%)`,
//       transition: 'transform 0.15s ease-out, filter 0.15s ease-out',
//     };
//   };
  const getInnerTransform = (index) => {
    const { scaleIntensity } = randomFactors[index];
    const scale = 1 ;
    return {
      transform: `scale(${scale})`,
      transition: 'transform 0.15s ease-out',
    };
  };

  return (
    <div
      id="testimonials-section"
      ref={galleryRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transprent',
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
          perspective: '2000px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.5rem',
            padding: '0 2rem',
            transformStyle: 'preserve-3d',
            transform: `translate3d(${localScrollProgress * 100}px, ${localScrollProgress * 100}px, ${localScrollProgress * 10}px)`,
            transition: 'transform 0.25s ease-out',
            marginTop: '-25%',
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '1.6',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transformOrigin: 'center',
                borderRadius: '16px',
                ...getItemTransform(index),
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0.25rem',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                  ...getInnerTransform(index),
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minWidth: '70px',
                }}>
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: '2px solid rgba(139, 92, 246, 0.5)',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ 
                    fontSize: '3rem', 
                    color: 'rgba(139, 92, 246, 0.4)',
                    lineHeight: '1',
                    marginTop: '-0.5rem',
                  }}>
                    "
                  </div>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.8rem',
                    lineHeight: '1.5',
                    margin: 0,
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {testimonial.testimonial}
                  </p>
                  
                  <div style={{ 
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      marginBottom: '0.15rem',
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.7rem',
                    }}>
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            color: 'white',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: '300',
            lineHeight: '1.4',
            opacity: 1 - localScrollProgress * 0.7,
            transform: `translateY(${(scrollY || 0) * 0.4}px)`,
            transition: 'opacity 0.3s ease',
            maxWidth: '600px',
            zIndex: 10,
          }}
        >
          What clients say about
          <br />
          <span style={{ color: '#a78bfa' }}>working with me</span>
        </h2>
      </div>
    </div>
  );
};

export default Testimonials3D;