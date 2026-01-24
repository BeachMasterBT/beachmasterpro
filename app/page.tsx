'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const res = await axios.post('http://localhost:3001/auth/login', {
      email,
      password,
    });

    localStorage.setItem('token', res.data.accessToken);
    alert('Login realizado com sucesso');
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Beach Master Pro</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
