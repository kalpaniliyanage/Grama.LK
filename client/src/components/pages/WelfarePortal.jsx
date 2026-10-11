import React from 'react';

function WelfarePortal() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welfare Portal</h1>
      <p>Welfare Portal කොටස සකස් වෙමින් පවතියි...</p>
    </div>
  );
}

export default WelfarePortal;
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Comprehensive Trilingual Dictionary for Welfare Portal
const welfareTranslations = {
  en: {
    back: "Dashboard",
    title: "🤝 Welfare Society Portal",
    subtitle: "GramaLK - Official Management System for President & Secretary",
    
    // Navigation Tabs
    tab_reg: "👥 Register Welfare Members",
    tab_claims: "📝 Relief & Emergency Aid",
    tab_funds: "💳 Monthly Member Funds",
    tab_announce: "📢 Main Board Notices",

    // Tab 1: Member Registration
    form_title_reg: "🏠 Register Welfare Member",
    lbl_house_no: "House Number:",
    lbl_nic: "Household Head NIC:",
    btn_register: "✅ Register Member",
    list_title_reg: "📋 Registered Welfare Members Directory",
    th_house: "House No",
    th_name: "Full Name",
    th_nic: "NIC / Head NIC",
    th_phone: "Telephone No",
    th_status: "Status",
    th_action: "Actions",
    status_registered: "Registered in Welfare",
    no_members: "No registered welfare members found.",

    // Tab 2: Relief Aid
    form_title_aid: "➕ Record Relief / Emergency Aid Claim",
    lbl_aid_type: "Type of Relief Aid:",
    aid_death: "⚰️ Death Aid (මරණාධාර)",
    aid_medical: "🩺 Emergency Medical Aid (ගිලන් ආධාර)",
    aid_disaster: "🌊 Disaster Relief (ආපදා සහන)",
    aid_loan: "💵 Microloan / Emergency Loan (සහන ණය)",
    lbl_amount: "Amount (LKR):",
    lbl_items: "Items Borrowed (Optional):",
    btn_save_claim: "💾 Save Relief Record",
    list_title_aid: "📊 Relief & Disaster Aid Log",
    th_aid_type: "Aid Type",
    th_amount: "Amount (LKR)",
    th_items: "Items Borrowed",

    // Tab 3: Monthly Funds
    form_title_fund: "💳 Record Monthly Membership Fee",
    lbl_fee_amount: "Paid Amount (LKR):",
    btn_save_fund: "✅ Record Fee Payment",
    list_title_fund: "📑 Monthly Member Funds Register",
    th_date: "Date Recorded",

    // Tab 4: Main Board Notices
    form_title_notice: "📢 Post Notice to Main Board",
    lbl_notice_title: "Notice Title:",
    lbl_notice_desc: "Detailed Description:",
    btn_post_notice: "🚀 Publish Notice",
    list_title_notice: "📌 Active Welfare Notices on Dashboard",

    // Stats & Common Labels
    total_families: "Registered Welfare Families",
    total_claims: "Total Relief Claims Given",
    total_funds: "Total Monthly Funds Collected",
    btn_edit: "✏️ Edit",
    btn_delete: "🗑️ Delete",
    logout: "Log Out"
  },
  si: {
    back: "ප්‍රධාන පුවරුව",
    title: "🤝 සුබසාධක සමිති පෝටලය",
    subtitle: "GramaLK - සභාපති සහ ලේකම් සඳහා වන නිල කළමනාකරණ පද්ධතිය",
    
    tab_reg: "👥 සුබසාධක සාමාජිකයින් ලියාපදිංචිය",
    tab_claims: "📝 සහනාධාර සහ මරණාධාර",
    tab_funds: "💳 මාසික සාමාජික ගාස්තු එකතුව",
    tab_announce: "📢 ප්‍රධාන පුවරුවේ නිවේදන",

    form_title_reg: "🏠 සුබසාධක සාමාජිකයෙකු ලියාපදිංචි කිරීම",
    lbl_house_no: "නිවාස අංකය (House Number):",
    lbl_nic: "ගෘහ මූලිකයාගේ ජා.හැ.අංකය (Household Head NIC):",
    btn_register: "✅ සාමාජිකත්වය සුරකින්න",
    list_title_reg: "📋 ලියාපදිංචි සුබසාධක සාමාජිකයින්ගේ නාමාවලිය",
    th_house: "නිවාස අංකය",
    th_name: "නම",
    th_nic: "ජා.හැ.අංකය",
    th_phone: "දුරකථන අංකය",
    th_status: "තත්ත්වය",
    th_action: "ක්‍රියාමාර්ග",
    status_registered: "Registered in Welfare",
    no_members: "ලියාපදිංචි වූ සාමාජිකයින් හමු නොවීය.",

    form_title_aid: "➕ සහනාධාර / ආපදා ආධාර එකතු කරන්න",
    lbl_aid_type: "ආධාර වර්ගය තෝරන්න:",
    aid_death: "⚰️ මරණාධාර (Death Aid)",
    aid_medical: "🩺 ගිලන් ආධාර (Medical Aid)",
    aid_disaster: "🌊 ආපදා සහන (Disaster Relief)",
    aid_loan: "💵 සහන Microloan / ණය",
    lbl_amount: "මුදල (LKR):",
    lbl_items: "ලබාදුන් භාණ්ඩ (විකල්ප):",
    btn_save_claim: "💾 සහනාධාර තොරතුරු සුරකින්න",
    list_title_aid: "📊 ලබාදුන් සහනාධාර සහ ආධාර ලේඛනය",
    th_aid_type: "ආධාර වර්ගය",
    th_amount: "මුදල (LKR)",
    th_items: "ලබාදුන් භාණ්ඩ",

    form_title_fund: "💳 මාසික සාමාජික ගාස්තු සටහන් කිරීම",
    lbl_fee_amount: "ගෙවූ මුදල (LKR):",
    btn_save_fund: "✅ ගෙවීම සටහන් කරන්න",
    list_title_fund: "📑 මාසික මුදල් ගෙවූ සාමාජිකයන්ගේ ලැයිස්තුව",
    th_date: "සටහන් කළ දිනය",

    form_title_notice: "📢 ප්‍රධාන Dashboard එකට නිවේදනයක් නිකුත් කිරීම",
    lbl_notice_title: "නිවේදනයේ මාතෘකාව:",
    lbl_notice_desc: "විස්තරය:",
    btn_post_notice: "🚀 නිවේදනය ප්‍රසිද්ධ කරන්න",
    list_title_notice: "📌 ප්‍රධාන Dashboard එකේ පළවූ නිවේදන",

    total_families: "ලියාපදිංචි සුබසාධක පවුල්",
    total_claims: "ලබාදුන් මුළු සහනාධාර",
    total_funds: "එකතු වූ මාසික මුදල් අරමුදල",
    btn_edit: "✏️ සංස්කරණය",
    btn_delete: "🗑️ ඉවත් කරන්න",
    logout: "ඉවත් වන්න"
  },
  ta: {
    back: "முகப்பு",
    title: "🤝 நலன்பුரிச் சங்க போர்டல்",
    subtitle: "GramaLK - தலைவர் மற்றும் செயலாளருக்கான அதிகாரப்பூர்வ மேலாண்மை அமைப்பு",
    
    tab_reg: "👥 நலன்புரி உறுப்பினர்கள் பதிவு",
    tab_claims: "📝 நிவாரண உதவிகள்",
    tab_funds: "💳 மாத உறுப்பினர் கட்டணம்",
    tab_announce: "📢 முகப்பில் அறிவிப்பு வெளியிடல்",

    form_title_reg: "🏠 நலன்புரி உறுப்பினரைப் பதிவுசெய்க",
    lbl_house_no: "வீட்டு எண்:",
    lbl_nic: "குடும்பத் தலைவரின் தேசிய அடையாள அட்டை எண்:",
    btn_register: "✅ சேமிக்கவும்",
    list_title_reg: "📋 பதிவுசெய்யப்பட்ட நலன்புரி உறுப்பினர்களின் பட்டியல்",
    th_house: "வீட்டு எண்",
    th_name: "முழுப் பெயர்",
    th_nic: "அடையாள அட்டை எண்",
    th_phone: "தொலைபேசி எண்",
    th_status: "நிலை",
    th_action: "செயல்பாடு",
    status_registered: "Registered in Welfare",
    no_members: "பதிவுசெய்யப்பட்ட உறுப்பினர்கள் எதுவும் இல்லை.",

    form_title_aid: "➕ நிவாரண உதவிச் பதிவைச் சேர்க்கவும்",
    lbl_aid_type: "உதவி வகை:",
    aid_death: "⚰️️ மரண உதவி (Death Aid)",
    aid_medical: "🩺 மருத்துவ உதவி (Medical Aid)",
    aid_disaster: "🌊 பேரிடர் நிவாரணம் (Disaster Relief)",
    aid_loan: "💵 நுண்கடன் / கடன் (Microloan)",
    lbl_amount: "தொகை (LKR):",
    lbl_items: "வழங்கப்பட்ட பொருட்கள்:",
    btn_save_claim: "💾 பதிவைச் சேமிக்கவும்",
    list_title_aid: "📊 வழங்கப்பட்ட நிவாரண உதவிகளின் பட்டியல்",
    th_aid_type: "உதவி வகை",
    th_amount: "தொகை (LKR)",
    th_items: "வழங்கப்பட்ட பொருட்கள்",

    form_title_fund: "💳 மாத உறுப்பினர் கட்டணம் பதிவுசெய்க",
    lbl_fee_amount: "செலுத்தப்பட்ட தொகை (LKR):",
    btn_save_fund: "✅ கட்டணத்தைப் பதிவுசெய்க",
    list_title_fund: "📑 மாதக் கட்டணம் செலுத்தியோர் பட்டியல்",
    th_date: "பதிவுசெய்த தேதி",

    form_title_notice: "📢 பிரதான பலகையில் அறிவிப்பை வெளியிடவும்",
    lbl_notice_title: "அறிவிப்புத் தலைப்பு:",
    lbl_notice_desc: "விளக்கம்:",
    btn_post_notice: "🚀 அறிவிப்பை வெளியிடவும்",
    list_title_notice: "📌 வெளியிடப்பட்ட அறிவிப்புகள்",

    total_families: "பதிவுசெய்த நலன்புரி குடும்பங்கள்",
    total_claims: "வழங்கப்பட்ட மொத்த நிவாரணங்கள்",
    total_funds: "சேகரிக்கப்பட்ட மாத நிதி",
    btn_edit: "✏️ திருத்து",
    btn_delete: "🗑️ நீக்கு",
    logout: "வெளியேறு"
  }
};

export default function WelfarePortal() {
  const { i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(i18n.language || localStorage.getItem("gramalk_lang") || "si");

  // App Level States
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const [activeTab, setActiveTab] = useState("members");
  
  // Data State Arrays
  const [welfareMembers, setWelfareMembers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [fundRecords, setFundRecords] = useState([]);
  const [notices, setNotices] = useState([]);

  // Form States - Member Registration
  const [regHouseNo, setRegHouseNo] = useState("");
  const [householdHeadNIC, setHouseholdHeadNIC] = useState("");

  // Form States - Relief Aid Claims
  const [claimHouseNo, setClaimHouseNo] = useState("");
  const [claimType, setClaimType] = useState("DeathAid");
  const [claimAmount, setClaimAmount] = useState("");
  const [itemsBorrowed, setItemsBorrowed] = useState("");

  // Form States - Monthly Funds
  const [fundHouseNo, setFundHouseNo] = useState("");
  const [fundAmount, setFundAmount] = useState("500");

  // Form States - Notices
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  // CRUD Editing Modal States
  const [editingMember, setEditingMember] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [editingFund, setEditingFund] = useState(null);
  const [editFundAmount, setEditFundAmount] = useState("");

  const [editingNotice, setEditingNotice] = useState(null);
  const [editNoticeTitle, setEditNoticeTitle] = useState("");
  const [editNoticeContent, setEditNoticeContent] = useState("");

  // Translation Helper
  const txt = (key) => {
    const lang = welfareTranslations[currentLng] ? currentLng : "si";
    return welfareTranslations[lang][key] || welfareTranslations.en[key] || key;
  };

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // API Data Fetching Helpers
  const fetchWelfareMembers = () => {
    fetch("http://localhost:5000/api/welfare/members")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setWelfareMembers(data))
      .catch((err) => console.error("Error fetching members:", err));
  };

  const fetchClaims = () => {
    fetch("http://localhost:5000/api/welfare/claims")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setClaims(data))
      .catch((err) => console.error("Error fetching claims:", err));
  };

  const fetchFunds = () => {
    fetch("http://localhost:5000/api/welfare/funds")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setFundRecords(data))
      .catch((err) => console.error("Error fetching funds:", err));
  };

  const fetchNotices = () => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const welfareNotices = data.filter((item) => item.category === "Welfare");
          setNotices(welfareNotices);
        }
      })
      .catch((err) => console.error("Error fetching notices:", err));
  };

  useEffect(() => {
    fetchWelfareMembers();
    fetchClaims();
    fetchFunds();
    fetchNotices();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLng(lng);
    localStorage.setItem("gramalk_lang", lng);
  };

  /* =========================================================
     TAB 1: MEMBER REGISTRATION & MEMBER CRUD ACTIONS
  ========================================================= */

  const handleRegisterWelfareMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/welfare/register-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ houseNumber: regHouseNo, householdHeadNIC }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || "සාමාජිකයා සාර්ථකව ලියාපදිංචි විය!", "success");
        setRegHouseNo("");
        setHouseholdHeadNIC("");
        fetchWelfareMembers();
      } else {
        showNotification(data.message || "ලියාපදිංචි කිරීම අසාර්ථක විය.", "error");
      }
    } catch (err) {
      showNotification("Server එකට සම්බන්ධ වීමට නොහැකි විය.", "error");
    }
  };

  const handleOpenEditMember = (member) => {
    setEditingMember(member);
    setEditName(member.fullName || "");
    setEditPhone(member.phone || "");
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/welfare/members/${editingMember._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: editName, phone: editPhone }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification(data.message || "සාමාජික තොරතුරු Update විය!", "success");
        setEditingMember(null);
        fetchWelfareMembers();
      } else {
        showNotification(data.message || "Update කිරීම අසාර්ථකයි.", "error");
      }
    } catch (err) {
      showNotification("සම්බන්ධතාවයේ දෝෂයකි.", "error");
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("මෙම සාමාජිකයා සුබසාධක ලැයිස්තුවෙන් ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/welfare/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("සාමාජිකයා සාර්ථකව ඉවත් කළා!", "success");
        fetchWelfareMembers();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථක විය.", "error");
    }
  };

  /* =========================================================
     TAB 2: RELIEF & EMERGENCY AID CLAIMS & CRUD ACTIONS
  ========================================================= */

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/welfare/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          houseNumber: claimHouseNo,
          claimType,
          amount: Number(claimAmount) || 0,
          itemsBorrowed: itemsBorrowed ? itemsBorrowed.split(",").map((i) => i.trim()) : [],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification("සහනාධාර සටහන සාර්ථකව එකතු කළා!", "success");
        setClaimHouseNo("");
        setClaimAmount("");
        setItemsBorrowed("");
        fetchClaims();
      } else {
        showNotification(data.message || "සහනාධාරය ඇතුළත් කිරීම අසාර්ථක විය.", "error");
      }
    } catch (err) {
      showNotification("Server දෝෂයකි.", "error");
    }
  };

  const handleDeleteClaim = async (id) => {
    if (!window.confirm("මෙම සහනාධාර සටහන ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/welfare/claims/${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("සහනාධාර සටහන ඉවත් කළා!", "success");
        fetchClaims();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථක විය.", "error");
    }
  };

  /* =========================================================
     TAB 3: MONTHLY MEMBER FUNDS & CRUD ACTIONS
  ========================================================= */

  const handleFundSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/welfare/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          houseNo: fundHouseNo,
          amount: Number(fundAmount) || 0,
          date: new Date().toLocaleDateString(),
        }),
      });

      if (res.ok) {
        showNotification("මාසික සාමාජික ගාස්තුව සාර්ථකව සටහන් කළා!", "success");
        setFundHouseNo("");
        fetchFunds();
      }
    } catch (err) {
      showNotification("ගෙවීම සටහන් කිරීම අසාර්ථක විය.", "error");
    }
  };

  const handleOpenEditFund = (fund) => {
    setEditingFund(fund);
    setEditFundAmount(fund.amount || "");
  };

  const handleUpdateFund = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/welfare/funds/${editingFund._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(editFundAmount) }),
      });

      if (res.ok) {
        showNotification("ගාස්තු ගෙවීමේ ප්‍රමාණය Update විය!", "success");
        setEditingFund(null);
        fetchFunds();
      }
    } catch (err) {
      showNotification("Update කිරීම අසාර්ථකයි.", "error");
    }
  };

  const handleDeleteFund = async (id) => {
    if (!window.confirm("මෙම මාසික ගෙවීමේ සටහන ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/welfare/funds/${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("ගෙවීමේ සටහන ඉවත් කළා!", "success");
        fetchFunds();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථක විය.", "error");
    }
  };

  /* =========================================================
     TAB 4: MAIN BOARD NOTICES & CRUD ACTIONS
  ========================================================= */

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
          title: noticeTitle,
          description: noticeContent,
          category: "Welfare",
          date: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        showNotification("නිවේදනය ප්‍රධාන Dashboard එකට සාර්ථකව යවන ලදී!", "success");
        setNoticeTitle("");
        setNoticeContent("");
        fetchNotices();
      }
    } catch (err) {
      showNotification("නිවේදනය යැවීම අසාර්ථකයි.", "error");
    }
  };

  const handleOpenEditNotice = (notice) => {
    setEditingNotice(notice);
    setEditNoticeTitle(notice.title || "");
    setEditNoticeContent(notice.description || "");
  };

  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gramalk_token");
      const res = await fetch(`http://localhost:5000/api/announcements/${editingNotice._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editNoticeTitle,
          description: editNoticeContent,
        }),
      });

      if (res.ok) {
        showNotification("නිවේදනය සාර්ථකව Update කරන ලදී!", "success");
        setEditingNotice(null);
        fetchNotices();
      }
    } catch (err) {
      showNotification("Update කිරීම අසාර්ථක විය.", "error");
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm("මෙම නිවේදනය ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const token = localStorage.getItem("gramalk_token");
      const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showNotification("නිවේදනය සාර්ථකව ඉවත් කළා!", "success");
        fetchNotices();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථක විය.", "error");
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("gramalk_token");
    window.location.href = "/login";
  };

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
      
      {/* Toast Banner */}
      {toast.show && (
        <div style={{ ...styles.toastCard, backgroundColor: toast.type === "error" ? "#ef4444" : "#10b981" }}>
          <span>{toast.type === "error" ? "⚠️" : "🎉"}</span>
          <span style={{ fontWeight: "600", color: "#ffffff" }}>{toast.message}</span>
        </div>
      )}

      {/* Top Toolbar */}
      <div style={styles.topBar}>
        <div style={styles.langContainer}>
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>🌐 Language:</span>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'en' ? '#10b981' : '#ffffff', color: currentLng === 'en' ? '#ffffff' : '#065f46' }} onClick={() => changeLanguage("en")}>English</button>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'si' ? '#10b981' : '#ffffff', color: currentLng === 'si' ? '#ffffff' : '#065f46' }} onClick={() => changeLanguage("si")}>සිංහල</button>
          <button type="button" style={{ ...styles.langBtn, backgroundColor: currentLng === 'ta' ? '#10b981' : '#ffffff', color: currentLng === 'ta' ? '#ffffff' : '#065f46' }} onClick={() => changeLanguage("ta")}>தமிழ்</button>
        </div>

        <div style={styles.actionControls}>
          <button type="button" style={styles.themeToggleBtn} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button type="button" style={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
            🚪 {txt("logout")}
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <header style={styles.header}>
        <div>
          <button style={styles.backBtn} onClick={() => (window.location.href = "/")}>
            ⬅️ {txt("back")}
          </button>
          <h1 style={styles.title}>{txt("title")}</h1>
          <p style={styles.subtitle}>{txt("subtitle")}</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>👥</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>{welfareMembers.length}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{txt("total_families")}</p>
          </div>
        </div>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>📋</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>{claims.length}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{txt("total_claims")}</p>
          </div>
        </div>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>💵</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>LKR {fundRecords.reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{txt("total_funds")}</p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div style={styles.tabContainer}>
        <button style={{ ...styles.tabBtn, ...(activeTab === "members" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("members")}>
          {txt("tab_reg")}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "claims" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("claims")}>
          {txt("tab_claims")}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "funds" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("funds")}>
          {txt("tab_funds")}
        </button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "announcements" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("announcements")}>
          {txt("tab_announce")}
        </button>
      </div>

      {/* =========================================================
          TAB 1: MEMBER REGISTRATION & CRUD DIRECTORY
      ========================================================= */}
      {activeTab === "members" && (
        <div style={styles.contentGrid}>
          {/* Registration Form */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_reg")}</h2>
            <form onSubmit={handleRegisterWelfareMember} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_house_no")}</label>
                <input
                  type="text"
                  placeholder="e.g. H-1"
                  value={regHouseNo}
                  onChange={(e) => setRegHouseNo(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_nic")}</label>
                <input
                  type="text"
                  placeholder="e.g. 199001123456"
                  value={householdHeadNIC}
                  onChange={(e) => setHouseholdHeadNIC(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <button type="submit" style={styles.submitBtn}>
                {txt("btn_register")}
              </button>
            </form>
          </div>

          {/* Directory Table */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_reg")}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_house")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_name")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_nic")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_phone")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_status")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {welfareMembers.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>{txt("no_members")}</td>
                    </tr>
                  ) : (
                    welfareMembers.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNumber}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.fullName || item.username || "N/A"}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.householdHeadNIC || item.nic}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.phone || "N/A"}</td>
                        <td style={{ ...styles.td, color: "#10b981", fontWeight: "bold" }}>Registered in Welfare</td>
                        <td style={{ ...styles.td, display: "flex", gap: "6px" }}>
                          <button style={styles.editBtn} onClick={() => handleOpenEditMember(item)}>
                            {txt("btn_edit")}
                          </button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteMember(item._id)}>
                            {txt("btn_delete")}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: RELIEF AID CLAIMS & LOG TABLE
      ========================================================= */}
      {activeTab === "claims" && (
        <div style={styles.contentGrid}>
          {/* Claim Form */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_aid")}</h2>
            <form onSubmit={handleClaimSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_house_no")}</label>
                <input
                  type="text"
                  placeholder="e.g. H-1"
                  value={claimHouseNo}
                  onChange={(e) => setClaimHouseNo(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_aid_type")}</label>
                <select
                  value={claimType}
                  onChange={(e) => setClaimType(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                >
                  <option value="DeathAid">{txt("aid_death")}</option>
                  <option value="MedicalAid">{txt("aid_medical")}</option>
                  <option value="DisasterRelief">{txt("aid_disaster")}</option>
                  <option value="Loan">{txt("aid_loan")}</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_amount")}</label>
                <input
                  type="number"
                  placeholder="25000"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_items")}</label>
                <input
                  type="text"
                  placeholder="e.g. Tents 2, Chairs 50"
                  value={itemsBorrowed}
                  onChange={(e) => setItemsBorrowed(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_save_claim")}</button>
            </form>
          </div>

          {/* Aid Claims Table */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_aid")}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_house")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_aid_type")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_amount")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_items")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>සටහන් වූ සහනාධාර ඉල්ලීම් හමු නොවීය.</td>
                    </tr>
                  ) : (
                    claims.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNumber}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.claimType}</td>
                        <td style={{ ...styles.td, color: theme.text }}>LKR {item.amount || 0}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.itemsBorrowed && item.itemsBorrowed.length > 0 ? item.itemsBorrowed.join(", ") : "-"}</td>
                        <td style={{ ...styles.td }}>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteClaim(item._id)}>
                            {txt("btn_delete")}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: MONTHLY MEMBER FUNDS & CRUD REGISTER
      ========================================================= */}
      {activeTab === "funds" && (
        <div style={styles.contentGrid}>
          {/* Fund Form */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_fund")}</h2>
            <form onSubmit={handleFundSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_house_no")}</label>
                <input
                  type="text"
                  placeholder="e.g. H-1"
                  value={fundHouseNo}
                  onChange={(e) => setFundHouseNo(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_fee_amount")}</label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_save_fund")}</button>
            </form>
          </div>

          {/* Funds Register Table */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_fund")}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_house")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_amount")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_date")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {fundRecords.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>මාසික ගෙවීම් සටහන් හමු නොවීය.</td>
                    </tr>
                  ) : (
                    fundRecords.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNo}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>LKR {item.amount}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.date || new Date().toLocaleDateString()}</td>
                        <td style={{ ...styles.td, display: "flex", gap: "6px" }}>
                          <button style={styles.editBtn} onClick={() => handleOpenEditFund(item)}>
                            {txt("btn_edit")}
                          </button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteFund(item._id)}>
                            {txt("btn_delete")}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: MAIN BOARD NOTICES & CRUD MANAGEMENT
      ========================================================= */}
      {activeTab === "announcements" && (
        <div style={styles.contentGrid}>
          {/* Post Notice Form */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_notice")}</h2>
            <form onSubmit={handleAnnouncementSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_notice_title")}</label>
                <input
                  type="text"
                  placeholder="e.g. Annual General Meeting"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_notice_desc")}</label>
                <textarea
                  rows="4"
                  placeholder="Type full notice details here..."
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText, resize: "vertical" }}
                  required
                />
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_post_notice")}</button>
            </form>
          </div>

          {/* Active Notices Directory */}
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_notice")}</h2>
            {notices.length === 0 ? (
              <p style={{ textAlign: "center", padding: "15px" }}>පලකළ නිවේදන හමු නොවීය.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {notices.map((notice) => (
                  <div key={notice._id} style={{ padding: "15px", borderRadius: "10px", border: "1px solid #d1d5db", backgroundColor: theme.inputBg }}>
                    <h4 style={{ margin: "0 0 6px 0", color: "#065f46" }}>{notice.title}</h4>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>{notice.description}</p>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button style={styles.editBtn} onClick={() => handleOpenEditNotice(notice)}>
                        {txt("btn_edit")}
                      </button>
                      <button style={styles.deleteBtn} onClick={() => handleDeleteNotice(notice._id)}>
                        {txt("btn_delete")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          MODALS FOR EDITING (CRUD OPERATIONS)
      ========================================================= */}

      {/* Edit Member Modal */}
      {editingMember && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ සාමාජික තොරතුරු සංස්කරණය</h3>
            <form onSubmit={handleUpdateMember} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, textAlign: "left" }}>සම්පූර්ණ නම (Full Name):</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, textAlign: "left" }}>දුරකථන අංකය (Phone Number):</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingMember(null)}>අවලංගු කරන්න</button>
                <button type="submit" style={styles.submitBtn}>Update කරන්න</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Fund Modal */}
      {editingFund && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ මාසික ගාස්තුව වෙනස් කරන්න</h3>
            <form onSubmit={handleUpdateFund} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, textAlign: "left" }}>ගෙවූ මුදල (LKR):</label>
                <input
                  type="number"
                  value={editFundAmount}
                  onChange={(e) => setEditFundAmount(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingFund(null)}>අවලංගු කරන්න</button>
                <button type="submit" style={styles.submitBtn}>Update කරන්න</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notice Modal */}
      {editingNotice && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ නිවේදනය වෙනස් කරන්න</h3>
            <form onSubmit={handleUpdateNotice} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, textAlign: "left" }}>මාතෘකාව:</label>
                <input
                  type="text"
                  value={editNoticeTitle}
                  onChange={(e) => setEditNoticeTitle(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, textAlign: "left" }}>විස්තරය:</label>
                <textarea
                  rows="3"
                  value={editNoticeContent}
                  onChange={(e) => setEditNoticeContent(e.target.value)}
                  style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}
                  required
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingNotice(null)}>අවලංගු කරන්න</button>
                <button type="submit" style={styles.submitBtn}>Update කරන්න</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <div style={styles.modalIcon}>🚪</div>
            <h3 style={styles.modalTitle}>{txt("logout")}?</h3>
            <div style={styles.modalActions}>
              <button style={styles.modalCancelBtn} onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button style={styles.modalConfirmBtn} onClick={confirmLogout}>{txt("logout")}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Interactive Styles
const styles = {
  container: { padding: "30px", minHeight: "100vh", fontFamily: "'Inter', sans-serif" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" },
  langContainer: { display: "flex", alignItems: "center", gap: "8px" },
  langBtn: { padding: "8px 16px", borderRadius: "20px", border: "2px solid #10b981", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
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
  editBtn: { padding: "6px 12px", backgroundColor: "#3b82f6", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "700" },
  deleteBtn: { padding: "6px 12px", backgroundColor: "#ef4444", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "700" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "700", borderBottom: "2px solid #a7f3d0" },
  td: { padding: "12px", fontSize: "14px", borderBottom: "1px solid #f3f4f6" },
  toastCard: { position: "fixed", top: "20px", right: "20px", padding: "14px 22px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", zIndex: 999999 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999999 },
  modalCard: { width: "90%", maxWidth: "420px", padding: "30px", borderRadius: "20px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  modalIcon: { fontSize: "45px", marginBottom: "10px" },
  modalTitle: { margin: "0 0 10px 0", fontSize: "18px", fontWeight: "700" },
  modalActions: { display: "flex", gap: "12px", justifyContent: "center", marginTop: "15px" },
  modalCancelBtn: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "#f3f4f6", fontWeight: "700", cursor: "pointer" },
  modalConfirmBtn: { flex: 1, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#ef4444", color: "#ffffff", fontWeight: "700", cursor: "pointer" }
};