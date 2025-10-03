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
            <ul>
              {/* <li>
                <NavLink
                  className="main-nav add-drop-shadow-thin"
                  activeClassName="active"
                  to="/home"
                >
                  Home
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  className="main-nav add-drop-shadow-thin"
                  activeClassName="active"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="main-nav add-drop-shadow-thin"
                  activeClassName="active"
                  to="/music"
                >
                  Music
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="main-nav add-drop-shadow-thin"
                  activeClassName="active"
                  to="/videos"
                >
                  Videos
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="main-nav add-drop-shadow-thin"
                  activeClassName="active"
                  to="/partner"
                >
                  Partner
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNav;
