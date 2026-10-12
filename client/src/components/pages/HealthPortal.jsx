
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f3f7f6",
    color: "#183b36",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#087f6b",
    color: "#fff",
    padding: "20px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "220px minmax(0, 1fr)",
    gap: 20,
    padding: 20,
    maxWidth: 1400,
    margin: "0 auto",
  },
  sidebar: {
    background: "#fff",
    padding: 14,
    borderRadius: 14,
    height: "fit-content",
    boxShadow: "0 3px 15px #163d3610",
  },
  content: { minWidth: 0 },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 3px 15px #163d3610",
    marginBottom: 18,
  },
  button: {
    border: 0,
    borderRadius: 9,
    padding: "11px 15px",
    cursor: "pointer",
    fontWeight: 600,
    background: "#087f6b",
    color: "#fff",
  },
  logoutButton: {
    border: 0,
    borderRadius: 9,
    padding: "11px 16px",
    cursor: "pointer",
    fontWeight: 700,
    background: "#fff",
    color: "#b42318",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 11,
    border: "1px solid #d6e2df",
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 13,
    fontSize: 14,
  },
  label: { fontSize: 14, fontWeight: 600 },
  navButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "12px 10px",
    marginBottom: 5,
    border: 0,
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },
  tableWrap: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 560,
  },
  cell: {
    textAlign: "left",
    padding: 12,
    borderBottom: "1px solid #e7efed",
    fontSize: 14,
  },
};

const sections = [
  { id: "dashboard", label: "🏠 Dashboard" },
  { id: "mothers", label: "👩 Mothers" },
  { id: "requests", label: "📋 Requests" },
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

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Your session has expired. Please log in again.");
    }

    if (response.status === 403) {
      throw new Error("You do not have permission to access this feature.");
    }

    if (response.status === 404) {
      throw new Error(
        `API route not found: ${path}. Please check the backend routes.`
      );
    }

    throw new Error(
      result.message ||
        result.error ||
        `Request failed (${response.status})`
    );
  }

  return result;
}

function getList(result, key) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.[key])) return result[key];
  if (Array.isArray(result?.data)) return result.data;
  return [];
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <label style={styles.label}>
      {label}
      <input
        style={styles.input}
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function HealthPortal() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [mothers, setMothers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/api/health-portal/dashboard");

      setMothers(getList(result, "mothers"));
      setRequests(getList(result, "requests"));
      setAnnouncements(getList(result, "announcements"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/api/health-portal/requests");
      setRequests(getList(result, "requests"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/api/me");
      const user = result.user || result.data || result;

      setProfile(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      setError("Please log in to access the Health Portal.");
      return;
    }

    loadDashboard();
  }, [loadDashboard]);

  function changeSection(section) {
    setActiveSection(section);
    setSearch("");
    setError("");
    setMessage("");

    if (section === "dashboard" || section === "mothers") {
      loadDashboard();
    } else if (section === "requests") {
      loadRequests();
    } else if (section === "announcements") {
      loadDashboard();
    } else if (section === "profile") {
      loadProfile();
    }
  }

  function handleLogout() {
    // Clear common login-token keys.
    [
      "token",
      "authToken",
      "gramalkToken",
      "user",
      "currentUser",
      "loggedInUser",
    ].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // Return to the application's main route.
    navigate("/", { replace: true });
  }

  async function updateRequestStatus(requestId, status) {
    setError("");
    setMessage("");

    try {
      await apiRequest(
        `/api/health-portal/requests/${requestId}`,
        {
          method: "PUT",
          body: JSON.stringify({ status }),
        }
      );

      setMessage("Request status updated successfully.");
      await loadRequests();
    } catch (err) {
      setError(err.message);
    }
  }

  async function addAnnouncement(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await apiRequest("/api/health-portal/announcements", {
        method: "POST",
        body: JSON.stringify({
          title: announcementForm.title,
          message: announcementForm.content,
        }),
      });

      setAnnouncementForm({ title: "", content: "" });
      setMessage("Announcement published successfully.");
      await loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredMothers = mothers.filter((mother) => {
    const searchable = [
      mother.name,
      mother.fullName,
      mother.villagerName,
      mother.nic,
      mother.phone,
      mother.address,
      mother.houseNumber,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(search.toLowerCase());
  });

  const pendingRequests = requests.filter(
    (item) =>
      String(item.status || "Pending").toLowerCase() === "pending"
  ).length;

  const displayName =
    profile?.fullName ||
    profile?.name ||
    profile?.username ||
    "Health Officer";

  const displayAnnouncement = (item) =>
    item.message || item.content || item.description || "";

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div>
          <h1 style={{ margin: 0, fontSize: 25 }}>Health Portal</h1>
          <p style={{ margin: "7px 0 0", opacity: 0.9 }}>
            GramaLK · Health Services Management
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>👤 {displayName}</span>

          <button
            type="button"
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </header>

      <div style={styles.layout} className="health-portal-layout">
        <aside style={styles.sidebar}>
          <h3 style={{ margin: "8px 10px 16px" }}>
            Health Services
          </h3>

          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => changeSection(section.id)}
              style={{
                ...styles.navButton,
                background:
                  activeSection === section.id
                    ? "#dff5ef"
                    : "transparent",
                color:
                  activeSection === section.id
                    ? "#087f6b"
                    : "#425d57",
                fontWeight:
                  activeSection === section.id ? 700 : 500,
              }}
            >
              {section.label}
            </button>
          ))}

          <button
            type="button"
            style={{
              ...styles.navButton,
              marginTop: 12,
              background: "#f1f5f4",
            }}
            onClick={() => {
              if (activeSection === "profile") {
                loadProfile();
              } else if (activeSection === "requests") {
                loadRequests();
              } else {
                loadDashboard();
              }
            }}
          >
            ↻ Refresh data
          </button>
        </aside>

        <main style={styles.content}>
          {loading && (
            <div style={styles.card}>
              Loading Health Portal data...
            </div>
          )}

          {error && (
            <div
              role="alert"
              style={{
                ...styles.card,
                background: "#fff1f0",
                color: "#a12622",
                border: "1px solid #ffd2cf",
              }}
            >
              <strong>Could not complete the operation</strong>
              <p style={{ marginBottom: 0 }}>{error}</p>

              {error.includes("log in") && (
                <button
                  type="button"
                  style={{ ...styles.button, marginTop: 12 }}
                  onClick={() => navigate("/", { replace: true })}
                >
                  Go to Login
                </button>
              )}
            </div>
          )}

          {message && (
            <div
              role="status"
              style={{
                ...styles.card,
                background: "#e8f8ee",
                color: "#17653a",
              }}
            >
              {message}
            </div>
          )}

          {activeSection === "dashboard" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ marginBottom: 5 }}>
                  Dashboard Overview
                </h2>
                <p style={{ color: "#627873", marginTop: 0 }}>
                  Manage health records, requests and public
                  announcements.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(170px, 1fr))",
                  gap: 15,
                  marginBottom: 20,
                }}
              >
                {[
                  {
                    label: "Registered Mothers",
                    value: mothers.length,
                    icon: "👩",
                  },
                  {
                    label: "Total Requests",
                    value: requests.length,
                    icon: "📋",
                  },
                  {
                    label: "Pending Requests",
                    value: pendingRequests,
                    icon: "⏳",
                  },
                  {
                    label: "Announcements",
                    value: announcements.length,
                    icon: "📢",
                  },
                ].map((item) => (
                  <div key={item.label} style={styles.card}>
                    <div style={{ fontSize: 25 }}>{item.icon}</div>
                    <p style={{ color: "#627873", marginBottom: 6 }}>
                      {item.label}
                    </p>
                    <strong style={{ fontSize: 28 }}>
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>

              <div style={styles.card}>
                <h3>Quick Actions</h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => changeSection("mothers")}
                  >
                    View Mothers
                  </button>

                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => changeSection("requests")}
                  >
                    Manage Requests
                  </button>

                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => changeSection("announcements")}
                  >
                    Announcements
                  </button>

                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => changeSection("profile")}
                  >
                    My Profile
                  </button>
                </div>
              </div>

              <div style={styles.card}>
                <h3>Latest Announcements</h3>

                {announcements.length === 0 ? (
                  <p>No announcements available.</p>
                ) : (
                  announcements.slice(0, 3).map((item, index) => (
                    <article
                      key={item._id || item.id || index}
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px solid #e7efed",
                      }}
                    >
                      <strong>{item.title || "Announcement"}</strong>
                      <p style={{ color: "#627873" }}>
                        {displayAnnouncement(item)}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </>
          )}

          {activeSection === "mothers" && (
            <>
              <div style={styles.card}>
                <h2>Mother Records</h2>
                <p style={{ color: "#627873" }}>
                  Search mother records retrieved from the backend
                  database.
                </p>

                <input
                  style={styles.input}
                  placeholder="Search by name, NIC, phone or address..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />

                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {[
                          "Name",
                          "NIC",
                          "Phone",
                          "Address",
                          "House Number",
                        ].map((heading) => (
                          <th key={heading} style={styles.cell}>
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {filteredMothers.map((mother, index) => (
                        <tr key={mother._id || mother.id || index}>
                          <td style={styles.cell}>
                            {mother.name ||
                              mother.fullName ||
                              mother.villagerName ||
                              "—"}
                          </td>
                          <td style={styles.cell}>
                            {mother.nic || mother.NIC || "—"}
                          </td>
                          <td style={styles.cell}>
                            {mother.phone ||
                              mother.phoneNumber ||
                              "—"}
                          </td>
                          <td style={styles.cell}>
                            {mother.address || "—"}
                          </td>
                          <td style={styles.cell}>
                            {mother.houseNumber || "—"}
                          </td>
                        </tr>
                      ))}

                      {filteredMothers.length === 0 && (
                        <tr>
                          <td colSpan={5} style={styles.cell}>
                            No mother records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeSection === "requests" && (
            <div style={styles.card}>
              <h2>Health Requests</h2>
              <p style={{ color: "#627873" }}>
                Review requests and update their status.
              </p>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {[
                        "Request",
                        "Person",
                        "Date",
                        "Status",
                        "Action",
                      ].map((heading) => (
                        <th key={heading} style={styles.cell}>
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((item, index) => {
                      const status = item.status || "Pending";
                      const id = item._id || item.id;
                      const resolved =
                        String(status).toLowerCase() === "resolved";

                      return (
                        <tr key={id || index}>
                          <td style={styles.cell}>
                            {item.title ||
                              item.type ||
                              item.purpose ||
                              item.description ||
                              "Health request"}
                          </td>
                          <td style={styles.cell}>
                            {item.name ||
                              item.fullName ||
                              item.villagerName ||
                              item.requestedBy ||
                              "—"}
                          </td>
                          <td style={styles.cell}>
                            {item.date
                              ? String(item.date).slice(0, 10)
                              : "—"}
                          </td>
                          <td style={styles.cell}>{status}</td>
                          <td style={styles.cell}>
                            <button
                              type="button"
                              style={{
                                ...styles.button,
                                background: resolved
                                  ? "#647873"
                                  : "#087f6b",
                              }}
                              disabled={!id}
                              onClick={() =>
                                updateRequestStatus(
                                  id,
                                  resolved ? "Pending" : "Resolved"
                                )
                              }
                            >
                              {resolved ? "Reopen" : "Resolve"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {requests.length === 0 && (
                      <tr>
                        <td colSpan={5} style={styles.cell}>
                          No health requests available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "announcements" && (
            <>
              <div style={styles.card}>
                <h2>Health Announcements</h2>
                <p style={{ color: "#627873" }}>
                  Publish health notices for the community.
                </p>

                <form onSubmit={addAnnouncement}>
                  <Field
                    label="Announcement title"
                    value={announcementForm.title}
                    onChange={(value) =>
                      setAnnouncementForm((previous) => ({
                        ...previous,
                        title: value,
                      }))
                    }
                    required
                  />

                  <label style={styles.label}>
                    Announcement details
                    <textarea
                      style={{
                        ...styles.input,
                        minHeight: 110,
                        resize: "vertical",
                      }}
                      value={announcementForm.content}
                      onChange={(event) =>
                        setAnnouncementForm((previous) => ({
                          ...previous,
                          content: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>

                  <button
                    style={styles.button}
                    type="submit"
                    disabled={loading}
                  >
                    Publish Announcement
                  </button>
                </form>
              </div>

              <div style={styles.card}>
                <h3>Published Announcements</h3>

                {announcements.length === 0 ? (
                  <p>No announcements have been published.</p>
                ) : (
                  announcements.map((item, index) => (
                    <article
                      key={item._id || item.id || index}
                      style={{
                        padding: "14px 0",
                        borderBottom: "1px solid #e7efed",
                      }}
                    >
                      <h3 style={{ margin: "0 0 8px" }}>
                        {item.title || "Announcement"}
                      </h3>

                      <p style={{ whiteSpace: "pre-wrap" }}>
                        {displayAnnouncement(item)}
                      </p>

                      <small style={{ color: "#627873" }}>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : ""}
                      </small>
                    </article>
                  ))
                )}
              </div>
            </>
          )}

          {activeSection === "profile" && (
            <div style={styles.card}>
              <h2>My Profile</h2>
              <p style={{ color: "#627873" }}>
                Details of the currently logged-in Health Officer.
              </p>

              {profile ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 22,
                    }}
                  >
                    <div
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: "50%",
                        background: "#dff5ef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                      }}
                    >
                      👤
                    </div>

                    <div>
                      <h3 style={{ margin: "0 0 6px" }}>
                        {displayName}
                      </h3>
                      <span style={{ color: "#627873" }}>
                        Health Officer
                      </span>
                    </div>
                  </div>

                  {[
                    ["Full Name", profile.fullName || profile.name],
                    ["Username", profile.username],
                    ["Email", profile.email],
                    ["Phone", profile.phone || profile.phoneNumber],
                    ["Role", profile.role],
                    ["Portal", profile.portal || "Health"],
                    ["House Number", profile.houseNumber],
                  ]
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "minmax(120px, 180px) minmax(0, 1fr)",
                          gap: 12,
                          padding: "13px 0",
                          borderBottom: "1px solid #e7efed",
                        }}
                      >
                        <strong>{label}</strong>
                        <span style={{ overflowWrap: "anywhere" }}>
                          {String(value)}
                        </span>
                      </div>
                    ))}

                  <button
                    type="button"
                    style={{
                      ...styles.button,
                      marginTop: 22,
                      background: "#b42318",
                    }}
                    onClick={handleLogout}
                  >
                    ↪ Logout
                  </button>
                </>
              ) : (
                <p>
                  Profile information is not available yet. Use
                  Refresh data or log in again if your session has
                  expired.
                </p>
              )}
            </div>
          )}
        </main>
      </div>

      <footer
        style={{
          textAlign: "center",
          padding: 20,
          color: "#627873",
          fontSize: 13,
        }}
      >
        GramaLK Health Portal
      </footer>

      <style>{`
        @media (max-width: 700px) {
          .health-portal-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HealthPortal; 