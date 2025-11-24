import { useState } from 'react';
const getRandomPosition = (topRange = [0, 100], leftRange = [0, 100]) => {
  const randomTop = Math.floor(Math.random() * (topRange[1] - topRange[0] + 1)) + topRange[0];
  const randomLeft = Math.floor(Math.random() * (leftRange[1] - leftRange[0] + 1)) + leftRange[0];
  return {
    top: `${randomTop}px`,
    left: `${randomLeft}px`
  };
};
// Reusable Tooltip Component with extended positioning
const Tooltip = ({ 
  children, 
  text, 
  position = 'top', 
  className = '',
  customPosition = null, // { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
   randomPosition = null
}) => {
  const [isVisible, setIsVisible] = useState(false);
   const [randomPos] = useState(() => 
    randomPosition ? getRandomPosition(randomPosition.topRange, randomPosition.leftRange) : null
  );
  const positionClasses = {
    top: '-top-12 left-1/2 -translate-x-1/2',
    bottom: '-bottom-12 left-1/2 -translate-x-1/2',
    left: 'top-1/2 -left-2 -translate-y-1/2 -translate-x-full',
    right: 'top-1/2 -right-2 -translate-y-1/2 translate-x-full',
    'top-left': '-top-12 left-0',
    'top-right': '-top-12 right-0',
    'bottom-left': '-bottom-12 left-0',
    'bottom-right': '-bottom-12 right-0',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };
  
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900',
    'top-left': 'top-full left-4 border-4 border-transparent border-t-gray-900',
    'top-right': 'top-full right-4 border-4 border-transparent border-t-gray-900',
    'bottom-left': 'bottom-full left-4 border-4 border-transparent border-b-gray-900',
    'bottom-right': 'bottom-full right-4 border-4 border-transparent border-b-gray-900',
    center: 'hidden', // No arrow for center position
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute ${customPosition ? '' : positionClasses[position]} px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none z-50 ${className}`}
          style={{
            animation: 'fadeIn 0.2s ease-in-out',
            ...(customPosition || {})
          }}
        >
          {text}
          {!customPosition && <div className={`absolute ${arrowClasses[position]}`}></div>}
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
export default Tooltip;