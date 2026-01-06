import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("src/public"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro MongoDB:", err));

/* MODELOS */
const Evento = mongoose.model(
  "Evento",
  new mongoose.Schema({
    nome: String,
    data: String,
    createdAt: { type: Date, default: Date.now }
  })
);

/* HEALTH CHECK */
app.get("/health", (req, res) => {
  res.json({ status: "OK", app: "Beach Master Pro" });
});

/* LOGIN SIMPLES (MVP CONTROLADO) */
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "beachmasterbt@gmail.com" &&
    password === "Sama1106"
  ) {
    return res.json({
      message: "Login OK",
      token: "beachmaster-token-ok"
    });
  }

  res.status(401).json({ message: "Credenciais inválidas" });
});

/* EVENTOS */
app.get("/events", async (req, res) => {
  const eventos = await Evento.find().sort({ createdAt: -1 });
  res.json(eventos);
});

app.post("/events", async (req, res) => {
  const evento = new Evento(req.body);
  await evento.save();
  res.json({ message: "Evento criado", evento });
});

/* START */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`🚀 Beach Master Pro rodando na porta ${PORT}`)
);
