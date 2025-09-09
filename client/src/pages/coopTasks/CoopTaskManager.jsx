import { useAuth } from "../../context/AuthContext.jsx";
import useCoopTaskFilters from "../../hooks/coopTasks/useCoopTaskFilters.js";
import useCoopTaskActions from "../../hooks/coopTasks/useCoopTaskActions.js";
import useCoopTaskFetcher from "../../hooks/coopTasks/useCoopTaskFetcher.js";
import TaskManagerBase from "../../components/tasks/TaskManagerBase.jsx";
import { useState } from "react";

const CoopTaskManager = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { filters, handleAddFilter } = useCoopTaskFilters();
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
      search={search}
      setSearch={setSearch}
    />
  );
};

export default CoopTaskManager;
