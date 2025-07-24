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

export default function SongPlayer({
  currentIndex,
  setCurrentIndex,
  songs,
  setDisplayLyrics,
  displayLyrics,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const currentSong = songs[currentIndex];
  const [repeatOne, setRepeatOne] = useState(false);

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

  const handleRepeatOne = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  if (currentIndex === null) return null;
  return (
    <div className="song-player">
      {/* Main control bar */}
      <div className="song-player-control-bar">
        {/* Left: Thumbnail + Title */}
        <div className="song-player-thumbnail-title">
          {currentSong.thumbnail && (
            <img
              src={currentSong.thumbnail}
              alt={currentSong.title}
              className="song-player-thumbnail"
            />
          )}
          <div className="song-player-title">{currentSong.title}</div>
          <button
            className="song-player-lyrics-button"
            onClick={() => setDisplayLyrics(!displayLyrics)}
          >
            Lyrics
          </button>
        </div>
        <div className="controls-container">
          {/* Center: Controls */}
          <div className="song-player-controls">
            <FiShuffle
              size={15}
              color="#dedad9"
              className="add-drop-shadow-thick add-pointer"
            />
            <FaStepBackward
              size={18}
              color="#dedad9"
              onClick={prevSong}
              className="add-drop-shadow-thick add-pointer"
            />
            {isPlaying ? (
              <FaPause
                size={20}
                color="#dedad9"
                onClick={togglePlay}
                className="add-drop-shadow-thick add-pointer"
              />
            ) : (
              <FaPlay
                size={20}
                color="#dedad9"
                onClick={togglePlay}
                className="add-drop-shadow-thick add-pointer"
              />
            )}
            <FaStepForward
              size={18}
              color="#dedad9"
              onClick={nextSong}
              className="add-drop-shadow-thick add-pointer"
            />
            <div style={{ position: "relative", display: "inline-block" }}>
              <FiRepeat
                size={15}
                onClick={() => setRepeatOne(!repeatOne)}
                title={repeatOne ? "Repeat One" : "Repeat All"}
                className={`add-drop-shadow-thick add-pointer ${
                  repeatOne ? "active" : ""
                }`}
              />
              {repeatOne && (
                <span
                  style={{
                    position: "absolute",
                    top: "-0.4em",
                    right: "-0.4em",
                    fontSize: "0.6em",
                    pointerEvents: "none", // so it doesn’t block clicks
                  }}
                >
                  1
                </span>
              )}
            </div>
          </div>

          {/* Right: Volume */}
          <div className="song-player-volume add-drop-shadow-thick">
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
      </div>

      {/* Progress bar */}
      <div className="song-player-progress-bar">
        <span className="song-player-progress-time">
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
          className="song-player-progress"
        >
          <div
            className="song-player-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="song-player-progress-time">
          {formatTime(audioRef.current?.duration || 0)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={repeatOne ? handleRepeatOne : handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
