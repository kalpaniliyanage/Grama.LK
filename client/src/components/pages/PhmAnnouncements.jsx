import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';
import './PhmAnnouncements.css'; // CSS File එක Import කර ඇත

const translations = { en, si, ta };

const PhmAnnouncements = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];

  // නිවේදන ලැයිස්තුව
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'ත්‍රිපෝෂ බෙදා හැරීම', date: '2026-10-01', description: 'ලබන අඟහරුවාදා සායනයේදී ත්‍රිපෝෂ බෙදා හරිනු ලැබේ.' },
    { id: 2, title: 'දරුවන්ට එන්නත් දීමේ සායනය', date: '2026-09-25', description: 'මසකට වැඩි දරුවන් සඳහා එන්නත් සායනය පැවැත්වේ.' }
  ]);

  // Form States
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // එකතු කිරීම / සංස්කරණය කිරීම
  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !date || !description) return;

    if (editingId) {
      setAnnouncements(
        announcements.map((item) =>
          item.id === editingId ? { ...item, title, date, description } : item
        )
      );
      setEditingId(null);
    } else {
      const newNotice = {
        id: Date.now(),
        title,
        date,
        description
      };
      setAnnouncements([newNotice, ...announcements]);
    }

    setTitle('');
    setDate('');
    setDescription('');
  };

  // Edit කිරීම සඳහා Form එකට Data යැවීම
  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDate(item.date);
    setDescription(item.description);
  };

  // මකා දැමීම (Delete)
  const handleDelete = (id) => {
    const confirmMsg = lang === 'en' 
      ? 'Are you sure you want to delete this announcement?' 
      : lang === 'ta' 
      ? 'இந்த அறிவிப்பை நீக்க உறுதிவா?' 
      : 'ඔබට මෙම නිවේදනය මකා දැමීමට අවශ්‍යද?';

    if (window.confirm(confirmMsg)) {
      setAnnouncements(announcements.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="phm-container">
      {/* 🌐 Top Bar Navigation & Language Switcher */}
      <div className="phm-topbar">
        <div className="phm-badge">
          <span className="badge-icon">👩‍⚕️</span>
          <span>PHM Announcements Management</span>
        </div>

        <div className="phm-lang-bar">
          <button className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිංහල</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
        </div>
      </div>

      {/* Main Header Card */}
      <header className="phm-header-card">
        <div>
          <h2>📢 {t.announcementsTitle || 'සෞඛ්‍ය නිවේදන කළමනාකරණය'}</h2>
          <p className="phm-subtitle">පවුල් සෞඛ්‍ය සේවා නිලධාරී කොට්ඨාසයේ සායන සහ සෞඛ්‍ය නිවේදන පලකිරීම</p>
        </div>
      </header>

      <div className="phm-content-grid">
        {/* 📌 නිවේදන එකතු කරන / සංස්කරණය කරන Form එක */}
        <div className="phm-card form-card">
          <h3>
            {editingId 
              ? (t.editAnnouncementTitle || '✏️ නිවේදනය සංස්කරණය කරන්න') 
              : (t.addAnnouncementTitle || '➕ අලුත් නිවේදනයක් එකතු කරන්න')}
          </h3>

          <form onSubmit={handleSave} className="phm-form">
            <div className="form-group">
              <label>නිවේදනයේ මාතෘකාව</label>
              <input
                type="text"
                placeholder={t.titlePlaceholder || "නිවේදනයේ මාතෘකාව"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>දිනය</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>විස්තරය</label>
              <textarea
                placeholder={t.descPlaceholder || "විස්තරය ඇතුළත් කරන්න..."}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="btn-action-group">
              <button type="submit" className="btn-save">
                {editingId 
                  ? (t.updateBtn || 'යාවත්කාලීන කරන්න') 
                  : (t.publishBtn || 'පළ කරන්න')}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setEditingId(null);
                    setTitle('');
                    setDate('');
                    setDescription('');
                  }}
                >
                  {t.cancelBtn || 'අවලංගු කරන්න'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 📋 පවතින නිවේදන ලැයිස්තුව */}
        <div className="phm-card list-card">
          <h3>📋 {t.existingAnnouncements || 'පවතින නිවේදන'}</h3>

          {announcements.length === 0 ? (
            <p className="no-data">{t.noAnnouncements || 'නිවේදන කිසිවක් නැත.'}</p>
          ) : (
            <div className="announcements-list">
              {announcements.map((item) => (
                <div key={item.id} className="announcement-item">
                  <div className="item-content">
                    <div className="item-header">
                      <h4>{item.title}</h4>
                      <span className="date-badge">📅 {item.date}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>

                  <div className="btn-group">
                    <button className="btn-edit" onClick={() => handleEdit(item)}>
                      ✏️ {t.editBtn || 'සංස්කරණය'}
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                      🗑️ {t.deleteBtn || 'මකන්න'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhmAnnouncements;