import express from "express";
import cors from "cors"; // Importação necessária para liberar o acesso
import mongoose from "mongoose"; // Necessário para o banco de dados

const app = express();

// ============================
// CONFIGURAÇÃO DE SEGURANÇA (CORS)
// ============================
// Libera o seu site específico para conversar com este servidor
app.use(cors({
  origin: 'https://beachmasterpro-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Permite que o servidor entenda dados de formulários (Login)

// ============================
// MIDDLEWARE GLOBAL DE CONTEXTO
// ============================
app.use((req, res, next) => {
  req.context = {
    requestId: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
    startTime: Date.now()
  };
  next();
});

// ============================
// ROTAS DE STATUS E TESTE
// ============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    system: "Beach Master Pro Backend",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ============================
// ROTA DE LOGIN (SIMULADA PARA TESTE)
// ============================
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  // Teste temporário com seus dados reais
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({
      token: "token_de_teste_sucesso",
      user: { name: "Admin Beach Master" }
    });
  }
  
  res.status(401).json({ error: true, message: "E-mail ou senha inválidos." });
});

// ============================
// ROTA DE EVENTOS (SIMULADA)
// ============================
app.get("/events", (req, res) => {
  res.json([
    { id: 1, nome: "Torneio de Verão 2025" },
    { id: 2, nome: "Circuito Beach Tennis Pro" }
  ]);
});

// ============================
// ROTA NÃO ENCONTRADA (404)
// ============================
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Rota não encontrada"
  });
});

// ============================
// TRATAMENTO FINAL DE ERROS
// ============================
app.use((err, req, res, next) => {
  const responseTime = Date.now() - (req.context?.startTime || 0);

  console.error("❌ ERRO CAPTURADO:", {
    message: err.message,
    responseTime
  });

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Erro interno"
  });
});

export default app;
