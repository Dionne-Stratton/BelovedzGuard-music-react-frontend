import React from "react";
import songs from "../data/musicList";

export default function SongList({ setCurrentIndex }) {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {songs
        .slice() // create a copy
        .reverse() // newest first
        .map((song, index) => (
          <div
            key={index}
            className="song-card"
            style={{
              margin: "2rem",
              height: "15rem",
              width: "12rem",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0,0, 0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => setCurrentIndex(index)} // Set the current index when clicked
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              style={{
                width: "10rem",
                height: "10rem",
                objectFit: "cover",
                // border: "2px solid #413b34",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 1)",
              }}
            />
            <caption
              style={{
                display: "flex",
                width: "8rem",
                margin: "0 auto",
                textAlign: "center",
                justifyContent: "center",
                marginTop: "0.5rem",
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#ebe7e2",
                //add a shadow to the text
                textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
              }}
            >
              {song.title}
            </caption>
          </div>
        ))}
    </div>
  );
}
