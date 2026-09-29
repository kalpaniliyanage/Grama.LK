import React, { useState, useEffect, useMemo } from 'react';

const API =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/gn';

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
    searchVillagerPlaceholder: 'Search by Name, NIC, House No...',
    addVillager: '+ Add Villager',
    fullName: 'Full Name',
    nic: 'NIC Number',
    houseNumber: 'House Number',
    phone: 'Phone Number',
    address: 'Address',
    email: 'Email',
    familyDetails: 'Family Details',
    edit: 'Edit',
    delete: 'Delete',
    saveVillager: 'Save Villager',

    checkComplaints: 'Check Complaints',
    searchComplaintsPlaceholder: 'Search complaints...',
    subject: 'Subject',
    category: 'Category',
    description: 'Description',
    officerReply: 'Officer Reply',
    replyStatus: 'Reply / Status',
    saveResponse: 'Save Response',

    noticesTitle: 'Notices & Announcements',
    searchNoticesPlaceholder: 'Search notices...',
    createNotice: '+ Create Notice',
    noticeTitle: 'Notice Title',
    content: 'Full Content',
    location: 'Location',
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
    replySaved: 'Reply saved successfully.',
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

    villagersDirectory: 'පුරවැසි නාමාවලිය',
    searchVillagerPlaceholder: 'නම, හැඳුනුම්පත, නිවාස අංකය අනුව සොයන්න...',
    addVillager: '+ පුරවැසියෙකු එක්කරන්න',
    fullName: 'සම්පූර්ණ නම',
    nic: 'හැඳුනුම්පත් අංකය',
    houseNumber: 'නිවාස අංකය',
    phone: 'දුරකථන අංකය',
    address: 'ලිපිනය',
    email: 'විද්‍යුත් තැපෑල',
    familyDetails: 'පවුලේ විස්තර',
    edit: 'සංස්කරණය',
    delete: 'මකන්න',
    saveVillager: 'පුරවැසියා සුරකින්න',

    checkComplaints: 'මහජන පැමිණිලි පරීක්ෂා කිරීම',
    searchComplaintsPlaceholder: 'පැමිණිලි සොයන්න...',
    subject: 'මාතෘකාව',
    category: 'වර්ගය',
    description: 'කෙටි විස්තරය',
    officerReply: 'නිලධාරී පිළිතුර',
    replyStatus: 'පිළිතුර / තත්ත්වය',
    saveResponse: 'පිළිතුර සුරකින්න',

    noticesTitle: 'දැන්වීම් සහ නිවේදන',
    searchNoticesPlaceholder: 'නිවේදන සොයන්න...',
    createNotice: '+ නිවේදනයක් පළකරන්න',
    noticeTitle: 'නිවේදන මාතෘකාව',
    content: 'සම්පූර්ණ අන්තර්ගතය',
    location: 'ස්ථානය',
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
    replySaved: 'පිළිතුර සාර්ථකව සුරකින ලදී.',
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
    searchVillagerPlaceholder: 'பெயர், அட்டை எண், வீட்டு எண் மூலம் தேடவும்...',
    addVillager: '+ கிராமவாசியைச் சேர்க்கவும்',
    fullName: 'முழுப் பெயர்',
    nic: 'அடையாள அட்டை எண்',
    houseNumber: 'வீட்டு இலக்கம்',
    phone: 'தொலைபேசி எண்',
    address: 'முகவரி',
    email: 'மின்னஞ்சல்',
    familyDetails: 'குடும்ப விபரங்கள்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    saveVillager: 'சேமிக்கவும்',

    checkComplaints: 'முறைப்பாடுகளைப் பார்க்கவும்',
    searchComplaintsPlaceholder: 'முறைப்பாடுகளைத் தேடவும்...',
    subject: 'விடயம்',
    category: 'வகை',
    description: 'விபரம்',
    officerReply: 'அதிகாரி பதில்',
    replyStatus: 'பதில் / நிலை',
    saveResponse: 'பதிலைச் சேமிக்கவும்',

    noticesTitle: 'அறிவிப்புகள்',
    searchNoticesPlaceholder: 'அறிவிப்புகளைத் தேடவும்...',
    createNotice: '+ புதிய அறிவிப்பு',
    noticeTitle: 'தலைப்பு',
    content: 'உள்ளடக்கம்',
    location: 'இடம்',
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

/* =========================================================
   MAIN COMPONENT
========================================================= */

const GNPortal = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const [theme, setTheme] = useState(
    localStorage.getItem('gramalk_theme') || 'light'
  );

  const [lang, setLang] = useState(
    localStorage.getItem('gramalk_lang') || 'si'
  );

  const [officerName, setOfficerName] = useState('Kanchana Perera');

  const t = (key) =>
    dashboardWords[lang]?.[key] ||
    dashboardWords.en[key] ||
    key;

  /* =========================================================
     UI STATES
  ========================================================= */

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* =========================================================
     APPOINTMENTS
  ========================================================= */

  const [appointments, setAppointments] = useState([]);
  const [apptFilter, setApptFilter] = useState('All');
  const [apptSearch, setApptSearch] = useState('');
  const [apptDetails, setApptDetails] = useState(null);

  const [noteModal, setNoteModal] = useState({
    open: false,
    apptId: null,
    note: '',
  });

  const [appointmentActionLoading, setAppointmentActionLoading] =
    useState(null);

  /* =========================================================
     VILLAGERS
  ========================================================= */

  const [villagers, setVillagers] = useState([]);
  const [villagerSearch, setVillagerSearch] = useState('');

  const [villagerModal, setVillagerModal] = useState({
    open: false,
    mode: 'create',
    data: null,
  });

  const [villagerDetails, setVillagerDetails] = useState(null);

  /* =========================================================
     COMPLAINTS
  ========================================================= */

  const [complaints, setComplaints] = useState([]);
  const [complaintFilter, setComplaintFilter] = useState('All');
  const [complaintSearch, setComplaintSearch] = useState('');

  const [replyModal, setReplyModal] = useState({
    open: false,
    complaint: null,
    reply: '',
    status: '',
  });

  const [complaintDetails, setComplaintDetails] = useState(null);

  /* =========================================================
     NOTICES / ANNOUNCEMENTS
  ========================================================= */

  const [notices, setNotices] = useState([]);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeFilter, setNoticeFilter] = useState('All');

  const [noticeModal, setNoticeModal] = useState({
    open: false,
    mode: 'create',
    data: null,
  });

  /* =========================================================
     DELETE CONFIRMATION
  ========================================================= */

  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: '',
    id: null,
    name: '',
  });

  /* =========================================================
     LANGUAGE & THEME
  ========================================================= */

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

  /* =========================================================
     API HELPER
  ========================================================= */

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

  /* =========================================================
     FETCH DATA
  ========================================================= */

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
        setAppointments(
          Array.isArray(apptResult.value) ? apptResult.value : []
        );
      }

      if (villagersResult.status === 'fulfilled') {
        const vList = Array.isArray(villagersResult.value) ? villagersResult.value : [];
        setVillagers(vList);
      }

      if (compResult.status === 'fulfilled') {
        setComplaints(
          Array.isArray(compResult.value) ? compResult.value : []
        );
      }

      if (noticeResult.status === 'fulfilled') {
        const data = noticeResult.value;
        setNotices(
          Array.isArray(data) ? data : data?.announcements || []
        );
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

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

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

  /* =========================================================
     ESC KEY HANDLER
  ========================================================= */

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

  /* =========================================================
     APPOINTMENT ACTIONS
  ========================================================= */

  const handleAppointmentAction = async (id, newStatus) => {
    setAppointmentActionLoading(id);

    try {
      await apiRequest(`${API}/appointments/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id || a.id === id ? { ...a, status: newStatus } : a
        )
      );

      showAlert(
        newStatus === 'Accepted'
          ? t('appointmentAccepted')
          : t('appointmentDeclined')
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

  /* =========================================================
     VILLAGER CRUD
  ========================================================= */

  const handleSaveVillager = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    const isEdit = villagerModal.mode === 'edit';
    const url = isEdit
      ? `${API}/villagers/${villagerModal.data._id}`
      : `${API}/villagers`;

    try {
      const saved = await apiRequest(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      if (isEdit) {
        setVillagers((prev) =>
          prev.map((v) =>
            v._id === villagerModal.data._id ? saved : v
          )
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
        setVillagers((prev) => prev.filter((v) => v._id !== id));
        showAlert(t('villagerDeleted'));
      }

      if (type === 'notice') {
        await apiRequest(`${API}/announcements/${id}`, { method: 'DELETE' });
        setNotices((prev) => prev.filter((n) => n._id !== id));
        showAlert(t('noticeDeleted'));
      }
    } catch (error) {
      console.error(error);
      showAlert(t('actionFailed'), 'error');
    } finally {
      setDeleteConfirm({ open: false, type: '', id: null, name: '' });
    }
  };

  /* =========================================================
     COMPLAINTS & NOTICES ACTIONS
  ========================================================= */

  const handleSaveComplaintReply = async (e) => {
    e.preventDefault();
    const { complaint, reply, status } = replyModal;

    try {
      await apiRequest(`${API}/complaints/${complaint._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ officerNote: reply, status }),
      });

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaint._id ? { ...c, officerNote: reply, reply, status } : c
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
      payload.image =
        'https://images.unsplash.com/photo-1517649763962-0c6232662000?q=80&w=800&auto=format&fit=crop';
    }

    const isEdit = noticeModal.mode === 'edit';
    const url = isEdit
      ? `${API}/announcements/${noticeModal.data._id}`
      : `${API}/announcements`;

    try {
      const saved = await apiRequest(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      if (isEdit) {
        setNotices((prev) =>
          prev.map((n) => (n._id === noticeModal.data._id ? saved : n))
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

  /* =========================================================
     FILTERS & COUNTS
  ========================================================= */

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
        (v.phone || v.contact || '').toLowerCase().includes(search)
      );
    });
  }, [villagers, villagerSearch]);

  const filteredComplaints = useMemo(() => {
    const search = complaintSearch.toLowerCase();
    return complaints.filter((c) => {
      const matchFilter = complaintFilter === 'All' || c.status === complaintFilter;
      const matchSearch =
        (c.subject || c.title || '').toLowerCase().includes(search) ||
        (c.category || '').toLowerCase().includes(search) ||
        (c.description || '').toLowerCase().includes(search);
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
        text: `${t('complaintUpdated')}: ${c.subject || c.title || 'Complaint'}`,
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

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme === 'dark' ? '#0f172a' : '#f8fafc',
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
        <style>
          {`@keyframes spin { to { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  /* =========================================================
     MAIN RENDER
  ========================================================= */

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#0b1120' : '#f8fafc',
        color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* TOAST NOTIFICATION */}
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
          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
          borderBottom: theme === 'dark' ? '1px solid #1f2937' : '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {/* LOGO */}
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

            {/* NAVIGATION */}
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

            {/* CONTROLS */}
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
        {/* OVERVIEW SECTION (Cleaned - Officer card removed) */}
        {activeSection === 'overview' && (
          <section>
            {/* HERO BANNER */}
            <div
              style={{
                borderRadius: '24px',
                padding: '36px 32px',
                marginBottom: '28px',
                background:
                  theme === 'dark'
                    ? 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)'
                    : 'linear-gradient(135deg, #15803d 0%, #047857 50%, #065f46 100%)',
                color: '#ffffff',
                boxShadow: '0 10px 30px -5px rgba(21, 128, 61, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  🌿 {t('portalTitle')}
                </span>
                <h1 style={{ margin: 0, fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                  {t('welcome')}, {officerName} 👋
                </h1>
                <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: '14px', maxWidth: '580px', lineHeight: 1.5 }}>
                  {t('dashboardSubtitle')}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => fetchDashboardData(true)}
                  disabled={refreshing}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {refreshing ? `⟳ ${t('refreshing')}` : `🔄 ${t('refresh')}`}
                </button>
              </div>
            </div>

            {/* METRICS GRID */}
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
                onClick={() => goTo('villagers')}
              />
              <DashboardCard
                theme={theme}
                icon="📅"
                title={t('pendingAppointments')}
                value={pendingAppointmentsCount}
                color="#d97706"
                onClick={() => goTo('appointments')}
              />
              <DashboardCard
                theme={theme}
                icon="📝"
                title={t('pendingComplaints')}
                value={pendingComplaintsCount}
                color="#dc2626"
                onClick={() => goTo('complaints')}
              />
              <DashboardCard
                theme={theme}
                icon="📢"
                title={t('publishedNotices')}
                value={publishedNoticesCount}
                color="#2563eb"
                onClick={() => goTo('notices')}
              />
            </div>

            {/* TWO-COLUMN WORKSPACE: QUICK ACTIONS & RECENT ACTIVITY */}
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
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                  }}
                >
                  <QuickAction
                    theme={theme}
                    icon="👤"
                    text={t('addVillager')}
                    onClick={() => {
                      setVillagerModal({ open: true, mode: 'create', data: null });
                    }}
                  />
                  <QuickAction
                    theme={theme}
                    icon="📢"
                    text={t('createNotice')}
                    onClick={() => {
                      setNoticeModal({ open: true, mode: 'create', data: null });
                    }}
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
                          borderBottom:
                            index < recentActivity.length - 1 ? '1px solid #e2e8f0' : 'none',
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

            {/* TODAY'S APPOINTMENTS */}
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
                  {todaysAppointments.slice(0, 5).map((a) => (
                    <div
                      key={a._id || a.id}
                      onClick={() => setApptDetails(a)}
                      className="hover-card"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
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

        {/* APPOINTMENTS SECTION */}
        {activeSection === 'appointments' && (
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

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('villager')}</th>
                    <th style={tdThStyle}>{t('dateTime')}</th>
                    <th style={tdThStyle}>{t('purpose')}</th>
                    <th style={tdThStyle}>{t('status')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <EmptyTableRow colSpan="5" text={t('noResults')} />
                  ) : (
                    filteredAppointments.map((a) => (
                      <tr key={a._id || a.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{a.villagerName || a.name || 'Resident'}</strong></td>
                        <td style={tdThStyle}>{a.date ? new Date(a.date).toLocaleDateString() : '-'} | {a.time || '-'}</td>
                        <td style={tdThStyle}>{a.purpose || '-'}</td>
                        <td style={tdThStyle}>
                          <span style={badgeStatus(a.status)}>
                            {translateStatus(a.status, t)}
                          </span>
                        </td>
                        <td style={{ ...tdThStyle, textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button onClick={() => setApptDetails(a)} style={btnActionOutline}>
                              👁️ {t('view')}
                            </button>

                            {a.status === 'Pending' && (
                              <>
                                <button
                                  disabled={appointmentActionLoading === (a._id || a.id)}
                                  onClick={() => handleAppointmentAction(a._id || a.id, 'Accepted')}
                                  style={btnActionGreen}
                                >
                                  ✓ {t('accept')}
                                </button>
                                <button
                                  disabled={appointmentActionLoading === (a._id || a.id)}
                                  onClick={() => handleAppointmentAction(a._id || a.id, 'Declined')}
                                  style={btnActionRed}
                                >
                                  ✕ {t('decline')}
                                </button>
                              </>
                            )}

                            <button
                              onClick={() =>
                                setNoteModal({
                                  open: true,
                                  apptId: a._id || a.id,
                                  note: a.officerNote || '',
                                })
                              }
                              style={btnActionOutline}
                            >
                              📝 {t('note')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </DataSection>
        )}

        {/* VILLAGERS SECTION */}
        {activeSection === 'villagers' && (
          <DataSection title={t('villagersDirectory')} theme={theme}>
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

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('fullName')}</th>
                    <th style={tdThStyle}>{t('nic')}</th>
                    <th style={tdThStyle}>{t('houseNumber')}</th>
                    <th style={tdThStyle}>{t('phone')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVillagers.length === 0 ? (
                    <EmptyTableRow colSpan="5" text={t('noResults')} />
                  ) : (
                    filteredVillagers.map((v) => (
                      <tr key={v._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{v.fullName || v.name}</strong></td>
                        <td style={tdThStyle}>{v.nic || '-'}</td>
                        <td style={tdThStyle}>{v.houseNumber || '-'}</td>
                        <td style={tdThStyle}>{v.phone || v.contact || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button onClick={() => setVillagerDetails(v)} style={btnActionOutline}>
                              👁️ {t('view')}
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
                                  id: v._id,
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </DataSection>
        )}

        {/* COMPLAINTS SECTION */}
        {activeSection === 'complaints' && (
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

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={tdThStyle}>{t('subject')}</th>
                    <th style={tdThStyle}>{t('category')}</th>
                    <th style={tdThStyle}>{t('status')}</th>
                    <th style={tdThStyle}>{t('officerReply')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length === 0 ? (
                    <EmptyTableRow colSpan="5" text={t('noResults')} />
                  ) : (
                    filteredComplaints.map((c) => (
                      <tr key={c._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}><strong>{c.subject || c.title || 'Complaint'}</strong></td>
                        <td style={tdThStyle}>{c.category || '-'}</td>
                        <td style={tdThStyle}>
                          <span style={badgeStatus(c.status)}>
                            {translateStatus(c.status, t)}
                          </span>
                        </td>
                        <td style={tdThStyle}>{c.officerNote || c.reply || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button onClick={() => setComplaintDetails(c)} style={btnActionOutline}>
                              👁️ {t('view')}
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
                              style={btnActionOutline}
                            >
                              📝 {t('replyStatus')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </DataSection>
        )}

        {/* NOTICES / ANNOUNCEMENTS SECTION */}
        {activeSection === 'notices' && (
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
                onClick={() =>
                  setNoticeModal({ open: true, mode: 'create', data: null })
                }
                style={btnPrimary}
              >
                {t('createNotice')}
              </button>
            </Toolbar>

            <ResultCount count={filteredNotices.length} />

            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={thRowStyle(theme)}>
                    <th style={{ ...tdThStyle, width: '60px' }}>Image</th>
                    <th style={tdThStyle}>{t('noticeTitle')}</th>
                    <th style={tdThStyle}>{t('category')}</th>
                    <th style={tdThStyle}>{t('date')} & {t('time')}</th>
                    <th style={tdThStyle}>{t('location')}</th>
                    <th style={{ ...tdThStyle, textAlign: 'center' }}>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotices.length === 0 ? (
                    <EmptyTableRow colSpan="6" text={t('noResults')} />
                  ) : (
                    filteredNotices.map((n) => (
                      <tr key={n._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={tdThStyle}>
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              minWidth: '42px',
                              minHeight: '42px',
                              borderRadius: '8px',
                              backgroundColor: '#e2e8f0',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <img
                              src={n.image || 'https://images.unsplash.com/photo-1517649763962-0c6232662000?q=80&w=800&auto=format&fit=crop'}
                              alt={n.title || 'Announcement'}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="%2394a3b8"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/></svg>';
                              }}
                            />
                          </div>
                        </td>
                        <td style={tdThStyle}>
                          <strong>{n.title}</strong>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            {n.description ? `${n.description.slice(0, 50)}...` : ''}
                          </div>
                        </td>
                        <td style={tdThStyle}>
                          <span style={badgeStatus('Accepted')}>
                            {n.category || 'General'}
                          </span>
                        </td>
                        <td style={tdThStyle}>{n.date || '-'} {n.time ? `at ${n.time}` : ''}</td>
                        <td style={tdThStyle}>{n.location || '-'}</td>
                        <td style={{ ...tdThStyle, textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button
                              onClick={() =>
                                setNoticeModal({ open: true, mode: 'edit', data: n })
                              }
                              style={btnActionOutline}
                            >
                              {t('edit')}
                            </button>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  open: true,
                                  type: 'notice',
                                  id: n._id,
                                  name: n.title,
                                })
                              }
                              style={btnActionRed}
                            >
                              {t('delete')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </DataSection>
        )}
      </main>

      {/* VILLAGER MODAL */}
      {villagerModal.open && (
        <Modal
          theme={theme}
          onClose={() => setVillagerModal({ open: false, mode: 'create', data: null })}
        >
          <h3 style={modalHeading}>
            {villagerModal.mode === 'edit' ? t('edit') : t('addVillager')}
          </h3>
          <form onSubmit={handleSaveVillager}>
            <label style={labelStyle}>{t('fullName')}</label>
            <input
              type="text"
              name="fullName"
              defaultValue={villagerModal.data?.fullName || ''}
              required
              style={inputStyle(theme)}
            />
            <label style={labelStyle}>{t('nic')}</label>
            <input
              type="text"
              name="nic"
              defaultValue={villagerModal.data?.nic || ''}
              required
              style={inputStyle(theme)}
            />
            <label style={labelStyle}>{t('houseNumber')}</label>
            <input
              type="text"
              name="houseNumber"
              defaultValue={villagerModal.data?.houseNumber || ''}
              required
              style={inputStyle(theme)}
            />
            <label style={labelStyle}>{t('phone')}</label>
            <input
              type="text"
              name="phone"
              defaultValue={villagerModal.data?.phone || ''}
              style={inputStyle(theme)}
            />
            <label style={labelStyle}>{t('email')}</label>
            <input
              type="email"
              name="email"
              defaultValue={villagerModal.data?.email || ''}
              style={inputStyle(theme)}
            />
            <label style={labelStyle}>{t('address')}</label>
            <input
              type="text"
              name="address"
              defaultValue={villagerModal.data?.address || ''}
              style={inputStyle(theme)}
            />
            <label style={labelStyle}>{t('familyDetails')}</label>
            <textarea
              name="familyDetails"
              defaultValue={villagerModal.data?.familyDetails || ''}
              rows="3"
              style={{ ...inputStyle(theme), resize: 'vertical' }}
            />
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

      {/* VILLAGER DETAILS MODAL */}
      {villagerDetails && (
        <Modal theme={theme} onClose={() => setVillagerDetails(null)}>
          <h3 style={modalHeading}>👤 {t('villagerDetails')}</h3>
          <DetailRow label={t('fullName')} value={villagerDetails.fullName || villagerDetails.name || '-'} />
          <DetailRow label={t('nic')} value={villagerDetails.nic || '-'} />
          <DetailRow label={t('houseNumber')} value={villagerDetails.houseNumber || '-'} />
          <DetailRow label={t('phone')} value={villagerDetails.phone || villagerDetails.contact || '-'} />
          <DetailRow label={t('email')} value={villagerDetails.email || '-'} />
          <DetailRow label={t('address')} value={villagerDetails.address || '-'} />
          <DetailRow label={t('familyDetails')} value={villagerDetails.familyDetails || '-'} />
          <div style={modalActions}>
            <button onClick={() => setVillagerDetails(null)} style={btnActionOutline}>
              {t('close')}
            </button>
          </div>
        </Modal>
      )}

      {/* COMPLAINT DETAILS MODAL */}
      {complaintDetails && (
        <Modal theme={theme} onClose={() => setComplaintDetails(null)}>
          <h3 style={modalHeading}>📝 {t('complaintDetails')}</h3>
          <DetailRow label={t('subject')} value={complaintDetails.subject || complaintDetails.title || '-'} />
          <DetailRow label={t('category')} value={complaintDetails.category || '-'} />
          <DetailRow
            label={t('status')}
            value={
              <span style={badgeStatus(complaintDetails.status)}>
                {translateStatus(complaintDetails.status, t)}
              </span>
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
              }}
            >
              {complaintDetails.description || '-'}
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <label style={labelStyle}>{t('officerReply')}</label>
            <div
              style={{
                padding: '12px',
                borderRadius: '9px',
                backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                lineHeight: '1.6',
                fontSize: '13px',
              }}
            >
              {complaintDetails.officerNote || complaintDetails.reply || '-'}
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
            placeholder={
              lang === 'si'
                ? 'හමුවීම පිළිබඳ සටහනක් ඇතුළත් කරන්න...'
                : 'Enter an officer note...'
            }
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
          onClose={() =>
            setReplyModal({ open: false, complaint: null, reply: '', status: '' })
          }
        >
          <h3 style={modalHeading}>{t('replyStatus')}</h3>
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
            onChange={(e) => setReplyModal({ ...replyModal, reply: e.target.value })}
            style={{ ...inputStyle(theme), resize: 'vertical' }}
          />

          <div style={modalActions}>
            <button
              onClick={() =>
                setReplyModal({ open: false, complaint: null, reply: '', status: '' })
              }
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

      {/* NOTICE / ANNOUNCEMENT MODAL */}
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
                  defaultValue={noticeModal.data?.date || 'Oct 1, 2026'}
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
                  defaultValue={noticeModal.data?.time || '10:00 AM'}
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
              defaultValue={noticeModal.data?.image || 'https://images.unsplash.com/photo-1517649763962-0c6232662000?q=80&w=800&auto=format&fit=crop'}
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

      {/* HOVER CSS */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
          }

          @media (max-width: 850px) {
            form {
              grid-template-columns: 1fr !important;
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
   REUSABLE SUB-COMPONENTS
========================================================= */

const DashboardCard = ({ theme, icon, title, value, color, onClick }) => (
  <div
    onClick={onClick}
    className="hover-card"
    style={{
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      padding: '22px 24px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      cursor: 'pointer',
      boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)',
      border: theme === 'dark' ? '1px solid #334155' : '1px solid #f1f5f9',
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
  >
    <span
      style={{
        width: '54px',
        height: '54px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '26px',
        backgroundColor: `${color}15`,
      }}
    >
      {icon}
    </span>
    <div>
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: '500' }}>
        {title}
      </div>
      <strong style={{ fontSize: '28px', color, fontWeight: '800' }}>{value}</strong>
    </div>
  </div>
);

const QuickAction = ({ theme, icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="hover-card"
    style={{
      border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
      backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
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
  <section style={{ ...panelStyle(theme), marginBottom: '30px' }}>
    <h2 style={{ margin: '0 0 18px', fontSize: '20px' }}>{title}</h2>
    {children}
  </section>
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
  <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
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
      gridTemplateColumns: '130px 1fr',
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

/* =========================================================
   STYLE OBJECTS & HELPERS
========================================================= */

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
  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
  padding: '26px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.04)',
  border: theme === 'dark' ? '1px solid #334155' : '1px solid #f1f5f9',
});

const scheduleMiniCard = (theme) => ({
  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
  padding: '12px 14px',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
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
  border: '1px solid #bbf7d0',
  padding: '6px 10px',
  borderRadius: '7px',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
};

const btnActionRed = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  border: '1px solid #fecaca',
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
  maxWidth: '560px',
  boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
});

const modalActions = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px',
};

export default GNPortal;