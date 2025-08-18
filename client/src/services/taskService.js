import axios from "axios";

const API_URL = "http://localhost:3030/api/users/";

// Create tasks
export const createTask = async (taskData, user) => {

  if (!user) {
    return;
  }

  try {
    const response = await axios.post(API_URL + user + "/tasks", taskData, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }

}

// Update tasks
export const updateTask = async (taskId, taskData, user) => {

  if (!user) {
    return;
  }

  try {
    const response = await axios.put(API_URL + user + "/tasks/" + taskId, taskData, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
