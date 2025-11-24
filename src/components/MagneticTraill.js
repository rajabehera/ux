import React, { useEffect, useRef, useState } from "react";

export default function MagneticTrail() {
  const [cursorTrail, setCursorTrail] = useState([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const trailLength = 20; // number of trail points
  const smoothing = 0.15; // smaller = more magnetic lag
  const requestRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsMouseMoving(true);
      clearTimeout(window.stopTimer);
      window.stopTimer = setTimeout(() => setIsMouseMoving(false), 300);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      // Magnetic interpolation (lerp)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * smoothing;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * smoothing;

      setCursorTrail((prev) => {
        const newTrail = [{ ...currentPos.current }, ...prev];
        return newTrail.slice(0, trailLength);
      });

      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const pathD = (() => {
    if (cursorTrail.length < 2) return "";
    let path = `M ${cursorTrail[0].x} ${cursorTrail[0].y}`;
    for (let i = 1; i < cursorTrail.length - 1; i++) {
      const current = cursorTrail[i];
      const next = cursorTrail[i + 1];
      const controlX = (current.x + next.x) / 2;
      const controlY = (current.y + next.y) / 2;
      path += ` Q ${current.x} ${current.y} ${controlX} ${controlY}`;
    }
    const last = cursorTrail[cursorTrail.length - 1];
    path += ` L ${last.x} ${last.y}`;
    return path;
  })();

  return (
    <svg className="fixed inset-0 pointer-events-none z-40 w-full h-full">
      <defs>
        <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
        </linearGradient>
        <filter id="trailGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {cursorTrail.length > 2 && (
        <path
          d={pathD}
          stroke="url(#trailGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#trailGlow)"
          style={{
            opacity: isMouseMoving ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        />
      )}
    </svg>
  );
}
