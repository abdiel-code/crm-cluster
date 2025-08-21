import { createTeam, deleteTeam, deleteTeamUser, getTeam, getTeamUsers, updateTeam, updateTeamUser } from "./teamsService.js";
import withRole from "../TasksColab/withRole.js";

const registerTeamEvents = (socket) => {
  socket.on("createTeam", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      try {
        const team = await createTeam(teamData);
        socket.emit("teamCreated", team);
      } catch (error) {
        socket.emit("teamError", {
          message: error.message,
          code: "CREATE_FAILED"
        })
      }
    })

  })

  socket.on("deleteTeam", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin"], socket, async () => {
      try {
        const result = await deleteTeam(teamData);
        socket.emit("teamDeleted", { teamId: result.teamId });
      } catch (error) {
        socket.emit("teamError", {
          message: error.message,
          code: "DELETE_FAILED"
        })
      }
    })
  })

  socket.on("updateTeam", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin"], socket, async () => {
      try {
        const result = await updateTeam(teamData);
        socket.emit("teamUpdated", { teamId: result.teamId });
      } catch (error) {
        socket.emit("teamError", {
          message: error.message,
          code: "UPDATE_FAILED"
        })
      }
    })
  })

  socket.on("getTeam", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      try {
        const result = await getTeam(teamData);
        socket.emit("teamFound", result);
      } catch (error) {
        socket.emit("teamError", {
          message: error.message,
          code: "GET_FAILED"
        })
      }
    })
  })

  socket.on("getTeamUsers", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamUsersError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      try {
        const result = await getTeamUsers(teamData);
        socket.emit("teamUsersFound", result);
      } catch (error) {
        socket.emit("teamError", {
          message: error.message,
          code: "GET_FAILED"
        })
      }
    })
  })

  socket.on("deleteTeamUser", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamUserError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin"], socket, async () => {
      try {
        const result = await deleteTeamUser(teamData);
        socket.emit("teamUserDeleted",  result);
      } catch (error) {
        socket.emit("teamUserError", {
          message: error.message,
          code: "DELETE_FAILED"
        })
      }
    })
  })

  socket.on("updateTeamUser", async (teamData) => {

    if (!teamData || typeof teamData !== "object") {
      socket.emit("teamUserError", {
        message: "Invalid team data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin"], socket, async () => {
      try {
        const result = await updateTeamUser(teamData);
        socket.emit("teamUserUpdated",  result);
      } catch (error) {
        socket.emit("teamUserError", {
          message: error.message,
          code: "UPDATE_FAILED"
        })
      }
    })
  })

}

export default registerTeamEvents
