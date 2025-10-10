import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/authSlice";

export default function AuthControls() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());

  return (
    <div className="auth-controls">
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <button onClick={() => console.log("open login")}>Login</button>
          <button onClick={() => console.log("open register")}>Register</button>
        </div>
      ) : (
        <div className="auth-logged-in">
          <span className="welcome">Welcome</span>
          <span className="username">
            {user?.name || user?.email || "User"}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
