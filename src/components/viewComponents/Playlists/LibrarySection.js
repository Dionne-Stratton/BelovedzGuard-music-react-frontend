import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import GenreFilter from "../../shared/GenreFilter";

// Genre emoji helper
const GENRE_META = {
  Rock: "🎸",
  Pop: "⭐",
  Ballad: "💖",
  Theatrical: "🎭",
  Praise: "❤️‍🔥",
};
const genreIcon = (g) => GENRE_META[g] || "🎶";

// Individual library row component
const LibraryRow = ({ song, index }) => (
  <Draggable draggableId={`library-${song._id}-${index}`} index={index}>
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
      </div>
    )}
  </Draggable>
);

export default function LibrarySection({
  genreFilter,
  setGenreFilter,
  searchQuery,
  setSearchQuery,
  availableSongs,
}) {
  return (
    <div>
      <h3 className="pe-col-title">Library</h3>

      <div className="pe-filters">
        <GenreFilter
          value={genreFilter}
          onChange={setGenreFilter}
          className="pe-genre-select"
        />

        <div className="pe-search search-bar">
          <input
            type="text"
            placeholder="Search songs…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search songs"
          />
        </div>
      </div>

      <Droppable droppableId="library" type="SONG" isDropDisabled>
        {(provided) => (
          <div
            className="pe-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {availableSongs.map((song, i) => (
              <LibraryRow
                key={`library-key-${song._id}-${i}`}
                song={song}
                index={i}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
