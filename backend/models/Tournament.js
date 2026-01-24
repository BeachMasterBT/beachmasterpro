import mongoose from 'mongoose';

const tournamentSchema = mongoose.Schema({
  name: { type: String, required: true },
  arena: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'aberto' }
}, { timestamps: true });

const Tournament = mongoose.model('Tournament', tournamentSchema);
export default Tournament;