import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro MongoDB:", err));

// 📦 Model
const EventoSchema = new mongoose.Schema({
  nome: String,
  data: String,
  criadoEm: { type: Date, default: Date.now }
});
const Evento = mongoose.model("Evento", EventoSchema);

// 🟢 Health Check (obrigatório para frontend)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// 🔐 Login simples (MVP)
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ token: "login-ok", user: { email } });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
});

// 📋 Listar eventos
app.get("/events", async (req, res) => {
  const eventos = await Evento.find().sort({ criadoEm: -1 });
  res.json(eventos);
});

// ➕ Criar evento
app.post("/events", async (req, res) => {
  const { nome, data } = req.body;
  const novoEvento = new Evento({ nome, data });
  await novoEvento.save();
  res.json(novoEvento);
});

// 🚀 Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`🚀 Beach Master Pro rodando na porta ${PORT}`)
);
