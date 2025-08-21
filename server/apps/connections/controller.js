import registerTaskEvents from "../../apps/TasksColab/controller.js";

export const handleSocketConnection = (socket) => {
  console.log("👉 User connected:", socket.id);
  console.log("👉 User data from token:", socket.user);

  registerTaskEvents(socket);

  socket.on("disconnect", () => {
    console.log("X User disconnected:", socket.id);
  });
}
