import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// 🟣 Enhanced Floating Particle Background with Depth
const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const colors = ["#ff9800", "#ffffff", "#a17cff"];
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create floating particles with depth (z-index simulation)
    for (let i = 0; i < 50; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        depth: depth,
        opacity: 0.3 + depth * 0.7,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (0.5 + p.depth * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.closePath();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none"
      style={{ transform: "translateZ(0)" }}
    />
  );
};

// 👨 Enhanced Animated Man with 3D
const AnimatedMan = ({ mouseX, mouseY }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);

  return (
    <motion.div
      style={{ 
        y,
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, x: -50, z: -100 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        z: 0,
        scale: [1, 1.02, 1],
      }}
      transition={{
        opacity: { duration: 0.8 },
        x: { duration: 0.8 },
        z: { duration: 0.8 },
        scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
      }}
      whileHover={{ 
        scale: 1.1,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="relative z-20 cursor-pointer"
    >
      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        <img
          src="./man.png"
          alt="Man Illustration"
          className="w-72 md:w-80 select-none drop-shadow-[0_20px_40px_rgba(255,165,0,0.5)]"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-400/20 to-transparent blur-2xl -z-10" />
      </div>
    </motion.div>
  );
};

// 🖼️ Enhanced Animated Design Panel with Cinematic 3D
const AnimatedPanel = ({ mouseX, mouseY }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), {
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div
      ref={ref}
   
      className="relative cursor-pointer ml-20"
    >
      {/* Main panel with layers */}
      <div 
        className="relative bg-gradient-to-br from-[#3d2f5e]/90 to-[#2d1f4e] rounded-2xl shadow-2xl overflow-hidden"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Background glow layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 blur-xl" style={{ transform: "translateZ(-20px)" }} />
        
        {/* Image container */}
        <div className="relative p-4" style={{ transform: "translateZ(30px)" }}>
          <img
            src="/ui-design.png"
            alt="Portfolio Design"
            className="rounded-xl h-150 w-full shadow-lg"
          />
          
          {/* Overlay gradient on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            className="absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-600 rounded-xl"
            style={{ transform: "translateZ(35px)" }}
          />
        </div>

        {/* Animated corner accents */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-orange-400 rounded-tl-2xl"
          style={{ transform: "translateZ(40px)" }}
        />
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-purple-400 rounded-br-2xl"
          style={{ transform: "translateZ(40px)" }}
        />
      </div>

      {/* Floating indicator with depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1.2, 1.2, 0],
          x: [-30, 0, 0, 30],
          y: [-30, 0, 0, 30]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-2xl"
        style={{ transform: "translateZ(60px)" }}
      >
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
      </motion.div>

      {/* Shadow layer */}
      <div 
        className="absolute inset-0 bg-black/40 blur-3xl rounded-2xl -z-10"
        style={{ transform: "translateZ(-30px) translateY(30px)" }}
      />
    </motion.div>
  );
};

// 🌟 Main Component with 3D Scene
const PortfolioLanding = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-100 flex flex-col md:flex-row items-center justify-center gap-10 p-10 bg-gradient-to-br from-[#190d2e] to-[#000000] overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Particle Background */}
      <FloatingParticles />

      {/* Ambient light effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Section: Text with depth */}
      <motion.div 
        className="z-10 text-center md:text-left text-white space-y-6 max-w-md"
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, z: -50 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 1 }}
          className="space-y-2"
          style={{ transform: "translateZ(30px)" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.5)]">Raja Behera</span>
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-gray-200 space-y-1">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="text-purple-300">UI/UX Design</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-300">Development</span>
            </div>
            <div className="text-orange-300">Freelancing</div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, z: -30 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-300 text-lg"
          style={{ transform: "translateZ(20px)" }}
        >
          I craft visually appealing, interactive digital experiences using modern tools.
        </motion.p>
        </motion.div>

      {/* Right Section: Man + Design with 3D positioning */}
      <div className="relative flex items-center justify-center gap-8 z-10" style={{ transformStyle: "preserve-3d" }}>
        {/* Design Panel - positioned behind */}
        <div className="hidden md:block">
          <AnimatedPanel mouseX={mouseX} mouseY={mouseY} />
        </div>
        
        {/* Man - positioned in front, slightly overlapping */}
        <div className="md:absolute md:left-[-80px] md:top-1/2 md:-translate-y-1/2">
          <AnimatedMan mouseX={mouseX} mouseY={mouseY} />
        </div>
      </div>

      {/* Mobile: Show panel below */}
      <div className="md:hidden z-10">
        <AnimatedPanel mouseX={mouseX} mouseY={mouseY} />
      </div>
    </div>
  );
};

export default PortfolioLanding;