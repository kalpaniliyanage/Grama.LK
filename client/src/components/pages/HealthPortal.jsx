import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop";


const translations = {
  en: {
    establishments: "Hotels & Restaurants",
    overview: "Operational Overview",
    operationalOverview: "PHM Operational Overview",
    registeredMothers: "Registered Mothers",
    registeredChildren: "Registered Children",
    healthRequests: "Health Requests",
    addNew: "Add New",
    name: "Name",
    type: "Type",
    owner: "Owner",
    phone: "Phone",
    status: "Status",
    actions: "Actions",
    editProfile: "Edit Profile",
    saveProfile: "Save Profile",
    fullName: "Full Name",
    email: "Email Address",
    address: "Address",
    dashboard: "Dashboard",
    mothers: "Mothers",
    children: "Children",
    requests: "Requests",
    announcements: "Announcements",
    profile: "Profile",
    language: "Language",
    logout: "Logout",
    darkMode: "Dark Mode",
    loading: "Loading...",
    noData: "No records found",
    establishmentTitle: "Hotels & Restaurants Records Management",
    addEstablishment: "Add New Establishment",
    edit: "Edit",
    delete: "Delete",
    warningIssued: "Warning Issued",
    gradeA: "Grade A",
    gradeB: "Grade B",
    notSet: "Not Set",
    notAvailable: "N/A",

    mothersTitle: "Registered Mothers Records",
    registerMother: "Register New Mother",
    birthDate: "Birth Date",
    pregnancyStatus: "Pregnancy Status",
    months: "Months",

    childrenTitle: "Children Health Records (Infants & 1 Month - 10 Years)",
    addChildRecord: "Add New Child Record",
    childName: "Child Name",
    motherName: "Mother's Name",
    calculatedAge: "Calculated Age",
    weight: "Weight",
    vaccineStatus: "Vaccine Status",
    infant: "Infant",
    upToDate: "Up to Date",
    birthVaccine: "Birth vaccine",
    years: "Years",

    announcementTitle: "Publish New Announcement (PHM)",
    announcementPhoto: "Announcement Photo / Image URL (Optional)",
    title: "Title",
    details: "Details",
    publishAnnouncement: "Publish Announcement",

    profileSettings: "Profile Settings (PHM)",
    publicHealthMidwife: "Public Health Midwife",
    houseNumberId: "House Number / ID",
    saveChanges: "Save Changes",

    publicHealthInspector: "Public Health Inspector",
    operationaloverview: "PHI Operational Overview"
  },

  si: {
    establishments: "හෝටල් සහ ආපනශාලා",
    overview: "මෙහෙයුම් සාරාංශය",
    operationalOverview: "PHM මෙහෙයුම් සාරාංශය",
    registeredMothers: "ලියාපදිංචි මව්වරුන්",
    registeredChildren: "ලියාපදිංචි ළමුන්",
    healthRequests: "සෞඛ්‍ය ඉල්ලීම්",
    addNew: "අලුතින් එකතු කරන්න",
    name: "නම",
    type: "වර්ගය",
    owner: "හිමිකරු",
    phone: "දුරකථන අංකය",
    status: "තත්ත්වය",
    actions: "ක්‍රියාමාර්ග",
    editProfile: "පැතිකඩ සංස්කරණය",
    saveProfile: "පැතිකඩ සුරකින්න",
    fullName: "සම්පූර්ණ නම",
    email: "විද්‍යුත් තැපැල් ලිපිනය",
    address: "ලිපිනය",
    dashboard: "උපකරණ පුවරුව",
    mothers: "මව්වරුන්",
    children: "ළමුන්",
    requests: "ඉල්ලීම්",
    announcements: "නිවේදන",
    profile: "පැතිකඩ",
    language: "භාෂාව",
    logout: "ඉවත් වන්න",
    darkMode: "අඳුරු ප්‍රකාරය",
    loading: "පූරණය වෙමින් පවතී...",
    noData: "වාර්තා හමු නොවීය",
    establishmentTitle: "හෝටල් සහ ආපනශාලා වාර්තා කළමනාකරණය",
    addEstablishment: "නව ආයතනයක් එකතු කරන්න",
    edit: "සංස්කරණය",
    delete: "මකන්න",
    warningIssued: "අවවාද නිකුත් කර ඇත",
    gradeA: "A ශ්‍රේණිය",
    gradeB: "B ශ්‍රේණිය",
    notSet: "සඳහන් කර නැත",
    notAvailable: "නැත",

    mothersTitle: "ලියාපදිංචි මව්වරුන්ගේ වාර්තා",
    registerMother: "නව මවක් ලියාපදිංචි කරන්න",
    birthDate: "උපන් දිනය",
    pregnancyStatus: "ගර්භණී තත්ත්වය",
    months: "මාස",

    childrenTitle: "ළමා සෞඛ්‍ය වාර්තා (ළදරුවන් සහ මාස 1 සිට අවුරුදු 10 දක්වා)",
    addChildRecord: "නව ළමා වාර්තාවක් එකතු කරන්න",
    childName: "දරුවාගේ නම",
    motherName: "මවගේ නම",
    calculatedAge: "ගණනය කළ වයස",
    weight: "බර",
    vaccineStatus: "එන්නත් තත්ත්වය",
    infant: "ළදරුවා",
    upToDate: "එන්නත් යාවත්කාලීනයි",
    birthVaccine: "උපත් එන්නත",
    years: "අවුරුදු",

    announcementTitle: "නව නිවේදනයක් පළ කරන්න (PHM)",
    announcementPhoto: "නිවේදන ඡායාරූපය / රූප URL (අත්‍යවශ්‍ය නොවේ)",
    title: "මාතෘකාව",
    details: "විස්තර",
    publishAnnouncement: "නිවේදනය පළ කරන්න",

    profileSettings: "පැතිකඩ සැකසුම් (PHM)",
    publicHealthMidwife: "මහජන සෞඛ්‍ය වින්නඹු නිලධාරිනිය",
    houseNumberId: "නිවාස අංකය / හැඳුනුම් අංකය",
    saveChanges: "වෙනස්කම් සුරකින්න",

    publicHealthInspector: "මහජන සෞඛ්‍ය පරීක්ෂක",
    operationaloverview: "PHI මෙහෙයුම් සාරාංශය",
  },

  ta: {
    establishments: "ஹோட்டல்கள் மற்றும் உணவகங்கள்",
    overview: "செயல்பாட்டு மேலோட்டம்",
    operationalOverview: "PHM செயல்பாட்டு மேலோட்டம்",
    registeredMothers: "பதிவு செய்யப்பட்ட தாய்மார்கள்",
    registeredChildren: "பதிவு செய்யப்பட்ட குழந்தைகள்",
    healthRequests: "சுகாதாரக் கோரிக்கைகள்",
    addNew: "புதிதாகச் சேர்க்கவும்",
    name: "பெயர்",
    type: "வகை",
    owner: "உரிமையாளர்",
    phone: "தொலைபேசி எண்",
    status: "நிலை",
    actions: "செயல்கள்",
    editProfile: "சுயவிவரத்தைத் திருத்து",
    saveProfile: "சுயவிவரத்தைச் சேமி",
    fullName: "முழுப் பெயர்",
    email: "மின்னஞ்சல் முகவரி",
    address: "முகவரி",
    dashboard: "கட்டுப்பாட்டுப் பலகை",
    mothers: "தாய்மார்கள்",
    children: "குழந்தைகள்",
    requests: "கோரிக்கைகள்",
    announcements: "அறிவிப்புகள்",
    profile: "சுயவிவரம்",
    language: "மொழி",
    logout: "வெளியேறு",
    darkMode: "இருண்ட பயன்முறை",
    loading: "ஏற்றப்படுகிறது...",
    noData: "பதிவுகள் எதுவும் இல்லை",
    establishmentTitle: "ஹோட்டல்கள் மற்றும் உணவகங்கள் பதிவுகள் மேலாண்மை",
    addEstablishment: "புதிய நிறுவனத்தைச் சேர்க்கவும்",
    edit: "திருத்து",
    delete: "நீக்கு",
    warningIssued: "எச்சரிக்கை வழங்கப்பட்டது",
    gradeA: "தரம் A",
    gradeB: "தரம் B",
    notSet: "குறிப்பிடப்படவில்லை",
    notAvailable: "கிடைக்கவில்லை",

    mothersTitle: "பதிவு செய்யப்பட்ட தாய்மார்களின் பதிவுகள்",
    registerMother: "புதிய தாயைப் பதிவு செய்யவும்",
    birthDate: "பிறந்த தேதி",
    pregnancyStatus: "கர்ப்ப நிலை",
    months: "மாதங்கள்",

    childrenTitle: "குழந்தைகளின் சுகாதாரப் பதிவுகள் (கைக்குழந்தைகள் மற்றும் 1 மாதம் முதல் 10 வயது வரை)",
    addChildRecord: "புதிய குழந்தைப் பதிவைச் சேர்க்கவும்",
    childName: "குழந்தையின் பெயர்",
    motherName: "தாயின் பெயர்",
    calculatedAge: "கணக்கிடப்பட்ட வயது",
    weight: "எடை",
    vaccineStatus: "தடுப்பூசி நிலை",
    infant: "கைக்குழந்தை",
    upToDate: "தடுப்பூசிகள் புதுப்பிக்கப்பட்டுள்ளன",
    birthVaccine: "பிறப்புத் தடுப்பூசி",
    years: "ஆண்டுகள்",

    announcementTitle: "புதிய அறிவிப்பை வெளியிடவும் (PHM)",
    announcementPhoto: "அறிவிப்பு புகைப்படம் / பட URL (விருப்பத்தேர்வு)",
    title: "தலைப்பு",
    details: "விவரங்கள்",
    publishAnnouncement: "அறிவிப்பை வெளியிடவும்",

    profileSettings: "சுயவிவர அமைப்புகள் (PHM)",
    publicHealthMidwife: "பொது சுகாதார மருத்துவச்சி",
    houseNumberId: "வீட்டு எண் / அடையாள எண்",
    saveChanges: "மாற்றங்களைச் சேமி",

    publicHealthInspector: "பொது சுகாதார ஆய்வாளர்",
    operationaloverview: "PHI செயல்பாட்டு மேலோட்டம்",
  }
};

const t = (key, lang = "en") => translations[lang]?.[key] || key;

const styles = {
  app: {
    minHeight: "100vh",
    backgroundImage: `linear-gradient(135deg, rgba(15, 30, 26, 0.88) 0%, rgba(20, 50, 42, 0.82) 100%), url(${BG_IMAGE_URL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: "#f1f5f9",
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    background: "rgba(18, 38, 32, 0.65)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(167, 243, 208, 0.15)",
    padding: "18px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "250px minmax(0, 1fr)",
    gap: 24,
    padding: "28px 24px",
    maxWidth: 1400,
    margin: "0 auto",
  },
  sidebar: {
    background: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(167, 243, 208, 0.18)",
    padding: 20,
    borderRadius: 20,
    height: "fit-content",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  },
  content: { minWidth: 0 },
  card: {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(167, 243, 208, 0.2)",
    padding: 28,
    borderRadius: 20,
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
    marginBottom: 24,
    color: "#fff",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  button: {
    border: "1px solid rgba(167, 243, 208, 0.3)",
    borderRadius: 12,
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: 600,
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#fff",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.25)",
  },
  secondaryBtn: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: 600,
    background: "rgba(255, 255, 255, 0.12)",
    color: "#e2e8f0",
    transition: "all 0.3s ease",
  },
  dangerBtn: {
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: 600,
    background: "rgba(239, 68, 68, 0.6)",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  logoutButton: {
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    padding: "9px 18px",
    cursor: "pointer",
    fontWeight: 700,
    background: "rgba(225, 29, 72, 0.75)",
    color: "#fff",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 16px",
    border: "1px solid rgba(167, 243, 208, 0.25)",
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    background: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    outline: "none",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#a7f3d0"
  },
  navButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    marginBottom: 8,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.3s ease",
  },
  tableWrap: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  cell: {
    textAlign: "left",
    padding: 14,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: 14,
    color: "#f1f5f9",
    whiteSpace: "nowrap",
  },
  loginWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(135deg, rgba(15, 30, 26, 0.88) 0%, rgba(20, 50, 42, 0.85) 100%), url(${BG_IMAGE_URL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: 20,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 28,
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 860,
    marginTop: 20,
  },
  loginCard: {
    background: "rgba(255, 255, 255, 0.09)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(167, 243, 208, 0.25)",
    padding: 32,
    borderRadius: 24,
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
    flex: "1 1 340px",
    maxWidth: 390,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.65)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
    modalContent: {
    background: "rgba(160, 214, 198, 0.95)",
    border: "1px solid rgba(167, 243, 208, 0.3)",
    borderRadius: 24,
    padding: 28,
    maxWidth: 520,
    width: "100%",
    maxHeight: "85vh",
    overflowY: "auto",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    color: "#fff",
  },
  avatarContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #c084fc",
    boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    background: "#10b981",
    color: "#fff",
    border: "2px solid #0f1e1a",
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
    transition: "transform 0.2s ease",
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #a7f3d0",
  },
  announcementGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
    marginTop: 20,
  },
  announcementPublicCard: {
    background: "rgba(204, 248, 235, 0.85)",
    border: "1px solid rgba(167, 243, 208, 0.2)",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },
  announcementImage: {
    width: "100%",
    height: 190,
    objectFit: "cover",
  },
  announcementCardBody: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
};

const phmSections = [
  { id: "dashboard", label: "🏠 Dashboard" },
  { id: "mothers", label: "👩 Mothers Records" },
  { id: "children", label: "👶 Children Health Records (Infants & 1m-10y)" },
  { id: "announcements", label: "📢 Announcements" },
  { id: "profile", label: "👤 My Profile" },
];

const phiSections = [
  { id: "dashboard", label: "🏠 Dashboard" },
  { id: "establishments", label: "🏨 Hotels & Restaurants" },
  { id: "announcements", label: "📢 Announcements" },
  { id: "profile", label: "👤 My Profile" },
];

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("gramalkToken") ||
    sessionStorage.getItem("token") ||
    ""
  );
}

async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || result.error || `Request failed (${response.status})`);
  }
  return result;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function calculateAge(dob) {
  if (!dob) return { months: 0, years: 0, text: "N/A" };
  const birth = new Date(dob);
  const now = new Date();

  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months--;

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  let text = "";
  if (years > 0) {
    text = `${years} years ${remMonths} months`;
  } else {
    text = `${months} mos`;
  }

  return { months, years, text };
}


function Field({ label, value, onChange, type = "text", required = false, disabled = false, placeholder = "", isDark = false }) {
  return (
    <label style={{
      ...styles.label,
      color: isDark ? "#ffffff" : "#000000"
    }}>
      {label}
      <input
        style={{
          ...styles.input,
          color: isDark ? "#ffffff" : "#000000",
          background: isDark ? "#26352f" : "#ffffff",
          border: isDark ? "1px solid #64748b" : "1px solid #cbd5e1",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "text"
       }}
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
    </label>
  );
}


function HealthPortal() {
  const navigate = useNavigate();

  // Read the Dashboard language setting
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("gramalk_lang");
    return ["en", "si", "ta"].includes(savedLanguage)
      ? savedLanguage
      : "en";
  });

  // Read the Dashboard theme setting
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("gramalk_theme") === "dark"
      ? "dark"
      : "light";
  });

  // Derive isDark only after theme has been initialized
  const isDark = theme === "dark";

  const toggleTheme = () => {
  const newTheme = isDark ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("gramalk_theme", newTheme);
  window.dispatchEvent(new Event("gramalk-settings-changed"));
};

const changeLanguage = (newLanguage) => {
  setLanguage(newLanguage);
  localStorage.setItem("gramalk_lang", newLanguage);
  window.dispatchEvent(new Event("gramalk-language-changed"));
};

  const themeColors = {
  background: isDark ? "#101c19" : "#f3f7f4",
  surface: isDark ? "#1b2b26" : "#ffffff",
  card: isDark ? "#223630" : "#ffffff",
  text: isDark ? "#f1f5f9" : "#20332b",
  muted: isDark ? "#bdc9c4" : "#64756c",
  border: isDark ? "#3b554a" : "#d8e5dc",
  input: isDark ? "#263b33" : "#ffffff",
  accent: isDark ? "#6ee7b7" : "#087f5b",
};

  // Keep this portal synchronized with the language/theme selected on the main dashboard.
  // The custom event is required for same-tab updates; the storage event covers other tabs.
  useEffect(() => {
    const syncSettings = () => {
      const savedLanguage = localStorage.getItem("gramalk_lang");
      const savedTheme = localStorage.getItem("gramalk_theme");

      if (["en", "si", "ta"].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
      setTheme(savedTheme === "dark" ? "dark" : "light");
    };

    syncSettings();
    window.addEventListener("storage", syncSettings);
    window.addEventListener("gramalk-settings-changed", syncSettings);
    window.addEventListener("gramalk-language-changed", syncSettings);

    return () => {
      window.removeEventListener("storage", syncSettings);
      window.removeEventListener("gramalk-settings-changed", syncSettings);
      window.removeEventListener("gramalk-language-changed", syncSettings);
    };
  }, []);

  // Apply the selected language to the document for correct Sinhala/Tamil rendering.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-language", language);
  }, [language]);

  const themeCss = `
  [data-health-theme="light"] {
    color: #1f2937 !important;
  }

  [data-health-theme="light"] h1,
  [data-health-theme="light"] h2,
  [data-health-theme="light"] h3,
  [data-health-theme="light"] h4,
  [data-health-theme="light"] p,
  [data-health-theme="light"] td,
  [data-health-theme="light"] th,
  [data-health-theme="light"] small,
  [data-health-theme="light"] strong {
    color: #24352d !important;
  }

  [data-health-theme="light"] aside,
  [data-health-theme="light"] main > div {
    background: #ffffff !important;
    border-color: #d7e5dc !important;
    color: #24352d !important;
  }

  [data-health-theme="light"] input,
  [data-health-theme="light"] textarea,
  [data-health-theme="light"] select {
    background: #ffffff !important;
    color: #1f2937 !important;
    border: 1px solid #b8cbbf !important;
  }

  [data-health-theme="light"] input::placeholder,
  [data-health-theme="light"] textarea::placeholder {
    color: #718078 !important;
    opacity: 1;
  }

  [data-health-theme="light"] aside button {
    color: #34483d !important;
  }

  [data-health-theme="light"] aside button[aria-current="page"] {
    color: #087f5b !important;
  }

  [data-health-theme="dark"] {
    color: #f1f5f9 !important;
  }

  [data-health-theme="dark"] h1,
  [data-health-theme="dark"] h2,
  [data-health-theme="dark"] h3,
  [data-health-theme="dark"] h4,
  [data-health-theme="dark"] p,
  [data-health-theme="dark"] td,
  [data-health-theme="dark"] th,
  [data-health-theme="dark"] small,
  [data-health-theme="dark"] strong {
    color: #e8f2ed !important;
  }

  [data-health-theme="dark"] aside,
  [data-health-theme="dark"] main > div {
    background: #1b2b26 !important;
    border-color: #3b554a !important;
    color: #e8f2ed !important;
  }

  [data-health-theme="dark"] input,
  [data-health-theme="dark"] textarea,
  [data-health-theme="dark"] select {
    background: #263b33 !important;
    color: #ffffff !important;
    border: 1px solid #587466 !important;
  }

  [data-health-theme="dark"] input::placeholder,
  [data-health-theme="dark"] textarea::placeholder {
    color: #bdc9c4 !important;
    opacity: 1;
  }

  [data-health-theme="light"] button {
  color: #ffffff;
}

  [data-health-theme="light"] aside button {
    color: #34483d !important;
  }

  [data-health-theme="dark"] button {
    color: #ffffff;
  }

  [data-health-theme="dark"] aside button {
    color: #e8f2ed !important;
  }

  [data-health-theme="light"] aside button {
    color: #34483d !important;
  }

  [data-health-theme="light"] table {
    color: #24352d !important;
  }

  [data-health-theme="light"] option {
    background: #ffffff;
    color: #1f2937;
  }

  [data-health-theme="dark"] option {
    background: #263b33;
    color: #ffffff;
  }
`;

  const t = (key) => translations[language]?.[key] || key;

  const phmSections = [
  { id: "dashboard", label: `🏠 ${t("dashboard")}` },
  { id: "mothers", label: `👩 ${t("mothers")}` },
  { id: "children", label: `👶 ${t("children")}` },
  { id: "announcements", label: `📢 ${t("announcements")}` },
  { id: "profile", label: `👤 ${t("profile")}` },
];

const phiSections = [
  { id: "dashboard", label: `🏠 ${t("dashboard")}` },
  { id: "establishments", label: `🏨 ${t("establishments")}` },
  { id: "announcements", label: `📢 ${t("announcements")}` },
  { id: "profile", label: `👤 ${t("profile")}` },
];

  // Keep your existing useState declarations below this line.
  const [authenticatedRole, setAuthenticatedRole] = useState(() => {
    return localStorage.getItem("authenticatedRole") || null;
  });

  const [phiUser, setPhiUser] = useState("healthPhi");
  const [phiPass, setPhiPass] = useState("");
  const [phmUser, setPhmUser] = useState("healthPhm");
  const [phmPass, setPhmPass] = useState("");

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: "", email: "", phone: "", houseNumber: "", photoUrl: "" });

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const [members, setMembers] = useState([]);
  const [mothers, setMothers] = useState([]);
  const [children, setChildren] = useState([]);
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [establishments, setEstablishments] = useState([]);

  const [showMotherModal, setShowMotherModal] = useState(false);
  const [isEditingMother, setIsEditingMother] = useState(false);
  const [motherForm, setMotherForm] = useState({ id: null, memberId: "", name: "", nic: "", dob: "", phone: "", pregnancyMonths: "", address: "" });

  const [showChildModal, setShowChildModal] = useState(false);
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [childForm, setChildForm] = useState({
    id: null,
    childName: "",
    motherNic: "",
    dob: "",
    weight: "",
    vaccineStatus: "Up to Date",
    latestVaccine: "",
    vaccineDate: ""
  });

  const [showEstModal, setShowEstModal] = useState(false);
  const [isEditingEst, setIsEditingEst] = useState(false);
  const [estForm, setEstForm] = useState({ id: null, name: "", type: "Restaurant", owner: "", status: "Grade A", phone: "" });

  const [announcementForm, setAnnouncementForm] = useState({ id: null, title: "", content: "", imageUrl: "" });
  const [isEditingAnnouncement, setIsEditingAnnouncement] = useState(false);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      // Database eken villagers/members fetch karaganeema (/api/members)
      const membersRes = await apiRequest("/api/members").catch(() => []);
      setMembers(asArray(membersRes));

      if (authenticatedRole === "PHM") {
        const mothersRes = await apiRequest("/api/mothers").catch(() => []);
        const childrenRes = await apiRequest("/api/children").catch(() => []);
        const requestsRes = await apiRequest("/api/requests").catch(() => []);

        setMothers(asArray(mothersRes));
        setChildren(asArray(childrenRes));
        setRequests(asArray(requestsRes));
      } else if (authenticatedRole === "PHI") {
        const estRes = await apiRequest("/api/establishments").catch(() => []);
        setEstablishments(asArray(estRes));
      }

      try {
        const annRes = await apiRequest(
          `/api/announcements?role=${authenticatedRole}`
     );

      console.log("Announcements from database:", annRes);
        setAnnouncements(asArray(annRes));

      } catch (error) {
        console.error("Announcements loading error:", error);
      }
      } catch (err) {
        console.error("Database connection failed", err);
      } finally {
        setLoading(false);
      }
    }, [authenticatedRole]);

  useEffect(() => {
    if (authenticatedRole) {
      fetchAllData();
    }
  }, [authenticatedRole, fetchAllData]);

  const loadProfile = useCallback(async () => {
    try {
      const result = await apiRequest("/api/me");
      const user = result.user || result.data || result;
      setProfile(user);
      setProfileForm({
        fullName: user.fullName || user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        houseNumber: user.houseNumber || "",
        photoUrl: user.photoUrl || "",
      });
    } catch (err) {
      console.error("Profile loading failed:", err);

      setProfile(null);

      setProfileForm({
        fullName: "",
        email: "",
        phone: "",
        houseNumber: "",
        photoUrl: "",
      });
    }
  }, []);

  const handlePhotoFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm((prev) => ({ ...prev, photoUrl: reader.result }));
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("කැමරාව ක්‍රියාත්මක කිරීමට නොහැකි විය.");
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 300;
      canvas.height = videoRef.current.videoHeight || 300;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setProfileForm((prev) => ({ ...prev, photoUrl: canvas.toDataURL("image/png") }));

      const stream = videoRef.current.srcObject;
      if (stream) stream.getTracks().forEach((track) => track.stop());
      setShowCamera(false);
      setShowPhotoModal(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const handleDeletePhoto = () => {
    setProfileForm((prev) => ({ ...prev, photoUrl: "" }));
    setShowPhotoModal(false);
  };

  const handleSelectMemberForMother = (memberId) => {
    const selected = members.find((m) => String(m._id || m.id) === String(memberId));
    if (selected) {
      setMotherForm((prev) => ({
        ...prev,
        memberId: selected._id || selected.id,
        name: selected.fullName || selected.name || "",
        nic: selected.nic || "",
        dob: selected.dob || selected.birthDate || "",
        phone: selected.phone || "",
        address: selected.address || "",
      }));
    }
  };

  const handleSelectMemberForChild = (memberId) => {
    const selected = members.find((m) => String(m._id || m.id) === String(memberId));
    if (selected) {
      const dob = selected.dob || selected.birthDate || "";
      setChildForm((prev) => ({
        ...prev,
        childName: selected.fullName || selected.name || "",
        dob: dob,
      }));
    }
  };

  const handleSaveMother = async (e) => {
    e.preventDefault();
    try {
      const recordId = motherForm._id || motherForm.id;
      if (isEditingMother && recordId) {
        const updated = await apiRequest(`/api/mothers/${recordId}`, {
          method: "PUT",
          body: JSON.stringify(motherForm)
        });
        setMothers(mothers.map((m) => (String(m._id || m.id) === String(recordId) ? updated : m)));
        setMessage("මව්වරුන්ගේ තොරතුරු සාර්ථකව යාවත්කාලීන විය! 🎉");
      } else {
        const saved = await apiRequest("/api/mothers", {
          method: "POST",
          body: JSON.stringify(motherForm)
        });
        setMothers([saved, ...mothers]);
        setMessage("අලුත් මවගේ තොරතුරු ඩේටාබේස් එකේ ගබඩා විය! 🎉");
      }
      setShowMotherModal(false);
      setIsEditingMother(false);
      fetchAllData();
    } catch (err) {
      alert("දත්ත සුරැකීම අසමත් විය: " + err.message);
    }
  };

  const handleSaveChild = async (e) => {
    e.preventDefault();
    try {
      const recordId = childForm._id || childForm.id;
      if (isEditingChild && recordId) {
        const updated = await apiRequest(`/api/children/${recordId}`, {
          method: "PUT",
          body: JSON.stringify(childForm)
        });
        setChildren(children.map((c) => (String(c._id || c.id) === String(recordId) ? updated : c)));
        setMessage("ළමා සෞඛ්‍ය වාර්තාව යාවත්කාලීන විය! 👶");
      } else {
        const saved = await apiRequest("/api/children", {
          method: "POST",
          body: JSON.stringify(childForm)
        });
        setChildren([saved, ...children]);
        setMessage("අලුත් ළමා වාර්තාව ඩේටාබේස් එකේ ගබඩා විය! 👶");
      }
      setShowChildModal(false);
      setIsEditingChild(false);
      fetchAllData();
    } catch (err) {
      alert("දත්ත සුරැකීම අසමත් විය: " + err.message);
    }
  };

  const handleSaveEstablishment = async (e) => {
    e.preventDefault();
    try {
      const recordId = estForm._id || estForm.id;
      if (isEditingEst && recordId) {
        const updated = await apiRequest(`/api/establishments/${recordId}`, {
          method: "PUT",
          body: JSON.stringify(estForm)
        });
        setEstablishments(establishments.map((est) => (String(est._id || est.id) === String(recordId) ? updated : est)));
        setMessage("ස්ථානයේ විස්තර යාවත්කාලීන විය!");
      } else {
        const newEst = { ...estForm, lastInspected: new Date().toISOString().slice(0, 10) };
        const saved = await apiRequest("/api/establishments", {
          method: "POST",
          body: JSON.stringify(newEst)
        });
        setEstablishments([saved, ...establishments]);
        setMessage("අලුත් ස්ථානය සාර්ථකව ඇතුළත් විය!");
      }
      setShowEstModal(false);
      setIsEditingEst(false);
      fetchAllData();
    } catch (err) {
      alert("දත්ත සුරැකීම අසමත් විය: " + err.message);
    }
  };

  const handleDeleteMother = async (id) => {
    if (window.confirm("ඔබට මෙම තොරතුරු ඉවත් කිරීමට අවශ්‍යද?")) {
      setMothers(mothers.filter((m) => (m._id || m.id) !== id));
      await apiRequest(`/api/mothers/${id}`, { method: "DELETE" }).catch(() => {});
      setMessage("තොරතුරු ඉවත් කරන ලදී!");
    }
  };

  const handleDeleteChild = async (id) => {
    if (window.confirm("ඔබට මෙම ළමා වාර්තාව ඉවත් කිරීමට අවශ්‍යද?")) {
      setChildren(children.filter((c) => (c._id || c.id) !== id));
      await apiRequest(`/api/children/${id}`, { method: "DELETE" }).catch(() => {});
      setMessage("ළමා වාර්තාව ඉවත් කරන ලදී!");
    }
  };

  const handleDeleteEst = async (id) => {
    if (window.confirm("ඔබට මෙම ස්ථානයේ වාර්තාව ඉවත් කිරීමට අවශ්‍යද?")) {
      setEstablishments(establishments.filter((est) => (est._id || est.id) !== id));
      await apiRequest(`/api/establishments/${id}`, { method: "DELETE" }).catch(() => {});
      setMessage("ස්ථානයේ වාර්තාව ඉවත් කරන ලදී!");
    }
  };


  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await apiRequest("/api/me", {
        method: "PUT",
        body: JSON.stringify(profileForm),
      });

      setProfile({ ...profile, ...profileForm });
      setMessage("Profile එක සාර්ථකව යාවත්කාලීන විය!");
    } catch (err) {
      console.error("Profile Save Error:", err);
      setMessage("Profile එක Save කිරීම අසාර්ථකයි: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handlePhiLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend එකේ /api/login වෙත Request එක යැවීම
      const result = await apiRequest("/api/login", {
        method: "POST",
        body: JSON.stringify({ username: phiUser, password: phiPass }),
      });

      if (result.success && result.token) {
        // Token එක සහ Role එක LocalStorage එකේ Save කරගැනීම
        localStorage.setItem("token", result.token);
        localStorage.setItem("authenticatedRole", "PHI");
        window.dispatchEvent(new Event("gramalk-settings-changed"));

        setAuthenticatedRole("PHI");
        setActiveSection("dashboard");
        loadProfile();
        setError("");
      }
    } catch (err) {
      setError("PHI Login failed: " + err.message);
    }
  };

  const handlePhmLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend එකේ /api/login වෙත Request එක යැවීම
      const result = await apiRequest("/api/login", {
        method: "POST",
        body: JSON.stringify({ username: phmUser, password: phmPass }),
      });

      if (result.success && result.token) {
        // Token එක සහ Role එක LocalStorage එකේ Save කරගැනීම
        localStorage.setItem("token", result.token);
        localStorage.setItem("authenticatedRole", "PHM");

        setAuthenticatedRole("PHM");
        setActiveSection("dashboard");
        loadProfile();
        setError("");
      }
    } catch (err) {
      setError("PHM Login failed: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticatedRole");
    setAuthenticatedRole(null);
    navigate("/", { replace: true });
  };

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const recordId = announcementForm._id || announcementForm.id;
      if (isEditingAnnouncement && recordId) {
        const updated = await apiRequest(`/api/announcements/${recordId}`, { method: "PUT", body: JSON.stringify(announcementForm) });
        setAnnouncements(announcements.map((a) => (String(a._id || a.id) === String(recordId) ? updated : a)));
        setMessage("නිවේදනය සාර්ථකව සංස්කරණය විය!");
      } else {
        const newAnn = { role: authenticatedRole, title: announcementForm.title, content: announcementForm.content, imageUrl: announcementForm.imageUrl };
        const saved = await apiRequest("/api/announcements", { method: "POST", body: JSON.stringify(newAnn) });
        setAnnouncements([saved, ...announcements]);
        setMessage("නව නිවේදනය සාර්ථකව පළ විය!");
      }
      setAnnouncementForm({ id: null, title: "", content: "", imageUrl: "" });
      setIsEditingAnnouncement(false);
      fetchAllData();
    } catch (err) {
      alert("දත්ත සුරැකීම අසමත් විය: " + err.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm("ඔබට මෙම නිවේදනය ඉවත් කිරීමට අවශ්‍යද?")) {
      setAnnouncements(announcements.filter((a) => (a._id || a.id) !== id));
      await apiRequest(`/api/announcements/${id}`, { method: "DELETE" }).catch(() => {});
      setMessage("නිවේදනය ඉවත් කරන ලදී!");
    }
  };

  const hoverProps = {
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(167, 243, 208, 0.25)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.25)";
    },
  };

  // Filter 1 month to 10 years children from members table
  const childMembersFilter = members.filter((m) => {
    const age = calculateAge(m.dob || m.birthDate);
    return age.months >= 1 && age.years <= 10;
  });

  const sections = authenticatedRole === "PHI" ? phiSections : phmSections;

  if (!authenticatedRole) {
    return (
      <div
        data-health-theme={theme}
        style={{
        ...styles.loginWrapper,
        backgroundImage: "none",
        background: themeColors.background,
        color: themeColors.text,
     }}
    >

  <style>{themeCss}</style>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ color: themeColors.accent, margin: 0, fontSize: 34, fontWeight: 800 }}>🏥 GramaLK Health Portal</h1>
          <p style={{ color: themeColors.muted, marginTop: 8 }}>කරුණාකර ඔබගේ නිලධාරී ගිණුම තෝරා ඇතුළු වන්න.</p>
        </div>

        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.25)", color: "#fca5a5", padding: 12, borderRadius: 12, marginBottom: 16, width: "100%", maxWidth: 760, textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={styles.cardsContainer}>
          <div style={styles.loginCard} {...hoverProps}>
            <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>👨‍⚕️ PHI Login</h2>
            <p style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 20 }}>Public Health Inspector (මහජන සෞඛ්‍ය පරීක්ෂක)</p>
            <form onSubmit={handlePhiLogin}>
              <Field label="Username" value={phiUser} onChange={setPhiUser} required isDark={isDark}/>
              <Field label="Password" type="password" value={phiPass} onChange={setPhiPass} required isDark={isDark}/>
              <button type="submit" style={{ ...styles.button, width: "100%", marginTop: 10 }}>Login as PHI</button>
            </form>
          </div>

          <div style={styles.loginCard} {...hoverProps}>
            <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>👩‍⚕️ PHM Login</h2>
            <p style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 20 }}>Public Health Midwife (පවුල් සෞඛ්‍ය නිලධාරිනී)</p>
            <form onSubmit={handlePhmLogin}>
              <Field label="Username" value={phmUser} onChange={setPhmUser} required isDark={isDark}/>
              <Field label="Password" type="password" value={phmPass} onChange={setPhmPass} required isDark={isDark}/>
              <button type="submit" style={{ ...styles.button, width: "100%", marginTop: 10 }}>Login as PHM</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
          <div
              data-health-theme={theme}
              style={{
                ...styles.app,
                backgroundImage: "none",
                background: themeColors.background,
                color: themeColors.text,
              }}
            >
          <style>{themeCss}</style>

      <header
          style={{
            ...styles.header,
            background: themeColors.surface,
            borderBottom: `1px solid ${themeColors.border}`,
            color: themeColors.text,
          }}
        >

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {profile?.photoUrl ? (
            <img src={profile.photoUrl} alt="Officer Avatar" style={styles.headerAvatar} />
          ) : (
            <div style={{ ...styles.headerAvatar, background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              {authenticatedRole}
            </div>
          )}
          <div>
            <h1 style={{ margin: 0, fontSize: 24, color: "#a7f3d0" }}>
              {authenticatedRole === "PHI" ? "👨‍⚕️ PHI Health Portal" : "👩‍⚕️ PHM Health Portal"}
            </h1>
            <p style={{ margin: "2px 0 0", color: "#cbd5e1", fontSize: 13 }}>
              {profile?.fullName || (authenticatedRole === "PHI" ? "Public Health Inspector" : "Public Health Midwife")}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>

        <button
          type="button"
          style={styles.secondaryBtn}
          onClick={toggleTheme}>
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{
            ...styles.input,
            width: "auto",
            margin: 0,
            padding: "8px 12px"
          }}>
          <option value="en">English</option>
          <option value="si">සිංහල</option>
          <option value="ta">தமிழ்</option>
        </select>

        <button type="button" style={styles.logoutButton} onClick={handleLogout}>
          ↪ Logout
        </button>

      </div>
      </header>

      <div style={styles.layout}>

        <aside
          style={{
            ...styles.sidebar,
            background: themeColors.surface,
            border: `1px solid ${themeColors.border}`,
            color: themeColors.text,
          }}
        >
          <h3 style={{ margin: "0 8px 16px", color: "#a7f3d0", fontSize: 15, textTransform: "uppercase" }}>Navigation</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              data-active={activeSection === section.id ? "true" : "false"}
              onClick={() => {
                setActiveSection(section.id);
                if (section.id === "profile") loadProfile();
              }}
              style={{
                ...styles.navButton,
                background: activeSection === section.id
                  ? (isDark ? "#263f35" : "#e8f5ee")
                  : "transparent",

                color: activeSection === section.id
                  ? themeColors.accent
                  : themeColors.muted,
                fontWeight: activeSection === section.id ? 700 : 500,
                borderLeft: activeSection === section.id ? "4px solid #10b981" : "4px solid transparent",
              }}
            >
              {section.label}
            </button>
          ))}
        </aside>

        <main style={styles.content}>
          {message && <div style={{ ...styles.card, background: "rgba(16, 185, 129, 0.25)", color: "#a7f3d0" }}>{message}</div>}

          {/* PHM DASHBOARD */}
          {authenticatedRole === "PHM" && activeSection === "dashboard" && (
            <div style={styles.card} {...hoverProps}>
              <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>
                📊 {t("operationalOverview")}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18, marginTop: 16 }}>

                <div
                onClick={() => setActiveSection("mothers")}
                {...hoverProps}
                style={{
                  background: isDark ? "#3b2457" : "#f3e8ff",
                  padding: 20,
                  borderRadius: 16,
                  border: "1px solid #c084fc"
                }}>
                  <p style={{ margin: 0, color: isDark ? "#fff" : "#581c87" }}>
                    👩 {t("registeredMothers")}
                  </p>
                  <strong style={{ fontSize: 32, color: isDark ? "#e9d5ff" : "#6b21a8" }}>
                    {mothers.length}
                  </strong>
                </div>

                <div
                onClick={() => setActiveSection("children")}
                {...hoverProps}
                style={{
                  background: isDark ? "#123b55" : "#e0f2fe",
                  padding: 20,
                  borderRadius: 16,
                  border: "1px solid #38bdf8"
                }}>
                  <p style={{ margin: 0, color: isDark ? "#fff" : "#075985" }}>
                    👶 {t("registeredChildren")}
                  </p>
                  <strong style={{ fontSize: 32, color: isDark ? "#bae6fd" : "#0369a1" }}>
                    {children.length}
                  </strong>
                </div>

                <div
                onClick={() => setActiveSection("announcements")}
                {...hoverProps}
                style={{
                  background: isDark ? "#59451c" : "#fef3c7",
                  padding: 20,
                  borderRadius: 16,
                  border: "1px solid #fbbf24"
                }}>
                  <p style={{ margin: 0, color: isDark ? "#fff" : "#92400e" }}>
                    📢 {t("announcements")}
                  </p>
                  <strong style={{ fontSize: 32, color: isDark ? "#fde68a" : "#b45309" }}>
                    {announcements.length}
                  </strong>
                </div>

              </div>
            </div>
          )}

                    {/* PHI DASHBOARD */}
          {authenticatedRole === "PHI" && activeSection === "dashboard" && (
            <div style={styles.card} {...hoverProps}>
              <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>
                📊 {t("operationalOverview")}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18, marginTop: 16 }}>
                <div
                  style={{
                    background: isDark ? "#3b2457" : "#f3e8ff",
                    padding: 20,
                    borderRadius: 16,
                    border: "1px solid #c084fc",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSection("establishments")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(168, 85, 247, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  >
                  <p style={{ margin: 0, color: "#cbd5e1" }}>🏨 {t("establishments")}</p>
                  <strong style={{ fontSize: 32, color: "#a7f3d0" }}>{establishments.length}</strong>
                </div>
                <div
                  style={{
                    background: isDark ? "#59451c" : "#fef3c7",
                    padding: 20,
                    borderRadius: 16,
                    border: "1px solid #fbbf24",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSection("announcements")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(251, 191, 36, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  >
                  <p style={{ margin: 0, color: isDark ? "#fff" : "#92400e" }}>
                    📢 {t("announcements")}
                  </p>
                  <strong style={{ fontSize: 32, color: isDark ? "#fde68a" : "#b45309" }}>
                    {announcements.length}
                  </strong>
                </div>
              </div>
            </div>
          )}

                    {/* PHI - HOTELS & RESTAURANTS */}
          {authenticatedRole === "PHI" && activeSection === "establishments" && (
            <div style={styles.card} {...hoverProps}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <h2>🏨 {t("establishmentTitle")}</h2>
                <button type="button" style={styles.button} onClick={() => { setEstForm({ id: null, name: "", type: "Restaurant", owner: "", status: "Grade A", phone: "" }); setIsEditingEst(false); setShowEstModal(true); }}>
                  ➕ {t("addEstablishment")}
                </button>
              </div>

              <div style={{
                ...styles.tableWrap,
                background: isDark ? "#1e293b" : "#ffffff",
                border: isDark ? "1px solid #475569" : "1px solid #dbeafe",
                borderRadius: 16,
                padding: 12,
                overflowX: "auto",
                boxShadow: isDark
                  ? "0 8px 25px rgba(0,0,0,0.25)"
                  : "0 8px 25px rgba(30,64,175,0.08)"
              }}>
                <table style={{
                  ...styles.table,
                  tableLayout: "auto",
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px"
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        ...styles.cell,
                        background: isDark ? "#263f35" : "#d1fae5",
                        color: isDark ? "#a7f3d0" : "#065f46",
                        padding: "16px 12px",
                        fontWeight: 700,
                        borderBottom: "2px solid #10b981",
                        whiteSpace: "nowrap"
                      }}>{t("name")}</th>
                      <th style={{
                        ...styles.cell,
                        background: isDark ? "#263f35" : "#d1fae5",
                        color: isDark ? "#a7f3d0" : "#065f46",
                        padding: "16px 12px",
                        fontWeight: 700,
                        borderBottom: "2px solid #10b981",
                        whiteSpace: "nowrap"
                      }}>{t("type")}</th>
                      <th style={{
                        ...styles.cell,
                        background: isDark ? "#263f35" : "#d1fae5",
                        color: isDark ? "#a7f3d0" : "#065f46",
                        padding: "16px 12px",
                        fontWeight: 700,
                        borderBottom: "2px solid #10b981",
                        whiteSpace: "nowrap"
                      }}>{t("owner")}</th>
                      <th style={{
                        ...styles.cell,
                        background: isDark ? "#263f35" : "#d1fae5",
                        color: isDark ? "#a7f3d0" : "#065f46",
                        padding: "16px 12px",
                        fontWeight: 700,
                        borderBottom: "2px solid #10b981",
                        whiteSpace: "nowrap"
                      }}>{t("phone")}</th>
                      <th style={{
                        ...styles.cell,
                        background: isDark ? "#263f35" : "#d1fae5",
                        color: isDark ? "#a7f3d0" : "#065f46",
                        padding: "16px 12px",
                        fontWeight: 700,
                        borderBottom: "2px solid #10b981",
                        whiteSpace: "nowrap"
                      }}>{t("status")}</th>
                      <th style={{
                        ...styles.cell,
                        background: isDark ? "#263f35" : "#d1fae5",
                        color: isDark ? "#a7f3d0" : "#065f46",
                        padding: "16px 12px",
                        fontWeight: 700,
                        borderBottom: "2px solid #10b981",
                        whiteSpace: "nowrap"
                      }}>{t("actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {establishments.map((est) => (
                      <tr key={est._id || est.id}>
                        <td style={{
                          ...styles.cell,
                          background: isDark ? "#263445" : "#f8fafc",
                          color: isDark ? "#e2e8f0" : "#334155",
                          padding: "15px 12px",
                          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0"
                        }}><strong>{est.name}</strong></td>
                        <td style={{
                          ...styles.cell,
                          background: isDark ? "#263445" : "#f8fafc",
                          color: isDark ? "#e2e8f0" : "#334155",
                          padding: "15px 12px",
                          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0"
                        }}>{est.type === "Restaurant" ? t("restaurant") : est.type === "Food Store" ? t("foodStore") : est.type === "Bakery" ? t("bakery") : est.type}</td>
                        <td style={{
                          ...styles.cell,
                          background: isDark ? "#263445" : "#f8fafc",
                          color: isDark ? "#e2e8f0" : "#334155",
                          padding: "15px 12px",
                          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0"
                        }}>{est.owner}</td>
                        <td style={{
                          ...styles.cell,
                          background: isDark ? "#263445" : "#f8fafc",
                          color: isDark ? "#e2e8f0" : "#334155",
                          padding: "15px 12px",
                          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0"
                        }}>{est.phone || t("notAvailable")}</td>
                        <td style={{
                          ...styles.cell,
                          background: isDark ? "#263445" : "#f8fafc",
                          color: isDark ? "#e2e8f0" : "#334155",
                          padding: "15px 12px",
                          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0"
                        }}>
                          <span style={{
                            padding: "6px 12px",
                            borderRadius: 20,
                            display: "inline-block",
                            fontSize: 12,
                            fontWeight: 700,
                            background: String(est.status || "").includes("Grade A")
                              ? (isDark ? "#14532d" : "#dcfce7")
                              : String(est.status || "").includes("Grade B")
                              ? (isDark ? "#713f12" : "#fef3c7")
                              : (isDark ? "#7f1d1d" : "#fee2e2"),
                            color: String(est.status || "").includes("Grade A")
                              ? (isDark ? "#bbf7d0" : "#166534")
                              : String(est.status || "").includes("Grade B")
                              ? (isDark ? "#fde68a" : "#92400e")
                              : (isDark ? "#fecaca" : "#991b1b")
                          }}>
                            {est.status === "Grade A" ? t("gradeA") : est.status === "Grade B" ? t("gradeB") : est.status === "Warning Issued" ? t("warningIssued") : est.status || t("notSet")}
                          </span>
                        </td>
                        <td style={{
                          ...styles.cell,
                          background: isDark ? "#263445" : "#f8fafc",
                          color: isDark ? "#e2e8f0" : "#334155",
                          padding: "15px 12px",
                          borderBottom: isDark ? "1px solid #475569" : "1px solid #e2e8f0"
                        }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button type="button" style={{ ...styles.secondaryBtn, padding: "5px 10px", fontSize: 12, color: "#000000"}} onClick={() => { setEstForm(est); setIsEditingEst(true); setShowEstModal(true); }}>✏️ {t("edit")}</button>
                            <button type="button" style={styles.dangerBtn} onClick={() => handleDeleteEst(est._id || est.id)}>🗑️ {t("delete")}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


                    {/* MOTHERS SECTION (PHM) */}
          {authenticatedRole === "PHM" && activeSection === "mothers" && (
            <div style={{ ...styles.card, background: isDark ? "#3b2457" : "#f3e8ff", border: "1px solid #c084fc" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ color: isDark ? "#e9d5ff" : "#6b21a8" }}>👩 {t("mothersTitle")}</h2>

                <button type="button" style={styles.button} onClick={() => { setMotherForm({ id: null, memberId: "", name: "", nic: "", dob: "", phone: "", pregnancyMonths: "", address: "" }); setIsEditingMother(false); setShowMotherModal(true); }}>
                  ➕ {t("registerMother")}
                </button>
              </div>

              <div style={{ ...styles.tableWrap, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc", borderRadius: 12 }}>
                <table style={{ ...styles.table, tableLayout: "auto", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("name")}</th>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>NIC</th>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("birthDate")}</th>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("pregnancyStatus")}</th>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("phone")}</th>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("actions")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {mothers.map((m) => (
                      <tr key={m._id || m.id}>
                        <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                          <strong>{m.name}</strong>
                        </td>

                        <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                          {m.nic}
                        </td>

                        <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                          {m.dob || "N/A"}
                        </td>

                        <td style={{ ...styles.cell, borderBottom: "1px solid #c084fc" }}>
                          <span style={{
                            padding: "4px 10px",
                            borderRadius: 8,
                            background: isDark ? "#59451c" : "#fef3c7",
                            color: isDark ? "#fde68a" : "#92400e",
                            fontWeight: 500
                          }}>
                            {m.pregnancyMonths ? `${m.pregnancyMonths} ${t("months")}` : "N/A"}
                          </span>
                        </td>

                        <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                          {m.phone}
                        </td>

                        <td style={{ ...styles.cell, borderBottom: "1px solid #c084fc" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button type="button" style={{ ...styles.secondaryBtn, padding: "5px 10px", fontSize: 12, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", border: "1px solid #c084fc" }} onClick={() => { setMotherForm(m); setIsEditingMother(true); setShowMotherModal(true); }}>
                              ✏️ {t("edit")}
                            </button>

                            <button type="button" style={styles.dangerBtn} onClick={() => handleDeleteMother(m._id || m.id)}>
                              🗑️ {t("delete")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

                    {/* CHILDREN SECTION (PHM - Infants & 1 Month to 10 Years) */}
          {authenticatedRole === "PHM" && activeSection === "children" && (
            <div style={{ ...styles.card, background: isDark ? "#3b2457" : "#f3e8ff", border: "1px solid #c084fc" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ color: isDark ? "#e9d5ff" : "#6b21a8" }}>
                  👶 {t("childrenTitle")}
                </h2>

                <button type="button" style={styles.button} onClick={() => { setChildForm({ id: null, childName: "", motherNic: "", dob: "", weight: "", vaccineStatus: "Up to Date" }); setIsEditingChild(false); setShowChildModal(true); }}>
                  ➕ {t("addChildRecord")}
                </button>
              </div>

              <div style={{ ...styles.tableWrap, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc", borderRadius: 12 }}>
                <table style={{ ...styles.table, tableLayout: "auto", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("childName")}</th>

                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("motherName")}</th>

                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("birthDate")}</th>

                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("calculatedAge")}</th>

                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("weight")}</th>

                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("vaccineStatus")}</th>

                      <th style={{ ...styles.cell, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", borderBottom: "1px solid #c084fc" }}>{t("actions")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {children.map((c) => {
                      const matchedMother = mothers.find((m) => m.nic === c.motherNic);
                      const ageInfo = calculateAge(c.dob);

                      return (
                        <tr key={c._id || c.id}>
                          <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                            <strong>{c.childName}</strong>
                          </td>

                          <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                            {matchedMother ? matchedMother.name : "N/A"}
                          </td>

                          <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                            {c.dob}
                          </td>

                          <td style={{ ...styles.cell, borderBottom: "1px solid #c084fc" }}>
                            <span style={{ padding: "4px 8px", borderRadius: 6, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87" }}>
                              {ageInfo.text} {ageInfo.months < 12 ? `(${t("infant")})` : ""}
                            </span>
                          </td>

                          <td style={{ ...styles.cell, color: isDark ? "#f3e8ff" : "#581c87", borderBottom: "1px solid #c084fc" }}>
                            {c.weight} kg
                          </td>

                          <td style={{ ...styles.cell, borderBottom: "1px solid #c084fc" }}>
                            <span style={{ padding: "4px 10px", borderRadius: 8, background: isDark ? "#123b55" : "#e0f2fe", color: isDark ? "#bae6fd" : "#075985" }}>
                              {c.vaccineStatus === "Up to Date"
                                ? t("upToDate")
                                : c.vaccineStatus === "Birth vaccine"
                                  ? t("birthVaccine")
                                  : c.vaccineStatus}
                            </span>
                          </td>

                          <td style={{ ...styles.cell, borderBottom: "1px solid #c084fc" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button type="button" style={{ ...styles.secondaryBtn, padding: "5px 10px", fontSize: 12, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", border: "1px solid #c084fc" }} onClick={() => { setChildForm(c); setIsEditingChild(true); setShowChildModal(true); }}>
                                ✏️ {t("edit")}
                              </button>

                              <button type="button" style={styles.dangerBtn} onClick={() => handleDeleteChild(c._id || c.id)}>
                                🗑️ {t("delete")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

                    {/* ANNOUNCEMENTS SECTION */}
          {activeSection === "announcements" && (
            <>
              <div style={{ ...styles.card, background: isDark ? "#3b2457" : "#f3e8ff", border: "1px solid #c084fc" }} {...hoverProps}>
                <h2 style={{ color: isDark ? "#e9d5ff" : "#6b21a8" }}>📢 {isEditingAnnouncement ? t("edit") + " " + t("announcements") : t("announcementTitle").replace("(PHM)", `(${authenticatedRole})`)}</h2>
                <form onSubmit={handleSaveAnnouncement}>
                  <Field
                    label={t("announcementPhoto")}
                    value={announcementForm.imageUrl}
                    onChange={(v) => setAnnouncementForm({ ...announcementForm, imageUrl: v })}
                    placeholder={t("Paste Image Url")}
                    isDark={isDark}
                  />
                  <Field
                    label={t("title")}
                    value={announcementForm.title}
                    onChange={(v) => setAnnouncementForm({ ...announcementForm, title: v })}
                    required
                    isDark={isDark}
                  />
                  <label style={{ ...styles.label, color: isDark ? "#ffffff" : "#581c87" }}>
                    {t("details")}
                    <textarea
                      style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      required
                    />
                  </label>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button style={styles.button} type="submit">
                      {isEditingAnnouncement ? "💾 " + t("updateAnnouncement") : "📢 " + t("publishAnnouncement")}
                    </button>
                    {isEditingAnnouncement && (
                      <button
                        type="button"
                        style={styles.secondaryBtn}
                        onClick={() => {
                          setIsEditingAnnouncement(false);
                          setAnnouncementForm({ id: null, title: "", content: "", imageUrl: "" });
                        }}
                      >
                        {t("cancel")}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div style={{ ...styles.card, background: isDark ? "#3b2457" : "#f3e8ff", border: "1px solid #c084fc" }} {...hoverProps}>
                <h2 style={{ color: isDark ? "#e9d5ff" : "#6b21a8" }}>📌 {t("publishedAnnouncements")} ({authenticatedRole})</h2>

                <div style={styles.announcementGrid}>
                  {announcements.map((item) => (
                    <div
                      key={item._id || item.id}
                      style={{
                        ...styles.announcementPublicCard,
                        background: isDark ? "#2d1b42" : "#faf5ff",
                        border: "1px solid #c084fc",
                        borderRadius: 14,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-7px)";
                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(168, 85, 247, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={styles.announcementImage} />
                      ) : (
                        <div style={{ ...styles.announcementImage, background: isDark ? "#594078" : "#e9d5ff", display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "#e9d5ff" : "#6b21a8", fontSize: 24 }}>
                          📢
                        </div>
                      )}

                      <div style={{ ...styles.announcementCardBody, background: isDark ? "#2d1b42" : "#faf5ff", padding: 16 }}>
                        <h3 style={{ margin: "4px 0", color: isDark ? "#e9d5ff" : "#581c87", fontSize: 18 }}>{item.title}</h3>
                        <p style={{ color: isDark ? "#e2d5f0" : "#6b21a8", margin: 0, fontSize: 13, flex: 1, whiteSpace: "pre-wrap" }}>{item.content}</p>

                        <div style={{ borderTop: "1px solid #c084fc", paddingTop: 10, marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <small style={{ color: isDark ? "#c4b5fd" : "#7e22ce", fontSize: 12 }}>📅 {t("date")}: {item.createdAt ? new Date(item.createdAt).toISOString().slice(0, 10) : t("recent")}</small>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button type="button" style={{ ...styles.secondaryBtn, padding: "4px 8px", fontSize: 11, background: isDark ? "#594078" : "#e9d5ff", color: isDark ? "#ffffff" : "#581c87", border: "1px solid #c084fc" }} onClick={() => { setAnnouncementForm(item); setIsEditingAnnouncement(true); }}>
                              ✏️ {t("edit")}
                            </button>
                            <button type="button" style={{ ...styles.dangerBtn, padding: "4px 8px", fontSize: 11 }} onClick={() => handleDeleteAnnouncement(item._id || item.id)}>
                              🗑️ {t("delete")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

                    {/* PROFILE SECTION */}
          {activeSection === "profile" && (
            <div style={{ ...styles.card, background: isDark ? "#3b2457" : "#f3e8ff", border: "1px solid #c084fc" }} {...hoverProps}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ color: isDark ? "#e9d5ff" : "#6b21a8" }}>👤 {t("profileSettings").replace("(PHM)", `(${authenticatedRole})`)}</h2>
                {!isEditingProfile && (
                  <button type="button" style={styles.button} onClick={() => setIsEditingProfile(true)}>
                    ✏️ {t("editProfile")}
                  </button>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24, padding: 20, borderRadius: 14, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc" }}>
                <div style={styles.avatarContainer}>
                  {profileForm.photoUrl ? (
                    <img src={profileForm.photoUrl} alt="Officer Profile" style={styles.avatar} />
                  ) : (
                    <div style={{ ...styles.avatar, background: isDark ? "#594078" : "#e9d5ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: isDark ? "#e9d5ff" : "#6b21a8" }}>
                      👤
                    </div>
                  )}

                  <div style={styles.cameraBadge} title={t("changeEditPhoto")} onClick={() => setShowPhotoModal(true)}>
                    📷
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: 0, color: isDark ? "#e9d5ff" : "#6b21a8", fontSize: 20 }}>{profileForm.fullName || t("officerProfile")}</h3>
                  <p style={{ margin: "4px 0 8px 0", color: isDark ? "#d8b4fe" : "#7e22ce", fontSize: 13 }}>{authenticatedRole === "PHI" ? t("publicHealthInspector") : t("publicHealthMidwife")}</p>
                </div>
              </div>

              {profile && !isEditingProfile ? (
                <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                  <div style={{ padding: 16, borderRadius: 12, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc" }}>
                    <p style={{ margin: 0, color: isDark ? "#c4b5fd" : "#7e22ce", fontSize: 13 }}>👤 {t("fullName")}</p>
                    <strong style={{ color: isDark ? "#f3e8ff" : "#581c87" }}>{profile.fullName}</strong>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc" }}>
                    <p style={{ margin: 0, color: isDark ? "#c4b5fd" : "#7e22ce", fontSize: 13 }}>📧 {t("email")}</p>
                    <strong style={{ color: isDark ? "#f3e8ff" : "#581c87" }}>{profile.email}</strong>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc" }}>
                    <p style={{ margin: 0, color: isDark ? "#c4b5fd" : "#7e22ce", fontSize: 13 }}>📞 {t("phone")}</p>
                    <strong style={{ color: isDark ? "#f3e8ff" : "#581c87" }}>{profile.phone}</strong>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: isDark ? "#2d1b42" : "#faf5ff", border: "1px solid #c084fc" }}>
                    <p style={{ margin: 0, color: isDark ? "#c4b5fd" : "#7e22ce", fontSize: 13 }}>🏠 {t("houseNumberId")}</p>
                    <strong style={{ color: isDark ? "#f3e8ff" : "#581c87" }}>{profile.houseNumber}</strong>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile}>
                  <Field label={t("fullName")} value={profileForm.fullName} onChange={(v) => setProfileForm({ ...profileForm, fullName: v })} required isDark={isDark} />
                  <Field label={t("emailAddress")} value={profileForm.email} onChange={(v) => setProfileForm({ ...profileForm, email: v })} required isDark={isDark} />
                  <Field label={t("phoneNumber")} value={profileForm.phone} onChange={(v) => setProfileForm({ ...profileForm, phone: v })} required isDark={isDark} />
                  <Field label={t("officialHouseNumberId")} value={profileForm.houseNumber} onChange={(v) => setProfileForm({ ...profileForm, houseNumber: v })} isDark={isDark} />
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    <button type="submit" style={styles.button}>💾 {t("saveProfile")}</button>
                    <button type="button" style={styles.secondaryBtn} onClick={() => setIsEditingProfile(false)}>{t("cancel")}</button>
                  </div>
                </form>
              )}
            </div>
          )}

        </main>
      </div>

      <input type="file" ref={fileInputRef} accept="image/*" style={{ display: "none" }} onChange={handlePhotoFileSelect} />

      {showPhotoModal && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContent, maxWidth: 400 }}>
            <h3 style={{ marginTop: 0, color: "#a7f3d0", textAlign: "center" }}>📷 Profile Photo Options</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              <button type="button" style={styles.button} onClick={() => fileInputRef.current?.click()}>
                📁 Choose from Device / Files
              </button>
              <button type="button" style={{ ...styles.secondaryBtn, color: "#38bdf8" }} onClick={startCamera}>
                📷 Take Photo with Camera
              </button>
              {profileForm.photoUrl && (
                <button type="button" style={styles.dangerBtn} onClick={handleDeletePhoto}>
                  🗑️ Remove Current Photo
                </button>
              )}
              <button type="button" style={styles.secondaryBtn} onClick={() => setShowPhotoModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showCamera && (
        <div style={styles.modalBackdrop}>
          <div style={{ ...styles.modalContent, maxWidth: 460, textAlign: "center" }}>
            <h3 style={{ marginTop: 0, color: "#a7f3d0" }}>📸 Take Profile Photo</h3>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: 260, borderRadius: 16, objectFit: "cover", background: "#000", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button type="button" style={styles.button} onClick={capturePhoto}>📸 Capture & Set Photo</button>
              <button type="button" style={styles.secondaryBtn} onClick={closeCamera}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showMotherModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h2 style={{ marginTop: 0, color: "#a7f3d0" }}>{isEditingMother ? "✏️ Edit Mother Record" : "👩 Register New Mother"}</h2>
            <form onSubmit={handleSaveMother}>
              <Field label="Full Name" value={motherForm.name} onChange={(v) => setMotherForm({ ...motherForm, name: v })} required isDark={isDark} />
              <Field label="NIC Number" value={motherForm.nic} onChange={(v) => setMotherForm({ ...motherForm, nic: v })} required isDark={isDark} />
              <Field label="Birth Date (BD)" type="date" value={motherForm.dob} onChange={(v) => setMotherForm({ ...motherForm, dob: v })} required isDark={isDark} />
              <Field label="Pregnancy Status (Months/මාස ගණන)" type="number" value={motherForm.pregnancyMonths} onChange={(v) => setMotherForm({ ...motherForm, pregnancyMonths: v })} placeholder="e.g. 5" isDark={isDark} />
              <Field label="Phone Number" value={motherForm.phone} onChange={(v) => setMotherForm({ ...motherForm, phone: v })} required isDark={isDark} />
              <Field label="Address" value={motherForm.address} onChange={(v) => setMotherForm({ ...motherForm, address: v })} required isDark={isDark} />
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" style={styles.button}>💾 Save Record</button>
                <button type="button" style={styles.secondaryBtn} onClick={() => setShowMotherModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showChildModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h2 style={{ marginTop: 0, color: "#a7f3d0" }}>
              {isEditingChild ? "✏️ Edit Child Record" : "👶 Add Child Record (Infants / 1m - 10y)"}
            </h2>
            <form onSubmit={handleSaveChild}>

              <Field
                label="Child Full Name"
                value={childForm.childName}
                onChange={(v) => setChildForm({ ...childForm, childName: v })}
                required
                isDark={isDark}
              />

              <label style={{ ...styles.label, color: isDark ? "#ffffff" : "#000000" }}>
                Select Mother (Mother's NIC)
                <select
                  style={styles.input}
                  value={childForm.motherNic}
                  onChange={(e) => setChildForm({ ...childForm, motherNic: e.target.value })}
                  required
                  isDark={isDark}
                >
                  <option value="">-- Choose Mother --</option>
                  {mothers.map((m) => (
                    <option key={m._id || m.id} value={m.nic}>
                      {m.name} ({m.nic})
                    </option>
                  ))}
                </select>
              </label>

              <Field
                label="Birth Date (BD)"
                type="date"
                value={childForm.dob}
                onChange={(v) => setChildForm({ ...childForm, dob: v })}
                required
                isDark={isDark}
              />

              <Field
                label="Weight (kg)"
                value={childForm.weight}
                onChange={(v) => setChildForm({ ...childForm, weight: v })}
                required
                isDark={isDark}
              />

              <Field
                label="Vaccine Status"
                value={childForm.vaccineStatus}
                onChange={(v) => setChildForm({ ...childForm, vaccineStatus: v })}
                placeholder="e.g. Up to Date / BCG Done"
                required
                isDark={isDark}
              />

              <Field
                label="Recently Administered Vaccine (ලඟදි ගහපු Vaccine එක)"
                value={childForm.latestVaccine}
                onChange={(v) => setChildForm({ ...childForm, latestVaccine: v })}
                placeholder="e.g. MMR, DTaP, OPV"
                isDark={isDark}
              />

              <Field
                label="Vaccination Date (එක ගහපු දිනය)"
                type="date"
                value={childForm.vaccineDate}
                onChange={(v) => setChildForm({ ...childForm, vaccineDate: v })}
                isDark={isDark}
              />

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" style={styles.button}>💾 Save Record</button>
                <button type="button" style={styles.secondaryBtn} onClick={() => setShowChildModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEstModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h2 style={{ marginTop: 0, color: "#a7f3d0" }}>{isEditingEst ? "✏️ Edit Establishment" : "🏨 Add New Establishment"}</h2>
            <form onSubmit={handleSaveEstablishment}>
              <Field label="Establishment Name" value={estForm.name} onChange={(v) => setEstForm({ ...estForm, name: v })} required isDark={isDark} />
              <label style={{ ...styles.label, color: isDark ? "#ffffff" : "#000000" }}>
                Type
                <select style={styles.input} value={estForm.type} onChange={(e) => setEstForm({ ...estForm, type: e.target.value })}>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Food Store">Food Store</option>
                </select>
              </label>
              <Field label="Owner Name" value={estForm.owner} onChange={(v) => setEstForm({ ...estForm, owner: v })} required isDark={isDark}/>
              <Field label="Contact Phone" value={estForm.phone} onChange={(v) => setEstForm({ ...estForm, phone: v })} isDark={isDark} />
              <label style={{ ...styles.label, color: isDark ? "#ffffff" : "#000000" }}>
                Health Status
                <select style={styles.input} value={estForm.status} onChange={(e) => setEstForm({ ...estForm, status: e.target.value })}>
                  <option value="Grade A">Grade A (Excellent)</option>
                  <option value="Grade B">Grade B (Satisfactory)</option>
                  <option value="Warning Issued">Warning Issued</option>
                </select>
              </label>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" style={styles.button}>💾 Save Record</button>
                <button type="button" style={styles.secondaryBtn} onClick={() => setShowEstModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthPortal;