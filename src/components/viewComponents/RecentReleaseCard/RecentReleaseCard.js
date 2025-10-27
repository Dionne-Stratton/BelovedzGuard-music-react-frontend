import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
} from "../../../state/playerSlice";
import SongThumbnail from "../../shared/SongThumbnail";
import { PlayIcon, ShareIcon, HeadphonesIcon } from "../../shared/Icons";
import { getGenreMetadata } from "../../../utils/genreMetadata";
import { trackUIEvent } from "../../../utils/analytics";
import { useToastContext } from "../../../contexts/ToastContext";
import RecentReleasesCarousel from "./RecentReleasesCarousel";
import "./RecentReleaseCard.css";

/**
 * RecentReleaseCard - Featured card for the most recent song release
 * @param {Object} song - The most recent song object
 * @param {Array} allSongs - All songs to queue when playing
 */
export default function RecentReleaseCard({ song, allSongs }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success: showSuccess, error: showError } = useToastContext();
  const [shareCopied, setShareCopied] = React.useState(false);

  if (!song) return null;

  const handlePlay = () => {
    // Load only first 6 songs into player queue and start with the first (most recent)
    const recentSongs = allSongs.slice(0, 6);
    dispatch(
      setQueue({
        songs: recentSongs,
        source: "recent-releases",
        sourceId: null,
      })
    );
    dispatch(setCurrentSong(song._id));
    dispatch(setPlaying(true));
    trackUIEvent("Recent Release", "Play recent releases showcase", {
      songTitle: song.title,
    });
  };

  const handleThumbnailClick = () => {
    // Same as handlePlay - clicking thumbnail plays all songs
    handlePlay();
  };

  const handleMoreClick = () => {
    // Navigate to song details page
    navigate(`/listen/songs/${song._id}`);
    trackUIEvent("Recent Release", "View song details", {
      songTitle: song.title,
    });
  };

  const handleDiscoverClick = () => {
    // Navigate to songs list page
    navigate("/listen/songs");
    trackUIEvent("Recent Release", "Discover more songs");
  };

  const handleShare = async () => {
    const shareData = {
      title: song.title,
      text: `Check out "${song.title}" by BelovedzGuard`,
      url: `${window.location.origin}/listen/songs/${song._id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        trackUIEvent("Recent Release", "Shared song", {
          songTitle: song.title,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        setShareCopied(true);
        showSuccess("Link copied to clipboard!");
        trackUIEvent("Recent Release", "Copied song link", {
          songTitle: song.title,
        });
        setTimeout(() => setShareCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
      showError("Failed to share song");
    }
  };

  const genreData = getGenreMetadata(song.genre);

  return (
    <>
      <div className="recent-release-card">
        <div className="recent-release-header">
          <span className="recent-release-badge drop-shadow-thick">
            ✨ New Release!
          </span>
        </div>

        <div className="recent-release-content">
          {/* Left side: Animated thumbnail */}
          <div
            className="recent-release-thumbnail thumbnail-wrapper drop-shadow-thick"
            onClick={handleThumbnailClick}
          >
            <div className="play-overlay">
              <HeadphonesIcon size={60} />
            </div>
            <SongThumbnail
              title={song.title}
              thumbnail={song.songThumbnail}
              animatedThumbnail={song.animatedSongThumbnail}
              playOnLoad={true}
              playOnHover={true}
            />
          </div>

          {/* Right side: Song info and actions */}
          <div className="recent-release-info">
            <h3 className="recent-release-title" onClick={handleMoreClick}>
              {song.title}
            </h3>

            <div className="recent-release-genre-info">
              <span className="recent-release-genre-icon">
                {genreData.icon}
              </span>
              <span className="recent-release-genre-label">
                {genreData.label}
              </span>
            </div>

            {/* Description */}
            {song.description && (
              <p className="recent-release-description">{song.description}</p>
            )}

            {/* Scripture verse */}
            {song.verse && (
              <p className="recent-release-scripture">{song.verse}</p>
            )}

            {/* Action buttons */}
            <div className="recent-release-actions">
              <button
                className="rr-btn rr-btn-primary drop-shadow-thick"
                onClick={handlePlay}
                title="Play recent releases showcase"
              >
                <PlayIcon size={18} />
              </button>
              <button
                className="rr-btn rr-btn-secondary drop-shadow-thick"
                onClick={handleMoreClick}
              >
                More
              </button>
              <button
                className="rr-btn rr-btn-icon drop-shadow-thick"
                onClick={handleShare}
                title="Share"
              >
                {shareCopied ? "✓" : <ShareIcon size={18} />}
              </button>
              <button
                className="rr-btn rr-btn-secondary drop-shadow-thick"
                onClick={handleDiscoverClick}
              >
                Discover
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Releases Carousel */}
      <RecentReleasesCarousel songs={allSongs} />
    </>
  );
}
