import React from "react";

const LyricsViewer = ({ getCurrentSongLyrics, setDisplayLyrics }) => {
  const lyrics = getCurrentSongLyrics();

  if (!lyrics) return null;
  const { title, body } = lyrics;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "650px",
        backgroundColor: "#413b34",
        color: "white",
        padding: "1rem",
        boxShadow: "0 0 10px rgba(18, 17, 17, 0.88)",
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      <button
        onClick={() => setDisplayLyrics(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      {/* Format stanzas and lines */}
      <div style={{ marginTop: "2rem", fontSize: "1rem", lineHeight: "1.6" }}>
        <h1>{title}</h1>
        {body.split("\n\n").map((stanza, idx) => (
          <p key={idx} style={{ marginBottom: "1rem" }}>
            {stanza.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LyricsViewer;
