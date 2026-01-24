import express from 'express';
const router = express.Router();

// Estrada para o Admin ver quanto o sistema está rendendo
router.get('/estatisticas', (req, res) => {
  res.json({ 
    totalAtletas: 1250, 
    torneiosAtivos: 12, 
    arenasParceiras: 45 
  });
});

export default router;