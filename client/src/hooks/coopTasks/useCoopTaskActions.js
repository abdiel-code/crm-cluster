import {
  createTask,
  updateTask,
  deleteTask,
} from "../../services/coopTaskService.js";

const useCoopTaskActions = (user, fetchTasks) => {
  const handleCreateTask = async (formData) => {
    console.log("Handle create task data", formData);

    const response = await createTask(formData);
    await fetchTasks();
    return response;
  };

  const handleUpdateTask = async (formData, taskId) => {
    console.log("Handle update task data", formData);

    const response = await updateTask(formData, taskId, user.id);

    console.log("response", response);
    await fetchTasks();

    return response;
  };
  const handleDeleteTask = async (taskId, teamId) => {
    console.log("Handle delete task data", taskId);
    console.log("teamId", teamId);

    const response = await deleteTask(taskId, teamId);
    await fetchTasks();
    return response;
  };

  return { handleCreateTask, handleUpdateTask, handleDeleteTask };
};

export default useCoopTaskActions;
