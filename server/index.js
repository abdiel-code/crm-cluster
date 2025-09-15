import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from "dotenv";
import setupSocket from "./apps/connections/socket.js";

dotenv.config();
const PORT = process.env.PORT || 3030;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io };
export default server;
