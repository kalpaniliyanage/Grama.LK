import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';
import './PhmDashboard.css'; // CSS File එක Import කර ඇත

const translations = { en, si, ta };

const PhmDashboard = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];
  const navigate = useNavigate();

  const [showAreaModal, setShowAreaModal] = useState(false);

  const [stats, setStats] = useState({
    mothersCount: 0,
    requestsCount: 0,
    announcementsCount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const assignedAreas = [
    { id: '05-A', name: 'කොට්ඨාසය 05 - උතුර' },
    { id: '05-B', name: 'කොට්ඨාසය 05 - දකුණ' },
    { id: '05-C', name: 'කොට්ඨාසය 05 - මධ්‍යම' },
  ];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [mothersRes, requestsRes, announcementsRes] = await Promise.allSettled([
          API.get('/mothers/count'),
          API.get('/requests/count'),
          API.get('/announcements/count'),
        ]);

        setStats({
          mothersCount: mothersRes.status === 'fulfilled' ? mothersRes.value.data.count : 42,
          requestsCount: requestsRes.status === 'fulfilled' ? requestsRes.value.data.count : 6,
          announcementsCount: announcementsRes.status === 'fulfilled' ? announcementsRes.value.data.count : 3,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="phm-dashboard-container">
      {/* Top Bar / Language Selector */}
      <div className="phm-topbar">
        <div className="phm-portal-badge">
          <span className="badge-icon">🩺</span>
          <span>Public Health Services</span>
        </div>

        <div className="phm-lang-bar">
          <button className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිංහල</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
        </div>
      </div>

      {/* Header Section */}
      <header className="phm-header-card">
        <div>
          <h2>{t.welcome || "සාදරයෙන් පිළිගනිමු, PHM නිලධාරිනියනි"}</h2>
          <p className="phm-subtitle">{t.subtitle || "මහජන සෞඛ්‍ය පවුල් සෞඛ්‍ය සේවිකා පෝටලය"}</p>
        </div>

        <button 
          className="area-badge-btn" 
          onClick={() => setShowAreaModal(true)}
          title="අයත් වසම් ලැයිස්තුව බලන්න"
        >
          <span>📍</span> {t.assignedArea || "අයත් වසම: කොට්ඨාසය 05"}
        </button>
      </header>

      {/* Dynamic Summary Cards */}
      <div className="phm-stats-grid">
        <div className="phm-card stat-card card-green" onClick={() => navigate('/phm-mothers')}>
          <div className="stat-icon-wrapper">👩‍👦</div>
          <div className="stat-info">
            <h4>{t.statMothers || "ලියාපදිංචි මව්වරුන්"}</h4>
            <p className="stat-number">{loadingStats ? '...' : stats.mothersCount}</p>
          </div>
        </div>

        <div className="phm-card stat-card card-amber" onClick={() => navigate('/phm-requests')}>
          <div className="stat-icon-wrapper">📋</div>
          <div className="stat-info">
            <h4>{t.statRequests || "විසඳීමට ඇති ඉල්ලීම්"}</h4>
            <p className="stat-number">{loadingStats ? '...' : stats.requestsCount}</p>
          </div>
        </div>

        <div className="phm-card stat-card card-blue" onClick={() => navigate('/phm-announcements')}>
          <div className="stat-icon-wrapper">📢</div>
          <div className="stat-info">
            <h4>{t.statNotices || "සක්‍රිය නිවේදන"}</h4>
            <p className="stat-number">{loadingStats ? '...' : stats.announcementsCount}</p>
          </div>
        </div>
      </div>

      {/* Quick Action Section */}
      <div className="phm-card action-section">
        <h3>{t.quickActions || "ක්ෂණික පියවර"}</h3>
        <div className="action-grid">
          <button className="action-btn" onClick={() => navigate('/phm-announcements')}>
            <span className="btn-icon">📢</span>
            <div className="btn-text">
              <strong>{t.btnAnnouncements || "සෞඛ්‍ය නිවේදන"}</strong>
              <small>නව නිවේදන පලකිරීම සහ කළමනාකරණය</small>
            </div>
          </button>

          <button className="action-btn" onClick={() => navigate('/phm-mothers')}>
            <span className="btn-icon">👩‍👦</span>
            <div className="btn-text">
              <strong>{t.btnMothers || "පවුල් සහ මව්වරුන්"}</strong>
              <small>තොරතුරු සහ සායනික වාර්තා</small>
            </div>
          </button>

          <button className="action-btn" onClick={() => navigate('/phm-requests')}>
            <span className="btn-icon">📋</span>
            <div className="btn-text">
              <strong>{t.btnRequests || "පැමිණිලි සහ ඉල්ලීම්"}</strong>
              <small>ප්‍රදේශවාසීන්ගේ ඉල්ලීම් පරික්ෂාව</small>
            </div>
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {showAreaModal && (
        <div className="modal-overlay" onClick={() => setShowAreaModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🏡 අයත් වසම් / කොට්ඨාස ලැයිස්තුව</h3>
              <button className="close-btn" onClick={() => setShowAreaModal(false)}>✕</button>
            </div>

            <p className="modal-subtext">
              ඔබට අයත් ප්‍රදේශයේ දැනට සේවය ලබාදෙන කොට්ඨාස පහත දැක්වේ:
            </p>

            <ul className="area-list">
              {assignedAreas.map((area) => (
                <li key={area.id} className="area-list-item">
                  <span className="area-name">📍 {area.name}</span>
                  <span className="area-code">{area.id}</span>
                </li>
              ))}
            </ul>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setShowAreaModal(false);
                  navigate('/phm-profile');
                }}
              >
                👤 Profile වෙත යන්න
              </button>
              <button className="btn-close" onClick={() => setShowAreaModal(false)}>
                වසා දමන්න
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhmDashboard;