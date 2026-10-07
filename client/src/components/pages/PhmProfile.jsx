import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';
import './PhmProfile.css'; // CSS File එක Import කර ඇත

const translations = { en, si, ta };

const PhmProfile = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];

  return (
    <div className="profile-container">
      {/* Top Bar Navigation */}
      <div className="profile-topbar">
        <div className="profile-badge">
          <span className="badge-icon">👩‍⚕️️</span>
          <span>PHM Officer Profile</span>
        </div>

        <div className="profile-lang-bar">
          <button className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිංහල</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
        </div>
      </div>

      {/* Main Header Card */}
      <header className="profile-header-card">
        <div>
          <h2>{t.phmProfileTitle || "පවුල් සෞඛ්‍ය සේවා නිලධාරී ගිණුම් තොරතුරු"}</h2>
          <p className="profile-subtitle">ඔබගේ නිල සේවා තොරතුරු සහ සම්බන්ධතා විස්තර</p>
        </div>
      </header>

      {/* Profile Details Card */}
      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="avatar-circle">👩‍⚕️</div>
          <div>
            <h3>{t.phmName || "නිලධාරිනියගේ නම"}</h3>
            <span className="role-tag">{t.phmRole || "පවුල් සෞඛ්‍ය සේවා නිලධාරී (PHM)"}</span>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="info-item">
            <span className="info-label">📍 අයත් බලප්‍රදේශය</span>
            <span className="info-value">{t.phmArea || "කොට්ඨාසය 05"}</span>
          </div>

          <div className="info-item">
            <span className="info-label">📞 දුරකථන අංකය</span>
            <span className="info-value">{t.phmPhone || "077 987 6543"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhmProfile;