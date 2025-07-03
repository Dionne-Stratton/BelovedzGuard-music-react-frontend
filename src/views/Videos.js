import React, { useState } from "react";
import musicList from "../data/musicList";

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoSongs = musicList.filter((song) => song.videoUrl); // Only include songs with videoUrl

  return (
    <div style={{ paddingBottom: "6rem" }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Videos</h1>

      {/* Video Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {videoSongs.map((song, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              overflow: "hidden",
              transition: "transform 0.2s",
            }}
            onClick={() => setSelectedVideo(song.videoUrl)}
          >
            <img
              src={song.videoThumbnail}
              alt={song.title}
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                backgroundColor: "#413b34",
                color: "#fff",
                padding: "0.5rem",
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              {song.title}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "80%", maxWidth: "800px", aspectRatio: "16/9" }}
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
