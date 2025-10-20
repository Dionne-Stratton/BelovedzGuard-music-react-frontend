import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import SongThumbnail from "../../shared/SongThumbnail";
import { trackUIEvent } from "../../../utils/analytics";

export default function SongCard({
  song,
  meta,
  onClick,
  onAddToPlaylist,
  onTitleClick,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  const [shareCopied, setShareCopied] = useState(false);

  // Copy link to clipboard
  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      const songUrl = `${window.location.origin}/listen/songs/${song._id}`;
      await navigator.clipboard.writeText(songUrl);
      setShareCopied(true);
      trackUIEvent("Share Song", "Copy Link");
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div ref={ref} className="song-card-wrapper">
      {inView ? (
        <div className="song-card">
          <div className="genre-icon">
            {meta.icon}
            <div className="tooltip">{meta.label}</div>
          </div>

          <div className="thumbnail-wrapper" onClick={onClick}>
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
              + Playlist
            </button>
            <button
              className="song-share-button"
              onClick={handleShare}
              title="Share"
            >
              {shareCopied ? "✓" : "🔗"}
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
