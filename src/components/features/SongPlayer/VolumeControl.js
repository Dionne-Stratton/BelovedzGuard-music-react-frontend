import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function VolumeControl({ volume, setVolume, audioRef }) {
  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
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
        onChange={handleVolumeChange}
      />
    </div>
  );
}
