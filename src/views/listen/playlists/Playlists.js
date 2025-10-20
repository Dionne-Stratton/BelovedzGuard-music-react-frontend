// src/views/Playlists.js
import React, { useState } from "react";
import "./Playlists.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetPlaylistsQuery,
  useDeletePlaylistMutation,
} from "../../../state/playlistApi";
import { useToastContext } from "../../../contexts/ToastContext";
import ConfirmModal from "../../../components/shared/ConfirmModal";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
} from "../../../state/playerSlice";
import PlaylistCard from "../../../components/viewComponents/Playlists/PlaylistCard";

export default function Playlists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const { data: playlists = [], isLoading: playlistsLoading } =
    useGetPlaylistsQuery(undefined, {
      skip: !isAuthenticated || authLoading,
    });

  const [deletePlaylist] = useDeletePlaylistMutation();
  const { success: showSuccess, error: showError } = useToastContext();
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    playlistId: null,
    playlistName: "",
  });

  const handlePlay = (playlist) => {
    if (!playlist.songs?.length) return;
    dispatch(
      setQueue({
        songs: playlist.songs,
        source: "playlist",
        sourceId: playlist._id,
      })
    );
    dispatch(setCurrentSong(playlist.songs[0]._id));
    dispatch(setPlaying(true));
  };

  const handleView = (id) => navigate(`/listen/playlists/${id}`);
  const handleEdit = (id) => navigate(`/listen/playlists/${id}/edit`);
  const handleCreate = () => navigate("/listen/playlists/create");

  const handleDelete = (id, name) => {
    setConfirmDelete({ isOpen: true, playlistId: id, playlistName: name });
  };

  const confirmDeletePlaylist = async () => {
    try {
      await deletePlaylist(confirmDelete.playlistId).unwrap();
      showSuccess(
        `Playlist "${confirmDelete.playlistName}" deleted successfully`
      );
      setConfirmDelete({ isOpen: false, playlistId: null, playlistName: "" });
    } catch (err) {
      console.error("Failed to delete playlist:", err);
      showError("Failed to delete playlist. Please try again.");
      setConfirmDelete({ isOpen: false, playlistId: null, playlistName: "" });
    }
  };

  const cancelDelete = () => {
    setConfirmDelete({ isOpen: false, playlistId: null, playlistName: "" });
  };

  if (!isAuthenticated && !authLoading) {
    return (
      <div className="playlists-page">
        <h2>Your Playlists</h2>
        <p>You need to log in or register to create and manage playlists.</p>
      </div>
    );
  }

  if (authLoading || playlistsLoading)
    return <p className="playlists-page">Loading playlists...</p>;

  return (
    <div className="playlists-page">
      <div className="playlist-header">
        <h2>Your Playlists</h2>
        {isAuthenticated && (
          <button className="create-playlist-button" onClick={handleCreate}>
            <span>✚ Create Playlist</span>
          </button>
        )}
      </div>

      {(!playlists || playlists.length === 0) && (
        <p>You have no playlists yet. Create one to get started!</p>
      )}

      <div className="playlists-list">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
            onView={handleView}
            onPlay={handlePlay}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title="Delete Playlist"
        message={`Are you sure you want to delete "${confirmDelete.playlistName}"? This action cannot be undone.`}
        onConfirm={confirmDeletePlaylist}
        onCancel={cancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
