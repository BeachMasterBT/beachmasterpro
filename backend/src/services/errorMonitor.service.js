import fs from "fs";
import path from "path";

const LOG_DIR = path.resolve("logs");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// ============================
// REGISTRO CENTRAL DE ERROS
// ============================
export function logError(error, context = {}) {
  const timestamp = new Date().toISOString();

  const errorData = {
    timestamp,
    message: error.message,
    stack: error.stack,
    context,
    severity: classifySeverity(error),
    explanation: explainError(error),
    suggestion: suggestFix(error)
  };

  const filePath = path.join(LOG_DIR, "system-errors.json");

  let logs = [];
  if (fs.existsSync(filePath)) {
    logs = JSON.parse(fs.readFileSync(filePath));
  }

  logs.push(errorData);
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));

  console.error("🚨 ERRO REGISTRADO:", errorData);
}

// ============================
// CLASSIFICA GRAVIDADE
// ============================
function classifySeverity(error) {
  if (error.message.includes("Mongo")) return "CRÍTICO";
  if (error.message.includes("JWT")) return "SEGURANÇA";
  if (error.message.includes("timeout")) return "INSTABILIDADE";
  return "NORMAL";
}

// ============================
// EXPLICA ERRO EM PORTUGUÊS
// ============================
function explainError(error) {
  if (error.message.includes("Mongo")) {
    return "O sistema não conseguiu acessar o banco de dados. Pode ser conexão ou credenciais.";
  }
  if (error.message.includes("JWT")) {
    return "Problema de autenticação. O usuário pode não estar logado corretamente.";
  }
  if (error.message.includes("validation")) {
    return "Algum dado foi enviado errado ou incompleto.";
  }
  return "Erro interno do sistema.";
}

// ============================
// SUGERE SOLUÇÃO AUTOMÁTICA
// ============================
function suggestFix(error) {
  if (error.message.includes("Mongo")) {
    return "Verificar variáveis de ambiente e conexão com o MongoDB Atlas.";
  }
  if (error.message.includes("JWT")) {
    return "Verificar token do usuário ou forçar novo login.";
  }
  if (error.message.includes("validation")) {
    return "Revisar formulário e campos obrigatórios.";
  }
  return "Analisar contexto e aplicar correção.";
}

// ============================
// DETECTA RISCO FUTURO
// ============================
export function preventiveScan(metrics) {
  const warnings = [];

  if (metrics.memoryUsage > 80) {
    warnings.push("Uso de memória elevado. Possível risco de travamento futuro.");
  }

  if (metrics.failedLogins > 10) {
    warnings.push("Muitas tentativas de login falhas. Possível ataque.");
  }

  return warnings;
}
