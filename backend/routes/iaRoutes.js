import express from 'express';
const router = express.Router();

// Estrada para enviar um PDF ou Excel para a IA ler
router.post('/upload-inteligente', (req, res) => {
  res.json({ 
    mensagem: "IA recebeu o arquivo! Organizando atletas e chaves automaticamente...",
    progresso: "100%"
  });
});

export default router;