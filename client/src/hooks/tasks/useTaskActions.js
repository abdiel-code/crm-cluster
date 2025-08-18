import { createTask, updateTask } from "../../services/taskService.js";

const useTaskActions = (user, fetchTasks, toggleUpdateModal) => {
  const handleCreateTask = async (formData) => {
    await createTask(formData, user.id);
    await fetchTasks();
  };

  const handleUpdateTask = async (formData, taskId) => {
    await updateTask(taskId, formData, user.id);
    await fetchTasks();
    toggleUpdateModal();
  };

  return { handleCreateTask, handleUpdateTask };
};

export default useTaskActions;
