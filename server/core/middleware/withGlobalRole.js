import validateSocketGlobalRole from "./validateSocketGlobalRole.js";

const withGlobalRole = (roles, socket, handler) => {
  return validateSocketGlobalRole(...roles)(socket, async (err) => {
    if (err) {
      socket.emit("taskError", {
        message: err.message,
        code: "UNAUTHORIZED"
      });
      return;
    }

    await handler();
  });
};

export default withGlobalRole;
