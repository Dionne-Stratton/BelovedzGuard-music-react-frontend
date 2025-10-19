import React, { useState } from "react";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
  togglePlay,
} from "../state/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../styles/Songs.css";
import SongThumbnail from "../components/shared/SongThumbnail";
import AddToPlaylistModal from "../components/features/AddToPlaylist/AddToPlaylistModal";

const GENRE_META = {
  Rock: { icon: "🎸", label: "Rock" },
  Pop: { icon: "⭐", label: "Pop" },
  Ballad: { icon: "💖", label: "Ballad" },
  Theatrical: { icon: "🎭", label: "Theatrical" },
  Praise: { icon: "❤️‍🔥", label: "Praise" },
};
const DEFAULT_META = { icon: "🎶", label: "Other" };

export default function Songs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const songs = useSelector((state) => state.songs);
  const {
    queue: currentQueue,
    currentSongId,
    context,
  } = useSelector((state) => state.player);
  const currentSource = context?.source ?? null;

  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [selectedSong, setSelectedSong] = useState(null);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

  const filteredSongs = songs.filter((song) => {
    if (searchQuery) {
      return song.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (genreFilter && genreFilter !== "All") {
      return song.genre === genreFilter;
    }
    return true;
  });

  const queuesMatch = (a = [], b = []) =>
    a.length === b.length && a.every((s, i) => s?._id === b[i]?._id);

  const handleSongClick = (clickedId) => {
    const isSameSong = clickedId === currentSongId;
    const fromDifferentSource = currentSource !== "songs";
    const queueDiffers = !queuesMatch(currentQueue, filteredSongs);

    // if coming from a different source or queue differs → always replace
    if (fromDifferentSource || queueDiffers) {
      dispatch(
        setQueue({
          songs: filteredSongs,
          source: "songs",
          sourceId: null,
        })
      );
      // now that we’ve replaced the queue, continue to toggle/play below
    }

    if (isSameSong) {
      // toggle regardless of context change
      dispatch(togglePlay());
      return;
    }

    // different song → start it fresh
    dispatch(setCurrentSong(clickedId));
    dispatch(setPlaying(true));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setGenreFilter("All");
  };

  const handleGenreChange = (value) => {
    setGenreFilter(value);
    setSearchQuery("");
  };

  const handleAddToPlaylist = (song, e) => {
    e.stopPropagation(); // Prevent song card click
    setSelectedSong(song);
    setShowAddToPlaylistModal(true);
  };

  const handleCloseModal = () => {
    setShowAddToPlaylistModal(false);
    setSelectedSong(null);
  };

  const handleSongTitleClick = (songId, e) => {
    e.stopPropagation(); // Prevent song card click
    navigate(`/songs/${songId}`);
  };

  return (
    <div className="song-page">
      <div className="filters song-filters">
        <div className="search-bar drop-shadow-thin">
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
            <LazySongCard
              key={song._id}
              song={song}
              meta={meta}
              onClick={() => handleSongClick(song._id)}
              onAddToPlaylist={handleAddToPlaylist}
              onTitleClick={handleSongTitleClick}
              isAuthenticated={isAuthenticated}
            />
          );
        })}
      </div>

      <AddToPlaylistModal
        isOpen={showAddToPlaylistModal}
        onClose={handleCloseModal}
        song={selectedSong}
      />
    </div>
  );
}

/* ---------- Helper Subcomponent ---------- */
function LazySongCard({ song, meta, onClick, onAddToPlaylist, onTitleClick }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  return (
    <div ref={ref} style={{ minHeight: "372px" }}>
      {inView ? (
        <div className="song-card" onClick={onClick}>
          <div className="genre-icon">
            {meta.icon}
            <div className="tooltip">{meta.label}</div>
          </div>

          <div className="thumbnail-wrapper">
            <div className="play-overlay">🎧</div>
            <SongThumbnail
              title={song.title}
              thumbnail={song.songThumbnail}
              animatedThumbnail={song.animatedSongThumbnail}
            />
          </div>

          <div className="song-card-buttons">
            <button
              className="song-play-button"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              title="Play"
            >
              ►
            </button>
            <button
              className="song-add-to-playlist-button"
              onClick={(e) => onAddToPlaylist(song, e)}
              title="Add to Playlist"
            >
              + Add to Playlist
            </button>
          </div>

          <span
            className="song-title"
            onClick={(e) => onTitleClick(song._id, e)}
          >
            {song.title}
          </span>
        </div>
      ) : (
        <div
          className="song-card placeholder"
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "16px",
            backgroundColor: "#222",
            opacity: 0.3,
          }}
        ></div>
      )}
    </div>
  );
}
