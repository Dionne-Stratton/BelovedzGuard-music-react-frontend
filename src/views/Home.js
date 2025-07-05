import React from "react";
import { NavLink } from "react-router-dom";

export default function Home({ setCurrentIndex }) {
  return (
    <div className="home">
      <h1>Welcome to BelovedzGuard</h1>
      <p>
        This is a space devoted to uplifting, Christ-centered music — songs
        birthed in worship, grounded in Scripture, and overflowing with love for
        Jesus. Everything here was created to stir your heart, strengthen your
        spirit, and help you draw near to Him.
      </p>

      <p>
        Whether you're weary or rejoicing, searching or sure — you're welcome
        here. Come listen, rest, and be refreshed in the presence of the One who
        loves you most.
      </p>

      <div className="home-links">
        <p>
          <NavLink to="/music" className="main-nav">
            Start Listening
          </NavLink>{" "}
          |{" "}
          <NavLink to="/about" className="main-nav">
            Learn More
          </NavLink>
        </p>
      </div>

      <blockquote className="home-verse">
        “He has given me a new song to sing…” – Psalm 40:3
      </blockquote>
    </div>
  );
}
