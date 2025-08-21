import validateSocketRole from "../../core/middleware/validateSocketRole";

const withRole = (roles, socket, handler) => {
  validateSocketRole(...roles)(socket, async (err) => {
    if (err) {
      socket.emit("taskError", {
        message: err.message,
        code: "UNAUTHORIZED"
      });
      return;
    };

    await handler();
  });
};

export default withRole
