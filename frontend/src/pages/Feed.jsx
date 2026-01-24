import React from 'react';

const Feed = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📱 Feed Social Lif Kin</h2>
      <div className="card" style={{ marginBottom: '20px' }}>
        <textarea placeholder="O que está acontecendo na arena?" style={{ width: '100%', borderRadius: '10px', padding: '10px', border: 'none' }}></textarea>
        <button style={{ marginTop: '10px', padding: '8px 20px', borderRadius: '20px', background: '#ff7e5f', color: 'white', border: 'none' }}>Postar</button>
      </div>
      
      <div className="card">
        <strong>@Atleta_Exemplo</strong>
        <p>Acabei de ganhar minha primeira partida no Torneio Master! 🎾🏖️</p>
        <small>Há 5 minutos • 12 Curtidas</small>
      </div>
    </div>
  );
};

export default Feed;