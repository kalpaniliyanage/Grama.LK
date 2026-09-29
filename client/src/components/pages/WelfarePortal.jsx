import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function WelfarePortal() {
  const { t, i18n } = useTranslation();

  // Language State Sync for Instant Re-render
  const [currentLng, setCurrentLng] = useState(i18n.language || localStorage.getItem("i18nextLng") || "si");

  useEffect(() => {
    if (i18n.language && i18n.language !== currentLng) {
      setCurrentLng(i18n.language);
    }
  }, [i18n.language]);

  // States
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const [activeTab, setActiveTab] = useState("claims");
  const [claims, setClaims] = useState([]);
  const [fundRecords, setFundRecords] = useState([]);

  // Form States - Claims
  const [houseNumber, setHouseNumber] = useState("");
  const [claimType, setClaimType] = useState("youthsports");
  const [amount, setAmount] = useState("");
  const [itemsBorrowed, setItemsBorrowed] = useState("");

  // Form States - Monthly Funds (Member Name removed)
  const [memberHouseNo, setMemberHouseNo] = useState("");
  const [feeMonth, setFeeMonth] = useState("September 2026");
  const [feeAmount, setFeeAmount] = useState("500");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Toast Notification Helper
  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Initial Data Fetching
  useEffect(() => {
    fetch("http://localhost:5000/api/welfare/claims")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setClaims(data))
      .catch((err) => console.error("Error loading claims:", err));

    fetch("http://localhost:5000/api/welfare/funds")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setFundRecords(data))
      .catch((err) => console.error("Error loading funds:", err));
  }, []);

  // Language Switcher Function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLng(lng);
    localStorage.setItem("i18nextLng", lng);
    showNotification(
      lng === "en" ? "Language changed to English!" : lng === "si" ? "භාෂාව සිංහලට වෙනස් කරන ලදී!" : "மொழி தமிழிற்கு மாற்றப்பட்டது!",
      "info"
    );
  };

  // Logout Execution
  const confirmLogout = () => {
    localStorage.removeItem("gramalk_token");
    window.location.href = "/login";
  };

  // Submit Claim Handler
  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/welfare/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          houseNumber,
          claimType,
          amount: Number(amount) || 0,
          itemsBorrowed: itemsBorrowed ? itemsBorrowed.split(",").map((i) => i.trim()) : [],
        }),
      });

      if (res.ok) {
        showNotification(t("save_success") || "තොරතුරු සාර්ථකව ඇතුළත් කළා!", "success");
        setHouseNumber("");
        setAmount("");
        setItemsBorrowed("");
        const updated = await fetch("http://localhost:5000/api/welfare/claims").then((r) => r.json());
        if (Array.isArray(updated)) setClaims(updated);
      }
    } catch (err) {
      showNotification(t("server_error") || "Server එකට සම්බන්ධ වීමට නොහැකි විය.", "error");
    }
  };

  // Submit Fund Handler (Name Removed)
  const handleFundSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/welfare/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          houseNo: memberHouseNo,
          month: feeMonth,
          amount: Number(feeAmount) || 0,
          date: new Date().toLocaleDateString(),
        }),
      });

      if (res.ok) {
        showNotification(t("fund_save_success") || "මාසික සාමාජික ගාස්තු ගෙවීම සාර්ථකව සටහන් කළා!", "success");
        setMemberHouseNo("");
        const updated = await fetch("http://localhost:5000/api/welfare/funds").then((r) => r.json());
        if (Array.isArray(updated)) setFundRecords(updated);
      }
    } catch (err) {
      showNotification(t("server_error") || "ගෙවීම සටහන් කිරීම අසාර්ථක විය.", "error");
    }
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gramalk_token");
      const res = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description: content,
          category: "Welfare",
          date: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        showNotification(t("notice_published") || "නිවේදනය ප්‍රධාන Dashboard එකට සාර්ථකව යවන ලදී!", "success");
        setTitle("");
        setContent("");
      }
    } catch (err) {
      showNotification(t("notice_error") || "නිවේදනය යැවීම අසාර්ථකයි.", "error");
    }
  };

  const totalFundCollected = fundRecords.reduce((sum, item) => sum + (item.amount || 0), 0);

  // Dynamic Theme
  const theme = {
    bg: darkMode ? "#111827" : "#f0fdf4",
    text: darkMode ? "#f9fafb" : "#1f2937",
    cardBg: darkMode ? "#1f2937" : "#ffffff",
    cardBorder: darkMode ? "#374151" : "#e5e7eb",
    inputBg: darkMode ? "#374151" : "#f9fafb",
    inputText: darkMode ? "#ffffff" : "#1f2937",
    tableHeaderBg: darkMode ? "#064e3b" : "#ecfdf5",
    tableHeaderFont: darkMode ? "#a7f3d0" : "#065f46",
    tableRowEven: darkMode ? "#1f2937" : "#f9fafb",
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* 🌟 ATTRACTIVE CUSTOM TOAST BANNER */}
      {toast.show && (
        <div style={{
          ...styles.toastCard,
          backgroundColor: toast.type === "error" ? "#ef4444" : toast.type === "info" ? "#3b82f6" : "#10b981"
        }}>
          <span style={{ fontSize: "20px" }}>
            {toast.type === "error" ? "⚠️" : toast.type === "info" ? "🌐" : "🎉"}
          </span>
          <span style={{ fontWeight: "600", fontSize: "14px", color: "#ffffff" }}>{toast.message}</span>
        </div>
      )}

      {/* 🌐 Top Toolbar with GUARANTEED Clickable Buttons */}
      <div style={styles.topBar}>
        <div style={styles.langContainer}>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>🌐 Language:</span>
          
          <button 
            type="button"
            style={{
              ...styles.langBtn,
              backgroundColor: currentLng === 'en' ? '#10b981' : '#ffffff',
              color: currentLng === 'en' ? '#ffffff' : '#065f46'
            }} 
            onClick={() => changeLanguage("en")}
          >
            English
          </button>

          <button 
            type="button"
            style={{
              ...styles.langBtn,
              backgroundColor: currentLng === 'si' ? '#10b981' : '#ffffff',
              color: currentLng === 'si' ? '#ffffff' : '#065f46'
            }} 
            onClick={() => changeLanguage("si")}
          >
            සිංහල
          </button>

          <button 
            type="button"
            style={{
              ...styles.langBtn,
              backgroundColor: currentLng === 'ta' ? '#10b981' : '#ffffff',
              color: currentLng === 'ta' ? '#ffffff' : '#065f46'
            }} 
            onClick={() => changeLanguage("ta")}
          >
            தமிழ்
          </button>
        </div>

        <div style={styles.actionControls}>
          <button type="button" style={styles.themeToggleBtn} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button type="button" style={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
            🚪 {t("logout") || "Logout"}
          </button>
        </div>
      </div>

      {/* Header Bar */}
      <header style={styles.header}>
        <div>
          <button style={styles.backBtn} onClick={() => (window.location.href = "/")}>
            ⬅️ {t("back_to_dashboard") || "Dashboard"}
          </button>
          <h1 style={styles.title}>🤝 {t("welfare_portal") || "සුබසාධක සමිති පෝටලය"}</h1>
          <p style={styles.subtitle}>{t("welfare_subtitle") || "GramaLK - සභාපති සහ ලේකම් සඳහා වන නිල කළමනාකරණ පද්ධතිය"}</p>
        </div>
      </header>

      {/* Quick Summary Cards */}
      <div style={styles.statsGrid}>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>📋</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>{claims.length}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{t("total_claims_count") || "සම්පූර්ණ සහනාධාර ඉල්ලීම්"}</p>
          </div>
        </div>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>💵</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>LKR {totalFundCollected.toLocaleString()}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{t("total_funds_collected") || "එකතු වූ මාසික මුදල් අරමුදල"}</p>
          </div>
        </div>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>💰</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>LKR {claims.reduce((sum, c) => sum + (c.amount || 0), 0).toLocaleString()}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{t("total_aid_given") || "ලබාදුන් මුළු සහනාධාර"}</p>
          </div>
        </div>
      </div>

      {/* Dynamic Tabs */}
      <div style={styles.tabContainer}>
        <button style={{ ...styles.tabBtn, ...(activeTab === "claims" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("claims")}>
          📝 {t("relief_aid") || "සහනාධාර සහ මරණාධාර"}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "funds" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("funds")}>
          💳 {t("monthly_funds") || "මාසික සාමාජික ගාස්තු එකතුව"}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "announcements" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("announcements")}>
          📢 {t("post_announcement") || "ප්‍රධාන පුවරුවට නිවේදන පළ කරන්න"}
        </button>
      </div>

      {/* Tab 1: Claims Content */}
      {activeTab === "claims" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>➕ {t("add_claim") || "අලුත් ආධාර එකතු කරන්න"}</h2>
            <form onSubmit={handleClaimSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("house_number") || "නිවාස අංකය"}:</label>
                <input type="text" placeholder="H-102" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("claim_type") || "ආධාර වර්ගය"}:</label>
                <select value={claimType} onChange={(e) => setClaimType(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="DeathAid">⚰️ {t("death_aid") || "මරණාධාර"}</option>
                  <option value="MedicalAid">🩺 {t("medical_aid") || "ගිලන් ආධාර"}</option>
                  <option value="DisasterRelief">🌊 {t("disaster_relief") || "ආපදා සහන"}</option>
                  <option value="Loan">💵 {t("loan") || "සහන ණය"}</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("amount") || "මුදල"}:</label>
                <input type="number" placeholder="25000" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("items_borrowed") || "ලබාදුන් භාණ්ඩ"}:</label>
                <input type="text" placeholder="කූඩාරම් 2, පුටු 50" value={itemsBorrowed} onChange={(e) => setItemsBorrowed(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} />
              </div>
              <button type="submit" style={styles.submitBtn}>💾 {t("save_record") || "තොරතුරු සුරකින්න"}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>📊 {t("records_list") || "සුබසාධක සටහන් ලේඛනය"}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("house_number") || "නිවාස අංකය"}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("claim_type") || "වර්ගය"}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("amount") || "මුදල"}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("items_borrowed") || "භාණ්ඩ"}</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((item, index) => (
                    <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                      <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNumber}</strong></td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.claimType}</td>
                      <td style={{ ...styles.td, color: theme.text }}>LKR {item.amount || 0}</td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.itemsBorrowed && item.itemsBorrowed.length > 0 ? item.itemsBorrowed.join(", ") : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Monthly Funds Content (MEMBER NAME REMOVED) */}
      {activeTab === "funds" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>💳 {t("add_monthly_fund") || "මාසික සාමාජික ගාස්තු සටහන් කිරීම"}</h2>
            <form onSubmit={handleFundSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("house_number") || "නිවාස අංකය"}:</label>
                <input type="text" placeholder="H-105" value={memberHouseNo} onChange={(e) => setMemberHouseNo(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("amount") || "ගෙවූ මුදල (LKR)"}:</label>
                <input type="number" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <button type="submit" style={styles.submitBtn}>✅ {t("record_payment") || "ගෙවීම සටහන් කරන්න"}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>📑 {t("paid_members_list") || "මාසික මුදල් ගෙවූ සාමාජිකයන්ගේ ලැයිස්තුව"}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("house_number") || "නිවාස අංකය"}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("amount") || "මුදල"}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{t("date") || "දිනය"}</th>
                  </tr>
                </thead>
                <tbody>
                  {fundRecords.map((item, index) => (
                    <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                      <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNo}</strong></td>
                      <td style={{ ...styles.td, color: theme.text }}>LKR {item.amount}</td>
                      <td style={{ ...styles.td, color: theme.text }}>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Announcements */}
      {activeTab === "announcements" && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>
              📢 {t("post_announcement") || "ප්‍රධාන Dashboard එකට නිවේදනයක් නිකුත් කිරීම"}
            </h2>
            <form onSubmit={handleAnnouncementSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("notice_title") || "නිවේදනයේ මාතෘකාව:"}</label>
                <input
                  type="text"
                  placeholder="උදා: ශ්‍රමදාන ව්‍යාපාරය"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{t("notice_content") || "විස්තරය:"}</label>
                <textarea
                  rows="5"
                  placeholder="විස්තර මෙතැන ටයිප් කරන්න..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText, resize: "vertical" }}
                  required
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                🚀 {t("post_notice") || "නිවේදනය ප්‍රසිද්ධ කරන්න"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Logout Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <div style={styles.modalIcon}>🚪</div>
            <h3 style={styles.modalTitle}>{t("logout_confirm_title") || "පද්ධතියෙන් ඉවත් වීමට අවශ්‍යද?"}</h3>
            <p style={{ ...styles.modalDesc, color: darkMode ? "#9ca3af" : "#6b7280" }}>
              {t("logout_confirm_desc") || "නැවත පිවිසීමට ඔබට ඔබගේ මුරපදය භාවිත කර ඇතුළු වීමට සිදුවේ."}
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancelBtn} onClick={() => setShowLogoutModal(false)}>
                {t("cancel") || "අවලංගු කරන්න"}
              </button>
              <button style={styles.modalConfirmBtn} onClick={confirmLogout}>
                {t("logout") || "ඉවත් වන්න"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// 🎨 Clean Interactive Styles
const styles = {
  container: { padding: "30px", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative" },
  topBar: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "20px", 
    flexWrap: "wrap", 
    gap: "10px", 
    position: "relative", 
    zIndex: 99999 
  },
  langContainer: { display: "flex", alignItems: "center", gap: "8px" },
  langBtn: { 
    padding: "8px 16px", 
    borderRadius: "20px", 
    border: "2px solid #10b981", 
    fontWeight: "700", 
    cursor: "pointer", 
    fontSize: "13px", 
    transition: "all 0.2s ease",
    outline: "none"
  },
  actionControls: { display: "flex", gap: "12px" },
  themeToggleBtn: { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#3b82f6", color: "#ffffff", fontWeight: "700", cursor: "pointer" },
  logoutBtn: { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#ef4444", color: "#ffffff", fontWeight: "700", cursor: "pointer" },
  header: { marginBottom: "25px", background: "linear-gradient(135deg, #065f46 0%, #10b981 100%)", padding: "25px 30px", borderRadius: "16px", color: "#ffffff" },
  backBtn: { padding: "8px 16px", marginBottom: "15px", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#ffffff" },
  title: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#ffffff" },
  subtitle: { margin: "6px 0 0 0", color: "#d1fae5", fontSize: "14px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "25px" },
  statCard: { padding: "20px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "15px", borderLeft: "5px solid #10b981", border: "1px solid #e5e7eb" },
  statIcon: { fontSize: "32px", backgroundColor: "#d1fae5", padding: "10px", borderRadius: "12px" },
  statNumber: { margin: 0, fontSize: "22px", fontWeight: "700" },
  statLabel: { margin: "2px 0 0 0", fontSize: "13px" },
  tabContainer: { display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap" },
  tabBtn: { padding: "12px 24px", borderRadius: "10px", border: "1px solid #a7f3d0", backgroundColor: "#ffffff", color: "#065f46", fontSize: "15px", fontWeight: "700", cursor: "pointer" },
  activeTabBtn: { backgroundColor: "#10b981", color: "#ffffff", borderColor: "#10b981" },
  contentGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" },
  card: { padding: "25px", borderRadius: "16px", border: "1px solid #e5e7eb" },
  cardTitle: { marginTop: 0, marginBottom: "20px", fontSize: "18px", fontWeight: "700", borderBottom: "2px solid #ecfdf5", paddingBottom: "12px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "600" },
  input: { padding: "11px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  submitBtn: { padding: "12px", backgroundColor: "#10b981", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "10px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "700", borderBottom: "2px solid #a7f3d0" },
  td: { padding: "12px", fontSize: "14px", borderBottom: "1px solid #f3f4f6" },

  /* Toast Styling */
  toastCard: { position: "fixed", top: "20px", right: "20px", padding: "14px 22px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", zIndex: 999999 },

  /* Modal Styling */
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999999 },
  modalCard: { width: "90%", maxWidth: "400px", padding: "30px", borderRadius: "20px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  modalIcon: { fontSize: "45px", marginBottom: "10px" },
  modalTitle: { margin: "0 0 10px 0", fontSize: "20px", fontWeight: "700" },
  modalDesc: { fontSize: "14px", marginBottom: "25px", lineHeight: "1.5" },
  modalActions: { display: "flex", gap: "12px", justifyContent: "center" },
  modalCancelBtn: { flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db", backgroundColor: "#f3f4f6", fontWeight: "700", cursor: "pointer" },
  modalConfirmBtn: { flex: 1, padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#ef4444", color: "#ffffff", fontWeight: "700", cursor: "pointer" },
};