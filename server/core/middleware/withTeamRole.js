import validateSocketTeamRole from "../../core/middleware/validateSocketTeamRole.js";

const withTeamRole = (roles, teamId, socket, handler) => {
  validateSocketTeamRole(teamId, ...roles)(socket, async (err) => {
    if (err) {
      socket.emit("taskError", {
        message: err.message,
        code: "UNAUTHORIZED",
      });
      return;
    }

    await handler();
  });
};

export default withTeamRole;
