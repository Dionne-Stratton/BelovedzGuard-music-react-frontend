import React from "react";

export default function ProgressBar({ progress, audioRef, formatTime }) {
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audioRef.current.currentTime = (audioRef.current.duration || 0) * percent;
  };

  return (
    <div className="song-player-progress-bar">
      <span className="song-player-progress-time">
        {formatTime(audioRef.current?.currentTime || 0)}
      </span>
      <div onClick={handleProgressClick} className="song-player-progress">
        <div
          className="song-player-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="song-player-progress-time">
        {formatTime(audioRef.current?.duration || 0)}
      </span>
    </div>
  );
}
