import { io } from "socket.io-client";
import { baseUrl } from "../config.js";

export const socket = io(baseUrl, {
  withCredentials: true,
  autoConnect: false,
});
