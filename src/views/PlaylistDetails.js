import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetPlaylistByIdQuery } from "../state/playlistApi";
import { setQueue, setCurrentSong, setPlaying } from "../state/playerSlice";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/PlaylistDetails.css";
import themes from "../components/shared/themes";

export default function PlaylistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  // Try to find playlist in RTK Query cache first
  const playlists = useSelector((state) => state.playlistApi?.queries);
  const existingPlaylist = useMemo(() => {
    if (!playlists) return null;
    for (const key in playlists) {
      const data = playlists[key]?.data;
      if (Array.isArray(data)) {
        const match = data.find((p) => p._id === id);
        if (match) return match;
      }
    }
    return null;
  }, [playlists, id]);

  // Fetch only if not cached
  const { data: fetchedPlaylist, isLoading } = useGetPlaylistByIdQuery(id, {
    skip: !!existingPlaylist,
  });

  const playlist = existingPlaylist || fetchedPlaylist;
  const theme = themes[playlist?.theme] || themes.Faith;

  // --- Handlers ---

  const handlePlayAll = () => {
    if (!playlist?.songs?.length) return;

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

  const handlePlaySong = (songId) => {
    if (!playlist?.songs?.length) return;

    dispatch(
      setQueue({
        songs: playlist.songs,
        source: "playlist",
        sourceId: playlist._id,
      })
    );

    dispatch(setCurrentSong(songId));
    dispatch(setPlaying(true));
  };

  const handleEdit = () => {
    navigate("edit");
  };

  // --- Render ---

  if (isLoading) return <p>Loading playlist...</p>;
  if (!playlist) return <p>Playlist not found.</p>;

  // Only show edit button if logged in and owner
  const isOwner = isAuthenticated && user && playlist.owner === user.sub;

  return (
    <div className="playlist-details-page">
      {isOwner && (
        <div className="playlist-edit-top">
          <button className="open-editor-btn" onClick={handleEdit}>
            ✏️ Open in Editor
          </button>
        </div>
      )}

      <div
        className="playlist-details-container"
        style={{
          background: theme.gradient, // ← gradient for container
        }}
      >
        <div
          className="playlist-details-header"
          style={{
            backgroundImage: `url(${theme.image})`, // ← header image
          }}
        >
          <h2>{playlist.name}</h2>
          <button className="play-all-btn" onClick={handlePlayAll}>
            ▶ Play All
          </button>
        </div>

        <div className="playlist-song-list">
          {playlist.songs.map((song) => (
            <div key={song._id} className="playlist-song-row">
              <img
                src={song.songThumbnail}
                alt={song.title}
                className="playlist-song-thumb"
              />
              <span className="playlist-song-title">{song.title}</span>
              <span className="playlist-song-genre">{song.genre}</span>
              <button
                className="playlist-song-play"
                onClick={() => handlePlaySong(song._id)}
                title="Play this song"
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
