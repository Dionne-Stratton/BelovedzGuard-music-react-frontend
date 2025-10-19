// src/views/Playlists.js
import React from "react";
import "./Playlists.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetPlaylistsQuery,
  useDeletePlaylistMutation,
} from "../../../state/playlistApi";
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this playlist?")) return;
    try {
      await deletePlaylist(id).unwrap();
    } catch (err) {
      console.error("Failed to delete playlist:", err);
    }
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
    </div>
  );
}
