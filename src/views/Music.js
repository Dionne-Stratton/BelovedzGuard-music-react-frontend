import React, { useState } from "react";
import { setQueue, setCurrentSong } from "../state/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Music.css";

// map genre → {icon, label}
const GENRE_META = {
  Rock: { icon: "🎸", label: "Rock" },
  Pop: { icon: "⭐", label: "Pop" },
  Ballad: { icon: "💖", label: "Ballad" },
  Theatrical: { icon: "🎭", label: "Theatrical" },
  Praise: { icon: "❤️‍🔥", label: "Praise" },
};
const DEFAULT_META = { icon: "🎶", label: "Other" };

export default function Music() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);

  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  // derive filteredSongs each render
  const filteredSongs = songs.filter((song) => {
    if (searchQuery) {
      return song.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (genreFilter && genreFilter !== "All") {
      return song.genre === genreFilter;
    }
    return true; // no filters → show all
  });

  // When a card is clicked: snapshot the current filtered list into the queue
  const handleSongClick = (clickedId) => {
    dispatch(setQueue(filteredSongs));
    dispatch(setCurrentSong(clickedId));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setGenreFilter("All"); // mutually exclusive with genre
  };

  const handleGenreChange = (value) => {
    setGenreFilter(value);
    setSearchQuery(""); // mutually exclusive with search
  };

  return (
    <>
      <div className="filters song-filters">
        <div className="search-bar add-drop-shadow-thin">
          <input
            type="text"
            placeholder="Search titles..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={genreFilter !== "All"}
          />
        </div>
        <div>
          <select
            value={genreFilter}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="genre-dropdown-menu"
            disabled={searchQuery.length > 0}
          >
            <option value="All">🎶 All Songs</option>
            <option value="Rock">🎸 Rock</option>
            <option value="Pop">⭐ Pop</option>
            <option value="Ballad">💖 Ballad</option>
            <option value="Theatrical">🎭 Theatrical</option>
            <option value="Praise">❤️‍🔥 Praise</option>
          </select>
        </div>
      </div>

      <div className="song-list">
        {filteredSongs.map((song) => {
          const meta = GENRE_META[song.genre] || DEFAULT_META;
          return (
            <div
              key={song._id}
              className="song-card"
              onClick={() => handleSongClick(song._id)}
            >
              <div className="genre-icon">
                {meta.icon}
                <div className="tooltip">{meta.label}</div>
              </div>

              <div className="thumbnail-wrapper">
                <img
                  src={song.songThumbnail}
                  alt={song.title}
                  className="song-thumbnail"
                />
                <div className="play-overlay">🎧</div>
              </div>
              <span className="song-title">{song.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
