import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000; // ESSA LINHA RESOLVE O ERRO DE PORTA

// CONFIGURAÇÃO DE SEGURANÇA (CORS)
app.use(cors({
  origin: 'https://beachmasterpro-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// CONEXÃO COM O MONGODB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Banco de Dados Conectado!"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

// MODELO DE EVENTO
const Evento = mongoose.model("Evento", new mongoose.Schema({ nome: String }));

// ROTAS
app.get("/", (req, res) => res.json({ status: "Online", sistema: "Beach Master Pro" }));

app.get("/health", (req, res) => res.json({ status: "OK" }));

app.get("/events", async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos.length > 0 ? eventos : [{ nome: "Torneio Exemplo 2025" }]);
  } catch (error) {
    res.status(500).json({ error: true });
  }
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "beachmasterbt@gmail.com" && password === "Sama1106") {
    return res.json({ token: "sucesso_auth", message: "Login realizado!" });
  }
  res.status(401).json({ error: true, message: "Credenciais inválidas" });
});

// COMANDO PARA LIGAR O SERVIDOR (O QUE ESTAVA FALTANDO)
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export default app;
