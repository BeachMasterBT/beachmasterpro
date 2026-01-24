import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>🏖️ BEACH MASTER PRO</div>
      <div>
        <a href="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Início</a>
        <a href="/rankings" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Rankings</a>
        <button style={{ background: 'white', color: '#ff7e5f', border: 'none', padding: '5px 15px', borderRadius: '20px' }}>Entrar</button>
      </div>
    </nav>
  );
};

export default Navbar;