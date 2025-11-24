import React, { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringH1, setIsHoveringH1] = useState(false);
  const [linkWidth, setLinkWidth] = useState(55);
  const [rotation, setRotation] = useState(0);
  const currentLinkRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
      clearTimeout(window.mouseTimeout);
      window.mouseTimeout = setTimeout(() => setIsMouseMoving(false), 200);
    };
    window.addEventListener("mousemove", move);

    const links = document.getElementsByClassName("magnetic");
    const h1Elements = document.querySelectorAll("h1");

    const handleMouseEnter = (e) => {
      const link = e.currentTarget;
      currentLinkRef.current = link;
      const width = link.offsetWidth;
      setLinkWidth(width - 10);
      setIsHoveringLink(true);
    };

    const handleMouseLeave = () => {
      currentLinkRef.current = null;
      setIsHoveringLink(false);
    };

    const handleH1Enter = () => {
      setIsHoveringH1(true);
    };

    const handleH1Leave = () => {
      setIsHoveringH1(false);
    };

    [...links].forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    h1Elements.forEach((h1) => {
      h1.addEventListener("mouseenter", handleH1Enter);
      h1.addEventListener("mouseleave", handleH1Leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      [...links].forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
      h1Elements.forEach((h1) => {
        h1.removeEventListener("mouseenter", handleH1Enter);
        h1.removeEventListener("mouseleave", handleH1Leave);
      });
    };
  }, []);

  useEffect(() => {
    const handleMagneticElement = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
    };

    const resetMagneticElement = (e) => {
      e.currentTarget.style.transform = "translate(0, 0)";
    };

    const items = document.querySelectorAll(".magnetic");
    items.forEach((el) => {
      el.addEventListener("mousemove", handleMagneticElement);
      el.addEventListener("mouseleave", resetMagneticElement);
    });

    return () => {
      items.forEach((el) => {
        el.removeEventListener("mousemove", handleMagneticElement);
        el.removeEventListener("mouseleave", resetMagneticElement);
      });
    };
  }, []);

  // Rotation animation for H1 hover
  useEffect(() => {
    if (!isHoveringH1) return;

    let animationId;
    let currentRotation = 0;

    const animate = () => {
      currentRotation += 1;
      setRotation(currentRotation);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHoveringH1]);

  return (
    <>
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - (isHoveringH1 ? 60 : 10),
          top: mousePosition.y - (isHoveringH1 ? 54 : 10),
          width: isHoveringH1 ? 120 : isHoveringLink ? linkWidth : 16,
          height: isHoveringH1 ? 108 : isHoveringLink ? 25 : 16,
          opacity: isMouseMoving ? 1 : isHoveringLink || isHoveringH1 ? 1 : 0,
          transition: isHoveringH1 
            ? "left 0.02s linear, top 0.02s linear, width 0.3s ease, height 0.3s ease, opacity 0.3s ease"
            : "left 0.02s linear, top 0.02s linear, width 0.3s ease, height 0.3s ease, opacity 1s ease",
          mixBlendMode: isHoveringH1 ? 'normal' : 'difference',
        }}
      >
        {!isHoveringH1 && (
          <div
            className={`w-full h-full rounded-full transition-all duration-300 ${
              isHoveringLink
                ? "bg-white/80 scale-150 backdrop-blur-md"
                : "bg-white"
            }`}
          />
        )}
        {isHoveringH1 && (
          <svg
            width="120"
            height="108"
            viewBox="-12 -12 143 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="0.5"
              y="0.5"
              width="118"
              height="107"
              rx="30"
              stroke="#22d3ee"
              strokeWidth="1"
              opacity="0.4"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: '50% 50%',
                transformBox: 'fill-box'
              }}
            />
            <rect
              x="9"
              y="10"
              width="101"
              height="88"
              rx="28"
              stroke="#22d3ee"
              strokeWidth="1.1"
              opacity="0.5"
              style={{
                transform: `rotate(${-rotation}deg)`,
                transformOrigin: '50% 50%',
                transformBox: 'fill-box'
              }}
            />
            <rect
              x="20"
              y="18"
              width="79"
              height="72"
              rx="26"
              stroke="#22d3ee"
              strokeWidth="1.2"
              opacity="0.6"
              style={{
                transform: `rotate(${rotation * 1.2}deg)`,
                transformOrigin: '50% 50%',
                transformBox: 'fill-box'
              }}
            />
            <rect
              x="32"
              y="28"
              width="55"
              height="52"
              rx="24"
              stroke="#22d3ee"
              strokeWidth="1.3"
              opacity="0.7"
              style={{
                transform: `rotate(${-rotation * 1.3}deg)`,
                transformOrigin: '50% 50%',
                transformBox: 'fill-box'
              }}
            />
            
            {/* Animated dots on corners */}
            <circle cx="59.5" cy="54" r="2.5" fill="#22d3ee" opacity="0.8">
              <animate attributeName="r" values="2;3.5;2" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="59.5" cy="10" r="2" fill="#22d3ee" opacity="0.7">
              <animate attributeName="r" values="2;3;2" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="10" cy="54" r="2" fill="#22d3ee" opacity="0.7">
              <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="109" cy="54" r="2" fill="#22d3ee" opacity="0.7">
              <animate attributeName="r" values="2;3;2" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        )}
      </div>

      {/* Demo Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-12 flex flex-col items-center justify-center gap-12">
        <h1 className="text-7xl font-bold text-white">
          Hover Over Me!
        </h1>
        
        <div className="flex gap-8">
          <button className="magnetic bg-white text-black px-8 py-4 rounded-full font-semibold transition-colors hover:bg-gray-200">
            Magnetic Button
          </button>
          <button className="magnetic bg-cyan-400 text-black px-8 py-4 rounded-full font-semibold transition-colors hover:bg-cyan-300">
            Another Button
          </button>
        </div>

        <p className="text-white/60 text-lg max-w-2xl text-center">
          Hover over the H1 heading to see the futuristic rotating rectangles effect with animated dots. 
          Hover over the magnetic buttons to see the original effect.
        </p>
      </div>
    </>
  );
}