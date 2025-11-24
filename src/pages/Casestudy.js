import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';


// ============================================
// REUSABLE CASE STUDY COMPONENT
// ============================================
const CaseStudy = ({ data }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic gradient based on colors
  const gradientStyle = {
    background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)`,marginTop: '-65px'
  };

  const ScrollIndicator = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full transition-all duration-300"
        style={{ 
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.secondary})`
        }}
      />
    </div>
  );

  const Hero = () => (
    <section 
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
      style={gradientStyle}  
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-6 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-gray-700 ">
            {data.badge}
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight designer">
            {data.title.split(' ')[0]}
             
              {data.title.split(' ').slice(1).join(' ')}
            
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 font-light">
            {data.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {data.meta.map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="opacity-70 uppercase tracking-wider mb-1">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
     
    </section>
  );

  const Overview = () => (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {data.overview.challenge.title}
              </h2>
              <div 
                className="w-16 h-1 mb-6"
                style={{ background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.secondary})` }}
              />
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.overview.challenge.description}
              </p>
            </div>
            
            <div className="relative group">
              <div 
                className="absolute inset-0 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"
                style={gradientStyle}
              />
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <img 
                  src={data.overview.challenge.image}
                  alt="App Interface" 
                  className="w-64 mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.overview.highlights.map((item, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Features = () => {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Key Features
              </h2>
              <div 
                className="w-16 h-1 mx-auto mb-6"
                style={{ background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.secondary})` }}
              />
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive functionalities designed to enhance the customer experience
              </p>
            </div>

            <div className="space-y-32">
              {data.features.map((feature, i) => (
                <div 
                  key={i}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="text-5xl mb-4">{feature.emoji}</div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    {/* <ul className="space-y-3">
                      {feature.details.map((detail, j) => (
                        <li key={j} className="flex items-start">
                          <svg 
                            className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: data.colors.primary }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul> */}
                  </div>

                  <div className={`relative ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="relative group">
                      <div 
                        className="absolute inset-0 rounded-3xl blur-xl opacity-20  transition-opacity"
                        style={gradientStyle}
                      />
                      <div className="relative bg-white p-6 rounded-3xl shadow-xl">
                        <img 
                          src={feature.image}
                          alt={feature.title}
                          className="w-full max-w-sm mx-auto drop-shadow-2xl transform transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Process = () => {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Design Process
              </h2>
              <div 
                className="w-16 h-1 mx-auto mb-6"
                style={{ background: `linear-gradient(to right, ${data.colors.primary}, ${data.colors.secondary})` }}
              />
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A systematic, user-centered approach to creating exceptional experiences
              </p>
            </div>

            <div className="relative">
              <div 
                className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
                style={{ background: `linear-gradient(to bottom, ${data.colors.primary}, ${data.colors.secondary})` }}
              />
              
              <div className="space-y-12">
                {data.process.map((step, i) => (
                  <div key={i} className="relative flex items-start group">
                    <div 
                      className="hidden md:flex absolute left-0 w-16 h-16 rounded-2xl items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform z-10 text-white"
                      style={gradientStyle}
                    >
                      {step.icon}
                    </div>
                    
                    <div className="md:ml-24 w-full">
                      <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start md:hidden mb-4">
                          <div className="text-4xl mr-4">{step.icon}</div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Outcomes = () => (
    <section 
      className="py-24 text-white relative overflow-hidden"
      style={gradientStyle}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Project Outcomes
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6 opacity-50" />
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {data.outcomes.description}
            </p>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.outcomes.highlights.map((item, i) => (
              <div 
                key={i}
                className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            ))}
          </div> */}

          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white border-opacity-20 text-gray-700">
            <p className="text-lg leading-relaxed opacity-95">
              {data.outcomes.conclusion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-white">
      <ScrollIndicator />
      <Hero />
      <Overview />
      <Features />
      <Process />
      <Outcomes />
    </div>
  );
};

export default CaseStudy;