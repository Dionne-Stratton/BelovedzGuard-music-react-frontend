import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Home from "./views/Home";
import About from "./views/About";
import Videos from "./views/Videos";
import Music from "./views/Music";
import SongPlayer from "./components/SongPlayer";
import LyricsViewer from "./components/LyricsViewer";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [playerQueue, setPlayerQueue] = useState([]); // <- queue the player uses
  const [currentSongId, setCurrentSongId] = useState(null);
  const [displayLyrics, setDisplayLyrics] = useState(false);
  const [lyrics, setLyrics] = useState("loading...");

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:9000";
  const localApi = `${apiBase}/songs`;

  useEffect(() => {
    axios
      .get(localApi)
      .then((response) => {
        const fetched = [...response.data].reverse(); // newest first
        setSongs(fetched);
        setFilteredSongs(fetched); // shown in the grid
        setPlayerQueue(fetched); // initial player queue = all songs
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  // Centralized filtering (UI calls this)
  const filterSongs = (type, value) => {
    if (!value || value === "All") {
      setFilteredSongs(songs);
      return;
    }
    if (type === "genre") {
      setFilteredSongs(songs.filter((s) => s.genre === value));
    } else if (type === "search") {
      const q = value.toLowerCase();
      setFilteredSongs(songs.filter((s) => s.title.toLowerCase().includes(q)));
    }
  };

  // When a card is clicked: snapshot the current filtered list into the queue
  const handleSongClick = (clickedId) => {
    const snapshot = [...filteredSongs]; // <- spread copy (not a reference)
    setPlayerQueue(snapshot);
    setCurrentSongId(clickedId);
  };

  const getCurrentSongLyrics = () => {
    if (!currentSongId) return null;
    const song = songs.find((s) => s._id === currentSongId);
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
          <Route path="/videos" component={Videos} />
          <Route path="/music">
            <Music
              filteredSongs={filteredSongs}
              filterSongs={filterSongs}
              onSongClick={handleSongClick}
            />
          </Route>
          <Route path="/" component={Home} />
        </Switch>

        <SongPlayer
          currentSongId={currentSongId}
          setCurrentSongId={setCurrentSongId}
          songs={playerQueue}
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
