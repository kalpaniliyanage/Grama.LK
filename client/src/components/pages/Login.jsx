import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password එක පෙන්වීමට/සැඟවීමට State එක
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Health Portal Login (PHI Announcements පිටුවට යොමු වේ)
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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#008080', marginBottom: '20px' }}>Health Portal Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '500' }}>පරිශීලක නමය / Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username (උදා: health, phi, H001)" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontWeight: '500' }}>මුරපදය / Password:</label>
          <input 
            type={showPassword ? "text" : "password"} // Tick එක දැමූ විට text ලෙසත් නැතහොත් password ලෙසත් පෙන්වයි
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        </div>

        {/* Show Password Checkbox (Tick Box) */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="showPassword" 
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="showPassword" style={{ cursor: 'pointer', fontSize: '14px', color: '#333' }}>
            මුරපදය පෙන්වන්න (Show Password)
          </label>
        </div>

        {/* Forgot Password Link */}
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Link to="/forgot-password" style={{ color: '#008080', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
            මුරපදය අමතකද? (Forgot Password?)
          </Link>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;