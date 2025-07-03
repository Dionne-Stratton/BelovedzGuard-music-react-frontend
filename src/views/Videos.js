import React, { useState } from "react";
import musicList from "../data/musicList";

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoSongs = musicList.filter((song) => song.videoUrl); // Only include songs with videoUrl

  return (
    <div className="videos">
      {/* Video Grid */}
      <div className="video-grid">
        {videoSongs.map((song, index) => (
          <div
            key={index}
            className="video-card"
            onClick={() => setSelectedVideo(song.videoUrl)}
          >
            <img
              src={song.videoThumbnail}
              alt={song.title}
              className="video-thumbnail"
            />
            <div className="video-title">{song.title}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div onClick={() => setSelectedVideo(null)} className="video-modal">
          <div
            onClick={(e) => e.stopPropagation()}
            className="video-modal-content"
          >
            <iframe
              width="100%"
              height="100%"
              src={selectedVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
