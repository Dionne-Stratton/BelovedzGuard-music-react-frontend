import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaYoutube } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useGetSongByIdQuery } from "../../../state/publicApi";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
} from "../../../state/playerSlice";
import { trackUIEvent } from "../../../utils/analytics";
import { MusicNoteIcon } from "../../../components/shared/Icons";
import RelatedSongs from "../../../components/viewComponents/Songs/RelatedSongs";
import SongMediaSection from "../../../components/viewComponents/Songs/SongMediaSection";
import SongLyricsSection from "../../../components/viewComponents/Songs/SongLyricsSection";
import ShareModal from "../../../components/shared/ShareModal";
import axios from "axios";
import { getGenreMetadata } from "../../../utils/genreMetadata";
import AddToPlaylistModal from "../../../components/features/AddToPlaylist/AddToPlaylistModal";
import "./SongDetails.css";

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
  const meta = song ? getGenreMetadata(song.genre) : getGenreMetadata();

  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
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

  // Open share modal
  const handleShare = () => {
    setShowShareModal(true);
    trackUIEvent("Share Song", "Open share modal");
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

  const siteUrl = window.location.origin;
  const pageUrl = `${siteUrl}/listen/songs/${song._id}`;
  const description =
    song.description || `Listen to "${song.title}" by BelovedzGuard`;

  return (
    <>
      <Helmet>
        <title>{`${song.title} by BelovedzGuard | BelovedzGaurd Music`}</title>
        <meta property="og:title" content={song.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="music.song" />
        <meta property="og:site_name" content="BelovedzGaurd Music" />
        {song.songThumbnail && (
          <meta property="og:image" content={song.songThumbnail} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={song.title} />
        <meta name="twitter:description" content={description} />
        {song.songThumbnail && (
          <meta name="twitter:image" content={song.songThumbnail} />
        )}
      </Helmet>
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

        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title={song.title}
          url={window.location.href}
          text={`Check out "${song.title}" by BelovedzGuard`}
        />
      </div>
    </>
  );
}
