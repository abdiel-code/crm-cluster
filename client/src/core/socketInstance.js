import { io } from "socket.io-client";

const isLocal = window.location.hostname === "localhost";

export const socket = io(
  isLocal ? "http://localhost:3030" : "https://crm-cluster.vercel.app",
  {
    withCredentials: true,
    autoConnect: false,
  }
);
