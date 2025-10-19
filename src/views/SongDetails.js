import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetSongByIdQuery } from "../state/publicApi";
import { setQueue, setCurrentSong, setPlaying } from "../state/playerSlice";
import { trackUIEvent } from "../utils/analytics";
import SongThumbnail from "../components/shared/SongThumbnail";
import AddToPlaylistModal from "../components/features/AddToPlaylist/AddToPlaylistModal";
import axios from "axios";
import "../styles/SongDetails.css";

const GENRE_META = {
  Rock: { icon: "🎸", label: "Rock" },
  Pop: { icon: "⭐", label: "Pop" },
  Ballad: { icon: "💖", label: "Ballad" },
  Theatrical: { icon: "🎭", label: "Theatrical" },
  Praise: { icon: "❤️‍🔥", label: "Praise" },
};
const DEFAULT_META = { icon: "🎶", label: "Other" };

export default function SongDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get songs from Redux state first
  const songs = useSelector((state) => state.songs);
  const songFromState = songs.find((song) => song._id === id);

  // Fallback to API if not in state
  const {
    data: songFromApi,
    isLoading,
    error,
  } = useGetSongByIdQuery(id, {
    skip: !!songFromState, // Skip API call if we have the song in state
  });

  const song = songFromState || songFromApi;
  const meta = song ? GENRE_META[song.genre] || DEFAULT_META : DEFAULT_META;

  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [lyrics, setLyrics] = useState("loading...");
  const [lyricsError, setLyricsError] = useState(false);

  // Fetch lyrics when song changes
  useEffect(() => {
    if (!song) return;

    if (song.lyrics) {
      setLyrics("loading...");
      setLyricsError(false);
      axios
        .get(song.lyrics, { responseType: "text" })
        .then((res) => setLyrics(res.data))
        .catch((err) => {
          console.error("Error fetching lyrics:", err);
          setLyrics("Failed to load lyrics.");
          setLyricsError(true);
        });
    } else {
      setLyrics("");
    }
  }, [song]);

  // Copy link to clipboard
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      trackUIEvent("Share Song", "Copy Link");
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Play song
  const handlePlay = () => {
    if (!song) return;

    // Set up queue with all songs and play this one
    dispatch(
      setQueue({
        songs: songs,
        source: "song-details",
        sourceId: song._id,
      })
    );
    dispatch(setCurrentSong(song._id));
    dispatch(setPlaying(true));
    trackUIEvent("Play Song", "From Song Details");
  };

  // Add to playlist
  const handleAddToPlaylist = () => {
    setShowAddToPlaylistModal(true);
    trackUIEvent("Add to Playlist", "From Song Details");
  };

  const handleCloseModal = () => {
    setShowAddToPlaylistModal(false);
  };

  // Get related songs by genre (max 5)
  const relatedSongs = songs
    .filter((s) => s._id !== id && s.genre === song?.genre)
    .slice(0, 5);

  // Loading state
  if (isLoading && !songFromState) {
    return (
      <div className="song-details-page">
        <div className="song-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading song...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || (!song && !isLoading)) {
    return (
      <div className="song-details-page">
        <div className="song-details-error">
          <h2>Song Not Found</h2>
          <p>The song you're looking for doesn't exist or has been removed.</p>
          <button
            className="back-button"
            onClick={() => navigate("/listen/songs")}
          >
            Back to Songs
          </button>
        </div>
      </div>
    );
  }

  if (!song) return null;

  return (
    <div className="song-details-page">
      {/* Header */}
      <div className="song-details-header">
        <h1 className="song-details-title">{song.title}</h1>
        <p className="song-artist">by BelovedzGuard</p>
      </div>

      {/* Main Content */}
      <div className="song-details-content">
        {/* Left Column - Media */}
        <div className="song-media-section">
          <div className="song-thumbnail-large">
            <SongThumbnail
              title={song.title}
              thumbnail={song.songThumbnail}
              animatedThumbnail={song.animatedSongThumbnail}
              playOnLoad={true}
              playOnHover={true}
            />
          </div>

          <div className="song-controls">
            <button className="play-button" onClick={handlePlay}>
              ▶ Play Song
            </button>
            <button
              className="add-to-playlist-button"
              onClick={handleAddToPlaylist}
            >
              + Add to Playlist
            </button>
            <button
              className="share-button"
              onClick={handleShare}
              title="Copy link to share"
            >
              {shareCopied ? "✓ Copied!" : "🔗 Share"}
            </button>
          </div>

          <div className="song-info">
            <div className="genre-info">
              <span className="genre-icon">{meta.icon}</span>
              <span className="genre-label">{meta.label}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Lyrics */}
        <div className="song-lyrics-section">
          <h2>Lyrics</h2>
          <div className="lyrics-content">
            {lyrics === "loading..." ? (
              <p className="lyrics-loading">Loading lyrics...</p>
            ) : lyricsError ? (
              <p className="lyrics-error">Failed to load lyrics.</p>
            ) : lyrics ? (
              <div className="lyrics-text">
                {lyrics.split("\n\n").map((stanza, idx) => (
                  <p key={idx}>
                    {stanza.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            ) : (
              <p className="no-lyrics">Lyrics not available for this song.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Songs */}
      {relatedSongs.length > 0 && (
        <div className="related-songs-section">
          <h2>More {meta.label} Songs</h2>
          <div className="related-songs-grid">
            {relatedSongs.map((relatedSong) => (
              <div
                key={relatedSong._id}
                className="related-song-card"
                onClick={() => navigate(`/listen/songs/${relatedSong._id}`)}
              >
                <SongThumbnail
                  title={relatedSong.title}
                  thumbnail={relatedSong.songThumbnail}
                  animatedThumbnail={relatedSong.animatedSongThumbnail}
                  playOnHover={true}
                />
                <span className="related-song-title">{relatedSong.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Links */}
      <div className="external-links-section">
        {song.youTube && (
          <a
            href={song.youTube}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link youtube-link"
          >
            📺 Watch on YouTube
          </a>
        )}
        {song.bandcamp && (
          <a
            href={song.bandcamp}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link bandcamp-link"
          >
            🎵 Listen on Bandcamp
          </a>
        )}
      </div>

      <AddToPlaylistModal
        isOpen={showAddToPlaylistModal}
        onClose={handleCloseModal}
        song={song}
      />
    </div>
  );
}
