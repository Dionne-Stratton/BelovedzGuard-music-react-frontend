import React, { useRef } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import ThemeDropdown from "../../shared/ThemeDropdown";
import Tooltip from "../../shared/Tooltip";
import { getGenreIcon } from "../../../utils/genreMetadata";
import { CloseIcon, CheckIcon } from "../../shared/Icons";

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
        <span className="pe-genre">{getGenreIcon(song.genre)}</span>
        <button
          className="pe-remove"
          title="Remove from playlist"
          onClick={() => onRemove(index)}
        >
          <CloseIcon size={14} />
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
  showWarning,
}) {
  const hasShownLimitWarning = useRef(false);

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
          maxLength={12}
          onChange={(e) => {
            setName(e.target.value);
            markDirty();
            if (error) setError("");
            // Reset warning flag when user deletes characters
            if (e.target.value.length < 12) {
              hasShownLimitWarning.current = false;
            }
          }}
          onKeyDown={(e) => {
            // Show warning when they try to type beyond limit
            if (
              name.length >= 12 &&
              e.key.length === 1 &&
              !hasShownLimitWarning.current
            ) {
              hasShownLimitWarning.current = true;
              if (showWarning) {
                showWarning("Playlist name limited to 12 characters");
              }
            }
          }}
        />
        {error && <div className="pe-error-text">{error}</div>}

        {/* 🎨 Theme selection */}
        <div className="pe-theme-section">
          <ThemeDropdown
            theme={theme}
            onSelect={(value) => {
              setTheme(value);
              markDirty();
            }}
          />
          <Tooltip
            text="Themes control the look of your playlist."
            position="right"
          >
            <span className="pe-theme-help-icon" aria-label="Theme help">
              ?
            </span>
          </Tooltip>
        </div>

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
            <CloseIcon size={14} /> Cancel
          </button>
          <button
            className="pe-btn primary"
            title="Save playlist"
            onClick={onSave}
            disabled={savingNew || savingEdit}
          >
            <CheckIcon size={14} /> Save
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
