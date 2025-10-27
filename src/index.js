// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./state/store";
import App from "./App";
import colors from "./components/shared/colors";

// Set CSS variables from colors.js
const rootElement = document.documentElement;
Object.keys(colors).forEach((key) => {
  const cssVarName = `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
  rootElement.style.setProperty(cssVarName, colors[key]);
});

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
      domain={process.env.REACT_APP_AUTH0_PROD_DOMAIN} // switch between dev and prod in .env
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUDIENCE, // ✅ added audience for API access
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
