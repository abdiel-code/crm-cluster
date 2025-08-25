import {
  createTeam,
  getMyTeams,
  deleteTeam,
  updateTeam,
} from "./teamsService.js";
import withTeamRole from "../../core/middleware/withTeamRole.js";
import withGlobalRole from "../../core/middleware/withGlobalRole.js";

const registerTeamEvents = (socket) => {
  socket.on("createTeam", async (teamData, callback) => {
    if (!teamData || typeof teamData !== "object") {
      return callback({
        success: false,
        error: {
          code: "INVALID_DATA",
        },
      });
    }

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      try {
        const result = await createTeam(teamData);
        callback(result);

        socket.broadcast.emit("team:created", result);
      } catch (error) {
        callback({
          success: false,
          error: {
            message: error.message,
            code: "SERVER_ERROR",
          },
        });
      }
    });
  });

  socket.on("getMyTeams", async (userId, callback) => {
    if (!userId) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      try {
        const result = await getMyTeams(userId);

        console.log("result for registerTeamEvents", result);
        callback(result);
      } catch (error) {
        callback({
          success: false,
          error: {
            message: error.message,
            code: "SERVER_ERROR",
          },
        });
      }
    });
  });

  socket.on("deleteTeam", async (teamId, callback) => {
    console.log("deleting in socket deleteTeam");
    const userId = socket.user.id;

    console.log("socket deleteTeam userId", userId);
    console.log("socket deleteTeam teamId", teamId);

    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    withTeamRole(["admin"], teamId, socket, async () => {
      try {
        const result = await deleteTeam(teamId, userId);
        callback(result);

        socket.broadcast.emit("team:deleted", result);
      } catch (error) {
        callback({
          success: false,
          error: {
            message: error.message,
            code: "SERVER_ERROR",
          },
        });
      }
    });
  });

  socket.on("updateTeam", async (teamData, callback) => {
    if (!teamData || !teamData.id) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    console.log("Backend team data accepted");

    withTeamRole(["admin"], teamData.id, socket, async () => {
      console.log("Backend role accepted");
      try {
        console.log("Backend trying to update team");
        const result = await updateTeam(teamData, socket.user.id);
        callback(result);

        socket.broadcast.emit("team:updated", result);
      } catch (error) {
        callback({
          success: false,
          error: {
            message: error.message,
            code: "SERVER_ERROR",
          },
        });
      }
    });
  });
};

export default registerTeamEvents;
