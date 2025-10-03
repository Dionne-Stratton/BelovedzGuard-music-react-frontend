import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const LyricsViewer = ({ setDisplayLyrics }) => {
  const songs = useSelector((state) => state.songs);
  const currentSongId = useSelector((state) => state.player.currentSongId);

  const [lyrics, setLyrics] = useState("loading...");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!currentSongId) return;

    const song = songs.find((song) => song._id === currentSongId);
    if (!song) return;

    setTitle(song.title);

    if (song.lyrics) {
      axios
        .get(song.lyrics) // expects a text file URL
        .then((res) => {
          setLyrics(res.data);
        })
        .catch((err) => {
          console.error("Error fetching lyrics:", err);
          setLyrics("Failed to load lyrics.");
        });
    } else {
      setLyrics("");
    }
  }, [currentSongId, songs]);

  if (!currentSongId) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100%",
        backgroundColor: "#413b34",
        color: "white",
        padding: "1rem",
        boxShadow: "0 0 10px rgba(18, 17, 17, 0.88)",
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      <button
        onClick={() => setDisplayLyrics(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <div style={{ marginTop: "2rem", fontSize: "1rem", lineHeight: "1.6" }}>
        <h1>{title}</h1>
        {lyrics.split("\n\n").map((stanza, idx) => (
          <p key={idx} style={{ marginBottom: "1rem" }}>
            {stanza.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LyricsViewer;
