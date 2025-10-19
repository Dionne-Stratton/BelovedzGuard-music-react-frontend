import React from "react";
import { useInView } from "react-intersection-observer";
import SongThumbnail from "../../shared/SongThumbnail";

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

  return (
    <div ref={ref} className="song-card-wrapper">
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
