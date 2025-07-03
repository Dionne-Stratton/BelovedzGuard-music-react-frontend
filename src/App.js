import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Home from "./views/Home";
import About from "./views/About";
import Merch from "./views/Merch";
import Videos from "./views/Videos";
import Music from "./views/Music";
import SongPlayer from "./components/SongPlayer";
import musicList from "./data/musicList";

export default function App() {
  const reversedList = [...musicList].reverse(); // Reverse the musicList to show newest first
  const [songs, setSongs] = useState(reversedList);
  const [currentIndex, setCurrentIndex] = useState(null); //currentIndex

  console.log("songs", setSongs);
  return (
    <div className="App" style={{ paddingBottom: "17vh" }}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lemonada&family=Lobster&family=Satisfy&display=swap');
      </style>

      <HeaderNav />

      <Switch>
        <Route path="/home">
          <Home setCurrentIndex={setCurrentIndex} />
        </Route>
        <Route path="/merch">
          <Merch />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/videos">
          <Videos />
        </Route>
        <Route path="/music">
          <Music setCurrentIndex={setCurrentIndex} />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <SongPlayer
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        songs={songs}
      />
    </div>
  );
}
