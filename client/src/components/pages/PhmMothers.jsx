import React, { useState } from 'react';

const PhmMothers = () => {
  const [mothers] = useState([
    { id: 1, name: 'K. L. Perera', address: 'No 45, Temple Rd', status: 'Pregnant (6th Month)', contact: '071XXXXXXX' },
    { id: 2, name: 'M. S. Silva', address: 'No 12, Main St', status: 'Infant Care (3 Months)', contact: '077XXXXXXX' },
    { id: 3, name: 'A. H. Fernando', address: 'No 88, Station Rd', status: 'Pregnant (3rd Month)', contact: '075XXXXXXX' }
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h2>👩‍👧 Families & Mothers (ලියාපදිංචි මව්වරුන් සහ පවුල්)</h2>
      <div style={{ marginTop: '20px' }}>
        {mothers.map((m) => (
          <div key={m.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #008080', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{m.name}</h4>
            <p style={{ margin: '3px 0', fontSize: '13px', color: '#555' }}>📍 {m.address}</p>
            <p style={{ margin: '3px 0', fontSize: '13px', color: '#008080', fontWeight: 'bold' }}>ℹ️ {m.status}</p>
            <small style={{ color: '#777' }}>📞 {m.contact}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhmMothers;