import registerTaskEvents from "../../apps/TasksColab/controller.js";
import registerTeamEvents from "../teams/controller.js";
import registerMessageEvents from "../messages/controller.js";
import { log } from "../../logWrapper.js";

export const handleSocketConnection = (socket) => {
  log("👉 User connected:", socket.id);
  log("👉 User data from token:", socket.user);
  socket.join(socket.user.id.toString());
  log("personal room:", socket.user.id.toString());

  registerTaskEvents(socket);
  registerTeamEvents(socket);
  registerMessageEvents(socket);

  socket.on("disconnect", () => {
    log("X User disconnected:", socket.id);
  });
};
