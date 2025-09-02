import { socket } from "../../core/socketInstance";

export const sendMessage = (message) => {
  return new Promise((resolve, reject) => {
    console.log("Attempting to send message to the server");
    socket.emit("team:sendMessage", message, (response) => {
      console.log("Response from the server:", response);
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
