import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// BANCO DE DADOS
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Conectado"))
  .catch((err) => console.error("❌ Erro Banco:", err));

const Evento = mongoose.model("Evento", new mongoose.Schema({ nome: String, data: String }));

// ROTAS
app.get("/health", (req, res) => res.json({ status: "OK" })); // ESSA LINHA RESOLVE O ERRO 404

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ message: "Login OK", token: "sucesso" });
  }
  res.status(401).json({ message: "Erro" });
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Servidor Pronto"));
