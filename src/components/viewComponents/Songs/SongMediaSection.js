import React from "react";
import SongThumbnail from "../../shared/SongThumbnail";
import { PlayIcon, ShareIcon } from "../../shared/Icons";

export default function SongMediaSection({
  song,
  meta,
  onPlay,
  onAddToPlaylist,
  onShare,
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
          <ShareIcon size={16} /> Share
        </button>
      </div>

      {/* Description and Verse */}
      {(song.description || song.verse) && (
        <div className="song-media-description-verse">
          {song.description && (
            <p className="song-media-description">{song.description}</p>
          )}
          {song.verse && (
            <>
              {(() => {
                // Use regex to split on hyphen with optional spaces
                const match = song.verse.match(/^(.+?)\s*-\s*(.+)$/);
                if (match) {
                  const verseText = match[1].trim();
                  const reference = match[2].trim();
                  return (
                    <div className="song-media-verse-container">
                      <p className="song-media-verse-text">{verseText}</p>
                      <p className="song-media-verse-reference">
                        - {reference}
                      </p>
                    </div>
                  );
                } else {
                  // If no separator found, just display the verse as is
                  return (
                    <div className="song-media-verse-container">
                      <p className="song-media-verse-text">{song.verse}</p>
                    </div>
                  );
                }
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}
