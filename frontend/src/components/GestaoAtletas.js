import React from 'react';

const GestaoAtletas = () => {
  return (
    <div className="workspace">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
        <h1>Gestão de Atletas</h1>
        <button className="btn-enterprise btn-primary">+ NOVO ATLETA</button>
      </div>

      <div style={{background: 'var(--bg-card)', borderRadius: '10px', overflow: 'hidden'}}>
        <table className="table-pro">
          <thead>
            <tr>
              <th>ATLETA</th>
              <th>CATEGORIA OFICIAL</th>
              <th>RANKING</th>
              <th style={{textAlign: 'right'}}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{fontWeight: '600'}}>Jorge Schell</td>
              <td><span style={{background: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8', padding: '4px 12px', borderRadius: '5px'}}>Masculino A (Pró)</span></td>
              <td style={{color: 'var(--warning)', fontWeight: '700'}}>1º lugar</td>
              <td style={{textAlign: 'right'}}>
                <button style={{background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px'}}>⚙️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestaoAtletas;