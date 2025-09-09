import { useAuth } from "../../context/AuthContext.jsx";
import useTaskFilters from "../../hooks/tasks/useTaskFilters.js";
import useTaskFetcher from "../../hooks/tasks/useTaskFetcher.js";
import useTaskActions from "../../hooks/tasks/useTaskActions.js";
import TaskManagerBase from "../../components/tasks/TaskManagerBase.jsx";
import { useState } from "react";

const TaskManager = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { filters, handleAddFilter } = useTaskFilters();
  const { taskList, fetchTasks } = useTaskFetcher(user, filters, search);
  const { handleCreateTask, handleUpdateTask, handleDeleteTask } =
    useTaskActions(user, fetchTasks);

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

export default TaskManager;
