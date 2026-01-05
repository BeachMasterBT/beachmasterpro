import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
  teamA: {
    type: Number,
    default: 0
  },
  teamB: {
    type: Number,
    default: 0
  },
  finished: {
    type: Boolean,
    default: false
  }
});

const MatchSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true
    },

    teamA: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    teamB: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    sets: {
      type: [SetSchema],
      default: [{ teamA: 0, teamB: 0 }]
    },

    currentSet: {
      type: Number,
      default: 0
    },

    winner: {
      type: String,
      enum: ["teamA", "teamB", null],
      default: null
    },

    status: {
      type: String,
      enum: ["scheduled", "live", "finished"],
      default: "scheduled"
    },

    referee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    court: {
      type: String
    },

    startedAt: Date,
    finishedAt: Date
  },
  {
    timestamps: true
  }
);

// ============================
// DETECTA MATCH POINT
// ============================
MatchSchema.methods.isMatchPoint = function () {
  const set = this.sets[this.currentSet];
  return (
    (set.teamA >= 5 && set.teamA - set.teamB >= 1) ||
    (set.teamB >= 5 && set.teamB - set.teamA >= 1)
  );
};

// ============================
// MARCAR PONTO
// ============================
MatchSchema.methods.scorePoint = function (team) {
  if (this.status !== "live") return;

  const set = this.sets[this.currentSet];

  set[team] += 1;

  // Finaliza set
  if (set[team] >= 6 && Math.abs(set.teamA - set.teamB) >= 2) {
    set.finished = true;

    // Novo set
    this.sets.push({ teamA: 0, teamB: 0 });
    this.currentSet += 1;
  }
};

export default mongoose.model("Match", MatchSchema);
