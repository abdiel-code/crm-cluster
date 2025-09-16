import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTeam } from "../../context/TeamContext.jsx";
import { socket } from "../../core/socketInstance.js";
import { log } from "../../core/logWrapper.js";

const useCoopTaskFetcher = (filters = {}, search = "") => {
  const [taskList, setTaskList] = useState([]);
  const { user } = useAuth();
  const { activeTeam } = useTeam();
  const isFetching = useRef(false);
  const lastSearch = useRef(search);

  useEffect(() => {
    lastSearch.current = search;
  }, [search]);

  const fetchTasks = useCallback(
    (overrideFilters = {}, overrideSearch = "") => {
      if (isFetching.current) return;
      isFetching.current = true;

      const finalFilters = {
        ...filters,
        ...overrideFilters,
        search: overrideSearch || lastSearch.current,
        userId: user?.id,
        teamId: activeTeam?.team_id,
      };

      log("final filters", finalFilters);

      if (!finalFilters.userId || !finalFilters.teamId) {
        isFetching.current = false;
        return;
      }

      log("emitting getTasks");

      socket.emit("getTasks", finalFilters, (response) => {
        isFetching.current = false;

        if (!response.success) {
          console.error("Error fetching tasks:", response.message);
          return;
        }

        log("Received tasks at socket.emit(getTasks):", response.data);
        setTaskList(response.data || []);
      });
    },
    [filters, user?.id, activeTeam?.team_id]
  );

  useEffect(() => {
    const handleCreateTask = (task) => {
      log("Received taskCreated:", task);
      if (task.team_id === activeTeam?.team_id) {
        log("Adding new task to state directly");
        setTaskList((prevTasks) => {
          const exists = prevTasks.some((t) => t.id === task.id);
          if (exists) return prevTasks;
          return [...prevTasks, task];
        });
      }
    };

    const handleUpdateTask = (updatedTask) => {
      log("Received taskUpdated:", updatedTask);
      if (updatedTask.team_id === activeTeam?.team_id) {
        log("Updating task in state directly");
        setTaskList((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      }
    };

    const handleDeleteTask = (taskId) => {
      log("Received taskDeleted:", taskId);
      log("Removing task from state directly");
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    };

    socket.on("taskCreated", handleCreateTask);
    socket.on("taskUpdated", handleUpdateTask);
    socket.on("taskDeleted", handleDeleteTask);

    return () => {
      socket.off("taskCreated", handleCreateTask);
      socket.off("taskUpdated", handleUpdateTask);
      socket.off("taskDeleted", handleDeleteTask);
    };
  }, [activeTeam?.team_id]);

  useEffect(() => {
    if (user?.id && activeTeam?.team_id) {
      fetchTasks();
    }
  }, [user?.id, activeTeam?.team_id, filters, search]);

  return { taskList, fetchTasks };
};

export default useCoopTaskFetcher;
