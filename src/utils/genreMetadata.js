// src/utils/genreMetadata.js

/**
 * Genre metadata mapping for icons and labels
 * Used across multiple components for consistent genre display
 */

export const GENRE_META = {
  Rock: { icon: "🎸", label: "Rock" },
  Pop: { icon: "⭐", label: "Pop" },
  Ballad: { icon: "💖", label: "Ballad" },
  Theatrical: { icon: "🎭", label: "Theatrical" },
  Praise: { icon: "❤️‍🔥", label: "Praise" },
};

export const DEFAULT_META = { icon: "🎶", label: "Other" };

/**
 * Get genre metadata (icon and label) for a given genre
 * @param {string} genre - The genre name
 * @returns {object} - Object with icon and label properties
 */
export const getGenreMetadata = (genre) => {
  return GENRE_META[genre] || DEFAULT_META;
};

/**
 * Get just the icon for a given genre (for simpler use cases)
 * @param {string} genre - The genre name
 * @returns {string} - The emoji icon
 */
export const getGenreIcon = (genre) => {
  return GENRE_META[genre]?.icon || DEFAULT_META.icon;
};

/**
 * Get just the label for a given genre
 * @param {string} genre - The genre name
 * @returns {string} - The genre label
 */
export const getGenreLabel = (genre) => {
  return GENRE_META[genre]?.label || DEFAULT_META.label;
};
