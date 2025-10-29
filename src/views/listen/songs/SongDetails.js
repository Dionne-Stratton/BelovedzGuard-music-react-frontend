import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaYoutube } from "react-icons/fa";
import { useGetSongByIdQuery } from "../../../state/publicApi";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
} from "../../../state/playerSlice";
import { trackUIEvent } from "../../../utils/analytics";
import { useToastContext } from "../../../contexts/ToastContext";
import { MusicNoteIcon } from "../../../components/shared/Icons";
import RelatedSongs from "../../../components/viewComponents/Songs/RelatedSongs";
import SongMediaSection from "../../../components/viewComponents/Songs/SongMediaSection";
import SongLyricsSection from "../../../components/viewComponents/Songs/SongLyricsSection";
import axios from "axios";
import { getGenreMetadata } from "../../../utils/genreMetadata";
import AddToPlaylistModal from "../../../components/features/AddToPlaylist/AddToPlaylistModal";
import "./SongDetails.css";

export default function SongDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success: showSuccess, error: showError } = useToastContext();

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
  const meta = song ? getGenreMetadata(song.genre) : getGenreMetadata();

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

  // Update meta tags for social sharing
  useEffect(() => {
    if (!song) return;

    const siteUrl = window.location.origin;
    const pageUrl = `${siteUrl}/listen/songs/${song._id}`;

    // Update or create Open Graph meta tags
    const updateMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateNameMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Title
    document.title = `${song.title} by BelovedzGuard | BelovedzGaurd Music`;

    // Description
    const description =
      song.description || `Listen to "${song.title}" by BelovedzGuard`;
    updateMetaTag("og:title", song.title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:url", pageUrl);
    updateMetaTag("og:type", "music.song");
    updateMetaTag("og:site_name", "BelovedzGaurd Music");
    if (song.songThumbnail) {
      updateMetaTag("og:image", song.songThumbnail);
    }

    // Twitter card
    updateNameMeta("twitter:card", "summary_large_image");
    updateNameMeta("twitter:title", song.title);
    updateNameMeta("twitter:description", description);
    if (song.songThumbnail) {
      updateNameMeta("twitter:image", song.songThumbnail);
    }

    // Cleanup function
    return () => {
      document.title = "BelovedzGaurd Music";
    };
  }, [song]);

  // Copy link to clipboard
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      showSuccess("Link copied to clipboard!");
      trackUIEvent("Share Song", "Copy Link");
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      showError("Failed to copy link");
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
        <SongMediaSection
          song={song}
          meta={meta}
          onPlay={handlePlay}
          onAddToPlaylist={handleAddToPlaylist}
          onShare={handleShare}
          shareCopied={shareCopied}
        />

        {/* Right Column - Lyrics */}
        <SongLyricsSection lyrics={lyrics} lyricsError={lyricsError} />
      </div>

      {/* Related Songs */}
      <RelatedSongs relatedSongs={relatedSongs} genreLabel={meta.label} />

      {/* External Links */}
      <div className="external-links-section">
        {song.youTube && (
          <a
            href={song.youTube}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link youtube-link"
          >
            <FaYoutube /> Watch on YouTube
          </a>
        )}
        {song.bandcamp && (
          <a
            href={song.bandcamp}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link bandcamp-link"
          >
            <MusicNoteIcon size={16} /> Listen on Bandcamp
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
