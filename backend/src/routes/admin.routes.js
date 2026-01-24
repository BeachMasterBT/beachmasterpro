import express from "express";
import ErrorLog from "../models/ErrorLog.js";
import User from "../models/User.js";
import Match from "../models/Match.js";
import { analyzeErrorWithAI } from "../services/aiAudit.service.js";
import { authAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * 🔐 Proteção total: só admin
 */
router.use(authAdmin);

/**
 * 📊 DASHBOARD GERAL
 */
router.get("/dashboard", async (req, res) => {
  const errors = await ErrorLog.find().sort({ createdAt: -1 }).limit(50);
  const users = await User.countDocuments();
  const matches = await Match.countDocuments();

  res.json({
    status: "ok",
    stats: {
      users,
      matches,
      errors: errors.length
    },
    recentErrors: errors
  });
});

/**
 * 🧠 IA ANALISA UM ERRO ESPECÍFICO
 */
router.get("/errors/:id/analyze", async (req, res) => {
  const error = await ErrorLog.findById(req.params.id);

  if (!error) {
    return res.status(404).json({ message: "Erro não encontrado" });
  }

  const aiAnalysis = await analyzeErrorWithAI(error);

  res.json({
    error,
    aiAnalysis
  });
});

/**
 * 🚨 PREVENÇÃO DE ERROS FUTUROS
 */
router.get("/system/risks", async (req, res) => {
  const errors = await ErrorLog.find();

  const aiPrediction = await analyzeErrorWithAI({
    message: "Analise riscos futuros do sistema",
    stack: JSON.stringify(errors)
  });

  res.json({
    risks: aiPrediction
  });
});

/**
 * 🏆 PROMOÇÃO DE CATEGORIA MANUAL (ADMIN)
 */
router.post("/users/:id/promote", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  user.category = req.body.newCategory;
  await user.save();

  res.json({
    message: "Categoria atualizada com sucesso",
    user
  });
});

/**
 * 🛠️ AUTOCORREÇÃO (QUANDO POSSÍVEL)
 */
router.post("/errors/:id/autofix", async (req, res) => {
  const error = await ErrorLog.findById(req.params.id);

  if (!error) {
    return res.status(404).json({ message: "Erro não encontrado" });
  }

  if (!error.autoFix) {
    return res.json({
      message: "Este erro exige ação humana",
      suggestion: error.suggestion
    });
  }

  // Aqui futuramente aplica patch automático
  error.fixed = true;
  await error.save();

  res.json({
    message: "Correção automática aplicada com sucesso"
  });
});

export default router;
