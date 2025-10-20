import React from "react";

export default function SongLyricsSection({ lyrics, lyricsError }) {
  return (
    <div className="song-lyrics-section">
      <h2>Lyrics</h2>
      <div className="lyrics-content">
        {lyrics === "loading..." ? (
          <p className="lyrics-loading">Loading lyrics...</p>
        ) : lyricsError ? (
          <p className="lyrics-error">Failed to load lyrics.</p>
        ) : lyrics ? (
          <div className="lyrics-text">
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
        ) : (
          <p className="no-lyrics">Lyrics not available for this song.</p>
        )}
      </div>
    </div>
  );
}
