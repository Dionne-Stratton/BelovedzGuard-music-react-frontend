import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo/BelovedzGaurd.png";

const HeaderNav = () => {
  return (
    <div className="headernav">
      <header>
        <NavLink to="/">
          <img src={logo} alt="BelovedzGuard Logo" id="logo-img" />
        </NavLink>
        <div id="logo">
          <h1>
            <NavLink to="/" className="add-drop-shadow-thick">
              BelovedzGuard
            </NavLink>
          </h1>
          <h2>
            <NavLink to="/" className="add-drop-shadow-thick">
              Uplifting Christian Music
            </NavLink>
          </h2>
        </div>
      </header>

      <nav className="container">
        <ul>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `main-nav add-drop-shadow-thin ${isActive ? "active" : ""}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/listen/songs"
              className={({ isActive }) =>
                `main-nav add-drop-shadow-thin ${isActive ? "active" : ""}`
              }
            >
              Listen
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watch"
              className={({ isActive }) =>
                `main-nav add-drop-shadow-thin ${isActive ? "active" : ""}`
              }
            >
              Watch
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/partner"
              className={({ isActive }) =>
                `main-nav add-drop-shadow-thin ${isActive ? "active" : ""}`
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
