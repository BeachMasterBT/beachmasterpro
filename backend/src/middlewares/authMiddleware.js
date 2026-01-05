import jwt from "jsonwebtoken";

/**
 * Middleware de autenticação
 * Verifica se o usuário está logado
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token de autenticação não fornecido");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    next();
  } catch (err) {
    const error = new Error("Token inválido ou expirado");
    error.status = 401;
    return next(error);
  }
};

/**
 * Middleware de autorização por perfil
 * Exemplo: authorize("admin", "arbitro")
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("Usuário não autenticado");
      error.status = 401;
      return next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error("Você não tem permissão para acessar esta funcionalidade");
      error.status = 403;
      return next(error);
    }

    next();
  };
};
