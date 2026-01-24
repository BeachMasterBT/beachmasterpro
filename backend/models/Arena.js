import mongoose from 'mongoose';

const arenaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  endereco: { type: String },
  telefone: { type: String },
  responsavel: { type: String },
  vagas: { type: Number, default: 0 }
}, { timestamps: true });

const Arena = mongoose.model('Arena', arenaSchema);
export default Arena;