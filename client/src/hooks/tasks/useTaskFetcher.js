import { useState, useEffect } from "react";
import axios from "axios";

const useTaskFetcher = (user, filters, search) => {
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const response = await axios.get("http://localhost:3030/api/tasks", {
        params: {
          user_id: user.id,
          ...filters,
          search
        }
      });
      setTaskList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, filters, search]);

  return { taskList, fetchTasks };
};

export default useTaskFetcher;
