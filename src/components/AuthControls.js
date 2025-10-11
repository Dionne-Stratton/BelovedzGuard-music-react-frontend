// src/components/AuthControls.js
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import profileIcon from "../images/profile.png";
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
      console.log("Auth0 check starting");
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently({
            authorizationParams: { audience },
          });
          console.log("Token saved:", token.slice(0, 40) + "...");
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
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return null;

  return (
    <div className="auth-controls">
      {!isAuthenticated ? (
        <div className="auth-buttons">
          <button onClick={handleLogin}>Login / Register</button>
        </div>
      ) : (
        <div className="auth-logged-in">
          <span>
            <img
              className="profile-icon"
              src={user?.picture || profileIcon}
              alt={user?.name || "Profile"}
              title={user?.name || "Profile"}
            />
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
