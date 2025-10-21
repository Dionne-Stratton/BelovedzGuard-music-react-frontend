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
import { DragDropContext } from "@hello-pangea/dnd";
import { useToastContext } from "../../../contexts/ToastContext";
import ConfirmModal from "../../../components/shared/ConfirmModal";
import "./PlaylistEditor.css";
import PlaylistSection from "../../../components/viewComponents/Playlists/PlaylistSection";
import LibrarySection from "../../../components/viewComponents/Playlists/LibrarySection";

/* ---- Validation ---- */
const playlistSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Title required")
    .max(12, "Title too long, max 12 characters"),
  theme: Yup.string()
    .required("Please choose a theme")
    .notOneOf(["Theme"], "Please choose a theme"),
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
    isEdit ? existing?.theme || "Theme" : "Theme"
  );

  const [createPlaylist, { isLoading: savingNew }] =
    useCreatePlaylistMutation();
  const [updatePlaylist, { isLoading: savingEdit }] =
    useUpdatePlaylistMutation();
  const { error: showError, success: showSuccess } = useToastContext();
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  useEffect(() => {
    if (!isEdit || !existing) return;
    setName(existing.name || "");
    setPlaylistSongs(existing.songs || []);
    setTheme(existing.theme || "Theme");
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

  // Handle unsaved changes when trying to refresh/close browser
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const markDirty = useCallback(() => setIsDirty(true), []);

  // Override navigate to check for unsaved changes
  const navigateWithUnsavedCheck = useCallback(
    (path) => {
      if (isDirty) {
        setShowUnsavedModal(true);
        // Store the navigation path for later use
        setPendingNavigation(() => () => navigate(path));
      } else {
        navigate(path);
      }
    },
    [isDirty, navigate]
  );

  const handleUnsavedConfirm = () => {
    setIsDirty(false);
    setShowUnsavedModal(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    } else {
      navigate("/listen/playlists");
    }
  };

  const handleUnsavedCancel = () => {
    setShowUnsavedModal(false);
    setPendingNavigation(null);
  };

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

  const handleAddSong = (song) => {
    setPlaylistSongs((prev) => [...prev, song]);
    markDirty();
  };

  const onCancel = () => navigateWithUnsavedCheck("/listen/playlists");

  const onSave = async () => {
    try {
      await playlistSchema.validate({ name, theme }, { abortEarly: false });
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
      showSuccess(
        isEdit
          ? "Playlist updated successfully!"
          : "Playlist created successfully!"
      );
      navigate("/listen/playlists");
    } catch (err) {
      console.error("Save failed:", err);
      showError("Could not save playlist. Please try again.");
    }
  };

  if (!isLoading && !isAuthenticated) return null;

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
          <LibrarySection
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            availableSongs={availableSongs}
            onAddSong={handleAddSong}
          />
        </div>
      </DragDropContext>

      {/* Unsaved Changes Confirmation Modal */}
      <ConfirmModal
        isOpen={showUnsavedModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave without saving?"
        onConfirm={handleUnsavedConfirm}
        onCancel={handleUnsavedCancel}
        confirmText="Leave Without Saving"
        cancelText="Continue Editing"
        type="warning"
      />
    </div>
  );
}
