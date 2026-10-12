import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const API = "http://localhost:5000";

const translations = {
  en: {
    back: "Dashboard", title: "🤝 Welfare Society Portal",
    subtitle: "GramaLK - Official Management System for President & Secretary",
    tab_reg: "👥 Register Members", tab_claims: "📝 Relief & Emergency Aid",
    tab_funds: "💳 Monthly Member Funds", tab_announce: "📢 Notices",
    form_title_reg: "🏠 Register Welfare Member", lbl_house_no: "House Number:",
    lbl_nic: "Household Head NIC:", btn_register: "✅ Register Member",
    list_title_reg: "📋 Registered Welfare Members", th_house: "House No",
    th_name: "Full Name", th_nic: "NIC / Head NIC", th_phone: "Telephone",
    th_status: "Status", th_action: "Actions", status_registered: "Registered",
    no_members: "No registered welfare members found.",
    form_title_aid: "➕ Record Relief / Emergency Aid", lbl_aid_type: "Type of aid:",
    aid_death: "⚰️ Death Aid", aid_medical: "🩺 Medical Aid",
    aid_disaster: "🌊 Disaster Relief", aid_loan: "💵 Emergency Loan",
    lbl_amount: "Amount (LKR):", lbl_items: "Items Borrowed (optional):",
    btn_save_claim: "💾 Save Relief Record", list_title_aid: "📊 Relief Aid Log",
    th_aid_type: "Aid Type", th_amount: "Amount (LKR)", th_items: "Items",
    form_title_fund: "💳 Record Monthly Membership Fee", lbl_fee_amount: "Paid amount (LKR):",
    btn_save_fund: "✅ Record Payment", list_title_fund: "📑 Monthly Funds Register",
    th_date: "Date Recorded", form_title_notice: "📢 Post a Notice",
    lbl_notice_title: "Notice title:", lbl_notice_desc: "Description:",
    btn_post_notice: "🚀 Publish Notice", list_title_notice: "📌 Welfare Notices",
    total_families: "Registered Welfare Families", total_claims: "Relief Claims",
    total_funds: "Total Funds Collected", btn_edit: "✏️ Edit", btn_delete: "🗑️ Delete",
    logout: "Log Out", cancel: "Cancel", save: "Save", edit_member: "Edit member",
    edit_fund: "Edit payment", edit_notice: "Edit notice", empty_claims: "No aid records found.",
    empty_funds: "No payments found.", empty_notices: "No notices found.",
    server_error: "Could not connect to the server.", confirm_member: "Remove this member?",
    confirm_claim: "Delete this relief record?", confirm_fund: "Delete this payment?",
    confirm_notice: "Delete this notice?", logout_confirm: "Are you sure you want to log out?",
    house: "House number", amount: "Amount", date: "Date", items: "Items",
    name: "Full name", phone: "Phone number"
  },
  si: {
    back: "ප්‍රධාන පුවරුව", title: "🤝 සුබසාධක සමිති පෝටලය",
    subtitle: "GramaLK - සභාපති සහ ලේකම් සඳහා නිල කළමනාකරණ පද්ධතිය",
    tab_reg: "👥 සාමාජික ලියාපදිංචිය", tab_claims: "📝 සහනාධාර සහ හදිසි ආධාර",
    tab_funds: "💳 මාසික සාමාජික ගාස්තු", tab_announce: "📢 නිවේදන",
    form_title_reg: "🏠 සුබසාධක සාමාජිකයෙකු ලියාපදිංචි කරන්න",
    lbl_house_no: "නිවාස අංකය:", lbl_nic: "ගෘහ මූලිකයාගේ ජා.හැ.අංකය:",
    btn_register: "✅ සාමාජිකයා ලියාපදිංචි කරන්න",
    list_title_reg: "📋 ලියාපදිංචි සාමාජික ලැයිස්තුව", th_house: "නිවාස අංකය",
    th_name: "සම්පූර්ණ නම", th_nic: "ජා.හැ.අංකය", th_phone: "දුරකථන අංකය",
    th_status: "තත්ත්වය", th_action: "ක්‍රියාමාර්ග", status_registered: "ලියාපදිංචි කර ඇත",
    no_members: "ලියාපදිංචි සාමාජිකයින් හමු නොවීය.",
    form_title_aid: "➕ සහනාධාර / හදිසි ආධාර සටහන් කරන්න", lbl_aid_type: "ආධාර වර්ගය:",
    aid_death: "⚰️ මරණාධාර", aid_medical: "🩺 ගිලන් ආධාර",
    aid_disaster: "🌊 ආපදා සහන", aid_loan: "💵 හදිසි ණය",
    lbl_amount: "මුදල (LKR):", lbl_items: "ලබාදුන් භාණ්ඩ (විකල්ප):",
    btn_save_claim: "💾 සහනාධාර සටහන සුරකින්න", list_title_aid: "📊 සහනාධාර ලේඛනය",
    th_aid_type: "ආධාර වර්ගය", th_amount: "මුදල (LKR)", th_items: "භාණ්ඩ",
    form_title_fund: "💳 මාසික සාමාජික ගාස්තුව සටහන් කරන්න",
    lbl_fee_amount: "ගෙවූ මුදල (LKR):", btn_save_fund: "✅ ගෙවීම සටහන් කරන්න",
    list_title_fund: "📑 මාසික මුදල් ලේඛනය", th_date: "සටහන් කළ දිනය",
    form_title_notice: "📢 නිවේදනයක් පළ කරන්න", lbl_notice_title: "නිවේදන මාතෘකාව:",
    lbl_notice_desc: "විස්තරය:", btn_post_notice: "🚀 නිවේදනය පළ කරන්න",
    list_title_notice: "📌 සුබසාධක නිවේදන", total_families: "ලියාපදිංචි සුබසාධක පවුල්",
    total_claims: "සහනාධාර සටහන්", total_funds: "එකතු කළ මුළු මුදල",
    btn_edit: "✏️ සංස්කරණය", btn_delete: "🗑️ ඉවත් කරන්න", logout: "ඉවත් වන්න",
    cancel: "අවලංගු කරන්න", save: "සුරකින්න", edit_member: "සාමාජික තොරතුරු සංස්කරණය",
    edit_fund: "ගෙවීම සංස්කරණය", edit_notice: "නිවේදනය සංස්කරණය",
    empty_claims: "සහනාධාර සටහන් හමු නොවීය.", empty_funds: "ගෙවීම් හමු නොවීය.",
    empty_notices: "නිවේදන හමු නොවීය.", server_error: "Server එකට සම්බන්ධ වීමට නොහැකි විය.",
    confirm_member: "මෙම සාමාජිකයා ඉවත් කරනවාද?", confirm_claim: "මෙම සහනාධාර සටහන මකනවාද?",
    confirm_fund: "මෙම ගෙවීම මකනවාද?", confirm_notice: "මෙම නිවේදනය මකනවාද?",
    logout_confirm: "ඇත්තටම ඉවත් වීමට අවශ්‍යද?", house: "නිවාස අංකය",
    amount: "මුදල", date: "දිනය", items: "භාණ්ඩ", name: "සම්පූර්ණ නම", phone: "දුරකථන අංකය"
  },
  ta: {
    back: "முகப்பு", title: "🤝 நலன்புரிச் சங்க போர்டல்",
    subtitle: "GramaLK - தலைவர் மற்றும் செயலாளருக்கான மேலாண்மை அமைப்பு",
    tab_reg: "👥 உறுப்பினர் பதிவு", tab_claims: "📝 நிவாரண உதவி",
    tab_funds: "💳 மாதக் கட்டணம்", tab_announce: "📢 அறிவிப்புகள்",
    form_title_reg: "🏠 நலன்புரி உறுப்பினர் பதிவு", lbl_house_no: "வீட்டு எண்:",
    lbl_nic: "குடும்பத் தலைவரின் அடையாள அட்டை எண்:", btn_register: "✅ பதிவு செய்க",
    list_title_reg: "📋 பதிவு செய்யப்பட்ட உறுப்பினர்கள்", th_house: "வீட்டு எண்",
    th_name: "முழுப் பெயர்", th_nic: "அடையாள அட்டை எண்", th_phone: "தொலைபேசி",
    th_status: "நிலை", th_action: "செயல்கள்", status_registered: "பதிவு செய்யப்பட்டது",
    no_members: "உறுப்பினர்கள் எவரும் இல்லை.", form_title_aid: "➕ நிவாரண உதவி பதிவு",
    lbl_aid_type: "உதவி வகை:", aid_death: "⚰️ மரண உதவி", aid_medical: "🩺 மருத்துவ உதவி",
    aid_disaster: "🌊 பேரிடர் நிவாரணம்", aid_loan: "💵 அவசரக் கடன்",
    lbl_amount: "தொகை (LKR):", lbl_items: "வழங்கிய பொருட்கள் (விருப்பம்):",
    btn_save_claim: "💾 சேமிக்கவும்", list_title_aid: "📊 நிவாரணப் பதிவுகள்",
    th_aid_type: "உதவி வகை", th_amount: "தொகை (LKR)", th_items: "பொருட்கள்",
    form_title_fund: "💳 மாதக் கட்டணம் பதிவு", lbl_fee_amount: "செலுத்திய தொகை (LKR):",
    btn_save_fund: "✅ பதிவு செய்க", list_title_fund: "📑 மாத நிதிப் பதிவேடு",
    th_date: "பதிவு தேதி", form_title_notice: "📢 அறிவிப்பு வெளியிடுக",
    lbl_notice_title: "அறிவிப்புத் தலைப்பு:", lbl_notice_desc: "விளக்கம்:",
    btn_post_notice: "🚀 வெளியிடுக", list_title_notice: "📌 நலன்புரி அறிவிப்புகள்",
    total_families: "பதிவு செய்யப்பட்ட குடும்பங்கள்", total_claims: "நிவாரணப் பதிவுகள்",
    total_funds: "சேகரிக்கப்பட்ட மொத்த நிதி", btn_edit: "✏️ திருத்து",
    btn_delete: "🗑️ நீக்கு", logout: "வெளியேறு", cancel: "ரத்து செய்", save: "சேமி",
    edit_member: "உறுப்பினரைத் திருத்து", edit_fund: "கட்டணத்தைத் திருத்து",
    edit_notice: "அறிவிப்பைத் திருத்து", empty_claims: "பதிவுகள் இல்லை.",
    empty_funds: "கட்டணங்கள் இல்லை.", empty_notices: "அறிவிப்புகள் இல்லை.",
    server_error: "சேவையகத்துடன் இணைக்க முடியவில்லை.", confirm_member: "இந்த உறுப்பினரை நீக்கவா?",
    confirm_claim: "இந்த உதவிப் பதிவை நீக்கவா?", confirm_fund: "இந்தக் கட்டணத்தை நீக்கவா?",
    confirm_notice: "இந்த அறிவிப்பை நீக்கவா?", logout_confirm: "வெளியேற விரும்புகிறீர்களா?",
    house: "வீட்டு எண்", amount: "தொகை", date: "தேதி", items: "பொருட்கள்",
    name: "முழுப் பெயர்", phone: "தொலைபேசி எண்"
  }
};

const styles = {
  container: { minHeight: "100vh", padding: "clamp(12px, 3vw, 30px)", fontFamily: "Inter, Arial, sans-serif", transition: "background .2s, color .2s" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 },
  group: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  button: { padding: "9px 13px", border: "1px solid #10b981", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  header: { background: "linear-gradient(135deg,#065f46,#10b981)", padding: "24px", borderRadius: 16, color: "#fff", marginBottom: 22 },
  title: { margin: "8px 0", fontSize: "clamp(22px, 3vw, 30px)" },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginBottom: 22 },
  stat: { border: "1px solid #d1d5db", borderLeft: "5px solid #10b981", borderRadius: 12, padding: 18 },
  tabs: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: 20 },
  card: { padding: 20, border: "1px solid #d1d5db", borderRadius: 14, minWidth: 0 },
  form: { display: "flex", flexDirection: "column", gap: 13 },
  label: { fontWeight: 700, fontSize: 14 },
  input: { boxSizing: "border-box", width: "100%", padding: "11px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14 },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: 14 },
  th: { textAlign: "left", padding: 10, borderBottom: "2px solid #10b981", whiteSpace: "nowrap" },
  td: { padding: 10, borderBottom: "1px solid #e5e7eb", verticalAlign: "top" },
  toast: { position: "fixed", right: 16, top: 16, zIndex: 9999, color: "white", padding: "13px 18px", borderRadius: 10, boxShadow: "0 8px 25px #0003", maxWidth: "min(90vw,480px)" },
  overlay: { position: "fixed", inset: 0, background: "#0008", zIndex: 9998, display: "grid", placeItems: "center", padding: 16 },
  modal: { width: "min(100%,460px)", padding: 24, borderRadius: 16, boxShadow: "0 20px 40px #0004" },
};

export default function WelfarePortal() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("gramalk_lang") : null;
    const initial = (i18n.language || saved || "si").split("-")[0];
    return translations[initial] ? initial : "si";
  });
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("members");
  const [toast, setToast] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [funds, setFunds] = useState([]);
  const [notices, setNotices] = useState([]);
  const [regHouseNo, setRegHouseNo] = useState("");
  const [headNIC, setHeadNIC] = useState("");
  const [claimHouseNo, setClaimHouseNo] = useState("");
  const [claimType, setClaimType] = useState("DeathAid");
  const [claimAmount, setClaimAmount] = useState("");
  const [itemsBorrowed, setItemsBorrowed] = useState("");
  const [fundHouseNo, setFundHouseNo] = useState("");
  const [fundAmount, setFundAmount] = useState("500");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({});

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;
  const theme = {
    bg: darkMode ? "#111827" : "#f0fdf4",
    text: darkMode ? "#f9fafb" : "#1f2937",
    card: darkMode ? "#1f2937" : "#fff",
    input: darkMode ? "#374151" : "#f9fafb",
    border: darkMode ? "#4b5563" : "#d1d5db",
    tableHeader: darkMode ? "#064e3b" : "#ecfdf5",
  };

  const notify = useCallback((message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const request = useCallback(async (path, options = {}) => {
    const token = localStorage.getItem("gramalk_token");
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API}${path}`, { ...options, headers });
    const raw = await response.text();
    let data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch { data = { message: raw }; }
    if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
    return data;
  }, []);

  const loadAll = useCallback(async () => {
    const jobs = [
      ["/api/welfare/members", setMembers],
      ["/api/welfare/claims", setClaims],
      ["/api/welfare/funds", setFunds],
    ];
    await Promise.all(jobs.map(async ([path, setter]) => {
      try {
        const data = await request(path);
        setter(Array.isArray(data) ? data : (data.items || data.members || data.claims || data.funds || []));
      } catch (error) { console.error(`Could not load ${path}:`, error); }
    }));
    try {
      const data = await request("/api/announcements");
      const list = Array.isArray(data) ? data : (data.announcements || data.items || []);
      setNotices(list.filter((item) => item.category === "Welfare"));
    } catch (error) { console.error("Could not load welfare notices:", error); }
  }, [request]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("gramalk_lang", lng);
  };

  const handleSubmit = async (event, path, body, successMessage, reset, refresh = loadAll) => {
    event.preventDefault();
    try {
      await request(path, { method: "POST", body: JSON.stringify(body) });
      notify(successMessage);
      reset?.();
      refresh();
    } catch (error) { notify(error.message || t("server_error"), "error"); }
  };

  const deleteRecord = async (path, confirmation, refresh = loadAll) => {
    if (!window.confirm(confirmation)) return;
    try { await request(path, { method: "DELETE" }); notify("Record deleted successfully."); refresh(); }
    catch (error) { notify(error.message || t("server_error"), "error"); }
  };

  const openEdit = (kind, item) => {
    setEditing({ kind, item });
    setEditValues({
      fullName: item.fullName || item.username || "",
      phone: item.phone || "",
      amount: String(item.amount ?? ""),
      title: item.title || "",
      description: item.description || "",
    });
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    if (!editing) return;
    const { kind, item } = editing;
    const configs = {
      member: { path: `/api/welfare/members/${item._id}`, body: { fullName: editValues.fullName, phone: editValues.phone } },
      fund: { path: `/api/welfare/funds/${item._id}`, body: { amount: Number(editValues.amount) } },
      notice: { path: `/api/announcements/${item._id}`, body: { title: editValues.title, description: editValues.description } },
    };
    try {
      const config = configs[kind];
      await request(config.path, { method: "PUT", body: JSON.stringify(config.body) });
      setEditing(null);
      notify("Record updated successfully.");
      loadAll();
    } catch (error) { notify(error.message || t("server_error"), "error"); }
  };

  
const confirmLogout = () => {
  localStorage.removeItem("gramalk_token");
  localStorage.removeItem("token");

  setLogoutModal(false);

  window.location.href = "/";
};

  const panel = { ...styles.card, background: theme.card, color: theme.text, borderColor: theme.border };
  const inputStyle = { ...styles.input, background: theme.input, color: theme.text, borderColor: theme.border };
  const tableHeader = { background: theme.tableHeader };
  const thStyle = { ...styles.th, color: darkMode ? "#a7f3d0" : "#065f46" };
  const tdStyle = { ...styles.td, borderColor: theme.border, color: theme.text };

  return (
    <main style={{ ...styles.container, background: theme.bg, color: theme.text }}>
      {toast && <div role="status" style={{ ...styles.toast, background: toast.type === "error" ? "#dc2626" : "#059669" }}>{toast.message}</div>}

      <div style={styles.topBar}>
        <div style={styles.group}>
          <strong>🌐 Language:</strong>
          {["en", "si", "ta"].map((lng) => (
            <button key={lng} type="button" style={{ ...styles.button, background: language === lng ? "#10b981" : theme.card, color: language === lng ? "#fff" : theme.text }} onClick={() => changeLanguage(lng)}>
              {{ en: "English", si: "සිංහල", ta: "தமிழ்" }[lng]}
            </button>
          ))}
        </div>
        <div style={styles.group}>
          <button type="button" style={{ ...styles.button, background: "#2563eb", color: "#fff", borderColor: "#2563eb" }} onClick={() => setDarkMode((v) => !v)}>{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</button>
          <button type="button" style={{ ...styles.button, background: "#dc2626", color: "#fff", borderColor: "#dc2626" }} onClick={() => setLogoutModal(true)}>🚪 {t("logout")}</button>
        </div>
      </div>

      <header style={styles.header}>
        <button type="button" style={{ ...styles.button, background: "#ffffff2b", color: "#fff", borderColor: "#ffffff77" }} onClick={() => { window.location.href = "/"; }}>⬅️ {t("back")}</button>
        <h1 style={styles.title}>{t("title")}</h1>
        <p style={{ margin: 0, color: "#d1fae5" }}>{t("subtitle")}</p>
      </header>

      <section style={styles.stats}>
        <div style={{ ...styles.stat, background: theme.card, borderColor: theme.border }}><div style={{ fontSize: 28 }}>👥</div><h2 style={{ margin: "6px 0" }}>{members.length}</h2><div>{t("total_families")}</div></div>
        <div style={{ ...styles.stat, background: theme.card, borderColor: theme.border }}><div style={{ fontSize: 28 }}>📋</div><h2 style={{ margin: "6px 0" }}>{claims.length}</h2><div>{t("total_claims")}</div></div>
        <div style={{ ...styles.stat, background: theme.card, borderColor: theme.border }}><div style={{ fontSize: 28 }}>💵</div><h2 style={{ margin: "6px 0" }}>LKR {funds.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</h2><div>{t("total_funds")}</div></div>
      </section>

      <nav style={styles.tabs}>
        {[["members", "tab_reg"], ["claims", "tab_claims"], ["funds", "tab_funds"], ["announcements", "tab_announce"]].map(([tab, key]) => (
          <button key={tab} type="button" style={{ ...styles.button, background: activeTab === tab ? "#10b981" : theme.card, color: activeTab === tab ? "#fff" : theme.text }} onClick={() => setActiveTab(tab)}>{t(key)}</button>
        ))}
      </nav>

      {activeTab === "members" && <section style={styles.grid}>
        <div style={panel}>
          <h2>{t("form_title_reg")}</h2>
          <form style={styles.form} onSubmit={(e) => handleSubmit(e, "/api/welfare/register-member", { houseNumber: regHouseNo.trim(), householdHeadNIC: headNIC.trim() }, "සාමාජිකයා සාර්ථකව ලියාපදිංචි විය!", () => { setRegHouseNo(""); setHeadNIC(""); })}>
            <label style={styles.label}>{t("lbl_house_no")}<input style={inputStyle} value={regHouseNo} onChange={(e) => setRegHouseNo(e.target.value)} placeholder="H-1" required /></label>
            <label style={styles.label}>{t("lbl_nic")}<input style={inputStyle} value={headNIC} onChange={(e) => setHeadNIC(e.target.value)} required /></label>
            <button style={{ ...styles.button, background: "#10b981", color: "#fff" }}>{t("btn_register")}</button>
          </form>
        </div>
        <div style={panel}>
          <h2>{t("list_title_reg")}</h2>
          <div style={styles.tableWrap}><table style={styles.table}><thead><tr style={tableHeader}>{["th_house", "th_name", "th_nic", "th_phone", "th_status", "th_action"].map((k) => <th style={thStyle} key={k}>{t(k)}</th>)}</tr></thead>
            <tbody>{members.length === 0 ? <tr><td style={tdStyle} colSpan={6}>{t("no_members")}</td></tr> : members.map((item, index) => <tr key={item._id || index}>
              <td style={tdStyle}>{item.houseNumber || item.houseNo || "-"}</td><td style={tdStyle}>{item.fullName || item.username || "N/A"}</td><td style={tdStyle}>{item.householdHeadNIC || item.nic || "-"}</td><td style={tdStyle}>{item.phone || "N/A"}</td><td style={tdStyle}>{t("status_registered")}</td>
              <td style={tdStyle}><div style={styles.group}><button type="button" style={{ ...styles.button, background: "#2563eb", color: "#fff" }} onClick={() => openEdit("member", item)}>{t("btn_edit")}</button><button type="button" style={{ ...styles.button, background: "#dc2626", color: "#fff" }} onClick={() => deleteRecord(`/api/welfare/members/${item._id}`, t("confirm_member"), loadAll)}>{t("btn_delete")}</button></div></td>
            </tr>)}</tbody></table></div>
        </div>
      </section>}

      {activeTab === "claims" && <section style={styles.grid}>
        <div style={panel}><h2>{t("form_title_aid")}</h2>
          <form style={styles.form} onSubmit={(e) => handleSubmit(e, "/api/welfare/claims", { houseNumber: claimHouseNo.trim(), claimType, amount: Number(claimAmount), itemsBorrowed: itemsBorrowed ? itemsBorrowed.split(",").map((v) => v.trim()).filter(Boolean) : [] }, "සහනාධාර සටහන සුරකින ලදී!", () => { setClaimHouseNo(""); setClaimAmount(""); setItemsBorrowed(""); }, () => request("/api/welfare/claims").then((d) => setClaims(Array.isArray(d) ? d : [])))}>
            <label style={styles.label}>{t("lbl_house_no")}<input style={inputStyle} value={claimHouseNo} onChange={(e) => setClaimHouseNo(e.target.value)} placeholder="H-1" required /></label>
            <label style={styles.label}>{t("lbl_aid_type")}<select style={inputStyle} value={claimType} onChange={(e) => setClaimType(e.target.value)}><option value="DeathAid">{t("aid_death")}</option><option value="MedicalAid">{t("aid_medical")}</option><option value="DisasterRelief">{t("aid_disaster")}</option><option value="Loan">{t("aid_loan")}</option></select></label>
            <label style={styles.label}>{t("lbl_amount")}<input type="number" min="0" style={inputStyle} value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} required /></label>
            <label style={styles.label}>{t("lbl_items")}<input style={inputStyle} value={itemsBorrowed} onChange={(e) => setItemsBorrowed(e.target.value)} placeholder="Tents 2, Chairs 5" /></label>
            <button style={{ ...styles.button, background: "#10b981", color: "#fff" }}>{t("btn_save_claim")}</button>
          </form>
        </div>
        <div style={panel}><h2>{t("list_title_aid")}</h2><div style={styles.tableWrap}><table style={styles.table}><thead><tr style={tableHeader}>{["th_house", "th_aid_type", "th_amount", "th_items", "th_action"].map((k) => <th style={thStyle} key={k}>{t(k)}</th>)}</tr></thead><tbody>
          {claims.length === 0 ? <tr><td style={tdStyle} colSpan={5}>{t("empty_claims")}</td></tr> : claims.map((item, index) => <tr key={item._id || index}><td style={tdStyle}>{item.houseNumber || item.houseNo || "-"}</td><td style={tdStyle}>{item.claimType || "-"}</td><td style={tdStyle}>LKR {Number(item.amount || 0).toLocaleString()}</td><td style={tdStyle}>{Array.isArray(item.itemsBorrowed) ? item.itemsBorrowed.join(", ") : item.itemsBorrowed || "-"}</td><td style={tdStyle}><button type="button" style={{ ...styles.button, background: "#dc2626", color: "#fff" }} onClick={() => deleteRecord(`/api/welfare/claims/${item._id}`, t("confirm_claim"), () => request("/api/welfare/claims").then((d) => setClaims(Array.isArray(d) ? d : [])))}>{t("btn_delete")}</button></td></tr>)}
        </tbody></table></div></div>
      </section>}

      {activeTab === "funds" && <section style={styles.grid}>
        <div style={panel}><h2>{t("form_title_fund")}</h2>
          <form style={styles.form} onSubmit={(e) => handleSubmit(e, "/api/welfare/funds", { houseNo: fundHouseNo.trim(), amount: Number(fundAmount), date: new Date().toLocaleDateString() }, "මාසික ගෙවීම සටහන් කළා!", () => { setFundHouseNo(""); setFundAmount("500"); }, () => request("/api/welfare/funds").then((d) => setFunds(Array.isArray(d) ? d : [])))}>
            <label style={styles.label}>{t("lbl_house_no")}<input style={inputStyle} value={fundHouseNo} onChange={(e) => setFundHouseNo(e.target.value)} placeholder="H-1" required /></label>
            <label style={styles.label}>{t("lbl_fee_amount")}<input type="number" min="0" style={inputStyle} value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} required /></label>
            <button style={{ ...styles.button, background: "#10b981", color: "#fff" }}>{t("btn_save_fund")}</button>
          </form>
        </div>
        <div style={panel}><h2>{t("list_title_fund")}</h2><div style={styles.tableWrap}><table style={styles.table}><thead><tr style={tableHeader}>{["th_house", "th_amount", "th_date", "th_action"].map((k) => <th style={thStyle} key={k}>{t(k)}</th>)}</tr></thead><tbody>
          {funds.length === 0 ? <tr><td style={tdStyle} colSpan={4}>{t("empty_funds")}</td></tr> : funds.map((item, index) => <tr key={item._id || index}><td style={tdStyle}>{item.houseNo || item.houseNumber || "-"}</td><td style={tdStyle}>LKR {Number(item.amount || 0).toLocaleString()}</td><td style={tdStyle}>{item.date || "-"}</td><td style={tdStyle}><div style={styles.group}><button type="button" style={{ ...styles.button, background: "#2563eb", color: "#fff" }} onClick={() => openEdit("fund", item)}>{t("btn_edit")}</button><button type="button" style={{ ...styles.button, background: "#dc2626", color: "#fff" }} onClick={() => deleteRecord(`/api/welfare/funds/${item._id}`, t("confirm_fund"), () => request("/api/welfare/funds").then((d) => setFunds(Array.isArray(d) ? d : [])))}>{t("btn_delete")}</button></div></td></tr>)}
        </tbody></table></div></div>
      </section>}

      {activeTab === "announcements" && <section style={styles.grid}>
        <div style={panel}><h2>{t("form_title_notice")}</h2>
          <form style={styles.form} onSubmit={(e) => handleSubmit(e, "/api/announcements", { title: noticeTitle.trim(), description: noticeContent.trim(), category: "Welfare", date: new Date().toISOString() }, "නිවේදනය පළ කරන ලදී!", () => { setNoticeTitle(""); setNoticeContent(""); }, () => request("/api/announcements").then((d) => setNotices((Array.isArray(d) ? d : []).filter((n) => n.category === "Welfare"))) )}>
            <label style={styles.label}>{t("lbl_notice_title")}<input style={inputStyle} value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} required /></label>
            <label style={styles.label}>{t("lbl_notice_desc")}<textarea rows={4} style={{ ...inputStyle, resize: "vertical" }} value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} required /></label>
            <button style={{ ...styles.button, background: "#10b981", color: "#fff" }}>{t("btn_post_notice")}</button>
          </form>
        </div>
        <div style={panel}><h2>{t("list_title_notice")}</h2>{notices.length === 0 ? <p>{t("empty_notices")}</p> : <div style={{ display: "grid", gap: 12 }}>{notices.map((notice) => <article key={notice._id} style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 10, background: theme.input }}><h3 style={{ marginTop: 0 }}>{notice.title}</h3><p style={{ whiteSpace: "pre-wrap" }}>{notice.description}</p><div style={{ ...styles.group, justifyContent: "flex-end" }}><button type="button" style={{ ...styles.button, background: "#2563eb", color: "#fff" }} onClick={() => openEdit("notice", notice)}>{t("btn_edit")}</button><button type="button" style={{ ...styles.button, background: "#dc2626", color: "#fff" }} onClick={() => deleteRecord(`/api/announcements/${notice._id}`, t("confirm_notice"), () => request("/api/announcements").then((d) => setNotices((Array.isArray(d) ? d : []).filter((n) => n.category === "Welfare"))))}>{t("btn_delete")}</button></div></article>)}</div>}</div>
      </section>}

      {editing && <div style={styles.overlay} role="presentation"><section style={{ ...styles.modal, background: theme.card, color: theme.text }} role="dialog" aria-modal="true">
        <h2>{t(editing.kind === "member" ? "edit_member" : editing.kind === "fund" ? "edit_fund" : "edit_notice")}</h2>
        <form style={styles.form} onSubmit={submitEdit}>
          {editing.kind === "member" && <>
            <label style={styles.label}>{t("name")}<input style={inputStyle} value={editValues.fullName} onChange={(e) => setEditValues({ ...editValues, fullName: e.target.value })} required /></label>
            <label style={styles.label}>{t("phone")}<input style={inputStyle} value={editValues.phone} onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })} required /></label>
          </>}
          {editing.kind === "fund" && <label style={styles.label}>{t("lbl_fee_amount")}<input type="number" min="0" style={inputStyle} value={editValues.amount} onChange={(e) => setEditValues({ ...editValues, amount: e.target.value })} required /></label>}
          {editing.kind === "notice" && <>
            <label style={styles.label}>{t("lbl_notice_title")}<input style={inputStyle} value={editValues.title} onChange={(e) => setEditValues({ ...editValues, title: e.target.value })} required /></label>
            <label style={styles.label}>{t("lbl_notice_desc")}<textarea rows={4} style={inputStyle} value={editValues.description} onChange={(e) => setEditValues({ ...editValues, description: e.target.value })} required /></label>
          </>}
          <div style={{ ...styles.group, justifyContent: "flex-end" }}><button type="button" style={{ ...styles.button, background: theme.input, color: theme.text }} onClick={() => setEditing(null)}>{t("cancel")}</button><button style={{ ...styles.button, background: "#10b981", color: "#fff" }}>{t("save")}</button></div>
        </form>
      </section></div>}

      {logoutModal && <div style={styles.overlay}><section style={{ ...styles.modal, background: theme.card, color: theme.text }} role="dialog" aria-modal="true"><h2>🚪 {t("logout")}</h2><p>{t("logout_confirm")}</p><div style={{ ...styles.group, justifyContent: "flex-end" }}><button type="button" style={{ ...styles.button, background: theme.input, color: theme.text }} onClick={() => setLogoutModal(false)}>{t("cancel")}</button><button type="button" style={{ ...styles.button, background: "#dc2626", color: "#fff" }} onClick={confirmLogout}>{t("logout")}</button></div></section></div>}
    </main>
  );
}
