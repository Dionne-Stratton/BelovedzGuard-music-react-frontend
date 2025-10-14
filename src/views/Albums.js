// src/views/Albums.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueue, setCurrentSong, setPlaying } from "../state/playerSlice";
import { useGetAlbumsQuery } from "../state/publicApi";
import "../styles/Albums.css";

export default function Albums() {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const [expandedAlbums, setExpandedAlbums] = useState({});
  const { data: albums = [], isLoading, error } = useGetAlbumsQuery();

  useEffect(() => {
    if (albums.length > 0) {
      const expanded = Object.fromEntries(albums.map((a) => [a._id, true]));
      setExpandedAlbums(expanded);
    }
  }, [albums]);

  const inSameAlbumContext = (albumId) =>
    player.context.source === "album" && player.context.sourceId === albumId;

  const playAlbum = (album) => {
    if (!album.songs?.length) return;

    dispatch(
      setQueue({
        songs: album.songs,
        source: "album",
        sourceId: album._id,
      })
    );
    dispatch(setCurrentSong(album.songs[0]._id));
    dispatch(setPlaying(true));
  };

  const playFromSong = (album, songId) => {
    if (!album.songs?.length) return;

    const sameContext = inSameAlbumContext(album._id);
    const sameSong = player.currentSongId === songId;

    if (!sameContext) {
      dispatch(
        setQueue({
          songs: album.songs,
          source: "album",
          sourceId: album._id,
        })
      );
      dispatch(setCurrentSong(songId));
      dispatch(setPlaying(true));
      return;
    }

    if (sameSong) {
      dispatch(setCurrentSong(songId));
      dispatch(setPlaying(true));
      return;
    }

    dispatch(setCurrentSong(songId));
    dispatch(setPlaying(true));
  };

  const toggleAlbum = (id) => {
    setExpandedAlbums((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ---- RENDER ----
  if (isLoading) return <p className="muted">Loading albums...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page-container">
      <h1 className="albums-heading">Albums</h1>

      {albums.length === 0 ? (
        <p className="muted">No albums found.</p>
      ) : (
        <div className="albums-list">
          {albums.map((a) => (
            <div key={a._id} className="album-card">
              <div className="album-header">
                <div className="album-left">
                  <button
                    className="album-toggle"
                    onClick={() => toggleAlbum(a._id)}
                    title={
                      expandedAlbums[a._id]
                        ? "Hide track list"
                        : "Show track list"
                    }
                  >
                    {expandedAlbums[a._id] ? "▼" : "▲"}
                  </button>
                  <div className="album-title">{a.title}</div>
                </div>

                <div className="album-actions">
                  <button
                    className="album-play"
                    onClick={() => playAlbum(a)}
                    disabled={!a.songs?.length}
                    title={a.songs?.length ? "Play album" : "No songs yet"}
                  >
                    ▶ Play Album
                  </button>
                </div>
              </div>

              {expandedAlbums[a._id] &&
                (a.songs?.length === 0 ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="album-tracks">
                    {a.songs.map((t) => (
                      <li
                        key={t._id}
                        className="album-track"
                        onClick={() => playFromSong(a, t._id)}
                      >
                        <img
                          className="track-thumb"
                          src={t.songThumbnail}
                          alt={t.title}
                          onError={(e) =>
                            (e.currentTarget.style.visibility = "hidden")
                          }
                        />
                        <span className="track-title">{t.title}</span>
                        <span>{t.genre}</span>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
