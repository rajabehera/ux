import React, { useState } from 'react';
import { Building2, Folder, User, Star, Layers2, Building } from 'lucide-react';
const OrbitalCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const experiences = [
    { 
      years: "7+", 
      label: "Years Experience",
      gradient: "from-purple-500 to-pink-500",
      orbitalItems: [
        { type: "company", name: "Activegraphy Value Design", angle: 180 },
        { type: "company", name: "SuDrives Pvt. Ltd.", angle: 45 },
      ]
    },
    { 
      years: "20+", 
      label: "Projects Completed",
      gradient: "from-cyan-500 to-blue-500",
      orbitalItems: [
        { type: "project", name: "Inventrory Management System", angle: 140 },
        { type: "project", name: "SaaS Platform", angle: 35 },
        { type: "project", name: "Mobile App Design", angle: 200 },
        { type: "project", name: "Website Development", angle: 315 }
      ]
    },
    { 
      years: "10+", 
      label: "Happy Clients",
      gradient: "from-orange-500 to-red-500",
      orbitalItems: [
        { type: "client", name: "Devendra Trivedi", angle: 30 },
        { type: "client", name: "GS Rawat", angle: 120 },
        { type: "client", name: "Sonu Kumar", angle: 210 },
        { type: "client", name: "Ansshu Garg", angle: 300 }
      ]
    },
    { 
      years: "100%", 
      label: "Client Satisfaction",
      gradient: "from-green-500 to-teal-500",
      orbitalItems: [
        { type: "ccompany", name: "SellSpark", angle: 60 },
        { type: "ccompany", name: "TrivediFilms", angle: 150 },
        { type: "ccompany", name: "Seatrans Agencies Pvt. Ltd.", angle: 240 },
        { type: "ccompany", name: "Shayoag", angle: 340 }
      ]
    }
  ];


const getIconForType = (type) => {
  switch(type) {
    case 'company':
      return Building2;
    case 'project':
      return Layers2;
    case 'client':
      return User;
    case 'ccompany':
      return Building;
    default:
      return Star;
  }
};
  const calculatePosition = (angle, radius = 100) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };
function TypeIcon({ type, className = "w-5 h-5" }) {
  const Icon = getIconForType(type);
  return <Icon className={className} />;
}
  return (
   
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" data-aos="fade-up">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Main Card */}
              <div className="bg-gray-900/50 border-2 border-gray-700/50 p-8 text-center transition-all duration-300 group-hover:border-gray-600 group-hover:bg-gray-900/70 relative z-10">
                <div 
                  className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-3`}
                >
                  {exp.years}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {exp.label}
                </div>
              </div>

              {/* Glow Effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 z-0`}
              />

              {/* Orbital Items Container */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="relative w-full h-full flex items-center justify-center">
                  {exp.orbitalItems.map((item, itemIndex) => {
                    const position = calculatePosition(item.angle);
                    const isHovered = hoveredCard === index;
                    
                    return (
                      <div
                        key={itemIndex}
                        className="absolute transition-all duration-700 ease-out"
                        style={{
                          transform: isHovered 
                            ? `translate(${position.x}px, ${position.y}px) scale(1)` 
                            : 'translate(0, 0) scale(0)',
                          opacity: isHovered ? 1 : 0,
                          transitionDelay: `${itemIndex * 100}ms`
                        }}
                      >
                        <div className={`bg-gradient-to-r ${exp.gradient} p-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 min-w-max`}>
                          <div className="flex items-center gap-2 text-white text-xs whitespace-nowrap">
                            <span className="text-base"><TypeIcon type={item.type} className="w-6 h-6" /></span>
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </div>
                        
                        {/* Connection Line */}
                        <svg 
                          className="absolute top-1/2 left-1/2 pointer-events-none"
                          style={{
                            width: Math.abs(position.x) + 20,
                            height: Math.abs(position.y) + 20,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <line
                            x1="50%"
                            y1="50%"
                            x2={position.x > 0 ? '0%' : '100%'}
                            y2={position.y > 0 ? '0%' : '100%'}
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            className={`text-${exp.gradient.split('-')[1]}-500/30`}
                            opacity="0.3"
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

  );
};

export default OrbitalCard;