import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Beach Master Pro: Banco de Dados Conectado"))
  .catch(err => console.error("❌ Erro:", err));

// --- MOLDES DO SISTEMA ---
const EventoSchema = new mongoose.Schema({
  nome: String,
  data: String,
  categoria: String,
  local: String
});

const PostSchema = new mongoose.Schema({
  usuario: String,
  conteudo: String,
  data: { type: Date, default: Date.now }
});

const Evento = mongoose.model("Evento", EventoSchema);
const Post = mongoose.model("Post", PostSchema);

// --- COMANDOS DO SITE ---
app.get("/health", (req, res) => res.json({ status: "Online" }));

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ token: "MASTER-OK" });
  }
  return res.status(401).json({ message: "Acesso Negado" });
});

app.get("/events", async (req, res) => {
  const eventos = await Evento.find();
  res.json(eventos);
});

app.post("/events", async (req, res) => {
  const novo = new Evento(req.body);
  await novo.save();
  res.json(novo);
});

app.get("/lifkin", async (req, res) => {
  const posts = await Post.find().sort({ data: -1 });
  res.json(posts);
});

app.post("/lifkin", async (req, res) => {
  const novo = new Post(req.body);
  await novo.save();
  res.json(novo);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Sistema Online na porta ${PORT}`));
