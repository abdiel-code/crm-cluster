import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTeam } from "../../context/TeamContext.jsx";
import { socket } from "../../core/socketInstance.js";

const useCoopTaskFetcher = (filters = {}) => {
  const [taskList, setTaskList] = useState([]);
  const { user } = useAuth();
  const { activeTeam } = useTeam();
  const isFetching = useRef(false);

  const fetchTasks = useCallback(
    (overrideFilters = {}, overrideSearch = "") => {
      if (isFetching.current) return;
      isFetching.current = true;

      const finalFilters = {
        ...filters,
        ...overrideFilters,
        search: overrideSearch,
        userId: user?.id,
        teamId: activeTeam?.team_id,
      };

      console.log("final filters", finalFilters);

      if (!finalFilters.userId || !finalFilters.teamId) {
        isFetching.current = false;
        return;
      }

      console.log("emitting getTasks");

      socket.emit("getTasks", finalFilters, (response) => {
        isFetching.current = false;

        if (!response.success) {
          console.error("Error fetching tasks:", response.message);
          return;
        }

        setTaskList(response.data || []);
      });
    },
    [filters, user?.id, activeTeam?.team_id]
  );

  useEffect(() => {
    const handleCreateTask = (task) => {
      console.log("Received taskCreated:", task);
      if (task.team_id === activeTeam?.team_id) fetchTasks();
    };

    const handleUpdateTask = (task) => {
      console.log("Received taskUpdated:", task);
      if (task.team_id === activeTeam?.team_id) fetchTasks();
    };

    const handleDeleteTask = (taskId) => {
      console.log("Received taskDeleted:", taskId);
      if (taskId.team_id === activeTeam?.team_id) fetchTasks();
    };

    socket.on("taskCreated", handleCreateTask);
    socket.on("taskUpdated", handleUpdateTask);
    socket.on("taskDeleted", handleDeleteTask);

    return () => {
      socket.off("taskCreated", handleCreateTask);
      socket.off("taskUpdated", handleUpdateTask);
      socket.off("taskDeleted", handleDeleteTask);
    };
  }, [fetchTasks, activeTeam?.team_id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { taskList, fetchTasks };
};

export default useCoopTaskFetcher;
