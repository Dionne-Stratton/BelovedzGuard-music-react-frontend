import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../state/authSlice";
import profileIcon from "../images/profile.png";
import "../styles/AuthControls.css";

export default function AuthControls() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());
  const handleLogin = () => navigate("/login");

  return (
    <div className="auth-controls">
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <button onClick={handleLogin}>Login / Register</button>
        </div>
      ) : (
        <div className="auth-logged-in">
          {/* <span className="welcome">Welcome</span> */}
          <span>
            <img className="profile-icon" src={profileIcon} alt="Profile" />
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
