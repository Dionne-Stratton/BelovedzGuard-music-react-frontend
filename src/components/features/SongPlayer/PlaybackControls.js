import React from "react";
import { FaStepBackward, FaStepForward, FaPlay, FaPause } from "react-icons/fa";
import { FiShuffle, FiRepeat } from "react-icons/fi";

export default function PlaybackControls({
  shuffle,
  setShuffle,
  repeatOne,
  setRepeatOne,
  globalIsPlaying,
  onPrevSong,
  onNextSong,
  onTogglePlay,
}) {
  return (
    <div className="song-player-controls">
      <FiShuffle
        size={15}
        color={shuffle ? "#ffffff" : "#dedad9"}
        title={shuffle ? "Shuffle On" : "Shuffle Off"}
        onClick={() => setShuffle((s) => !s)}
        className={`drop-shadow-thick add-pointer ${shuffle ? "active" : ""}`}
      />

      <FaStepBackward
        size={18}
        color="#dedad9"
        onClick={onPrevSong}
        className="drop-shadow-thick add-pointer"
      />
      {globalIsPlaying ? (
        <FaPause
          size={20}
          color="#dedad9"
          onClick={onTogglePlay}
          className="drop-shadow-thick add-pointer"
        />
      ) : (
        <FaPlay
          size={20}
          color="#dedad9"
          onClick={onTogglePlay}
          className="drop-shadow-thick add-pointer"
        />
      )}
      <FaStepForward
        size={18}
        color="#dedad9"
        onClick={onNextSong}
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
  );
}
