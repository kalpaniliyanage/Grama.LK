import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

const translations = { en, si, ta };

const PhmDashboard = () => {
  const [lang, setLang] = useState('si'); // Default සිංහල
  const t = translations[lang];

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
          <h2>{t.welcome}</h2>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </div>
        <span style={styles.areaBadge}>{t.assignedArea}</span>
      </header>

      {/* Quick Summary Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <h4>{t.statMothers}</h4>
          <p style={styles.statNumber}>42</p>
        </div>
        <div style={styles.card}>
          <h4>{t.statRequests}</h4>
          <p style={styles.statNumber}>6</p>
        </div>
        <div style={styles.card}>
          <h4>{t.statNotices}</h4>
          <p style={styles.statNumber}>3</p>
        </div>
      </div>

      {/* Main Actions */}
      <div style={styles.actionSection}>
        <h3>{t.quickActions}</h3>
        <div style={styles.actionGrid}>
          <button style={styles.actionBtn}>{t.btnAnnouncements}</button>
          <button style={styles.actionBtn}>{t.btnMothers}</button>
          <button style={styles.actionBtn}>{t.btnRequests}</button>
          <button style={styles.actionBtn}>{t.btnProfile}</button>
        </div>
      </div>
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
  areaBadge: { backgroundColor: '#e6f2f2', color: '#008080', padding: '8px 14px', borderRadius: '15px', fontWeight: 'bold', fontSize: '13px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' },
  statNumber: { fontSize: '28px', fontWeight: 'bold', color: '#008080', marginTop: '10px' },
  actionSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' },
  actionBtn: { padding: '15px', backgroundColor: '#f0f7f7', color: '#008080', border: '1px solid #008080', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }
};

export default PhmDashboard;