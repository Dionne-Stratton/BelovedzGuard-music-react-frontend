import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPlaylistByIdQuery } from "../state/playlistApi";
import { useDispatch } from "react-redux";
import { setQueue, setCurrentSong } from "../state/playerSlice";
import "../styles/PlaylistDetails.css";

export default function PlaylistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // try to find the playlist in redux state first
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

  // only fetch if we don’t already have it
  const { data: fetchedPlaylist, isLoading } = useGetPlaylistByIdQuery(id, {
    skip: !!existingPlaylist,
  });

  const playlist = existingPlaylist || fetchedPlaylist;

  const handlePlayAll = () => {
    if (!playlist?.songs?.length) return;
    dispatch(setQueue(playlist.songs));
    dispatch(setCurrentSong(playlist.songs[0]._id));
  };

  const handlePlaySong = (song) => {
    dispatch(setQueue(playlist.songs));
    dispatch(setCurrentSong(song._id));
  };

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
              onClick={() => handlePlaySong(song)}
            >
              ▶
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
