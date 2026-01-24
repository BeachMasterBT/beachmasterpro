import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  winner: { type: String, default: null },
  isFinished: { type: Boolean, default: false },
  court: { type: String }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);
export default Match;