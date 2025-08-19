import { useAuth } from "../../context/AuthContext.jsx";
import useTaskFilters from "../../hooks/tasks/useTaskFilters.js";
import useTaskFetcher from "../../hooks/tasks/useTaskFetcher.js";
import useTaskActions from "../../hooks/tasks/useTaskActions.js";
import TaskManagerBase from "../../components/tasks/TaskManagerBase.jsx";

const TaskManager = () => {
  const { user } = useAuth();
  const { filters, handleAddFilter } = useTaskFilters();
  const { taskList, fetchTasks } = useTaskFetcher(user, filters, "");
  const { handleCreateTask, handleUpdateTask, handleDeleteTask } = useTaskActions(user, fetchTasks);

  return (
    <TaskManagerBase
      user={user}
      filters={filters}
      handleAddFilter={handleAddFilter}
      taskList={taskList}
      fetchTasks={fetchTasks}
      handleCreateTask={handleCreateTask}
      handleUpdateTask={handleUpdateTask}
      handleDeleteTask={handleDeleteTask}
    />
  );
};

export default TaskManager;
