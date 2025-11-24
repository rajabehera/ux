import React, { useEffect, useRef, useState } from 'react';

const SkillsSection = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollContainerRef.current) return;
      
      const container = containerRef.current;
      const scrollContainer = scrollContainerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;
      
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const progress = -rect.top / (rect.height - window.innerHeight);
        const scrollAmount = progress * scrollWidth;
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    { number: '01', name: 'HTML', level: 95, color: 'from-orange-500 to-red-500', accent: '#ff6b35' },
    { number: '02', name: 'CSS', level: 90, color: 'from-blue-500 to-cyan-500', accent: '#3b82f6' },
    { number: '03', name: 'JavaScript', level: 75, color: 'from-yellow-500 to-orange-500', accent: '#fbbf24' },
    { number: '04', name: 'React JS', level: 75, color: 'from-cyan-500 to-blue-500', accent: '#06b6d4' },
    { number: '05', name: 'SQL', level: 65, color: 'from-purple-500 to-pink-500', accent: '#a855f7' },
    { number: '06', name: 'Figma/Adobe XD', level: 85, color: 'from-pink-500 to-rose-500', accent: '#ec4899' },
    { number: '07', name: 'PHP', level: 75, color: 'from-indigo-500 to-purple-500', accent: '#6366f1' },
    { number: '08', name: 'Laravel', level: 75, color: 'from-red-500 to-pink-500', accent: '#ef4444' },
    { number: '09', name: 'WordPress/CMS', level: 90, color: 'from-blue-600 to-indigo-600', accent: '#2563eb' },
    { number: '10', name: 'Canva', level: 85, color: 'from-cyan-500 to-teal-500', accent: '#14b8a6' },
    { number: '11', name: 'Photoshop', level: 55, color: 'from-blue-500 to-purple-500', accent: '#3b82f6' },
    { number: '12', name: 'Illustrator', level: 75, color: 'from-orange-500 to-yellow-500', accent: '#f97316' },
  ];

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20" />
        
        {/* Animated stars background */}
        {/* <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-pink-300 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div> */}

        <div className="relative h-full flex items-center">
            <h3 className="text-6xl font-bold text-white absolute top-0 left-0 m-10 font-serif">
                  SKILLS
                </h3>
          <div ref={scrollContainerRef} className="flex gap-20 px-120 transition-transform duration-100 mt-20">
            
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="flex-shrink-0 relative group"
                style={{ width: '400px', height: '500px' }}
              >
                {/* Card border */}
                <div 
                  className="absolute inset-0 border-2 border-gray-600/50 group-hover:border-opacity-100 transition-all duration-500"
                  style={{
                    borderColor: scrollProgress * skills.length > index ? skill.accent : 'rgba(156, 163, 175, 0.5)'
                  }}
                >
                  {/* Corner accent circle */}
                  <div 
                    className="absolute top-8 left-8 w-16 h-16 rounded-full border-2 opacity-30"
                    style={{ borderColor: skill.accent }}
                  />

                  {/* Number */}
                  <div 
                    className="absolute top-8 left-8 text-8xl font-bold opacity-90"
                    style={{ 
                      color: skill.accent,
                      textShadow: `0 0 40px ${skill.accent}80`
                    }}
                  >
                    {skill.number}
                  </div>

                  {/* Diagonal accent lines */}
                  <div className="absolute bottom-32 right-16 w-32 space-y-3 opacity-40">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-1 rounded-full transform rotate-45"
                        style={{ 
                          width: `${100 - i * 15}%`,
                          background: `linear-gradient(to right, ${skill.accent}, transparent)`,
                          marginLeft: `${i * 10}px`
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-16 left-8 right-8">
                    <h3 
                      className="text-5xl font-bold mb-4 uppercase tracking-wide"
                      style={{ 
                        color: '#ffffff',
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {skill.name}
                    </h3>
                    
                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm uppercase tracking-widest">PROFICIENCY</span>
                        <span 
                          className="text-3xl font-bold"
                          style={{ color: skill.accent }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                          style={{
                            width: `${(scrollProgress + 0.09) * skills.length > index ? skill.level : 0}%`,
                            boxShadow: `0 0 20px ${skill.accent}80`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                    style={{ 
                      background: `radial-gradient(circle at center, ${skill.accent}, transparent 70%)`
                    }}
                  />
                </div>
              </div>
            ))}

            {/* End card */}
            <div 
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '50vw', height: '500px' }}
            >
              <div className="text-center">
                <h3 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  LET'S CREATE
                </h3>
                <p className="text-gray-400 text-xl">Together</p>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {skills.map((_, i) => (
              <div 
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: scrollProgress * skills.length > i ? '32px' : '16px',
                  backgroundColor: scrollProgress * skills.length > i 
                    ? skills[i].accent
                    : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SkillsSection;