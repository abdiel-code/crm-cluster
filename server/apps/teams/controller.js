import { createTeam } from "./teamsService.js";
import withRole from "../TasksColab/withRole.js";

const registerTeamEvents = (socket) => {
  socket.on("createTeam", async (teamData, callback) => {

    if (!teamData || typeof teamData !== "object") {
      return callback({
        success: false,
        error: {
          message: "Invalid team data",
          code: "INVALID_DATA"
        }
      })
    }

    withRole(["admin", "editor", "agent", "viewer"], socket, async () => {
      try {
        const result = await createTeam(teamData);
        callback(result);

      } catch (error) {
        callback({
          success: false,
          error: {
            message: error.message,
            code: "SERVER_ERROR"
          }
        })

      }
    })
  })
}

export default registerTeamEvents
