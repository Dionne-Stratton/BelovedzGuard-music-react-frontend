// src/components/shared/colors.js
const colors = {
  // --- Core background / surface tones ---
  background: "#ebe7e2", // light parchment tone (seen on text and buttons)
  backgroundBody: "#7d7771", // main body background
  backgroundNav: "#e8e8e8", // navigation background
  backgroundSearch: "#e7e5e5", // search bar background
  cardBorder: "rgba(0, 0, 0, 0.25)",
  cardShadow: "rgba(0, 0, 0, 0.35)",

  // --- Header / player backgrounds ---
  header: "#5f5953", // album header / dropdown menu
  headerContainer: "#7d7771", // header container bg
  playerBg: "#413b34", // persistent song player
  playerActive: "#41321f", // active player control
  playerAccent: "#7d7771", // progress bar background
  footerBg: "#7d7771", // footer background

  // --- Text colors ---
  textPrimary: "#f0f0f0", // general text over dark backgrounds
  textSecondary: "#dedad9", // secondary text
  textTitle: "#ebe7e2", // titles, like song-player-title
  textLight: "#f0eae3", // very light text
  textNav: "#978080", // navigation link color
  textNavHover: "#787777", // navigation underline color

  // --- Button & control colors ---
  buttonBg: "#52504e",
  buttonHoverBg: "#6a6763", // hover variation
  buttonHoverAlt: "#6b6966", // alternative hover
  buttonText: "#ebe7e2",
  buttonBorder: "rgba(255, 255, 255, 0.25)",
  buttonFooter: "#e8e8e8",
  buttonFooterHover: "#a5a09b",

  // --- Borders & lines ---
  borderLight: "rgba(0, 0, 0, 0.2)",
  borderDark: "#333",
  borderNav: "#635e57",
  borderSearch: "#635f5f",
  borderSearchLight: "#ccc",

  // --- Highlights (for hover / focus) ---
  hoverLight: "rgba(255, 255, 255, 0.14)",
  hoverDark: "rgba(255, 255, 255, 0.06)",

  // --- Card / component specific ---
  cardGradientStart: "#4c4740",
  cardGradientEnd: "#635e57",
  cardHover: "#5c554c",
  cardHoverAlt: "#5a524a",

  // --- Utility ---
  white: "#ffffff",
  black: "#000000",
  error: "#e74c3c", // error text
  rangeTrack: "#444",
  rangeThumb: "#fff",
  rangeBorder: "#888",
  rangeTrackAlt: "#7a6969",

  // --- Dropdown menu ---
  dropdownBg: "#5f5953",
  dropdownBorder: "rgba(255, 255, 255, 0.25)",

  // --- Active state colors ---
  activeBg: "#a5a09b", // nav active bg
  activeText: "#fff", // active nav text
};

export default colors;
