import express from 'express';
const router = express.Router();

// Estrada para ver as postagens de todo mundo
router.get('/', (req, res) => {
  res.json({ message: "Carregando o Feed Social do Beach Master!" });
});

// Estrada para criar um novo post
router.post('/', (req, res) => {
  res.json({ message: "Postagem criada com sucesso!" });
});

export default router;