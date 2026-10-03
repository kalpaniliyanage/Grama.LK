import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Health Portal Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>පරිශීලක නමය / Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username (උදා: health, phi, H001)" 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>මුරපදය / Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;