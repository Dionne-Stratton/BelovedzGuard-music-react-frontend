import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSongs } from "./state/songsSlice";
import { useSelector } from "react-redux";
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
  const songs = useSelector((state) => state.songs);
  const currentSongId = useSelector((state) => state.player.currentSongId);
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const [lyrics, setLyrics] = useState("loading...");

  const API_URL = "https://belovedzguard-ebf890192e0e.herokuapp.com/songs";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => dispatch(setSongs(res.data)))
      .catch((err) => console.error("Error fetching songs:", err));
  }, [dispatch]);

  const getCurrentSongLyrics = () => {
    if (!currentSongId) return null;
    const song = songs.find((song) => song._id === currentSongId);
    if (!song) return null;

    if (song.lyrics) {
      fetch(song.lyrics)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.text();
        })
        .then((data) => setLyrics(data))
        .catch((err) => {
          console.error("Error fetching lyrics:", err);
          setLyrics("Failed to load lyrics.");
        });
    } else {
      setLyrics(song.lyrics || "");
    }

    return { title: song.title, body: lyrics };
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="content"
        style={{
          flex: "1",
          transition: "all 0.3s ease",
          marginRight: displayLyrics ? "300px" : "0",
        }}
      >
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lemonada&family=Lobster&family=Satisfy&display=swap');`}
        </style>

        <HeaderNav />

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/videos">
            <Videos />
          </Route>
          <Route path="/music">
            <Music />
          </Route>
          <Route path="/partner" component={Partner} />
          <Route path="/" component={Home} />
        </Switch>

        <SongPlayer
          setDisplayLyrics={setDisplayLyrics}
          displayLyrics={displayLyrics}
        />
      </div>

      {displayLyrics && (
        <LyricsViewer
          getCurrentSongLyrics={getCurrentSongLyrics}
          setDisplayLyrics={setDisplayLyrics}
        />
      )}
    </div>
  );
}
