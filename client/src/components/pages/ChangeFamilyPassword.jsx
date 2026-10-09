import React, { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ChangeFamilyPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const user = JSON.parse(localStorage.getItem("gramalk_user") || "null");
  const token = localStorage.getItem("gramalk_token");

  async function submit(event) {
    event.preventDefault();
    if (newPassword !== confirmPassword) return setMessage("Passwords do not match.");
    if (newPassword.length < 6) return setMessage("Use at least 6 characters.");
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return setMessage("Include at least one letter and one number.");
    }
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${API}/family/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Password change failed.");
      localStorage.removeItem("gramalk_token");
      localStorage.removeItem("gramalk_user");
      window.location.href = "/";
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  if (!token || user?.role !== "family") return <main style={{ padding: 40 }}>Please log in as a family user. <a href="/">Go to login</a></main>;
  return (
    <main style={{ maxWidth: 440, margin: "70px auto", padding: 24, fontFamily: "sans-serif" }}>
      <h2>Set Your Family Password</h2>
      <p>Change your temporary password to continue to the Family Portal.</p>
      <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
        <label>Temporary Password<input type="password" autoComplete="current-password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required style={{ display: "block", width: "100%", padding: 10 }} /></label>
        <label>New Password<input type="password" autoComplete="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={6} maxLength={72} required style={{ display: "block", width: "100%", padding: 10 }} /></label>
        <label>Confirm Password<input type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={6} maxLength={72} required style={{ display: "block", width: "100%", padding: 10 }} /></label>
        {message && <p role="alert">{message}</p>}
        <button disabled={busy} type="submit" style={{ padding: 12 }}>{busy ? "Saving..." : "Change Password"}</button>
      </form>
    </main>
  );
}
