import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/SongPlayer.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, setPlaying } from "../state/playerSlice";
import { useNavigate } from "react-router-dom";
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { FiShuffle, FiRepeat } from "react-icons/fi";
import { trackSongPlay, trackUIEvent } from "../utils/analytics";
import AddToPlaylistModal from "./AddToPlaylistModal";

export default function SongPlayer({ setDisplayLyrics, displayLyrics }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queue = useSelector((state) => state.player.queue);
  const currentSongId = useSelector((state) => state.player.currentSongId);
  const globalIsPlaying = useSelector((state) => state.player.isPlaying);

  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [repeatOne, setRepeatOne] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playedStack, setPlayedStack] = useState([]);
  const [futureStack, setFutureStack] = useState([]);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

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
    dispatch(setPlaying(!globalIsPlaying));
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
    if (!shuffle) setFutureStack([]);
  }, [shuffle]);

  // 🔄 reset playback history whenever the queue changes
  useEffect(() => {
    setPlayedStack([]);
    setFutureStack([]);
  }, [queue]);

  // keep audio in sync with Redux playback
  useEffect(() => {
    if (!audioRef.current) return;
    if (globalIsPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [globalIsPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);
  };

  const handleEnded = () => {
    if (queue.length === 0 || currentIndex === -1) return;
    if (repeatOne) handleRepeatOne();
    else nextSong();
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

  const handleAddToPlaylist = () => {
    setShowAddToPlaylistModal(true);
    trackUIEvent("Add to Playlist", "Opened from player");
  };

  const handleCloseModal = () => {
    setShowAddToPlaylistModal(false);
  };

  const handleSongTitleClick = () => {
    if (currentSong) {
      navigate(`/songs/${currentSong._id}`);
      trackUIEvent("Navigate to Song Details", "From Player");
    }
  };

  const handlePlay = () => {
    dispatch(setPlaying(true));
    if (currentSong?.title) trackSongPlay(currentSong.title);
  };

  const handlePause = () => {
    dispatch(setPlaying(false));
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
          <div className="song-player-title" onClick={handleSongTitleClick}>
            {currentSong.title}
          </div>
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
          <button
            className="song-player-add-to-playlist-button"
            onClick={handleAddToPlaylist}
            title="Add to Playlist"
          >
            + Add to Playlist
          </button>
        </div>

        <div className="controls-container">
          <div className="song-player-controls">
            <FiShuffle
              size={15}
              color={shuffle ? "#ffffff" : "#dedad9"}
              title={shuffle ? "Shuffle On" : "Shuffle Off"}
              onClick={() => setShuffle((s) => !s)}
              className={`drop-shadow-thick add-pointer ${
                shuffle ? "active" : ""
              }`}
            />

            <FaStepBackward
              size={18}
              color="#dedad9"
              onClick={prevSong}
              className="drop-shadow-thick add-pointer"
            />
            {globalIsPlaying ? (
              <FaPause
                size={20}
                color="#dedad9"
                onClick={togglePlay}
                className="drop-shadow-thick add-pointer"
              />
            ) : (
              <FaPlay
                size={20}
                color="#dedad9"
                onClick={togglePlay}
                className="drop-shadow-thick add-pointer"
              />
            )}
            <FaStepForward
              size={18}
              color="#dedad9"
              onClick={nextSong}
              className="drop-shadow-thick add-pointer"
            />

            <div className="repeat-button-wrapper">
              <FiRepeat
                size={15}
                onClick={() => setRepeatOne((r) => !r)}
                title={repeatOne ? "Repeat One" : "Repeat All"}
                className={`drop-shadow-thick add-pointer ${
                  repeatOne ? "active" : ""
                }`}
              />
              {repeatOne && <span className="repeat-indicator">1</span>}
            </div>
          </div>

          <div className="song-player-volume drop-shadow-thick">
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
        onPause={handlePause}
      />

      <AddToPlaylistModal
        isOpen={showAddToPlaylistModal}
        onClose={handleCloseModal}
        song={currentSong}
      />
    </div>
  );
}
