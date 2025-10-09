// components/SongThumbnail.js
import { useRef } from "react";

export default function SongThumbnail({ title, thumbnail, animatedThumbnail }) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
        v.play().catch(() => {});
      } catch {}
    }
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
    }
  };

  // If there’s no animated thumbnail, just render a normal static image
  if (!animatedThumbnail) {
    return (
      <div
        className="song-thumbnail"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          cursor: "pointer",
          lineHeight: 0,
          width: "100%",
          aspectRatio: "1 / 1",
        }}
      >
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            border: "none",
          }}
        />
      </div>
    );
  }

  // Otherwise, show video only
  return (
    <div
      className="song-thumbnail"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        cursor: "pointer",
        lineHeight: 0,
        width: "100%",
        aspectRatio: "1 / 1",
      }}
    >
      <video
        ref={videoRef}
        src={animatedThumbnail}
        poster={thumbnail} // ensures first frame shows before play
        muted
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          border: "none",
        }}
      />
    </div>
  );
}
