import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import GenreFilter from "../../shared/GenreFilter";
import { getGenreIcon } from "../../../utils/genreMetadata";
import { PlusIcon } from "../../shared/Icons";

// Individual library row component
const LibraryRow = ({ song, index, onAdd }) => (
  <Draggable draggableId={`library-${song._id}-${index}`} index={index}>
    {(provided) => (
      <div
        className="pe-song-row library-row"
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
          className="pe-add"
          title="Add to playlist"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(song);
          }}
        >
          <PlusIcon size={16} />
        </button>
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
  onAddSong,
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
                onAdd={onAddSong}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
