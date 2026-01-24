import express from 'express';
const router = express.Router();

// Estrada para o árbitro atualizar o placar
router.put('/:id/score', (req, res) => {
  res.json({ message: "Placar atualizado em tempo real!" });
});

// Estrada para finalizar a partida
router.post('/:id/finish', (req, res) => {
  res.json({ message: "Partida finalizada e vencedor declarado!" });
});

export default router;