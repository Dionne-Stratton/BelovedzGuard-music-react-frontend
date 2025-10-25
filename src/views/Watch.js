import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PlayIcon } from "../components/shared/Icons";
import "./Watch.css";
//get songs from redux

export default function Watch() {
  const songs = useSelector((state) => state.songs);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Only include songs with youTube links
  const videoSongs = songs.filter((song) => song.youTube);

  // Filter by title
  const filteredVideos = videoSongs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="videos">
      {/* Search */}
      <div className="video-search search-bar">
        <input
          type="text"
          placeholder="Search videos by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {filteredVideos.length === 0 ? (
          <div>No videos match “{searchQuery}”.</div>
        ) : (
          filteredVideos.map((song, index) => (
            <div
              key={index}
              className="video-card"
              onClick={() => setSelectedVideo(song.youTube)}
            >
              <div className="thumbnail-wrapper">
                <img
                  src={song.videoThumbnail}
                  alt={song.title}
                  className="video-thumbnail"
                />
                <div className="play-overlay drop-shadow-thick">
                  <PlayIcon size={96} />
                </div>
              </div>
              <div className="video-title">{song.title}</div>
            </div>
          ))
        )}
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
