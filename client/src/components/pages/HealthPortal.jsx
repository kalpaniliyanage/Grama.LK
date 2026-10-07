import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthPortal.css'; // CSS File එක Import කර ඇත

function HealthPortal() {
  const navigate = useNavigate();

  return (
    <div className="health-portal-container">
      {/* Top Bar Navigation */}
      <div className="portal-topbar">
        <div className="portal-badge">
          <span className="badge-icon">🏥</span>
          <span>GramaLK Health Services</span>
        </div>
      </div>

      {/* Main Header Card */}
      <header className="portal-header-card">
        <div>
          <h2>Health Portal 🌿</h2>
          <p className="portal-subtitle">සෞඛ්‍ය පෝටලය සාර්ථකව Load වී ඇත / Main page loaded successfully!</p>
        </div>
        <div className="status-pill">
          <span className="pulse-dot"></span> System Active
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="portal-grid">
        <div className="portal-card feature-card">
          <div className="card-icon-bg green-icon">🩺</div>
          <h3>PHM පෝටලය (Dashboard)</h3>
          <p>පවුල් සෞඛ්‍ය සේවිකා කළමනාකරණ පද්ධතිය වෙත පිවිසෙන්න.</p>
          <button className="btn-portal-primary" onClick={() => navigate('/phm-dashboard')}>
            Dashboard එකට යන්න →
          </button>
        </div>

        <div className="portal-card feature-card">
          <div className="card-icon-bg blue-icon">👩‍👦</div>
          <h3>මව්වරුන්ගේ ලියාපදිංචිය</h3>
          <p>ප්‍රදේශයේ ලියාපදිංචි මව්වරුන්ගේ සහ පවුල්වල තොරතුරු පරීක්ෂා කරන්න.</p>
          <button className="btn-portal-outline" onClick={() => navigate('/phm-mothers')}>
            විස්තර බලන්න
          </button>
        </div>

        <div className="portal-card feature-card">
          <div className="card-icon-bg amber-icon">📢</div>
          <h3>සෞඛ්‍ය නිවේදන</h3>
          <p>මහජනතාව සඳහා වන සෞඛ්‍ය දැනුවත්කිරීම් සහ නිවේදන.</p>
          <button className="btn-portal-outline" onClick={() => navigate('/phm-announcements')}>
            නිවේදන බලන්න
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthPortal;