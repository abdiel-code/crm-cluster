import { useAuth } from "../../context/AuthContext.jsx";
import useCoopTaskFilters from "../../hooks/coopTasks/useCoopTaskFilters.js";
import useCoopTaskActions from "../../hooks/coopTasks/useCoopTaskActions.js";
import useCoopTaskFetcher from "../../hooks/coopTasks/useCoopTaskFetcher.js";
import TaskManagerBase from "../../components/tasks/TaskManagerBase.jsx";

const CoopTaskManager = () => {
  const { user } = useAuth();

  const { filters, handleAddFilter, search } = useCoopTaskFilters();
  const { taskList, fetchTasks } = useCoopTaskFetcher(filters, search);
  const { handleCreateTask, handleUpdateTask, handleDeleteTask } =
    useCoopTaskActions(user, fetchTasks);

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

export default CoopTaskManager;
