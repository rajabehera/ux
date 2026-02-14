import React, { useEffect, useRef, useState } from 'react';
import Contact from './Contact';
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
        const scrollAmount = progress  * (scrollWidth);
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const developmentSkills = [
    { number: '01', name: 'HTML', level: 95, color: 'from-orange-500 to-red-500', accent: '#ff6b35' },
    { number: '02', name: 'CSS', level: 90, color: 'from-blue-500 to-cyan-500', accent: '#3b82f6' },
    { number: '03', name: 'JavaScript', level: 75, color: 'from-yellow-500 to-orange-500', accent: '#fbbf24' },
    { number: '04', name: 'React JS', level: 75, color: 'from-cyan-500 to-blue-500', accent: '#06b6d4' },
    { number: '05', name: 'Next JS', level: 65, color: 'from-purple-500 to-pink-500', accent: '#a855f7' },
    { number: '07', name: 'Node JS', level: 70, color: 'from-green-500 to-teal-500', accent: '#48ec87ff' },
    { number: '08', name: 'Express JS', level: 70, color: 'from-indigo-500 to-purple-500', accent: '#6366f1' },
    { number: '09', name: 'SQL', level: 65, color: 'from-red-500 to-pink-500', accent: '#ef4444' },
    { number: '10', name: 'WordPress', level: 90, color: 'from-blue-600 to-indigo-600', accent: '#2563eb' },
  ];

  const designSkills = [
    { number: '01', name: 'Figma', level: 85, color: 'from-pink-500 to-rose-500', accent: '#ec4899' },
    { number: '02', name: 'UI Design', level: 90, color: 'from-fuchsia-500 to-pink-500', accent: '#d946ef' },
    { number: '03', name: 'UX Research', level: 80, color: 'from-violet-500 to-purple-500', accent: '#8b5cf6' },
    { number: '04', name: 'Design Thinking', level: 85, color: 'from-indigo-500 to-blue-500', accent: '#435abfff' },
    { number: '05', name: 'Prototyping', level: 85, color: 'from-teal-500 to-emerald-500', accent: '#14b8a6' },
    { number: '06', name: 'User Testing', level: 75, color: 'from-green-500 to-teal-500', accent: '#22c55e' },
    { number: '07', name: 'Canva', level: 85, color: 'from-cyan-500 to-blue-500', accent: '#06b6d4' },
    { number: '08', name: 'Photoshop', level: 55, color: 'from-blue-500 to-indigo-500', accent: '#3b82f6' },
    { number: '09', name: 'Illustrator', level: 75, color: 'from-orange-500 to-yellow-500', accent: '#f97316' },
    { number: '10', name: 'Information Architecture', level: 80, color: 'from-rose-500 to-pink-500', accent: '#f43f5e' },
    { number: '11', name: 'Interaction Design', level: 85, color: 'from-pink-500 to-fuchsia-500', accent: '#ec4899' },
    { number: '12', name: 'Visual Design', level: 90, color: 'from-purple-500 to-violet-500', accent: '#a855f7' },
    { number: '13', name: 'Design Systems', level: 80, color: 'from-indigo-500 to-purple-500', accent: '#6366f1' },
  ];

  const allSkills = [...developmentSkills, ...designSkills];

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20" />

        <div className="relative h-full flex items-center">
          <div ref={scrollContainerRef} className="flex gap-0 transition-transform duration-100">
            
            {/* Development Section Header */}
            <div 
              className="flex-shrink-0 flex items-center justify-center relative"
              style={{ width: '100vw', height: '100vh' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-blue-900/30" />
              <div className="text-center z-10 px-8">
                <div className="inline-block mb-6">
                  <div className="text-cyan-400 text-sm uppercase tracking-widest mb-2">Code • Build • Deploy</div>
                  <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
                </div>
                <h2 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 designer">
                  DEVELOPMENT
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                  Building robust, scalable web applications with modern technologies
                </p>
                <div className="mt-12 text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                  Scroll to explore →
                </div>
              </div>
            </div>

            {/* Development Skills Cards */}
            {developmentSkills.map((skill, index) => (
              <div 
                key={`dev-${index}`}
                className="flex-shrink-0 relative group flex items-center justify-center"
                style={{ width: '500px', height: '100vh',
                              opacity: `${(scrollProgress) * (allSkills.length + 2) > index ? 1 : 0}`, transition: 'opacity 0.5s ease-in-out' }}
              >
                <div className="relative" style={{ width: '400px', height: '500px' }}>
                  {/* Card border */}
                  <div 
                    className="absolute inset-0 border-2 border-gray-600/50 group-hover:border-opacity-100 transition-all duration-500 bg-gradient-to-br from-cyan-900/5 to-blue-900/5"
                    style={{
                      borderColor: scrollProgress * (allSkills.length + 2) > index ? skill.accent : 'rgba(156, 163, 175, 0.5)'
                    }}
                  >
                    {/* Corner accent */}
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

                    {/* Code-like decoration */}
                    <div className="absolute top-8 right-8 opacity-20">
                      <div className="text-cyan-400 font-mono text-xs">{'</>'}</div>
                    </div>

                    {/* Diagonal lines */}
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
                      <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 opacity-70">Development</div>
                      <h3 
                        className="text-5xl font-bold mb-4 uppercase tracking-wide text-white"
                        style={{ letterSpacing: '0.05em' }}
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
                              width: `${(scrollProgress - 0.009) * (allSkills.length + 2) > index ? skill.level : 0}%`,
                              boxShadow: `0 0 20px ${skill.accent}80`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                      style={{ 
                        background: `radial-gradient(circle at center, ${skill.accent}, transparent 70%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Design Section Header */}
            <div 
              className="flex-shrink-0 flex items-center justify-center relative"
              style={{ width: '100vw', height: '100vh' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 to-purple-900/30" />
              <div className="text-center z-10 px-8">
                <div className="inline-block mb-6">
                  <div className="text-pink-400 text-sm uppercase tracking-widest mb-2">Create • Design • Inspire</div>
                  <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
                </div>
                <h2 className="text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6 designer">
                  DESIGN
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                  Crafting beautiful, user-centered experiences with creativity and precision
                </p>
                <div className="mt-12 text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                  Scroll to explore →
                </div>
              </div>
            </div>

            {/* Design Skills Cards */}
            {designSkills.map((skill, index) => (
              <div 
                key={`design-${index}`}
                className="flex-shrink-0 relative group flex items-center justify-center"
                style={{ width: '500px', height: '100vh' }}
              >
                <div className="relative" style={{ width: '400px', height: '500px' }}>
                  {/* Card border */}
                  <div 
                    className="absolute inset-0 border-2 border-gray-600/50 group-hover:border-opacity-100 transition-all duration-500 bg-gradient-to-br from-pink-900/5 to-purple-900/5"
                    style={{
                      borderColor: scrollProgress * (allSkills.length + 2) > (developmentSkills.length + 1 + index) ? skill.accent : 'rgba(156, 163, 175, 0.5)'
                    }}
                  >
                    {/* Corner accent */}
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

                    {/* Design-like decoration */}
                    <div className="absolute top-8 right-8 opacity-20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={skill.accent} strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>

                    {/* Diagonal lines */}
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
                      <div className="text-pink-400 text-xs uppercase tracking-widest mb-2 opacity-70">Design</div>
                      <h3 
                        className="text-5xl font-bold mb-4 uppercase tracking-wide text-white"
                        style={{ letterSpacing: '0.05em' }}
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
                              width: `${(scrollProgress - 0.009) * (allSkills.length + 2) > (developmentSkills.length + 1 + index) ? skill.level : 0}%`,
                              boxShadow: `0 0 20px ${skill.accent}80`
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                      style={{ 
                        background: `radial-gradient(circle at center, ${skill.accent}, transparent 70%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
            <div 
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '100vw', height: '100vh' }}
            >
              <div className="text-center px-8">
                <h3 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 font-serif designer">
                  LET'S CREATE
                </h3>
                <p className="text-gray-400 text-2xl mb-8">Something Amazing Together</p>
                <div className="flex gap-4 justify-center">
                  <div className="px-6 py-3 border border-cyan-400/50 text-cyan-400 text-sm uppercase tracking-widest hover:bg-cyan-400/10 transition-colors">
                    View Projects
                  </div>
                  <div className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Get In Touch
                  </div>
                </div>
              </div>
            </div>
  
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;