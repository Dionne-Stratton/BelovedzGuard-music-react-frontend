import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/misc/BelovedzGaurd.png";

const HeaderNav = () => {
  return (
    <div className="headernav">
      <header>
        <NavLink className="main-nav" activeClassName="active" to="/">
          <img
            src={logo}
            alt="BelovedzGuard Logo"
            id="logo-img"
            style={{
              marginTop: "-0.5rem",
              marginBottom: "0.5rem",
              filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
            }}
          />
        </NavLink>
        <div id="logo">
          <h1>
            {/* <a href="index.html">BelovedzGuard</a> */}
            <NavLink
              className="main-nav"
              activeClassName="active"
              to="/"
              style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))" }}
            >
              BelovedzGuard
            </NavLink>
          </h1>
          <h2>
            {/* <a href="index.html">Uplifting Christian Music</a> */}
            <NavLink
              className="main-nav"
              activeClassName="active"
              to="/"
              style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))" }}
            >
              Uplifting Christian Music
            </NavLink>
          </h2>
        </div>
      </header>

      <nav class="container">
        <ul
          class="clearfix"
          // style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))" }}
          id="cfix"
        >
          <li>
            <ul class="scroll" id="scroll">
              <li>
                <NavLink
                  className="main-nav"
                  activeClassName="active"
                  to="/home"
                  style={{
                    filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="main-nav"
                  activeClassName="active"
                  to="/about"
                  style={{
                    filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="main-nav"
                  activeClassName="active"
                  to="/music"
                  style={{
                    filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  Music
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="main-nav"
                  activeClassName="active"
                  to="/videos"
                  style={{
                    filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  Videos
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  className="main-nav"
                  activeClassName="active"
                  to="/merch"
                  style={{
                    filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  Merch
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="main-nav"
                  activeClassName="active"
                  to="/subscribe"
                  style={{
                    filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  Subscribe
                </NavLink>
              </li> */}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNav;
