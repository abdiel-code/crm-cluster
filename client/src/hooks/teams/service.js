import { socket } from "../../core/socketInstance.js";
import { log } from "../../core/logWrapper.js";

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
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const deleteTeam = (teamId) => {
  log("deleteTeam teamId", teamId);

  return new Promise((resolve, reject) => {
    log("deleteTeam frontend teamId", teamId);
    socket.emit("deleteTeam", teamId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const updateTeam = (teamData) => {
  log("updateTeam service teamData", teamData);

  return new Promise((resolve, reject) => {
    log("updateTeam frontend teamId", teamData);
    socket.emit("updateTeam", teamData, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getTeam = (teamId) => {
  log("getTeam", teamId);

  return new Promise((resolve, reject) => {
    socket.emit("getTeam", teamId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const sendJoinRequest = (teamId, userId) => {
  log("sendJoinRequest", teamId, userId);

  return new Promise((resolve, reject) => {
    log("sendJoinRequest frontend teamId", teamId, userId);
    socket.emit("joinRequest", teamId, userId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getRequests = (userId) => {
  log("get requests have userId?", userId);
  if (!userId) throw new Error("Unauthorized: userId missing");

  return new Promise((resolve, reject) => {
    socket.emit("getRequests", userId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const handleRequest = (teamId, userId, resolution) => {
  log("handleRequest", teamId, userId, resolution);

  return new Promise((resolve, reject) => {
    socket.emit("handleRequest", teamId, userId, resolution, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getTeamMembers = (teamId) => {
  log("getTeamMembers", teamId);
  if (!teamId) {
    console.warn("getTeamMemebrs called with invalid teamId: ", teamId);
    return Promise.reject("Invalid teamId");
  }

  return new Promise((resolve, reject) => {
    socket.emit("getTeamMembers", teamId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error || "Unknown error while fetching team members");
      }
    });
  });
};

export const deleteTeamUser = (teamId, userId) => {
  log("deleteTeamUser", teamId, userId);

  return new Promise((resolve, reject) => {
    socket.emit("kickUser", teamId, userId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const updateTeamUser = (userId, teamId, role) => {
  log("updateTeamUser", userId, teamId, role);

  return new Promise((resolve, reject) => {
    log("trying to update team member role", userId, teamId, role);
    socket.emit("updateTeamUser", userId, teamId, role, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const getJoinedTeams = (userId) => {
  log("getJoinedTeams", userId);

  return new Promise((resolve, reject) => {
    socket.emit("getJoinedTeams", userId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const leaveTeam = (teamId, userId) => {
  log("leaveTeam", teamId, userId);

  return new Promise((resolve, reject) => {
    socket.emit("leaveTeam", teamId, userId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

export const connectTeam = (teamId) => {
  log("connectTeam", teamId);

  return new Promise((resolve, reject) => {
    socket.emit("connectTeam", teamId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
