import React, { useState, useRef, useEffect } from "react";
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { FiShuffle, FiRepeat } from "react-icons/fi";

export default function SongPlayer({ currentIndex, setCurrentIndex, songs }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const currentSong = songs[currentIndex];

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current && currentIndex !== null) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay blocked:", error);
          // You could optionally setIsPlaying(false) here
        });
      }
    }
  }, [currentIndex]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);
  };

  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };

  if (currentIndex === null) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#413b34",
        color: "#fff",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        borderTop: "1px solid #333",
        zIndex: 1000,
        boxShadow: "0 -3px 10px rgba(36, 33, 33, 0.75)",
      }}
    >
      {/* Main control bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Left: Thumbnail + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            minWidth: "200px",
          }}
        >
          {currentSong.thumbnail && (
            <img
              src={currentSong.thumbnail}
              alt={currentSong.title}
              style={{
                width: "66px",
                height: "66px",
                objectFit: "cover",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 1)",
              }}
            />
          )}
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              maxWidth: "18rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
              color: "#dedad9",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
            }}
          >
            {currentSong.title}
          </div>
        </div>

        {/* Center: Controls */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <FiShuffle
            size={15}
            color="#dedad9"
            style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))" }}
          />
          <FaStepBackward
            size={18}
            color="#dedad9"
            onClick={prevSong}
            style={{
              cursor: "pointer",
              filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
            }}
          />
          {isPlaying ? (
            <FaPause
              size={20}
              color="#dedad9"
              onClick={togglePlay}
              style={{
                cursor: "pointer",
                filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
              }}
            />
          ) : (
            <FaPlay
              size={20}
              color="#dedad9"
              onClick={togglePlay}
              style={{
                cursor: "pointer",
                filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
              }}
            />
          )}
          <FaStepForward
            size={18}
            color="#dedad9"
            onClick={nextSong}
            style={{
              cursor: "pointer",
              filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
            }}
          />
          <FiRepeat
            size={15}
            color="#dedad9"
            style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))" }}
          />
        </div>

        {/* Right: Volume */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
          }}
        >
          {volume > 0 ? (
            <FaVolumeUp color="#dedad9" />
          ) : (
            <FaVolumeMute color="#dedad9" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const vol = parseFloat(e.target.value);
              setVolume(vol);
              if (audioRef.current) audioRef.current.volume = vol;
            }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{ marginTop: "0.5rem", display: "flex", alignItems: "center" }}
      >
        <span style={{ fontSize: "0.8rem", marginRight: "0.5rem" }}>
          {formatTime(audioRef.current?.currentTime || 0)}
        </span>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percent = clickX / width;
            const newTime = audioRef.current.duration * percent;
            audioRef.current.currentTime = newTime;
          }}
          style={{
            flexGrow: 1,
            height: "4px",
            background: "#7d7771",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: `${progress}%`,
              background: "#fff",
            }}
          />
        </div>

        <span style={{ fontSize: "0.8rem", marginLeft: "0.5rem" }}>
          {formatTime(audioRef.current?.duration || 0)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
