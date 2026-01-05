import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("src/public"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

const EventSchema = new mongoose.Schema({
  nome: String,
  data: String
});
const Event = mongoose.model("Event", EventSchema);

// STATUS
app.get("/", (req, res) => {
  res.json({ status: "Backend Online" });
});

// LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email, password: senha });
  if (!user) {
    return res.status(401).json({ message: "Login inválido" });
  }
  res.json({ token: "token_simples_ok" });
});

// LISTAR EVENTOS
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// CRIAR EVENTO
app.post("/events", async (req, res) => {
  const { nome, data } = req.body;
  const evento = new Event({ nome, data });
  await evento.save();
  res.json({ message: "Evento criado" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
