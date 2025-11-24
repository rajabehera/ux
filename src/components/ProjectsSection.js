import React, { useState } from "react";
import WorkGrid from "./WorkGrid";
import WorkList from "./WorkList";
import "./ProjectsSection.css";

function ProjectsSection() {
  const [view, setView] = useState("grid");
  // Sample data for work items
const works = [
  {
    title: "Simone Biles – Pause Is Power",
    url: "/work/pause-is-power",
    image: "https://cdn.prod.website-files.com/657eccfbaeba36ef69962c26/657eccfbaeba36ef69962e51_behind-the-times-ii04.webp"
  },
  {
    title: "Serena Williams – RO",
    url: "/work/serena-williams",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
  },
  {
    title: "Gabby Thomas – ESPN & TJ MAXX",
    url: "/work/gabby-thomas",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  },
  {
    title: "WNBA Player Napheesa Collier – Nike",
    url: "/work/napheesa-collier",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c"
  },
  {
    title: "Shohei Ohtani – FTX Crypto",
    url: "/work/shohei-ohtani",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca"
  },
  {
    title: "Keith Powers – Actor/Model",
    url: "/work/keith-powers",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    title: "Simone Manuel – Under Armour",
    url: "/work/simone-manuel",
    image: "https://images.unsplash.com/photo-1517816743773-6e0fd518b133"
  },
  {
    title: "Bubba Wallace – NASCAR",
    url: "/work/bubba-wallace",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
  },
  {
    title: "Brand Campaign – Adidas Originals",
    url: "/work/adidas-originals",
    image: "https://images.unsplash.com/photo-1465101178521-c8e5a3b7ff71"
  },
  {
    title: "Celebrity Editorial – NY Magazine",
    url: "/work/ny-magazine",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df"
  }
];


  return (
    <section className="projects-section" data-aos="fade-up">
      <div className="toggle-view">
        <button onClick={() => setView("grid")}>GRID</button>
        <button onClick={() => setView("list")}>LIST</button>
        <span>SCROLL 0%</span>
      </div>
      {view === "grid"
        ? <WorkGrid works={works} />
        : <WorkList works={works} />}
    </section>
  );
}

export default ProjectsSection;
