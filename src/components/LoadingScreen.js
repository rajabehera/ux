import RBLogo from './RBLogo';
import { useState,useEffect } from 'react';
export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br 
     from-[#000000] 
     via-[#120626] 
     via-[#120626] 
     via-[#3a0f6d] 
     to-[#000000]">
        <RBLogo size="large" animated={true} showLoadingElements={true} />
        
        {/* Name and other elements */}
        {/* ... rest of your loading screen content ... */}
      </div>
    </div>
  );
}