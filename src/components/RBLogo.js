import React from 'react';

// Reusable Logo Component with merged loading screen elements
export default function RBLogo({ size = 'medium', animated = false, showLoadingElements = false }) {
  const sizes = {
    small: { container: 40, badge: 36, text: 18, ring: 36 },
    medium: { container: 60, badge: 54, text: 26, ring: 54 },
    large: { container: 240, badge: 200, text: 90, ring: 200 }
  };

  const s = sizes[size];

  return (
    <div className={`relative inline-block ${showLoadingElements && size === 'large' ? 'flex flex-col items-center' : ''}`}
      style={{ width: showLoadingElements && size === 'large' ? 'auto' : s.container, height: showLoadingElements && size === 'large' ? 'auto' : s.container }}>
      <style>{`
        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-15deg);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes orbitalRing {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes fadeInRing {
          to { opacity: 0.6; }
        }

        @keyframes nameReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-40px) scale(1);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .logo-animated {
          animation: logoReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .logo-bg-animated {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%);
          background-size: 400% 400%;
          animation: gradientShift 4s ease infinite;
        }

        .logo-bg-static {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .orbital-ring-animated {
          animation: orbitalRing 3s linear infinite, fadeInRing 0.5s ease-out 0.5s forwards;
        }
        .orbital-ring-animated:nth-child(2) {
          animation-delay: 1s, 1s;  
        }
 
        .orbital-ring-animated:nth-child(3) {
          animation-delay: 2s, 2s; 
        }
        .glow-pulse {
          animation: glowPulse 2.5s ease-in-out 1.5s infinite;
        }

        .name {
          animation: nameReveal 1s ease-out 1.2s forwards;
        }

        .subtitle {
          animation: nameReveal 1s ease-out 1.5s forwards;
        }

        .progress-bar {
          animation: progressBar 3s ease-out 0.5s forwards;
        }

        .loading-text {
          animation: nameReveal 1s ease-out 1.8s forwards;
        }

        .particle:nth-child(1) {
          left: 15%;
          top: 30%;
          animation: particleFloat 3s ease-in-out infinite;
        }

        .particle:nth-child(2) {
          right: 15%;
          top: 40%;
          animation: particleFloat 3.5s ease-in-out 0.3s infinite;
        }

        .particle:nth-child(3) {
          left: 50%;
          top: 20%;
          animation: particleFloat 4s ease-in-out 0.6s infinite;
        }

        .particle:nth-child(4) {
          left: 25%;
          bottom: 25%;
          animation: particleFloat 3.2s ease-in-out 0.9s infinite;
        }

        .progress-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Logo Container */}
      <div className="relative inline-block" style={{ width: s.container, height: s.container }}>
        {/* Glow Pulse Background (only for large animated with loading elements) */}
        {animated && size === 'large' && showLoadingElements && (
          <div className="glow-pulse absolute rounded-full top-1/2 left-1/2 opacity-0"
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)'
            }}>
          </div>
        )}

        {/* Orbital Ring */}
        {animated && size === 'large' && (
          <div>
            <div
              className="orbital-ring-animated absolute border-[2px] border-transparent rounded-full top-1/2 left-1/2 opacity-0"
              style={{
                width: s.ring,
                height: s.ring,
                borderImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb) 1'
              }}
            /><div
              className="orbital-ring-animated absolute border-[2px] border-transparent rounded-full top-1/2 left-1/2 opacity-0"
              style={{
                width: s.ring,
                height: s.ring,
                borderImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb) 1'
              }}
            /><div
              className="orbital-ring-animated  absolute border-[2px] border-transparent rounded-full top-1/2 left-1/2 opacity-0"
              style={{
                width: s.ring,
                height: s.ring,
                borderImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb) 1'
              }}
            />
          </div>
        )}
        {animated && size === 'small' && (
          <div>
            <div
              className="orbital-ring-animated absolute border-[0.1px] border-transparent rounded-full top-1/2 left-1/2 opacity-0"
              style={{
                width: s.ring,
                height: s.ring,
                borderImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb) 1'
              }}
            />
            <div
              className="orbital-ring-animated absolute border-[0.1px] border-transparent rounded-full top-1/2 left-1/2 opacity-0"
              style={{
                width: s.ring,
                height: s.ring,
                borderImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb) 1'
              }}
            />
            <div
              className="orbital-ring-animated absolute border-[0.1px] border-transparent rounded-full top-1/2 left-1/2 opacity-0"
              style={{
                width: s.ring,
                height: s.ring,
                borderImage: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb) 1'
              }}
            />
          </div>
        )}
        {/* Logo Badge */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${animated ? 'logo-animated logo-bg-animated' : 'logo-bg-static'
            }`}
          style={{
            width: s.badge,
            height: s.badge,
            borderRadius: size === 'large' ? '28px' : size === 'medium' ? '12px' : '8px',
            boxShadow: size === 'small'
              ? '0 2px 10px rgba(102, 126, 234, 0.3)'
              : size === 'large' && showLoadingElements
                ? '0 0 60px rgba(102, 126, 234, 0.4), inset 0 0 40px rgba(255,255,255,0.1)'
                : '0 0 40px rgba(102, 126, 234, 0.4), inset 0 0 20px rgba(255,255,255,0.1)'
          }}  data-aos="flip-left"
        >
          {/* Inner Container */}
          <div className="relative w-full h-full flex items-center justify-center designer" >
            {/* R Letter */}
            <div
              className="absolute font-black text-white tracking-tighter"
              style={{
                left: size === 'small' ? '6px' : size === 'medium' ? '12px' : '32px',
                fontSize: s.text,
                textShadow: size === 'small'
                  ? '0 1px 5px rgba(0,0,0,0.3)'
                  : '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.2)',
                WebkitTextStroke: size === 'small' ? '0.5px rgba(255,255,255,0.1)' : '1px rgba(255,255,255,0.1)'
              }}
            >
              R
            </div>

            {/* B Letter */}
            <div
              className="absolute font-black text-white tracking-tighter designer"
              style={{
                right: size === 'small' ? '6px' : size === 'medium' ? '12px' : '32px',
                fontSize: s.text,
                textShadow: size === 'small'
                  ? '0 1px 5px rgba(0,0,0,0.3)'
                  : '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.2)',
                WebkitTextStroke: size === 'small' ? '0.5px rgba(255,255,255,0.1)' : '1px rgba(255,255,255,0.1)'
              }}
            >
              B
            </div>

            {/* Center Divider */}
            <div
              className="absolute bg-gradient-to-b from-transparent via-white to-transparent opacity-30"
              style={{
                width: size === 'small' ? '1px' : '2px',
                height: size === 'small' ? '16px' : size === 'medium' ? '32px' : '96px'
              }}
            />
          </div>
        </div>

        {/* Floating Particles (only for large animated with loading elements) */}
        {animated && size === 'large' && showLoadingElements && (
          <div className="absolute pointer-events-none" style={{ width: 300, height: 300, top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="particle absolute w-2 h-2 rounded-full opacity-0"
              style={{ background: 'linear-gradient(135deg, #f093fb, #667eea)' }}></div>
            <div className="particle absolute w-2 h-2 rounded-full opacity-0"
              style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}></div>
            <div className="particle absolute w-1.5 h-1.5 rounded-full opacity-0"
              style={{ background: 'linear-gradient(135deg, #4facfe, #667eea)' }}></div>
            <div className="particle absolute w-1.5 h-1.5 rounded-full opacity-0"
              style={{ background: 'linear-gradient(135deg, #764ba2, #f093fb)' }}></div>
          </div>
        )}
      </div>

      {/* Loading Screen Elements (only for large size with showLoadingElements) */}
      {size === 'large' && showLoadingElements && (
        <div className="text-center mt-10">
          {/* Name */}
          <div className="name text-[32px] text-white tracking-[10px] uppercase opacity-0 font-extralight"
            style={{
              textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
            }}>
            Raja Behera
          </div>

          {/* Subtitle */}
          <div className="subtitle text-[13px] tracking-[5px] uppercase opacity-0 mt-3 font-medium"
            style={{
              background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
            UX Engineer
          </div>

          {/* Progress Bar */}
          <div className="mt-14 w-72 mx-auto">
            <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm">
              <div className="progress-bar h-full rounded-full relative overflow-hidden"
                style={{
                  width: '0%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe)'
                }}>
                <div className="progress-shimmer absolute inset-0"></div>
              </div>
            </div>
            <div className="loading-text text-white/40 text-[11px] mt-4 tracking-[3px] opacity-0 font-light">
              LOADING EXPERIENCE...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}