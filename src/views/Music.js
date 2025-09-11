import React, { useState } from "react";
import songs from "../data/musicList";

export default function SongList({ setCurrentSongId, setSongs }) {
  const reversedList = [...songs].reverse();
  const [filteredSongs, setFilteredSongs] = useState(reversedList);
  const changePerspective = (perspective) => {
    const filteredSongs = reversedList.filter(
      (song) => song.perspective === perspective || perspective === "all"
    );
    setFilteredSongs(filteredSongs);
  };

  const onClick = (id) => {
    setCurrentSongId(id);
    setSongs(filteredSongs);
  };

  return (
    <>
      <div
        className="filters"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div className="search-bar" style={{ justifyContent: "center" }}>
          <input
            style={{
              padding: "5px",
              fontSize: "16px",
              backgroundColor: "#e7e5e5",
            }}
            type="text"
            placeholder="Search songs..."
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              const filtered = reversedList.filter((song) =>
                song.title.toLowerCase().includes(query)
              );
              setFilteredSongs(filtered);
            }}
          />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <select
            onChange={(e) => changePerspective(e.target.value)}
            style={{
              padding: "5px",
              fontSize: "16px",
              backgroundColor: "#e7e5e5",
            }}
          >
            <option value="all">All Songs</option>
            <option value="to Jesus">To Jesus</option>
            <option value="from Jesus">From Jesus</option>
            <option value="about Jesus">About Jesus</option>
          </select>
        </div>
      </div>
      <div className="song-list">
        {filteredSongs?.map((song) => (
          <div
            key={song.id}
            className="song-card"
            onClick={() => onClick(song.id)}
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
    </>
  );
}
