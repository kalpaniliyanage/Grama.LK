import React, { useState, useEffect, useMemo } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* =========================================================
   DASHBOARD TRANSLATIONS (EN, SI, TA)
========================================================= */
const dashboardWords = {
  en: {
    portalTitle: "GN OFFICER PORTAL",
    overview: "Overview",
    dailyStatus: "Daily Status",
    appointments: "Appointments",
    villagers: "Villagers",
    complaints: "Complaints",
    notices: "Notices",
    logout: "Logout",
    totalVillagers: "Total Villagers",
    pendingAppointments: "Pending Appointments",
    pendingComplaints: "Pending Complaints",
    publishedNotices: "Published Notices",
    updateDailyStatus: "Update Daily Working Status",
    currentStatus: "Current Status",
    statusNote: "Status Note / Message",
    updateStatusBtn: "Update Status",
    lastUpdated: "Last updated",
    publicAppointments: "Public Appointments",
    searchApptPlaceholder: "Search by Villager / Purpose...",
    allStatuses: "All Statuses",
    pending: "Pending",
    accepted: "Accepted",
    declined: "Declined",
    inProgress: "In Progress",
    resolved: "Resolved",
    draft: "Draft",
    published: "Published",
    expired: "Expired",
    villager: "Villager",
    dateTime: "Date & Time",
    purpose: "Purpose",
    status: "Status",
    officerNote: "Officer Note",
    actions: "Actions",
    accept: "Accept",
    decline: "Decline",
    note: "Note",
    saveNote: "Save Note",
    cancel: "Cancel",
    villagersDirectory: "Villagers Directory",
    searchVillagerPlaceholder: "Search by Name, NIC, House No...",
    addVillager: "+ Add Villager",
    fullName: "Full Name",
    nic: "NIC Number",
    houseNumber: "House Number",
    phone: "Phone Number",
    address: "Address",
    familyDetails: "Family Details",
    edit: "Edit",
    delete: "Delete",
    saveVillager: "Save Villager",
    checkComplaints: "Check Complaints",
    searchComplaintsPlaceholder: "Search complaints...",
    subject: "Subject",
    category: "Category",
    description: "Description",
    officerReply: "Officer Reply",
    replyStatus: "Reply / Status",
    saveResponse: "Save Response",
    noticesTitle: "Notices & Announcements",
    searchNoticesPlaceholder: "Search notices...",
    createNotice: "+ Create Notice",
    noticeTitle: "Notice Title",
    content: "Content",
    expiryDate: "Expiry Date",
    publish: "Publish",
    confirmDelete: "Confirm Deletion",
    deleteWarning: "Are you sure you want to delete",
    yesDelete: "Yes, Delete",
  },
  si: {
    portalTitle: "ග්‍රාම නිලධාරී පෝර්ටලය",
    overview: "සාරාංශය",
    dailyStatus: "දෛනික තත්ත්වය",
    appointments: "හමුවීම්",
    villagers: "පුරවැසියන්",
    complaints: "පැමිණිලි",
    notices: "නිවේදන",
    logout: "පිටවීම",
    totalVillagers: "මුළු පුරවැසියන්",
    pendingAppointments: "පොරොත්තු හමුවීම්",
    pendingComplaints: "පොරොත්තු පැමිණිලි",
    publishedNotices: "පළකළ නිවේදන",
    updateDailyStatus: "දෛනික සේවා තත්ත්වය යාවත්කාලීන කිරීම",
    currentStatus: "වත්මන් තත්ත්වය",
    statusNote: "විස්තරය / හේතුව",
    updateStatusBtn: "තත්ත්වය සුරකින්න",
    lastUpdated: "අවසන් වරට යාවත්කාලීන කළේ",
    publicAppointments: "මහජන හමුවීම් ලැයිස්තුව",
    searchApptPlaceholder: "නම හෝ අරමුණ අනුව සොයන්න...",
    allStatuses: "සියලුම තත්ත්වයන්",
    pending: "පොරොත්තුවේ",
    accepted: "පිළිගත්තා",
    declined: "ප්‍රතික්ෂේපිත",
    inProgress: "ක්‍රියාත්මක වෙමින්",
    resolved: "විසඳන ලදී",
    draft: "කෙටුම්පත",
    published: "පළකළා",
    expired: "කල් ඉකුත් වූ",
    villager: "පුරවැසියා",
    dateTime: "දිනය සහ වේලාව",
    purpose: "අරමුණ",
    status: "තත්ත්වය",
    officerNote: "නිලධාරී සටහන",
    actions: "ක්‍රියාමාර්ග",
    accept: "පිළිගන්න",
    decline: "ප්‍රතික්ෂේප කරන්න",
    note: "සටහන",
    saveNote: "සටහන සුරකින්න",
    cancel: "අවලංගු කරන්න",
    villagersDirectory: "පුරවැසි නාමාවලිය",
    searchVillagerPlaceholder: "නම, හැඳුනුම්පත, ලිපිනය මඟින් සොයන්න...",
    addVillager: "+ පුරවැසියෙකු එක්කරන්න",
    fullName: "සම්පූර්ණ නම",
    nic: "හැඳුනුම්පත් අංකය",
    houseNumber: "නිවාස අංකය",
    phone: "දුරකථන අංකය",
    address: "ලිපිනය",
    familyDetails: "පවුලේ විස්තර",
    edit: "සංස්කරණය",
    delete: "මකන්න",
    saveVillager: "පුරවැසියා සුරකින්න",
    checkComplaints: "මහජන පැමිණිලි පරීක්ෂා කිරීම",
    searchComplaintsPlaceholder: "පැමිණිලි සොයන්න...",
    subject: "මාතෘකාව",
    category: "වර්ගය",
    description: "විස්තරය",
    officerReply: "නිලධාරී පිළිතුර",
    replyStatus: "පිළිතුර / තත්ත්වය",
    saveResponse: "පිළිතුර සුරකින්න",
    noticesTitle: "දැන්වීම් සහ නිවේදන",
    searchNoticesPlaceholder: "නිවේදන සොයන්න...",
    createNotice: "+ නිවේදනයක් පළකරන්න",
    noticeTitle: "නිවේදන මාතෘකාව",
    content: "අන්තර්ගතය",
    expiryDate: "කල් ඉකුත්වන දිනය",
    publish: "පළකරන්න",
    confirmDelete: "මැකීම තහවුරු කරන්න",
    deleteWarning: "ඔබට මෙය මකා දැමීමට අවශ්‍ය බව සහතිකද",
    yesDelete: "ඔව්, මකන්න",
  },
  ta: {
    portalTitle: "கிராம நிலதாரி போர்டல்",
    overview: "கண்ணோட்டம்",
    dailyStatus: "தினசரி நிலை",
    appointments: "சந்திப்புகள்",
    villagers: "கிராம மக்கள்",
    complaints: "முறைப்பாடுகள்",
    notices: "அறிவிப்புகள்",
    logout: "வெளியேறு",
    totalVillagers: "மொத்த கிராம மக்கள்",
    pendingAppointments: "நிலுவையிலுள்ள சந்திப்புகள்",
    pendingComplaints: "நிலுவையிலுள்ள முறைப்பாடுகள்",
    publishedNotices: "வெளியிடப்பட்ட அறிவிப்புகள்",
    updateDailyStatus: "தினசரி பணி நிலையைப் புதுப்பிக்கவும்",
    currentStatus: "தற்போதைய நிலை",
    statusNote: "குறிப்பு / காரணம்",
    updateStatusBtn: "நிலையைச் சேமிக்கவும்",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    publicAppointments: "பொது சந்திப்புகள்",
    searchApptPlaceholder: "பெயர் அல்லது நோக்கம் மூலம் தேடவும்...",
    allStatuses: "அனைத்து நிலைகளும்",
    pending: "நிலுவையில்",
    accepted: "ஏற்றுக்கொள்ளப்பட்டது",
    declined: "நிராகரிக்கப்பட்டது",
    inProgress: "செயல்பாட்டில்",
    resolved: "தீர்க்கப்பட்டது",
    draft: "வரைவு",
    published: "வெளியிடப்பட்டது",
    expired: "காலாவதியானது",
    villager: "கிராமவாசி",
    dateTime: "திகதி & நேரம்",
    purpose: "நோக்கம்",
    status: "நிலை",
    officerNote: "அதிகாரி குறிப்பு",
    actions: "நடவடிக்கைகள்",
    accept: "ஏற்கவும்",
    decline: "நிராகரிக்கவும்",
    note: "குறிப்பு",
    saveNote: "குறிப்பைச் சேமிக்கவும்",
    cancel: "ரத்து செய்",
    villagersDirectory: "கிராம மக்கள் விபரம்",
    searchVillagerPlaceholder: "பெயர், அட்டை எண், வீட்டு எண் மூலம் தேடவும்...",
    addVillager: "+ கிராமவாசியைச் சேர்க்கவும்",
    fullName: "முழுப் பெயர்",
    nic: "அடையாள அட்டை எண்",
    houseNumber: "வீட்டு இலக்கம்",
    phone: "தொலைபேசி எண்",
    address: "முகவரி",
    familyDetails: "குடும்ப விபரங்கள்",
    edit: "திருத்து",
    delete: "நீக்கு",
    saveVillager: "சேமிக்கவும்",
    checkComplaints: "முறைப்பாடுகளைப் பார்க்கவும்",
    searchComplaintsPlaceholder: "முறைப்பாடுகளைத் தேடவும்...",
    subject: "விடயம்",
    category: "வகை",
    description: "விபரம்",
    officerReply: "அதிகாரி பதில்",
    replyStatus: "பதில் / நிலை",
    saveResponse: "பதிலைச் சேமிக்கவும்",
    noticesTitle: "அறிவிப்புகள்",
    searchNoticesPlaceholder: "அறிவிப்புகளைத் தேடவும்...",
    createNotice: "+ புதிய அறிவிப்பு",
    noticeTitle: "தலைப்பு",
    content: "உள்ளடக்கம்",
    expiryDate: "காலாவதி திகதி",
    publish: "வெளியிடு",
    confirmDelete: "நீக்குவதை உறுதிப்படுத்தவும்",
    deleteWarning: "நிச்சயமாக நீக்க விரும்புகிறீர்களா",
    yesDelete: "ஆம், நீக்கு",
  }
};

const GNPortal = () => {
  // Navigation & Theme & Language States
  const [activeSection, setActiveSection] = useState('overview');
  const [theme, setTheme] = useState(localStorage.getItem('gramalk_theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('gramalk_lang') || 'en');
  const [officerUser, setOfficerUser] = useState(null);

  const t = (key) => dashboardWords[lang]?.[key] || dashboardWords.en[key] || key;

  // Language Change Handler
  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('gramalk_lang', newLang);
    document.documentElement.lang = newLang;
  };

  // Toast Notifications
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 4000);
  };

  // 1. Daily Status
  const [statusState, setStatusState] = useState({
    status: 'Available',
    statusMessage: '',
    updatedAt: new Date().toLocaleTimeString(),
  });

  // 2. Appointments State
  const [appointments, setAppointments] = useState([]);
  const [apptFilter, setApptFilter] = useState('All');
  const [apptSearch, setApptSearch] = useState('');
  const [noteModal, setNoteModal] = useState({ open: false, apptId: null, note: '' });

  // 3. Villagers State (CRUD)
  const [villagers, setVillagers] = useState([]);
  const [villagerSearch, setVillagerSearch] = useState('');
  const [villagerModal, setVillagerModal] = useState({ open: false, mode: 'create', data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: null, name: '' });

  // 4. Complaints State
  const [complaints, setComplaints] = useState([]);
  const [complaintFilter, setComplaintFilter] = useState('All');
  const [complaintSearch, setComplaintSearch] = useState('');
  const [replyModal, setReplyModal] = useState({ open: false, complaint: null, reply: '', status: '' });

  // 5. Notices State (Announcements CRUD)
  const [notices, setNotices] = useState([]);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeFilter, setNoticeFilter] = useState('All');
  const [noticeModal, setNoticeModal] = useState({ open: false, mode: 'create', data: null });

  // Load Data
  useEffect(() => {
    const storedUser = localStorage.getItem('gramalk_user');
    if (storedUser) {
      try {
        setOfficerUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [apptRes, usersRes, compRes, noticeRes] = await Promise.all([
        fetch(`${API}/appointments`).catch(() => null),
        fetch(`${API}/users`).catch(() => null),
        fetch(`${API}/complaints`).catch(() => null),
        fetch(`${API}/announcements`).catch(() => null),
      ]);

      if (apptRes?.ok) {
        const data = await apptRes.json();
        setAppointments(Array.isArray(data) ? data : []);
      }
      if (usersRes?.ok) {
        const data = await usersRes.json();
        const villagerList = (Array.isArray(data) ? data : []).filter(u => u.role !== 'gnadmin');
        setVillagers(villagerList);
      }
      if (compRes?.ok) {
        const data = await compRes.json();
        setComplaints(Array.isArray(data) ? data : []);
      }
      if (noticeRes?.ok) {
        const data = await noticeRes.json();
        setNotices(Array.isArray(data) ? data : data.announcements || []);
      }
    } catch (err) {
      console.log('Error fetching API:', err);
    }
  };

  // Handlers
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('gramalk_token');
      await fetch(`${API}/officers/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          status: statusState.status,
          statusMessage: statusState.statusMessage,
        }),
      });
      setStatusState(prev => ({ ...prev, updatedAt: new Date().toLocaleTimeString() }));
      showAlert('Status updated successfully!');
    } catch {
      showAlert('Failed to update status', 'error');
    }
  };

  const handleAppointmentAction = async (id, newStatus) => {
    try {
      await fetch(`${API}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setAppointments(prev => prev.map(a => a._id === id || a.id === id ? { ...a, status: newStatus } : a));
      showAlert(`Appointment marked as ${newStatus}`);
    } catch {
      showAlert('Action failed', 'error');
    }
  };

  const handleSaveNote = async () => {
    const { apptId, note } = noteModal;
    try {
      await fetch(`${API}/appointments/${apptId}/note`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officerNote: note }),
      });
      setAppointments(prev => prev.map(a => a._id === apptId || a.id === apptId ? { ...a, officerNote: note } : a));
      setNoteModal({ open: false, apptId: null, note: '' });
      showAlert('Note saved successfully!');
    } catch {
      showAlert('Failed to save note', 'error');
    }
  };

  const handleSaveVillager = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    payload.role = 'villager';

    const isEdit = villagerModal.mode === 'edit';
    const url = isEdit ? `${API}/users/${villagerModal.data._id}` : `${API}/users`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      if (isEdit) {
        setVillagers(prev => prev.map(v => v._id === villagerModal.data._id ? saved : v));
        showAlert('Villager updated successfully!');
      } else {
        setVillagers(prev => [saved, ...prev]);
        showAlert('Villager created successfully!');
      }
      setVillagerModal({ open: false, mode: 'create', data: null });
    } catch {
      showAlert('Action failed', 'error');
    }
  };

  const executeDelete = async () => {
    const { type, id } = deleteConfirm;
    try {
      if (type === 'villager') {
        await fetch(`${API}/users/${id}`, { method: 'DELETE' });
        setVillagers(prev => prev.filter(v => v._id !== id));
        showAlert('Villager record deleted.');
      } else if (type === 'notice') {
        await fetch(`${API}/announcements/${id}`, { method: 'DELETE' });
        setNotices(prev => prev.filter(n => n._id !== id));
        showAlert('Notice deleted.');
      }
    } catch {
      showAlert('Failed to delete.', 'error');
    } finally {
      setDeleteConfirm({ open: false, type: '', id: null, name: '' });
    }
  };

  const handleSaveComplaintReply = async (e) => {
    e.preventDefault();
    const { complaint, reply, status } = replyModal;
    try {
      await fetch(`${API}/complaints/${complaint._id}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply, status }),
      });
      setComplaints(prev => prev.map(c => c._id === complaint._id ? { ...c, reply, status } : c));
      setReplyModal({ open: false, complaint: null, reply: '', status: '' });
      showAlert('Reply saved successfully!');
    } catch {
      showAlert('Failed to update complaint.', 'error');
    }
  };

  const handleSaveNotice = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    const isEdit = noticeModal.mode === 'edit';
    const url = isEdit ? `${API}/announcements/${noticeModal.data._id}` : `${API}/announcements`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      if (isEdit) {
        setNotices(prev => prev.map(n => n._id === noticeModal.data._id ? saved : n));
        showAlert('Notice updated successfully!');
      } else {
        setNotices(prev => [saved, ...prev]);
        showAlert('Notice published successfully!');
      }
      setNoticeModal({ open: false, mode: 'create', data: null });
    } catch {
      showAlert('Notice action failed.', 'error');
    }
  };

  // Filtered queries
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      const matchFilter = apptFilter === 'All' || a.status === apptFilter;
      const matchSearch =
        (a.villagerName || '').toLowerCase().includes(apptSearch.toLowerCase()) ||
        (a.purpose || '').toLowerCase().includes(apptSearch.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [appointments, apptFilter, apptSearch]);

  const filteredVillagers = useMemo(() => {
    return villagers.filter(v =>
      (v.fullName || '').toLowerCase().includes(villagerSearch.toLowerCase()) ||
      (v.nic || '').includes(villagerSearch) ||
      (v.houseNumber || '').includes(villagerSearch) ||
      (v.phone || '').includes(villagerSearch)
    );
  }, [villagers, villagerSearch]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchFilter = complaintFilter === 'All' || c.status === complaintFilter;
      const matchSearch =
        (c.subject || '').toLowerCase().includes(complaintSearch.toLowerCase()) ||
        (c.category || '').toLowerCase().includes(complaintSearch.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [complaints, complaintFilter, complaintSearch]);

  const filteredNotices = useMemo(() => {
    return notices.filter(n => {
      const matchFilter = noticeFilter === 'All' || n.status === noticeFilter;
      const matchSearch = (n.title || '').toLowerCase().includes(noticeSearch.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [notices, noticeFilter, noticeSearch]);

  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;
  const pendingComplaintsCount = complaints.filter(c => c.status === 'Pending').length;
  const publishedNoticesCount = notices.filter(n => n.status === 'Published').length;

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc', color: theme === 'dark' ? '#f1f5f9' : '#1e293b', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Toast Alert */}
      {alert.show && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, padding: '12px 24px', borderRadius: '10px', backgroundColor: alert.type === 'error' ? '#ef4444' : '#15803d', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: '600' }}>
          {alert.message}
        </div>
      )}

      {/* Sticky Responsive Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '10px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
            <img src="/images/logo.png" alt="GramaLK Logo" style={{ height: '38px' }} />
            <div>
              <strong style={{ fontSize: '18px', color: '#16a34a', display: 'block', lineHeight: '1.1' }}>GramaLK</strong>
              <small style={{ color: '#64748b', fontSize: '11px' }}>{t('portalTitle')}</small>
            </div>
          </a>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'overview', label: t('overview') },
              { id: 'status', label: t('dailyStatus') },
              { id: 'appointments', label: `${t('appointments')} (${pendingAppointmentsCount})` },
              { id: 'villagers', label: t('villagers') },
              { id: 'complaints', label: `${t('complaints')} (${pendingComplaintsCount})` },
              { id: 'notices', label: t('notices') },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: activeSection === tab.id ? '#15803d' : 'transparent',
                  color: activeSection === tab.id ? '#ffffff' : (theme === 'dark' ? '#cbd5e1' : '#475569'),
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Controls: Language Switcher, Theme & Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Language Switcher Dropdown */}
            <select
              value={lang}
              onChange={(e) => handleLangChange(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                border: theme === 'dark' ? '1px solid #475569' : '1px solid #cbd5e1',
                backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                color: theme === 'dark' ? '#f8fafc' : '#1e293b',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                setTheme(next);
                localStorage.setItem('gramalk_theme', next);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            {/* Officer Profile & Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                {officerUser?.fullName || 'GN Officer'}
              </span>
              <a href="/" style={{ fontSize: '12px', color: '#ef4444', textDecoration: 'none', marginLeft: '6px' }}>{t('logout')}</a>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>

        {/* Overview Cards */}
        {activeSection === 'overview' && (
          <section>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px' }}>{t('overview')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '35px' }}>
              
              <div onClick={() => setActiveSection('villagers')} style={overviewCardStyle(theme)}>
                <span style={{ fontSize: '28px' }}>👥</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{t('totalVillagers')}</h4>
                  <strong style={{ fontSize: '24px', color: '#15803d' }}>{villagers.length}</strong>
                </div>
              </div>

              <div onClick={() => setActiveSection('appointments')} style={overviewCardStyle(theme)}>
                <span style={{ fontSize: '28px' }}>📅</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{t('pendingAppointments')}</h4>
                  <strong style={{ fontSize: '24px', color: '#d97706' }}>{pendingAppointmentsCount}</strong>
                </div>
              </div>

              <div onClick={() => setActiveSection('complaints')} style={overviewCardStyle(theme)}>
                <span style={{ fontSize: '28px' }}>📝</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{t('pendingComplaints')}</h4>
                  <strong style={{ fontSize: '24px', color: '#dc2626' }}>{pendingComplaintsCount}</strong>
                </div>
              </div>

              <div onClick={() => setActiveSection('notices')} style={overviewCardStyle(theme)}>
                <span style={{ fontSize: '28px' }}>📢</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{t('publishedNotices')}</h4>
                  <strong style={{ fontSize: '24px', color: '#2563eb' }}>{publishedNoticesCount}</strong>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* Daily Status */}
        {(activeSection === 'status' || activeSection === 'overview') && (
          <section style={{ ...panelStyle(theme), marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700' }}>{t('updateDailyStatus')}</h3>
            <form onSubmit={handleUpdateStatus} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <label style={labelStyle}>{t('currentStatus')}</label>
                <select 
                  value={statusState.status} 
                  onChange={(e) => setStatusState({ ...statusState, status: e.target.value })} 
                  style={inputStyle(theme)}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div style={{ flex: '2', minWidth: '300px' }}>
                <label style={labelStyle}>{t('statusNote')}</label>
                <input 
                  type="text" 
                  value={statusState.statusMessage} 
                  onChange={(e) => setStatusState({ ...statusState, statusMessage: e.target.value })} 
                  style={inputStyle(theme)} 
                />
              </div>

              <button type="submit" style={btnPrimary}>{t('updateStatusBtn')}</button>
            </form>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
              {t('lastUpdated')}: {statusState.updatedAt}
            </div>
          </section>
        )}

        {/* Appointments Section */}
        {(activeSection === 'appointments' || activeSection === 'overview') && (
          <section style={{ ...panelStyle(theme), marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{t('publicAppointments')}</h3>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder={t('searchApptPlaceholder')} 
                  value={apptSearch} 
                  onChange={(e) => setApptSearch(e.target.value)} 
                  style={{ ...inputStyle(theme), width: '220px' }} 
                />
                <select value={apptFilter} onChange={(e) => setApptFilter(e.target.value)} style={inputStyle(theme)}>
                  <option value="All">{t('allStatuses')}</option>
                  <option value="Pending">{t('pending')}</option>
                  <option value="Accepted">{t('accepted')}</option>
                  <option value="Declined">{t('declined')}</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('villager')}</th>
                    <th style={tdThStyle}>{t('dateTime')}</th>
                    <th style={tdThStyle}>{t('purpose')}</th>
                    <th style={tdThStyle}>{t('status')}</th>
                    <th style={tdThStyle}>{t('officerNote')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>-</td></tr>
                  ) : (
                    filteredAppointments.map(a => (
                      <tr key={a._id || a.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{a.villagerName || 'Resident'}</strong></td>
                        <td style={tdThStyle}>{a.date} | {a.time}</td>
                        <td style={tdThStyle}>{a.purpose}</td>
                        <td style={tdThStyle}>
                          <span style={badgeStatus(a.status)}>{t(a.status.toLowerCase()) || a.status}</span>
                        </td>
                        <td style={tdThStyle}>{a.officerNote || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center', display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          {a.status === 'Pending' && (
                            <>
                              <button onClick={() => handleAppointmentAction(a._id || a.id, 'Accepted')} style={btnActionGreen}>{t('accept')}</button>
                              <button onClick={() => handleAppointmentAction(a._id || a.id, 'Declined')} style={btnActionRed}>{t('decline')}</button>
                            </>
                          )}
                          <button onClick={() => setNoteModal({ open: true, apptId: a._id || a.id, note: a.officerNote || '' })} style={btnActionOutline}>{t('note')}</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Villagers CRUD Section */}
        {(activeSection === 'villagers' || activeSection === 'overview') && (
          <section style={{ ...panelStyle(theme), marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{t('villagersDirectory')}</h3>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder={t('searchVillagerPlaceholder')} 
                  value={villagerSearch} 
                  onChange={(e) => setVillagerSearch(e.target.value)} 
                  style={{ ...inputStyle(theme), width: '250px' }} 
                />
                <button onClick={() => setVillagerModal({ open: true, mode: 'create', data: null })} style={btnPrimary}>{t('addVillager')}</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('fullName')}</th>
                    <th style={tdThStyle}>{t('nic')}</th>
                    <th style={tdThStyle}>{t('houseNumber')}</th>
                    <th style={tdThStyle}>{t('phone')}</th>
                    <th style={tdThStyle}>{t('familyDetails')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVillagers.length === 0 ? (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>-</td></tr>
                  ) : (
                    filteredVillagers.map(v => (
                      <tr key={v._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{v.fullName}</strong></td>
                        <td style={tdThStyle}>{v.nic || '-'}</td>
                        <td style={tdThStyle}>{v.houseNumber || '-'}</td>
                        <td style={tdThStyle}>{v.phone || '-'}</td>
                        <td style={tdThStyle}>{v.familyDetails || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center', display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button onClick={() => setVillagerModal({ open: true, mode: 'edit', data: v })} style={btnActionOutline}>{t('edit')}</button>
                          <button onClick={() => setDeleteConfirm({ open: true, type: 'villager', id: v._id, name: v.fullName })} style={btnActionRed}>{t('delete')}</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Complaints Section */}
        {(activeSection === 'complaints' || activeSection === 'overview') && (
          <section style={{ ...panelStyle(theme), marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{t('checkComplaints')}</h3>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder={t('searchComplaintsPlaceholder')} 
                  value={complaintSearch} 
                  onChange={(e) => setComplaintSearch(e.target.value)} 
                  style={{ ...inputStyle(theme), width: '200px' }} 
                />
                <select value={complaintFilter} onChange={(e) => setComplaintFilter(e.target.value)} style={inputStyle(theme)}>
                  <option value="All">{t('allStatuses')}</option>
                  <option value="Pending">{t('pending')}</option>
                  <option value="In Progress">{t('inProgress')}</option>
                  <option value="Resolved">{t('resolved')}</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('subject')}</th>
                    <th style={tdThStyle}>{t('category')}</th>
                    <th style={tdThStyle}>{t('status')}</th>
                    <th style={tdThStyle}>{t('description')}</th>
                    <th style={tdThStyle}>{t('officerReply')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length === 0 ? (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>-</td></tr>
                  ) : (
                    filteredComplaints.map(c => (
                      <tr key={c._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{c.subject || 'Complaint'}</strong></td>
                        <td style={tdThStyle}>{c.category}</td>
                        <td style={tdThStyle}><span style={badgeStatus(c.status)}>{t(c.status.toLowerCase().replace(' ', '')) || c.status}</span></td>
                        <td style={tdThStyle}>{c.description}</td>
                        <td style={tdThStyle}>{c.reply || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center' }}>
                          <button 
                            onClick={() => setReplyModal({ open: true, complaint: c, reply: c.reply || '', status: c.status || 'Pending' })}
                            style={btnActionOutline}
                          >
                            {t('replyStatus')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Notices Section */}
        {(activeSection === 'notices' || activeSection === 'overview') && (
          <section style={{ ...panelStyle(theme), marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{t('noticesTitle')}</h3>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder={t('searchNoticesPlaceholder')} 
                  value={noticeSearch} 
                  onChange={(e) => setNoticeSearch(e.target.value)} 
                  style={{ ...inputStyle(theme), width: '200px' }} 
                />
                <button onClick={() => setNoticeModal({ open: true, mode: 'create', data: null })} style={btnPrimary}>{t('createNotice')}</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('noticeTitle')}</th>
                    <th style={tdThStyle}>{t('category')}</th>
                    <th style={tdThStyle}>{t('status')}</th>
                    <th style={tdThStyle}>{t('expiryDate')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotices.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>-</td></tr>
                  ) : (
                    filteredNotices.map(n => (
                      <tr key={n._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{n.title}</strong></td>
                        <td style={tdThStyle}>{n.category || 'General'}</td>
                        <td style={tdThStyle}><span style={badgeStatus(n.status || 'Published')}>{t((n.status || 'published').toLowerCase()) || n.status}</span></td>
                        <td style={tdThStyle}>{n.expiryDate || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center', display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button onClick={() => setNoticeModal({ open: true, mode: 'edit', data: n })} style={btnActionOutline}>{t('edit')}</button>
                          <button onClick={() => setDeleteConfirm({ open: true, type: 'notice', id: n._id, name: n.title })} style={btnActionRed}>{t('delete')}</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      {/* Modals with Translations */}
      {villagerModal.open && (
        <div style={modalBackdrop}>
          <div style={modalBody(theme)}>
            <h3 style={{ margin: '0 0 16px 0' }}>{villagerModal.mode === 'edit' ? t('edit') : t('addVillager')}</h3>
            <form onSubmit={handleSaveVillager}>
              <label style={labelStyle}>{t('fullName')}</label>
              <input type="text" name="fullName" defaultValue={villagerModal.data?.fullName || ''} required style={inputStyle(theme)} />

              <label style={labelStyle}>{t('nic')}</label>
              <input type="text" name="nic" defaultValue={villagerModal.data?.nic || ''} required style={inputStyle(theme)} />

              <label style={labelStyle}>{t('houseNumber')}</label>
              <input type="text" name="houseNumber" defaultValue={villagerModal.data?.houseNumber || ''} required style={inputStyle(theme)} />

              <label style={labelStyle}>{t('phone')}</label>
              <input type="text" name="phone" defaultValue={villagerModal.data?.phone || ''} style={inputStyle(theme)} />

              <label style={labelStyle}>{t('address')}</label>
              <input type="text" name="address" defaultValue={villagerModal.data?.address || ''} style={inputStyle(theme)} />

              <label style={labelStyle}>{t('familyDetails')}</label>
              <textarea name="familyDetails" defaultValue={villagerModal.data?.familyDetails || ''} rows="3" style={inputStyle(theme)} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button type="button" onClick={() => setVillagerModal({ open: false, mode: 'create', data: null })} style={btnActionOutline}>{t('cancel')}</button>
                <button type="submit" style={btnPrimary}>{t('saveVillager')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {noteModal.open && (
        <div style={modalBackdrop}>
          <div style={modalBody(theme)}>
            <h3 style={{ margin: '0 0 16px 0' }}>{t('officerNote')}</h3>
            <textarea 
              rows="4" 
              value={noteModal.note} 
              onChange={(e) => setNoteModal({ ...noteModal, note: e.target.value })} 
              style={inputStyle(theme)} 
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setNoteModal({ open: false, apptId: null, note: '' })} style={btnActionOutline}>{t('cancel')}</button>
              <button onClick={handleSaveNote} style={btnPrimary}>{t('saveNote')}</button>
            </div>
          </div>
        </div>
      )}

      {replyModal.open && (
        <div style={modalBackdrop}>
          <div style={modalBody(theme)}>
            <h3 style={{ margin: '0 0 16px 0' }}>{t('replyStatus')}</h3>
            <label style={labelStyle}>{t('status')}</label>
            <select value={replyModal.status} onChange={(e) => setReplyModal({ ...replyModal, status: e.target.value })} style={inputStyle(theme)}>
              <option value="Pending">{t('pending')}</option>
              <option value="In Progress">{t('inProgress')}</option>
              <option value="Resolved">{t('resolved')}</option>
            </select>

            <label style={{ ...labelStyle, marginTop: '12px' }}>{t('officerReply')}</label>
            <textarea 
              rows="4" 
              value={replyModal.reply} 
              onChange={(e) => setReplyModal({ ...replyModal, reply: e.target.value })} 
              style={inputStyle(theme)} 
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setReplyModal({ open: false, complaint: null, reply: '', status: '' })} style={btnActionOutline}>{t('cancel')}</button>
              <button onClick={handleSaveComplaintReply} style={btnPrimary}>{t('saveResponse')}</button>
            </div>
          </div>
        </div>
      )}

      {noticeModal.open && (
        <div style={modalBackdrop}>
          <div style={modalBody(theme)}>
            <h3 style={{ margin: '0 0 16px 0' }}>{noticeModal.mode === 'edit' ? t('edit') : t('createNotice')}</h3>
            <form onSubmit={handleSaveNotice}>
              <label style={labelStyle}>{t('noticeTitle')}</label>
              <input type="text" name="title" defaultValue={noticeModal.data?.title || ''} required style={inputStyle(theme)} />

              <label style={labelStyle}>{t('category')}</label>
              <input type="text" name="category" defaultValue={noticeModal.data?.category || 'General'} style={inputStyle(theme)} />

              <label style={labelStyle}>{t('content')}</label>
              <textarea name="content" defaultValue={noticeModal.data?.content || ''} rows="4" required style={inputStyle(theme)} />

              <label style={labelStyle}>{t('expiryDate')}</label>
              <input type="date" name="expiryDate" defaultValue={noticeModal.data?.expiryDate || ''} style={inputStyle(theme)} />

              <label style={labelStyle}>{t('status')}</label>
              <select name="status" defaultValue={noticeModal.data?.status || 'Published'} style={inputStyle(theme)}>
                <option value="Draft">{t('draft')}</option>
                <option value="Published">{t('published')}</option>
                <option value="Expired">{t('expired')}</option>
              </select>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button type="button" onClick={() => setNoticeModal({ open: false, mode: 'create', data: null })} style={btnActionOutline}>{t('cancel')}</button>
                <button type="submit" style={btnPrimary}>{t('publish')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm.open && (
        <div style={modalBackdrop}>
          <div style={{ ...modalBody(theme), maxWidth: '420px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#dc2626' }}>{t('confirmDelete')}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {t('deleteWarning')} <strong>"{deleteConfirm.name}"</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
              <button onClick={() => setDeleteConfirm({ open: false, type: '', id: null, name: '' })} style={btnActionOutline}>{t('cancel')}</button>
              <button onClick={executeDelete} style={btnActionRed}>{t('yesDelete')}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Styles
const overviewCardStyle = (theme) => ({
  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
  padding: '20px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  border: theme === 'dark' ? '1px solid #334155' : '1px solid #f1f5f9',
});

const panelStyle = (theme) => ({
  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  border: theme === 'dark' ? '1px solid #334155' : '1px solid #f1f5f9',
});

const inputStyle = (theme) => ({
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: theme === 'dark' ? '1px solid #475569' : '1px solid #cbd5e1',
  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
  color: theme === 'dark' ? '#f8fafc' : '#1e293b',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: '8px',
});

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#64748b',
  marginBottom: '4px',
};

const btnPrimary = {
  backgroundColor: '#15803d',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '9px 16px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
};

const btnActionGreen = {
  backgroundColor: '#dcfce7',
  color: '#15803d',
  border: '1px solid #bbf7d0',
  padding: '5px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const btnActionRed = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  border: '1px solid #fecaca',
  padding: '5px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const btnActionOutline = {
  backgroundColor: 'transparent',
  color: '#64748b',
  border: '1px solid #cbd5e1',
  padding: '5px 10px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontSize: '13px',
};

const thRowStyle = (theme) => ({
  backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc',
  borderBottom: '2px solid #e2e8f0',
});

const tdThStyle = {
  padding: '12px 14px',
};

const badgeStatus = (status) => {
  let bg = '#f1f5f9';
  let col = '#475569';
  if (['Accepted', 'Resolved', 'Published', 'Available'].includes(status)) {
    bg = '#dcfce7';
    col = '#15803d';
  } else if (['Pending', 'In Progress', 'Busy'].includes(status)) {
    bg = '#fef3c7';
    col = '#b45309';
  } else if (['Declined', 'On Leave', 'Unavailable', 'Expired'].includes(status)) {
    bg = '#fee2e2';
    col = '#b91c1c';
  }
  return {
    padding: '3px 9px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    backgroundColor: bg,
    color: col,
  };
};

const modalBackdrop = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalBody = (theme) => ({
  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
  padding: '24px',
  borderRadius: '14px',
  width: '90%',
  maxWidth: '520px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
});

export default GNPortal;