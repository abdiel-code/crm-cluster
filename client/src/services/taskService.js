import axios from "axios";

const API_URL = "http://localhost:3030/api/users/";

// Create tasks
export const createTask = async (taskData, user) => {

  console.log("user", user);

  if (!user) {
    return;
  }

  console.log(taskData);
  console.log(user);

  try {
    const response = await axios.post(API_URL + user + "/tasks", taskData, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }

}
