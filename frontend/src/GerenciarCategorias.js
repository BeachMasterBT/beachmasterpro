/* Beach Master Pro - Elite Design System */
:root {
  --primary-navy: #1a2332;      /* Navy da Sidebar */
  --secondary-bg: #f3f7fa;      /* Fundo ultra-leve */
  --accent-emerald: #27ae60;    /* Verde Action (Botão) */
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --white: #ffffff;
  --border-color: #dcdde1;
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.05);
}

body {
  background-color: var(--secondary-bg);
  font-family: 'Inter', -apple-system, sans-serif;
  margin: 0;
  display: flex;
}

/* Sidebar Executiva */
.sidebar-elite {
  width: 260px;
  background: var(--primary-navy);
  min-height: 100vh;
  padding: 30px 20px;
  color: white;
}

.logo-container {
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  color: #a4b0be;
  text-decoration: none;
  margin-bottom: 10px;
  transition: 0.3s;
}

.nav-item:hover, .nav-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* Container de Conteúdo */
.main-content {
  flex: 1;
  padding: 50px;
}

/* Títulos e Botão "Elite" */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title-main {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-navy);
  margin: 0;
}

.btn-elite-green {
  background: var(--accent-emerald);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.2);
}

/* Tabela Profissional */
.pro-card-table {
  background: var(--white);
  border-radius: 15px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  padding: 20px;
}

.elite-table {
  width: 100%;
  border-collapse: collapse;
}

.elite-table th {
  text-align: left;
  background: #f8f9fa;
  padding: 15px;
  color: var(--text-muted);
  font-size: 13px;
  text-transform: uppercase;
}

.elite-table td {
  padding: 18px 15px;
  border-bottom: 1px solid #f1f2f6;
  font-size: 15px;
}

.ranking-badge {
  color: #f1c40f;
  font-weight: 800;
}