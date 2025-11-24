import React from "react";
import "./WorkList.css";

function WorkList({ works }) {
  return (
    <ul className="work-list">
      {works.map((work, idx) => (
        <li key={idx}>
          <a href={work.url}>{work.title}</a>
          <img src={work.image} alt={work.title} className="work-img" />

        </li>
      ))}
    </ul>
  );
}

export default WorkList;
