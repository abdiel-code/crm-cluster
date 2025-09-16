import { socket } from "../../core/socketInstance";
import { log } from "../../core/logWrapper";

export const sendMessage = (message) => {
  return new Promise((resolve, reject) => {
    log("Attempting to send message to the server");
    socket.emit("team:sendMessage", message, (response) => {
      log("Response from the server:", response);
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
