import React from "react";

export default function SongInfo({
  currentSong,
  displayLyrics,
  setDisplayLyrics,
  onSongTitleClick,
  onAddToPlaylist,
  trackUIEvent,
}) {
  if (!currentSong) return null;

  return (
    <div className="song-player-thumbnail-title">
      {currentSong.songThumbnail && (
        <img
          src={currentSong.songThumbnail}
          alt={currentSong.title}
          className="song-player-thumbnail"
        />
      )}
      <div className="song-player-title" onClick={onSongTitleClick}>
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
        onClick={onAddToPlaylist}
        title="Add to Playlist"
      >
        + Playlist
      </button>
    </div>
  );
}
