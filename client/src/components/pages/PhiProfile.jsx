import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

const translations = { en, si, ta };

const PhiProfile = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];

  return (
    <div style={styles.container}>
      <div style={styles.langBar}>
        <button style={lang === 'si' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('si')}>සිංහල</button>
        <button style={lang === 'en' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('en')}>English</button>
        <button style={lang === 'ta' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('ta')}>தமிழ்</button>
      </div>

      <h2>{t.phiProfileTitle}</h2>

      <div style={styles.card}>
        <p style={styles.info}><strong>{t.phiName}</strong></p>
        <p style={styles.info}><strong>{t.phiRole}</strong></p>
        <p style={styles.info}><strong>{t.phiArea}</strong></p>
        <p style={styles.info}><strong>{t.phiPhone}</strong></p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  langBar: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '15px' },
  langBtn: { padding: '6px 14px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  activeLangBtn: { padding: '6px 14px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '400px', marginTop: '15px' },
  info: { margin: '10px 0', fontSize: '15px', color: '#333' }
};

export default PhiProfile;