import React, { useState, useEffect, useMemo } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/gn';
const BACKEND_BASE = 'http://localhost:5000';

/* =========================================================
   TRANSLATIONS
========================================================= */
const dashboardWords = {
  en: {
    portalTitle: 'GN OFFICER PORTAL',
    overview: 'Overview',
    appointments: 'Appointments',
    villagers: 'Villagers',
    complaints: 'Complaints',
    notices: 'Notices',
    logout: 'Logout',
    welcome: 'Welcome back',
    welcomeGNPortal: 'Welcome GN Portal',
    dashboardSubtitle: 'Real-time overview of village services, public requests and notifications.',
    refresh: 'Refresh Data',
    refreshing: 'Refreshing...',
    lastRefreshed: 'Last updated',
    quickActions: 'Quick Management',
    recentActivity: 'System Activity Logs',
    todaysAppointments: "Today's Schedule & Appointments",
    noActivity: 'No recent activity recorded',
    noAppointmentsToday: 'No appointments scheduled for today',
    totalVillagers: 'Registered Villagers',
    pendingAppointments: 'Pending Appointments',
    pendingComplaints: 'Pending Complaints',
    publishedNotices: 'Active Notices',
    publicAppointments: 'Public Appointments',
    searchApptPlaceholder: 'Search by Villager / Purpose...',
    allStatuses: 'All Statuses',
    pending: 'Pending',
    accepted: 'Accepted',
    declined: 'Declined',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    draft: 'Draft',
    published: 'Published',
    expired: 'Expired',
    villager: 'Villager',
    dateTime: 'Date & Time',
    purpose: 'Purpose',
    status: 'Status',
    officerNote: 'Officer Note',
    actions: 'Actions',
    accept: 'Accept',
    decline: 'Decline',
    note: 'Note',
    saveNote: 'Save Note',
    view: 'View',
    details: 'Details',
    close: 'Close',
    cancel: 'Cancel',
    villagersDirectory: 'Villagers Directory',
    villagersSubtitle: 'You can add delete and edit villagers details here',
    searchVillagerPlaceholder: 'Search by Name, NIC, House No, Occupation...',
    addVillager: '+ Add Villager',
    fullName: 'Full Name',
    nic: 'NIC Number',
    houseNumber: 'House Number',
    phone: 'Phone Number',
    address: 'Address',
    email: 'Email',
    gender: 'Gender',
    dateOfBirth: 'Date of Birth',
    occupation: 'Occupation',
    maritalStatus: 'Marital Status',
    role: 'Household Role',
    relationshipToHead: 'Relationship to Head',
    householdHeadNIC: 'Household Head NIC',
    familyDetails: 'Family Details / Remarks',
    edit: 'Edit',
    delete: 'Delete',
    saveVillager: 'Save Villager',
    checkComplaints: 'Check Public Complaints',
    searchComplaintsPlaceholder: 'Search by Ref No, Type, Location, Description...',
    subject: 'Ref No & Summary',
    category: 'Complaint Type',
    description: 'Description',
    location: 'Location',
    submittedBy: 'Submitted By',
    evidence: 'Evidence Image',
    officerReply: 'Officer Reply / Remarks',
    replyStatus: 'Update Status & Reply',
    saveResponse: 'Save Response',
    noticesTitle: 'Notices & Announcements',
    searchNoticesPlaceholder: 'Search notices...',
    createNotice: '+ Create Notice',
    noticeTitle: 'Notice Title',
    content: 'Full Content',
    time: 'Time',
    date: 'Date',
    image: 'Image URL',
    type: 'Notice Type',
    publish: 'Publish Announcement',
    confirmDelete: 'Confirm Deletion',
    deleteWarning: 'Are you sure you want to delete',
    yesDelete: 'Yes, Delete',
    noResults: 'No records found.',
    loading: 'Loading dashboard...',
    errorLoading: 'Unable to load dashboard data.',
    retry: 'Retry',
    newAppointment: 'Appointment request received',
    complaintUpdated: 'Citizen complaint updated',
    noticePublished: 'Public notice published',
    villagerAdded: 'Resident record registered',
    appointmentDetails: 'Appointment Details',
    complaintDetails: 'Complaint Details',
    villagerDetails: 'Villager Details',
    appointmentAccepted: 'Appointment accepted.',
    appointmentDeclined: 'Appointment declined.',
    noteSaved: 'Note saved successfully.',
    replySaved: 'Reply and status updated successfully.',
    villagerCreated: 'Villager created successfully.',
    villagerUpdated: 'Villager updated successfully.',
    villagerDeleted: 'Villager deleted successfully.',
    noticeCreated: 'Announcement published successfully.',
    noticeUpdated: 'Announcement updated successfully.',
    noticeDeleted: 'Announcement deleted successfully.',
    actionFailed: 'Action failed. Please try again.',
  },
  si: {
    portalTitle: 'ග්‍රාම නිලධාරී පෝර්ටලය',
    overview: 'සාරාංශය',
    appointments: 'හමුවීම්',
    villagers: 'පුරවැසියන්',
    complaints: 'පැමිණිලි',
    notices: 'නිවේදන',
    logout: 'පිටවීම',
    welcome: 'නැවත සාදරයෙන් පිළිගනිමු',
    welcomeGNPortal: 'Welcome GN Portal',
    dashboardSubtitle: 'ග්‍රාම සේවා තොරතුරු, මහජන ඉල්ලීම් සහ නිවේදන පිළිබඳ සජීවී සාරාංශය.',
    refresh: 'යාවත්කාලීන කරන්න',
    refreshing: 'යාවත්කාලීන වෙමින්...',
    lastRefreshed: 'අවසන් යාවත්කාලීන කිරීම',
    quickActions: 'ඉක්මන් ක්‍රියාමාර්ග',
    recentActivity: 'මෑත පද්ධති ක්‍රියාකාරකම්',
    todaysAppointments: 'අද දවසේ මහජන හමුවීම්',
    noActivity: 'මෑත ක්‍රියාකාරකම් වාර්තා වී නොමැත',
    noAppointmentsToday: 'අද දිනය සඳහා හමුවීම් නොමැත',
    totalVillagers: 'ලියාපදිංචි පුරවැසියන්',
    pendingAppointments: 'පොරොත්තු හමුවීම්',
    pendingComplaints: 'පොරොත්තු පැමිණිලි',
    publishedNotices: 'ක්‍රියාකාරී නිවේදන',
    publicAppointments: 'මහජන හමුවීම් ලැයිස්තුව',
    searchApptPlaceholder: 'නම හෝ අරමුණ අනුව සොයන්න...',
    allStatuses: 'සියලුම තත්ත්වයන්',
    pending: 'පොරොත්තුවේ',
    accepted: 'පිළිගත්තා',
    declined: 'ප්‍රතික්ෂේපිත',
    inProgress: 'ක්‍රියාත්මක වෙමින්',
    resolved: 'විසඳන ලදී',
    draft: 'කෙටුම්පත',
    published: 'පළකළා',
    expired: 'කල් ඉකුත් වූ',
    villager: 'පුරවැසියා',
    dateTime: 'දිනය සහ වේලාව',
    purpose: 'අරමුණ',
    status: 'තත්ත්වය',
    officerNote: 'නිලධාරී සටහන',
    actions: 'ක්‍රියාමාර්ග',
    accept: 'පිළිගන්න',
    decline: 'ප්‍රතික්ෂේප කරන්න',
    note: 'සටහන',
    saveNote: 'සටහන සුරකින්න',
    view: 'බලන්න',
    details: 'විස්තර',
    close: 'වසන්න',
    cancel: 'අවලංගු කරන්න',
    villagersDirectory: 'පුරවැසියන් (Villagers)',
    villagersSubtitle: 'You can add delete and edit villagers details here',
    searchVillagerPlaceholder: 'නම, හැඳුනුම්පත, නිවාස අංකය, රැකියාව අනුව සොයන්න...',
    addVillager: '+ පුරවැසියෙකු එක්කරන්න',
    fullName: 'සම්පූර්ණ නම',
    nic: 'හැඳුනුම්පත් අංකය',
    houseNumber: 'නිවාස අංකය',
    phone: 'දුරකථන අංකය',
    address: 'ලිපිනය',
    email: 'විද්‍යුත් තැපෑල',
    gender: 'ස්ත්‍රී / පුරුෂ භාවය',
    dateOfBirth: 'උපන් දිනය',
    occupation: 'රැකියාව',
    maritalStatus: 'විවාහක / අවිවාහක බව',
    role: 'පවුලේ තත්ත්වය (Role)',
    relationshipToHead: 'ගෘහ මූලිකයාට ඇති ඥාතීත්වය',
    householdHeadNIC: 'ගෘහ මූලිකයාගේ හැඳුනුම්පත් අංකය',
    familyDetails: 'පවුලේ විස්තර / සටහන්',
    edit: 'සංස්කරණය',
    delete: 'මකන්න',
    saveVillager: 'පුරවැසියා සුරකින්න',
    checkComplaints: 'මහජන පැමිණිලි පරීක්ෂා කිරීම',
    searchComplaintsPlaceholder: 'Ref No, වර්ගය, ස්ථානය, විස්තරය අනුව සොයන්න...',
    subject: 'යොමු අංකය සහ විස්තරය',
    category: 'පැමිණිලි වර්ගය (Type)',
    description: 'විස්තරය',
    location: 'ස්ථානය',
    submittedBy: 'ඉදිරිපත් කළේ',
    evidence: 'සාක්ෂි ඡායාරූපය',
    officerReply: 'නිලධාරී පිළිතුර / සටහන',
    replyStatus: 'තත්ත්වය සහ පිළිතුර යාවත්කාලීන කරන්න',
    saveResponse: 'පිළිතුර සුරකින්න',
    noticesTitle: 'දැන්වීම් සහ නිවේදන',
    searchNoticesPlaceholder: 'නිවේදන සොයන්න...',
    createNotice: '+ නිවේදනයක් පළකරන්න',
    noticeTitle: 'නිවේදන මාතෘකාව',
    content: 'සම්පූර්ණ අන්තර්ගතය',
    time: 'වේලාව',
    date: 'දිනය',
    image: 'ඡායාරූප සබැඳිය (Image URL)',
    type: 'වර්ගය (Type)',
    publish: 'පළකරන්න',
    confirmDelete: 'මැකීම තහවුරු කරන්න',
    deleteWarning: 'ඔබට මෙය මකා දැමීමට අවශ්‍ය බව සහතිකද',
    yesDelete: 'ඔව්, මකන්න',
    noResults: 'වාර්තා හමු නොවීය.',
    loading: 'Dashboard එක load වෙමින්...',
    errorLoading: 'Dashboard දත්ත load කිරීමට නොහැකි විය.',
    retry: 'නැවත උත්සාහ කරන්න',
    newAppointment: 'නව හමුවීමක් ලැබී ඇත',
    complaintUpdated: 'පැමිණිල්ලක් යාවත්කාලීන කර ඇත',
    noticePublished: 'නිවේදනයක් පළකර ඇත',
    villagerAdded: 'පුරවැසි වාර්තාවක් එක්කර ඇත',
    appointmentDetails: 'හමුවීම් විස්තර',
    complaintDetails: 'පැමිණිලි විස්තර',
    villagerDetails: 'පුරවැසි විස්තර',
    appointmentAccepted: 'හමුවීම පිළිගන්නා ලදී.',
    appointmentDeclined: 'හමුවීම ප්‍රතික්ෂේප කරන ලදී.',
    noteSaved: 'සටහන සාර්ථකව සුරකින ලදී.',
    replySaved: 'පිළිතුර සහ තත්ත්වය සාර්ථකව සුරකින ලදී.',
    villagerCreated: 'පුරවැසියා සාර්ථකව එක්කරන ලදී.',
    villagerUpdated: 'පුරවැසි තොරතුරු යාවත්කාලීන කරන ලදී.',
    villagerDeleted: 'පුරවැසි වාර්තාව මකා දමන ලදී.',
    noticeCreated: 'නිවේදනය සාර්ථකව පළකරන ලදී.',
    noticeUpdated: 'නිවේදනය යාවත්කාලීන කරන ලදී.',
    noticeDeleted: 'නිවේදනය මකා දමන ලදී.',
    actionFailed: 'ක්‍රියාමාර්ගය අසාර්ථක විය. නැවත උත්සාහ කරන්න.',
  },
  ta: {
    portalTitle: 'கிராம நிலதாரி போர்டல்',
    overview: 'கண்ணோட்டம்',
    appointments: 'சந்திப்புகள்',
    villagers: 'கிராம மக்கள்',
    complaints: 'முறைப்பாடுகள்',
    notices: 'அறிவிப்புகள்',
    logout: 'வெளியேறு',
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    welcomeGNPortal: 'Welcome GN Portal',
    dashboardSubtitle: 'கிராம சேவைகள் மற்றும் அறிவிப்புகளின் நேரடி கண்ணோட்டம்.',
    refresh: 'புதுப்பிக்கவும்',
    refreshing: 'புதுப்பிக்கப்படுகிறது...',
    lastRefreshed: 'கடைசியாக புதுப்பிக்கப்பட்டது',
    quickActions: 'விரைவு நடவடிக்கைகள்',
    recentActivity: 'சமீபத்திய செயல்பாடுகள்',
    todaysAppointments: 'இன்றைய சந்திப்புகள்',
    noActivity: 'சமீபத்திய செயல்பாடுகள் இல்லை',
    noAppointmentsToday: 'இன்று சந்திப்புகள் இல்லை',
    totalVillagers: 'பதிவுசெய்த மக்கள்',
    pendingAppointments: 'நிலுவையிலுள்ள சந்திப்புகள்',
    pendingComplaints: 'நிலுவையிலுள்ள முறைப்பாடுகள்',
    publishedNotices: 'செயலில் உள்ள அறிவிப்புகள்',
    publicAppointments: 'பொது சந்திப்புகள்',
    searchApptPlaceholder: 'பெயர் அல்லது நோக்கம் மூலம் தேடவும்...',
    allStatuses: 'அனைத்து நிலைகளும்',
    pending: 'நிலுவையில்',
    accepted: 'ஏற்றுக்கொள்ளப்பட்டது',
    declined: 'நிராகரிக்கப்பட்டது',
    inProgress: 'செயல்பாட்டில்',
    resolved: 'தீர்க்கப்பட்டது',
    draft: 'வரைவு',
    published: 'வெளியிடப்பட்டது',
    expired: 'காலாவதியானது',
    villager: 'கிராமவாசி',
    dateTime: 'திகதி & நேரம்',
    purpose: 'நோக்கம்',
    status: 'நிலை',
    officerNote: 'அதிகாரி குறிப்பு',
    actions: 'நடவடிக்கைகள்',
    accept: 'ஏற்கவும்',
    decline: 'நிராகரிக்கவும்',
    note: 'குறிப்பு',
    saveNote: 'குறிப்பைச் சேமிக்கவும்',
    view: 'பார்க்க',
    details: 'விபரங்கள்',
    close: 'மூடு',
    cancel: 'ரத்து செய்',
    villagersDirectory: 'கிராம மக்கள் விபரம்',
    villagersSubtitle: 'You can add delete and edit villagers details here',
    searchVillagerPlaceholder: 'பெயர், அட்டை எண், வீட்டு எண் மூலம் தேடவும்...',
    addVillager: '+ கிராமவாசியைச் சேர்க்கவும்',
    fullName: 'முழுப் பெயர்',
    nic: 'அடையாள அட்டை எண்',
    houseNumber: 'வீட்டு இலக்கம்',
    phone: 'தொலைபேசி எண்',
    address: 'முகவரி',
    email: 'மின்னஞ்சல்',
    gender: 'பாலினம்',
    dateOfBirth: 'பிறந்த திகதி',
    occupation: 'தொழில்',
    maritalStatus: 'திருமண நிலை',
    role: 'குடும்ப நிலை',
    relationshipToHead: 'குடும்பத் தலைவருடனான உறவு',
    householdHeadNIC: 'தலைவரின் அடையாள அட்டை எண்',
    familyDetails: 'குடும்ப விபரங்கள்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    saveVillager: 'சேமிக்கவும்',
    checkComplaints: 'முறைப்பாடுகளைப் பார்க்கவும்',
    searchComplaintsPlaceholder: 'முறைப்பாடுகளைத் தேடவும்...',
    subject: 'குறிப்பு எண் & விபரம்',
    category: 'வகை',
    description: 'விபரம்',
    location: 'இடம்',
    submittedBy: 'அனுப்பியவர்',
    evidence: 'சான்று படம்',
    officerReply: 'அதிகாரி பதில்',
    replyStatus: 'பதில் / நிலை',
    saveResponse: 'பதிலைச் சேமிக்கவும்',
    noticesTitle: 'அறிவிப்புகள்',
    searchNoticesPlaceholder: 'அறிவிப்புகளைத் தேடவும்...',
    createNotice: '+ புதிய அறிவிப்பு',
    noticeTitle: 'தலைப்பு',
    content: 'உள்ளடக்கம்',
    time: 'நேரம்',
    date: 'திகதி',
    image: 'படம்',
    type: 'வகை',
    publish: 'வெளியிடு',
    confirmDelete: 'நீக்குவதை உறுதிப்படுத்தவும்',
    deleteWarning: 'நிச்சயமாக நீக்க விரும்புகிறீர்களா',
    yesDelete: 'ஆம், நீக்கு',
    noResults: 'முடிவுகள் இல்லை.',
    loading: 'Dashboard ஏற்றப்படுகிறது...',
    errorLoading: 'Dashboard தரவை ஏற்ற முடியவில்லை.',
    retry: 'மீண்டும் முயற்சிக்கவும்',
    newAppointment: 'புதிய சந்திப்பு கிடைத்துள்ளது',
    complaintUpdated: 'முறைப்பாடு புதுப்பிக்கப்பட்டது',
    noticePublished: 'அறிவிப்பு வெளியிடப்பட்டது',
    villagerAdded: 'கிராமவாசி சேர்க்கப்பட்டார்',
    appointmentDetails: 'சந்திப்பு விபரங்கள்',
    complaintDetails: 'முறைப்பாடு விபரங்கள்',
    villagerDetails: 'கிராமவாசி விபரங்கள்',
    appointmentAccepted: 'சந்திப்பு ஏற்றுக்கொள்ளப்பட்டது.',
    appointmentDeclined: 'சந்திப்பு நிராகரிக்கப்பட்டது.',
    noteSaved: 'குறிப்பு வெற்றிகரமாக சேமிக்கப்பட்டது.',
    replySaved: 'பதில் வெற்றிகரமாக சேமிக்கப்பட்டது.',
    villagerCreated: 'கிராமவாசி வெற்றிகரமாக சேர்க்கப்பட்டார்.',
    villagerUpdated: 'கிராமவாசி தகவல் புதுப்பிக்கப்பட்டது.',
    villagerDeleted: 'கிராமவாசி பதிவு நீக்கப்பட்டது.',
    noticeCreated: 'அறிவிப்பு வெற்றிகரமாக வெளியிடப்பட்டது.',
    noticeUpdated: 'அறிவிப்பு புதுப்பிக்கப்பட்டது.',
    noticeDeleted: 'அறிவிப்பு நீக்கப்பட்டது.',
    actionFailed: 'நடவடிக்கை தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.',
  },
};

const DEFAULT_NOTICE_IMAGE =
  'https://images.unsplash.com/photo-1517649763962-0c6232662000?q=80&w=800&auto=format&fit=crop';
const SHARED_BACKGROUND_IMAGE =
  'https://i.pinimg.com/1200x/b2/f5/f0/b2f5f062fc4b8b7d906de82e4561052a.jpg';

/* HERO IMAGES */
const OVERVIEW_HERO_IMAGE =
  'https://i.pinimg.com/736x/9b/e1/d1/9be1d12e919f752b296e762b29c38682.jpg';
const VILLAGERS_BANNER_IMAGE =
  'https://i.pinimg.com/736x/c1/82/72/c1827210ed65610e842e81d2dd3f2219.jpg';
const APPOINTMENT_BANNER_IMAGE =
  'https://i.pinimg.com/736x/7c/ce/f9/7ccef9e83228d8543c24a2928aabb91f.jpg';
const COMPLAINT_BANNER_IMAGE =
  'https://i.pinimg.com/736x/2c/7e/98/2c7e985293f8cfad07bff994fb338aa1.jpg';
const ANNOUNCEMENT_BANNER_IMAGE =
  'https://i.pinimg.com/736x/37/aa/94/37aa94933c30a958424e288ece89cb45.jpg';

/* =========================================================
   MAIN COMPONENT
========================================================= */
const GNPortal = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [theme, setTheme] = useState(localStorage.getItem('gramalk_theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('gramalk_lang') || 'si');
  const [officerName, setOfficerName] = useState('Kanchana Perera');

  const t = (key) => dashboardWords[lang]?.[key] || dashboardWords.en[key] || key;

  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [apptFilter, setApptFilter] = useState('All');
  const [apptSearch, setApptSearch] = useState('');
  const [apptDetails, setApptDetails] = useState(null);
  const [noteModal, setNoteModal] = useState({ open: false, apptId: null, note: '' });
  const [appointmentActionLoading, setAppointmentActionLoading] = useState(null);

  const [villagers, setVillagers] = useState([]);
  const [villagerSearch, setVillagerSearch] = useState('');
  const [villagerModal, setVillagerModal] = useState({ open: false, mode: 'create', data: null });
  const [villagerDetails, setVillagerDetails] = useState(null);

  const [complaints, setComplaints] = useState([]);
  const [complaintFilter, setComplaintFilter] = useState('All');
  const [complaintSearch, setComplaintSearch] = useState('');
  const [replyModal, setReplyModal] = useState({ open: false, complaint: null, reply: '', status: '' });
  const [complaintDetails, setComplaintDetails] = useState(null);

  const [notices, setNotices] = useState([]);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeFilter, setNoticeFilter] = useState('All');
  const [noticeModal, setNoticeModal] = useState({ open: false, mode: 'create', data: null });

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: null, name: '' });

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('gramalk_lang', newLang);
    document.documentElement.lang = newLang;
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('gramalk_theme', next);
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  const apiRequest = async (url, options = {}) => {
    const token = localStorage.getItem('gramalk_token');
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return null;
  };

  const fetchDashboardData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const results = await Promise.allSettled([
        apiRequest(`${API}/appointments`),
        apiRequest(`${API}/villagers`),
        apiRequest(`${API}/complaints`),
        apiRequest(`${API}/announcements`),
      ]);

      const [apptResult, villagersResult, compResult, noticeResult] = results;

      if (apptResult.status === 'fulfilled') {
        setAppointments(Array.isArray(apptResult.value) ? apptResult.value : []);
      }

      if (villagersResult.status === 'fulfilled') {
        setVillagers(Array.isArray(villagersResult.value) ? villagersResult.value : []);
      }

      if (compResult.status === 'fulfilled') {
        setComplaints(Array.isArray(compResult.value) ? compResult.value : []);
      }

      if (noticeResult.status === 'fulfilled') {
        const data = noticeResult.value;
        const noticeList = Array.isArray(data)
          ? data
          : data?.announcements || data?.data || [];
        setNotices(noticeList);
      }

      if (isRefresh) {
        showAlert(
          lang === 'si'
            ? 'දත්ත යාවත්කාලීන කරන ලදී.'
            : lang === 'ta'
            ? 'தரவு புதுப்பிக்கப்பட்டது.'
            : 'Dashboard refreshed successfully.'
        );
      }
    } catch (error) {
      console.error(error);
      showAlert(t('errorLoading'), 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('gramalk_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.fullName) {
          setOfficerName(parsed.fullName);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      setVillagerModal({ open: false, mode: 'create', data: null });
      setNoteModal({ open: false, apptId: null, note: '' });
      setReplyModal({ open: false, complaint: null, reply: '', status: '' });
      setNoticeModal({ open: false, mode: 'create', data: null });
      setDeleteConfirm({ open: false, type: '', id: null, name: '' });
      setApptDetails(null);
      setVillagerDetails(null);
      setComplaintDetails(null);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleAppointmentAction = async (id, newStatus) => {
    setAppointmentActionLoading(id);
    try {
      await apiRequest(`${API}/appointments/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });

      setAppointments((prev) =>
        prev.map((a) => (a._id === id || a.id === id ? { ...a, status: newStatus } : a))
      );

      showAlert(
        newStatus === 'Accepted' ? t('appointmentAccepted') : t('appointmentDeclined')
      );
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    } finally {
      setAppointmentActionLoading(null);
    }
  };

  const handleSaveNote = async () => {
    const { apptId, note } = noteModal;
    try {
      await apiRequest(`${API}/appointments/${apptId}/note`, {
        method: 'PATCH',
        body: JSON.stringify({ officerNote: note }),
      });

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === apptId || a.id === apptId ? { ...a, officerNote: note } : a
        )
      );

      setNoteModal({ open: false, apptId: null, note: '' });
      showAlert(t('noteSaved'));
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    }
  };

  const handleSaveVillager = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    const isEdit = villagerModal.mode === 'edit';
    const targetId = villagerModal.data?._id || villagerModal.data?.id;
    const url = isEdit ? `${API}/villagers/${targetId}` : `${API}/villagers`;

    try {
      const saved = await apiRequest(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      if (isEdit) {
        setVillagers((prev) =>
          prev.map((v) => ((v._id || v.id) === targetId ? saved : v))
        );
        showAlert(t('villagerUpdated'));
      } else {
        setVillagers((prev) => [saved, ...prev]);
        showAlert(t('villagerCreated'));
      }

      setVillagerModal({ open: false, mode: 'create', data: null });
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    }
  };

  const executeDelete = async () => {
    const { type, id } = deleteConfirm;
    try {
      if (type === 'villager') {
        await apiRequest(`${API}/villagers/${id}`, { method: 'DELETE' });
        setVillagers((prev) => prev.filter((v) => (v._id || v.id) !== id));
        showAlert(t('villagerDeleted'));
      }

      if (type === 'notice') {
        await apiRequest(`${API}/announcements/${id}`, { method: 'DELETE' });
        setNotices((prev) => prev.filter((n) => (n._id || n.id) !== id));
        showAlert(t('noticeDeleted'));
      }
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    } finally {
      setDeleteConfirm({ open: false, type: '', id: null, name: '' });
    }
  };

  const handleSaveComplaintReply = async (e) => {
    e.preventDefault();
    const { complaint, reply, status } = replyModal;
    const compId = complaint._id || complaint.id;

    try {
      await apiRequest(`${API}/complaints/${compId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ officerNote: reply, status }),
      });

      setComplaints((prev) =>
        prev.map((c) =>
          (c._id || c.id) === compId
            ? { ...c, officerNote: reply, reply, status }
            : c
        )
      );

      setReplyModal({ open: false, complaint: null, reply: '', status: '' });
      showAlert(t('replySaved'));
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    }
  };

  const handleSaveNotice = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.description && payload.content) {
      payload.description = payload.content;
    }
    if (!payload.image) {
      payload.image = DEFAULT_NOTICE_IMAGE;
    }

    const isEdit = noticeModal.mode === 'edit';
    const noticeId = noticeModal.data?._id || noticeModal.data?.id;
    const url = isEdit ? `${API}/announcements/${noticeId}` : `${API}/announcements`;

    try {
      const saved = await apiRequest(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      if (isEdit) {
        setNotices((prev) =>
          prev.map((n) => ((n._id || n.id) === noticeId ? saved : n))
        );
        showAlert(t('noticeUpdated'));
      } else {
        setNotices((prev) => [saved, ...prev]);
        showAlert(t('noticeCreated'));
      }

      setNoticeModal({ open: false, mode: 'create', data: null });
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    }
  };

  const filteredAppointments = useMemo(() => {
    const search = apptSearch.toLowerCase();
    return appointments.filter((a) => {
      const matchFilter = apptFilter === 'All' || a.status === apptFilter;
      const matchSearch =
        (a.villagerName || a.name || '').toLowerCase().includes(search) ||
        (a.purpose || '').toLowerCase().includes(search);
      return matchFilter && matchSearch;
    });
  }, [appointments, apptFilter, apptSearch]);

  const filteredVillagers = useMemo(() => {
    const search = villagerSearch.toLowerCase();
    return villagers.filter((v) => {
      return (
        (v.fullName || v.name || '').toLowerCase().includes(search) ||
        (v.nic || '').toLowerCase().includes(search) ||
        (v.houseNumber || '').toLowerCase().includes(search) ||
        (v.phone || v.contact || '').toLowerCase().includes(search) ||
        (v.occupation || '').toLowerCase().includes(search)
      );
    });
  }, [villagers, villagerSearch]);

  const filteredComplaints = useMemo(() => {
    const search = complaintSearch.toLowerCase();
    return complaints.filter((c) => {
      const matchFilter = complaintFilter === 'All' || c.status === complaintFilter;
      const matchSearch =
        (c.referenceNo || '').toLowerCase().includes(search) ||
        (c.type || '').toLowerCase().includes(search) ||
        (c.location || '').toLowerCase().includes(search) ||
        (c.description || '').toLowerCase().includes(search) ||
        (c.submittedBy || '').toLowerCase().includes(search);
      return matchFilter && matchSearch;
    });
  }, [complaints, complaintFilter, complaintSearch]);

  const filteredNotices = useMemo(() => {
    const search = noticeSearch.toLowerCase();
    return notices.filter((n) => {
      const matchFilter =
        noticeFilter === 'All' ||
        (n.type || 'Announcements') === noticeFilter ||
        (n.category || '') === noticeFilter;
      const matchSearch =
        (n.title || '').toLowerCase().includes(search) ||
        (n.category || '').toLowerCase().includes(search) ||
        (n.location || '').toLowerCase().includes(search);
      return matchFilter && matchSearch;
    });
  }, [notices, noticeSearch, noticeFilter]);

  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'Pending').length;
  const pendingComplaintsCount = complaints.filter((c) => c.status === 'Pending').length;
  const publishedNoticesCount = notices.length;

  const todayString = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter((a) => (a.date || '').startsWith(todayString));

  const recentActivity = useMemo(() => {
    const activities = [];
    appointments.slice(0, 3).forEach((a) => {
      activities.push({
        icon: '📅',
        text: `${t('newAppointment')}: ${a.villagerName || a.name || 'Resident'}`,
      });
    });
    complaints.slice(0, 2).forEach((c) => {
      activities.push({
        icon: '📝',
        text: `${t('complaintUpdated')}: ${c.referenceNo || c.description || 'Complaint'}`,
      });
    });
    notices.slice(0, 2).forEach((n) => {
      activities.push({
        icon: '📢',
        text: `${t('noticePublished')}: ${n.title || 'Notice'}`,
      });
    });
    villagers.slice(0, 2).forEach((v) => {
      activities.push({
        icon: '👤',
        text: `${t('villagerAdded')}: ${v.fullName || v.name || 'Villager'}`,
      });
    });
    return activities.slice(0, 6);
  }, [appointments, complaints, notices, villagers, lang]);

  const goTo = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFullImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${BACKEND_BASE}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme === 'dark' ? '#0f172a' : '#ffffff',
          color: theme === 'dark' ? '#f8fafc' : '#1e293b',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              border: '4px solid #dcfce7',
              borderTop: '4px solid #15803d',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <strong>{t('loading')}</strong>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#0b1120' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {alert.show && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '13px 20px',
            borderRadius: '12px',
            backgroundColor: alert.type === 'error' ? '#dc2626' : '#15803d',
            color: '#fff',
            boxShadow: '0 8px 25px rgba(0,0,0,0.18)',
            fontWeight: '600',
            fontSize: '13px',
            maxWidth: '350px',
          }}
        >
          {alert.type === 'error' ? '⚠️ ' : '✓ '}
          {alert.message}
        </div>
      )}

      {/* HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          borderBottom: theme === 'dark' ? '1px solid #1f2937' : '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
              <img src="/images/logo.png" alt="GramaLK Logo" style={{ height: '40px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div>
                <strong style={{ fontSize: '18px', color: '#16a34a', display: 'block', lineHeight: '1.1' }}>
                  GramaLK
                </strong>
                <small style={{ color: '#64748b', fontSize: '10px' }}>
                  {t('portalTitle')}
                </small>
              </div>
            </a>

            <nav style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { id: 'overview', label: t('overview') },
                { id: 'appointments', label: `${t('appointments')} (${pendingAppointmentsCount})` },
                { id: 'villagers', label: t('villagers') },
                { id: 'complaints', label: `${t('complaints')} (${pendingComplaintsCount})` },
                { id: 'notices', label: t('notices') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => goTo(tab.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: activeSection === tab.id ? '#15803d' : 'transparent',
                    color: activeSection === tab.id ? '#fff' : theme === 'dark' ? '#cbd5e1' : '#475569',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <select
                value={lang}
                onChange={(e) => handleLangChange(e.target.value)}
                style={inputSmall(theme)}
              >
                <option value="en">English</option>
                <option value="si">සිංහල</option>
                <option value="ta">தமிழ்</option>
              </select>

              <button onClick={toggleTheme} style={iconButton()} title="Toggle theme">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '10px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>
                  👤 {officerName}
                </span>
                <a href="/" style={{ color: '#ef4444', textDecoration: 'none', fontSize: '12px' }}>
                  {t('logout')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px 60px' }}>
        {/* =========================================================
           OVERVIEW SECTION WITH NO-BORDER CARDS
        ========================================================= */}
        {activeSection === 'overview' && (
          <section style={sharedTabContainerStyle(theme)}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(260px, 340px)',
                gap: '24px',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '38px 40px',
                borderRadius: '24px',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(16px)',
                border: 'none',
                boxShadow: '0 12px 35px -6px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Subtle Emerald Ambient Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(circle, rgba(22, 163, 74, 0.09) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Left Column */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: theme === 'dark' ? '#064e3b' : '#dcfce7',
                      color: theme === 'dark' ? '#6ee7b7' : '#15803d',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.4px',
                    }}
                  >
                    🌿 {t('portalTitle')}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
                      fontSize: '11px',
                      color: '#64748b',
                      fontWeight: '500',
                    }}
                  >
                    🗓️ {new Date().toLocaleDateString(lang === 'si' ? 'si-LK' : 'en-GB', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
                      fontSize: '11px',
                      color: '#64748b',
                      fontWeight: '500',
                    }}
                  >
                    📍 GN Division
                  </span>
                </div>

                <h1
                  style={{
                    margin: '0 0 10px',
                    fontSize: '36px',
                    fontWeight: '800',
                    letterSpacing: '-0.5px',
                    color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                    lineHeight: '1.2',
                  }}
                >
                  {t('welcomeGNPortal')}
                </h1>

                <p
                  style={{
                    margin: '0 0 20px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: theme === 'dark' ? '#cbd5e1' : '#64748b',
                    maxWidth: '560px',
                  }}
                >
                  {t('dashboardSubtitle')}
                </p>

                {/* Quick Metric Status Cards Grid */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
                  <div style={quickMetricCard(theme, '#15803d', '#dcfce7')}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>👥 {t('totalVillagers')}</span>
                    <strong style={{ fontSize: '18px', color: '#15803d' }}>{villagers.length}</strong>
                  </div>
                  <div style={quickMetricCard(theme, '#15803d', '#f0fdf4')}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>📅 Today's Schedule</span>
                    <strong style={{ fontSize: '18px', color: '#15803d' }}>{todaysAppointments.length}</strong>
                  </div>
                  <div style={quickMetricCard(theme, '#15803d', '#f0fdf4')}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>📝 {t('pendingComplaints')}</span>
                    <strong style={{ fontSize: '18px', color: '#15803d' }}>{pendingComplaintsCount}</strong>
                  </div>
                </div>

                {/* Refresh & Direct Action Shortcuts */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    onClick={() => fetchDashboardData(true)}
                    disabled={refreshing}
                    style={{
                      ...btnPrimary,
                      padding: '10px 18px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '12px',
                    }}
                  >
                    <span>{refreshing ? '⟳' : '🔄'}</span>
                    <span>{refreshing ? t('refreshing') : t('refresh')}</span>
                  </button>

                  <button
                    onClick={() => setVillagerModal({ open: true, mode: 'create', data: null })}
                    style={{
                      ...btnActionOutline,
                      padding: '9px 15px',
                      fontSize: '12px',
                      borderRadius: '12px',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  >
                    + {t('addVillager')}
                  </button>

                  <button
                    onClick={() => setNoticeModal({ open: true, mode: 'create', data: null })}
                    style={{
                      ...btnActionOutline,
                      padding: '9px 15px',
                      fontSize: '12px',
                      borderRadius: '12px',
                      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                    }}
                  >
                    📢 {t('createNotice')}
                  </button>
                </div>
              </div>

              {/* Right Column: Character Image */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'transparent',
                }}
              >
                <img
                  src={OVERVIEW_HERO_IMAGE}
                  alt="Overview hero"
                  style={{
                    width: '100%',
                    maxWidth: '320px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '16px',
                    boxShadow: 'none',
                    border: 'none',
                    filter: 'none',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* =========================================================
               STAT CARDS 4 GRID (BORDERS REMOVED AS REQUESTED)
            ========================================================= */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              <DashboardCard
                theme={theme}
                icon="👥"
                title={t('totalVillagers')}
                value={villagers.length}
                color="#15803d"
                subtext={`+${villagers.length > 5 ? 3 : villagers.length} this month`}
                onClick={() => goTo('villagers')}
              />
              <DashboardCard
                theme={theme}
                icon="📅"
                title={t('pendingAppointments')}
                value={pendingAppointmentsCount}
                color="#15803d"
                subtext={pendingAppointmentsCount > 0 ? 'Requires Action' : 'Up to date'}
                onClick={() => goTo('appointments')}
              />
              <DashboardCard
                theme={theme}
                icon="📝"
                title={t('pendingComplaints')}
                value={pendingComplaintsCount}
                color="#15803d"
                subtext={pendingComplaintsCount > 0 ? 'Pending Review' : 'All clear'}
                onClick={() => goTo('complaints')}
              />
              <DashboardCard
                theme={theme}
                icon="📢"
                title={t('publishedNotices')}
                value={publishedNoticesCount}
                color="#15803d"
                subtext="Live on Portal"
                onClick={() => goTo('notices')}
              />
            </div>

            {/* QUICK ACTIONS & RECENT ACTIVITY */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '30px',
              }}
            >
              <section style={panelStyle(theme)}>
                <h3 style={sectionTitle}>⚡ {t('quickActions')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <QuickAction
                    theme={theme}
                    icon="👤"
                    text={t('addVillager')}
                    onClick={() => setVillagerModal({ open: true, mode: 'create', data: null })}
                  />
                  <QuickAction
                    theme={theme}
                    icon="📢"
                    text={t('createNotice')}
                    onClick={() => setNoticeModal({ open: true, mode: 'create', data: null })}
                  />
                  <QuickAction
                    theme={theme}
                    icon="📅"
                    text={t('appointments')}
                    onClick={() => goTo('appointments')}
                  />
                  <QuickAction
                    theme={theme}
                    icon="📝"
                    text={t('complaints')}
                    onClick={() => goTo('complaints')}
                  />
                </div>
              </section>

              <section style={panelStyle(theme)}>
                <h3 style={sectionTitle}>🔔 {t('recentActivity')}</h3>
                {recentActivity.length === 0 ? (
                  <EmptyState text={t('noActivity')} />
                ) : (
                  <div>
                    {recentActivity.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '11px 0',
                          borderBottom: index < recentActivity.length - 1 ? '1px solid #e2e8f0' : 'none',
                        }}
                      >
                        <span
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '15px',
                          }}
                        >
                          {item.icon}
                        </span>
                        <span style={{ fontSize: '13px', color: theme === 'dark' ? '#cbd5e1' : '#475569', fontWeight: '500' }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* TODAY'S APPOINTMENTS PREVIEW */}
            <section style={panelStyle(theme)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={sectionTitle}>📅 {t('todaysAppointments')}</h3>
                <button onClick={() => goTo('appointments')} style={btnActionOutline}>
                  {t('view')} →
                </button>
              </div>

              {todaysAppointments.length === 0 ? (
                <EmptyState text={t('noAppointmentsToday')} />
              ) : (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {todaysAppointments.slice(0, 5).map((a, index) => (
                    <div
                      key={a._id || a.id || index}
                      onClick={() => setApptDetails(a)}
                      className="hover-card"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '14px' }}>{a.villagerName || a.name || 'Resident'}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                          🕒 {a.time || '-'} • {a.purpose || '-'}
                        </div>
                      </div>
                      <span style={badgeStatus(a.status)}>
                        {translateStatus(a.status, t)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </section>
        )}

        {/* =========================================================
           APPOINTMENTS SECTION (WITH DEDICATED HERO BANNER)
        ========================================================= */}
        {activeSection === 'appointments' && (
          <section style={sharedTabContainerStyle(theme)}>
            {/* Appointments Hero Banner */}
            <SectionHeroBanner
              theme={theme}
              title={t('appointments')}
              subtitle="Schedule citizen meetings, review upcoming public consultations, and update appointment records."
              badgeText="📅 Public Calendar & Schedule"
              imageSrc={APPOINTMENT_BANNER_IMAGE}
              stats={[
                { label: 'Total Appts', value: appointments.length },
                { label: 'Pending', value: pendingAppointmentsCount },
                { label: "Today's", value: todaysAppointments.length },
              ]}
            />

            <DataSection title={t('publicAppointments')} theme={theme}>
              <Toolbar>
                <SearchInput
                  theme={theme}
                  value={apptSearch}
                  setValue={setApptSearch}
                  placeholder={t('searchApptPlaceholder')}
                />
                <select
                  value={apptFilter}
                  onChange={(e) => setApptFilter(e.target.value)}
                  style={inputStyle(theme)}
                >
                  <option value="All">{t('allStatuses')}</option>
                  <option value="Pending">{t('pending')}</option>
                  <option value="Accepted">{t('accepted')}</option>
                  <option value="Declined">{t('declined')}</option>
                </select>
              </Toolbar>

              <ResultCount count={filteredAppointments.length} />

              {filteredAppointments.length === 0 ? (
                <EmptyState text={t('noResults')} />
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {filteredAppointments.map((a, index) => {
                    const aId = a._id || a.id || index;
                    const statusBorderColor =
                      a.status === 'Accepted'
                        ? '#16a34a'
                        : a.status === 'Declined'
                        ? '#dc2626'
                        : '#f59e0b';

                    return (
                      <div
                        key={aId}
                        className="hover-card"
                        style={{
                          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                          border: 'none',
                          borderLeft: `5px solid ${statusBorderColor}`,
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '16px',
                          boxShadow:
                            theme === 'dark'
                              ? '0 10px 25px -3px rgba(0, 0, 0, 0.45), 0 4px 6px -4px rgba(0, 0, 0, 0.3)'
                              : '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div
                                style={{
                                  width: '42px',
                                  height: '42px',
                                  borderRadius: '12px',
                                  backgroundColor: theme === 'dark' ? '#0f172a' : '#ecfdf5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '20px',
                                  border: 'none',
                                }}
                              >
                                📅
                              </div>
                              <div>
                                <strong style={{ fontSize: '15px', display: 'block', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}>
                                  {a.villagerName || a.name || 'Resident'}
                                </strong>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                                  🗓️ {a.date ? new Date(a.date).toLocaleDateString() : '-'} • 🕒 {a.time || '-'}
                                </span>
                              </div>
                            </div>
                            <span style={badgeStatus(a.status)}>
                              {translateStatus(a.status, t)}
                            </span>
                          </div>

                          <div
                            style={{
                              padding: '12px 14px',
                              borderRadius: '10px',
                              backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                              fontSize: '13px',
                              color: theme === 'dark' ? '#cbd5e1' : '#334155',
                              border: 'none',
                            }}
                          >
                            <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', marginBottom: '4px', letterSpacing: '0.4px' }}>
                              {t('purpose')}
                            </strong>
                            {a.purpose || '-'}
                          </div>

                          {a.officerNote && (
                            <div
                              style={{
                                marginTop: '10px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                backgroundColor: theme === 'dark' ? 'rgba(5, 150, 105, 0.15)' : '#f0fdf4',
                                border: '1px dashed #86efac',
                                fontSize: '12px',
                                color: theme === 'dark' ? '#6ee7b7' : '#15803d',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <span>📝</span>
                              <span style={{ fontStyle: 'italic' }}>"{a.officerNote}"</span>
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                            paddingTop: '12px',
                            borderTop: theme === 'dark' ? '1px solid #334155' : '1px solid #f1f5f9',
                          }}
                        >
                          <button onClick={() => setApptDetails(a)} style={{ ...btnActionOutline, flex: 1, padding: '8px 10px' }}>
                            👁 {t('view')}
                          </button>

                          {a.status === 'Pending' && (
                            <>
                              <button
                                disabled={appointmentActionLoading === aId}
                                onClick={() => handleAppointmentAction(aId, 'Accepted')}
                                style={{ ...btnActionGreen, flex: 1, padding: '8px 10px' }}
                              >
                                ✓ {t('accept')}
                              </button>
                              <button
                                disabled={appointmentActionLoading === aId}
                                onClick={() => handleAppointmentAction(aId, 'Declined')}
                                style={{ ...btnActionRed, flex: 1, padding: '8px 10px' }}
                              >
                                ✕ {t('decline')}
                              </button>
                            </>
                          )}

                          <button
                            onClick={() =>
                              setNoteModal({
                                open: true,
                                apptId: aId,
                                note: a.officerNote || '',
                              })
                            }
                            style={{ ...btnActionOutline, flex: 1, padding: '8px 10px' }}
                          >
                            📝 {t('note')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DataSection>
          </section>
        )}

        {/* =========================================================
           VILLAGERS SECTION
        ========================================================= */}
        {activeSection === 'villagers' && (
          <section style={sharedTabContainerStyle(theme)}>
            {/* HERO / TOP BANNER SECTION */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(240px, 320px)',
                gap: '28px',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '36px 40px',
                borderRadius: '24px',
                marginBottom: '26px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(16px)',
                border: 'none',
                boxShadow: '0 12px 35px -6px rgba(0, 0, 0, 0.06)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-50px',
                  left: '-50px',
                  width: '260px',
                  height: '260px',
                  background: 'radial-gradient(circle, rgba(22, 163, 74, 0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Left Column */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>
                  <span>🌿</span> Village Demographics & Records
                </div>

                <h1
                  style={{
                    margin: '0 0 8px',
                    fontSize: '34px',
                    fontWeight: '800',
                    letterSpacing: '-0.5px',
                    color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                    lineHeight: '1.2',
                  }}
                >
                  Villagers Directory
                </h1>
                <p
                  style={{
                    margin: '0 0 20px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    fontWeight: '500',
                    color: theme === 'dark' ? '#94a3b8' : '#64748b',
                    maxWidth: '560px',
                  }}
                >
                  You can seamlessly manage citizen profiles, track registered households, and update public records in real time.
                </p>

                {/* Metric Badge Chips */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
                  <div style={chipStyle(theme, '#15803d', '#dcfce7')}>
                    <span>👥 Total:</span>
                    <strong>{villagers.length}</strong>
                  </div>
                  <div style={chipStyle(theme, '#0284c7', '#e0f2fe')}>
                    <span>👨 Male:</span>
                    <strong>{villagers.filter(v => (v.gender || '').toLowerCase() === 'male').length}</strong>
                  </div>
                  <div style={chipStyle(theme, '#db2777', '#fce7f3')}>
                    <span>👩 Female:</span>
                    <strong>{villagers.filter(v => (v.gender || '').toLowerCase() === 'female').length}</strong>
                  </div>
                  <div style={chipStyle(theme, '#d97706', '#fef3c7')}>
                    <span>🏠 Families:</span>
                    <strong>{villagers.filter(v => (v.role || '').toLowerCase().includes('head')).length}</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setVillagerModal({ open: true, mode: 'create', data: null })}
                    style={{
                      ...btnPrimary,
                      padding: '11px 22px',
                      fontSize: '13px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      boxShadow: '0 4px 14px rgba(21, 128, 61, 0.35)',
                    }}
                  >
                    + Add Villager
                  </button>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Press <kbd style={{ padding: '2px 6px', background: theme === 'dark' ? '#0f172a' : '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px', color: '#64748b' }}>Esc</kbd> to close modal
                  </span>
                </div>
              </div>

              {/* Right Column: Illustration Banner */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '280px',
                    aspectRatio: '1 / 1',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.16)',
                    border: 'none',
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                  }}
                >
                  <img
                    src={VILLAGERS_BANNER_IMAGE}
                    alt="Villagers banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Table Container */}
            <div
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(14px)',
                padding: '26px',
                borderRadius: '20px',
                boxShadow: '0 10px 30px -4px rgba(0,0,0,0.08)',
                border: 'none',
              }}
            >
              <Toolbar>
                <SearchInput
                  theme={theme}
                  value={villagerSearch}
                  setValue={setVillagerSearch}
                  placeholder={t('searchVillagerPlaceholder')}
                />
                <button
                  onClick={() => setVillagerModal({ open: true, mode: 'create', data: null })}
                  style={btnPrimary}
                >
                  {t('addVillager')}
                </button>
              </Toolbar>

              <ResultCount count={filteredVillagers.length} />

              <div
                style={{
                  overflowX: 'auto',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                }}
              >
                <table style={tableStyle}>
                  <thead>
                    <tr style={thRowStyle(theme)}>
                      <th style={tdThStyle}>{t('fullName')}</th>
                      <th style={tdThStyle}>{t('nic')}</th>
                      <th style={tdThStyle}>{t('houseNumber')}</th>
                      <th style={tdThStyle}>{t('phone')}</th>
                      <th style={tdThStyle}>{t('occupation')}</th>
                      <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVillagers.length === 0 ? (
                      <EmptyTableRow colSpan="6" text={t('noResults')} />
                    ) : (
                      filteredVillagers.map((v, index) => {
                        const vId = v._id || v.id || `villager-${index}`;
                        return (
                          <tr key={vId} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={tdThStyle}>
                              <strong>{v.fullName || v.name}</strong>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>
                                {v.role || 'Member'} • {v.gender || '-'}
                              </div>
                            </td>
                            <td style={tdThStyle}>{v.nic || '-'}</td>
                            <td style={tdThStyle}>{v.houseNumber || '-'}</td>
                            <td style={tdThStyle}>{v.phone || v.contact || '-'}</td>
                            <td style={tdThStyle}>{v.occupation || '-'}</td>
                            <td style={{ ...tdThStyle, textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button onClick={() => setVillagerDetails(v)} style={btnActionOutline}>
                                  👁 {t('view')}
                                </button>
                                <button
                                  onClick={() => setVillagerModal({ open: true, mode: 'edit', data: v })}
                                  style={btnActionOutline}
                                >
                                  {t('edit')}
                                </button>
                                <button
                                  onClick={() =>
                                    setDeleteConfirm({
                                      open: true,
                                      type: 'villager',
                                      id: vId,
                                      name: v.fullName || v.name,
                                    })
                                  }
                                  style={btnActionRed}
                                >
                                  {t('delete')}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
           COMPLAINTS SECTION (WITH DEDICATED HERO BANNER)
        ========================================================= */}
        {activeSection === 'complaints' && (
          <section style={sharedTabContainerStyle(theme)}>
            {/* Complaints Hero Banner */}
            <SectionHeroBanner
              theme={theme}
              title={t('complaints')}
              subtitle="Review community complaints, investigate citizen inquiries, and submit official officer remarks."
              badgeText="📝 Public Grievances & Inquiries"
              imageSrc={COMPLAINT_BANNER_IMAGE}
              stats={[
                { label: 'Total', value: complaints.length },
                { label: 'Pending', value: pendingComplaintsCount },
                { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length },
              ]}
            />

            <DataSection title={t('checkComplaints')} theme={theme}>
              <Toolbar>
                <SearchInput
                  theme={theme}
                  value={complaintSearch}
                  setValue={setComplaintSearch}
                  placeholder={t('searchComplaintsPlaceholder')}
                />
                <select
                  value={complaintFilter}
                  onChange={(e) => setComplaintFilter(e.target.value)}
                  style={inputStyle(theme)}
                >
                  <option value="All">{t('allStatuses')}</option>
                  <option value="Pending">{t('pending')}</option>
                  <option value="In Progress">{t('inProgress')}</option>
                  <option value="Resolved">{t('resolved')}</option>
                </select>
              </Toolbar>

              <ResultCount count={filteredComplaints.length} />

              {filteredComplaints.length === 0 ? (
                <EmptyState text={t('noResults')} />
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '18px',
                  }}
                >
                  {filteredComplaints.map((c, index) => {
                    const fullImage = getFullImageUrl(c.imageUrl);
                    const cId = c._id || c.id || `complaint-${index}`;
                    return (
                      <div
                        key={cId}
                        className="hover-card"
                        style={{
                          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                          border: 'none',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <div>
                          {fullImage ? (
                            <div style={{ width: '100%', height: '140px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                              <img
                                src={fullImage}
                                alt="Complaint Evidence"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </div>
                          ) : (
                            <div style={{ height: '6px', backgroundColor: c.status === 'Resolved' ? '#15803d' : '#f59e0b' }} />
                          )}

                          <div style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {c.referenceNo || 'CMP-GENERAL'}
                              </span>
                              <span style={badgeStatus(c.status)}>
                                {translateStatus(c.status, t)}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                              <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>🏷 {c.type || 'General'}</span>
                              •
                              <span>📍 {c.location || 'Unknown'}</span>
                            </div>

                            <p
                              style={{
                                fontSize: '13px',
                                lineHeight: '1.5',
                                margin: '0 0 12px',
                                color: theme === 'dark' ? '#cbd5e1' : '#334155',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {c.description || '-'}
                            </p>

                            <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>👤 {c.submittedBy || 'Public User'}</span>
                              {c.isAnonymous && (
                                <span style={{ backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>
                                  Anonymous
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            padding: '12px 16px',
                            borderTop: theme === 'dark' ? '1px solid #1f2937' : '1px solid #f1f5f9',
                            display: 'flex',
                            gap: '8px',
                            backgroundColor: theme === 'dark' ? '#0f172a' : '#fafafa',
                          }}
                        >
                          <button onClick={() => setComplaintDetails(c)} style={{ ...btnActionOutline, flex: 1 }}>
                            👁 {t('view')}
                          </button>
                          <button
                            onClick={() =>
                              setReplyModal({
                                open: true,
                                complaint: c,
                                reply: c.officerNote || c.reply || '',
                                status: c.status || 'Pending',
                              })
                            }
                            style={{ ...btnPrimary, flex: 1, padding: '7px 10px', fontSize: '11px' }}
                          >
                            📝 {t('replyStatus')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DataSection>
          </section>
        )}

        {/* =========================================================
           NOTICES SECTION (WITH DEDICATED HERO BANNER)
        ========================================================= */}
        {activeSection === 'notices' && (
          <section style={sharedTabContainerStyle(theme)}>
            {/* Announcements Hero Banner */}
            <SectionHeroBanner
              theme={theme}
              title={t('noticesTitle')}
              subtitle="Publish official village announcements, broadcast local initiatives, and broadcast public updates."
              badgeText="📢 Public Bulletin & Announcements"
              imageSrc={ANNOUNCEMENT_BANNER_IMAGE}
              stats={[
                { label: 'Published', value: publishedNoticesCount },
                { label: 'Active', value: publishedNoticesCount },
              ]}
            />

            <DataSection title={t('noticesTitle')} theme={theme}>
              <Toolbar>
                <SearchInput
                  theme={theme}
                  value={noticeSearch}
                  setValue={setNoticeSearch}
                  placeholder={t('searchNoticesPlaceholder')}
                />
                <select
                  value={noticeFilter}
                  onChange={(e) => setNoticeFilter(e.target.value)}
                  style={inputStyle(theme)}
                >
                  <option value="All">{t('allStatuses')}</option>
                  <option value="Announcements">Announcements</option>
                  <option value="General">General</option>
                  <option value="Youth & Sports">Youth & Sports</option>
                  <option value="Welfare">Welfare</option>
                  <option value="Health">Health</option>
                </select>
                <button
                  onClick={() => setNoticeModal({ open: true, mode: 'create', data: null })}
                  style={btnPrimary}
                >
                  {t('createNotice')}
                </button>
              </Toolbar>

              <ResultCount count={filteredNotices.length} />

              {filteredNotices.length === 0 ? (
                <EmptyState text={t('noResults')} />
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {filteredNotices.map((n, index) => {
                    const noticeId = n._id || n.id || `notice-${index}`;
                    return (
                      <div
                        key={noticeId}
                        className="hover-card"
                        style={{
                          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                          border: 'none',
                          borderRadius: '18px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <div>
                          <div style={{ width: '100%', height: '160px', backgroundColor: '#e2e8f0', position: 'relative' }}>
                            <img
                              src={n.image || DEFAULT_NOTICE_IMAGE}
                              alt={n.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = DEFAULT_NOTICE_IMAGE;
                              }}
                            />
                            <span
                              style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                                color: '#fff',
                                fontSize: '11px',
                                fontWeight: '600',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                backdropFilter: 'blur(4px)',
                              }}
                            >
                              {n.category || 'General'}
                            </span>
                          </div>

                          <div style={{ padding: '18px' }}>
                            <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', lineHeight: '1.3' }}>
                              {n.title}
                            </h4>

                            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '12px' }}>
                              <span>🗓 {n.date || '-'} {n.time ? `• 🕒 ${n.time}` : ''}</span>
                              <span>📍 {n.location || 'GN Office'}</span>
                            </div>

                            <p
                              style={{
                                fontSize: '13px',
                                color: theme === 'dark' ? '#cbd5e1' : '#475569',
                                lineHeight: '1.5',
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {n.description || n.content || ''}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            padding: '14px 18px',
                            borderTop: theme === 'dark' ? '1px solid #1f2937' : '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '8px',
                            backgroundColor: theme === 'dark' ? '#0f172a' : '#fafafa',
                          }}
                        >
                          <button
                            onClick={() => setNoticeModal({ open: true, mode: 'edit', data: n })}
                            style={btnActionOutline}
                          >
                            ✏ {t('edit')}
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm({
                                open: true,
                                type: 'notice',
                                id: noticeId,
                                name: n.title,
                              })
                            }
                            style={btnActionRed}
                          >
                            🗑️️ {t('delete')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DataSection>
          </section>
        )}
      </main>

      {/* VILLAGER CREATE / EDIT MODAL */}
      {villagerModal.open && (
        <Modal
          theme={theme}
          onClose={() => setVillagerModal({ open: false, mode: 'create', data: null })}
        >
          <h3 style={modalHeading}>
            {villagerModal.mode === 'edit' ? t('edit') : t('addVillager')}
          </h3>
          <form onSubmit={handleSaveVillager}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              <div>
                <label style={labelStyle}>{t('fullName')}</label>
                <input
                  type="text"
                  name="fullName"
                  defaultValue={villagerModal.data?.fullName || ''}
                  required
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('nic')}</label>
                <input
                  type="text"
                  name="nic"
                  defaultValue={villagerModal.data?.nic || ''}
                  required
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('houseNumber')}</label>
                <input
                  type="text"
                  name="houseNumber"
                  defaultValue={villagerModal.data?.houseNumber || ''}
                  required
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('phone')}</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={villagerModal.data?.phone || ''}
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('email')}</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={villagerModal.data?.email || ''}
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('gender')}</label>
                <select
                  name="gender"
                  defaultValue={villagerModal.data?.gender || 'Female'}
                  style={inputStyle(theme)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>{t('dateOfBirth')}</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={villagerModal.data?.dateOfBirth ? villagerModal.data.dateOfBirth.slice(0, 10) : ''}
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('occupation')}</label>
                <input
                  type="text"
                  name="occupation"
                  defaultValue={villagerModal.data?.occupation || ''}
                  placeholder="Farmer, Teacher, etc."
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('maritalStatus')}</label>
                <select
                  name="maritalStatus"
                  defaultValue={villagerModal.data?.maritalStatus || 'Married'}
                  style={inputStyle(theme)}
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>{t('role')}</label>
                <input
                  type="text"
                  name="role"
                  defaultValue={villagerModal.data?.role || 'Head of Household'}
                  placeholder="Head of Household / Member"
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('relationshipToHead')}</label>
                <input
                  type="text"
                  name="relationshipToHead"
                  defaultValue={villagerModal.data?.relationshipToHead || 'Self'}
                  placeholder="Self, Spouse, Son, Daughter"
                  style={inputStyle(theme)}
                />
              </div>

              <div>
                <label style={labelStyle}>{t('householdHeadNIC')}</label>
                <input
                  type="text"
                  name="householdHeadNIC"
                  defaultValue={villagerModal.data?.householdHeadNIC || ''}
                  placeholder="NIC of head of house"
                  style={inputStyle(theme)}
                />
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>{t('address')}</label>
              <input
                type="text"
                name="address"
                defaultValue={villagerModal.data?.address || ''}
                style={inputStyle(theme)}
              />
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>{t('familyDetails')}</label>
              <textarea
                name="familyDetails"
                defaultValue={villagerModal.data?.familyDetails || ''}
                rows="2"
                placeholder="Additional remarks or family structure notes..."
                style={{ ...inputStyle(theme), resize: 'vertical' }}
              />
            </div>

            <div style={modalActions}>
              <button
                type="button"
                onClick={() => setVillagerModal({ open: false, mode: 'create', data: null })}
                style={btnActionOutline}
              >
                {t('cancel')}
              </button>
              <button type="submit" style={btnPrimary}>
                {t('saveVillager')}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* VILLAGER DETAILS MODAL */}
      {villagerDetails && (
        <Modal theme={theme} onClose={() => setVillagerDetails(null)}>
          <h3 style={modalHeading}>👤 {t('villagerDetails')}</h3>
          <DetailRow label={t('fullName')} value={villagerDetails.fullName || villagerDetails.name || '-'} />
          <DetailRow label={t('nic')} value={villagerDetails.nic || '-'} />
          <DetailRow label={t('houseNumber')} value={villagerDetails.houseNumber || '-'} />
          <DetailRow label="Gender / DOB" value={`${villagerDetails.gender || '-'} | ${villagerDetails.dateOfBirth || '-'}`} />
          <DetailRow label={t('phone')} value={villagerDetails.phone || villagerDetails.contact || '-'} />
          <DetailRow label={t('email')} value={villagerDetails.email || '-'} />
          <DetailRow label={t('occupation')} value={villagerDetails.occupation || '-'} />
          <DetailRow label={t('maritalStatus')} value={villagerDetails.maritalStatus || '-'} />
          <DetailRow label="Role / Relation" value={`${villagerDetails.role || '-'} (${villagerDetails.relationshipToHead || '-'})`} />
          <DetailRow label="Head NIC" value={villagerDetails.householdHeadNIC || '-'} />
          <DetailRow label={t('address')} value={villagerDetails.address || '-'} />
          <DetailRow label={t('familyDetails')} value={villagerDetails.familyDetails || '-'} />
          <div style={modalActions}>
            <button onClick={() => setVillagerDetails(null)} style={btnActionOutline}>
              {t('close')}
            </button>
          </div>
        </Modal>
      )}

      {/* APPOINTMENT DETAILS MODAL */}
      {apptDetails && (
        <Modal theme={theme} onClose={() => setApptDetails(null)}>
          <h3 style={modalHeading}>📅 {t('appointmentDetails')}</h3>
          <DetailRow label={t('villager')} value={apptDetails.villagerName || apptDetails.name || 'Resident'} />
          <DetailRow label={t('dateTime')} value={`${apptDetails.date || '-'} | ${apptDetails.time || '-'}`} />
          <DetailRow label={t('purpose')} value={apptDetails.purpose || '-'} />
          <DetailRow
            label={t('status')}
            value={
              <span style={badgeStatus(apptDetails.status)}>
                {translateStatus(apptDetails.status, t)}
              </span>
            }
          />
          <DetailRow label={t('officerNote')} value={apptDetails.officerNote || '-'} />
          <div style={modalActions}>
            <button onClick={() => setApptDetails(null)} style={btnActionOutline}>
              {t('close')}
            </button>
          </div>
        </Modal>
      )}

      {/* COMPLAINT DETAILS MODAL */}
      {complaintDetails && (
        <Modal theme={theme} onClose={() => setComplaintDetails(null)}>
          <h3 style={modalHeading}>📝 {t('complaintDetails')}</h3>
          <DetailRow label="Ref No" value={<strong>{complaintDetails.referenceNo || 'CMP-GENERAL'}</strong>} />
          <DetailRow label={t('category')} value={<span style={{ textTransform: 'capitalize' }}>{complaintDetails.type || '-'}</span>} />
          <DetailRow label={t('location')} value={complaintDetails.location || '-'} />
          <DetailRow label="Assigned Officer" value={complaintDetails.officer || 'GN Officer'} />
          <DetailRow
            label={t('submittedBy')}
            value={`${complaintDetails.submittedBy || 'Public User'} ${complaintDetails.isAnonymous ? '(Anonymous)' : ''}`}
          />
          {complaintDetails.houseNumber && (
            <DetailRow label={t('houseNumber')} value={complaintDetails.houseNumber} />
          )}
          <DetailRow
            label={t('status')}
            value={
              <span style={badgeStatus(complaintDetails.status)}>
                {translateStatus(complaintDetails.status, t)}
              </span>
            }
          />
          <DetailRow
            label="Date Submitted"
            value={
              complaintDetails.createdAt
                ? new Date(complaintDetails.createdAt).toLocaleString()
                : '-'
            }
          />

          <div style={{ marginTop: '15px' }}>
            <label style={labelStyle}>{t('description')}</label>
            <div
              style={{
                padding: '12px',
                borderRadius: '9px',
                backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                lineHeight: '1.6',
                fontSize: '13px',
                border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
              }}
            >
              {complaintDetails.description || '-'}
            </div>
          </div>

          {complaintDetails.imageUrl && (
            <div style={{ marginTop: '15px' }}>
              <label style={labelStyle}>{t('evidence')}</label>
              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  maxHeight: '220px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                }}
              >
                <img
                  src={getFullImageUrl(complaintDetails.imageUrl)}
                  alt="Evidence"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: '15px' }}>
            <label style={labelStyle}>{t('officerReply')}</label>
            <div
              style={{
                padding: '12px',
                borderRadius: '9px',
                backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                lineHeight: '1.6',
                fontSize: '13px',
                border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
              }}
            >
              {complaintDetails.officerNote || complaintDetails.reply || 'No remarks provided yet.'}
            </div>
          </div>

          <div style={modalActions}>
            <button onClick={() => setComplaintDetails(null)} style={btnActionOutline}>
              {t('close')}
            </button>
            <button
              onClick={() => {
                setComplaintDetails(null);
                setReplyModal({
                  open: true,
                  complaint: complaintDetails,
                  reply: complaintDetails.officerNote || complaintDetails.reply || '',
                  status: complaintDetails.status || 'Pending',
                });
              }}
              style={btnPrimary}
            >
              📝 {t('replyStatus')}
            </button>
          </div>
        </Modal>
      )}

      {/* APPOINTMENT NOTE MODAL */}
      {noteModal.open && (
        <Modal
          theme={theme}
          onClose={() => setNoteModal({ open: false, apptId: null, note: '' })}
        >
          <h3 style={modalHeading}>📝 {t('officerNote')}</h3>
          <textarea
            rows="5"
            value={noteModal.note}
            onChange={(e) => setNoteModal({ ...noteModal, note: e.target.value })}
            style={{ ...inputStyle(theme), resize: 'vertical' }}
            placeholder={lang === 'si' ? 'හමුවීම පිළිබඳ සටහනක් ඇතුළත් කරන්න...' : 'Enter an officer note...'}
          />
          <div style={modalActions}>
            <button
              onClick={() => setNoteModal({ open: false, apptId: null, note: '' })}
              style={btnActionOutline}
            >
              {t('cancel')}
            </button>
            <button onClick={handleSaveNote} style={btnPrimary}>
              {t('saveNote')}
            </button>
          </div>
        </Modal>
      )}

      {/* COMPLAINT REPLY MODAL */}
      {replyModal.open && (
        <Modal
          theme={theme}
          onClose={() => setReplyModal({ open: false, complaint: null, reply: '', status: '' })}
        >
          <h3 style={modalHeading}>{t('replyStatus')}</h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '-10px', marginBottom: '15px' }}>
            Ref: <strong>{replyModal.complaint?.referenceNo || 'CMP-GENERAL'}</strong>
          </p>

          <label style={labelStyle}>{t('status')}</label>
          <select
            value={replyModal.status}
            onChange={(e) => setReplyModal({ ...replyModal, status: e.target.value })}
            style={inputStyle(theme)}
          >
            <option value="Pending">{t('pending')}</option>
            <option value="In Progress">{t('inProgress')}</option>
            <option value="Resolved">{t('resolved')}</option>
          </select>

          <label style={{ ...labelStyle, marginTop: '10px' }}>{t('officerReply')}</label>
          <textarea
            rows="5"
            value={replyModal.reply}
            placeholder={
              lang === 'si'
                ? 'පැමිණිල්ල සම්බන්ධයෙන් ගත් ක්‍රියාමාර්ගය හෝ සටහන ඇතුළත් කරන්න...'
                : 'Enter official remarks or actions taken...'
            }
            onChange={(e) => setReplyModal({ ...replyModal, reply: e.target.value })}
            style={{ ...inputStyle(theme), resize: 'vertical' }}
          />

          <div style={modalActions}>
            <button
              onClick={() => setReplyModal({ open: false, complaint: null, reply: '', status: '' })}
              style={btnActionOutline}
            >
              {t('cancel')}
            </button>
            <button onClick={handleSaveComplaintReply} style={btnPrimary}>
              {t('saveResponse')}
            </button>
          </div>
        </Modal>
      )}

      {/* NOTICE MODAL */}
      {noticeModal.open && (
        <Modal
          theme={theme}
          onClose={() => setNoticeModal({ open: false, mode: 'create', data: null })}
        >
          <h3 style={modalHeading}>
            {noticeModal.mode === 'edit' ? t('edit') : t('createNotice')}
          </h3>
          <form onSubmit={handleSaveNotice}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>{t('noticeTitle')}</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={noticeModal.data?.title || ''}
                  placeholder="Monthly meeting"
                  required
                  style={inputStyle(theme)}
                />
              </div>
              <div>
                <label style={labelStyle}>{t('type')}</label>
                <input
                  type="text"
                  name="type"
                  defaultValue={noticeModal.data?.type || 'Announcements'}
                  required
                  style={inputStyle(theme)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>{t('category')}</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={noticeModal.data?.category || 'Youth & Sports'}
                  placeholder="Youth & Sports / General"
                  style={inputStyle(theme)}
                />
              </div>
              <div>
                <label style={labelStyle}>{t('location')}</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={noticeModal.data?.location || 'Grama Niladhari Office'}
                  placeholder="Grama Niladhari Office"
                  style={inputStyle(theme)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>{t('date')}</label>
                <input
                  type="text"
                  name="date"
                  defaultValue={noticeModal.data?.date || ''}
                  placeholder="Oct 1, 2026"
                  required
                  style={inputStyle(theme)}
                />
              </div>
              <div>
                <label style={labelStyle}>{t('time')}</label>
                <input
                  type="text"
                  name="time"
                  defaultValue={noticeModal.data?.time || ''}
                  placeholder="10:00 AM"
                  required
                  style={inputStyle(theme)}
                />
              </div>
            </div>

            <label style={labelStyle}>{t('image')}</label>
            <input
              type="text"
              name="image"
              defaultValue={noticeModal.data?.image || DEFAULT_NOTICE_IMAGE}
              placeholder="https://images.unsplash.com/..."
              style={inputStyle(theme)}
            />

            <label style={labelStyle}>{t('description')}</label>
            <input
              type="text"
              name="description"
              defaultValue={noticeModal.data?.description || ''}
              placeholder="Short summary (e.g. All are invited)"
              required
              style={inputStyle(theme)}
            />

            <label style={labelStyle}>{t('content')}</label>
            <textarea
              name="content"
              defaultValue={noticeModal.data?.content || ''}
              rows="3"
              placeholder="Detailed description of the announcement..."
              required
              style={{ ...inputStyle(theme), resize: 'vertical' }}
            />

            <div style={modalActions}>
              <button
                type="button"
                onClick={() => setNoticeModal({ open: false, mode: 'create', data: null })}
                style={btnActionOutline}
              >
                {t('cancel')}
              </button>
              <button type="submit" style={btnPrimary}>
                {t('publish')}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm.open && (
        <Modal
          theme={theme}
          onClose={() => setDeleteConfirm({ open: false, type: '', id: null, name: '' })}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '55px',
                height: '55px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '25px',
              }}
            >
              ⚠️
            </div>

            <h3 style={{ margin: '0 0 10px', color: '#dc2626' }}>{t('confirmDelete')}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {t('deleteWarning')} <strong>"{deleteConfirm.name}"</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setDeleteConfirm({ open: false, type: '', id: null, name: '' })}
                style={btnActionOutline}
              >
                {t('cancel')}
              </button>
              <button onClick={executeDelete} style={btnActionRed}>
                {t('yesDelete')}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style>
        {`
          .hover-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 14px 28px -5px rgba(22, 163, 74, 0.15), 0 8px 10px -5px rgba(0, 0, 0, 0.04) !important;
          }
          @media (max-width: 850px) {
            form {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 768px) {
            section > div:first-child {
              grid-template-columns: 1fr !important;
              text-align: center;
              padding: 24px !important;
            }
            section > div:first-child > div:last-child {
              margin: 0 auto;
            }
          }
          @media (max-width: 650px) {
            header nav {
              width: 100%;
              overflow-x: auto;
              justify-content: flex-start !important;
              padding-bottom: 5px;
            }
            main {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

/* =========================================================
   REUSABLE SUB-COMPONENTS & HELPERS
========================================================= */

/* Hero Banner Component (Used across sections like Villagers) */
const SectionHeroBanner = ({ theme, title, subtitle, badgeText, imageSrc, stats = [] }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(240px, 320px)',
      gap: '28px',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '36px 40px',
      borderRadius: '24px',
      marginBottom: '26px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      border: 'none',
      boxShadow: '0 12px 35px -6px rgba(0, 0, 0, 0.06)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '-50px',
        left: '-50px',
        width: '260px',
        height: '260px',
        background: 'radial-gradient(circle, rgba(22, 163, 74, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />

    <div style={{ position: 'relative', zIndex: 1 }}>
      {badgeText && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>
          {badgeText}
        </div>
      )}

      <h1
        style={{
          margin: '0 0 8px',
          fontSize: '34px',
          fontWeight: '800',
          letterSpacing: '-0.5px',
          color: theme === 'dark' ? '#f8fafc' : '#0f172a',
          lineHeight: '1.2',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          margin: '0 0 20px',
          fontSize: '14px',
          lineHeight: '1.5',
          fontWeight: '500',
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
          maxWidth: '560px',
        }}
      >
        {subtitle}
      </p>

      {/* Metrics Row */}
      {stats.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {stats.map((st, i) => (
            <div key={i} style={chipStyle(theme, '#15803d', '#dcfce7')}>
              <span>{st.label}:</span>
              <strong>{st.value}</strong>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Hero Image Container */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          width: '100%',
          maxWidth: '280px',
          aspectRatio: '1 / 1',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.16)',
          border: 'none',
          backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
        }}
      >
        <img
          src={imageSrc}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    </div>
  </div>
);

const sharedTabContainerStyle = (theme) => ({
  marginBottom: '30px',
  borderRadius: '28px',
  padding: '24px',
  backgroundImage: `linear-gradient(${
    theme === 'dark'
      ? 'rgba(11, 17, 32, 0.86), rgba(11, 17, 32, 0.94)'
      : 'rgba(248, 250, 252, 0.82), rgba(241, 245, 249, 0.92)'
  }), url(${SHARED_BACKGROUND_IMAGE})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  border: 'none',
  boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.18)',
});

const quickMetricCard = (theme, textColor, lightBg) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 14px',
  borderRadius: '12px',
  backgroundColor: theme === 'dark' ? '#0f172a' : lightBg,
  border: 'none',
  minWidth: '110px',
});

const chipStyle = (theme, textColor, lightBg) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 12px',
  borderRadius: '10px',
  fontSize: '12px',
  fontWeight: '600',
  backgroundColor: theme === 'dark' ? '#0f172a' : lightBg,
  color: theme === 'dark' ? '#f1f5f9' : textColor,
  border: 'none',
});

/* =========================================================
   DASHBOARD CARD (BORDERLESS AS REQUESTED)
========================================================= */
const DashboardCard = ({ theme, icon, title, value, subtext, onClick }) => (
  <div
    onClick={onClick}
    className="hover-card"
    style={{
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      padding: '20px 22px',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      border: 'none', // Removed all borders as requested
      boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.25s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1 }}>
      <span
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          backgroundColor: '#dcfce7',
        }}
      >
        {icon}
      </span>
      <div>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px', fontWeight: '600' }}>
          {title}
        </div>
        <strong style={{ fontSize: '26px', color: '#15803d', fontWeight: '800', lineHeight: '1.1', display: 'block' }}>
          {value}
        </strong>
        {subtext && (
          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '600', marginTop: '3px', display: 'block' }}>
            {subtext}
          </span>
        )}
      </div>
    </div>

    {/* Right click arrow indicator in green */}
    <span style={{ fontSize: '18px', color: '#16a34a', fontWeight: '700', zIndex: 1 }}>→</span>

    {/* Background watermark icon */}
    <span
      style={{
        position: 'absolute',
        right: '-12px',
        bottom: '-15px',
        fontSize: '68px',
        opacity: 0.04,
        pointerEvents: 'none',
      }}
    >
      {icon}
    </span>
  </div>
);

const QuickAction = ({ theme, icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="hover-card"
    style={{
      border: 'none',
      backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(10px)',
      borderRadius: '14px',
      padding: '16px',
      cursor: 'pointer',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '13px',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s ease',
    }}
  >
    <span style={{ fontSize: '18px' }}>{icon}</span>
    <span>{text}</span>
  </button>
);

const DataSection = ({ title, theme, children }) => (
  <div style={{ ...panelStyle(theme), marginBottom: 0 }}>
    <h2 style={{ margin: '0 0 18px', fontSize: '20px' }}>{title}</h2>
    {children}
  </div>
);

const Toolbar = ({ children }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
    {children}
  </div>
);

const SearchInput = ({ theme, value, setValue, placeholder }) => (
  <div style={{ position: 'relative', minWidth: '230px', flex: 1 }}>
    <span style={{ position: 'absolute', left: '11px', top: '9px', fontSize: '13px' }}>
      🔍
    </span>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      style={{
        ...inputStyle(theme),
        paddingLeft: '32px',
        paddingRight: value ? '30px' : '12px',
        marginBottom: 0,
      }}
    />
    {value && (
      <button
        onClick={() => setValue('')}
        style={{
          position: 'absolute',
          right: '7px',
          top: '6px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#64748b',
        }}
      >
        ×
      </button>
    )}
  </div>
);

const ResultCount = ({ count }) => (
  <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '10px' }}>
    {count} result{count !== 1 ? 's' : ''}
  </div>
);

const EmptyState = ({ text }) => (
  <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
    📭 {text}
  </div>
);

const EmptyTableRow = ({ colSpan, text }) => (
  <tr>
    <td colSpan={colSpan} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
      📭 {text}
    </td>
  </tr>
);

const Modal = ({ theme, children, onClose }) => (
  <div
    style={modalBackdrop}
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
    <div style={{ ...modalBody(theme), maxHeight: '90vh', overflowY: 'auto' }}>
      {children}
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      gap: '10px',
      padding: '11px 0',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '13px',
    }}
  >
    <strong style={{ color: '#64748b' }}>{label}</strong>
    <div>{value}</div>
  </div>
);

const translateStatus = (status, t) => {
  const map = {
    Pending: 'pending',
    Accepted: 'accepted',
    Declined: 'declined',
    'In Progress': 'inProgress',
    Resolved: 'resolved',
    Draft: 'draft',
    Published: 'published',
    Expired: 'expired',
  };
  return t(map[status] || status);
};

const panelStyle = (theme) => ({
  backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(14px)',
  padding: '26px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)',
  border: 'none',
});

const sectionTitle = {
  margin: '0 0 16px',
  fontSize: '17px',
  fontWeight: '700',
};

const modalHeading = {
  margin: '0 0 18px',
  fontSize: '18px',
};

const inputStyle = (theme) => ({
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: theme === 'dark' ? '1px solid #475569' : '1px solid #cbd5e1',
  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
  color: theme === 'dark' ? '#f8fafc' : '#1e293b',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: '8px',
});

const inputSmall = (theme) => ({
  padding: '7px 9px',
  borderRadius: '8px',
  border: theme === 'dark' ? '1px solid #475569' : '1px solid #cbd5e1',
  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
  color: theme === 'dark' ? '#f8fafc' : '#1e293b',
  fontSize: '12px',
  cursor: 'pointer',
});

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#64748b',
  marginBottom: '5px',
};

const btnPrimary = {
  backgroundColor: '#15803d',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 16px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
};

const btnActionGreen = {
  backgroundColor: '#dcfce7',
  color: '#15803d',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '7px',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
};

const btnActionRed = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '7px',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
};

const btnActionOutline = {
  backgroundColor: 'transparent',
  color: '#64748b',
  border: '1px solid #cbd5e1',
  padding: '6px 10px',
  borderRadius: '7px',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
};

const iconButton = () => ({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  padding: '5px',
});

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

  if (['Accepted', 'Resolved', 'Published'].includes(status)) {
    bg = '#dcfce7';
    col = '#15803d';
  }

  if (['Pending', 'In Progress'].includes(status)) {
    bg = '#fef3c7';
    col = '#b45309';
  }

  if (['Declined', 'Expired'].includes(status)) {
    bg = '#fee2e2';
    col = '#b91c1c';
  }

  return {
    display: 'inline-block',
    padding: '4px 9px',
    borderRadius: '20px',
    fontSize: '10px',
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
  backgroundColor: 'rgba(15,23,42,0.58)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '15px',
  boxSizing: 'border-box',
};

const modalBody = (theme) => ({
  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
  color: theme === 'dark' ? '#f8fafc' : '#1e293b',
  padding: '25px',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '650px',
  boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
});

const modalActions = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px',
};

export default GNPortal;