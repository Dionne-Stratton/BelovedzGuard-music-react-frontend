import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSongs } from "./state/songsSlice";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
// Components and views
import HeaderNav from "./components/HeaderNav";
import Home from "./views/Home";
import About from "./views/About";
import Videos from "./views/Videos";
import Partner from "./views/Partner";
import Music from "./views/Music";
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

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/videos" component={Videos} />
          <Route path="/music" component={Music} />
          <Route path="/partner" component={Partner} />
          <Route path="/" component={Home} />
        </Switch>

        <SongPlayer
          setDisplayLyrics={setDisplayLyrics}
          displayLyrics={displayLyrics}
        />
      </div>

      {displayLyrics && <LyricsViewer setDisplayLyrics={setDisplayLyrics} />}
    </div>
  );
}
