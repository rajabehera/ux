import React, { useEffect, useRef } from "react";
import "./WorkGrid.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function WorkGrid({ works }) {
  const gridRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const items = gridRef.current.querySelectorAll(".grid__item-inner");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          scale: 0.7,
          opacity: 0,
          z: i % 2 === 0 ? -220 : 220,
          rotateZ: i % 2 === 0 ? -7 : 7
        },
        {
          scale: 1,
          opacity: 1,
          z: 0,
          rotateZ: 0,
          ease: "power2.out",
          filter: "brightness(100%)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true,
            onUpdate: () => {
              const z = gsap.getProperty(item, "z");
              const scale = gsap.getProperty(item, "scale");
              const rotateZ = gsap.getProperty(item, "rotateZ");
              item.style.transform = `translateZ(${z}px) scale(${scale}) rotateZ(${rotateZ}deg)`;
            }
          }
        }
      );
    });
  }, []);

  // Generate rows from works
  const rows = Array.from({ length: Math.ceil(works.length / 2) });

  return (
    <section className="animated-grid-section" ref={sectionRef}>
      <blockquote className="big-quote">
        <span>I don't shoot what it looks like, I shoot what it feels like.</span>
      </blockquote>

      <div className="image-grid" ref={gridRef}>
        {rows.map((_, rowIdx) => {
          const leftIdx = rowIdx * 2;
          const rightIdx = leftIdx + 1;
          const isLeftBig = rowIdx % 2 === 0;

          return (
            <div className="grid-row" key={rowIdx}>
              {works[leftIdx] && (
                <div className={`grid__item ${isLeftBig ? "big" : "small"}`}>
                  <div
                    className="grid__item-inner"
                    style={{ backgroundImage: `url(${works[leftIdx].image})` }}
                  ></div>
                </div>
              )}

              {works[rightIdx] && (
                <div className={`grid__item ${isLeftBig ? "small" : "big"}`}>
                  <div
                    className="grid__item-inner"
                    style={{ backgroundImage: `url(${works[rightIdx].image})` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WorkGrid;
