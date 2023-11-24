import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter, Route, Routes } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./components/auth";

const msalinstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MsalProvider instance={msalinstance}>
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App msalinstance={msalinstance} />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  </MsalProvider>
);
