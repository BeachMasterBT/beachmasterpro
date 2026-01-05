import { Server } from "socket.io";
import Match from "../models/Match.js";
import { updateElo } from "../services/elo.service.js";
import { logError } from "../services/errorMonitor.service.js";

export function setupRealtime(server) {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Conectado:", socket.id);

    // Entrar na sala da partida
    socket.on("joinMatch", (matchId) => {
      socket.join(matchId);
    });

    // Marcar ponto
    socket.on("scorePoint", async ({ matchId, team }) => {
      try {
        const match = await Match.findById(matchId);

        if (!match) return;

        match.status = "live";
        match.scorePoint(team);

        // Detecta match point
        const isMatchPoint = match.isMatchPoint();

        // Finaliza partida
        if (match.winner) {
          match.status = "finished";
          match.finishedAt = new Date();

          await updateElo(match._id);
        }

        await match.save();

        // Atualiza todos
        io.to(matchId).emit("matchUpdate", {
          match,
          isMatchPoint
        });

        // Aviso automático
        if (isMatchPoint) {
          io.emit("notification", {
            message:
              "Partida em fase final. Compareçam à quadra em 10 minutos."
          });
        }
      } catch (error) {
        logError(error, { action: "scorePoint", matchId });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Desconectado:", socket.id);
    });
  });
}
