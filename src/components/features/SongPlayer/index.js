import React, { useState, useRef, useEffect, useMemo } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, setPlaying } from "../../../state/playerSlice";
import { useNavigate } from "react-router-dom";
import { trackSongPlay, trackUIEvent } from "../../../utils/analytics";
import { usePlayerKeyboard } from "../../../hooks/useGlobalKeyboard";
import AddToPlaylistModal from "../AddToPlaylist/AddToPlaylistModal";
import SongInfo from "./SongInfo";
import PlaybackControls from "./PlaybackControls";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";

/**
 * SongPlayer component - Main music player with controls and queue management
 * @param {object} props - Component props
 * @param {function} props.setDisplayLyrics - Function to toggle lyrics display
 * @param {boolean} props.displayLyrics - Whether lyrics are currently displayed
 * @returns {JSX.Element} Music player component
 */
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

  // Volume control functions for keyboard shortcuts
  const handleVolumeUp = () => {
    setVolume(prev => Math.min(1, prev + 0.1));
  };

  const handleVolumeDown = () => {
    setVolume(prev => Math.max(0, prev - 0.1));
  };

  // Integrate keyboard shortcuts for player controls
  usePlayerKeyboard({
    onPlayPause: togglePlay,
    onNext: nextSong,
    onPrevious: prevSong,
    onVolumeUp: handleVolumeUp,
    onVolumeDown: handleVolumeDown,
    onToggleLyrics: () => setDisplayLyrics(!displayLyrics),
    onClosePlayer: closePlayer,
  });

  const handleAddToPlaylist = () => {
    setShowAddToPlaylistModal(true);
    trackUIEvent("Add to Playlist", "Opened from player");
  };

  const handleCloseModal = () => {
    setShowAddToPlaylistModal(false);
  };

  const handleSongTitleClick = () => {
    if (currentSong) {
      navigate(`/listen/songs/${currentSong._id}`);
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
        <SongInfo
          currentSong={currentSong}
          displayLyrics={displayLyrics}
          setDisplayLyrics={setDisplayLyrics}
          onSongTitleClick={handleSongTitleClick}
          onAddToPlaylist={handleAddToPlaylist}
          trackUIEvent={trackUIEvent}
        />

        <div className="controls-container">
          <PlaybackControls
            shuffle={shuffle}
            setShuffle={setShuffle}
            repeatOne={repeatOne}
            setRepeatOne={setRepeatOne}
            globalIsPlaying={globalIsPlaying}
            onPrevSong={prevSong}
            onNextSong={nextSong}
            onTogglePlay={togglePlay}
          />

          <VolumeControl
            volume={volume}
            setVolume={setVolume}
            audioRef={audioRef}
          />
        </div>
      </div>

      <ProgressBar
        progress={progress}
        audioRef={audioRef}
        formatTime={formatTime}
      />

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
