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

// SEGURANÇA BÁSICA
app.use(helmet());
app.use(cors({ origin: "*" })); // Liberado para o seu frontend acessar

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// BANCO DE DADOS
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB conectado com sucesso"))
  .catch((error) => console.error("❌ Erro ao conectar no MongoDB:", error.message));

// MODELO DE EVENTO
const Evento = mongoose.model("Evento", new mongoose.Schema({
  nome: String,
  data: String
}));

// SOCKET.IO
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// ============================
// AS ROTAS QUE ESTAVAM FALTANDO:
// ============================

// 1. Rota de Login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  // Verificando suas credenciais exatas
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ token: "sucesso_auth_beach_master", message: "Login realizado!" });
  }
  res.status(401).json({ error: true, message: "E-mail ou senha incorretos" });
});

// 2. Rota para Listar Eventos
app.get("/events", async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: true });
  }
});

// 3. Rota para Criar Evento
app.post("/events", async (req, res) => {
  try {
    const novoEvento = new Evento(req.body);
    await novoEvento.save();
    res.json(novoEvento);
  } catch (error) {
    res.status(500).json({ error: true });
  }
});

app.get("/health", (req, res) => res.json({ status: "OK" }));
app.get("/", (req, res) => res.json({ status: "Online" }));

// INICIAR SERVIDOR
const PORT = process.env.PORT || 10000; 
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
