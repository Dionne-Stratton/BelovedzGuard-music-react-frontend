// src/views/Albums.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueue, setCurrentSong, setPlaying } from "../state/playerSlice";
import "../styles/Albums.css";

const ALBUMS = [
  {
    slug: "jesus",
    title: "Voice of the Groom",
    coverUrl: "",
    tracksById: [
      "68daf89e2e7c477c8a972284",
      "68d74547f3fcd04e78ab11f8",
      "68d74547f3fcd04e78ab11f6",
      "68d74547f3fcd04e78ab11f3",
      "68d74547f3fcd04e78ab11e2",
      "68d74547f3fcd04e78ab11da",
      "68d74547f3fcd04e78ab11d6",
    ],
  },
  {
    slug: "face-to-face",
    title: "Face to Face",
    coverUrl: "",
    tracksById: [
      "68d74547f3fcd04e78ab11f9",
      "68d74547f3fcd04e78ab11f0",
      "68d74547f3fcd04e78ab11e8",
      "68d74547f3fcd04e78ab11c9",
      "68d74547f3fcd04e78ab11f8",
      "68d74547f3fcd04e78ab11da",
      "68d74547f3fcd04e78ab11d5",
      "68d74547f3fcd04e78ab11fd",
    ],
  },
];

export default function Albums() {
  const songs = useSelector((state) => state.songs);
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const [expandedAlbums, setExpandedAlbums] = useState(() =>
    Object.fromEntries(ALBUMS.map((a) => [a.slug, true]))
  );

  const albums = ALBUMS.map((a) => {
    const tracks = a.tracksById
      .map((id) => songs.find((s) => s._id === id))
      .filter(Boolean);
    return { ...a, tracks };
  });

  const inSameAlbumContext = (albumSlug) =>
    player.context.source === "album" && player.context.sourceId === albumSlug;

  const playAlbum = (album) => {
    if (!album.tracks.length) return;

    // Always replace queue to this album context
    dispatch(
      setQueue({
        songs: album.tracks,
        source: "album",
        sourceId: album.slug,
      })
    );
    // Start from the first track
    dispatch(setCurrentSong(album.tracks[0]._id));
    dispatch(setPlaying(true));
  };

  const playFromSong = (album, songId) => {
    if (!album.tracks.length) return;

    const sameContext = inSameAlbumContext(album.slug);
    const sameSong = player.currentSongId === songId;

    if (!sameContext) {
      // New album context: replace queue, start from requested song
      dispatch(
        setQueue({
          songs: album.tracks,
          source: "album",
          sourceId: album.slug,
        })
      );
      dispatch(setCurrentSong(songId));
      dispatch(setPlaying(true));
      return;
    }

    // Same album context
    if (sameSong) {
      // Resume (or restart) this song explicitly
      dispatch(setCurrentSong(songId));
      dispatch(setPlaying(true));
      return;
    }

    // Same album, different track: just switch tracks
    dispatch(setCurrentSong(songId));
    dispatch(setPlaying(true));
  };

  const toggleAlbum = (slug) => {
    setExpandedAlbums((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="page-container">
      <h1 className="albums-heading">Albums</h1>

      {albums.length === 0 ? (
        <p className="muted">Loading...</p>
      ) : (
        <div className="albums-list">
          {albums.map((a) => (
            <div key={a.slug} className="album-card">
              <div className="album-header">
                <div className="album-left">
                  <button
                    className="album-toggle"
                    onClick={() => toggleAlbum(a.slug)}
                    title={
                      expandedAlbums[a.slug]
                        ? "Hide track list"
                        : "Show track list"
                    }
                  >
                    {expandedAlbums[a.slug] ? "▼" : "▲"}
                  </button>
                  <div className="album-title">{a.title}</div>
                </div>

                <div className="album-actions">
                  <button
                    className="album-play"
                    onClick={() => playAlbum(a)}
                    disabled={!a.tracks.length}
                    title={a.tracks.length ? "Play album" : "No songs yet"}
                  >
                    ▶ Play Album
                  </button>
                </div>
              </div>

              {expandedAlbums[a.slug] &&
                (a.tracks.length === 0 ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="album-tracks">
                    {a.tracks.map((t) => (
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
