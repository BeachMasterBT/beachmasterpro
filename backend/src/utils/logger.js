import winston from "winston";
import path from "path";
import fs from "fs";

const logDir = path.resolve("src", "logs");

// Cria pasta de logs se não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "errors.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log")
    })
  ]
});

// Log também no console em desenvolvimento
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;
