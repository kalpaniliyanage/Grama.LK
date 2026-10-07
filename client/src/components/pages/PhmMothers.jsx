import React, { useState } from 'react';
import './PhmMothers.css'; // CSS File එක Import කර ඇත

const PhmMothers = () => {
  const [mothers] = useState([
    { id: 1, name: 'K. L. Perera', address: 'No 45, Temple Rd', status: 'Pregnant (6th Month)', contact: '071XXXXXXX' },
    { id: 2, name: 'M. S. Silva', address: 'No 12, Main St', status: 'Infant Care (3 Months)', contact: '077XXXXXXX' },
    { id: 3, name: 'A. H. Fernando', address: 'No 88, Station Rd', status: 'Pregnant (3rd Month)', contact: '075XXXXXXX' }
  ]);

  return (
    <div className="mothers-container">
      {/* Top Bar Badge */}
      <div className="mothers-topbar">
        <div className="mothers-badge">
          <span className="badge-icon">👩‍👧</span>
          <span>PHM Family Healthcare Services</span>
        </div>
      </div>

      {/* Main Header Card */}
      <header className="mothers-header-card">
        <div>
          <h2>Families & Mothers (ලියාපදිංචි මව්වරුන් සහ පවුල්)</h2>
          <p className="mothers-subtitle">කොට්ඨාසයේ ලියාපදිංචි ගැබිනි මව්වරුන් සහ ළදරු මව්වරුන්ගේ තොරතුරු</p>
        </div>
      </header>

      {/* Mothers List Grid */}
      <div className="mothers-card">
        <h3>📋 ලියාපදිංචි ලැයිස්තුව ({mothers.length})</h3>

        <div className="mothers-grid">
          {mothers.map((m) => (
            <div key={m.id} className="mother-item-card">
              <div className="mother-avatar-circle">🤰</div>
              <div className="mother-details">
                <h4>{m.name}</h4>
                <p className="mother-address">📍 {m.address}</p>
                <div className="status-badge">ℹ️ {m.status}</div>
                <p className="mother-contact">📞 {m.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhmMothers;