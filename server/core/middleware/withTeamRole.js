import validateSocketTeamRole from "../../core/middleware/validateSocketTeamRole.js";

const withTeamRole = (roles, teamId, socket, handler) => {
  console.log("withRole roles", roles);
  console.log("withRole teamId", teamId);
  console.log("withRole handler", handler);

  validateSocketTeamRole(teamId, ...roles)(socket, async (err) => {
    console.log("withRole err", err);

    if (err) {
      socket.emit("taskError", {
        message: err.message,
        code: "UNAUTHORIZED",
      });
      return;
    }

    console.log("comes here if there is role and proceed to await handler");

    await handler();
  });
};

export default withTeamRole;
