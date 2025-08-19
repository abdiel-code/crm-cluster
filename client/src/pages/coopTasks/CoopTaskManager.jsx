import { useAuth } from "../../context/AuthContext.jsx";
import useCoopTasksFilters from "../../hooks/coopTasks/useCoopTasksFilters.js";
import useCoopTaskFetcher from "../../hooks/coopTasks/useCoopTaskFetcher.js";
import useCoopTaskActions from "../../hooks/coopTasks/useCoopTaskActions.js";
import TaskManagerBase from "../../components/tasks/TaskManagerBase.jsx";



const CoopTaskManager = () => {
  const { user } = useAuth();
  const { filters, handleAddFilter } = useCoopTasksFilters();
  const { taskList, fetchTasks, handleCreateTask, handleUpdateTask, handleDeleteTask } = useCoopTaskActions(user, filters);

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
