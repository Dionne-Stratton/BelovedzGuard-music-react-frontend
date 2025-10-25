import React from "react";
import SongThumbnail from "../../shared/SongThumbnail";
import { PlayIcon, CheckIcon, ShareIcon } from "../../shared/Icons";

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
        <button className="song-control-btn" onClick={onPlay}>
          <PlayIcon size={20} /> Play Song
        </button>
        <button className="song-control-btn" onClick={onAddToPlaylist}>
          + Add to Playlist
        </button>
        <button className="song-control-btn" onClick={onShare}>
          {shareCopied ? (
            <>
              <CheckIcon size={16} /> Copied!
            </>
          ) : (
            <>
              <ShareIcon size={16} /> Share
            </>
          )}
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
