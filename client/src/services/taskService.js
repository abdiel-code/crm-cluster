import axios from "axios";

const API_URL = "https://crm-cluster.onrender.com/api/users/";

// Create task
export const createTask = async (taskData, user) => {
  if (!user) {
    return;
  }

  try {
    const response = await axios.post(API_URL + user + "/tasks", taskData, {
      withCredentials: true,
    });
    console.log(response.data);
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
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
