import React from 'react';

const GerenciarCategorias = () => {
  const categorias = ["Mista Especial D", "Feminina - Especial E", "Masculino Especial D"];

  return (
    <div className="main-content">
      <div className="header-row">
        <h1 className="title-main">Categorias do Torneio</h1>
      </div>

      <div className="pro-card-table" style={{marginBottom: '40px', padding: '30px'}}>
        <p style={{marginTop: 0, fontWeight: 'bold', color: '#7f8c8d'}}>CRIAR NOVA MODALIDADE</p>
        <div style={{display: 'flex', gap: '15px'}}>
          <input 
            style={{flex: 1, padding: '15px', borderRadius: '10px', border: '1px solid #dcdde1', fontSize: '16px'}} 
            placeholder="Ex: Categoria Pais e Filhos" 
          />
          <button className="btn-elite-green">CRIAR AGORA</button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}}>
        {categorias.map((cat, i) => (
          <div key={i} style={{background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f2f6'}}>
            <span style={{fontWeight: '700', fontSize: '17px', color: '#1a2332'}}>{cat}</span>
            <div style={{display: 'flex', gap: '8px'}}>
              <button style={{background: '#f1f2f6', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer'}}>✏️</button>
              <button style={{background: '#fff1f0', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer'}}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciarCategorias;