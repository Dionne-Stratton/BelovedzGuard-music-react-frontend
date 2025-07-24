import React from "react";
import songs from "../data/musicList";

export default function SongList({ setCurrentIndex }) {
  return (
    <div className="song-list">
      {songs
        .slice() // create a copy
        .reverse() // newest first
        .map((song, index) => (
          <div
            key={index}
            className="song-card"
            onClick={() => setCurrentIndex(index)} // Set the current index when clicked
          >
            <div className="thumbnail-wrapper">
              <img
                src={song.thumbnail}
                alt={song.title}
                className="song-thumbnail"
              />
              <div className="play-overlay">🎧</div>
            </div>
            <caption className="song-title">{song.title}</caption>
          </div>
        ))}
    </div>
  );
}
