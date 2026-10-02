import { useEffect, useState } from "react";



const API = "http://localhost:5000/api";



function FamilyPortal() {

  // ================= LOGIN USER =================

  const savedUser = localStorage.getItem("gramalk_user");

  const user = savedUser ? JSON.parse(savedUser) : {};



  // ================= PAGE STATES =================

  const [activeSection, setActiveSection] =

    useState("overview");



  const [theme, setTheme] = useState(

    localStorage.getItem("gramalk_theme") || "light"

  );



  const [lang, setLang] = useState(

    localStorage.getItem("gramalk_lang") || "si"

  );



  const [familyMembers, setFamilyMembers] =

    useState([]);



  const [appointments, setAppointments] =

    useState([]);



  const [loading, setLoading] = useState(true);



  const [message, setMessage] = useState("");



  // Member modal

  const [memberModal, setMemberModal] = useState({

    open: false,

    mode: "add",

    member: null,

  });



  // Delete confirmation

  const [deleteMember, setDeleteMember] =

    useState(null);



  // Appointment form

 const [appointmentForm, setAppointmentForm] =

  useState({

    memberId: "",

    provider: "GN Officer",

    date: "",

    time: "",

    purpose: "",

    description: "",

  });



  // ================= TRANSLATIONS =================

  const words = {

    en: {

      portalTitle: "Family Portal",

      overview: "Overview",

      familyMembers: "Family Members",

      appointments: "Appointments",

      logout: "Logout",



      welcome: "Welcome",

      household: "Household",

      totalMembers: "Total Members",

      adults: "Adults",

      children: "Children",

      upcoming: "Appointments",



      familyTitle: "Family Members",

      familySubtitle:

        "Manage the members registered under your household.",

      addMember: "+ Add Family Member",

      edit: "Edit",

      delete: "Delete",



      appointmentTitle: "Book an Appointment",

      appointmentSubtitle:

        "Request an appointment with a local officer.",

      selectMember: "Select Family Member",

      selectOfficer: "Select Officer",

      date: "Date",

      time: "Time",

      purpose: "Purpose",

      bookAppointment: "Request Appointment",

      myAppointments: "My Appointments",



      fullName: "Full Name",

      nic: "NIC",

      houseNumber: "House Number",

      phone: "Phone",

      email: "Email",

      gender: "Gender",

      dateOfBirth: "Date of Birth",

      occupation: "Occupation",

      maritalStatus: "Marital Status",

      role: "Role",

      relationship: "Relationship to Head",

      headNic: "Household Head NIC",

      address: "Address",

      familyDetails: "Family Details / Remarks",



      save: "Save Member",

      cancel: "Cancel",

      confirmDelete:

        "Are you sure you want to delete this family member?",



      pending: "Pending",

      accepted: "Accepted",

      declined: "Declined",



      noMembers: "No family members found.",

      noAppointments: "No appointments requested yet.",



      loading: "Loading Family Portal...",



      additionalDetails: "Additional Details",

        additionalPlaceholder: "Enter any additional information for the officer",

        officerNote: "Officer Note",



        pending: "Pending",

        accepted: "Accepted",

        declined: "Declined",

        completed: "Completed",

        cancelled: "Cancelled",



        gnOfficer: "GN Officer",

        midwife: "Public Health Midwife",

        phi: "Public Health Inspector",

    },



    si: {

      portalTitle: "පවුල් ද්වාරය",

      overview: "සාරාංශය",

      familyMembers: "පවුලේ සාමාජිකයින්",

      appointments: "හමුවීම්",

      logout: "පිටවීම",



      welcome: "ආයුබෝවන්",

      household: "නිවස",

      totalMembers: "මුළු සාමාජිකයින්",

      adults: "වැඩිහිටියන්",

      children: "ළමුන්",

      upcoming: "හමුවීම්",



      familyTitle: "පවුලේ සාමාජිකයින්",

      familySubtitle:

        "ඔබගේ නිවස යටතේ ලියාපදිංචි පවුලේ සාමාජිකයින් කළමනාකරණය කරන්න.",

      addMember: "+ සාමාජිකයෙකු එක්කරන්න",

      edit: "සංස්කරණය",

      delete: "මකන්න",



      appointmentTitle: "හමුවීමක් වෙන්කරන්න",

      appointmentSubtitle:

        "අදාළ නිලධාරියෙකු සමඟ හමුවීමක් ඉල්ලන්න.",

      selectMember: "පවුලේ සාමාජිකයා තෝරන්න",

      selectOfficer: "නිලධාරියා තෝරන්න",

      date: "දිනය",

      time: "වේලාව",

      purpose: "හමුවීමේ අරමුණ",

      bookAppointment: "හමුවීම ඉල්ලන්න",

      myAppointments: "මගේ හමුවීම්",



      fullName: "සම්පූර්ණ නම",

      nic: "හැඳුනුම්පත් අංකය",

      houseNumber: "නිවාස අංකය",

      phone: "දුරකථන අංකය",

      email: "විද්‍යුත් තැපෑල",

      gender: "ස්ත්‍රී / පුරුෂ භාවය",

      dateOfBirth: "උපන් දිනය",

      occupation: "රැකියාව",

      maritalStatus: "විවාහක තත්ත්වය",

      role: "භූමිකාව",

      relationship: "ගෘහ මූලිකයාට ඇති ඥාතීත්වය",

      headNic: "ගෘහ මූලිකයාගේ NIC",

      address: "ලිපිනය",

      familyDetails: "පවුලේ විස්තර / සටහන්",



      save: "සාමාජිකයා සුරකින්න",

      cancel: "අවලංගු කරන්න",

      confirmDelete:

        "මෙම පවුලේ සාමාජිකයා මකා දැමීමට අවශ්‍යද?",



      pending: "පොරොත්තුවෙන්",

      accepted: "පිළිගෙන ඇත",

      declined: "ප්‍රතික්ෂේප කර ඇත",



      noMembers: "පවුලේ සාමාජිකයින් හමු නොවීය.",

      noAppointments: "තවම හමුවීම් ඉල්ලා නැත.",



      loading: "පවුල් ද්වාරය පූරණය වෙමින්...",

      additionalDetails: "අමතර විස්තර",

        additionalPlaceholder: "නිලධාරියා සඳහා අමතර තොරතුරු ඇතුළත් කරන්න",

        officerNote: "නිලධාරියාගේ සටහන",



        pending: "පොරොත්තුවෙන්",

        accepted: "පිළිගන්නා ලදී",

        declined: "ප්‍රතික්ෂේප කරන ලදී",

        completed: "සම්පූර්ණයි",

        cancelled: "අවලංගුයි",



        gnOfficer: "ග්‍රාම නිලධාරී",

        midwife: "මහජන සෞඛ්‍ය පවුල් සෞඛ්‍ය සේවා නිලධාරිනී",

        phi: "මහජන සෞඛ්‍ය පරීක්ෂක",

    },



    ta: {

      portalTitle: "குடும்ப தளம்",

      overview: "சுருக்கம்",

      familyMembers: "குடும்ப உறுப்பினர்கள்",

      appointments: "சந்திப்புகள்",

      logout: "வெளியேறு",



      welcome: "வரவேற்கிறோம்",

      household: "வீடு",

      totalMembers: "மொத்த உறுப்பினர்கள்",

      adults: "பெரியவர்கள்",

      children: "குழந்தைகள்",

      upcoming: "சந்திப்புகள்",



      familyTitle: "குடும்ப உறுப்பினர்கள்",

      familySubtitle:

        "உங்கள் வீட்டில் பதிவு செய்யப்பட்ட குடும்ப உறுப்பினர்களை நிர்வகிக்கவும்.",

      addMember: "+ உறுப்பினரை சேர்க்கவும்",

      edit: "திருத்து",

      delete: "நீக்கு",



      appointmentTitle: "சந்திப்பை பதிவு செய்யவும்",

      appointmentSubtitle:

        "உள்ளூர் அதிகாரியுடன் சந்திப்பை கோரவும்.",

      selectMember: "குடும்ப உறுப்பினரை தேர்ந்தெடுக்கவும்",

      selectOfficer: "அதிகாரியை தேர்ந்தெடுக்கவும்",

      date: "தேதி",

      time: "நேரம்",

      purpose: "நோக்கம்",

      bookAppointment: "சந்திப்பை கோரவும்",

      myAppointments: "என் சந்திப்புகள்",



      fullName: "முழு பெயர்",

      nic: "அடையாள அட்டை எண்",

      houseNumber: "வீட்டு எண்",

      phone: "தொலைபேசி",

      email: "மின்னஞ்சல்",

      gender: "பாலினம்",

      dateOfBirth: "பிறந்த தேதி",

      occupation: "தொழில்",

      maritalStatus: "திருமண நிலை",

      role: "பங்கு",

      relationship: "குடும்பத் தலைவருடனான உறவு",

      headNic: "குடும்பத் தலைவர் NIC",

      address: "முகவரி",

      familyDetails: "குடும்ப விவரங்கள்",



      save: "சேமிக்கவும்",

      cancel: "ரத்து செய்",

      confirmDelete:

        "இந்த குடும்ப உறுப்பினரை நீக்க வேண்டுமா?",



      pending: "நிலுவையில்",

      accepted: "ஏற்றுக்கொள்ளப்பட்டது",

      declined: "நிராகரிக்கப்பட்டது",



      noMembers: "குடும்ப உறுப்பினர்கள் இல்லை.",

      noAppointments: "இன்னும் சந்திப்புகள் இல்லை.",



      loading: "குடும்ப தளம் ஏற்றப்படுகிறது...",

      additionalDetails: "கூடுதல் விவரங்கள்",

    additionalPlaceholder: "அதிகாரிக்கான கூடுதல் தகவல்களை உள்ளிடவும்",

    officerNote: "அதிகாரியின் குறிப்பு",



    pending: "நிலுவையில்",

    accepted: "ஏற்றுக்கொள்ளப்பட்டது",

    declined: "நிராகரிக்கப்பட்டது",

    completed: "முடிக்கப்பட்டது",

    cancelled: "ரத்து செய்யப்பட்டது",



    gnOfficer: "கிராம அலுவலர்",

    midwife: "பொது சுகாதார மருத்துவச்சி",

    phi: "பொது சுகாதார பரிசோதகர்",

    },

  };



  const t = (key) =>

    words[lang]?.[key] || words.en[key] || key;



  const darkMode = theme === "dark";



  // ================= API HELPER =================

  const apiRequest = async (url, options = {}) => {

    const token = localStorage.getItem("gramalk_token");



    const response = await fetch(url, {

      ...options,

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,

        ...(options.headers || {}),

      },

    });



    const data = await response.json();



    if (!response.ok) {

      throw new Error(

        data.message || "Request failed."

      );

    }



    return data;

  };



  // ================= LOAD DATA =================

  const loadFamilyData = async () => {

    try {

      setLoading(true);



      const [memberData, appointmentData] =

        await Promise.all([

          apiRequest(`${API}/family/members`),

          apiRequest(`${API}/family/appointments`),

        ]);



      setFamilyMembers(memberData.members || []);



      setAppointments(

        appointmentData.appointments || []

      );

    } catch (error) {

      console.error(error);

      setMessage(error.message);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    loadFamilyData();

  }, []);



  // ================= LANGUAGE =================

  const changeLanguage = (newLang) => {

    setLang(newLang);

    localStorage.setItem("gramalk_lang", newLang);

    document.documentElement.lang = newLang;

  };



  // ================= THEME =================

  const toggleTheme = () => {

    const next =

      theme === "dark" ? "light" : "dark";



    setTheme(next);

    localStorage.setItem("gramalk_theme", next);

  };



  // ================= LOGOUT =================

  const logout = () => {

    localStorage.removeItem("gramalk_token");

    localStorage.removeItem("gramalk_user");



    window.location.href = "/";

  };



  // ================= AGE =================

  const calculateAge = (dateOfBirth) => {

    if (!dateOfBirth) return null;



    const birthDate = new Date(dateOfBirth);



    if (Number.isNaN(birthDate.getTime())) {

      return null;

    }



    const today = new Date();



    let age =

      today.getFullYear() -

      birthDate.getFullYear();



    const month =

      today.getMonth() -

      birthDate.getMonth();



    if (

      month < 0 ||

      (month === 0 &&

        today.getDate() < birthDate.getDate())

    ) {

      age--;

    }



    return age;

  };



  const adults = familyMembers.filter((member) => {

    const age = calculateAge(member.dateOfBirth);



    return age !== null && age >= 18;

  }).length;



  const children =

    familyMembers.length - adults;



  // Household owner is taken from actual GN villager data

  const householdOwner =

    familyMembers.find(

      (member) =>

        member.relationshipToHead === "Self" ||

        member.role === "Head of Household"

    ) || familyMembers[0];



  // ================= SAVE MEMBER =================

  const saveMember = async (event) => {

    event.preventDefault();



    const formData = new FormData(event.target);



    const payload =

      Object.fromEntries(formData.entries());



    try {

      const isEdit =

        memberModal.mode === "edit";



      const memberId =

        memberModal.member?._id;



      await apiRequest(

        isEdit

          ? `${API}/family/members/${memberId}`

          : `${API}/family/members`,

        {

          method: isEdit ? "PUT" : "POST",

          body: JSON.stringify(payload),

        }

      );



      setMemberModal({

        open: false,

        mode: "add",

        member: null,

      });



      setMessage(

        isEdit

          ? "Family member updated successfully."

          : "Family member added successfully."

      );



      await loadFamilyData();

    } catch (error) {

      setMessage(error.message);

    }

  };



  // ================= DELETE MEMBER =================

  const confirmDeleteMember = async () => {

    if (!deleteMember) return;



    try {

      await apiRequest(

        `${API}/family/members/${deleteMember._id}`,

        {

          method: "DELETE",

        }

      );



      setDeleteMember(null);



      setMessage(

        "Family member deleted successfully."

      );



      await loadFamilyData();

    } catch (error) {

      setMessage(error.message);

    }

  };



  // ================= BOOK APPOINTMENT =================

  const bookAppointment = async (event) => {

    event.preventDefault();



    try {

      await apiRequest(

        `${API}/family/appointments`,

        {

          method: "POST",

          body: JSON.stringify(appointmentForm),

        }

      );



      setMessage(

        "Appointment request submitted successfully."

      );



      setAppointmentForm({

        memberId: "",

        provider: "GN Officer",

        date: "",

        time: "",

        purpose: "",

        description: "",

    });



      await loadFamilyData();

    } catch (error) {

      setMessage(error.message);

    }

  };



  // ================= COMMON COLORS =================

  const colors = {

    page: darkMode ? "#0b1120" : "#f3faf5",

    card: darkMode ? "#111827" : "#ffffff",

    soft: darkMode ? "#1e293b" : "#f7fbf8",

    border: darkMode ? "#1f2937" : "#e5ebe7",

    text: darkMode ? "#f1f5f9" : "#1e293b",

    muted: darkMode ? "#94a3b8" : "#64748b",

    green: "#15803d",

    lightGreen: darkMode

      ? "rgba(21,128,61,0.16)"

      : "#e9f8ee",

  };



  if (loading) {

    return (

      <div

        style={{

          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          background: colors.page,

          color: colors.text,

        }}

      >

        <strong>{t("loading")}</strong>

      </div>

    );

  }



  return (

    <div

      style={{

        minHeight: "100vh",

        background: colors.page,

        color: colors.text,

        fontFamily:

          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      }}

    >

      {/* ================= HEADER ================= */}

      <header

        style={{

          position: "sticky",

          top: 0,

          zIndex: 100,

          background: darkMode

            ? "rgba(17,24,39,0.94)"

            : "rgba(255,255,255,0.96)",

          borderBottom: `1px solid ${colors.border}`,

          backdropFilter: "blur(8px)",

        }}

      >

        <div

          style={{

            maxWidth: "1280px",

            margin: "auto",

            padding: "12px 20px",

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            gap: "15px",

            flexWrap: "wrap",

          }}

        >

          {/* Same GramaLK branding style */}

          <div

            style={{

              display: "flex",

              alignItems: "center",

              gap: "10px",

            }}

          >

            <img

              src="/images/logo.png"

              alt="GramaLK"

              style={{ height: "40px" }}

            />



            <div>

              <strong

                style={{

                  display: "block",

                  color: "#16a34a",

                  fontSize: "18px",

                }}

              >

                GramaLK

              </strong>



              <small style={{ color: colors.muted }}>

                {t("portalTitle")}

              </small>

            </div>

          </div>



          {/* Navigation */}

          <nav

            style={{

              display: "flex",

              gap: "6px",

              flexWrap: "wrap",

            }}

          >

            {[

              ["overview", t("overview")],

              ["family", t("familyMembers")],

              ["appointments", t("appointments")],

            ].map(([id, label]) => (

              <button

                key={id}

                onClick={() => setActiveSection(id)}

                style={{

                  padding: "8px 14px",

                  borderRadius: "10px",

                  border: "none",

                  cursor: "pointer",

                  fontWeight: "600",

                  background:

                    activeSection === id

                      ? colors.green

                      : "transparent",

                  color:

                    activeSection === id

                      ? "#ffffff"

                      : colors.text,

                }}

              >

                {label}

              </button>

            ))}

          </nav>



          <div

            style={{

              display: "flex",

              gap: "8px",

              alignItems: "center",

            }}

          >

            <select

              value={lang}

              onChange={(e) =>

                changeLanguage(e.target.value)

              }

              style={inputStyle(colors)}

            >

              <option value="en">English</option>

              <option value="si">සිංහල</option>

              <option value="ta">தமிழ்</option>

            </select>



            <button

              onClick={toggleTheme}

              style={smallButton(colors)}

            >

              {darkMode ? "☀️" : "🌙"}

            </button>



            <button

              onClick={logout}

              style={{

                ...smallButton(colors),

                color: "#ef4444",

              }}

            >

              {t("logout")}

            </button>

          </div>

        </div>

      </header>



      <main

        style={{

          maxWidth: "1280px",

          margin: "auto",

          padding: "30px 20px 60px",

        }}

      >

        {message && (

          <div

            style={{

              padding: "12px 16px",

              borderRadius: "10px",

              background: colors.lightGreen,

              color: darkMode

                ? "#86efac"

                : "#166534",

              marginBottom: "20px",

            }}

          >

            {message}

          </div>

        )}



        {/* ================= OVERVIEW ================= */}

        {activeSection === "overview" && (

          <>

            <section

              style={{

                ...cardStyle(colors),

                background: colors.lightGreen,

                marginBottom: "24px",

              }}

            >

              <small style={{ color: colors.muted }}>

                {t("household")} •{" "}

                {user.houseNumber}

              </small>



              <h1

                style={{

                  margin: "8px 0",

                  fontSize: "30px",

                }}

              >

                {t("welcome")},{" "}

                {householdOwner?.fullName ||

                  user.fullName ||

                  "Family"}

              </h1>



              <p

                style={{

                  margin: 0,

                  color: colors.muted,

                }}

              >

                {t("houseNumber")}:{" "}

                <strong>{user.houseNumber}</strong>

              </p>

            </section>



            <div

              style={{

                display: "grid",

                gridTemplateColumns:

                  "repeat(auto-fit,minmax(190px,1fr))",

                gap: "16px",

              }}

            >

              <StatCard

                title={t("totalMembers")}

                value={familyMembers.length}

                icon="👨‍👩‍👧‍👦"

                colors={colors}

              />



              <StatCard

                title={t("adults")}

                value={adults}

                icon="👤"

                colors={colors}

              />



              <StatCard

                title={t("children")}

                value={children}

                icon="🧒"

                colors={colors}

              />



              <StatCard

                title={t("upcoming")}

                value={appointments.length}

                icon="📅"

                colors={colors}

              />

            </div>

          </>

        )}



        {/* ================= FAMILY MEMBERS ================= */}

        {activeSection === "family" && (

          <section>

            <SectionHeading

              title={t("familyTitle")}

              subtitle={t("familySubtitle")}

              button={t("addMember")}

              onClick={() =>

                setMemberModal({

                  open: true,

                  mode: "add",

                  member: null,

                })

              }

            />



            {familyMembers.length === 0 ? (

              <div style={cardStyle(colors)}>

                {t("noMembers")}

              </div>

            ) : (

              <div

                style={{

                  display: "grid",

                  gridTemplateColumns:

                    "repeat(auto-fit,minmax(300px,1fr))",

                  gap: "16px",

                }}

              >

                {familyMembers.map((member) => (

                  <div

                    key={member._id}

                    style={cardStyle(colors)}

                  >

                    <div

                      style={{

                        display: "flex",

                        justifyContent:

                          "space-between",

                        gap: "10px",

                      }}

                    >

                      <div>

                        <h3

                          style={{

                            margin: "0 0 4px",

                          }}

                        >

                          {member.fullName}

                        </h3>



                        <span

                          style={{

                            color: colors.green,

                            fontSize: "13px",

                            fontWeight: "600",

                          }}

                        >

                          {member.relationshipToHead ||

                            member.role ||

                            "Family Member"}

                        </span>

                      </div>



                      <span

                        style={{

                          fontSize: "30px",

                        }}

                      >

                        👤

                      </span>

                    </div>



                    <div

                      style={{

                        marginTop: "18px",

                      }}

                    >

                      <Detail

                        label={t("nic")}

                        value={

                          member.nic ||

                          member.NIC ||

                          "-"

                        }

                        colors={colors}

                      />



                      <Detail

                        label={t("phone")}

                        value={member.phone || "-"}

                        colors={colors}

                      />



                      <Detail

                        label={t("occupation")}

                        value={

                          member.occupation || "-"

                        }

                        colors={colors}

                      />



                      <Detail

                        label={t("dateOfBirth")}

                        value={

                          member.dateOfBirth

                            ? new Date(

                                member.dateOfBirth

                              ).toLocaleDateString()

                            : "-"

                        }

                        colors={colors}

                      />

                    </div>



                    <div

                      style={{

                        display: "flex",

                        gap: "8px",

                        marginTop: "18px",

                      }}

                    >

                      <button

                        onClick={() =>

                          setMemberModal({

                            open: true,

                            mode: "edit",

                            member,

                          })

                        }

                        style={outlineButton(colors)}

                      >

                        ✏️ {t("edit")}

                      </button>



                      <button

                        onClick={() =>

                          setDeleteMember(member)

                        }

                        style={{

                          ...outlineButton(colors),

                          color: "#dc2626",

                        }}

                      >

                        🗑 {t("delete")}

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}



        {/* ================= APPOINTMENTS ================= */}

        {activeSection === "appointments" && (

          <section>

            <SectionHeading

              title={t("appointmentTitle")}

              subtitle={t("appointmentSubtitle")}

            />



            <div

              style={{

                display: "grid",

                gridTemplateColumns:

                  "repeat(auto-fit,minmax(320px,1fr))",

                gap: "20px",

              }}

            >

              <form

                onSubmit={bookAppointment}

                style={cardStyle(colors)}

              >

                <FormLabel text={t("selectMember")} />



                <select

                  required

                  value={appointmentForm.memberId}

                  onChange={(e) =>

                    setAppointmentForm({

                      ...appointmentForm,

                      memberId: e.target.value,

                    })

                  }

                  style={inputStyle(colors)}

                >

                  <option value="">

                    -- {t("selectMember")} --

                  </option>



                  {familyMembers.map((member) => (

                    <option

                      key={member._id}

                      value={member._id}

                    >

                      {member.fullName}

                    </option>

                  ))}

                </select>



                <FormLabel text={t("selectOfficer")} />



                <select

                  value={appointmentForm.provider}

                  onChange={(e) =>

                    setAppointmentForm({

                      ...appointmentForm,

                      provider: e.target.value,

                    })

                  }

                  style={inputStyle(colors)}

                >

                  <option value="GN Officer">

                    GN Officer

                  </option>



                  <option value="Public Health Midwife">

                    Public Health Midwife

                  </option>



                  <option value="PHI">

                    Public Health Inspector (PHI)

                  </option>

                </select>



                <FormLabel text={t("date")} />



                <input

                  required

                  type="date"

                  value={appointmentForm.date}

                  onChange={(e) =>

                    setAppointmentForm({

                      ...appointmentForm,

                      date: e.target.value,

                    })

                  }

                  style={inputStyle(colors)}

                />



                <FormLabel text={t("time")} />



                <input

                  required

                  type="time"

                  value={appointmentForm.time}

                  onChange={(e) =>

                    setAppointmentForm({

                      ...appointmentForm,

                      time: e.target.value,

                    })

                  }

                  style={inputStyle(colors)}

                />



                <FormLabel text={t("purpose")} />



                <textarea

                  required

                  rows="4"

                  value={appointmentForm.purpose}

                  onChange={(e) =>

                    setAppointmentForm({

                      ...appointmentForm,

                      purpose: e.target.value,

                    })

                  }

                  style={{

                    ...inputStyle(colors),

                    resize: "vertical",

                  }}

                />



                <FormLabel text={t("additionalDetails")} />



                <textarea

                    rows="4"

                    value={appointmentForm.description}

                    onChange={(e) =>

                        setAppointmentForm({

                        ...appointmentForm,

                        description: e.target.value,

                        })

                    }

                    placeholder={t("additionalPlaceholder")}

                    style={{

                        ...inputStyle(colors),

                        resize: "vertical",

                    }}

                />



                <button

                  type="submit"

                  style={{

                    ...primaryButton,

                    marginTop: "15px",

                  }}

                >

                  {t("bookAppointment")}

                </button>

              </form>



              <div>

                <h2 style={{ marginTop: 0,

                    marginBottom: "18px",

                    color: colors.green, }}>

                  {t("myAppointments")}

                </h2>



                {appointments.length === 0 ? (

                  <div style={cardStyle(colors)}>

                    {t("noAppointments")}

                  </div>

                ) : (

                  appointments.map((appointment) => (

                    <div

                        key={appointment._id}

                        style={{

                            ...cardStyle(colors),

                            marginBottom: "14px",

                            borderLeft: `4px solid ${colors.green}`,

                        }}

                    >

                      <strong>

                        {appointment.provider ||

                          "GN Officer"}

                      </strong>



                      <p

                        style={{

                          color: colors.muted,

                        }}

                      >

                        {appointment.villagerName}

                      </p>



                      <Detail

                        label={t("date")}

                        value={appointment.date}

                        colors={colors}

                      />



                      <Detail

                        label={t("time")}

                        value={appointment.time}

                        colors={colors}

                      />



                      <Detail

                        label={t("purpose")}

                        value={appointment.purpose}

                        colors={colors}

                      />



                      <div

                        style={{

                          marginTop: "12px",

                          color:

                            appointment.status ===

                            "Accepted"

                              ? "#16a34a"

                              : appointment.status ===

                                "Declined"

                              ? "#dc2626"

                              : "#d97706",

                          fontWeight: "700",

                        }}

                      >

                        {appointment.status ||

                          "Pending"}

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </section>

        )}

      </main>



      {/* ================= MEMBER ADD / EDIT MODAL ================= */}

      {memberModal.open && (

        <Modal colors={colors}>

          <form onSubmit={saveMember}>

            <h2>

              {memberModal.mode === "edit"

                ? t("edit")

                : t("addMember")}

            </h2>



            <div

              style={{

                display: "grid",

                gridTemplateColumns:

                  "repeat(auto-fit,minmax(210px,1fr))",

                gap: "12px",

              }}

            >

              <MemberInput

                name="fullName"

                label={t("fullName")}

                value={

                  memberModal.member?.fullName

                }

                required

                colors={colors}

              />



              <MemberInput

                name="nic"

                label={t("nic")}

                value={

                  memberModal.member?.nic ||

                  memberModal.member?.NIC

                }

                required

                colors={colors}

              />



              <MemberInput

                name="phone"

                label={t("phone")}

                value={memberModal.member?.phone}

                colors={colors}

              />



              <MemberInput

                name="email"

                type="email"

                label={t("email")}

                value={memberModal.member?.email}

                colors={colors}

              />



              <MemberSelect

                name="gender"

                label={t("gender")}

                value={

                  memberModal.member?.gender ||

                  "Female"

                }

                options={[

                  "Male",

                  "Female",

                  "Other",

                ]}

                colors={colors}

              />



              <MemberInput

                name="dateOfBirth"

                type="date"

                label={t("dateOfBirth")}

                value={

                  memberModal.member?.dateOfBirth

                    ? memberModal.member.dateOfBirth.slice(

                        0,

                        10

                      )

                    : ""

                }

                colors={colors}

              />



              <MemberInput

                name="occupation"

                label={t("occupation")}

                value={

                  memberModal.member?.occupation

                }

                colors={colors}

              />



              <MemberSelect

                name="maritalStatus"

                label={t("maritalStatus")}

                value={

                  memberModal.member

                    ?.maritalStatus || "Single"

                }

                options={[

                  "Single",

                  "Married",

                  "Divorced",

                  "Widowed",

                ]}

                colors={colors}

              />



              <MemberInput

                name="role"

                label={t("role")}

                value={

                  memberModal.member?.role ||

                  "Member"

                }

                colors={colors}

              />



              <MemberInput

                name="relationshipToHead"

                label={t("relationship")}

                value={

                  memberModal.member

                    ?.relationshipToHead || ""

                }

                colors={colors}

              />



              <MemberInput

                name="householdHeadNIC"

                label={t("headNic")}

                value={

                  memberModal.member

                    ?.householdHeadNIC || ""

                }

                colors={colors}

              />

            </div>



            <MemberInput

              name="address"

              label={t("address")}

              value={memberModal.member?.address}

              colors={colors}

            />



            <label style={labelStyle}>

              {t("familyDetails")}

            </label>



            <textarea

              name="familyDetails"

              rows="3"

              defaultValue={

                memberModal.member?.familyDetails ||

                ""

              }

              style={{

                ...inputStyle(colors),

                resize: "vertical",

              }}

            />



            <div

              style={{

                display: "flex",

                justifyContent: "flex-end",

                gap: "10px",

                marginTop: "20px",

              }}

            >

              <button

                type="button"

                onClick={() =>

                  setMemberModal({

                    open: false,

                    mode: "add",

                    member: null,

                  })

                }

                style={outlineButton(colors)}

              >

                {t("cancel")}

              </button>



              <button

                type="submit"

                style={primaryButton}

              >

                {t("save")}

              </button>

            </div>

          </form>

        </Modal>

      )}



      {/* DELETE CONFIRMATION */}

      {deleteMember && (

        <Modal colors={colors}>

          <h3>{t("confirmDelete")}</h3>



          <p>{deleteMember.fullName}</p>



          <div

            style={{

              display: "flex",

              justifyContent: "flex-end",

              gap: "10px",

            }}

          >

            <button

              onClick={() => setDeleteMember(null)}

              style={outlineButton(colors)}

            >

              {t("cancel")}

            </button>



            <button

              onClick={confirmDeleteMember}

              style={{

                ...primaryButton,

                background: "#dc2626",

              }}

            >

              {t("delete")}

            </button>

          </div>

        </Modal>

      )}

    </div>

  );

}



/* =========================================================

   SMALL REUSABLE COMPONENTS

\========================================================= */



function StatCard({ title, value, icon, colors }) {

  return (

    <div style={cardStyle(colors)}>

      <div style={{ fontSize: "28px" }}>{icon}</div>



      <div

        style={{

          color: colors.muted,

          marginTop: "12px",

          fontSize: "13px",

        }}

      >

        {title}

      </div>



      <strong

        style={{

          display: "block",

          fontSize: "28px",

          marginTop: "5px",

        }}

      >

        {value}

      </strong>

    </div>

  );

}



function SectionHeading({

  title,

  subtitle,

  button,

  onClick,

}) {

  return (

    <div

      style={{

        display: "flex",

        justifyContent: "space-between",

        gap: "15px",

        alignItems: "center",

        marginBottom: "20px",

        flexWrap: "wrap",

      }}

    >

      <div>

        <h1 style={{ margin: "0 0 5px", color: "#15803d" }}>

          {title}

        </h1>



        <span style={{ color: "#64748b" }}>

          {subtitle}

        </span>

      </div>



      {button && (

        <button

          onClick={onClick}

          style={primaryButton}

        >

          {button}

        </button>

      )}

    </div>

  );

}



function Detail({ label, value, colors }) {

  return (

    <div

      style={{

        display: "flex",

        justifyContent: "space-between",

        gap: "15px",

        padding: "8px 0",

        borderBottom: `1px solid ${colors.border}`,

        fontSize: "13px",

      }}

    >

      <span style={{ color: colors.muted }}>

        {label}

      </span>



      <strong style={{ textAlign: "right" }}>

        {value || "-"}

      </strong>

    </div>

  );

}



function FormLabel({ text }) {

  return (

    <label

      style={{

        display: "block",

        fontWeight: "600",

        fontSize: "13px",

        margin: "14px 0 6px",

      }}

    >

      {text}

    </label>

  );

}



function MemberInput({

  name,

  label,

  type = "text",

  value = "",

  required = false,

  colors,

}) {

  return (

    <div>

      <label style={labelStyle}>{label}</label>



      <input

        name={name}

        type={type}

        defaultValue={value || ""}

        required={required}

        style={inputStyle(colors)}

      />

    </div>

  );

}



function MemberSelect({

  name,

  label,

  value,

  options,

  colors,

}) {

  return (

    <div>

      <label style={labelStyle}>{label}</label>



      <select

        name={name}

        defaultValue={value}

        style={inputStyle(colors)}

      >

        {options.map((option) => (

          <option key={option} value={option}>

            {option}

          </option>

        ))}

      </select>

    </div>

  );

}



function Modal({ children, colors }) {

  return (

    <div

      style={{

        position: "fixed",

        inset: 0,

        zIndex: 1000,

        background: "rgba(15,23,42,0.65)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px",

        overflowY: "auto",

      }}

    >

      <div

        style={{

          width: "min(850px, 100%)",

          maxHeight: "90vh",

          overflowY: "auto",

          background: colors.card,

          color: colors.text,

          borderRadius: "16px",

          padding: "24px",

          border: `1px solid ${colors.border}`,

          boxShadow:

            "0 20px 60px rgba(0,0,0,0.25)",

        }}

      >

        {children}

      </div>

    </div>

  );

}



/* =========================================================

   STYLES

\========================================================= */



const labelStyle = {

  display: "block",

  fontWeight: "600",

  fontSize: "12px",

  margin: "10px 0 5px",

};



const primaryButton = {

  border: "none",

  background: "#15803d",

  color: "#ffffff",

  padding: "10px 16px",

  borderRadius: "9px",

  cursor: "pointer",

  fontWeight: "600",

};



const cardStyle = (colors) => ({
  background: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  padding: "20px",
  boxShadow:
    colors.page === "#0b1120"
      ? "0 8px 22px rgba(0,0,0,0.22)"
      : "0 8px 22px rgba(15, 80, 40, 0.09), 0 2px 6px rgba(15, 23, 42, 0.05)",
});



const inputStyle = (colors) => ({

  width: "100%",

  boxSizing: "border-box",

  padding: "10px 11px",

  borderRadius: "8px",

  border: `1px solid ${colors.border}`,

  background: colors.soft,

  color: colors.text,

  outline: "none",

});



const smallButton = (colors) => ({

  border: `1px solid ${colors.border}`,

  background: colors.card,

  color: colors.text,

  padding: "8px 10px",

  borderRadius: "8px",

  cursor: "pointer",

});



const outlineButton = (colors) => ({

  border: `1px solid ${colors.border}`,

  background: "transparent",

  color: colors.text,

  padding: "8px 12px",

  borderRadius: "8px",

  cursor: "pointer",

  fontWeight: "600",

});



export default FamilyPortal;