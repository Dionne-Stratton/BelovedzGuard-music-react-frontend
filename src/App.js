import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ added useSelector
import { setSongs } from "./state/songsSlice";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Home from "./views/Home";
import About from "./views/About";
import Watch from "./views/Watch";
import Partner from "./views/Partner";
import Listen from "./views/Listen";
import SongPlayer from "./components/SongPlayer";
import LyricsViewer from "./components/LyricsViewer";
import { initAnalytics, trackPageView } from "./utils/analytics";

export default function App() {
  const dispatch = useDispatch();
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const API_URL = process.env.REACT_APP_PRODUCTION_SERVER_URL + "/public/songs";
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
    axios
      .get(API_URL)
      .then((res) => dispatch(setSongs(res.data)))
      .catch((err) => console.error("Error fetching songs:", err));
  }, [dispatch, API_URL]);

  return (
    <div className="App layout">
      {/* ✅ Add both conditional classes */}
      <div
        className={`content ${displayLyrics ? "with-lyrics" : ""} ${
          currentSongId ? "with-player" : ""
        }`}
      >
        <HeaderNav />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/listen/*" element={<Listen />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />

        <SongPlayer
          setDisplayLyrics={setDisplayLyrics}
          displayLyrics={displayLyrics}
        />
      </div>

      {displayLyrics && <LyricsViewer setDisplayLyrics={setDisplayLyrics} />}
    </div>
  );
}
