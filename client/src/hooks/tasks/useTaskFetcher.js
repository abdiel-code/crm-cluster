import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../../config.js";

// const API_URL = "http://localhost:3030/api/users/";
const API_URL = `${baseUrl}/api/users/`;

const useTaskFetcher = (user, filters = {}, search = "") => {
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = useCallback(
    async (overrideFilters = {}, overrideSearch = "") => {
      if (!user) return;

      try {
        const response = await axios.get(`${API_URL}${user.id}/tasks`, {
          params: {
            ...filters,
            ...overrideFilters,
            search: overrideSearch || search,
          },
          withCredentials: true,
        });
        setTaskList(response.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    [user, filters, search]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { taskList, fetchTasks };
};

export default useTaskFetcher;
