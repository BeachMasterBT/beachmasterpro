import React, { useState } from 'react';

const PainelIA = () => {
  const [status, setStatus] = useState('Aguardando arquivo...');

  const simularIA = () => {
    setStatus('🤖 IA Analisando PDF/Excel...');
    setTimeout(() => {
      setStatus('✅ 150 Atletas novos cadastrados e Ranking atualizado!');
    }, 3000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🤖 Assistente de Inteligência Artificial</h2>
      <div className="card" style={{ border: '2px dashed #ff7e5f', textAlign: 'center', padding: '40px' }}>
        <p>Arraste seus arquivos **PDF ou EXCEL** aqui para a IA processar</p>
        <button onClick={simularIA} style={{ padding: '10px 20px', background: '#ff7e5f', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
          Simular Processamento de Dados Reais
        </button>
      </div>
      
      <div className="card" style={{ marginTop: '20px', background: '#2c3e50' }}>
        <strong>Status da IA:</strong>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default PainelIA;