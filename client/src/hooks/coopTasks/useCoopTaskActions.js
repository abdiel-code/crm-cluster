import {
  createTask,
  updateTask,
  deleteTask,
} from "../../services/coopTaskService.js";
import { log } from "../../core/logWrapper.js";

const useCoopTaskActions = (user, fetchTasks) => {
  const handleCreateTask = async (formData) => {
    log("Handle create task data", formData);

    try {
      const response = await createTask(formData);
      log("Task created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating task:", error);
      return {
        success: false,
        message: error.message || "Error creating task",
      };
    }
  };

  const handleUpdateTask = async (formData, taskId) => {
    log("Handle update task data", formData);

    try {
      const response = await updateTask(formData);
      log("Task updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating task:", error);
      return {
        success: false,
        message: error.message || "Error updating task",
      };
    }
  };
  const handleDeleteTask = async (taskId, teamId) => {
    log("Handle delete task data", taskId);
    try {
      const response = await deleteTask(taskId, teamId);
      log("Task deleted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error deleting task:", error);
      return {
        success: false,
        message: error.message || "Error deleting task",
      };
    }
  };

  return { handleCreateTask, handleUpdateTask, handleDeleteTask };
};

export default useCoopTaskActions;
