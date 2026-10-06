import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api'; // Axios instance එක import කරගන්න
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

const translations = { en, si, ta };

const PhmDashboard = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];
  const navigate = useNavigate();

  // වසම් Modal එක පාලනය කිරීමට State
  const [showAreaModal, setShowAreaModal] = useState(false);

  // Backend එකෙන් ගන්නා Dashboard Dynamic Counts සඳහා States
  const [stats, setStats] = useState({
    mothersCount: 0,
    requestsCount: 0,
    announcementsCount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // අයත් වසම් ලැයිස්තුව (Sample Data)
  const assignedAreas = [
    { id: '05-A', name: 'කොට්ඨාසය 05 - උතුර' },
    { id: '05-B', name: 'කොට්ඨාසය 05 - දකුණ' },
    { id: '05-C', name: 'කොට්ඨාසය 05 - මධ්‍යම' },
  ];

  // Backend API එකෙන් Dashboard දත්ත ලබා ගැනීම
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // ඔබේ Backend එකෙහි අදාළ Routes වලට අනුව මේවා වෙනස් කරගත හැක
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
    <div style={styles.container}>
      {/* Language Switcher */}
      <div style={styles.langBar}>
        <button style={lang === 'si' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('si')}>සිංහල</button>
        <button style={lang === 'en' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('en')}>English</button>
        <button style={lang === 'ta' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('ta')}>தமிழ்</button>
      </div>

      <header style={styles.header}>
        <div>
          <h2>{t.welcome || "සාදරයෙන් පිළිගනිමු, PHM නිලධාරිනියනි"}</h2>
          <p style={styles.subtitle}>{t.subtitle || "මහජන සෞඛ්‍ය පවුල් සෞඛ්‍ය සේවිකා පෝටලය"}</p>
        </div>

        {/* අයත් වසම Click කළ විට Modal එක Open වේ */}
        <span 
          style={styles.areaBadgeClickable} 
          onClick={() => setShowAreaModal(true)}
          title="අයත් වසම් ලැයිස්තුව බලන්න"
        >
          {t.assignedArea || "අයත් වසම: කොට්ඨාසය 05 📍"}
        </span>
      </header>

      {/* Quick Summary Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.clickableCard} onClick={() => navigate('/phm-mothers')}>
          <h4>{t.statMothers || "ලියාපදිංචි මව්වරුන්"}</h4>
          <p style={styles.statNumber}>{loadingStats ? '...' : stats.mothersCount}</p>
        </div>

        <div style={styles.clickableCard} onClick={() => navigate('/phm-requests')}>
          <h4>{t.statRequests || "විසඳීමට ඇති ඉල්ලීම්"}</h4>
          <p style={styles.statNumber}>{loadingStats ? '...' : stats.requestsCount}</p>
        </div>

        <div style={styles.clickableCard} onClick={() => navigate('/phm-announcements')}>
          <h4>{t.statNotices || "සක්‍රිය නිවේදන"}</h4>
          <p style={styles.statNumber}>{loadingStats ? '...' : stats.announcementsCount}</p>
        </div>
      </div>

      {/* Main Actions */}
      <div style={styles.actionSection}>
        <h3>{t.quickActions || "ක්ෂණික පියවර"}</h3>
        <div style={styles.actionGrid}>
          <button style={styles.actionBtn} onClick={() => navigate('/phm-announcements')}>
            📢 {t.btnAnnouncements || "සෞඛ්‍ය නිවේදන"}
          </button>

          <button style={styles.actionBtn} onClick={() => navigate('/phm-mothers')}>
            👩‍👦 {t.btnMothers || "පවුල් සහ මව්වරුන්"}
          </button>

          <button style={styles.actionBtn} onClick={() => navigate('/phm-requests')}>
            📋 {t.btnRequests || "පැමිණිලි සහ ඉල්ලීම්"}
          </button>
        </div>
      </div>

      {/* 📌 අයත් වසම් පෙන්වන Modal (Popup) එක */}
      {showAreaModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, color: '#008080' }}>🏡 අයත් වසම් / කොට්ඨාස ලැයිස්තුව</h3>
              <button style={styles.closeBtn} onClick={() => setShowAreaModal(false)}>✕</button>
            </div>

            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              ඔබට අයත් ප්‍රදේශයේ දැනට සේවය ලබාදෙන කොට්ඨාස පහත දැක්වේ:
            </p>

            <ul style={styles.areaList}>
              {assignedAreas.map((area) => (
                <li key={area.id} style={styles.areaListItem}>
                  <span>📍 {area.name}</span>
                  <span style={styles.areaCode}>{area.id}</span>
                </li>
              ))}
            </ul>

            <div style={styles.modalFooter}>
              <button 
                style={styles.profileNavBtn}
                onClick={() => {
                  setShowAreaModal(false);
                  navigate('/phm-profile');
                }}
              >
                👤 ගිණුම් විස්තර (Profile) වෙත යන්න
              </button>
              <button style={styles.modalCloseBtn} onClick={() => setShowAreaModal(false)}>
                වසා දමන්න
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  langBar: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '15px' },
  langBtn: { padding: '6px 14px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  activeLangBtn: { padding: '6px 14px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  subtitle: { color: '#6c757d', marginTop: '4px', fontSize: '14px' },
  areaBadgeClickable: { backgroundColor: '#e6f2f2', color: '#008080', padding: '8px 14px', borderRadius: '15px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: '0.2s', border: '1px solid #008080' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' },
  clickableCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center', cursor: 'pointer', border: '1px solid #e2e8f0' },
  statNumber: { fontSize: '28px', fontWeight: 'bold', color: '#008080', marginTop: '10px' },
  actionSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' },
  actionBtn: { padding: '15px', backgroundColor: '#f0f7f7', color: '#008080', border: '1px solid #008080', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' },

  /* Modal Styles */
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '25px', borderRadius: '10px', width: '90%', maxWidth: '450px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#888' },
  areaList: { listStyle: 'none', padding: 0, margin: '20px 0' },
  areaListItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#f8f9fa', marginBottom: '8px', borderRadius: '6px', borderLeft: '4px solid #008080', fontSize: '14px' },
  areaCode: { color: '#666', fontSize: '12px', fontWeight: 'bold' },
  modalFooter: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '10px' },
  profileNavBtn: { padding: '8px 12px', backgroundColor: '#e6f2f2', color: '#008080', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  modalCloseBtn: { padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
};

export default PhmDashboard;