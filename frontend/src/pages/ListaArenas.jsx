import React, { useState } from 'react';

const ListaArenas = () => {
  const [busca, setBusca] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 Encontre uma Arena para Jogar</h2>
      <input 
        type="text" 
        placeholder="Digite sua cidade ou estado..." 
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', marginBottom: '20px' }}
      />
      
      <div className="card">
        <strong>Arena Central Beach</strong>
        <p>São Paulo - SP</p>
        <small>Disponível para Torneios</small>
      </div>
    </div>
  );
};

export default ListaArenas;