import React from "react";

/**
 * ThemeThumbnail component for showing theme image thumbnails
 * @param {object} props - Component props
 * @param {string} props.image - Path to the theme image
 * @param {string} props.themeName - Name of the theme for alt text
 * @returns {JSX.Element} Theme thumbnail component
 */
export default function ThemeThumbnail({ image, themeName }) {
  if (!image) {
    return null; // No image available
  }

  return (
    <div
      className="theme-thumbnail"
      style={{
        width: "2em",
        height: "2em",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundImage: `url(${image})`,
        backgroundSize: "200% 200%", // Make image larger so we can crop to corner
        backgroundPosition: "bottom right", // Focus on lower-right corner
        backgroundRepeat: "no-repeat",
        flexShrink: 0,
      }}
      title={themeName}
    />
  );
}
