import { createTask, updateTask, deleteTask } from "../../services/taskService.js";

const useCoopTaskActions = (user, fetchTasks) => {
  const handleCreateTask = async (formData) => {
    const response = await createTask(formData, user.id);
    await fetchTasks();
    return response;
  };

  const handleUpdateTask = async (formData, taskId) => {
    const response = await updateTask(taskId, formData, user.id);
    await fetchTasks();
    return response;
  };
  const handleDeleteTask = async (taskId) => {
    const response = await deleteTask(taskId, user.id);
    await fetchTasks();
    return response;
  }


  return { handleCreateTask, handleUpdateTask, handleDeleteTask };

};


export default useCoopTaskActions;
