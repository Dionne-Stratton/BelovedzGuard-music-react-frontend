import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/LyricsViewer.css";

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
        .then((res) => setLyrics(res.data))
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
    <div className="lyrics-viewer">
      <button className="close-btn" onClick={() => setDisplayLyrics(false)}>
        ×
      </button>

      <div className="lyrics-body">
        <h1>{title}</h1>
        {lyrics.split("\n\n").map((stanza, idx) => (
          <p key={idx}>
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
