import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';
import './PhiAnnouncements.css'; // CSS File එක Import කර ඇත

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
    <div className="phi-container">
      {/* Top Bar Navigation */}
      <div className="phi-topbar">
        <div className="phi-badge">
          <span className="badge-icon">📢</span>
          <span>PHI Announcements Portal</span>
        </div>

        <div className="phi-lang-bar">
          <button className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිංහල</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
        </div>
      </div>

      {/* Header Card */}
      <header className="phi-header-card">
        <div>
          <h2>{t.phiAnnouncementsTitle || "PHI සෞඛ්‍ය නිවේදන කළමනාකරණය"}</h2>
          <p className="phi-subtitle">ප්‍රදේශවාසීන් දැනුවත් කිරීම සඳහා නව නිවේදන පලකිරීම සහ කළමනාකරණය</p>
        </div>
      </header>

      <div className="phi-content-grid">
        {/* Form Card */}
        <div className="phi-card form-card">
          <h3>➕ නව නිවේදනයක් එක් කරන්න</h3>
          <form onSubmit={handleAdd} className="phi-form">
            <div className="form-group">
              <label>නිවේදනයේ මාතෘකාව</label>
              <input 
                type="text" 
                placeholder={t.announcementTitlePlaceholder || "උදා: ඩෙංගු මර්දන වැඩසටහන"} 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>විස්තරය</label>
              <textarea 
                placeholder={t.announcementDetailPlaceholder || "නිවේදනයේ සම්පූර්ණ විස්තරය ඇතුළත් කරන්න..."} 
                value={newDetail} 
                onChange={(e) => setNewDetail(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn-submit">
              {t.addAnnouncementBtn || "පල කරන්න →"}
            </button>
          </form>
        </div>

        {/* Announcements List */}
        <div className="phi-card list-card">
          <h3>📋 සක්‍රිය නිවේදන ලැයිස්තුව</h3>
          
          <div className="announcements-list">
            {announcements.map((item) => (
              <div key={item.id} className="announcement-item">
                <div className="item-header">
                  <h4>{item.title}</h4>
                  <span className="date-badge">📅 {item.date}</span>
                </div>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhiAnnouncements;