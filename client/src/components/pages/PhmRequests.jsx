import React, { useState } from 'react';
import en from '../../locales/en.json';
import si from '../../locales/si.json';
import ta from '../../locales/ta.json';

const translations = { en, si, ta };

const PhmRequests = () => {
  const [lang, setLang] = useState('si');
  const t = translations[lang];

  const [requests, setRequests] = useState([
    { id: 1, user: 'S. Malkanthi', topic: 'Thriposha Request', date: '2026-09-29', status: 'Pending', reply: '' },
    { id: 2, user: 'N. Dilhani', topic: 'Vaccine Date Inquiry', date: '2026-09-28', status: 'Resolved', reply: 'ඔබගේ එන්නත් දිනය ඔක්තෝබර් 12 වනදාට නියමිතයි.' }
  ]);

  // දැනට පිළිතුර ලියන Request එකේ ID එක සහ Text එක තබා ගැනීමට State
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // පිළිතුරු දීමේ Textbox එක Open කිරීම
  const handleOpenReply = (id) => {
    setActiveReplyId(id);
    setReplyText('');
  };

  // පිළිතුර යවා Status එක Resolved බවට පත් කිරීම
  const handleSendReply = (id) => {
    if (!replyText.trim()) return;

    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: 'Resolved', reply: replyText } : r
      )
    );
    setActiveReplyId(null);
    setReplyText('');
  };

  return (
    <div style={styles.container}>
      {/* Language Bar */}
      <div style={styles.langBar}>
        <button style={lang === 'si' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('si')}>සිංහල</button>
        <button style={lang === 'en' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('en')}>English</button>
        <button style={lang === 'ta' ? styles.activeLangBtn : styles.langBtn} onClick={() => setLang('ta')}>தமிழ்</button>
      </div>

      <h2>{t.requestsTitle || '📋 සෞඛ්‍ය ඉල්ලීම් සහ පැමිණිලි'}</h2>

      <div style={{ marginTop: '20px' }}>
        {requests.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.topic}</h4>
                <p style={{ margin: '3px 0', fontSize: '13px', color: '#555' }}>
                  👤 {item.user} | 📅 {item.date}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={item.status === 'Resolved' ? styles.resolvedBadge : styles.pendingBadge}>
                  {item.status === 'Resolved' ? (t.statusResolved || 'විසඳා ඇත') : (t.statusPending || 'විසඳීමට ඇත')}
                </span>

                {item.status !== 'Resolved' && (
                  <button style={styles.btn} onClick={() => handleOpenReply(item.id)}>
                    {t.respondBtn || 'පිළිතුරු දෙන්න'}
                  </button>
                )}
              </div>
            </div>

            {/* පිළිතුරු ඇතුළත් කිරීමට එන Textbox එක */}
            {activeReplyId === item.id && (
              <div style={styles.replyBoxContainer}>
                <textarea
                  placeholder="ඔබගේ පිළිතුර මෙතැන සටහන් කරන්න..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={styles.textarea}
                />
                <div style={styles.actionRow}>
                  <button style={styles.cancelBtn} onClick={() => setActiveReplyId(null)}>
                    අවලංගු කරන්න
                  </button>
                  <button style={styles.submitBtn} onClick={() => handleSendReply(item.id)}>
                    යවන්න
                  </button>
                </div>
              </div>
            )}

            {/* ලබාදුන් පිළිතුර පෙන්වීම */}
            {item.reply && (
              <div style={styles.savedReply}>
                <strong>ලබාදුන් පිළිතුර:</strong> {item.reply}
              </div>
            )}
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
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '6px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pendingBadge: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  resolvedBadge: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  btn: { backgroundColor: '#008080', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  replyBoxContainer: { marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' },
  textarea: { width: '100%', height: '70px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '13px' },
  actionRow: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' },
  submitBtn: { backgroundColor: '#008080', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  savedReply: { marginTop: '10px', padding: '8px 12px', backgroundColor: '#eef9f8', borderRadius: '4px', borderLeft: '3px solid #008080', fontSize: '13px', color: '#333' }
};

export default PhmRequests;