import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Input Email/Phone, 2: Verify OTP, 3: Reset Password
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Step 1: Request OTP / Reset Link
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Backend API Call to Send OTP
      // const res = await fetch("http://localhost:5000/api/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ contact }),
      // });
      
      setMessage("Verification code එක යවන ලදී! (Email / SMS පරීක්ෂා කරන්න)");
      setStep(2);
    } catch (err) {
      setError("සංකේතය යැවීමට නොහැකි විය. නැවත උත්සාහ කරන්න.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    // Backend API Call to Verify OTP
    if (otp === "123456") { // Testing purpose OTP
      setMessage("සත්‍යාපනය සාර්ථකයි. අලුත් Password එක ඇතුළත් කරන්න.");
      setStep(3);
    } else {
      setError("ඇතුළත් කළ Verification Code එක වැරදියි!");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Password දෙක එකිනෙකට ගැලපෙන්නේ නැත!");
      return;
    }

    try {
      // Backend API Call to Update Password
      setMessage("මුරපදය සාර්ථකව වෙනස් කරන ලදී!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Password එක වෙනස් කිරීමට නොහැකි විය.");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", color: "#0d5c56", marginBottom: "20px" }}>
        Forgot Password
      </h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}

      {/* Step 1: Input Contact */}
      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email හෝ Phone Number එක ඇතුළත් කරන්න:</label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. user@gmail.com or 071XXXXXXX"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0d5c56", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Send Code
          </button>
        </form>
      )}

      {/* Step 2: Input OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>ඔබට ලැබුණු Verification Code (OTP) එක:</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0d5c56", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Verify Code
          </button>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>අලුත් Password එක:</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>අලුත් Password එක නැවත ඇතුළත් කරන්න:</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0d5c56", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Reset Password
          </button>
        </form>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#0d5c56", cursor: "pointer", textDecoration: "underline" }}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;