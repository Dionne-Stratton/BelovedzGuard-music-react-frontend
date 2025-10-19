import React, { useState } from "react";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
  togglePlay,
} from "../../../state/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./Songs.css";
import AddToPlaylistModal from "../../../components/features/AddToPlaylist/AddToPlaylistModal";
import SongCard from "../../../components/viewComponents/Songs/SongCard";

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
    navigate(`/listen/songs/${songId}`);
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
            <SongCard
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
