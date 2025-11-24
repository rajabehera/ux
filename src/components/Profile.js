import React, { useState, useEffect, useRef } from 'react';

const ScrollRevealSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScrollProgress, setMaxScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const expertise = [
    "UI/UX Design",
    "Web Development",
    "Responsive Design",
    "Prototyping",
    "User Research",
    "Wireframing",
    "React",
    "Figma"
  ];

  const paragraphs = [
    "As a passionate UI/UX Designer and Web Developer with over 7+ years of experience, I blend creativity and technical expertise to deliver intuitive and engaging user experiences.",
    "With a solid foundation in design principles and front-end development, I create seamless interfaces that enhance user satisfaction and drive business success.",
    "Whether designing wireframes, crafting responsive layouts, or developing interactive prototypes, I am dedicated to transforming ideas into impactful digital solutions."
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on section position
      // Start revealing when section enters viewport, complete when it's centered
      const sectionMiddle = rect.top + rect.height / 2;
      const viewportMiddle = windowHeight / 2;
      
      // Progress from 0 to 1 as section scrolls from bottom to center of viewport
      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate based on how much of the section is visible and centered
        const distanceFromCenter = Math.abs(sectionMiddle - viewportMiddle);
        const maxDistance = windowHeight;
        progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / maxDistance)));
      }
      
      setScrollProgress(progress);
      setMaxScrollProgress(prev => Math.max(prev, progress));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const RevealText = ({ text, baseDelay = 0 }) => {
    const chars = text.split('');
    const totalChars = chars.length;
    
    return (
      <span className="inline">
        {chars.map((char, index) => {
          const charProgress = (maxScrollProgress * totalChars - index - baseDelay) / 2;
          const opacity = Math.max(0, Math.min(1, charProgress));
          
          return (
            <span
              key={index}
              style={{
                opacity,
                color: opacity < 0.5 ? '#6b7280' : '',
                transition: 'opacity 0.1s ease-out, color 0.2s ease-out'
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <section ref={sectionRef} className="py-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div 
              style={{
                opacity: scrollProgress,
                transform: `translateX(${-50 + scrollProgress * 50}px)`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl" />
                <div className="relative w-full aspect-square border-4 border-purple-500/50 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                  <div className="absolute inset-0 flex items-center justify-center text-9xl">
                    👨‍💻
                  </div>
                </div>
                {/* Decorative elements */}
                <div 
                  className="absolute -top-6 -right-6 w-32 h-32 border-2 border-pink-500/30"
                  style={{
                    opacity: scrollProgress,
                    transform: `rotate(${scrollProgress * 45}deg)`
                  }}
                />
                <div 
                  className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-cyan-500/30"
                  style={{
                    opacity: scrollProgress,
                    transform: `rotate(${-scrollProgress * 45}deg)`
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef}>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  <RevealText text="Sr. UI/UX Designer & Web Developer" />
                </h2>
                <div 
                  className="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6"
                  style={{
                    width: `${scrollProgress * 96}px`,
                    transition: 'width 0.3s ease-out'
                  }}
                />
              </div>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  <RevealText text={paragraphs.join(' ')} />
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="mt-8">
                <h3 
                  className="text-xl font-semibold text-white mb-4"
                  style={{
                    opacity: maxScrollProgress,
                    transition: 'opacity 0.3s ease-out'
                  }}
                >
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {expertise.map((skill, index) => {
                    const tagProgress = Math.max(0, Math.min(1, (maxScrollProgress - 0.6) * 2.5));
                    const delay = index * 0.05;
                    const individualProgress = Math.max(0, Math.min(1, tagProgress - delay));
                    
                    return (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/20 transition-colors cursor-pointer"
                        style={{
                          opacity: individualProgress,
                          transform: `translateY(${20 - individualProgress * 20}px) scale(${0.8 + individualProgress * 0.2})`,
                          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollRevealSection;