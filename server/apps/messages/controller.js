import withTeamRole from "../../core/middleware/withTeamRole.js";
import withGlobalRole from "../../core/middleware/withGlobalRole.js";
import { sendMessage } from "./messagesService.js";

const registerMessageEvents = (socket) => {
  socket.on("team:sendMessage", async (message, callback) => {
    if (!message || typeof message !== "object") {
      socket.emit("taskError", {
        message: "Invalid message data",
        code: "INVALID_DATA",
      });
      return;
    }

    console.log("The message is present on registerMessageEvents", message);

    withTeamRole(["admin", "editor"], message.teamId, socket, async () => {
      console.log("comes here if there is role and proceed to await handler");

      try {
        console.log("Sending message");
        const result = await sendMessage(message);
        console.log("The message will be sent to the team", message.teamId);
        console.log(
          "Message sent will be sent to the members",
          socket.adapter.rooms.get(message.teamId)
        );

        console.log("The message will be sent to the team", message.teamId);
        console.log(
          "Message sent will be sent to the members",
          socket.adapter.rooms.get(message.teamId)
        );

        console.log(socket.adapter.rooms.get(message.teamId));

        socket.broadcast.to(message.teamId).emit("team:receiveMessage", result);

        callback(result);
      } catch (error) {
        socket.emit("taskError", {
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

export default registerMessageEvents;
