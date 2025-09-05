import { socket } from "../core/socketInstance.js";

// Create task
export const createTask = (taskData) => {
  console.log("Trying to create task with data", taskData);

  return new Promise((resolve, reject) => {
    console.log("Calling createTask from frontend to backend");
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
  console.log("Trying to update task with data", taskData);

  return new Promise((resolve, reject) => {
    console.log("Calling updateTask from frontend to backend");
    socket.emit("updateTask", taskData, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};

// Delete task
export const deleteTask = (taskData, teamId) => {
  console.log("Trying to delete task with data and teamId", taskData, teamId);

  return new Promise((resolve, reject) => {
    socket.emit("deleteTask", taskData, teamId, (response) => {
      if (response.success) {
        console.log("response", response);
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
};
