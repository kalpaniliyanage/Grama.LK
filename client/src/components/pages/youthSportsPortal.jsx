import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function YouthSportsPortal() {
  const { t, i18n } = useTranslation();

  const [currentLng, setCurrentLng] = useState(i18n.language || localStorage.getItem("i18nextLng") || "si");
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Form States - Sports Event Registration
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("Cricket");
  const [eventDate, setEventDate] = useState("");
  const [budget, setBudget] = useState("");

  // Form States - Equipment & Inventory
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("Good");

  // Toast Notification Helper
  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Initial Data Fetching
  useEffect(() => {
    fetch("http://localhost:5000/api/sports/events")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setEvents(data))
      .catch((err) => console.error("Error loading events:", err));

    fetch("http://localhost:5000/api/sports/inventory")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setInventory(data))
      .catch((err) => console.error("Error loading inventory:", err));
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLng(lng);
    localStorage.setItem("i18nextLng", lng);
    showNotification(
      lng === "en" ? "Language changed to English!" : lng === "si" ? "භාෂාව සිංහලට වෙනස් කරන ලදී!" : "மொழி தமிழிற்கு மாற்றப்பட்டது!",
      "info"
    );
  };

  const confirmLogout = () => {
    localStorage.removeItem("gramalk_token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  // Submit Sports Event
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/sports/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          eventType,
          eventDate,
          budget: Number(budget) || 0,
        }),
      });

      if (res.ok) {
        showNotification("ක්‍රීඩා උත්සවය සාර්ථකව සටහන් කළා!", "success");
        setEventName("");
        setEventDate("");
        setBudget("");
        const updated = await fetch("http://localhost:5000/api/sports/events").then((r) => r.json());
        if (Array.isArray(updated)) setEvents(updated);
      }
    } catch (err) {
      showNotification("Server එකට සම්බන්ධ වීමට නොහැකි විය.", "error");
    }
  };

  // Submit Inventory Item
  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/sports/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          quantity: Number(quantity) || 0,
          condition,
        }),
      });

      if (res.ok) {
        showNotification("ක්‍රීඩා භාණ්ඩය සාර්ථකව එකතු කළා!", "success");
        setItemName("");
        setQuantity("");
        const updated = await fetch("http://localhost:5000/api/sports/inventory").then((r) => r.json());
        if (Array.isArray(updated)) setInventory(updated);
      }
    } catch (err) {
      showNotification("භාණ්ඩ සටහන් කිරීම අසාර්ථක විය.", "error");
    }
  };

  const theme = {
    bg: darkMode ? "#111827" : "#eff6ff",
    text: darkMode ? "#f9fafb" : "#1f2937",
    cardBg: darkMode ? "#1f2937" : "#ffffff",
    cardBorder: darkMode ? "#374151" : "#e5e7eb",
    inputBg: darkMode ? "#374151" : "#f9fafb",
    inputText: darkMode ? "#ffffff" : "#1f2937",
    tableHeaderBg: darkMode ? "#1e3a8a" : "#dbeafe",
    tableHeaderFont: darkMode ? "#93c5fd" : "#1e40af",
    tableRowEven: darkMode ? "#1f2937" : "#f8fafc",
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          ...styles.toastCard,
          backgroundColor: toast.type === "error" ? "#ef4444" : toast.type === "info" ? "#3b82f6" : "#2563eb"
        }}>
          <span style={{ fontSize: "20px" }}>{toast.type === "error" ? "⚠️" : toast.type === "info" ? "🌐" : "⚽"}</span>
          <span style={{ fontWeight: "600", fontSize: "14px", color: "#ffffff" }}>{toast.message}</span>
        </div>
      )}

      {/* Top Toolbar */}
      <div style={styles.topBar}>
        <div style={styles.langContainer}>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>🌐 Language:</span>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'en' ? '#2563eb' : '#ffffff', color: currentLng === 'en' ? '#ffffff' : '#1e40af' }} onClick={() => changeLanguage("en")}>English</button>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'si' ? '#2563eb' : '#ffffff', color: currentLng === 'si' ? '#ffffff' : '#1e40af' }} onClick={() => changeLanguage("si")}>සිංහල</button>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'ta' ? '#2563eb' : '#ffffff', color: currentLng === 'ta' ? '#ffffff' : '#1e40af' }} onClick={() => changeLanguage("ta")}>தமிழ்</button>
        </div>

        <div style={styles.actionControls}>
          <button type="button" style={styles.themeToggleBtn} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button type="button" style={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Header */}
      <header style={styles.header}>
        <div>
          <button style={styles.backBtn} onClick={() => (window.location.href = "/")}>
            ⬅️ {t("back_to_dashboard") || "Dashboard"}
          </button>
          <h1 style={styles.title}>🏆 තරුණ හා ක්‍රීඩා සමාජ පෝටලය</h1>
          <p style={styles.subtitle}>GramaLK - සභාපති සඳහා වන නිල කළමනාකරණ පද්ධතිය</p>
        </div>
      </header>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <button style={{ ...styles.tabBtn, ...(activeTab === "events" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("events")}>
          ⚽ ක්‍රීඩා උත්සව සහ තරඟ සංවිධානය
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "inventory" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("inventory")}>
          🏏 ක්‍රීඩා භාණ්ඩ සහ උපකරණ ලේඛනය
        </button>
      </div>

      {/* Tab 1: Sports Events */}
      {activeTab === "events" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#60a5fa" : "#1e40af" }}>➕ අලුත් ක්‍රීඩා උත්සවයක් එකතු කරන්න</h2>
            <form onSubmit={handleEventSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>උත්සවයේ/තරඟයේ නම:</label>
                <input type="text" placeholder="උදා: වාර්ෂික ක්‍රිකට් තරඟාවලිය" value={eventName} onChange={(e) => setEventName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>ක්‍රීඩා වර්ගය:</label>
                <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Cricket">🏏 ක්‍රිකට් (Cricket)</option>
                  <option value="Volleyball">🏐 වොලිබෝල් (Volleyball)</option>
                  <option value="Football">⚽ පාපන්දු (Football)</option>
                  <option value="Carrom">🎯 කැරම් / චෙස්</option>
                  <option value="Athletics">🏃 මැරතන් / මලල ක්‍රීඩා</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>පැවැත්වෙන දිනය:</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>වෙන් කළ ප්‍රතිපාදන / බජට් එක (LKR):</label>
                <input type="number" placeholder="උදා: 15000" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <button type="submit" style={styles.submitBtn}>💾 තොරතුරු සුරකින්න</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#60a5fa" : "#1e40af" }}>📊 සංවිධානය කළ ක්‍රීඩා උත්සව ලැයිස්තුව</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>උත්සවයේ නම</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>වර්ගය</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>දිනය</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>බජට් එක</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((item, index) => (
                    <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                      <td style={{ ...styles.td, color: theme.text }}><strong>{item.eventName}</strong></td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.eventType}</td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.eventDate}</td>
                      <td style={{ ...styles.td, color: theme.text }}>LKR {item.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sports Inventory */}
      {activeTab === "inventory" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#60a5fa" : "#1e40af" }}>🏏 ක්‍රීඩා භාණ්ඩ එකතු කිරීම</h2>
            <form onSubmit={handleInventorySubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>උපකරණයේ නම:</label>
                <input type="text" placeholder="උදා: ක්‍රිකට් පිති (Cricket Bats)" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>ප්‍රමාණය (Quantity):</label>
                <input type="number" placeholder="උදා: 5" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>තත්ත්වය (Condition):</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Good">🟢 හොඳ තත්ත්වයේ (Good)</option>
                  <option value="Fair">🟡 සාමාන්‍ය (Fair)</option>
                  <option value="Needs Repair">🔴 අලුත්වැඩියා කළ යුතුයි (Needs Repair)</option>
                </select>
              </div>
              <button type="submit" style={styles.submitBtn}>✅ භාණ්ඩය සුරකින්න</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#60a5fa" : "#1e40af" }}>📦 තරුණ සමිතිය සතු ක්‍රීඩා භාණ්ඩ ලේඛනය</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>භාණ්ඩයේ නම</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>ප්‍රමාණය</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>තත්ත්වය</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                      <td style={{ ...styles.td, color: theme.text }}><strong>{item.itemName}</strong></td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.quantity}</td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <div style={styles.modalIcon}>🚪</div>
            <h3 style={styles.modalTitle}>පද්ධතියෙන් ඉවත් වීමට අවශ්‍යද?</h3>
            <p style={{ ...styles.modalDesc, color: darkMode ? "#9ca3af" : "#6b7280" }}>
              නැවත පිවිසීමට ඔබට ඔබගේ මුරපදය භාවිත කර ඇතුළු වීමට සිදුවේ.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancelBtn} onClick={() => setShowLogoutModal(false)}>අවලංගු කරන්න</button>
              <button style={styles.modalConfirmBtn} onClick={confirmLogout}>ඉවත් වන්න</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: { padding: "30px", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", position: "relative", zIndex: 99999 },
  langContainer: { display: "flex", alignItems: "center", gap: "8px" },
  langBtn: { padding: "8px 16px", borderRadius: "20px", border: "2px solid #2563eb", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
  actionControls: { display: "flex", gap: "12px" },
  themeToggleBtn: { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#3b82f6", color: "#fff", fontWeight: "700", cursor: "pointer" },
  logoutBtn: { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#ef4444", color: "#fff", fontWeight: "700", cursor: "pointer" },
  header: { marginBottom: "25px", background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", padding: "25px 30px", borderRadius: "16px", color: "#ffffff" },
  backBtn: { padding: "8px 16px", marginBottom: "15px", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#ffffff" },
  title: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#ffffff" },
  subtitle: { margin: "6px 0 0 0", color: "#bfdbfe", fontSize: "14px" },
  tabContainer: { display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap" },
  tabBtn: { padding: "12px 24px", borderRadius: "10px", border: "1px solid #bfdbfe", backgroundColor: "#ffffff", color: "#1e40af", fontSize: "15px", fontWeight: "700", cursor: "pointer" },
  activeTabBtn: { backgroundColor: "#2563eb", color: "#ffffff", borderColor: "#2563eb" },
  contentGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" },
  card: { padding: "25px", borderRadius: "16px", border: "1px solid #e5e7eb" },
  cardTitle: { marginTop: 0, marginBottom: "20px", fontSize: "18px", fontWeight: "700", borderBottom: "2px solid #eff6ff", paddingBottom: "12px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "600" },
  input: { padding: "11px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  submitBtn: { padding: "12px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "10px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "700", borderBottom: "2px solid #bfdbfe" },
  td: { padding: "12px", fontSize: "14px", borderBottom: "1px solid #f3f4f6" },
  toastCard: { position: "fixed", top: "20px", right: "20px", padding: "14px 22px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", zIndex: 999999 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999999 },
  modalCard: { width: "90%", maxWidth: "400px", padding: "30px", borderRadius: "20px", textAlign: "center" },
  modalIcon: { fontSize: "45px", marginBottom: "10px" },
  modalTitle: { margin: "0 0 10px 0", fontSize: "20px", fontWeight: "700" },
  modalDesc: { fontSize: "14px", marginBottom: "25px" },
  modalActions: { display: "flex", gap: "12px" },
  modalCancelBtn: { flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db", backgroundColor: "#f3f4f6", fontWeight: "700", cursor: "pointer" },
  modalConfirmBtn: { flex: 1, padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#ef4444", color: "#ffffff", fontWeight: "700", cursor: "pointer" },
};