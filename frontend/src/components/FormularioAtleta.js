import React, { useState, useEffect } from 'react';

const FormularioAtleta = ({ aoSalvar, aoCancelar }) => {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [minhasCategorias, setMinhasCategorias] = useState([]);

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem('minhasCategorias')) || [];
    setMinhasCategorias(salvas);
  }, []);

  return (
    <div className="card-sistema">
      <h2 style={{ color: 'var(--navy-dark)' }}>📝 Novo Cadastro de Atleta</h2>
      <form onSubmit={(e) => { e.preventDefault(); aoSalvar(); }}>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Nome do Atleta:</label>
          <input 
            type="text" 
            className="input-master" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)}
            required 
            placeholder="Nome Completo"
            style={{ width: '100%', padding: '15px', marginTop: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Categoria:</label>
          <select 
            className="input-master" 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
            required
            style={{ width: '100%', padding: '15px', marginTop: '10px', borderRadius: '10px' }}
          >
            <option value="">-- Selecione a Categoria --</option>
            
            <optgroup label="♀️ FEMININO (Nível)">
              <option>Fem. PRO</option><option>Fem. A</option><option>Fem. B</option>
              <option>Fem. C</option><option>Fem. D</option><option>Fem. E</option><option>Fem. Iniciante</option>
            </optgroup>

            <optgroup label="♂️ MASCULINO (Nível)">
              <option>Masc. PRO</option><option>Masc. A</option><option>Masc. B</option>
              <option>Masc. C</option><option>Masc. D</option><option>Masc. E</option><option>Masc. Iniciante</option>
            </optgroup>

            <optgroup label="♀️ FEMININO (Sub/Idade)">
              <option>Fem -10</option><option>Fem -12</option><option>Fem -14</option><option>Fem -16</option><option>Fem -18</option><option>Fem -20</option><option>Fem -30</option>
              <option>Fem +20</option><option>Fem +30</option><option>Fem +40</option><option>Fem +50</option><option>Fem +60</option><option>Fem +70</option>
            </optgroup>

            <optgroup label="♂️ MASCULINO (Sub/Idade)">
              <option>Masc -10</option><option>Masc -12</option><option>Masc -14</option><option>Masc -16</option><option>Masc -18</option><option>Masc -20</option><option>Masc -30</option>
              <option>Masc +20</option><option>Masc +30</option><option>Masc +40</option><option>Masc +50</option><option>Masc +60</option><option>Masc +70</option>
            </optgroup>

            <optgroup label="🏆 OPEN / OUTROS">
              <option>OPEN MISTA</option><option>OPEN FEMININO</option><option>OPEN MASCULINO</option><option>CATEGORIA SIMPLES</option>
            </optgroup>

            {minhasCategorias.length > 0 && (
              <optgroup label="⭐ MINHAS CATEGORIAS (Personalizadas)">
                {minhasCategorias.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </optgroup>
            )}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button type="submit" className="btn-sucesso" style={{ flex: 1, padding: '15px', fontSize: '18px' }}>CONFIRMAR CADASTRO</button>
          <button type="button" onClick={aoCancelar} style={{ flex: 1, background: '#94a3b8', color: 'white', border: 'none', borderRadius: '10px' }}>CANCELAR</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioAtleta;