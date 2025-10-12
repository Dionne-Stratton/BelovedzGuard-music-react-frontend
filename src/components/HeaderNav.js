// src/components/HeaderNav.js
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import AuthControls from "./AuthControls"; // ✅ bring back AuthControls

const HeaderNav = () => {
  const [listenOpen, setListenOpen] = useState(false);
  const location = useLocation();
  const isListenActive = location.pathname.startsWith("/listen");

  const showDropdown =
    typeof window !== "undefined" && window.innerWidth >= 900 && listenOpen;

  return (
    <div className="headernav">
      <header>
        <NavLink className="logo-link-header" to="/">
          <Logo />
        </NavLink>

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
        <AuthControls />
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

            <ul
              className="dropdown-menu"
              style={{
                display: showDropdown ? "flex" : "none",
                position: "absolute",
                top: "100%",
                left: 0,
                flexDirection: "column",
                alignItems: "stretch",
                background: "#5f5953",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                zIndex: 1000,
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                <NavLink
                  to="/listen/songs"
                  className="drop-shadow-thin"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  Songs
                </NavLink>
              </li>
              <li style={{ whiteSpace: "nowrap" }}>
                <NavLink
                  to="/listen/albums"
                  className="drop-shadow-thin"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  Albums
                </NavLink>
              </li>
              <li style={{ whiteSpace: "nowrap" }}>
                <NavLink
                  to="/listen/playlists"
                  className="drop-shadow-thin"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "left",
                    width: "100%",
                  }}
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
