import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "PHM Dashboard", path: "/phm-dashboard", icon: "📊" },
    { name: "Mothers List (මව්වරුන්)", path: "/phm-mothers", icon: "👩‍👦" },
    { name: "PHM Requests", path: "/phm-requests", icon: "📋" },
    { name: "PHM Profile", path: "/phm-profile", icon: "👤" },
    { name: "PHI Announcements", path: "/phi-announcements", icon: "📢" },
    { name: "PHI Profile", path: "/phi-profile", icon: "🩺" },
  ];

  return (
    <div style={{
      width: "240px",
      minHeight: "100vh",
      backgroundColor: "#0d5c56",
      color: "#fff",
      padding: "20px 10px",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: "30px", fontSize: "20px", borderBottom: "1px solid #168278", paddingBottom: "10px" }}>
        GramaLK Health
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path} style={{ marginBottom: "10px" }}>
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 15px",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#168278" : "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                  transition: "0.2s"
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;