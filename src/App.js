import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ added useSelector
import { setSongs } from "./state/songsSlice";
import { useGetSongsQuery } from "./state/publicApi";
import { Routes, Route, useLocation } from "react-router-dom";
import HeaderNav from "./components/features/Navigation/HeaderNav";
import Footer from "./components/features/Navigation/Footer";
import Home from "./views/Home";
import About from "./views/About";
import Watch from "./views/Watch";
import Partner from "./views/Partner";
import Listen from "./views/listen/Listen";
import SongPlayer from "./components/features/SongPlayer";
import LyricsViewer from "./components/shared/LyricsViewer";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { initAnalytics, trackPageView } from "./utils/analytics";
import { useGlobalKeyboard, useNavigationKeyboard } from "./hooks/useGlobalKeyboard";

/**
 * Main App component - Root component with routing and global state management
 * Handles analytics initialization, data fetching, and conditional CSS classes
 * @returns {JSX.Element} Main application component
 */
export default function App() {
  const dispatch = useDispatch();
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const { data: songs, error } = useGetSongsQuery();
  const location = useLocation();

  // ✅ Pull player state from Redux (assuming your song player stores this)
  const currentSongId = useSelector((state) => state.player?.currentSongId);

  // initialize GA once
  useEffect(() => {
    initAnalytics();
  }, []);

  // send pageview when route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    if (songs) {
      dispatch(setSongs(songs));
    }
  }, [songs, dispatch]);

  // Set up global keyboard shortcuts
  const { registerShortcut } = useGlobalKeyboard({
    context: "global",
    enabled: true,
  });

  // Set up navigation keyboard shortcuts
  useNavigationKeyboard();

  // Register global shortcuts
  useEffect(() => {
    // Global shortcut to toggle lyrics (L key)
    registerShortcut("l", () => {
      setDisplayLyrics(prev => !prev);
    }, {
      context: "global",
      description: "Toggle lyrics display",
      preventDefault: true,
    });

    // Global shortcut to go home (H key)
    registerShortcut("h", () => {
      window.location.href = "/home";
    }, {
      context: "global", 
      description: "Navigate to home page",
      preventDefault: true,
    });

    // Global shortcut to go to listen page (M key for Music)
    registerShortcut("m", () => {
      window.location.href = "/listen";
    }, {
      context: "global",
      description: "Navigate to music/listen page", 
      preventDefault: true,
    });
  }, [registerShortcut]);

  if (error) console.error("Error fetching songs:", error);
  return (
    <ErrorBoundary>
      <div className="App layout">
        {/* ✅ Add both conditional classes */}
        <div
          className={`content ${displayLyrics ? "with-lyrics" : ""} ${
            currentSongId ? "with-player" : ""
          }`}
        >
          <ErrorBoundary>
            <HeaderNav />
          </ErrorBoundary>

          <ErrorBoundary>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/listen/*" element={<Listen />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </ErrorBoundary>

          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>

          <ErrorBoundary>
            <SongPlayer
              setDisplayLyrics={setDisplayLyrics}
              displayLyrics={displayLyrics}
            />
          </ErrorBoundary>
        </div>

        {displayLyrics && (
          <ErrorBoundary>
            <LyricsViewer setDisplayLyrics={setDisplayLyrics} />
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
}
