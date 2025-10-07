// src/utils/analytics.js
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-LG7QJPHMJY"; // <-- your GA ID here

export function initAnalytics() {
  ReactGA.initialize(MEASUREMENT_ID);
}

// Track route changes (pageviews)
export function trackPageView(path) {
  ReactGA.send({ hitType: "pageview", page: path });
}

// Track song plays
export function trackSongPlay(title) {
  ReactGA.event({
    category: "Music",
    action: "Play Song",
    label: title,
  });
}

// Track support or outbound link clicks
export function trackLinkClick(label) {
  ReactGA.event({
    category: "Partner Links",
    action: "Click Link",
    label,
  });
}

export function trackUIEvent(action, label) {
  ReactGA.event({
    category: "UI Interaction",
    action,
    label,
  });
}
