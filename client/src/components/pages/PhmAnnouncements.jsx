import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

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
      ? 'இந்த அறிவிப்பை நீக்க নিশ্চিতவா?' 
      : 'ඔබට මෙම නිවේදනය මකා දැමීමට අවශ්‍යද?';

    if (window.confirm(confirmMsg)) {
      setAnnouncements(announcements.filter((item) => item.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      {/* 🌐 Language Switcher Bar */}
      <div style={styles.langBar}>
        <button style={lang === 'si' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('si')}>සිංහල</button>
        <button style={lang === 'en' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('en')}>English</button>
        <button style={lang === 'ta' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('ta')}>தமிழ்</button>
      </div>

      <h2>📢 {t.announcementsTitle || 'සෞඛ්‍ය නිවේදන'}</h2>

      {/* 📌 නිවේදන එකතු කරන / සංස්කරණය කරන Form එක */}
      <form onSubmit={handleSave} style={styles.formCard}>
        <h3>
          {editingId 
            ? (t.editAnnouncementTitle || '✏️ නිවේදනය සංස්කරණය කරන්න') 
            : (t.addAnnouncementTitle || '➕ අලුත් නිවේදනයක් එකතු කරන්න')}
        </h3>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder={t.titlePlaceholder || "නිවේදනයේ මාතෘකාව"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <textarea
          placeholder={t.descPlaceholder || "විස්තරය ඇතුළත් කරන්න..."}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={styles.saveBtn}>
            {editingId 
              ? (t.updateBtn || 'යාවත්කාලීන කරන්න') 
              : (t.publishBtn || 'පළ කරන්න')}
          </button>
          {editingId && (
            <button
              type="button"
              style={styles.cancelBtn}
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

      {/* 📋 පවතින නිවේදන ලැයිස්තුව */}
      <div style={{ marginTop: '25px' }}>
        <h3>{t.existingAnnouncements || 'පවතින නිවේදන'}</h3>
        {announcements.length === 0 ? (
          <p style={{ color: '#888' }}>{t.noAnnouncements || 'නිවේදන කිසිවක් නැත.'}</p>
        ) : (
          announcements.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#008080' }}>{item.title}</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>📅 {item.date}</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>{item.description}</p>
              </div>

              <div style={styles.btnGroup}>
                <button style={styles.editBtn} onClick={() => handleEdit(item)}>
                  ✏️ {t.editBtn || 'වෙනස් කරන්න'}
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                  🗑️ {t.deleteBtn || 'මකා දමන්න'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  langBar: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '15px' },
  langBtn: { padding: '6px 14px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  activeLangBtn: { padding: '6px 14px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  formCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px', border: '1px solid #e0e0e0' },
  formGroup: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '10px' },
  input: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  textarea: { width: '100%', height: '70px', padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px' },
  saveBtn: { backgroundColor: '#008080', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e0e0e0' },
  btnGroup: { display: 'flex', gap: '8px', marginLeft: '15px' },
  editBtn: { backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  deleteBtn: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }
};

export default PhmAnnouncements;