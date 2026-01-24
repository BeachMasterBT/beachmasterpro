import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Tentando entrar no Beach Master Pro com: ' + email);
    // Aqui a IA vai ligar o código com o servidor depois!
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>Entrar no Sistema</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Seu E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Sua Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Entrar agora
        </button>
      </form>
    </div>
  );
};

export default Login;