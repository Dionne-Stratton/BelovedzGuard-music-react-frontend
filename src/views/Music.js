import React, { useState } from "react";

// map genre → {icon, label}
const GENRE_META = {
  Rock: { icon: "🎸", label: "Rock" },
  Pop: { icon: "⭐", label: "Pop" },
  Ballad: { icon: "💖", label: "Ballad" },
  Theatrical: { icon: "🎭", label: "Theatrical" },
  Praise: { icon: "❤️‍🔥", label: "Praise" },
};
const DEFAULT_META = { icon: "🎶", label: "Other" };

export default function Music({ filteredSongs, filterSongs, onSongClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setGenreFilter("All"); // mutually exclusive with genre
    filterSongs("search", value);
  };

  const handleGenreChange = (value) => {
    setGenreFilter(value);
    setSearchQuery(""); // mutually exclusive with search
    filterSongs("genre", value);
  };

  return (
    <>
      <div
        className="filters"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div className="search-bar" style={{ justifyContent: "center" }}>
          <input
            style={{ padding: 5, fontSize: 16, backgroundColor: "#e7e5e5" }}
            type="text"
            placeholder="Search titles..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={genreFilter !== "All"}
          />
        </div>
        <div style={{ marginLeft: 20 }}>
          <select
            value={genreFilter}
            onChange={(e) => handleGenreChange(e.target.value)}
            style={{ padding: 5, fontSize: 16, backgroundColor: "#e7e5e5" }}
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
        {filteredSongs?.map((song) => {
          const meta = GENRE_META[song.genre] || DEFAULT_META;
          return (
            <div
              key={song._id}
              className="song-card"
              onClick={() => onSongClick(song._id)}
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
              <caption className="song-title">{song.title}</caption>
            </div>
          );
        })}
      </div>
    </>
  );
}
