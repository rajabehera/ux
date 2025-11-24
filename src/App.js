import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import AnimatedImageGrid from "./components/AnimatedImageGrid";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import StackedWorkGrid from './components/StackedWorkGrid';
import './App.css';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollGallery from "./components/ScrollGallery";
import ScrollGalleryNew from "./components/ScrollGalleryNew";
import Gallery3D from "./components/Gallery3D";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import { FloatingParticles } from "./components/Particle";
import ContactSection from "./components/Contact";
import About from "./pages/About";
import MagneticTrail from "./components/MagneticTraill";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import DraggableCardDemo from "./components/DraggableCardDemo";
import ScrollCarousel from "./pages/Works";
import { Heart } from 'lucide-react';
import CaseStudy from "./pages/Casestudy";
import PortfolioList from "./pages/PortfolioList";
import { caseStudiesData } from './data/CaseStudies';

// Home page component
const HomePage = () => (
  <>
    <Portfolio />
    <ScrollGallery />
    <Skills />
    {/* <DraggableCardDemo /> */}
  </>
);
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto" for instant
    });
  }, [pathname]);

  return null;
}
const theme = {
  "/": "nav-home",
  "/works": "nav-home",
  "/about": "nav-home",
  "/contact": "nav-home",
};


// New component that uses useLocation
function AppContent() {
  const { pathname } = useLocation();
  const themeClass = theme[pathname] || "nav-default";
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [scrolled2, setScrolled2] = useState(false);

  // Initialize loading
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Wait for AOS to initialize
        AOS.init({ duration: 900, easing: "ease-out", once: true });

        // Simulate loading time for assets/components
        // You can add actual data fetching here if needed
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Optional: Preload critical images
        // const imageUrls = ['/path/to/image1.jpg', '/path/to/image2.jpg'];
        // await Promise.all(
        //   imageUrls.map(src => {
        //     return new Promise((resolve, reject) => {
        //       const img = new Image();
        //       img.onload = resolve;
        //       img.onerror = reject;
        //       img.src = src;
        //     });
        //   })
        // );

        setLoading(false);
      } catch (error) {
        console.error('Error loading app:', error);
        setLoading(false); // Still show app even if there's an error
      }
    };

    initializeApp();
  }, []);




  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScrollable = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollable) * 100;
      const totalHeight = document.body.scrollHeight;

      // 2. Get viewport height (100vh in pixels)
      const viewportHeight = window.innerHeight;

      // 3. Calculate 80vh in pixels
      const lastSectionHeight = 0.80 * viewportHeight; // This is 80vh in px

      // 4. Calculate the scroll position where the last 80vh section BEGINS
      // We subtract the viewport height from total height to get the max scroll position,
      // then subtract 80vh from that point to find the start of the section.
      const triggerPoint = (totalHeight - viewportHeight) - lastSectionHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      console.log('===========>>', window.scrollY >= triggerPoint);


      if (window.scrollY >= triggerPoint) {
        setScrolled(false);
        setScrolled2(true);
      } else if (window.scrollY > 40) {
        setScrolled2(false);
        setScrolled(true);
      } 
      else{
        setScrolled2(false);
         setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show loading screen while initializing
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <ScrollToTop />
      <div className="content-layer">
        <NavBar />
        <CustomCursor />
        <MagneticTrail />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<ScrollCarousel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/case-study" element={<DraggableCardDemo />} />
          <Route path="/port" element={<PortfolioList />} />
          {caseStudiesData.map(study => (
            <Route
              key={study.slug}
              path={`/case-study/${study.slug}`}
              element={<CaseStudy data={study} />}
            />
          ))}
        </Routes>
        <div className="fixed bottom-8 left-8 z-[1000]">
          <div className="flex flex-col items-center gap-3">

            <div className="flex items-center gap-4">
              <div className="text-white text-xl font-light designer">
                <div className={`flex items-center gap-2 text-gray-400 text-sm  ${themeClass} ${(themeClass != 'nav-home') && scrolled ? "scrolled" : ""} ${scrolled2 ? "scrolled2" : ""}`} >
                  <span className="tracking-wide">Made with</span>
                  <Heart size={16} className="text-red-500" fill="currentColor" />
                  <span className="tracking-wide">© 2025 All rights reserved</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="fixed top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        {/* <Footer /> */}
      </div>

      {/* Scroll Progress Indicator - Only show on home page */}
      {location.pathname === '/' && (
        <div className="fixed bottom-8 right-8 z-[1000]">
          <div className="flex flex-col items-center gap-3">
            <div className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">
              Scroll
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white text-xl font-light">
                {Math.round(scrollProgress)}%
              </div>
              <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;