import React from "react";
import { NavLink } from "react-router-dom";

export default function Home({ songs, setCurrentIndex }) {
  const featured = songs[0];

  return (
    <div className="about" style={{ paddingTop: "5vh", color: "#ebe7e2" }}>
      <h1>Welcome to BelovedzGuard</h1>
      <p>
        This is a space devoted to uplifting, Christ-centered music — songs
        birthed in worship, grounded in Scripture, and overflowing with love for
        Jesus. Everything here was created to stir your heart, strengthen your
        spirit, and help you draw near to Him.
      </p>

      {featured && featured.thumbnail && (
        <section
          style={{
            margin: "2rem 0",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>Featured Song</h2>
          <div
            onClick={() => setCurrentIndex(0)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              padding: "1rem 0",
            }}
          >
            <img
              src={featured.thumbnail}
              alt={featured.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{featured.title}</h3>
              <p style={{ margin: "0.25rem 0", fontStyle: "italic" }}>
                Click to play the latest track
              </p>
            </div>
          </div>
        </section>
      )}

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

      <blockquote style={{ fontStyle: "italic", marginTop: "2rem" }}>
        “He has given me a new song to sing…” – Psalm 40:3
      </blockquote>
    </div>
  );
}
