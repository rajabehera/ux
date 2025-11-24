import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StackedWorkGrid.css";

gsap.registerPlugin(ScrollTrigger);

const StackedWorkGrid = ({ works }) => {
  const containerRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const mainImages = containerRef.current.querySelectorAll(".main__image .gridd__item-inner");
    const fadedImages = containerRef.current.querySelectorAll(".faded__image .gridd__item-inner");

    // Animate main images
    mainImages.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          scale: 0.75,
          opacity: 0,
          z: -180,
          rotateY: i % 2 === 0 ? -12 : 12,
          rotateZ: i % 2 === 0 ? -5 : 5
        },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          rotateY: 0,
          rotateZ: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 15%",
            scrub: 1.2,
            onUpdate: () => {
              const z = gsap.getProperty(item, "z");
              const scale = gsap.getProperty(item, "scale");
              const rotateY = gsap.getProperty(item, "rotateY");
              const rotateZ = gsap.getProperty(item, "rotateZ");
              item.style.transform = `translateZ(${z}px) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
            }
          }
        }
      );
    });

    // Animate faded background images with parallax
    fadedImages.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          scale: 0.85,
          opacity: 0,
          z: -280,
          rotateY: i % 2 === 0 ? 8 : -8,
          y: 30
        },
        {
          scale: 1,
          opacity: 0.4,
          z: -50,
          rotateY: 0,
          y: -20,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            end: "bottom 12%",
            scrub: 1.5,
            onUpdate: () => {
              const z = gsap.getProperty(item, "z");
              const scale = gsap.getProperty(item, "scale");
              const rotateY = gsap.getProperty(item, "rotateY");
              const y = gsap.getProperty(item, "y");
              item.style.transform = `translateY(${y}px) translateZ(${z}px) scale(${scale}) rotateY(${rotateY}deg)`;
            }
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Generate rows - alternating left/right positioning
  const rows = works.map((work, idx) => ({
    work,
    isLeftAligned: idx % 2 === 0,
    isBig: idx % 3 === 0
  }));

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto mb-16">
        <blockquote className="text-center">
          <p className="text-3xl md:text-5xl font-light text-slate-800 italic leading-relaxed">
            "I don't shoot what it looks like,
            <br />
            <span className="font-semibold">I shoot what it feels like."</span>
          </p>
        </blockquote>
      </div>

      <div className="space-y-24 md:space-y-32" ref={containerRef}>
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="relative flex justify-center items-center min-h-[500px]"
          >
            {/* Stack container */}
            <div className={`relative ${row.isLeftAligned ? 'mr-auto ml-12' : 'ml-auto mr-12'} md:mx-auto`}>
              {/* Faded background image */}
              <div
                className={`faded__image absolute ${
                  row.isLeftAligned ? 'left-[-30px]' : 'right-[-30px]'
                } ${row.isBig ? 'w-[340px] h-[420px]' : 'w-[280px] h-[350px]'}`}
                style={{ perspective: '1200px' }}
              >
                <div
                  className="gridd__item-inner w-full h-full rounded-2xl bg-cover bg-center shadow-2xl"
                  style={{
                    backgroundImage: `url(${row.work.image})`,
                    filter: 'brightness(0.7) blur(1px)'
                  }}
                />
              </div>

              {/* Main foreground image */}
              <div
                className={`main__image relative z-10 ${
                  row.isBig ? 'w-[380px] h-[480px]' : 'w-[320px] h-[400px]'
                }`}
                style={{ perspective: '1200px' }}
              >
                <div
                  className="gridd__item-inner w-full h-full rounded-2xl bg-cover bg-center shadow-2xl flex items-end overflow-hidden"
                  style={{ backgroundImage: `url(${row.work.image})` }}
                >
                  {row.work.title && (
                    <div className="w-full bg-white/90 backdrop-blur-sm px-6 py-4">
                      <h3 className="text-slate-800 font-bold text-lg">
                        {row.work.title}
                      </h3>
                      {row.work.category && (
                        <p className="text-slate-600 text-sm mt-1">
                          {row.work.category}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Demo Component
export default function App() {
  const demoWorks = [
    {
      title: "Urban Stories",
      category: "Editorial",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=1000&fit=crop"
    },
    {
      title: "Golden Hour",
      category: "Portrait",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop"
    },
    {
      title: "City Lights",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=1000&fit=crop"
    },
    {
      title: "Natural Beauty",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop"
    },
    {
      title: "Reflections",
      category: "Conceptual",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
    },
    {
      title: "Street Style",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      <StackedWorkGrid works={demoWorks} />
    </div>
  );
}