import axios from "axios";
import { log } from "../core/logWrapper.js";
import { baseUrl } from "../config.js";

// const API_URL = "http://localhost:3030/api/users/";
const API_URL = `${baseUrl}/api/users/`;

// Create task
export const createTask = async (taskData, user) => {
  if (!user) {
    return;
  }

  try {
    const response = await axios.post(API_URL + user + "/tasks", taskData, {
      withCredentials: true,
    });
    log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update task
export const updateTask = async (taskId, taskData, user) => {
  if (!user) {
    return;
  }

  try {
    const response = await axios.put(
      API_URL + user + "/tasks/" + taskId,
      taskData,
      { withCredentials: true }
    );
    log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete task

export const deleteTask = async (taskId, user) => {
  if (!user) {
    return;
  }

  try {
    const response = await axios.delete(API_URL + user + "/tasks/" + taskId, {
      withCredentials: true,
    });
    log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
