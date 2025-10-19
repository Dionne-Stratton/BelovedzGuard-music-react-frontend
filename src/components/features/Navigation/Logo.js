// src/components/Logo.js
import React from "react";

export default function Logo() {
  return (
    <div
      id="logo-img"
      style={{
        position: "relative",
        display: "block",
        overflow: "hidden",
        borderRadius: "50%",
        aspectRatio: "1 / 1",
        // Smooth, single curve: no media queries, no snap
        // Max 100px on big screens, linearly down to 80px by ~600px, never smaller than 80px
        width: "clamp(80px, calc(50px + 3vw), 100px)",
        margin: "0 auto",
      }}
    >
      <video
        src="/belovedzguard-logo.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
