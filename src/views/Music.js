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
      <div className="perspective-dropdown">
        <select onChange={(e) => changePerspective(e.target.value)}>
          <option value="all">All Songs</option>
          <option value="to Jesus">To Jesus</option>
          <option value="from Jesus">From Jesus</option>
          <option value="about Jesus">About Jesus</option>
        </select>
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
