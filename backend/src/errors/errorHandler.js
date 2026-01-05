import logger from "../utils/logger.js";

/**
 * Middleware global de tratamento de erros
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;

  const errorResponse = {
    error: true,
    status: statusCode,
    message: getFriendlyMessage(err, statusCode),
    technicalMessage: err.message || "Erro interno desconhecido",
    requestId: req.context?.requestId || null,
    timestamp: new Date().toISOString()
  };

  // Log técnico completo (para admin / IA)
  logger.error({
    status: statusCode,
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    ip: req.ip,
    requestId: errorResponse.requestId
  });

  res.status(statusCode).json(errorResponse);
};

/**
 * Mensagens amigáveis para humanos (sem programação)
 */
function getFriendlyMessage(err, statusCode) {
  if (err.name === "ValidationError") {
    return "Algum dado foi preenchido de forma incorreta. Verifique e tente novamente.";
  }

  if (err.name === "CastError") {
    return "O formato de um dado está inválido.";
  }

  if (statusCode === 401) {
    return "Você precisa estar logado para acessar essa área.";
  }

  if (statusCode === 403) {
    return "Você não tem permissão para realizar essa ação.";
  }

  if (statusCode === 404) {
    return "O que você procura não foi encontrado.";
  }

  if (statusCode >= 500) {
    return "O sistema encontrou um problema interno. Já estamos cuidando disso.";
  }

  return "Ocorreu um erro inesperado.";
}

export default errorHandler;
