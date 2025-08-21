import { useState, useEffect, useCallback } from "react";
import { socket } from "../../core/socketInstance.js";

const useCoopTaskFetcher = (filters = {}) => {
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = useCallback((overrideFilters = {}, overrideSearch = "") => {
    const finalFilters = { ...filters, ...overrideFilters, search: overrideSearch };

    if (!finalFilters.userId) return;

    socket.emit("getTasks", finalFilters, (response) => {
      setTaskList(response || []);
    });
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { taskList, fetchTasks };
};

export default useCoopTaskFetcher;
