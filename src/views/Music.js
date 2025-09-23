import React, { useState } from "react";
import songs from "../data/musicList";

// map genre → {icon, label}
const GENRE_META = {
  Rock: { icon: "🎸", label: "Rock" },
  Pop: { icon: "⭐", label: "Pop" },
  Ballad: { icon: "💖", label: "Ballad" },
  Theatrical: { icon: "🎭", label: "Theatrical" },
  Praise: { icon: "❤️‍🔥", label: "Praise" },
};
const DEFAULT_META = { icon: "🎶", label: "Other" };

export default function SongList({ setCurrentSongId, setSongs }) {
  const reversedList = [...songs].reverse();
  const [filteredSongs, setFilteredSongs] = useState(reversedList);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);

    // reset genre when searching
    setGenreFilter("All");

    const filtered = reversedList.filter((song) =>
      song.title.toLowerCase().includes(query)
    );
    setFilteredSongs(filtered);
  };

  const handleGenreChange = (value) => {
    setGenreFilter(value);

    // clear search box when genre changes
    setSearchQuery("");

    const filtered = reversedList.filter(
      (song) => value === "All" || song.genre === value
    );
    setFilteredSongs(filtered);
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
            placeholder="Search titles..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={genreFilter !== "All"}
          />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <select
            value={genreFilter}
            onChange={(e) => handleGenreChange(e.target.value)}
            style={{
              padding: "5px",
              fontSize: "16px",
              backgroundColor: "#e7e5e5",
            }}
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
              key={song.id}
              className="song-card"
              onClick={() => onClick(song.id)}
            >
              {/* genre icon pinned in corner with tooltip */}
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
