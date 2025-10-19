import React from "react";
import { useNavigate } from "react-router-dom";
import SongThumbnail from "../../shared/SongThumbnail";

export default function RelatedSongs({ relatedSongs, genreLabel }) {
  const navigate = useNavigate();

  if (!relatedSongs || relatedSongs.length === 0) {
    return null;
  }

  return (
    <div className="related-songs-section">
      <h2>More {genreLabel} Songs</h2>
      <div className="related-songs-grid">
        {relatedSongs.map((relatedSong) => (
          <div
            key={relatedSong._id}
            className="related-song-card"
            onClick={() => navigate(`/listen/songs/${relatedSong._id}`)}
          >
            <SongThumbnail
              title={relatedSong.title}
              thumbnail={relatedSong.songThumbnail}
              animatedThumbnail={relatedSong.animatedSongThumbnail}
              playOnHover={true}
            />
            <span className="related-song-title">{relatedSong.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
