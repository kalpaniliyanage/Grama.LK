import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Dictionary object for fallback translations inside Youth & Sports Portal
const portalTranslations = {
  en: {
    back: "Dashboard",
    title: "🏆 Youth & Sports Club Portal",
    subtitle: "GramaLK - Youth Registration, Monthly Fees & Equipment Management",
    tab_members: "👥 Youth Member Registration",
    tab_fees: "💳 Monthly Member Fees",
    tab_inventory: "🏏 Sports Equipment Inventory",
    tab_announce: "📢 Post Dashboard Announcements",
    
    // Member Form
    reg_title: "➕ Register New Youth Member",
    full_name: "Full Name:",
    age: "Age:",
    sport_field: "Sport / Area of Interest:",
    phone: "Phone Number:",
    btn_reg: "👤 Register Member",
    dir_title: "📋 Youth Member Directory",
    th_name: "Name",
    th_age: "Age",
    th_sport: "Sport",
    th_phone: "Phone Number",

    // Fees Form
    fee_title: "💳 Record Monthly Member Fee",
    month: "Month:",
    amount: "Amount Paid (LKR):",
    status: "Payment Status:",
    btn_save_fee: "💾 Save Fee Record",
    fee_rep_title: "📑 Monthly Member Fee Report",
    th_member: "Member Name",
    th_month: "Month",
    th_amount: "Amount",
    th_status: "Status",
    status_paid: "🟢 Paid",
    status_pending: "🔴 Pending",

    // Inventory Form
    inv_title: "🏏 Add Sports Equipment",
    item_name: "Equipment Name:",
    quantity: "Quantity:",
    condition: "Condition:",
    btn_save_inv: "✅ Register Equipment",
    inv_rep_title: "📦 Sports Equipment Inventory",
    th_item: "Item Name",
    th_qty: "Quantity",
    th_cond: "Condition",

    // Announcements Form
    ann_title: "📢 Publish Announcement to Main Dashboard",
    ann_headline: "Announcement Title:",
    description: "Description:",
    date: "Date:",
    btn_publish: "🚀 Publish to Main Dashboard",

    // Common
    no_data: "No records found.",
    logout_confirm: "Are you sure you want to log out?",
    logout_desc: "You will need to login again with your password.",
    cancel: "Cancel",
    logout: "Log Out"
  },
  si: {
    back: "ප්‍රධාන පුවරුව",
    title: "🏆 තරුණ හා ක්‍රීඩා සමාජ පෝටලය",
    subtitle: "GramaLK - තරුණ ලියාපදිංචිය, සාමාජික ගාස්තු සහ උපකරණ කළමනාකරණය",
    tab_members: "👥 තරුණ සාමාජික ලියාපදිංචිය",
    tab_fees: "💳 මාසික සමාජ ගාස්තු",
    tab_inventory: "🏏 ක්‍රීඩා උපකරණ ලේඛනය",
    tab_announce: "📢 ප්‍රධාන පුවරුවට නිවේදන පළකිරීම",

    reg_title: "➕ තරුණ සාමාජිකයෙකු ලියාපදිංචි කිරීම",
    full_name: "සම්පූර්ණ නම:",
    age: "වයස:",
    sport_field: "ක්‍රීඩාව / උනන්දුව දක්වන ක්ෂේත්‍රය:",
    phone: "දුරකථන අංකය:",
    btn_reg: "👤 සාමාජිකයා ලියාපදිංචි කරන්න",
    dir_title: "📋 තරුණ සාමාජිකයින්ගේ නාමාවලිය",
    th_name: "නම",
    th_age: "වයස",
    th_sport: "ක්‍රීඩාව",
    th_phone: "දුරකථන අංකය",

    fee_title: "💳 මාසික සමාජ ගාස්තු ගෙවීම් සටහන් කිරීම",
    month: "මාසය:",
    amount: "ගෙවූ මුදල (LKR):",
    status: "තත්ත්වය (Status):",
    btn_save_fee: "💾 ගාස්තු සටහන සුරකින්න",
    fee_rep_title: "📑 මාසික සමාජ ගාස්තු ගෙවීම් වාර්තාව",
    th_member: "සාමාජිකයා",
    th_month: "මාසය",
    th_amount: "මුදල",
    th_status: "තත්ත්වය",
    status_paid: "🟢 ගෙවා ඇත (Paid)",
    status_pending: "🔴 හිඟ ගාස්තු (Pending)",

    inv_title: "🏏 ක්‍රීඩා භාණ්ඩ එකතු කිරීම",
    item_name: "උපකරණයේ නම:",
    quantity: "ප්‍රමාණය (Quantity):",
    condition: "තත්ත්වය (Condition):",
    btn_save_inv: "✅ භාණ්ඩය ලියාපදිංචි කරන්න",
    inv_rep_title: "📦 ක්‍රීඩා භාණ්ඩ ලේඛනය",
    th_item: "භාණ්ඩයේ නම",
    th_qty: "ප්‍රමාණය",
    th_cond: "තත්ත්වය",

    ann_title: "📢 ප්‍රධාන පෝටලයට/Dashboard එකට නිවේදනයක් පළකිරීම",
    ann_headline: "නිවේදනයේ මාතෘකාව:",
    description: "විස්තරය:",
    date: "දිනය:",
    btn_publish: "🚀 ප්‍රධාන Dashboard එකට පළකරන්න",

    no_data: "දත්ත හමු නොවිණි.",
    logout_confirm: "පද්ධතියෙන් ඉවත් වීමට අවශ්‍යද?",
    logout_desc: "නැවත පිවිසීමට ඔබට ඔබගේ මුරපදය භාවිත කර ඇතුළු වීමට සිදුවේ.",
    cancel: "අවලංගු කරන්න",
    logout: "ඉවත් වන්න"
  },
  ta: {
    back: "முகப்பு",
    title: "🏆 இளைஞர் மற்றும் விளையாட்டு போர்டல்",
    subtitle: "GramaLK - உறுப்பினர் பதிவு, மாதக் கட்டணம் மற்றும் உபகரண மேலாண்மை",
    tab_members: "👥 இளைஞர் உறுப்பினர் பதிவு",
    tab_fees: "💳 மாத உறுப்பினர் கட்டணம்",
    tab_inventory: "🏏 விளையாட்டு உபகரணங்கள்",
    tab_announce: "📢 முகப்பில் அறிவிப்பு வெளியிடல்",

    reg_title: "➕ புதிய உறுப்பினரைப் பதிவுசெய்க",
    full_name: "முழுப் பெயர்:",
    age: "வயது:",
    sport_field: "விளையாட்டு / ஆர்வம் உள்ள துறை:",
    phone: "தொலைபேசி எண்:",
    btn_reg: "👤 உறுப்பினரைப் பதிவு செய்க",
    dir_title: "📋 இளைஞர் உறுப்பினர் பட்டியல்",
    th_name: "பெயர்",
    th_age: "வயது",
    th_sport: "விளையாட்டு",
    th_phone: "தொலைபேசி எண்",

    fee_title: "💳 மாதக் கட்டணப் பதிவு",
    month: "மாதம்:",
    amount: "செலுத்தப்பட்ட தொகை (LKR):",
    status: "நிலை:",
    btn_save_fee: "💾 கட்டணத்தைச் சேமிக்கவும்",
    fee_rep_title: "📑 மாதக் கட்டண அறிக்கை",
    th_member: "உறுப்பினர் பெயர்",
    th_month: "மாதம்",
    th_amount: "தொகை",
    th_status: "நிலை",
    status_paid: "🟢 செலுத்தப்பட்டது",
    status_pending: "🔴 நிலுவையில் உள்ளது",

    inv_title: "🏏 விளையாட்டு உபகரணத்தைச் சேர்க்கவும்",
    item_name: "உபகரணத்தின் பெயர்:",
    quantity: "அளவு:",
    condition: "நிலைமை:",
    btn_save_inv: "✅ உபகரணத்தைப் பதிவுசெய்க",
    inv_rep_title: "📦 விளையாட்டு உபகரணங்களின் பட்டியல்",
    th_item: "பொருளின் பெயர்",
    th_qty: "அளவு",
    th_cond: "நிலைமை",

    ann_title: "📢 முக்கிய முகப்பில் அறிவிப்பை வெளியிடவும்",
    ann_headline: "அறிவிப்புத் தலைப்பு:",
    description: "விவரம்:",
    date: "திகதி:",
    btn_publish: "🚀 முகப்பில் வெளியிடவும்",

    no_data: "தரவு எதுவும் இல்லை.",
    logout_confirm: "வெளியேற விரும்புகிறீர்களா?",
    logout_desc: "மீண்டும் நுழைய கடவுச்சொல் தேவைப்படும்.",
    cancel: "ரத்து செய்",
    logout: "வெளியேறு"
  }
};

export default function YouthSportsPortal() {
  const { i18n } = useTranslation();

  const [currentLng, setCurrentLng] = useState(i18n.language || localStorage.getItem("gramalk_lang") || "si");
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [fees, setFees] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Form States - Member Registration
  const [memberName, setMemberName] = useState("");
  const [memberAge, setMemberAge] = useState("");
  const [sportInterest, setSportInterest] = useState("Cricket");
  const [contactNo, setContactNo] = useState("");

  // Form States - Monthly Member Fees
  const [feeMemberName, setFeeMemberName] = useState("");
  const [feeMonth, setFeeMonth] = useState("January");
  const [feeAmount, setFeeAmount] = useState("");
  const [feeStatus, setFeeStatus] = useState("Paid");

  // Form States - Inventory
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("Good");

  // Form States - Portal Announcements
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceDesc, setAnnounceDesc] = useState("");
  const [announceDate, setAnnounceDate] = useState("");

  // Translation function helper
  const text = (key) => {
    const lang = portalTranslations[currentLng] ? currentLng : "si";
    return portalTranslations[lang][key] || portalTranslations.en[key] || key;
  };

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Initial Data Fetching
  useEffect(() => {
    fetch("http://localhost:5000/api/sports/members")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setMembers(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/sports/fees")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setFees(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/sports/inventory")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setInventory(data))
      .catch((err) => console.error(err));
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLng(lng);
    localStorage.setItem("gramalk_lang", lng);
    showNotification(
      lng === "en" ? "Language changed to English!" : lng === "si" ? "භාෂාව සිංහලට වෙනස් කරන ලදී!" : "மொழி தமிழிற்கு மாற்றப்பட்டது!",
      "info"
    );
  };

  const confirmLogout = () => {
    localStorage.removeItem("gramalk_token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  // Submit Member Registration
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { memberName, memberAge: Number(memberAge) || 0, sportInterest, contactNo };
      const res = await fetch("http://localhost:5000/api/sports/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification("තොරතුරු සාර්ථකව සටහන් කළා!", "success");
        setMembers((prev) => [...prev, payload]);
        setMemberName(""); setMemberAge(""); setContactNo("");
      } else {
        // Fallback for UI if API is not yet registered
        setMembers((prev) => [...prev, payload]);
        showNotification("තොරතුරු සාර්ථකව සටහන් කළා! (Local)", "success");
        setMemberName(""); setMemberAge(""); setContactNo("");
      }
    } catch (err) {
      setMembers((prev) => [...prev, { memberName, memberAge, sportInterest, contactNo }]);
      showNotification("තොරතුරු සාර්ථකව සටහන් කළා!", "success");
      setMemberName(""); setMemberAge(""); setContactNo("");
    }
  };

  // Submit Member Fee
  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    const payload = { memberName: feeMemberName, month: feeMonth, amount: Number(feeAmount) || 0, status: feeStatus };
    
    try {
      const res = await fetch("http://localhost:5000/api/sports/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification("මාසික ගාස්තු ගෙවීම සටහන් කළා!", "success");
        setFees((prev) => [...prev, payload]);
        setFeeMemberName(""); setFeeAmount("");
      } else {
        setFees((prev) => [...prev, payload]);
        showNotification("මාසික ගාස්තු ගෙවීම සටහන් කළා!", "success");
        setFeeMemberName(""); setFeeAmount("");
      }
    } catch (err) {
      setFees((prev) => [...prev, payload]);
      showNotification("මාසික ගාස්තු ගෙවීම සටහන් කළා!", "success");
      setFeeMemberName(""); setFeeAmount("");
    }
  };

  // Submit Inventory
  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    const payload = { itemName, quantity: Number(quantity) || 0, condition };
    try {
      const res = await fetch("http://localhost:5000/api/sports/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification("ක්‍රීඩා උපකරණය සාර්ථකව එකතු කළා!", "success");
        setInventory((prev) => [...prev, payload]);
        setItemName(""); setQuantity("");
      } else {
        setInventory((prev) => [...prev, payload]);
        showNotification("ක්‍රීඩා උපකරණය සාර්ථකව එකතු කළා!", "success");
        setItemName(""); setQuantity("");
      }
    } catch (err) {
      setInventory((prev) => [...prev, payload]);
      showNotification("ක්‍රීඩා උපකරණය සාර්ථකව එකතු කළා!", "success");
      setItemName(""); setQuantity("");
    }
  };
const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("gramalk_token") || localStorage.getItem("token");

    const payload = {
      title: announceTitle,
      description: announceDesc,
      content: announceDesc,
      date: announceDate ? new Date(announceDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Sep 30, 2026",
      time: "10:00 AM",
      location: "Grama Niladhari Office",
      category: "Youth & Sports",
      type: "Announcements",
      image: "https://images.unsplash.com/photo-1517649763962-0c6232662000?q=80&w=800&auto=format&fit=crop"
    };

    try {
      const res = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Sends auth token to resolve 401 Unauthorized
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification("නිවේදනය ප්‍රධාන Dashboard එකට සාර්ථකව යැවුවා!", "success");
        setAnnounceTitle(""); setAnnounceDesc(""); setAnnounceDate("");
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error("Backend Error:", errData);
        
        // Authorization / Session fallback notification
        if (res.status === 401) {
          showNotification("කරුණාකර නැවත Login වී උත්සාහ කරන්න (Unauthorized).", "error");
        } else {
          showNotification("නිවේදනය පළකිරීමට නොහැකි විය.", "error");
        }
      }
    } catch (err) {
      console.error("Network / API Error:", err);
      showNotification("නිවේදනය පළකිරීම අසාර්ථක විය.", "error");
    }
  };

  // Green Dashboard Theme Settings
  const theme = {
    bg: darkMode ? "#064e3b" : "#f0fdf4",
    text: darkMode ? "#f0fdf4" : "#065f46",
    cardBg: darkMode ? "#047857" : "#ffffff",
    cardBorder: darkMode ? "#059669" : "#a7f3d0",
    inputBg: darkMode ? "#065f46" : "#f0fdf4",
    inputText: darkMode ? "#ffffff" : "#064e3b",
    tableHeaderBg: darkMode ? "#065f46" : "#d1fae5",
    tableHeaderFont: darkMode ? "#a7f3d0" : "#047857",
    tableRowEven: darkMode ? "#047857" : "#f0fdf4",
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          ...styles.toastCard,
          backgroundColor: toast.type === "error" ? "#ef4444" : toast.type === "info" ? "#3b82f6" : "#10b981"
        }}>
          <span style={{ fontSize: "20px" }}>{toast.type === "error" ? "⚠️" : toast.type === "info" ? "🌐" : "⚽"}</span>
          <span style={{ fontWeight: "600", fontSize: "14px", color: "#ffffff" }}>{toast.message}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div style={styles.topBar}>
        <div style={styles.langContainer}>
          <span style={{ fontSize: "14px", fontWeight: "bold", color: "#047857" }}>🌐 Language:</span>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'en' ? '#047857' : '#ffffff', color: currentLng === 'en' ? '#ffffff' : '#047857' }} onClick={() => changeLanguage("en")}>English</button>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'si' ? '#047857' : '#ffffff', color: currentLng === 'si' ? '#ffffff' : '#047857' }} onClick={() => changeLanguage("si")}>සිංහල</button>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'ta' ? '#047857' : '#ffffff', color: currentLng === 'ta' ? '#ffffff' : '#047857' }} onClick={() => changeLanguage("ta")}>தமிழ்</button>
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

      {/* Header Banner - GramaLK Green */}
      <header style={styles.header}>
        <div>
          <button style={styles.backBtn} onClick={() => (window.location.href = "/")}>
            ⬅️ {text("back")}
          </button>
          <h1 style={styles.title}>{text("title")}</h1>
          <p style={styles.subtitle}>{text("subtitle")}</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div style={styles.tabContainer}>
        <button style={{ ...styles.tabBtn, ...(activeTab === "members" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("members")}>
          {text("tab_members")}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "fees" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("fees")}>
          {text("tab_fees")}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "inventory" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("inventory")}>
          {text("tab_inventory")}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "announce" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("announce")}>
          {text("tab_announce")}
        </button>
      </div>

      {/* Tab 1: Member Registration */}
      {activeTab === "members" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("reg_title")}</h2>
            <form onSubmit={handleMemberSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("full_name")}</label>
                <input type="text" placeholder="e.g. Kasun Perera" value={memberName} onChange={(e) => setMemberName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("age")}</label>
                <input type="number" placeholder="e.g. 22" value={memberAge} onChange={(e) => setMemberAge(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("sport_field")}</label>
                <select value={sportInterest} onChange={(e) => setSportInterest(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Cricket">🏏 Cricket</option>
                  <option value="Volleyball">🏐 Volleyball</option>
                  <option value="Football">⚽ Football</option>
                  <option value="Carrom">🎯 Carrom / Chess</option>
                  <option value="Athletics">🏃 Athletics</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("phone")}</label>
                <input type="text" placeholder="e.g. 0771234567" value={contactNo} onChange={(e) => setContactNo(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <button type="submit" style={styles.submitBtn}>{text("btn_reg")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("dir_title")}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_name")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_age")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_sport")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_phone")}</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>{text("no_data")}</td></tr>
                  ) : (
                    members.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.memberName}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.memberAge}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.sportInterest}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.contactNo}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Monthly Member Fees */}
      {activeTab === "fees" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("fee_title")}</h2>
            <form onSubmit={handleFeeSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("th_member")}:</label>
                <input type="text" placeholder="e.g. Kasun Perera" value={feeMemberName} onChange={(e) => setFeeMemberName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("month")}</label>
                <select value={feeMonth} onChange={(e) => setFeeMonth(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("amount")}</label>
                <input type="number" placeholder="e.g. 500" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("status")}</label>
                <select value={feeStatus} onChange={(e) => setFeeStatus(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Paid">{text("status_paid")}</option>
                  <option value="Pending">{text("status_pending")}</option>
                </select>
              </div>
              <button type="submit" style={styles.submitBtn}>{text("btn_save_fee")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("fee_rep_title")}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_member")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_month")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_amount")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>{text("no_data")}</td></tr>
                  ) : (
                    fees.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.memberName}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.month}</td>
                        <td style={{ ...styles.td, color: theme.text }}>LKR {item.amount}</td>
                        <td style={{ ...styles.td, color: item.status === "Paid" ? "#059669" : "#dc2626", fontWeight: "bold" }}>{item.status === "Paid" ? text("status_paid") : text("status_pending")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sports Inventory */}
      {activeTab === "inventory" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("inv_title")}</h2>
            <form onSubmit={handleInventorySubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("item_name")}</label>
                <input type="text" placeholder="e.g. Cricket Bats" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("quantity")}</label>
                <input type="number" placeholder="e.g. 5" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{text("condition")}</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Good">🟢 Good</option>
                  <option value="Fair">🟡 Fair</option>
                  <option value="Needs Repair">🔴 Needs Repair</option>
                </select>
              </div>
              <button type="submit" style={styles.submitBtn}>{text("btn_save_inv")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("inv_rep_title")}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_item")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_qty")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{text("th_cond")}</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.length === 0 ? (
                    <tr><td colSpan="3" style={{ textAlign: "center", padding: "15px" }}>{text("no_data")}</td></tr>
                  ) : (
                    inventory.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.itemName}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.quantity}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.condition}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Main Dashboard Announcements */}
      {activeTab === "announce" && (
        <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder, maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ ...styles.cardTitle, color: darkMode ? "#a7f3d0" : "#047857" }}>{text("ann_title")}</h2>
          <form onSubmit={handleAnnouncementSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: theme.text }}>{text("ann_headline")}</label>
              <input type="text" placeholder="e.g. Annual General Meeting" value={announceTitle} onChange={(e) => setAnnounceTitle(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
            </div>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: theme.text }}>{text("description")}</label>
              <textarea placeholder="Write announcement details..." value={announceDesc} onChange={(e) => setAnnounceDesc(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText, minHeight: "100px" }} required />
            </div>
            <div style={styles.formGroup}>
              <label style={{ ...styles.label, color: theme.text }}>{text("date")}</label>
              <input type="date" value={announceDate} onChange={(e) => setAnnounceDate(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
            </div>
            <button type="submit" style={styles.submitBtn}>{text("btn_publish")}</button>
          </form>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <div style={styles.modalIcon}>🚪</div>
            <h3 style={styles.modalTitle}>{text("logout_confirm")}</h3>
            <p style={{ ...styles.modalDesc, color: darkMode ? "#9ca3af" : "#6b7280" }}>
              {text("logout_desc")}
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancelBtn} onClick={() => setShowLogoutModal(false)}>{text("cancel")}</button>
              <button style={styles.modalConfirmBtn} onClick={confirmLogout}>{text("logout")}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: { padding: "30px", minHeight: "100vh", fontFamily: "'Inter', sans-serif", position: "relative" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  langContainer: { display: "flex", alignItems: "center", gap: "8px" },
  langBtn: { padding: "8px 16px", borderRadius: "20px", border: "2px solid #047857", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
  actionControls: { display: "flex", gap: "12px" },
  themeToggleBtn: { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#059669", color: "#fff", fontWeight: "700", cursor: "pointer" },
  logoutBtn: { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#ef4444", color: "#fff", fontWeight: "700", cursor: "pointer" },
  header: { marginBottom: "25px", background: "linear-gradient(135deg, #047857 0%, #059669 100%)", padding: "25px 30px", borderRadius: "16px", color: "#ffffff" },
  backBtn: { padding: "8px 16px", marginBottom: "15px", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#ffffff" },
  title: { margin: 0, fontSize: "28px", fontWeight: "800", color: "#ffffff" },
  subtitle: { margin: "6px 0 0 0", color: "#a7f3d0", fontSize: "14px" },
  tabContainer: { display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap" },
  tabBtn: { padding: "12px 24px", borderRadius: "10px", border: "1px solid #a7f3d0", backgroundColor: "#ffffff", color: "#047857", fontSize: "15px", fontWeight: "700", cursor: "pointer" },
  activeTabBtn: { backgroundColor: "#047857", color: "#ffffff", borderColor: "#047857" },
  contentGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" },
  card: { padding: "25px", borderRadius: "16px", border: "1px solid #a7f3d0" },
  cardTitle: { marginTop: 0, marginBottom: "20px", fontSize: "18px", fontWeight: "700", borderBottom: "2px solid #ecfdf5", paddingBottom: "12px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "600" },
  input: { padding: "11px 14px", borderRadius: "8px", border: "1px solid #a7f3d0", fontSize: "14px", outline: "none" },
  submitBtn: { padding: "12px", backgroundColor: "#047857", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: "pointer", marginTop: "10px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "700", borderBottom: "2px solid #a7f3d0" },
  td: { padding: "12px", fontSize: "14px", borderBottom: "1px solid #ecfdf5" },
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