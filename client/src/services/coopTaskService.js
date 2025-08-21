import { socket } from "../core/socketInstance.js";

// Create task
export const createTask = (taskData) => {

  return new Promise((resolve, reject) => {
    socket.emit("createTask", taskData);

    socket.once("taskCreated", resolve);
    socket.once("taskError", reject);
  })
}

// Update task
export const updateTask = (taskData) => {

  return new Promise((resolve, reject) => {
    socket.emit("updateTask", taskData);

    socket.once("taskUpdated", resolve);
    socket.once("taskError", reject);
  });

};

// Delete task
export const deleteTask = (taskData) => {

  return new Promise((resolve, reject) => {
    socket.emit("deleteTask", taskData);

    socket.once("taskDeleted", resolve);
    socket.once("taskError", reject);
  });
};

