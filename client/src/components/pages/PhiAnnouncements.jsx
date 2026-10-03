import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

const translations = { en, si, ta };

const PhiAnnouncements = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'ඩෙංගු මර්දන ශ්‍රමදානය', date: '2026-10-05', detail: 'ඔක්තෝබර් 05 වන දින පෙ.ව 8.00 ට 05 කොට්ඨාසයේ ඩෙංගු මර්දන වැඩසටහන පැවැත්වේ.' },
    { id: 2, title: 'ආපනශාලා පරික්ෂාව', date: '2026-10-10', detail: 'ප්‍රදේශයේ සියලුම ආපනශාලා හිමියන් සනීපාරක්ෂක උපදෙස් පිළිපැදිය යුතුය.' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDetail, setNewDetail] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTitle && newDetail) {
      const newEntry = {
        id: Date.now(),
        title: newTitle,
        detail: newDetail,
        date: new Date().toISOString().split('T')[0]
      };
      setAnnouncements([newEntry, ...announcements]);
      setNewTitle('');
      setNewDetail('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.langBar}>
        <button style={lang === 'si' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('si')}>සිංහල</button>
        <button style={lang === 'en' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('en')}>English</button>
        <button style={lang === 'ta' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('ta')}>தமிழ்</button>
      </div>

      <h2>{t.phiAnnouncementsTitle}</h2>

      {/* New Announcement Form */}
     <form onSubmit={handleAdd} style={styles.form}>
  <input 
    type="text" 
    placeholder={t.announcementTitlePlaceholder || "Announcement Title"} 
    value={newTitle} 
    onChange={(e) => setNewTitle(e.target.value)} 
    style={styles.input} 
    required 
  />
  <textarea 
    placeholder={t.announcementDetailPlaceholder || "Enter details..."} 
    value={newDetail} 
    onChange={(e) => setNewDetail(e.target.value)} 
    style={{ ...styles.input, height: '80px' }} 
    required 
  />
  <button type="submit" style={styles.btn}>{t.addAnnouncementBtn}</button>
</form>

      {/* List */}
      <div style={{ marginTop: '20px' }}>
        {announcements.map((item) => (
          <div key={item.id} style={styles.card}>
            <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#444' }}>{item.detail}</p>
            <small style={{ color: '#888' }}>📅 {item.date}</small>
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
  form: { backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  btn: { backgroundColor: '#008080', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '6px', marginBottom: '12px', borderLeft: '4px solid #008080', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }
};

export default PhiAnnouncements;