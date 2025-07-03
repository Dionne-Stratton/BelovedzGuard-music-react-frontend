import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Home from "./views/Home";
import About from "./views/About";
import Merch from "./views/Merch";
import Videos from "./views/Videos";
import SongList from "./views/SongList";
import SongPlayer from "./views/SongPlayer";
import musicList from "./data/musicList";

export default function App() {
  const reversedList = [...musicList].reverse(); // Reverse the musicList to show newest first
  const [songs, setSongs] = useState(reversedList); //stock is the array of objects from the database initially set to an empty array and then set to the response from the database in the useEffect hook. The array is reversed so that the most recent items are displayed first and then passed down to the Music and Merch components as props
  const [currentIndex, setCurrentIndex] = useState(null); //currentIndex

  return (
    <div className="App" style={{ paddingBottom: "17vh" }}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lemonada&family=Lobster&family=Satisfy&display=swap');
      </style>

      <HeaderNav />

      <Switch>
        <Route path="/home">
          <Home songs={songs} setCurrentIndex={setCurrentIndex} />
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
          <SongList setCurrentIndex={setCurrentIndex} />
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
