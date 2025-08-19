import validateSocketToken from "../../core/middleware/validateSocketToken.js";

const setupSocket = (io) => {
  
  io.use(validateSocketToken);

  io.on("connection", (socket) => {
    console.log(`✅ New client connected: ${socket.id}`);
    console.log("👉 User data from token:", socket.user);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};

export default setupSocket;
