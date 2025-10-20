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
} from "../../../state/playlistApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./PlaylistEditor.css";
import GenreFilter from "../../../components/shared/GenreFilter";
import PlaylistSection from "../../../components/viewComponents/Playlists/PlaylistSection";

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
  name: Yup.string()
    .trim()
    .required("Title required")
    .max(12, "Title too long, max 12 characters"),
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

  // ✅ new state for theme selection
  const [theme, setTheme] = useState(
    isEdit ? existing?.theme || "Faith" : "Faith"
  );

  const [createPlaylist, { isLoading: savingNew }] =
    useCreatePlaylistMutation();
  const [updatePlaylist, { isLoading: savingEdit }] =
    useUpdatePlaylistMutation();

  useEffect(() => {
    if (!isEdit || !existing) return;
    setName(existing.name || "");
    setPlaylistSongs(existing.songs || []);
    setTheme(existing.theme || "Faith");
    setIsDirty(false);
  }, [isEdit, existing]);

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
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

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
    }
  };

  const reversePlaylist = () => {
    setPlaylistSongs((p) => [...p].reverse());
    markDirty();
  };

  const onCancel = () => navigate("/listen/playlists");

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
      songs: playlistSongs.map((s) => s._id),
      theme, // ✅ include selected theme
    };

    try {
      if (isEdit) await updatePlaylist({ id, ...payload }).unwrap();
      else await createPlaylist(payload).unwrap();

      setIsDirty(false);
      navigate("/listen/playlists");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Could not save playlist. Please try again.");
    }
  };

  if (!isLoading && !isAuthenticated) return null;

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
          <PlaylistSection
            name={name}
            setName={setName}
            error={error}
            setError={setError}
            theme={theme}
            setTheme={setTheme}
            markDirty={markDirty}
            playlistSongs={playlistSongs}
            setPlaylistSongs={setPlaylistSongs}
            reversePlaylist={reversePlaylist}
            onCancel={onCancel}
            onSave={onSave}
            savingNew={savingNew}
            savingEdit={savingEdit}
          />

          <div className="pe-divider" />

          {/* RIGHT COLUMN — LIBRARY */}
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
        </div>
      </DragDropContext>
    </div>
  );
}
