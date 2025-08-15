import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TaskChart from "../../components/tasks/TaskChart.jsx";
import useTaskFilters from "../../hooks/tasks/useTaskFilters.js";
import useTaskFetcher from "../../hooks/tasks/useTaskFetcher.js";
import FilterPanel from "../../components/tasks/FilterPanel.jsx";

const TaskManager = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { filters, handleAddFilter } = useTaskFilters();
  const { taskList, fetchTasks } = useTaskFetcher(user, filters, search);

  const availableFilters = ["pending", "in_progress", "completed", "cancelled", "low", "medium", "high", "urgent"];
  const fullDate = new Date();
  const date = fullDate.toISOString().split("T")[0];
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][fullDate.getDay()];


  const handleSearch = (e) => setSearch(e.target.value);

  const handleCreateTask = () => {
    // Aquí va la lógica para crear tarea
  };



  useEffect(() => {

    fetchTasks();
  }, [user]);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  useEffect(() => {
    fetchTasks({ ...filters, search });
  }, [filters, search]);



  return (
    <div className="w-full h-full flex flex-col p-2 items-center">

      <div className="flex items-center justify-around w-full mb-4">
        <div>

          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>

        <div className="flex items-center justify-center gap-2 ">
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search task by title or description"
            onChange={handleSearch}
            className="border border-gray-500 rounded-md px-2 py-1 w-full"
          />
          <button type="submit" className="bg-[#577399] text-white rounded-md px-3 py-1 cursor-pointer hover:bg-[#455a7c]">Search</button>
        </div>
      </div>

      <div className="bg-[#BDD5EA] w-[90%] h-64 flex items-center justify-around rounded-3xl">

        <div className="flex flex-col items-center gap-2">
          {
            <p className="text-3xl font-bold">{day}</p>
          }
          {
            <p className="text-xl">{date}</p>
          }

        </div>

        <div className="w-[2px] h-[90%] bg-white"></div>

        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-2 text-lg">
            <p>Today you have</p>
            <p>{taskList.length} tasks left</p>
          </div>

          <img src="" alt="calendar image" className="w-[50%] h-[50%]" />
        </div>

      </div>

      <FilterPanel
        availableFilters={availableFilters}
        filters={filters}
        handleAddFilter={handleAddFilter}
      />


      <div className="grid gap-2">

        {taskList && taskList.map((task) => (

          <TaskChart
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            priority={task.priority}
            dueDate={task.due_date}
            createdAt={task.created_at}
            id={task.id}
            fetchTasks={fetchTasks}
          />

        ))}

        {taskList.length === 0 && (
          <p>No tasks found</p>
        )}
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
