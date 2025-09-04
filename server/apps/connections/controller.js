import registerTaskEvents from "../../apps/TasksColab/controller.js";
import registerTeamEvents from "../teams/controller.js";
import registerMessageEvents from "../messages/controller.js";

export const handleSocketConnection = (socket) => {
  console.log("👉 User connected:", socket.id);
  console.log("👉 User data from token:", socket.user);
  socket.join(socket.user.id.toString());
  console.log("personal room:", socket.user.id.toString());

  registerTaskEvents(socket);
  registerTeamEvents(socket);
  registerMessageEvents(socket);

  socket.on("disconnect", () => {
    console.log("X User disconnected:", socket.id);
  });
};
