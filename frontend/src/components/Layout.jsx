import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container-master">
      <aside className="sidebar-elite">
        <div className="logo-brand">Beach Master Pro</div>
        <nav className="nav-list">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Torneios</button>
          <button className="nav-item">Atletas</button>
          <button className="nav-item">Configurações</button>
        </nav>
      </aside>
      <main className="main-view">
        {children}
      </main>
    </div>
  );
};

export default Layout;