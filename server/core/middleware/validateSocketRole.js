const validateSocketRole = (...allowedRoles) => {
  return (socket, next) => {
    const { role } = socket.user;
    if (!allowedRoles.includes(role)) {
      return next(new Error("Forbidden: User does not have the required role"));
    }
    next();
  };
};

export default validateSocketRole;
