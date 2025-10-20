import React from "react";
import SongThumbnail from "../../shared/SongThumbnail";

export default function SongMediaSection({
  song,
  meta,
  onPlay,
  onAddToPlaylist,
  onShare,
  shareCopied,
}) {
  return (
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
        <button className="play-button" onClick={onPlay}>
          ▶ Play Song
        </button>
        <button className="add-to-playlist-button" onClick={onAddToPlaylist}>
          + Add to Playlist
        </button>
        <button
          className="share-button"
          onClick={onShare}
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
  );
}
