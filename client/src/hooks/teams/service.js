import { socket } from "../../core/socketInstance.js";

export const createTeam = (teamData) => {

  return new Promise((resolve, reject) => {
    socket.emit("createTeam", teamData, (response) => {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.error);
      }

    })
  })
}
