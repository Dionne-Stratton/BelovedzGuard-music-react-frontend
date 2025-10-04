import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSongs } from "./state/songsSlice";
import axios from "axios";
import { Routes, Route } from "react-router-dom"; // ✅ v6 uses Routes instead of Switch
// Components and views
import HeaderNav from "./components/HeaderNav";
import Home from "./views/Home";
import About from "./views/About";
import Videos from "./views/Videos";
import Partner from "./views/Partner";
import Listen from "./views/Listen";
import SongPlayer from "./components/SongPlayer";
import LyricsViewer from "./components/LyricsViewer";

export default function App() {
  const dispatch = useDispatch();
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const API_URL = "https://belovedzguard-ebf890192e0e.herokuapp.com/songs";

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
          <Route path="/videos" element={<Videos />} />
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
