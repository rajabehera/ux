import { useEffect, useRef } from 'react';

const FloatingParticles = ({ 
  particleCount = 90,
  particleColor = '#ffffff',
  particleOpacity = 0.5,
  particleSize = 3,
  moveSpeed = 0.2,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * particleOpacity + 0.2;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * particleSize + 0.5;
        this.speedX = (Math.random() - 0.5) * moveSpeed;
        this.speedY = (Math.random() - 0.5) * moveSpeed;
        this.opacity = Math.random() * particleOpacity + 0.2;
        this.opacitySpeed = (Math.random() - 0.5) * 0.002;
        this.sizeSpeed = (Math.random() - 0.5) * 0.02;
        this.baseSize = this.size;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Opacity animation
        this.opacity += this.opacitySpeed;
        if (this.opacity <= 0.2 || this.opacity >= particleOpacity) {
          this.opacitySpeed *= -1;
        }

        // Size animation
        this.size += this.sizeSpeed;
        if (this.size <= 0.1 || this.size >= this.baseSize + 2) {
          this.sizeSpeed *= -1;
        }

        // Boundary check - reset particle when out of bounds
        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleColor, particleOpacity, particleSize, moveSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
};

// Demo component showing usage
export default function ParticlesDemo() {
  return (
    <div className="relative w-full h-screen  overflow-hidden" style={{background: 'radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0612 50%, #000000 100%)'}}>
      {/* Particles background      bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 */}
      <div className="absolute inset-0">
        <FloatingParticles
          particleCount={90}
          particleColor="#ffffff"
          particleOpacity={0.5}
          particleSize={3}
          moveSpeed={0.2}
        />
      </div>

   
    </div>
  );
}

export { FloatingParticles };