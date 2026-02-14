import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import './CustomCursor.css';
export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringH1, setIsHoveringH1] = useState(false);
  const [linkWidth, setLinkWidth] = useState(55);
  const [rotation, setRotation] = useState(0);
  const currentLinkRef = useRef(null);
  const location = useLocation();

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
  }, [location.pathname]);

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
  }, [location.pathname]);

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
          left: mousePosition.x - (isHoveringH1 ? 80 : 10),
          top: mousePosition.y - (isHoveringH1 ? 104 : 10),
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
            className={`w-full h-full rounded-full transition-all duration-300 ${isHoveringLink
                ? "bg-white/80 scale-150 backdrop-blur-md"
                : "bg-white"
              }`}
          />
        )}
        {isHoveringH1 && (
          <div>
            <svg width="0" height="0">
              <filter id="gooey-black-hole">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16" result="goo" />
              </filter>
            </svg>
            <div class="black-hole">
              <ul class="gooey-container">
                <li class="bubble"></li>
                <li class="bubble"></li>
                <li class="bubble"></li>
                <li class="bubble"></li>
                <li class="bubble"></li>
                <li class="bubble"></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Demo Content */}

    </>
  );
}