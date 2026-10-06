import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);