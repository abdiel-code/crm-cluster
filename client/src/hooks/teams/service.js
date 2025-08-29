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

export const getTeam = (teamId) => {
  console.log("getTeam", teamId);

  return new Promise((resolve, reject) => {
    socket.emit("getTeam", teamId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const sendJoinRequest = (teamId, userId) => {
  console.log("sendJoinRequest", teamId, userId);

  return new Promise((resolve, reject) => {
    console.log("sendJoinRequest frontend teamId", teamId, userId);
    socket.emit("joinRequest", teamId, userId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getRequests = (userId) => {
  console.log("get requests have userId?", userId);
  if (!userId) throw new Error("Unauthorized: userId missing");

  return new Promise((resolve, reject) => {
    socket.emit("getRequests", userId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const handleRequest = (teamId, userId, resolution) => {
  console.log("handleRequest", teamId, userId, resolution);

  return new Promise((resolve, reject) => {
    socket.emit("handleRequest", teamId, userId, resolution, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getTeamMembers = (teamId) => {
  console.log("getTeamMembers", teamId);

  return new Promise((resolve, reject) => {
    socket.emit("getTeamMembers", teamId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const deleteTeamUser = (teamId, userId) => {
  console.log("deleteTeamUser", teamId, userId);

  return new Promise((resolve, reject) => {
    socket.emit("deleteTeamUser", teamId, userId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const updateTeamUser = (userId, teamId, role) => {
  console.log("updateTeamUser", userId, teamId, role);

  return new Promise((resolve, reject) => {
    console.log("trying to update team member role", userId, teamId, role);
    socket.emit("updateTeamUser", userId, teamId, role, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
