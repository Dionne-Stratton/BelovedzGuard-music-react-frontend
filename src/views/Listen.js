import React from "react";
import "../styles/Listen.css";
import { Routes, Route } from "react-router-dom";
import ListenNav from "../components/ListenNav";
import Songs from "./Songs";
import Albums from "./Albums";
import Playlists from "./Playlists";

export default function Listen() {
  return (
    <div className="listen-layout">
      {/* Side navigation always visible */}
      <ListenNav />

      {/* Content area switches based on sub-route */}
      <div className="listen-content">
        <Routes>
          <Route path="songs" element={<Songs />} />
          <Route path="albums" element={<Albums />} />
          <Route path="playlists" element={<Playlists />} />
        </Routes>
      </div>
    </div>
  );
}
