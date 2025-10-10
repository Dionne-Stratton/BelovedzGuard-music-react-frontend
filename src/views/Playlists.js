// src/views/Playlists.js
import React from "react";
import "../styles/Playlists.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetPlaylistsQuery,
  useDeletePlaylistMutation,
} from "../state/playlistApi";
import { setQueue, setCurrentSong } from "../state/playerSlice";

export default function Playlists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: playlists = [], isLoading } = useGetPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();

  const handlePlay = (playlist) => {
    if (!playlist.songs?.length) return;
    dispatch(setQueue(playlist.songs));
    dispatch(setCurrentSong(playlist.songs[0]._id));
  };

  const handleView = (id) => navigate(`/listen/playlists/${id}`);
  const handleEdit = (id) => navigate(`/listen/playlists/${id}/edit`);
  const handleCreate = () => navigate("/listen/playlists/create");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this playlist?")) return;
    try {
      await deletePlaylist(id).unwrap();
    } catch (err) {
      console.error("Failed to delete playlist:", err);
    }
  };

  if (isLoading) return <p>Loading playlists...</p>;

  return (
    <div className="playlists-page">
      <div className="playlist-header">
        <h2>Your Playlists</h2>
        <button
          className="icon-button create-playlist-button"
          onClick={handleCreate}
        >
          <span className="tooltip-text">Create new playlist</span>
          <span className="icon">✚</span>
        </button>
      </div>

      {(!playlists || playlists.length === 0) && (
        <p>You have no playlists yet. Create one to get started!</p>
      )}

      <div className="playlist-grid">
        {playlists.map((p) => (
          <div
            key={p._id}
            className="playlist-card"
            onClick={() => handleView(p._id)}
          >
            <h3>{p.name}</h3>
            <p>
              {p.songs.length} {p.songs.length === 1 ? "song" : "songs"}
            </p>

            <div
              className="playlist-buttons"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="icon-button"
                onClick={() => handlePlay(p)}
                aria-label="Play"
              >
                <span className="tooltip-text">Play</span>
                <span className="icon">►</span>
              </button>

              <button
                className="icon-button"
                onClick={() => handleEdit(p._id)}
                aria-label="Edit"
              >
                <span className="tooltip-text">Edit</span>
                <span className="icon">🖍</span>
              </button>

              <button
                className="icon-button"
                onClick={() => handleDelete(p._id)}
                aria-label="Delete"
              >
                <span className="tooltip-text">Delete</span>
                <span className="icon">🗑</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
