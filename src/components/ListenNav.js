import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/ListenNav.css";

const ListenNav = () => {
  return (
    <div className="listen-nav-wrapper">
      {/* Sidebar */}
      <nav className="listen-nav">
        <ul>
          <li>
            <NavLink to="/listen/songs">Songs</NavLink>
          </li>
          <li>
            <NavLink to="/listen/albums">Albums</NavLink>
          </li>
          <li>
            <NavLink to="/listen/playlists">Playlists</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ListenNav;
