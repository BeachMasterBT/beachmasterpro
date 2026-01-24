import express from 'express';
const router = express.Router();

// Estrada para entrar no sistema
router.post('/login', (req, res) => {
  res.json({ message: "O Robô recebeu seu pedido de login!" });
});

export default router;