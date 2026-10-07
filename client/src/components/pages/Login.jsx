import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // CSS File එක Import කර ඇත

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Health Portal Login
    if (username === 'health' && password === 'ChangeMe123!') {
      navigate('/phi-announcements');
    } 
    // 2. GN Portal Login
    else if (username === 'gnadmin' && password === 'ChangeMe123!') {
      navigate('/gn-portal');
    }
    // 3. Welfare Portal Login
    else if (username === 'welfare' && password === 'ChangeMe123!') {
      navigate('/welfare-portal');
    }
    // 4. Family Portal Login
    else if (username === 'H001' && password === '1234') {
      navigate('/family-portal');
    }
    // 5. PHI / PHM වෙනත් Username එකකින් Login වීමට
    else if (username.toLowerCase().includes('phi')) {
      navigate('/phi-announcements');
    } else if (username.toLowerCase().includes('phm')) {
      navigate('/phm-dashboard');
    } else {
      alert('පරිශීලක නමය (Username) හෝ මුරපදය (Password) වැරදියි!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo / Badge */}
        <div className="login-badge">
          <span className="badge-icon">🌿</span>
          <span>GramaLK Health Services</span>
        </div>

        <h2 className="login-title">Health Portal Login</h2>
        <p className="login-subtitle">පද්ධතියට පිවිසීමට ඔබේ තොරතුරු ඇතුළත් කරන්න</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>පරිශීලක නමය / Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username (උදා: health, phi, H001)" 
              required 
            />
          </div>

          <div className="input-group">
            <label>මුරපදය / Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
          </div>

          <div className="login-options">
            {/* Show Password Checkbox */}
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="showPassword" 
                checked={showPassword} 
                onChange={() => setShowPassword(!showPassword)} 
              />
              <label htmlFor="showPassword">මුරපදය පෙන්වන්න</label>
            </div>

            {/* Forgot Password Link */}
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn-login">
            Log In →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;