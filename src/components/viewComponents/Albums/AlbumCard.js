import React from "react";
import { PlayIcon, ExpandMoreIcon, ExpandLessIcon } from "../../shared/Icons";

export default function AlbumCard({
  album,
  isExpanded,
  onToggle,
  onPlayAlbum,
  onPlayFromSong,
}) {
  return (
    <div className="album-card">
      <div className="album-header">
        <div className="album-left">
          <button
            className="album-toggle"
            onClick={() => onToggle(album._id)}
            title={isExpanded ? "Hide track list" : "Show track list"}
          >
            {isExpanded ? (
              <ExpandMoreIcon size={20} />
            ) : (
              <ExpandLessIcon size={20} />
            )}
          </button>
          <div className="album-title">{album.title}</div>
        </div>

        <div className="album-actions">
          <button
            className="album-play"
            onClick={() => onPlayAlbum(album)}
            disabled={!album.songs?.length}
            title={album.songs?.length ? "Play album" : "No songs yet"}
          >
            <PlayIcon size={20} /> Play Album
          </button>
        </div>
      </div>

      {isExpanded &&
        (album.songs?.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul className="album-tracks">
            {album.songs.map((track) => (
              <li
                key={track._id}
                className="album-track"
                onClick={() => onPlayFromSong(album, track._id)}
              >
                <img
                  className="track-thumb"
                  src={track.songThumbnail}
                  alt={track.title}
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <span className="track-title">{track.title}</span>
                <span>{track.genre}</span>
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
