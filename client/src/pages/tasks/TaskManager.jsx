import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManager = () => {
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3030/api/tasks")
      .then((response) => {
        setTaskList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

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

      <div className="grid grid-cols-5 gap-2 mb-4">
        {/* Components to filter tasks */}
      </div>

      <div className="grid gap-2">
        {taskList && taskList.map((task) => (
          // Aquí va el componente o UI para cada task
          <div key={task.id} className="p-2 border rounded shadow">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </div>
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
