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
          height: "auto",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}
