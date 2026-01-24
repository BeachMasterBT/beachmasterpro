import React from 'react';

const Partidas = () => {
  const jogosAtivos = [
    { id: 1, duplaA: "João/Pedro", duplaB: "Carlos/Beto", quadra: "Central", status: "Em andamento" },
    { id: 2, duplaA: "Maria/Ana", duplaB: "Julia/Cris", quadra: "02", status: "Aguardando" }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 Programação de Jogos</h2>
      {jogosAtivos.map(jogo => (
        <div className="card" key={jogo.id} style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <strong>{jogo.duplaA} vs {jogo.duplaB}</strong>
            <p>Quadra: {jogo.quadra}</p>
          </div>
          <div style={{ color: jogo.status === "Em andamento" ? "#ff7e5f" : "white" }}>
            {jogo.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Partidas;