import React from 'react';
import './styles/index.css';

const Categorias = () => {
  const categories = [
    { id: 1, name: 'Pro - Singles', type: 'Simples', level: 'Profissional', players: 12 },
    { id: 2, name: 'Amador - Doubles', type: 'Duplas', level: 'Amador', players: 18 },
    { id: 3, name: 'Master - Mixed', type: 'Misto', level: 'Elite', players: 8 },
  ];

  return (
    <div id="app">
      <h2>Categorias de Torneio</h2>
      <p style={{ marginBottom: '20px', color: '#A0A0A0' }}>
        Organize torneios com base em nível, tipo e número de jogadores.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              background: '#14213D',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              border: '1px solid #333333',
              textAlign: 'center'
            }}
          >
            <h3 style={{ color: '#FFD700', margin: '0 0 12px 0' }}>{cat.name}</h3>
            <p><strong>Tipo:</strong> {cat.type}</p>
            <p><strong>Nível:</strong> {cat.level}</p>
            <p><strong>Jogadores:</strong> {cat.players}</p>
            <div style={{ marginTop: '16px' }}>
              <button className="btn">Editar</button>
              <button className="btn btn-secondary" style={{ marginLeft: '8px' }}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button className="btn">Nova Categoria</button>
        <button className="btn btn-secondary" style={{ marginLeft: '12px' }}>Exportar PDF</button>
      </div>
    </div>
  );
};

export default Categorias;