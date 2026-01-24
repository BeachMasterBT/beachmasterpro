import express from "express";

const app = express();

// ============================
// MIDDLEWARE GLOBAL DE CONTEXTO
// ============================
app.use((req, res, next) => {
  req.context = {
    requestId: crypto.randomUUID(),
    startTime: Date.now()
  };
  next();
});

// ============================
// ROTAS BASE (PLACEHOLDER SEGURAS)
// ============================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ============================
// EXEMPLO DE ROTA PROTEGIDA FUTURA
// ============================
app.get("/admin", (req, res) => {
  res.status(403).json({
    error: true,
    message: "Acesso restrito. Autenticação necessária."
  });
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
  const responseTime = Date.now() - req.context.startTime;

  console.error("❌ ERRO CAPTURADO:", {
    requestId: req.context.requestId,
    message: err.message,
    stack: err.stack,
    responseTime
  });

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Erro interno",
    requestId: req.context.requestId
  });
});

export default app;
