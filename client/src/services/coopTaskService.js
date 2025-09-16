import { socket } from "../core/socketInstance.js";
import { log } from "../core/logWrapper.js";

// Create task
export const createTask = (taskData) => {
  log("Trying to create task with data", taskData);

  return new Promise((resolve, reject) => {
    log("Calling createTask from frontend to backend");
    socket.emit("createTask", taskData, (response) => {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

// Update task
export const updateTask = (taskData) => {
  log("Trying to update task with data", taskData);

  return new Promise((resolve, reject) => {
    log("Calling updateTask from frontend to backend");
    socket.emit("updateTask", taskData, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

// Delete task
export const deleteTask = (taskData, teamId) => {
  log("Trying to delete task with data and teamId", taskData, teamId);

  return new Promise((resolve, reject) => {
    socket.emit("deleteTask", taskData, teamId, (response) => {
      if (response.success) {
        log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
