// src/components/AuthControls.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import profileIcon from "../images/profile.png";
import { setCredentials } from "../state/authSlice";
import "../styles/AuthControls.css";

export default function AuthControls() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;

  const audience = "https://belovedzguard-api"; // ✅ must match your API identifier

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: currentPath },
      authorizationParams: {
        audience,
      },
    });
  };

  const handleLogout = () => logout({ localOnly: true });

  useEffect(() => {
    let mounted = true;
    const stashToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently({
            authorizationParams: { audience },
          });
          dispatch(setCredentials({ user, token }));
          if (mounted) localStorage.setItem("api_token", token);
        } else {
          localStorage.removeItem("api_token");
        }
      } catch (err) {
        console.error("Token fetch failed:", err);
      }
    };
    stashToken();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return null;

  return (
    <div className="auth-controls">
      {!isAuthenticated ? (
        <div className="auth-buttons">
          <button className="add-pointer" onClick={handleLogin}>
            Login / Register
          </button>
        </div>
      ) : (
        <div className="auth-logged-in">
          <span>
            <img className="profile-icon" src={profileIcon} alt="Profile" />
          </span>
          <button className="add-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
