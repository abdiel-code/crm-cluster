const validateSocketGlobalRole = (...allowedRoles) => {
  return async (socket, next) => {
    const { id, role } = socket.user || {};

    if (!id || !role) {
      return next(new Error("Usuario no autenticado"));
    }

    if (!allowedRoles.includes(role)) {
      return next(new Error("Forbidden: insufficient global role"));
    }

    next();
  };
};


export default validateSocketGlobalRole;
