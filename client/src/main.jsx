import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import './i18n';

// නිවැරදි folder path එක ලබා දීම (src/components/pages/WelfarePortal.jsx)
import WelfarePortal from "./components/pages/WelfarePortal.jsx";

// වත්මන් URL පථය ලබා ගැනීම
const path = window.location.pathname;

// URL එක අනුව සුදුසු පිටුව දර්ශනය කිරීම
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {path === "/welfare-portal" ? <WelfarePortal /> : <App />}
  </React.StrictMode>
);