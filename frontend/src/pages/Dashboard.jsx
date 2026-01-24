import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const mockData = [
    { quadra: 'Pista Principal', status: 'Final Set', placar: '1-0' },
    { quadra: 'Pista 02', status: 'Aquecimento', placar: '0-0' },
  ];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Operação de Torneio</h1>
        <button className="btn-gold">NOVO JOGO</button>
      </div>

      <table className="table-enterprise">
        <thead>
          <tr>
            <th>Local</th>
            <th>Status do Jogo</th>
            <th>Placar</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, i) => (
            <tr key={i}>
              <td>{item.quadra}</td>
              <td style={{ color: '#10b981' }}>{item.status}</td>
              <td style={{ fontWeight: '800', fontSize: '1.2rem' }}>{item.placar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Dashboard;