import validateSocketToken from "../../core/middleware/validateSocketToken.js";
import handleSocketConnection from "../connections/controller/socketConnection.js";

const setupSocket = (io) => {
  io.use(validateSocketToken);
  io.on("connection", (socket) => handleSocketConnection(socket));
};

export default setupSocket;
