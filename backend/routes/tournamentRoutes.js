import express from 'express';
const router = express.Router();

// Estrada para ver a lista de torneios
router.get('/', (req, res) => {
  res.json({ message: "Aqui estão os torneios de Beach Tennis!" });
});

export default router;