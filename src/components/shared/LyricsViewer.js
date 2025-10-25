import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CloseIcon } from "./Icons";
import "./LyricsViewer.css";

const LyricsViewer = ({ setDisplayLyrics, lyricsWidth, setLyricsWidth }) => {
  const songs = useSelector((state) => state.songs);
  const currentSongId = useSelector((state) => state.player.currentSongId);

  const [lyrics, setLyrics] = useState("loading...");
  const [title, setTitle] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  useEffect(() => {
    if (!currentSongId) return;

    const song = songs.find((song) => song._id === currentSongId);
    if (!song) return;

    setTitle(song.title);

    if (song.lyrics) {
      axios
        .get(song.lyrics, { responseType: "text" })
        .then((res) => setLyrics(res.data))
        .catch((err) => {
          console.error("Error fetching lyrics:", err);
          setLyrics("Failed to load lyrics.");
        });
    } else {
      setLyrics("");
    }
  }, [currentSongId, songs]);

  // Handle resize start
  const handleMouseDown = (e) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = lyricsWidth;
    e.preventDefault();
  };

  // Handle window resize - adjust lyrics width if it's outside new constraints
  useEffect(() => {
    let resizeTimeout;
    const handleWindowResize = () => {
      // Debounce resize events to prevent excessive re-renders
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const maxWidth = window.innerWidth * 0.3; // 30% of viewport
        const minWidth = 200; // Hard minimum

        setLyricsWidth((currentWidth) => {
          // Only update if current width is ACTUALLY outside constraints
          const needsAdjustment =
            currentWidth > maxWidth || currentWidth < minWidth;
          if (!needsAdjustment) return currentWidth; // No change, prevent re-render

          if (currentWidth > maxWidth) return maxWidth;
          if (currentWidth < minWidth) return minWidth;
          return currentWidth;
        });
      }, 300); // Wait 300ms after resize stops
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      clearTimeout(resizeTimeout);
    };
  }, [setLyricsWidth]);

  // Handle resize during drag
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaX = startXRef.current - e.clientX; // Inverted: dragging left increases width
      const newWidth = startWidthRef.current + deltaX;
      const maxWidth = window.innerWidth * 0.3; // 30% of viewport
      const minWidth = 200; // Hard minimum

      const clampedWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      setLyricsWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, setLyricsWidth]);

  if (!currentSongId) return null;

  return (
    <div className="lyrics-viewer" style={{ width: `${lyricsWidth}px` }}>
      <div
        className="resize-handle"
        onMouseDown={handleMouseDown}
        style={{ cursor: isResizing ? "col-resize" : "col-resize" }}
      />

      <button className="close-btn" onClick={() => setDisplayLyrics(false)}>
        <CloseIcon size={20} />
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
