import {
  createTeam,
  getMyTeams,
  deleteTeam,
  updateTeam,
  getTeam,
  joinRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  getTeamMembers,
  updateTeamUser,
  kickUser,
  getJoinedTeams,
  leaveTeam,
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
    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      console.log("Backend role accepted for joinTeam");
      try {
        console.log("Backend trying to join team");
        const result = await joinRequest(teamId, userId);
        callback(result);

        console.log(
          "Emitting team:requests for user" + userId + " on joinRequest"
        );
        socket.emit("team:requests", result);
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

        console.log(
          "Emitting team:request to user" + userId + " for getRequests"
        );
        socket.emit("team:requests", { userId, results });
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

  socket.on("handleRequest", async (teamId, userId, resolution, callback) => {
    console.log("handleRequest backend", teamId, userId, resolution);

    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    if (!socket.user.id) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    if (!resolution || (resolution !== "accept" && resolution !== "reject")) {
      return callback({
        success: false,
        error: {
          message: "Invalid resolution",
          code: "INVALID_DATA",
        },
      });
    }

    console.log("request handle data accepted backend");

    withTeamRole(["admin"], teamId, socket, async () => {
      console.log("Backend role accepted for handleRequest");
      try {
        console.log("Backend trying to handle request");

        console.log("resolution for handleRequest", resolution);

        if (resolution === "accept") {
          console.log("accepting request");
          const result = await acceptRequest(teamId, userId);
          callback(result);

          socket.emit("team:accepted", result);
        } else {
          console.log("rejecting request");
          const result = await rejectRequest(teamId, userId);
          callback(result);

          socket.emit("team:rejected", result);
        }
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

  socket.on("getTeamMembers", async (teamId, callback) => {
    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    if (!socket.user.id) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    withTeamRole(["admin", "editor"], teamId, socket, async () => {
      console.log("Backend role accepted for getTeamMembers");

      try {
        console.log("Backend trying to get team members");
        const result = await getTeamMembers(teamId, socket.user.id);

        socket.broadcast.emit("team:members", result);
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

  socket.on("updateTeamUser", async (userId, teamId, userRole, callback) => {
    console.log("updateTeamUser backend", userId, teamId, userRole);

    if (!userId) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    if (!userRole) {
      return callback({
        success: false,
        error: {
          message: "Invalid role",
          code: "INVALID_DATA",
        },
      });
    }

    if (!socket.user.id) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    console.log("updateTeamUser data accepted backend");

    withTeamRole(["admin"], teamId, socket, async () => {
      console.log("Backend role accepted for updateTeamUser");

      try {
        console.log("Backend trying to update team member role");
        const result = await updateTeamUser(userId, teamId, userRole);
        callback(result);

        socket.emit("team:roleUpdated", result);
        socket.broadcast.emit("team:roleUpdated", result);
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

  socket.on("kickUser", async (teamId, userId, callback) => {
    console.log("kickUser backend", teamId, userId);

    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    if (!socket.user.id) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    if (!userId) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    console.log("kickUser data accepted backend");

    withTeamRole(["admin"], teamId, socket, async () => {
      console.log("Backend role accepted for kickUser");

      try {
        console.log("Backend trying to kick user");
        const result = await kickUser(teamId, userId);
        callback(result);

        socket.emit("team:userKicked", result);
        socket.broadcast.emit("team:userKicked", result);
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

  socket.on("getJoinedTeams", async (userId, callback) => {
    if (!userId) {
      return callback({
        success: false,
        error: {
          message: "Unauthorized: userId missing",
          code: "UNAUTHORIZED",
        },
      });
    }

    console.log("getJoinedTeams data accepted backend");

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      console.log("Backend role accepted for getJoinedTeams");

      try {
        console.log("Backend trying to get joined teams");
        const result = await getJoinedTeams(userId);
        callback(result);

        socket.emit("team:joinedTeams", result);
        socket.broadcast.emit("team:joinedTeams", result);
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

  socket.on("leaveTeam", async (teamId, userId, callback) => {
    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    console.log("leaveTeam data accepted backend");

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      console.log("Backend role accepted for leaveTeam");

      try {
        console.log("Backend trying to leave team");
        const result = await leaveTeam(teamId, userId);
        callback(result);

        socket.emit("team:leaveTeam", result);
        socket.broadcast.emit("team:leaveTeam", result);
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

  socket.on("connectTeam", async (teamId, callback) => {
    if (!teamId) {
      return callback({
        success: false,
        error: {
          message: "Team id is required",
          code: "INVALID_DATA",
        },
      });
    }

    console.log("connectTeam data accepted backend");

    withGlobalRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      console.log("Backend role accepted for connectTeam");

      try {
        console.log("Backend trying to connect to team");
        const result = await connectTeam(teamId, socket.user.id);

        if (result.success) {
          socket.join(teamId);
          console.log("Joined team", teamId);
        }

        callback(result);

        socket.emit("team:connectTeam", result);
        socket.broadcast.emit("team:connectTeam", result);
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
