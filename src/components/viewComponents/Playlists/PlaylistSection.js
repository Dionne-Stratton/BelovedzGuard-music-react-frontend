import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import ThemeDropdown from "../../shared/ThemeDropdown";

// Genre emoji helper
const GENRE_META = {
  Rock: "🎸",
  Pop: "⭐",
  Ballad: "💖",
  Theatrical: "🎭",
  Praise: "❤️‍🔥",
};
const genreIcon = (g) => GENRE_META[g] || "🎶";

// Individual playlist row component
const PlaylistRow = ({ song, index, onRemove }) => (
  <Draggable draggableId={`playlist-${song._id}-${index}`} index={index}>
    {(provided) => (
      <div
        className="pe-song-row"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <img
          src={song.songThumbnail}
          alt={song.title}
          className="pe-thumb"
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
        <span className="pe-title">{song.title}</span>
        <span className="pe-genre">{genreIcon(song.genre)}</span>
        <button
          className="pe-remove"
          title="Remove from playlist"
          onClick={() => onRemove(index)}
        >
          ✖
        </button>
      </div>
    )}
  </Draggable>
);

export default function PlaylistSection({
  name,
  setName,
  error,
  setError,
  theme,
  setTheme,
  markDirty,
  playlistSongs,
  setPlaylistSongs,
  reversePlaylist,
  onCancel,
  onSave,
  savingNew,
  savingEdit,
}) {
  const handleRemoveSong = (index) => {
    setPlaylistSongs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="pe-left-controls">
        {/* 🎵 Playlist name input */}
        <input
          type="text"
          className={`pe-name-input search-bar ${error ? "invalid" : ""}`}
          placeholder="My Playlist"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            markDirty();
            if (error) setError("");
          }}
        />
        {error && <div className="pe-error-text">{error}</div>}

        {/* 🎨 Theme selection */}
        <ThemeDropdown
          theme={theme}
          onSelect={(value) => {
            setTheme(value);
            markDirty();
          }}
        />

        {/* 💾 Action buttons */}
        <div className="pe-actions">
          <button
            className="pe-btn subtle"
            title="Reverse playlist order"
            onClick={reversePlaylist}
          >
            ↕ Reverse
          </button>
          <button className="pe-btn" title="Cancel changes" onClick={onCancel}>
            ✖ Cancel
          </button>
          <button
            className="pe-btn primary"
            title="Save playlist"
            onClick={onSave}
            disabled={savingNew || savingEdit}
          >
            ✔ Save
          </button>
        </div>
      </div>

      <Droppable droppableId="playlist" type="SONG">
        {(provided, snapshot) => (
          <div
            className={`pe-list ${snapshot.isDraggingOver ? "drag-over" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {playlistSongs.length === 0 && (
              <div className="pe-empty">
                Drag songs here to build your playlist
              </div>
            )}
            {playlistSongs.map((song, i) => (
              <PlaylistRow
                key={`playlist-key-${song._id}-${i}`}
                song={song}
                index={i}
                onRemove={handleRemoveSong}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
