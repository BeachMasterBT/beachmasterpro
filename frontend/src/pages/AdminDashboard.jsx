import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>👑 Painel Administrativo Master</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div className="card" style={{ background: '#2c3e50' }}>
          <h3>Atletas</h3>
          <p style={{ fontSize: '24px' }}>1.250</p>
        </div>
        <div className="card" style={{ background: '#27ae60' }}>
          <h3>Torneios</h3>
          <p style={{ fontSize: '24px' }}>12</p>
        </div>
        <div className="card" style={{ background: '#e67e22' }}>
          <h3>Arenas</h3>
          <p style={{ fontSize: '24px' }}>45</p>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Gerenciar Novas Arenas</h3>
        <button style={{ padding: '10px', background: 'white', color: 'black', border: 'none', borderRadius: '5px' }}>
          + Cadastrar Nova Arena no Brasil
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;