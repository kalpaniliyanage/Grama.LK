import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";

// Main Portals
import Login from "./components/pages/Login";
import FamilyPortal from "./components/pages/FamilyPortal";
import HealthPortal from "./components/pages/HealthPortal";

// PHM Pages
import PhmDashboard from "./components/pages/PhmDashboard";
import PhmMothers from "./components/pages/PhmMothers";
import PhmRequests from "./components/pages/PhmRequests";
import PhmProfile from "./components/pages/PhmProfile";
import PhmAnnouncements from "./components/pages/PhmAnnouncements"; // ✅ Import කරන ලදී

// PHI Pages
import PhiAnnouncements from "./components/pages/PhiAnnouncements";
import PhiProfile from "./components/pages/PhiProfile";

// Internal Sidebar Component
function InternalSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // සියලුම Menu Items ලැයිස්තුව
  const allMenuItems = [
    { name: "PHM Dashboard", path: "/phm-dashboard", icon: "📊", role: "PHM" },
    { name: "මව්වරුන්ගේ ලැයිස්තුව", path: "/phm-mothers", icon: "👩‍👦", role: "PHM" },
    { name: "සෞඛ්‍ය ඉල්ලීම් (Requests)", path: "/phm-requests", icon: "📋", role: "PHM" },
    { name: "PHM නිවේදන (Announcements)", path: "/phm-announcements", icon: "📢", role: "PHM" }, // ✅ PHM Announcements ඇතුළත් කළා
    { name: "PHM ගිණුම (Profile)", path: "/phm-profile", icon: "👤", role: "PHM" },
    
    { name: "සෞඛ්‍ය නිවේදන (Announcements)", path: "/phi-announcements", icon: "📢", role: "PHI" },
    { name: "PHI ගිණුම (Profile)", path: "/phi-profile", icon: "🩺", role: "PHI" },
  ];

  // දැනට ඉන්නේ PHI පිටුවකද නැද්ද යන්න පරීක්ෂා කිරීම
  const isPhiUser = location.pathname.startsWith("/phi");

  // PHI නම් PHI පමණක්ද, PHM නම් PHM පමණක්ද ෆිල්ටර් කර පෙන්වීම
  const menuItems = allMenuItems.filter((item) => {
    if (isPhiUser) {
      return item.role === "PHI";
    }
    return item.role === "PHM";
  });

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div style={{
      width: "250px",
      minHeight: "100vh",
      backgroundColor: "#0d5c56",
      color: "#fff",
      padding: "20px 10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box"
    }}>
      <div>
        <h3 style={{ textAlign: "center", marginBottom: "30px", fontSize: "18px", borderBottom: "1px solid #168278", paddingBottom: "10px" }}>
          GramaLK Health
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} style={{ marginBottom: "8px" }}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "6px",
                    backgroundColor: isActive ? "#168278" : "transparent",
                    fontWeight: isActive ? "bold" : "normal",
                    fontSize: "14px"
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

      {/* Back to Login Safe Button */}
      <button
        type="button"
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#d9534f",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
          marginTop: "20px"
        }}
      >
        <span>⬅</span>
        <span>Back to Login</span>
      </button>
    </div>
  );
}

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <InternalSidebar />
      <div style={{ flex: 1, backgroundColor: "#f8f9fa", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Portals with Layout */}
        <Route path="/family-portal" element={<AppLayout><FamilyPortal /></AppLayout>} />
        <Route path="/health-portal" element={<AppLayout><HealthPortal /></AppLayout>} />

        {/* PHM Pages */}
        <Route path="/phm-dashboard" element={<AppLayout><PhmDashboard /></AppLayout>} />
        <Route path="/phm-mothers" element={<AppLayout><PhmMothers /></AppLayout>} />
        <Route path="/phm-requests" element={<AppLayout><PhmRequests /></AppLayout>} />
        <Route path="/phm-profile" element={<AppLayout><PhmProfile /></AppLayout>} />
        <Route path="/phm-announcements" element={<AppLayout><PhmAnnouncements /></AppLayout>} /> {/* ✅ AppLayout එක ඇතුළට එකතු කළා */}
        
        {/* PHI Pages */}
        <Route path="/phi-announcements" element={<AppLayout><PhiAnnouncements /></AppLayout>} />
        <Route path="/phi-profile" element={<AppLayout><PhiProfile /></AppLayout>} />
        
      </Routes>
    </Router>
  );
}

export default App;