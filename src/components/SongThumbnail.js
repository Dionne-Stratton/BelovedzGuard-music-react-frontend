// components/SongThumbnail.js
import { useRef, useEffect } from "react";

export default function SongThumbnail({
  title,
  thumbnail,
  animatedThumbnail,
  playOnLoad = false,
  playOnHover = true,
}) {
  const videoRef = useRef(null);

  // Play on load effect
  useEffect(() => {
    if (playOnLoad && animatedThumbnail && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [playOnLoad, animatedThumbnail]);

  const handleEnter = () => {
    if (!playOnHover) return;

    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
        v.play().catch(() => {});
      } catch {}
    }
  };

  const handleLeave = () => {
    if (!playOnHover) return;

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
      onMouseEnter={playOnHover ? handleEnter : undefined}
      onMouseLeave={playOnHover ? handleLeave : undefined}
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
