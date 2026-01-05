import mongoose from "mongoose";

const TournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    sport: {
      type: String,
      default: "Beach Tennis"
    },

    category: {
      type: String,
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    maxPlayers: {
      type: Number,
      required: true
    },

    registeredPlayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    status: {
      type: String,
      enum: ["draft", "open", "closed", "finished"],
      default: "draft"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// ============================
// VALIDAÇÃO DE LIMITE DE ATLETAS
// ============================
TournamentSchema.methods.canRegister = function () {
  return this.registeredPlayers.length < this.maxPlayers;
};

export default mongoose.model("Tournament", TournamentSchema);
