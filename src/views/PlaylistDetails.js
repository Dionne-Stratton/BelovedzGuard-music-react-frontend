import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetPlaylistByIdQuery } from "../state/playlistApi";
import { setQueue, setCurrentSong, setPlaying } from "../state/playerSlice";
import "../styles/PlaylistDetails.css";

export default function PlaylistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

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

  // --- Render ---

  if (isLoading) return <p>Loading playlist...</p>;
  if (!playlist) return <p>Playlist not found.</p>;

  return (
    <div className="playlist-details-container">
      <div className="playlist-header">
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
  );
}
