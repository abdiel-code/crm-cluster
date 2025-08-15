import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import TaskChart from "../../components/tasks/TaskChart.jsx";

const TaskManager = () => {
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();


  const fetchTasks = async (filters = {}) => {
    if (!user) return;
    try {
      const response = await axios.get(`http://localhost:3030/api/tasks`, {
        params: {
          user_id: user.id, ...filters
        }
      });
      setTaskList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchTasks();
  }, [user]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCreateTask = () => {
    // Aquí va la lógica para crear tarea
  };

  return (
    <div className="w-full h-full flex flex-col p-4">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search task by title"
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-1"
        />
      </div>

      <div className="bg-[#BDD5EA] w-[90%] h-64 flex mb-4">
        {/* Component to show day */}
        <div className="w-[2px] h-[90%] bg-white"></div>
        {/* Component to show tasks left */}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Component for filters*/}
      </div>

      <div className="grid gap-2">

        {taskList && taskList.map((task) => (

          <TaskChart
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            dueDate={task.due_date}
            craetedAt={task.created_at}
            id={task.id}
            fetchTasks={fetchTasks}
          />

        ))}
      </div>

      <button
        className="fixed bottom-8 right-8 bg-[#577399] rounded-full w-12 h-12 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-[#455a7c] transition"
        onClick={handleCreateTask}
      >
        +
      </button>

    </div>
  );
};

export default TaskManager;
