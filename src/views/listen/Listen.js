import React from "react";
import { Routes, Route } from "react-router-dom";
import ListenNav from "../../components/features/Navigation/ListenNav";
import Songs from "./songs/Songs";
import SongDetails from "./songs/SongDetails";
import Albums from "./albums/Albums";
import Playlists from "./playlists/Playlists";
import PlaylistEditor from "./playlists/PlaylistEditor";
import PlaylistDetails from "./playlists/PlaylistDetails";
import "./styles.css";

export default function Listen() {
  return (
    <div className="listen-layout">
      {/* Side navigation always visible */}
      <ListenNav />

      {/* Content area switches based on sub-route */}
      <div className="listen-content">
        <Routes>
          <Route path="songs" element={<Songs />} />
          <Route path="songs/:id" element={<SongDetails />} />
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
