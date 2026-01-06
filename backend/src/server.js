import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
const server = http.createServer(app);

// Configuração de acesso
app.use(cors({ origin: "*" }));
app.use(express.json());

// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Banco Conectado"))
  .catch((err) => console.error("❌ Erro Banco:", err));

// Modelo de Dados
const Evento = mongoose.model("Evento", new mongoose.Schema({ nome: String, data: String }));

// --- AS ROTAS QUE VÃO TIRAR O ERRO 401 ---

// Rota de Login (Verifica suas credenciais)
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ token: "sucesso", message: "Login OK" });
  }
  res.status(401).json({ message: "Login falhou" });
});

// Rota de Eventos
app.get("/events", async (req, res) => {
  const eventos = await Evento.find();
  res.json(eventos);
});

app.post("/events", async (req, res) => {
  const novo = new Evento(req.body);
  await novo.save();
  res.json(novo);
});

// Iniciar
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log("🚀 Sistema Pronto"));
