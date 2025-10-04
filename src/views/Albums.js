import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueue, setCurrentSong } from "../state/playerSlice";
import "../styles/Albums.css";

// ✅ Your actual album data
const ALBUMS = [
  {
    slug: "jesus",
    title: "Voice of the Groom",
    coverUrl: "",
    tracksById: [
      "68daf89e2e7c477c8a972284",
      "68d74547f3fcd04e78ab11f8",
      "68d74547f3fcd04e78ab11f6",
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    coverUrl: "",
    tracksById: [
      "68d74547f3fcd04e78ab11f9",
      "68d74547f3fcd04e78ab11fa",
      "68d74547f3fcd04e78ab11fb",
    ],
  },
];

export default function Albums() {
  const songs = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  // Build albums-with-tracks (simple id lookup, keep config order)
  const albums = ALBUMS.map((a) => {
    const tracks = [];
    for (const id of a.tracksById) {
      const song = songs.find((s) => s._id === id);
      if (song) tracks.push(song);
    }
    return { ...a, tracks };
  });

  const playAlbum = (album) => {
    if (!album.tracks.length) return;
    dispatch(setQueue(album.tracks));
    dispatch(setCurrentSong(album.tracks[0]._id));
  };

  const playFromSong = (album, songId) => {
    if (!album.tracks.length) return;
    dispatch(setQueue(album.tracks));
    dispatch(setCurrentSong(songId));
  };

  return (
    <div className="page-container">
      <h1 className="albums-heading">Albums</h1>

      {albums.length === 0 ? (
        <p className="muted">No albums configured yet.</p>
      ) : (
        <div className="albums-list">
          {albums.map((a) => (
            <div key={a.slug} className="album-card">
              <div className="album-header">
                <div className="album-title">{a.title}</div>
                <button
                  className="album-play"
                  onClick={() => playAlbum(a)}
                  disabled={!a.tracks.length}
                  title={a.tracks.length ? "Play album" : "No songs yet"}
                >
                  ▶ Play Album
                </button>
              </div>

              {a.tracks.length === 0 ? (
                <div className="album-empty">(No matching songs by ID yet)</div>
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
