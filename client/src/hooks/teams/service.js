import { socket } from "../../core/socketInstance.js";

export const createTeam = (teamData) => {
  return new Promise((resolve, reject) => {
    socket.emit("createTeam", teamData, (response) => {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getMyTeams = (userId) => {
  return new Promise((resolve, reject) => {
    socket.emit("getMyTeams", userId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const deleteTeam = (teamId) => {
  console.log("deleteTeam teamId", teamId);

  return new Promise((resolve, reject) => {
    console.log("deleteTeam frontend teamId", teamId);
    socket.emit("deleteTeam", teamId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const updateTeam = (teamData) => {
  console.log("updateTeam service teamData", teamData);

  return new Promise((resolve, reject) => {
    console.log("updateTeam frontend teamId", teamData);
    socket.emit("updateTeam", teamData, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
