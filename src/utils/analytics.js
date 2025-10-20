// src/utils/analytics.js
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-LG7QJPHMJY"; // <-- your GA ID here

/**
 * Initialize Google Analytics 4 with the measurement ID
 * Should be called once when the app starts
 */
export function initAnalytics() {
  ReactGA.initialize(MEASUREMENT_ID);
}

/**
 * Track route changes (pageviews) in Google Analytics
 * @param {string} path - The current page path
 */
export function trackPageView(path) {
  ReactGA.send({ hitType: "pageview", page: path });
}

/**
 * Track song play events in Google Analytics
 * @param {string} title - The title of the song being played
 */
export function trackSongPlay(title) {
  ReactGA.event({
    category: "Music",
    action: "Play Song",
    label: title,
  });
}

/**
 * Track support or outbound link clicks in Google Analytics
 * @param {string} label - The label/name of the link being clicked
 */
export function trackLinkClick(label) {
  ReactGA.event({
    category: "Partner Links",
    action: "Click Link",
    label,
  });
}

/**
 * Track general UI interaction events in Google Analytics
 * @param {string} action - The action being performed
 * @param {string} label - Additional label for the action
 */
export function trackUIEvent(action, label) {
  ReactGA.event({
    category: "UI Interaction",
    action,
    label,
  });
}
