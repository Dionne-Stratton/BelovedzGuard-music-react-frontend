import React from "react";
import "../styles/Listen.css";
import { Routes, Route } from "react-router-dom";
import ListenNav from "../components/features/Navigation/ListenNav";
import Songs from "./Songs";
import Albums from "./Albums";
import Playlists from "./Playlists";
import PlaylistEditor from "./PlaylistEditor";
import PlaylistDetails from "./PlaylistDetails";

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

          {/* Playlists */}
          <Route path="playlists" element={<Playlists />} />
          <Route path="playlists/create" element={<PlaylistEditor />} />
          <Route path="playlists/:id/edit" element={<PlaylistEditor />} />
          <Route path="playlists/:id" element={<PlaylistDetails />} />
        </Routes>
      </div>
    </div>
  );
}
