import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const youthTranslations = {
  en: {
    back: "Dashboard",
    title: "🏅 Youth & Sports Society Portal",
    subtitle: "GramaLK - Official Management System for Youth & Sports Officer",
    tab_members: "⚽ Youth Member Registration",
    tab_fees: "💳 Monthly Member Fees",
    tab_inventory: "🏀 Sports Equipment Inventory",
    tab_announcements: "📢 Main Board Notices",
    form_title_reg: "📝 Register Youth Club Member",
    lbl_house_no: "House Number:",
    lbl_select_member: "Select Villager / Member:",
    lbl_age: "Age:",
    lbl_sport: "Primary Sport:",
    lbl_phone: "Phone Number:",
    btn_register: "✅ Register Youth Member",
    list_title_reg: "📋 Registered Youth Members Directory",
    search_placeholder: "🔍 Search by name or house no...",
    th_house: "House No",
    th_name: "Member Name",
    th_age: "Age",
    th_sport: "Sport",
    th_phone: "Phone",
    th_action: "Actions",
    form_title_fee: "💳 Record Monthly Fee Payment",
    lbl_month: "Month:",
    lbl_amount: "Amount (LKR):",
    lbl_status: "Payment Status:",
    btn_save_fee: "💾 Record Payment",
    list_title_fee: "📑 Monthly Fee Records Log",
    th_month: "Month",
    th_amount: "Amount",
    th_status: "Status",
    form_title_inv: "➕ Add Sports Equipment",
    lbl_item_name: "Equipment Name:",
    lbl_qty: "Quantity:",
    lbl_condition: "Condition:",
    btn_save_inv: "📦 Save Equipment",
    list_title_inv: "📊 Sports Inventory Stock",
    th_item: "Item Name",
    th_qty: "Quantity",
    th_condition: "Condition",
    form_title_notice: "📢 Post Notice to Main Dashboard",
    lbl_notice_title: "Notice Title:",
    lbl_notice_desc: "Detailed Description:",
    btn_post_notice: "🚀 Publish Notice",
    list_title_notice: "📌 Active Youth Notices",
    total_youth: "Registered Youth Members",
    total_equipment: "Inventory Items Available",
    total_fees_collected: "Total Fees Collected",
    btn_edit: "✏️ Edit",
    btn_delete: "🗑️ Delete",
    logout: "Log Out"
  },
  si: {
    back: "ප්‍රධාන පුවරුව",
    title: "🏅 තරුණ හා ක්‍රීඩා සමිති පෝටලය",
    subtitle: "GramaLK - තරුණ හා ක්‍රීඩා නිලධාරී සඳහා වන නිල කළමනාකරණ පද්ධතිය",
    tab_members: "⚽ තරුණ සාමාජික ලියාපදිංචිය",
    tab_fees: "💳 මාසික සාමාජික ගාස්තු",
    tab_inventory: "🏀 ක්‍රීඩා උපකරණ තොගය",
    tab_announce: "📢 ප්‍රධාන පුවරුවේ නිවේදන",
    form_title_reg: "📝 තරුණ සමාජ සාමාජිකයෙකු ලියාපදිංචි කිරීම",
    lbl_house_no: "නිවාස අංකය:",
    lbl_select_member: "සාමාජිකයා තෝරන්න:",
    lbl_age: "වයස:",
    lbl_sport: "ප්‍රධාන ක්‍රීඩාව:",
    lbl_phone: "දුරකථන අංකය:",
    btn_register: "✅ තරුණ සාමාජිකයා ලියාපදිංචි කරන්න",
    list_title_reg: "📋 ලියාපදිංචි තරුණ සාමාජිකයින්ගේ නාමාවලිය",
    search_placeholder: "🔍 නම හෝ නිවාස අංකය මඟින් සොයන්න...",
    th_house: "නිවාස අංකය",
    th_name: "සාමාජිකයාගේ නම",
    th_age: "වයස",
    th_sport: "ක්‍රීඩාව",
    th_phone: "දුරකථන අංකය",
    th_action: "ක්‍රියාමාර්ග",
    form_title_fee: "💳 මාසික සාමාජික ගාස්තු සටහන් කිරීම",
    lbl_month: "මාසය:",
    lbl_amount: "මුදල (LKR):",
    lbl_status: "ගෙවීමේ තත්ත්වය:",
    btn_save_fee: "💾 ගෙවීම සටහන් කරන්න",
    list_title_fee: "📑 මාසික ගාස්තු ලේඛනය",
    th_month: "මාසය",
    th_amount: "මුදල",
    th_status: "තත්ත්වය",
    form_title_inv: "➕ ක්‍රීඩා උපකරණ එකතු කිරීම",
    lbl_item_name: "උපකරණයේ නම:",
    lbl_qty: "ප්‍රමාණය:",
    lbl_condition: "තත්ත්වය:",
    btn_save_inv: "📦 තොගයට එකතු කරන්න",
    list_title_inv: "📊 ක්‍රීඩා උපකරණ තොග ලැයිස්තුව",
    th_item: "උපකරණය",
    th_qty: "ප්‍රමාණය",
    th_condition: "තත්ත්වය",
    form_title_notice: "📢 ප්‍රධාන පුවරුවට නිවේදනයක් නිකුත් කිරීම",
    lbl_notice_title: "නිවේදනයේ මාතෘකාව:",
    lbl_notice_desc: "විස්තරය:",
    btn_post_notice: "🚀 නිවේදනය ප්‍රසිද්ධ කරන්න",
    list_title_notice: "📌 ප්‍රධාන පුවරුවේ පළවූ නිවේදන",
    total_youth: "ලියාපදිංචි තරුණ සාමාජිකයින්",
    total_equipment: "පවතින උපකරණ වර්ග",
    total_fees_collected: "එකතු වූ සාමාජික ගාස්තු",
    btn_edit: "✏️ සංස්කරණය",
    btn_delete: "🗑️️ ඉවත් කරන්න",
    logout: "ඉවත් වන්න"
  },
  ta: {
    back: "முகப்பு",
    title: "🏅 இளைஞர் மற்றும் விளையாட்டுப் போர்டல்",
    subtitle: "GramaLK - இளைஞர் நல மற்றும் விளையாட்டு அதிகாரிக்கான அமைப்பு",
    tab_members: "⚽ இளைஞர் உறுப்பினர் பதிவு",
    tab_fees: "💳 மாத உறுப்பினர் கட்டணம்",
    tab_inventory: "🏀 விளையாட்டு உபகரணங்கள்",
    tab_announce: "📢 முகப்பு அறிவிப்புகள்",
    form_title_reg: "📝 இளைஞர் மன்ற உறுப்பினரைப் பதிவுசெய்க",
    lbl_house_no: "வீட்டு எண்:",
    lbl_select_member: "உறுப்பினரைப் தேர்ந்தெடுக்கவும்:",
    lbl_age: "வயது:",
    lbl_sport: "விளையாட்டு:",
    lbl_phone: "தொலைபேசி எண்:",
    btn_register: "✅ பதிவுசெய்க",
    list_title_reg: "📋 பதிவுசெய்யப்பட்ட உறுப்பினர்கள் பட்டியல்",
    search_placeholder: "🔍 தேட...",
    th_house: "வீட்டு எண்",
    th_name: "பெயர்",
    th_age: "வயது",
    th_sport: "விளையாட்டு",
    th_phone: "தொலைபேசி",
    th_action: "செயல்பாடுகள்",
    form_title_fee: "💳 மாதக் கட்டணம் பதிவுசெய்க",
    lbl_month: "மாதம்:",
    lbl_amount: "தொகை (LKR):",
    lbl_status: "நிலை:",
    btn_save_fee: "💾 சேமிக்கவும்",
    list_title_fee: "📑 கட்டணப் பதிவுப் பட்டியல்",
    th_month: "மாதம்",
    th_amount: "தொகை",
    th_status: "நிலை",
    form_title_inv: "➕ உபகரணத்தைச் சேர்க்கவும்",
    lbl_item_name: "உபகரணப் பெயர்:",
    lbl_qty: "அளவு:",
    lbl_condition: "நிலை:",
    btn_save_inv: "📦 சேமி",
    list_title_inv: "📊 உபகரணப் பட்டியல்",
    th_item: "உபகரணம்",
    th_qty: "அளவு",
    th_condition: "நிலை",
    form_title_notice: "📢 அறிவிப்பை வெளியிடவும்",
    lbl_notice_title: "தலைப்பு:",
    lbl_notice_desc: "விளக்கம்:",
    btn_post_notice: "🚀 வெளியிடுக",
    list_title_notice: "📌 அறிவிப்புகள்",
    total_youth: "பதிவுசெய்யப்பட்ட உறுப்பினர்கள்",
    total_equipment: "உபகரணங்கள்",
    total_fees_collected: "வசூலிக்கப்பட்ட நிதி",
    btn_edit: "✏️ திருத்து",
    btn_delete: "🗑️ நீக்கு",
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

  // Data States
  const [youthMembers, setYouthMembers] = useState([]);
  const [feeRecords, setFeeRecords] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [notices, setNotices] = useState([]);
  const [houseVillagers, setHouseVillagers] = useState([]);
  const [feeHouseVillagers, setFeeHouseVillagers] = useState([]);

  // Search States
  const [searchMember, setSearchMember] = useState("");
  const [searchFee, setSearchFee] = useState("");
  const [searchInv, setSearchInv] = useState("");

  // Editing States for Modals
  const [editingMember, setEditingMember] = useState(null);
  const [editAge, setEditAge] = useState("");
  const [editSport, setEditSport] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [editingFee, setEditingFee] = useState(null);
  const [editFeeAmount, setEditFeeAmount] = useState("");

  const [editingInv, setEditingInv] = useState(null);
  const [editInvQty, setEditInvQty] = useState("");
  const [editInvCondition, setEditInvCondition] = useState("");

  const [editingNotice, setEditingNotice] = useState(null);
  const [editNoticeTitle, setEditNoticeTitle] = useState("");
  const [editNoticeDesc, setEditNoticeDesc] = useState("");

  // Form States - Member Registration
  const [regHouseNo, setRegHouseNo] = useState("");
  const [selectedVillagerName, setSelectedVillagerName] = useState("");
  const [age, setAge] = useState("");
  const [sport, setSport] = useState("Football");
  const [phone, setPhone] = useState("");

  // Form States - Monthly Fees
  const [feeHouseNo, setFeeHouseNo] = useState("");
  const [selectedFeeMember, setSelectedFeeMember] = useState("");
  const [feeMonth, setFeeMonth] = useState("January");
  const [feeAmount, setFeeAmount] = useState("500");
  const [feeStatus, setFeeStatus] = useState("Paid");

  // Form States - Inventory
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemCondition, setItemCondition] = useState("Good");

  // Form States - Notices
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const txt = (key) => {
    const lang = youthTranslations[currentLng] ? currentLng : "si";
    return youthTranslations[lang][key] || youthTranslations.en[key] || key;
  };

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Fetch functions
  const fetchYouthMembers = () => {
    fetch("http://localhost:5000/api/sports/members")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setYouthMembers(data))
      .catch((err) => console.error("Error fetching youth members:", err));
  };

  const fetchFees = () => {
    fetch("http://localhost:5000/api/sports/fees")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setFeeRecords(data))
      .catch((err) => console.error("Error fetching fees:", err));
  };

  const fetchInventory = () => {
    fetch("http://localhost:5000/api/sports/inventory")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setInventoryList(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  };

  const fetchNotices = () => {
    fetch("http://localhost:5000/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotices(data.filter((item) => item.category === "YouthSports"));
        }
      })
      .catch((err) => console.error("Error fetching notices:", err));
  };

  useEffect(() => {
    fetchYouthMembers();
    fetchFees();
    fetchInventory();
    fetchNotices();
  }, []);

  // Villager lookup handlers
  const handleRegHouseChange = async (houseNo) => {
    setRegHouseNo(houseNo);
    setSelectedVillagerName("");
    if (!houseNo.trim()) {
      setHouseVillagers([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/villagers?houseNumber=${houseNo.trim()}`);
      const data = await res.json();
      if (Array.isArray(data)) setHouseVillagers(data);
      else setHouseVillagers([]);
    } catch (err) {
      setHouseVillagers([]);
    }
  };

  const handleFeeHouseChange = async (houseNo) => {
    setFeeHouseNo(houseNo);
    setSelectedFeeMember("");
    if (!houseNo.trim()) {
      setFeeHouseVillagers([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/villagers?houseNumber=${houseNo.trim()}`);
      const data = await res.json();
      if (Array.isArray(data)) setFeeHouseVillagers(data);
      else setFeeHouseVillagers([]);
    } catch (err) {
      setFeeHouseVillagers([]);
    }
  };

  // CRUD Handlers: Register & Update & Delete Members
  const handleRegisterYouth = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/sports/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ houseNumber: regHouseNo, name: selectedVillagerName, age: Number(age), sport, phone }),
      });
      if (res.ok) {
        showNotification("තරුණ සාමාජිකයා සාර්ථකව ලියාපදිංචි විය!", "success");
        setRegHouseNo("");
        setSelectedVillagerName("");
        setAge("");
        setPhone("");
        fetchYouthMembers();
      } else {
        showNotification("ලියාපදිංචි කිරීම අසාර්ථක විය.", "error");
      }
    } catch (err) {
      showNotification("Server දෝෂයකි.", "error");
    }
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/sports/members/${editingMember._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age: Number(editAge), sport: editSport, phone: editPhone }),
      });
      if (res.ok) {
        showNotification("සාමාජික තොරතුරු සාර්ථකව යාවත්කාලීන විය!", "success");
        setEditingMember(null);
        fetchYouthMembers();
      } else {
        showNotification("යාවත්කාලීන කිරීම අසාර්ථක විය.", "error");
      }
    } catch (err) {
      showNotification("Server දෝෂයකි.", "error");
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("මෙම සාමාජිකයා ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/sports/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("සාමාජිකයා සාර්ථකව ඉවත් කරන ලදී.", "success");
        fetchYouthMembers();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථක විය.", "error");
    }
  };

  // CRUD Handlers: Fees
  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/sports/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ houseNumber: feeHouseNo, memberName: selectedFeeMember, month: feeMonth, amount: Number(feeAmount), status: feeStatus }),
      });
      if (res.ok) {
        showNotification("සාමාජික ගාස්තුව සටහන් කළා!", "success");
        setFeeHouseNo("");
        setSelectedFeeMember("");
        fetchFees();
      } else {
        showNotification("ගෙවීම සටහන් කිරීම අසාර්ථක විය.", "error");
      }
    } catch (err) {
      showNotification("Server දෝෂයකි.", "error");
    }
  };

  const handleUpdateFee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/sports/fees/${editingFee._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(editFeeAmount) }),
      });
      if (res.ok) {
        showNotification("ගාස්තු තොරතුරු යාවත්කාලීන විය!", "success");
        setEditingFee(null);
        fetchFees();
      }
    } catch (err) {
      showNotification("යාවත්කාලීන කිරීම අසාර්ථකයි.", "error");
    }
  };

  const handleDeleteFee = async (id) => {
    if (!window.confirm("මෙම ගෙවීමේ සටහන ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/sports/fees/${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("ගෙවීමේ සටහන ඉවත් කළා!", "success");
        fetchFees();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථකයි.", "error");
    }
  };

  // CRUD Handlers: Inventory
  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/sports/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName, quantity: Number(itemQty), condition: itemCondition }),
      });
      if (res.ok) {
        showNotification("ක්‍රීඩා උපකරණය එකතු විය!", "success");
        setItemName("");
        setItemQty("");
        fetchInventory();
      }
    } catch (err) {
      showNotification("Server දෝෂයකි.", "error");
    }
  };

  const handleUpdateInventory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/sports/inventory/${editingInv._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: Number(editInvQty), condition: editInvCondition }),
      });
      if (res.ok) {
        showNotification("උපකරණ තොගය යාවත්කාලීන විය!", "success");
        setEditingInv(null);
        fetchInventory();
      }
    } catch (err) {
      showNotification("යාවත්කාලීන කිරීම අසාර්ථකයි.", "error");
    }
  };

  const handleDeleteInventory = async (id) => {
    if (!window.confirm("මෙම උපකරණය ඉවත් කිරීමට අවශ්‍යද?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/sports/inventory/${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("ઉപකරණය ඉවත් කළා!", "success");
        fetchInventory();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථකයි.", "error");
    }
  };

  // CRUD Handlers: Notices
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gramalk_token");
      const res = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: noticeTitle, description: noticeContent, category: "YouthSports", date: new Date().toISOString() }),
      });
      if (res.ok) {
        showNotification("නිවේදනය ප්‍රධාන පුවරුවට යවන ලදී!", "success");
        setNoticeTitle("");
        setNoticeContent("");
        fetchNotices();
      }
    } catch (err) {
      showNotification("නිවේදනය යැවීම අසාර්ථකයි.", "error");
    }
  };

  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gramalk_token");
      const res = await fetch(`http://localhost:5000/api/announcements/${editingNotice._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: editNoticeTitle, description: editNoticeDesc }),
      });
      if (res.ok) {
        showNotification("නිවේදනය යාවත්කාලීන විය!", "success");
        setEditingNotice(null);
        fetchNotices();
      }
    } catch (err) {
      showNotification("යාවත්කාලීන කිරීම අසාර්ථකයි.", "error");
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
        showNotification("නිවේදනය ඉවත් කළා!", "success");
        fetchNotices();
      }
    } catch (err) {
      showNotification("ඉවත් කිරීම අසාර්ථකයි.", "error");
    }
  };

  // Filtered lists for Search functionality
  const filteredMembers = youthMembers.filter(m => 
    m.name?.toLowerCase().includes(searchMember.toLowerCase()) || 
    m.houseNumber?.toLowerCase().includes(searchMember.toLowerCase())
  );

  const filteredFees = feeRecords.filter(f => 
    f.memberName?.toLowerCase().includes(searchFee.toLowerCase()) || 
    f.houseNumber?.toLowerCase().includes(searchFee.toLowerCase())
  );

  const filteredInventory = inventoryList.filter(i => 
    i.itemName?.toLowerCase().includes(searchInv.toLowerCase())
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLng(lng);
    localStorage.setItem("gramalk_lang", lng);
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
      {toast.show && (
        <div style={{ ...styles.toastCard, backgroundColor: toast.type === "error" ? "#ef4444" : "#10b981" }}>
          <span>{toast.type === "error" ? "⚠" : "🎉"}</span>
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

      {/* Header */}
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
          <span style={styles.statIcon}>⚽</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>{youthMembers.length}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{txt("total_youth")}</p>
          </div>
        </div>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>🏀</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>{inventoryList.length}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{txt("total_equipment")}</p>
          </div>
        </div>
        <div style={{ ...styles.statCard, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <span style={styles.statIcon}>💵</span>
          <div>
            <h3 style={{ ...styles.statNumber, color: darkMode ? "#34d399" : "#065f46" }}>LKR {feeRecords.reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()}</h3>
            <p style={{ ...styles.statLabel, color: darkMode ? "#9ca3af" : "#6b7280" }}>{txt("total_fees_collected")}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        <button style={{ ...styles.tabBtn, ...(activeTab === "members" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("members")}>{txt("tab_members")}</button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "fees" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("fees")}>{txt("tab_fees")}</button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "inventory" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("inventory")}>{txt("tab_inventory")}</button>
        <button style={{ ...styles.tabBtn, ...(activeTab === "announcements" ? styles.activeTabBtn : {}) }} onClick={() => setActiveTab("announcements")}>{txt("tab_announcements")}</button>
      </div>

      {/* TAB 1: YOUTH MEMBER REGISTRATION */}
      {activeTab === "members" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_reg")}</h2>
            <form onSubmit={handleRegisterYouth} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_house_no")}</label>
                <input type="text" placeholder="e.g. H-1" value={regHouseNo} onChange={(e) => handleRegHouseChange(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_select_member")}</label>
                <select value={selectedVillagerName} onChange={(e) => setSelectedVillagerName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required>
                  <option value="">-- Select Member --</option>
                  {houseVillagers.map((v, idx) => (
                    <option key={idx} value={v.fullName || v.username || v.name}>{v.fullName || v.username || v.name}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_age")}</label>
                <input type="number" placeholder="18" value={age} onChange={(e) => setAge(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_sport")}</label>
                <select value={sport} onChange={(e) => setSport(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Football">⚽ Football</option>
                  <option value="Cricket">🏏 Cricket</option>
                  <option value="Volleyball">🏐 Volleyball</option>
                  <option value="Badminton">🏸 Badminton</option>
                  <option value="Athletics">🏃 Athletics</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_phone")}</label>
                <input type="text" placeholder="0711234567" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} />
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_register")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_reg")}</h2>
            
            {/* Search Input */}
            <div style={{ marginBottom: "15px" }}>
              <input type="text" placeholder={txt("search_placeholder")} value={searchMember} onChange={(e) => setSearchMember(e.target.value)} style={{ ...styles.input, width: "100%", backgroundColor: theme.inputBg, color: theme.inputText }} />
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_house")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_name")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_age")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_sport")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_phone")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length === 0 ? (
                    <tr><td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>No records found.</td></tr>
                  ) : (
                    filteredMembers.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNumber}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.name}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.age}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.sport}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.phone || "N/A"}</td>
                        <td style={{ ...styles.td, display: "flex", gap: "6px" }}>
                          <button style={styles.editBtn} onClick={() => { setEditingMember(item); setEditAge(item.age); setEditSport(item.sport); setEditPhone(item.phone); }}>{txt("btn_edit")}</button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteMember(item._id)}>{txt("btn_delete")}</button>
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

      {/* TAB 2: MONTHLY MEMBER FEES */}
      {activeTab === "fees" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_fee")}</h2>
            <form onSubmit={handleFeeSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_house_no")}</label>
                <input type="text" placeholder="e.g. H-1" value={feeHouseNo} onChange={(e) => handleFeeHouseChange(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_select_member")}</label>
                <select value={selectedFeeMember} onChange={(e) => setSelectedFeeMember(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required>
                  <option value="">-- Select Member --</option>
                  {feeHouseVillagers.map((v, idx) => (
                    <option key={idx} value={v.fullName || v.username || v.name}>{v.fullName || v.username || v.name}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_month")}</label>
                <select value={feeMonth} onChange={(e) => setFeeMonth(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_amount")}</label>
                <input type="number" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_save_fee")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_fee")}</h2>
            
            {/* Search Input */}
            <div style={{ marginBottom: "15px" }}>
              <input type="text" placeholder={txt("search_placeholder")} value={searchFee} onChange={(e) => setSearchFee(e.target.value)} style={{ ...styles.input, width: "100%", backgroundColor: theme.inputBg, color: theme.inputText }} />
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_house")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_name")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_month")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_amount")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>No fee records found.</td></tr>
                  ) : (
                    filteredFees.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.houseNumber}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.memberName}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.month}</td>
                        <td style={{ ...styles.td, color: theme.text }}>LKR {item.amount}</td>
                        <td style={{ ...styles.td, display: "flex", gap: "6px" }}>
                          <button style={styles.editBtn} onClick={() => { setEditingFee(item); setEditFeeAmount(item.amount); }}>{txt("btn_edit")}</button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteFee(item._id)}>{txt("btn_delete")}</button>
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

      {/* TAB 3: SPORTS EQUIPMENT INVENTORY */}
      {activeTab === "inventory" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_inv")}</h2>
            <form onSubmit={handleInventorySubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_item_name")}</label>
                <input type="text" placeholder="e.g. Football" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_qty")}</label>
                <input type="number" placeholder="10" value={itemQty} onChange={(e) => setItemQty(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_condition")}</label>
                <select value={itemCondition} onChange={(e) => setItemCondition(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }}>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Repair">Needs Repair</option>
                </select>
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_save_inv")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_inv")}</h2>
            
            {/* Search Input */}
            <div style={{ marginBottom: "15px" }}>
              <input type="text" placeholder={txt("search_placeholder")} value={searchInv} onChange={(e) => setSearchInv(e.target.value)} style={{ ...styles.input, width: "100%", backgroundColor: theme.inputBg, color: theme.inputText }} />
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: theme.tableHeaderBg }}>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_item")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_qty")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_condition")}</th>
                    <th style={{ ...styles.th, color: theme.tableHeaderFont }}>{txt("th_action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>No items found.</td></tr>
                  ) : (
                    filteredInventory.map((item, index) => (
                      <tr key={item._id || index} style={{ backgroundColor: index % 2 === 0 ? theme.tableRowEven : theme.cardBg }}>
                        <td style={{ ...styles.td, color: theme.text }}><strong>{item.itemName}</strong></td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.quantity}</td>
                        <td style={{ ...styles.td, color: theme.text }}>{item.condition}</td>
                        <td style={{ ...styles.td, display: "flex", gap: "6px" }}>
                          <button style={styles.editBtn} onClick={() => { setEditingInv(item); setEditInvQty(item.quantity); setEditInvCondition(item.condition); }}>{txt("btn_edit")}</button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteInventory(item._id)}>{txt("btn_delete")}</button>
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

      {/* TAB 4: ANNOUNCEMENTS */}
      {activeTab === "announcements" && (
        <div style={styles.contentGrid}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("form_title_notice")}</h2>
            <form onSubmit={handleNoticeSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_notice_title")}</label>
                <input type="text" placeholder="e.g. Annual Tournament" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={{ ...styles.label, color: theme.text }}>{txt("lbl_notice_desc")}</label>
                <textarea rows="4" placeholder="Details..." value={noticeContent} onChange={(e) => setNoticeContent(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText, resize: "vertical" }} required />
              </div>
              <button type="submit" style={styles.submitBtn}>{txt("btn_post_notice")}</button>
            </form>
          </div>

          <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <h2 style={{ ...styles.cardTitle, color: darkMode ? "#34d399" : "#065f46" }}>{txt("list_title_notice")}</h2>
            {notices.length === 0 ? (
              <p style={{ textAlign: "center", padding: "15px" }}>No active notices.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {notices.map((notice) => (
                  <div key={notice._id} style={{ padding: "15px", borderRadius: "10px", border: "1px solid #d1d5db", backgroundColor: theme.inputBg }}>
                    <h4 style={{ margin: "0 0 6px 0", color: "#065f46" }}>{notice.title}</h4>
                    <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>{notice.description}</p>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button style={styles.editBtn} onClick={() => { setEditingNotice(notice); setEditNoticeTitle(notice.title); setEditNoticeDesc(notice.description); }}>{txt("btn_edit")}</button>
                      <button style={styles.deleteBtn} onClick={() => handleDeleteNotice(notice._id)}>{txt("btn_delete")}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODALS */}
      {editingMember && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ Update Member</h3>
            <form onSubmit={handleUpdateMember} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Age:</label>
                <input type="number" value={editAge} onChange={(e) => setEditAge(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sport:</label>
                <input type="text" value={editSport} onChange={(e) => setEditSport(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone:</label>
                <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingMember(null)}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingFee && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ Update Fee Amount</h3>
            <form onSubmit={handleUpdateFee} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Amount (LKR):</label>
                <input type="number" value={editFeeAmount} onChange={(e) => setEditFeeAmount(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingFee(null)}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingInv && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ Update Equipment</h3>
            <form onSubmit={handleUpdateInventory} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Quantity:</label>
                <input type="number" value={editInvQty} onChange={(e) => setEditInvQty(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Condition:</label>
                <input type="text" value={editInvCondition} onChange={(e) => setEditInvCondition(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingInv(null)}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingNotice && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <h3 style={styles.modalTitle}>✏️ Update Notice</h3>
            <form onSubmit={handleUpdateNotice} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title:</label>
                <input type="text" value={editNoticeTitle} onChange={(e) => setEditNoticeTitle(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description:</label>
                <textarea rows="3" value={editNoticeDesc} onChange={(e) => setEditNoticeDesc(e.target.value)} style={{ ...styles.input, backgroundColor: theme.inputBg, color: theme.inputText }} required />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.modalCancelBtn} onClick={() => setEditingNotice(null)}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalCard, backgroundColor: theme.cardBg, color: theme.text }}>
            <div style={styles.modalIcon}>🚪</div>
            <h3 style={styles.modalTitle}>{txt("logout")}?</h3>
            <div style={styles.modalActions}>
              <button style={styles.modalCancelBtn} onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button style={styles.modalConfirmBtn} onClick={() => { localStorage.removeItem("gramalk_token"); window.location.href = "/login"; }}>{txt("logout")}</button>
            </div>
          </div>
        </div>
      )}
import React from 'react';

function YouthSportsPortal() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Youth & Sports Portal</h1>
      <p>Youth & Sports Portal කොටස සකස් වෙමින් පවතියි...</p>
    </div>
  );
}

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
export default YouthSportsPortal;
