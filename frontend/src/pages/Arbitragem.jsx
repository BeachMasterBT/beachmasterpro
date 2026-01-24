import React, { useState } from 'react';

const Arbitragem = () => {
  const [placarA, setPlacarA] = useState(0);
  const [placarB, setPlacarB] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🎾 Controle de Quadra</h2>
      <div className="card" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '30px' }}>
        <div>
          <p>Dupla A</p>
          <div style={{ fontSize: '60px' }}>{placarA}</div>
          <button onClick={() => setPlacarA(placarA + 1)} style={{ padding: '10px 20px', fontSize: '20px', borderRadius: '10px', background: '#2c3e50', color: 'white' }}>+ Ponto</button>
        </div>

        <div style={{ fontWeight: 'bold' }}>VS</div>

        <div>
          <p>Dupla B</p>
          <div style={{ fontSize: '60px' }}>{placarB}</div>
          <button onClick={() => setPlacarB(placarB + 1)} style={{ padding: '10px 20px', fontSize: '20px', borderRadius: '10px', background: '#2c3e50', color: 'white' }}>+ Ponto</button>
        </div>
      </div>
      
      <button style={{ marginTop: '30px', width: '100%', padding: '15px', borderRadius: '15px', background: '#ff7e5f', color: 'white', border: 'none', fontWeight: 'bold' }}>
        FINALIZAR PARTIDA E ENVIAR RESULTADO
      </button>
    </div>
  );
};

export default Arbitragem;