import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ============================
// SEGURANÇA BÁSICA
// ============================
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// ============================
// MIDDLEWARES GERAIS
// ============================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// ============================
// BANCO DE DADOS
// ============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar no MongoDB:", error.message);
    process.exit(1);
  });

// ============================
// SOCKET.IO (TEMPO REAL)
// ============================
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN || "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

// Disponibiliza o socket para o resto do sistema
app.set("io", io);

// ============================
// ROTAS (serão carregadas depois)
// ============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    system: "Beach Master Pro Backend",
    version: "1.0.0"
  });
});

// ============================
// TRATAMENTO GLOBAL DE ERROS
// ============================
app.use((err, req, res, next) => {
  console.error("🔥 ERRO GLOBAL:", err);

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Erro interno do servidor"
  });
});

// ============================
// INICIAR SERVIDOR
// ============================
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
