import {
  createTeam,
  getMyTeams,
  deleteTeam,
  updateTeam,
  getTeam,
  joinRequest,
  getRequests,
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

  socket.on("getTeam", async (teamId, callback) => {
    console.log("getTeam backend", teamId);

    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    console.log("team id accepted backend");

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      console.log("Backend role accepted for getTeam");
      try {
        console.log("Backend trying to get team");
        const result = await getTeam(teamId, socket.user.id);
        callback(result);

        socket.broadcast.emit("team:found", result);
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

  socket.on("joinRequest", async (teamId, userId, callback) => {
    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    console.log("team id accepted backend");

    if (!userId || userId !== socket.user.id) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    console.log("user id accepted backend");
    withGlobalRole(
      ["admin", "editor", "agent", "viewer"],
      teamId,
      userId,
      async () => {
        console.log("Backend role accepted for joinTeam");
        try {
          console.log("Backend trying to join team");
          const result = await joinRequest(teamId, userId);
          callback(result);

          socket.broadcast.emit("team:requestSent", result);
        } catch (error) {
          callback({
            success: false,
            error: {
              message: error.message,
              code: "SERVER_ERROR",
            },
          });
        }
      }
    );
  });

  socket.on("getRequests", async (userId, callback) => {
    if (!userId || userId !== socket.user.id) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    console.log("user id accepted backend for getRequests");

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      console.log("Backend role accepted for getRequests");
      try {
        console.log("Backend trying to get teams for getRequests");
        const teams = await getMyTeams(userId);
        console.log("teams get for getRequests", teams);
        const results = [];

        for (const team of teams.data) {
          await new Promise((resolve) => {
            withTeamRole(["admin"], team.id, socket, async () => {
              const reqs = await getRequests(team.id, userId);
              console.log("reqs for getRequests", reqs);
              if (reqs.success) {
                results.push({
                  teamName: team.name,
                  requests: reqs.data,
                });
              }
              resolve();
            });
          });
        }

        console.log("results for getRequests", results);

        callback({
          success: true,
          data: results,
        });

        socket.broadcast.emit("team:requests", results);
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
