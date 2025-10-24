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
import Contact from "./views/Contact";
import Listen from "./views/listen/Listen";
import SongPlayer from "./components/features/SongPlayer";
import LyricsViewer from "./components/shared/LyricsViewer";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { initAnalytics, trackPageView } from "./utils/analytics";
import {
  useGlobalKeyboard,
  useNavigationKeyboard,
} from "./hooks/useGlobalKeyboard";
import { ToastProvider, useToastContext } from "./contexts/ToastContext";
import ToastContainer from "./components/shared/ToastContainer";

/**
 * Main App component - Root component with routing and global state management
 * Handles analytics initialization, data fetching, and conditional CSS classes
 * @returns {JSX.Element} Main application component
 */
/**
 * Inner App component that uses toast context
 */
function AppContent() {
  const dispatch = useDispatch();
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const { data: songs, error } = useGetSongsQuery();
  const location = useLocation();

  // ✅ Pull player state from Redux (assuming your song player stores this)
  const currentSongId = useSelector((state) => state.player?.currentSongId);

  // Lyrics viewer width state with localStorage persistence
  const [lyricsWidth, setLyricsWidth] = useState(() => {
    const saved = localStorage.getItem("lyricsViewerWidth");
    return saved ? parseInt(saved, 10) : 300;
  });

  // Save lyrics width to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lyricsViewerWidth", lyricsWidth.toString());
    // Update CSS variable for dynamic margin
    document.documentElement.style.setProperty(
      "--lyrics-width",
      `${lyricsWidth}px`
    );
  }, [lyricsWidth]);

  // initialize GA once
  useEffect(() => {
    initAnalytics();
  }, []);

  // send pageview when route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  // scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

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

  // Register global shortcuts following industry standards
  useEffect(() => {
    // Global shortcut to toggle lyrics (Ctrl+L or Cmd+L)
    registerShortcut(
      "ctrl+l",
      () => {
        setDisplayLyrics((prev) => !prev);
      },
      {
        context: "global",
        description: "Toggle lyrics display",
        preventDefault: true,
      }
    );

    registerShortcut(
      "meta+l",
      () => {
        setDisplayLyrics((prev) => !prev);
      },
      {
        context: "global",
        description: "Toggle lyrics display",
        preventDefault: true,
      }
    );

    // Global shortcut for search (/) - industry standard
    registerShortcut(
      "/",
      () => {
        // Focus search if available, otherwise do nothing
        const searchElement = document.querySelector(
          'input[type="search"], input[placeholder*="search" i]'
        );
        if (searchElement) {
          searchElement.focus();
        }
      },
      {
        context: "global",
        description: "Focus search",
        preventDefault: true,
      }
    );

    // Global shortcut for help (?)
    registerShortcut(
      "?",
      () => {
        // Could open help modal or show keyboard shortcuts
        console.log("Keyboard shortcuts help");
      },
      {
        context: "global",
        description: "Show keyboard shortcuts help",
        preventDefault: true,
      }
    );

    // GitHub-style navigation shortcuts
    registerShortcut(
      "g+h",
      () => {
        window.location.href = "/home";
      },
      {
        context: "global",
        description: "Go to Home page",
        preventDefault: true,
      }
    );

    registerShortcut(
      "g+m",
      () => {
        window.location.href = "/listen";
      },
      {
        context: "global",
        description: "Go to Music page",
        preventDefault: true,
      }
    );
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
          style={displayLyrics ? { marginRight: `${lyricsWidth}px` } : {}}
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
              <Route path="/contact" element={<Contact />} />
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
            <LyricsViewer
              setDisplayLyrics={setDisplayLyrics}
              lyricsWidth={lyricsWidth}
              setLyricsWidth={setLyricsWidth}
            />
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
}

/**
 * Main App component with ToastProvider wrapper
 */
export default function App() {
  return (
    <ToastProvider>
      <AppContent />
      <ToastWrapper />
    </ToastProvider>
  );
}

/**
 * Toast wrapper component that uses the toast context
 */
function ToastWrapper() {
  const { toasts, removeToast } = useToastContext();
  return <ToastContainer toasts={toasts} removeToast={removeToast} />;
}
