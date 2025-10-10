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
        <button onClick={handleCreate}>+ Create Playlist</button>
      </div>

      {(!playlists || playlists.length === 0) && (
        <p>You have no playlists yet. Create one to get started!</p>
      )}

      <div className="playlist-grid">
        {playlists.map((p) => (
          <div
            key={p._id}
            className="playlist-card"
            onClick={() => handleView(p._id)} // click card to view
          >
            <h3>{p.name}</h3>
            <p>
              {p.songs.length} {p.songs.length === 1 ? "track" : "tracks"}
            </p>

            <div
              className="playlist-buttons"
              onClick={(e) => e.stopPropagation()} // prevent card click
            >
              <button onClick={() => handlePlay(p)}>Play</button>
              <button onClick={() => handleEdit(p._id)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
