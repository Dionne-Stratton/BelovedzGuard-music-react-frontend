// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./state/store";
import App from "./App";

// Wrap Auth0Provider in a component so we can access useNavigate
function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // If Auth0 returns an appState with a saved path, go there
    // otherwise, stay where the user already is
    const target = appState?.returnTo || window.location.pathname;
    navigate(target, { replace: true });
  };

  return (
    <Auth0Provider
      domain="dev-t2whljcmqk7brtx1.us.auth0.com"
      clientId="zHMt6hJQuOdeHhKzDh8aoOSwIk6Zfq9c"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://belovedzguard-api", // ✅ added audience for API access
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <Router>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </Router>
  </Provider>
);
