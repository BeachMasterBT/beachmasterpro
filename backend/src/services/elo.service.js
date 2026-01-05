import User from "../models/User.js";
import Match from "../models/Match.js";

// ============================
// CONFIGURAÇÕES ELO
// ============================
const K_FACTOR = 32;

// ============================
// CALCULA PROBABILIDADE
// ============================
function expectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

// ============================
// ATUALIZA ELO APÓS PARTIDA
// ============================
export async function updateElo(matchId) {
  const match = await Match.findById(matchId)
    .populate("teamA")
    .populate("teamB");

  if (!match || !match.winner) return;

  const teamAWon = match.winner === "teamA";

  for (const playerA of match.teamA) {
    for (const playerB of match.teamB) {
      const expectedA = expectedScore(playerA.elo, playerB.elo);
      const expectedB = expectedScore(playerB.elo, playerA.elo);

      playerA.elo +=
        K_FACTOR * ((teamAWon ? 1 : 0) - expectedA);

      playerB.elo +=
        K_FACTOR * ((teamAWon ? 0 : 1) - expectedB);

      await playerA.save();
      await playerB.save();
    }
  }

  await detectSuspiciousPlayer(match.teamA, match.teamB);
}

// ============================
// DETECTA FRAUDE DE CATEGORIA
// ============================
async function detectSuspiciousPlayer(teamA, teamB) {
  const allPlayers = [...teamA, ...teamB];

  for (const player of allPlayers) {
    const recentMatches = await Match.find({
      $or: [
        { teamA: player._id },
        { teamB: player._id }
      ],
      status: "finished"
    })
      .sort({ finishedAt: -1 })
      .limit(3);

    if (recentMatches.length < 3) continue;

    let dominantWins = 0;

    for (const match of recentMatches) {
      if (
        match.winner &&
        match.winner.includes(player._id.toString())
      ) {
        dominantWins++;
      }
    }

    // REGRA DE PROMOÇÃO AUTOMÁTICA
    if (dominantWins === 3 && player.category === "C") {
      player.flaggedForPromotion = true;
      player.suggestedCategory = "B";

      await player.save();
    }
  }
}
