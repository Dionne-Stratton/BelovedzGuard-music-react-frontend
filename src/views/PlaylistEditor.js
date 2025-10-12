// src/views/PlaylistEditor.js
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";
import {
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useGetPlaylistsQuery,
} from "../state/playlistApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/PlaylistEditor.css";

/* ---------- Genre emoji ---------- */
const GENRE_META = {
  Rock: "🎸",
  Pop: "⭐",
  Ballad: "💖",
  Theatrical: "🎭",
  Praise: "❤️‍🔥",
};
const genreIcon = (g) => GENRE_META[g] || "🎶";

/* ---- Validation ---- */
const playlistSchema = Yup.object({
  name: Yup.string().trim().required("Title required"),
});

/* ---- Helpers ---- */
function arrayMove(list, from, to) {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export default function PlaylistEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // ✅ Auth0 guard: fully protected page
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/listen/playlists", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const allSongs = useSelector((s) => s.songs);
  const { data: cached = [] } = useGetPlaylistsQuery();

  const existing = useMemo(() => {
    if (!isEdit || !Array.isArray(cached)) return null;
    return cached.find((p) => p._id === id) || null;
  }, [isEdit, id, cached]);

  const [name, setName] = useState(isEdit ? existing?.name || "" : "");
  const [playlistSongs, setPlaylistSongs] = useState(
    isEdit ? existing?.songs || [] : []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");

  const [createPlaylist, { isLoading: savingNew }] =
    useCreatePlaylistMutation();
  const [updatePlaylist, { isLoading: savingEdit }] =
    useUpdatePlaylistMutation();

  /* hydrate edit */
  useEffect(() => {
    if (!isEdit || !existing) return;
    setName(existing.name || "");
    setPlaylistSongs(existing.songs || []);
    setIsDirty(false);
  }, [isEdit, existing]);

  /* available (right) list — newest-first like Songs page */
  const availableSongs = useMemo(() => {
    let list = [...(allSongs || [])];
    if (genreFilter !== "All")
      list = list.filter((s) => s.genre === genreFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.title.toLowerCase().includes(q));
    }
    return list;
  }, [allSongs, genreFilter, searchQuery]);

  /* leave-page guard */
  useEffect(() => {
    const beforeUnload = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [isDirty]);

  const markDirty = useCallback(() => setIsDirty(true), []);

  /* ---- DnD ---- */
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // same spot
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // reorder in playlist
    if (
      source.droppableId === "playlist" &&
      destination.droppableId === "playlist"
    ) {
      setPlaylistSongs((prev) =>
        arrayMove(prev, source.index, destination.index)
      );
      markDirty();
      return;
    }

    // library -> playlist (allow duplicates)
    if (
      source.droppableId === "library" &&
      destination.droppableId === "playlist"
    ) {
      const dragged = availableSongs[source.index];
      if (!dragged) return;
      setPlaylistSongs((prev) => {
        const copy = [...prev];
        copy.splice(destination.index, 0, dragged);
        return copy;
      });
      markDirty();
      return;
    }
  };

  /* actions */
  const reversePlaylist = () => {
    setPlaylistSongs((p) => [...p].reverse());
    markDirty();
  };

  const onCancel = () => {
    navigate("/listen/playlists");
  };

  const onSave = async () => {
    try {
      await playlistSchema.validate({ name }, { abortEarly: false });
      setError("");
    } catch (e) {
      setError(e.errors?.[0] || "Title required");
      return;
    }

    const payload = {
      name: name.trim(),
      songs: playlistSongs.map((s) => s._id), // send IDs only
    };

    try {
      if (isEdit) {
        await updatePlaylist({ id, ...payload }).unwrap();
      } else {
        await createPlaylist(payload).unwrap();
      }
      setIsDirty(false);
      navigate("/listen/playlists");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Could not save playlist. Please try again.");
    }
  };

  // Prevent any UI from flashing while redirecting away
  if (!isLoading && !isAuthenticated) return null;

  /* rows */
  const PlaylistRow = ({ song, index }) => (
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
            onClick={() =>
              setPlaylistSongs((prev) => prev.filter((_, i) => i !== index))
            }
          >
            ✖
          </button>
        </div>
      )}
    </Draggable>
  );

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

  return (
    <div className="pe-page">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="pe-columns">
          {/* LEFT COLUMN — THIS PLAYLIST */}
          <div>
            <h3 className="pe-col-title">This Playlist</h3>

            {/* moved + centered controls for the left side */}
            <div className="pe-left-controls">
              <input
                type="text"
                className={`pe-name-input search-bar ${error ? "invalid" : ""}`}
                placeholder={isEdit ? "Playlist name" : "New playlist name"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsDirty(true);
                  if (error) setError("");
                }}
              />
              {error && <div className="pe-error-text">{error}</div>}

              <div className="pe-actions">
                <button
                  className="pe-btn subtle"
                  title="Reverse playlist order"
                  onClick={reversePlaylist}
                >
                  ↕ Reverse
                </button>

                <button
                  className="pe-btn"
                  title="Cancel changes"
                  onClick={onCancel}
                >
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
                  className={`pe-list ${
                    snapshot.isDraggingOver ? "drag-over" : ""
                  }`}
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
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="pe-divider" />

          {/* RIGHT COLUMN — ALL SONGS */}
          <div>
            <h3 className="pe-col-title">All Songs</h3>

            {/* SWAPPED ORDER: Genre first, then Search (both centered) */}
            <div className="pe-filters">
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="pe-genre-select"
                aria-label="Filter by genre"
              >
                <option value="All">🎶 All Songs</option>
                <option value="Rock">🎸 Rock</option>
                <option value="Pop">⭐ Pop</option>
                <option value="Ballad">💖 Ballad</option>
                <option value="Theatrical">🎭 Theatrical</option>
                <option value="Praise">❤️‍🔥 Praise</option>
              </select>

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
        </div>
      </DragDropContext>
    </div>
  );
}
