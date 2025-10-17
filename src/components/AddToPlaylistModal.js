import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetPlaylistsQuery,
  useCreatePlaylistMutation,
  useAddSongToPlaylistMutation,
} from "../state/playlistApi";
import { trackUIEvent } from "../utils/analytics";
import "../styles/AddToPlaylistModal.css";

export default function AddToPlaylistModal({ isOpen, onClose, song }) {
  const { isAuthenticated } = useAuth0();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const { data: playlists = [], isLoading } = useGetPlaylistsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [createPlaylist, { isLoading: creatingPlaylist }] =
    useCreatePlaylistMutation();
  const [addSongToPlaylist, { isLoading: addingSong }] =
    useAddSongToPlaylistMutation();

  const handleAddToExistingPlaylist = async (playlistId) => {
    try {
      await addSongToPlaylist({
        playlistId,
        songId: song._id,
      }).unwrap();

      trackUIEvent("Add to Playlist", "Added to existing playlist", {
        songTitle: song.title,
        playlistId,
      });

      onClose();
    } catch (error) {
      console.error("Failed to add song to playlist:", error);
      alert("Failed to add song to playlist. Please try again.");
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newPlaylistName.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    try {
      // Create new playlist with Faith theme and the current song
      const newPlaylist = await createPlaylist({
        name: newPlaylistName.trim(),
        theme: "Faith",
        songs: [song._id],
      }).unwrap();

      trackUIEvent("Add to Playlist", "Created new playlist", {
        songTitle: song.title,
        playlistName: newPlaylistName,
      });

      onClose();
      setNewPlaylistName("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Failed to create playlist:", error);
      alert("Failed to create playlist. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setShowCreateForm(false);
    setNewPlaylistName("");
  };

  if (!isOpen || !song) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="add-to-playlist-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Add "{song.title}" to Playlist</h3>
          <button className="close-button" onClick={handleClose}>
            ✖
          </button>
        </div>

        <div className="modal-content">
          {!isAuthenticated ? (
            <div className="auth-required">
              <p>Please log in to add songs to playlists.</p>
            </div>
          ) : (
            <>
              {!showCreateForm ? (
                <div className="existing-playlists">
                  <div className="playlist-list">
                    {isLoading ? (
                      <p>Loading playlists...</p>
                    ) : playlists.length === 0 ? (
                      <p className="no-playlists">
                        You don't have any playlists yet.
                      </p>
                    ) : (
                      playlists.map((playlist) => (
                        <div
                          key={playlist._id}
                          className="playlist-item"
                          onClick={() =>
                            handleAddToExistingPlaylist(playlist._id)
                          }
                        >
                          <div className="playlist-info">
                            <h4>{playlist.name}</h4>
                            <p>{playlist.songs?.length || 0} songs</p>
                          </div>
                          <div className="playlist-theme">{playlist.theme}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="modal-actions">
                    <button
                      className="create-new-btn"
                      onClick={() => setShowCreateForm(true)}
                    >
                      Create New Playlist
                    </button>
                  </div>
                </div>
              ) : (
                <div className="create-playlist-form">
                  <div className="form-group">
                    <label htmlFor="playlist-name">Playlist Name</label>
                    <input
                      id="playlist-name"
                      type="text"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="Enter playlist name..."
                      maxLength={50}
                    />
                  </div>

                  <div className="form-info">
                    <p>
                      A new playlist will be created with the "Faith" theme and
                      this song added to it.
                    </p>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="create-btn"
                      onClick={handleCreateAndAdd}
                      disabled={creatingPlaylist || !newPlaylistName.trim()}
                    >
                      {creatingPlaylist ? "Creating..." : "Create & Add"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

