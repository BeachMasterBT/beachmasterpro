import React from 'react';

const Rankings = () => {
  // Dados de exemplo baseados nos seus CSVs
  const topAtletas = [
    { rank: 1, nome: "Campeão das Areias", pontos: 2500, categoria: "PRO" },
    { rank: 2, nome: "Mestre do Padel", pontos: 2100, categoria: "A" },
    { rank: 3, nome: "Rei do Beach", pontos: 1800, categoria: "A" }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>🏆 Ranking Oficial Brasil</h2>
      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <th style={{ padding: '10px' }}>Posição</th>
              <th style={{ padding: '10px' }}>Atleta</th>
              <th style={{ padding: '10px' }}>Pontos</th>
              <th style={{ padding: '10px' }}>Cat.</th>
            </tr>
          </thead>
          <tbody>
            {topAtletas.map((atleta) => (
              <tr key={atleta.rank} style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '10px' }}>{atleta.rank}º</td>
                <td style={{ padding: '10px' }}>{atleta.nome}</td>
                <td style={{ padding: '10px' }}>{atleta.pontos}</td>
                <td style={{ padding: '10px' }}>{atleta.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;