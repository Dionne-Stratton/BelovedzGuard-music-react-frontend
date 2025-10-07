import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/SongPlayer.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong } from "../state/playerSlice";
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { FiShuffle, FiRepeat } from "react-icons/fi";

// ✅ import analytics
import { trackSongPlay } from "../utils/analytics";
import { trackUIEvent } from "../utils/analytics";

export default function SongPlayer({ setDisplayLyrics, displayLyrics }) {
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.player.queue);
  const currentSongId = useSelector((state) => state.player.currentSongId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [repeatOne, setRepeatOne] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [playedStack, setPlayedStack] = useState([]);
  const [futureStack, setFutureStack] = useState([]);

  const audioRef = useRef(null);
  const navRef = useRef(null);
  const prevIdRef = useRef(null);

  const currentSong = queue.find((song) => song._id === currentSongId);
  const currentIndex = useMemo(
    () => queue.findIndex((song) => song._id === currentSongId),
    [queue, currentSongId]
  );

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const m = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const getRandomIndex = () => {
    if (queue.length <= 1) return currentIndex;
    let idx;
    do {
      idx = Math.floor(Math.random() * queue.length);
    } while (idx === currentIndex);
    return idx;
  };

  const nextSong = () => {
    if (queue.length === 0 || currentIndex === -1) return;
    navRef.current = "next";

    if (futureStack.length > 0) {
      const nextId = futureStack[futureStack.length - 1];
      setFutureStack((f) => f.slice(0, -1));
      setPlayedStack((p) => [...p, currentSongId]);
      dispatch(setCurrentSong(nextId));
      return;
    }

    const nextIndex = shuffle
      ? getRandomIndex()
      : (currentIndex + 1) % queue.length;
    setPlayedStack((p) => [...p, currentSongId]);
    dispatch(setCurrentSong(queue[nextIndex]._id));
  };

  const prevSong = () => {
    if (queue.length === 0 || currentIndex === -1) return;

    if (playedStack.length > 0) {
      navRef.current = "prev";
      const prevId = playedStack[playedStack.length - 1];
      setPlayedStack((p) => p.slice(0, -1));
      setFutureStack((f) => [...f, currentSongId]);
      dispatch(setCurrentSong(prevId));
      return;
    }

    navRef.current = "prev";
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setFutureStack((f) => [...f, currentSongId]);
    dispatch(setCurrentSong(queue[prevIndex]._id));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
  };

  useEffect(() => {
    if (audioRef.current && currentSongId !== null) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.log("Autoplay blocked:", e));
      }
    }
  }, [currentSongId]);

  useEffect(() => {
    if (prevIdRef.current !== null && navRef.current === null) {
      setFutureStack([]);
    }
    prevIdRef.current = currentSongId;
    navRef.current = null;
  }, [currentSongId]);

  useEffect(() => {
    if (!shuffle) {
      setFutureStack([]);
    }
  }, [shuffle]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);
  };

  const handleEnded = () => {
    if (queue.length === 0 || currentIndex === -1) return;
    if (repeatOne) {
      handleRepeatOne();
    } else {
      nextSong();
    }
  };

  const handleRepeatOne = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const closePlayer = () => {
    dispatch(setCurrentSong(null));
    setDisplayLyrics(false);
  };

  // ✅ NEW: Track song plays when playback actually starts
  const handlePlay = () => {
    setIsPlaying(true);
    if (currentSong?.title) {
      trackSongPlay(currentSong.title);
    }
  };

  if (currentSongId === null || !currentSong) return null;

  return (
    <div
      className="song-player"
      style={displayLyrics ? { width: "calc(100% - 300px)" } : {}}
    >
      <button onClick={closePlayer} className="close-player-button">
        ✖
      </button>

      <div
        className={`song-player-control-bar ${
          displayLyrics ? "with-lyrics" : ""
        }`}
      >
        <div className="song-player-thumbnail-title">
          {currentSong.songThumbnail && (
            <img
              src={currentSong.songThumbnail}
              alt={currentSong.title}
              className="song-player-thumbnail"
            />
          )}
          <div className="song-player-title">{currentSong.title}</div>
          <button
            className="song-player-lyrics-button"
            onClick={() => {
              const newState = !displayLyrics;
              setDisplayLyrics(newState);
              trackUIEvent("Lyrics Toggle", newState ? "Opened" : "Closed");
            }}
          >
            Lyrics
          </button>
        </div>

        <div className="controls-container">
          <div className="song-player-controls">
            <FiShuffle
              size={15}
              color={shuffle ? "#ffffff" : "#dedad9"}
              title={shuffle ? "Shuffle On" : "Shuffle Off"}
              onClick={() => setShuffle((s) => !s)}
              className={`add-drop-shadow-thick add-pointer ${
                shuffle ? "active" : ""
              }`}
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

            <div className="repeat-button-wrapper">
              <FiRepeat
                size={15}
                onClick={() => setRepeatOne((r) => !r)}
                title={repeatOne ? "Repeat One" : "Repeat All"}
                className={`add-drop-shadow-thick add-pointer ${
                  repeatOne ? "active" : ""
                }`}
              />
              {repeatOne && <span className="repeat-indicator">1</span>}
            </div>
          </div>

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

      <div className="song-player-progress-bar">
        <span className="song-player-progress-time">
          {formatTime(audioRef.current?.currentTime || 0)}
        </span>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = clickX / rect.width;
            audioRef.current.currentTime =
              (audioRef.current.duration || 0) * percent;
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
        src={currentSong.mp3}
        type="audio/mpeg"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
