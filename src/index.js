import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react"; // ✅ added
import { store } from "./state/store";
import App from "./App";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <Auth0Provider
    domain="dev-t2whljcmqk7brtx1.us.auth0.com"
    clientId="zHMt6hJQuOdeHhKzDh8aoOSwIk6Zfq9c"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Auth0Provider>
);
