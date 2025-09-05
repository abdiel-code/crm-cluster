import {
  createTask,
  updateTask,
  deleteTask,
} from "../../services/coopTaskService.js";

const useCoopTaskActions = (user, fetchTasks) => {
  const handleCreateTask = async (formData) => {
    console.log("Handle create task data", formData);

    try {
      const response = await createTask(formData);
      console.log("Task created successfully:", response);
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
    console.log("Handle update task data", formData);

    try {
      const response = await updateTask(formData);
      console.log("Task updated successfully:", response);
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
    console.log("Handle delete task data", taskId);
    try {
      const response = await deleteTask(taskId, teamId);
      console.log("Task deleted successfully:", response);
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
