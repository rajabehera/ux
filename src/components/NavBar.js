import React, { useState, useEffect } from "react"; // 1. Import useState and useEffect
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import RBLogo from "./RBLogo";

const theme = {
  "/": "nav-home",
  "/works": "nav-home",
  "/about": "nav-home",
  "/contact": "nav-home",
};

  // Function to handle the scroll event


function NavBar() {
  const { pathname } = useLocation();
  const themeClass = theme[pathname] || "nav-default";

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    // Check if the vertical scroll position is greater than or equal to 100vh
    // window.innerHeight is equivalent to 100vh
    if (window.scrollY >= window.innerHeight) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

const [scrolled, setScrolled] = useState(false);
  return (
    <nav className={`navbar ${themeClass} ${(themeClass != 'nav-home') && scrolled ? "scrolled" : ""}`} data-aos="fade-up">
      
      <NavLink to="/" className="navbar-logo">
        <RBLogo size="small" animated={true} />
      </NavLink>

      <div className="navbar-item">
        <NavLink 
          className={({ isActive }) => isActive ? "magnetic active" : "magnetic"}
          to="/works"
          end
        >
          WORKS
        </NavLink>
        <NavLink 
          className={({ isActive }) => isActive ? "magnetic active" : "magnetic"}
          to="/about"
        >
          ABOUT
        </NavLink>
        <NavLink 
          className={({ isActive }) => isActive ? "magnetic active" : "magnetic"}
          to="/contact"
        >
          CONTACT
        </NavLink>
      </div>

    </nav>
  );
}

export default NavBar;
