// src/components/HeaderNav.js
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import AuthControls from "../Authentication/AuthControls";
import "./styles.css";

const HeaderNav = () => {
  const [listenOpen, setListenOpen] = useState(false);
  const location = useLocation();
  const isListenActive = location.pathname.startsWith("/listen");

  const showDropdown =
    typeof window !== "undefined" && window.innerWidth >= 900 && listenOpen;

  return (
    <div className="headernav">
      <header>
        <div className="header-logo-container">
          <NavLink className="logo-link-header" to="/">
            <Logo />
          </NavLink>
        </div>

        <div id="logo">
          <h1>
            <NavLink to="/" className="drop-shadow-thick">
              BelovedzGuard
            </NavLink>
          </h1>
          <h2>
            <NavLink to="/" className="drop-shadow-thick">
              Uplifting Christian Music
            </NavLink>
          </h2>
        </div>

        {/* ✅ Use AuthControls here */}
        <div className="header-auth-container">
          <AuthControls />
        </div>
      </header>

      <nav className="container">
        <ul>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `main-nav drop-shadow-thin ${isActive ? "active" : ""}`
              }
            >
              About
            </NavLink>
          </li>

          {/* Listen dropdown */}
          <li
            onMouseEnter={() => setListenOpen(true)}
            onMouseLeave={() => setListenOpen(false)}
            style={{ position: "relative" }}
          >
            <NavLink
              to="/listen/songs"
              className={`main-nav drop-shadow-thin ${
                isListenActive ? "active" : ""
              }`}
            >
              Listen
            </NavLink>

            <ul className={`dropdown-menu ${showDropdown ? "" : "hidden"}`}>
              <li className="dropdown-menu-item">
                <NavLink
                  to="/listen/songs"
                  className="drop-shadow-thin dropdown-menu-link"
                >
                  Songs
                </NavLink>
              </li>
              <li className="dropdown-menu-item">
                <NavLink
                  to="/listen/albums"
                  className="drop-shadow-thin dropdown-menu-link"
                >
                  Albums
                </NavLink>
              </li>
              <li className="dropdown-menu-item">
                <NavLink
                  to="/listen/playlists"
                  className="drop-shadow-thin dropdown-menu-link"
                >
                  Playlists
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to="/watch"
              className={({ isActive }) =>
                `main-nav drop-shadow-thin ${isActive ? "active" : ""}`
              }
            >
              Watch
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/partner"
              className={({ isActive }) =>
                `main-nav drop-shadow-thin ${isActive ? "active" : ""}`
              }
            >
              Partner
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNav;
