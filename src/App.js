import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSongs } from "./state/songsSlice";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom"; // added useLocation
// Components and views
import HeaderNav from "./components/HeaderNav";
import Home from "./views/Home";
import About from "./views/About";
import Watch from "./views/Watch";
import Partner from "./views/Partner";
import Listen from "./views/Listen";
import SongPlayer from "./components/SongPlayer";
import LyricsViewer from "./components/LyricsViewer";

// ✅ import analytics helpers
import { initAnalytics, trackPageView } from "./utils/analytics";

export default function App() {
  const dispatch = useDispatch();
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const API_URL = "https://belovedzguard-ebf890192e0e.herokuapp.com/songs";
  const location = useLocation();

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
  }, [dispatch]);

  return (
    <div className="App layout">
      <div className={`content ${displayLyrics ? "with-lyrics" : ""}`}>
        <HeaderNav />

        {/* ✅ React Router v6 syntax */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/listen/*" element={<Listen />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <SongPlayer
          setDisplayLyrics={setDisplayLyrics}
          displayLyrics={displayLyrics}
        />
      </div>

      {displayLyrics && <LyricsViewer setDisplayLyrics={setDisplayLyrics} />}
    </div>
  );
}
