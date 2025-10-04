import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/ListenNav.css";

const ListenNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="listen-nav-wrapper">
      {/* Sidebar */}
      <nav className={`listen-nav ${collapsed ? "collapsed" : ""}`}>
        <ul>
          <li>
            <NavLink to="/listen/music">Songs</NavLink>
          </li>
          <li>
            <NavLink to="/listen/albums">Albums</NavLink>
          </li>
          <li>
            <NavLink to="/listen/playlists">Playlists</NavLink>
          </li>
        </ul>
      </nav>

      {/* Toggle button stays visible */}
      <button className="nav-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "◀"}
      </button>
    </div>
  );
};

export default ListenNav;
