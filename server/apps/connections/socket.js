import validateSocketToken from "../../core/middleware/validateSocketToken.js";
import { handleSocketConnection } from "../connections/controller.js";

const setupSocket = (io) => {
  io.use(validateSocketToken);
  io.on("connection", (socket) => handleSocketConnection(socket));
};

export default setupSocket;
