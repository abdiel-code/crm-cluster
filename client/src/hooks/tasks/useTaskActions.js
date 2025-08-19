import { createTask, updateTask, deleteTask } from "../../services/taskService.js";

const useTaskActions = (user, fetchTasks) => {
  const handleCreateTask = async (formData) => {
    await createTask(formData, user.id);
    await fetchTasks();
  };

  const handleUpdateTask = async (formData, taskId) => {
    await updateTask(taskId, formData, user.id);
    await fetchTasks();
  };
  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId, user.id);
    await fetchTasks();
  }


  return { handleCreateTask, handleUpdateTask, handleDeleteTask };

};


export default useTaskActions;
