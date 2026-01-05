import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// CONFIGURAÇÃO DE SEGURANÇA (CORS)
app.use(cors({
  origin: 'https://beachmasterpro-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// CONEXÃO COM O MONGODB (Usando sua variável do Render)
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Banco de Dados MongoDB Conectado!"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// MODELO DE EVENTO (Para o banco de dados)
const EventoSchema = new mongoose.Schema({ nome: String });
const Evento = mongoose.model("Evento", EventoSchema);

// ROTAS
app.get("/", (req, res) => res.json({ status: "Online", sistema: "Beach Master Pro" }));

// ROTA REAL DE EVENTOS (Busca no seu MongoDB)
app.get("/events", async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos.length > 0 ? eventos : [
      { nome: "Torneio de Verão 2025 (Exemplo)" },
      { nome: "Circuito Pro (Exemplo)" }
    ]);
  } catch (error) {
    res.status(500).json({ error: true, message: "Erro ao buscar no banco" });
  }
});

// ROTA DE LOGIN (Validando com seus dados)
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ token: "sucesso_auth_beach_master", message: "Login realizado!" });
  }
  res.status(401).json({ error: true, message: "Credenciais inválidas" });
});

export default app;
