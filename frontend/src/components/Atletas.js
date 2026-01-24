import React from 'react';

const Atletas = () => {
  // Dados de exemplo para o mestre visualizar o novo tamanho
  const listaExemplo = [
    { id: 1, nome: 'Jorge Schell', categoria: 'Masculino A (Pró)', ranking: '1º' },
    { id: 2, nome: 'Ana Sand', categoria: 'Feminino A (Pró)', ranking: '3º' },
    { id: 3, nome: 'Lucas Kids', categoria: 'Sub-14', ranking: '10º' }
  ];

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Atleta</th>
            <th>Categoria Oficial</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {listaExemplo.map(atleta => (
            <tr key={atleta.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ fontWeight: 'bold' }}>{atleta.nome}</td>
              <td>
                <span className="tag-categoria">
                  {atleta.categoria}
                </span>
              </td>
              <td style={{ fontWeight: 'bold', color: '#f39c12' }}>{atleta.ranking} lugar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Atletas;