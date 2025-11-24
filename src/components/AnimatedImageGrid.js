import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import "./AnimatedImageGrid.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const images = [
  // Add your image URLs here
  "https://cdn.prod.website-files.com/657eccfbaeba36ef69962c26/657eccfbaeba36ef69962e51_behind-the-times-ii04.webp",
  "https://cdn.prod.website-files.com/657eccfbaeba36ef69962c26/657eccfbaeba36ef69962e51_behind-the-times-ii04.webp",
  "https://cdn.prod.website-files.com/657eccfbaeba36ef69962c26/657eccfbaeba36ef69962e51_behind-the-times-ii04.webp",
  "https://cdn.prod.website-files.com/657eccfbaeba36ef69962c26/657eccfbaeba36ef69962e51_behind-the-times-ii04.webp",
  // add more images ...
];

function AnimatedImageGrid() {
  const gridRef = useRef();

 useEffect(() => {
  const lenis = new Lenis({ smooth: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  const items = gridRef.current.querySelectorAll(".grid__itemm-inner");

  items.forEach((item, i) => {
    gsap.fromTo(
      item,
      {
        scale: 0.7,
        rotateX: -30,
        filter: "brightness(57%)",
        y: i % 2 ? 90 : -90
      },
      {
        scale: 1,
        rotateX: 0,
        filter: "brightness(100%)",
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 10%",
          scrub: true
        }
      }
    );
  });

  ScrollTrigger.refresh();

  return () => {
    lenis.destroy();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);


  return (
    <section className="animated-grid-section">
      <blockquote className="big-quote">
        <span>I don't shoot what it looks like, I shoot what it feels like.</span>
      </blockquote>
      <div className="image-grid" ref={gridRef}>
        {images.map((url, idx) => (
          <div className="grid__itemm" key={idx}>
            <div
              className="grid__itemm-inner"
              style={{
                backgroundImage: `url(${url})`
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AnimatedImageGrid;
