import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

const translations = { en, si, ta };

const PhmRequests = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];

  const [requests, setRequests] = useState([
    { id: 1, user: 'S. Malkanthi', topic: 'Thriposha Request', date: '2026-09-29', status: 'Pending' },
    { id: 2, user: 'N. Dilhani', topic: 'Vaccine Date Inquiry', date: '2026-09-28', status: 'Resolved' }
  ]);

  const toggleStatus = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: r.status === 'Pending' ? 'Resolved' : 'Pending' } : r));
  };

  return (
    <div style={styles.container}>
      <div style={styles.langBar}>
        <button style={lang === 'si' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('si')}>සිංහල</button>
        <button style={lang === 'en' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('en')}>English</button>
        <button style={lang === 'ta' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('ta')}>தமிழ்</button>
      </div>

      <h2>{t.requestsTitle}</h2>

      <div style={{ marginTop: '20px' }}>
        {requests.map((item) => (
          <div key={item.id} style={styles.card}>
            <div>
              <h4>{item.topic}</h4>
              <p style={{ margin: '3px 0', fontSize: '13px', color: '#555' }}>👤 {item.user} | 📅 {item.date}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={item.status === 'Resolved' ? styles.resolvedBadge : styles.pendingBadge}>
                {item.status === 'Resolved' ? t.statusResolved : t.statusPending}
              </span>
              <button style={styles.btn} onClick={() => toggleStatus(item.id)}>{t.respondBtn}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  langBar: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '15px' },
  langBtn: { padding: '6px 14px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  activeLangBtn: { padding: '6px 14px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '6px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pendingBadge: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  resolvedBadge: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  btn: { backgroundColor: '#008080', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }
};

export default PhmRequests;