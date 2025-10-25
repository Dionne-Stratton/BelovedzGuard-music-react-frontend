import React from "react";
import themes from "../../shared/themes";
import { PlayIcon, EditIcon, TrashIcon } from "../../shared/Icons";

export default function PlaylistCard({
  playlist,
  onView,
  onPlay,
  onEdit,
  onDelete,
}) {
  // Look up theme background
  const themeImage = playlist.theme && themes[playlist.theme]?.image;

  return (
    <div
      className="add-pointer playlist-card"
      onClick={() => onView(playlist._id)}
      style={{
        backgroundImage: themeImage ? `url(${themeImage})` : "none",
      }}
    >
      <h3>{playlist.name}</h3>
      <p>
        {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"}
      </p>

      <div className="playlist-buttons" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-button"
          onClick={() => onPlay(playlist)}
          aria-label="Play"
        >
          <span className="tooltip-text">Play</span>
          <PlayIcon size={16} />
        </button>

        <button
          className="icon-button"
          onClick={() => onEdit(playlist._id)}
          aria-label="Edit"
        >
          <span className="tooltip-text">Edit</span>
          <EditIcon size={16} />
        </button>

        <button
          className="icon-button"
          onClick={() => onDelete(playlist._id, playlist.name)}
          aria-label="Delete"
        >
          <span className="tooltip-text">Delete</span>
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
}
