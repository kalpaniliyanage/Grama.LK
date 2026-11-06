import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BG_IMAGE_URL =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop";

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
  label: { fontSize: 13, fontWeight: 600, color: "#a7f3d0" },
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
    minWidth: 650,
  },
  cell: {
    textAlign: "left",
    padding: 14,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: 14,
    color: "#f1f5f9",
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
    background: "rgba(20, 40, 34, 0.95)",
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
    border: "3px solid #10b981",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
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
    background: "rgba(20, 40, 34, 0.85)",
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
  { id: "requests", label: "📋 Health Requests" },
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
    text = `${years} yrs ${remMonths} mos`;
  } else {
    text = `${months} mos`;
  }

  return { months, years, text };
}

function Field({ label, value, onChange, type = "text", required = false, disabled = false, placeholder = "" }) {
  return (
    <label style={styles.label}>
      {label}
      <input
        style={{
          ...styles.input,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "text",
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
      setMembers(membersRes);

      if (authenticatedRole === "PHM") {
        const mothersRes = await apiRequest("/api/mothers").catch(() => []);
        const childrenRes = await apiRequest("/api/children").catch(() => []);
        const requestsRes = await apiRequest("/api/requests").catch(() => []);

        setMothers(mothersRes);
        setChildren(childrenRes);
        setRequests(requestsRes);
      } else if (authenticatedRole === "PHI") {
        const estRes = await apiRequest("/api/establishments").catch(() => []);
        setEstablishments(estRes);
      }

      const annRes = await apiRequest(`/api/announcements?role=${authenticatedRole}`).catch(() => []);
      setAnnouncements(annRes);
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
      const fallbackUser = {
        fullName: authenticatedRole === "PHI" ? "නිමල් ජයසිංහ (PHI)" : "සුනේත්‍රා රණසිංහ (PHM)",
        email: authenticatedRole === "PHI" ? "phi.officer@gramalk.lk" : "phm.officer@gramalk.lk",
        phone: "0771234567",
        houseNumber: "HN-102",
        photoUrl: "",
      };
      setProfile(fallbackUser);
      setProfileForm(fallbackUser);
    }
  }, [authenticatedRole]);

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
      await apiRequest("/api/me", { method: "PUT", body: JSON.stringify(profileForm) });
      setProfile({ ...profile, ...profileForm });
      setMessage("Profile එක සාර්ථකව යාවත්කාලීන විය!");
    } catch (err) {
      setProfile({ ...profile, ...profileForm });
      setMessage("Profile එක යාවත්කාලීන විය!");
    } finally {
      setIsEditingProfile(false);
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
      <div style={styles.loginWrapper}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ color: "#a7f3d0", margin: 0, fontSize: 34, fontWeight: 800 }}>🏥 GramaLK Health Portal</h1>
          <p style={{ color: "#cbd5e1", marginTop: 8 }}>කරුණාකර ඔබගේ නිලධාරී ගිණුම තෝරා ඇතුළු වන්න.</p>
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
              <Field label="Username" value={phiUser} onChange={setPhiUser} required />
              <Field label="Password" type="password" value={phiPass} onChange={setPhiPass} required />
              <button type="submit" style={{ ...styles.button, width: "100%", marginTop: 10 }}>Login as PHI</button>
            </form>
          </div>

          <div style={styles.loginCard} {...hoverProps}>
            <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>👩‍⚕️ PHM Login</h2>
            <p style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 20 }}>Public Health Midwife (පවුල් සෞඛ්‍ය නිලධාරිනී)</p>
            <form onSubmit={handlePhmLogin}>
              <Field label="Username" value={phmUser} onChange={setPhmUser} required />
              <Field label="Password" type="password" value={phmPass} onChange={setPhmPass} required />
              <button type="submit" style={{ ...styles.button, width: "100%", marginTop: 10 }}>Login as PHM</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
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

        <button type="button" style={styles.logoutButton} onClick={handleLogout}>
          ↪ Logout
        </button>
      </header>

      <div style={styles.layout}>
        <aside style={styles.sidebar}>
          <h3 style={{ margin: "0 8px 16px", color: "#a7f3d0", fontSize: 15, textTransform: "uppercase" }}>Navigation</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                setActiveSection(section.id);
                if (section.id === "profile") loadProfile();
              }}
              style={{
                ...styles.navButton,
                background: activeSection === section.id ? "rgba(167, 243, 208, 0.2)" : "transparent",
                color: activeSection === section.id ? "#a7f3d0" : "#cbd5e1",
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

          {/* PHI DASHBOARD */}
          {authenticatedRole === "PHI" && activeSection === "dashboard" && (
            <div style={styles.card} {...hoverProps}>
              <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>📊 PHI Operational Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18, marginTop: 16 }}>
                <div style={{ background: "rgba(255, 255, 255, 0.06)", padding: 20, borderRadius: 16, border: "1px solid rgba(167, 243, 208, 0.2)" }}>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>🏨 Establishments</p>
                  <strong style={{ fontSize: 32, color: "#a7f3d0" }}>{establishments.length}</strong>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.06)", padding: 20, borderRadius: 16, border: "1px solid rgba(167, 243, 208, 0.2)" }}>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>📢 Announcements</p>
                  <strong style={{ fontSize: 32, color: "#facc15" }}>{announcements.length}</strong>
                </div>
              </div>
            </div>
          )}

          {/* PHI - HOTELS & RESTAURANTS */}
          {authenticatedRole === "PHI" && activeSection === "establishments" && (
            <div style={styles.card} {...hoverProps}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <h2>🏨 Hotels & Restaurants Records Management</h2>
                <button type="button" style={styles.button} onClick={() => { setEstForm({ id: null, name: "", type: "Restaurant", owner: "", status: "Grade A", phone: "" }); setIsEditingEst(false); setShowEstModal(true); }}>
                  ➕ Add New Establishment
                </button>
              </div>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.cell}>Name</th>
                      <th style={styles.cell}>Type</th>
                      <th style={styles.cell}>Owner</th>
                      <th style={styles.cell}>Phone</th>
                      <th style={styles.cell}>Status</th>
                      <th style={styles.cell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {establishments.map((est) => (
                      <tr key={est._id || est.id}>
                        <td style={styles.cell}><strong>{est.name}</strong></td>
                        <td style={styles.cell}>{est.type}</td>
                        <td style={styles.cell}>{est.owner}</td>
                        <td style={styles.cell}>{est.phone || "N/A"}</td>
                        <td style={styles.cell}>
                          <span style={{ padding: "4px 10px", borderRadius: 8, background: est.status.includes("Grade A") ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)", color: est.status.includes("Grade A") ? "#a7f3d0" : "#fca5a5" }}>
                            {est.status}
                          </span>
                        </td>
                        <td style={styles.cell}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button type="button" style={{ ...styles.secondaryBtn, padding: "5px 10px", fontSize: 12 }} onClick={() => { setEstForm(est); setIsEditingEst(true); setShowEstModal(true); }}>✏️ Edit</button>
                            <button type="button" style={styles.dangerBtn} onClick={() => handleDeleteEst(est._id || est.id)}>🗑️ Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PHM DASHBOARD */}
          {authenticatedRole === "PHM" && activeSection === "dashboard" && (
            <div style={styles.card} {...hoverProps}>
              <h2 style={{ color: "#a7f3d0", marginTop: 0 }}>📊 PHM Health Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18, marginTop: 16 }}>
                <div style={{ background: "rgba(255, 255, 255, 0.06)", padding: 20, borderRadius: 16, border: "1px solid rgba(167, 243, 208, 0.2)" }}>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>👩 Registered Mothers</p>
                  <strong style={{ fontSize: 32, color: "#a7f3d0" }}>{mothers.length}</strong>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.06)", padding: 20, borderRadius: 16, border: "1px solid rgba(167, 243, 208, 0.2)" }}>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>👶 Registered Children</p>
                  <strong style={{ fontSize: 32, color: "#38bdf8" }}>{children.length}</strong>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.06)", padding: 20, borderRadius: 16, border: "1px solid rgba(167, 243, 208, 0.2)" }}>
                  <p style={{ margin: 0, color: "#cbd5e1" }}>📋 Health Requests</p>
                  <strong style={{ fontSize: 32, color: "#facc15" }}>{requests.length}</strong>
                </div>
              </div>
            </div>
          )}

          {/* MOTHERS SECTION (PHM) */}
          {authenticatedRole === "PHM" && activeSection === "mothers" && (
            <div style={styles.card} {...hoverProps}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2>👩 Registered Mothers Records</h2>
                <button type="button" style={styles.button} onClick={() => { setMotherForm({ id: null, memberId: "", name: "", nic: "", dob: "", phone: "", pregnancyMonths: "", address: "" }); setIsEditingMother(false); setShowMotherModal(true); }}>
                  ➕ Register New Mother
                </button>
              </div>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.cell}>Name</th>
                      <th style={styles.cell}>NIC</th>
                      <th style={styles.cell}>Birth Date (BD)</th>
                      <th style={styles.cell}>Pregnancy Status</th>
                      <th style={styles.cell}>Phone</th>
                      <th style={styles.cell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mothers.map((m) => (
                      <tr key={m._id || m.id}>
                        <td style={styles.cell}><strong>{m.name}</strong></td>
                        <td style={styles.cell}>{m.nic}</td>
                        <td style={styles.cell}>{m.dob || "N/A"}</td>
                        <td style={styles.cell}>
                          <span style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(16, 185, 129, 0.25)", color: "#a7f3d0" }}>
                            {m.pregnancyMonths ? `${m.pregnancyMonths} Months` : "N/A"}
                          </span>
                        </td>
                        <td style={styles.cell}>{m.phone}</td>
                        <td style={styles.cell}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button type="button" style={{ ...styles.secondaryBtn, padding: "5px 10px", fontSize: 12 }} onClick={() => { setMotherForm(m); setIsEditingMother(true); setShowMotherModal(true); }}>✏️ Edit</button>
                            <button type="button" style={styles.dangerBtn} onClick={() => handleDeleteMother(m._id || m.id)}>🗑️ Delete</button>
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
            <div style={styles.card} {...hoverProps}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2>👶 Children Health Records (Infants & 1 Month - 10 Years)</h2>
                <button type="button" style={styles.button} onClick={() => { setChildForm({ id: null, childName: "", motherNic: "", dob: "", weight: "", vaccineStatus: "Up to Date" }); setIsEditingChild(false); setShowChildModal(true); }}>
                  ➕ Add New Child Record
                </button>
              </div>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.cell}>Child Name</th>
                      <th style={styles.cell}>Mother's NIC / Name</th>
                      <th style={styles.cell}>Birth Date (BD)</th>
                      <th style={styles.cell}>Calculated Age</th>
                      <th style={styles.cell}>Weight</th>
                      <th style={styles.cell}>Vaccine Status</th>
                      <th style={styles.cell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map((c) => {
                      const matchedMother = mothers.find((m) => m.nic === c.motherNic);
                      const ageInfo = calculateAge(c.dob);
                      return (
                        <tr key={c._id || c.id}>
                          <td style={styles.cell}><strong>{c.childName}</strong></td>
                          <td style={styles.cell}>{matchedMother ? `${matchedMother.name} (${c.motherNic})` : c.motherNic || "N/A"}</td>
                          <td style={styles.cell}>{c.dob}</td>
                          <td style={styles.cell}>
                            <span style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.1)", color: "#a7f3d0" }}>
                              {ageInfo.text} {ageInfo.months < 12 ? "(Infant)" : ""}
                            </span>
                          </td>
                          <td style={styles.cell}>{c.weight} kg</td>
                          <td style={styles.cell}>
                            <span style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(56, 189, 248, 0.25)", color: "#38bdf8" }}>
                              {c.vaccineStatus}
                            </span>
                          </td>
                          <td style={styles.cell}>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button type="button" style={{ ...styles.secondaryBtn, padding: "5px 10px", fontSize: 12 }} onClick={() => { setChildForm(c); setIsEditingChild(true); setShowChildModal(true); }}>✏️ Edit</button>
                              <button type="button" style={styles.dangerBtn} onClick={() => handleDeleteChild(c._id || c.id)}>🗑️ Delete</button>
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
              <div style={styles.card} {...hoverProps}>
                <h2>📢 {isEditingAnnouncement ? "Edit Announcement" : `Publish New Announcement (${authenticatedRole})`}</h2>
                <form onSubmit={handleSaveAnnouncement}>
                  <Field 
                    label="Announcement Photo / Image URL (Optional)" 
                    value={announcementForm.imageUrl} 
                    onChange={(v) => setAnnouncementForm({ ...announcementForm, imageUrl: v })} 
                    placeholder="Paste image URL here..." 
                  />
                  <Field 
                    label="Title" 
                    value={announcementForm.title} 
                    onChange={(v) => setAnnouncementForm({ ...announcementForm, title: v })} 
                    required 
                  />
                  <label style={styles.label}>
                    Details
                    <textarea
                      style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      required
                    />
                  </label>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button style={styles.button} type="submit">
                      {isEditingAnnouncement ? "💾 Update Announcement" : "📢 Publish Announcement"}
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
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div style={styles.card} {...hoverProps}>
                <h2>📌 Published Announcements ({authenticatedRole})</h2>
                
                <div style={styles.announcementGrid}>
                  {announcements.map((item) => (
                    <div key={item._id || item.id} style={styles.announcementPublicCard}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={styles.announcementImage} />
                      ) : (
                        <div style={{ ...styles.announcementImage, background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a7f3d0", fontSize: 24 }}>
                          📢
                        </div>
                      )}

                      <div style={styles.announcementCardBody}>
                        <span style={{ fontSize: 11, background: "rgba(16, 185, 129, 0.2)", color: "#a7f3d0", padding: "2px 8px", borderRadius: 6, fontWeight: 600, width: "fit-content" }}>
                          {item.role || authenticatedRole}
                        </span>
                        <h3 style={{ margin: "4px 0", color: "#fff", fontSize: 18 }}>{item.title}</h3>
                        <p style={{ color: "#cbd5e1", margin: 0, fontSize: 13, flex: 1, whiteSpace: "pre-wrap" }}>{item.content}</p>
                        
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10, marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <small style={{ color: "#94a3b8", fontSize: 12 }}>📅 Date: {item.createdAt ? new Date(item.createdAt).toISOString().slice(0, 10) : "Recent"}</small>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button type="button" style={{ ...styles.secondaryBtn, padding: "4px 8px", fontSize: 11 }} onClick={() => { setAnnouncementForm(item); setIsEditingAnnouncement(true); }}>
                              ✏️ Edit
                            </button>
                            <button type="button" style={{ ...styles.dangerBtn, padding: "4px 8px", fontSize: 11 }} onClick={() => handleDeleteAnnouncement(item._id || item.id)}>
                              🗑️ Delete
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
            <div style={styles.card} {...hoverProps}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2>👤 Profile Settings ({authenticatedRole})</h2>
                {!isEditingProfile && (
                  <button type="button" style={styles.button} onClick={() => setIsEditingProfile(true)}>
                    ✏️ Edit Profile
                  </button>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
                <div style={styles.avatarContainer}>
                  {profileForm.photoUrl ? (
                    <img src={profileForm.photoUrl} alt="Officer Profile" style={styles.avatar} />
                  ) : (
                    <div style={{ ...styles.avatar, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#a7f3d0" }}>
                      👤
                    </div>
                  )}

                  <div style={styles.cameraBadge} title="Change or Edit Photo" onClick={() => setShowPhotoModal(true)}>
                    📷
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: 0, color: "#a7f3d0", fontSize: 20 }}>{profileForm.fullName || "Officer Profile"}</h3>
                  <p style={{ margin: "4px 0 8px 0", color: "#cbd5e1", fontSize: 13 }}>{authenticatedRole === "PHI" ? "Public Health Inspector" : "Public Health Midwife"}</p>
                </div>
              </div>

              {profile && !isEditingProfile ? (
                <div style={{ marginTop: 16, lineHeight: "1.8" }}>
                  <p><strong>Full Name:</strong> {profile.fullName}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>House Number / ID:</strong> {profile.houseNumber}</p>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile}>
                  <Field label="Full Name" value={profileForm.fullName} onChange={(v) => setProfileForm({ ...profileForm, fullName: v })} required />
                  <Field label="Email Address" value={profileForm.email} onChange={(v) => setProfileForm({ ...profileForm, email: v })} required />
                  <Field label="Phone Number" value={profileForm.phone} onChange={(v) => setProfileForm({ ...profileForm, phone: v })} required />
                  <Field label="House Number / Official ID" value={profileForm.houseNumber} onChange={(v) => setProfileForm({ ...profileForm, houseNumber: v })} />
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    <button type="submit" style={styles.button}>💾 Save Profile</button>
                    <button type="button" style={styles.secondaryBtn} onClick={() => setIsEditingProfile(false)}>Cancel</button>
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
              <label style={styles.label}>
                Select Member (System Database Integration)
                <select style={styles.input} onChange={(e) => handleSelectMemberForMother(e.target.value)}>
                  <option value="">-- Choose Existing Female Member --</option>
                  {members
                    .filter((m) => {
                      const gender = (m.gender || m.sex || "").toLowerCase();
                      return gender === "female" || gender === "f" || gender === "කාන්තා";
                    })
                    .map((m) => (
                      <option key={m._id || m.id} value={m._id || m.id}>
                        {m.fullName || m.name} ({m.nic || m.houseNumber})
                      </option>
                    ))}
                </select>
              </label>
              <Field label="Full Name" value={motherForm.name} onChange={(v) => setMotherForm({ ...motherForm, name: v })} required />
              <Field label="NIC Number" value={motherForm.nic} onChange={(v) => setMotherForm({ ...motherForm, nic: v })} required />
              <Field label="Birth Date (BD)" type="date" value={motherForm.dob} onChange={(v) => setMotherForm({ ...motherForm, dob: v })} required />
              <Field label="Pregnancy Status (Months/මාස ගණන)" type="number" value={motherForm.pregnancyMonths} onChange={(v) => setMotherForm({ ...motherForm, pregnancyMonths: v })} placeholder="e.g. 5" />
              <Field label="Phone Number" value={motherForm.phone} onChange={(v) => setMotherForm({ ...motherForm, phone: v })} required />
              <Field label="Address" value={motherForm.address} onChange={(v) => setMotherForm({ ...motherForm, address: v })} required />
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
              <label style={styles.label}>
                Select Child from Members (1 Month - 10 Years) or Leave Blank for Infants (&lt; 1 Month)
                <select style={styles.input} onChange={(e) => handleSelectMemberForChild(e.target.value)}>
                  <option value="">-- Select from Existing Members (1m - 10y) --</option>
                  {childMembersFilter.map((cm) => (
                    <option key={cm._id || cm.id} value={cm._id || cm.id}>
                      {cm.fullName || cm.name} ({calculateAge(cm.dob || cm.birthDate).text})
                    </option>
                  ))}
                </select>
              </label>

              <Field 
                label="Child Full Name" 
                value={childForm.childName} 
                onChange={(v) => setChildForm({ ...childForm, childName: v })} 
                required 
              />

              <label style={styles.label}>
                Select Mother (Mother's NIC)
                <select 
                  style={styles.input} 
                  value={childForm.motherNic} 
                  onChange={(e) => setChildForm({ ...childForm, motherNic: e.target.value })} 
                  required
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
              />

              <Field 
                label="Weight (kg)" 
                value={childForm.weight} 
                onChange={(v) => setChildForm({ ...childForm, weight: v })} 
                required 
              />

              <Field 
                label="Vaccine Status" 
                value={childForm.vaccineStatus} 
                onChange={(v) => setChildForm({ ...childForm, vaccineStatus: v })} 
                placeholder="e.g. Up to Date / BCG Done" 
                required 
              />

              <Field 
                label="Recently Administered Vaccine (ලඟදි ගහපු Vaccine එක)" 
                value={childForm.latestVaccine} 
                onChange={(v) => setChildForm({ ...childForm, latestVaccine: v })} 
                placeholder="e.g. MMR, DTaP, OPV" 
              />

              <Field 
                label="Vaccination Date (එක ගහපු දිනය)" 
                type="date" 
                value={childForm.vaccineDate} 
                onChange={(v) => setChildForm({ ...childForm, vaccineDate: v })} 
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
              <Field label="Establishment Name" value={estForm.name} onChange={(v) => setEstForm({ ...estForm, name: v })} required />
              <label style={styles.label}>
                Type
                <select style={styles.input} value={estForm.type} onChange={(e) => setEstForm({ ...estForm, type: e.target.value })}>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Food Store">Food Store</option>
                </select>
              </label>
              <Field label="Owner Name" value={estForm.owner} onChange={(v) => setEstForm({ ...estForm, owner: v })} required />
              <Field label="Contact Phone" value={estForm.phone} onChange={(v) => setEstForm({ ...estForm, phone: v })} />
              <label style={styles.label}>
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