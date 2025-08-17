import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TaskChart from "../../components/tasks/TaskChart.jsx";
import useTaskFilters from "../../hooks/tasks/useTaskFilters.js";
import useTaskFetcher from "../../hooks/tasks/useTaskFetcher.js";
import FilterPanel from "../../components/tasks/FilterPanel.jsx";
import AddTaskButton from "../../components/tasks/AddTaskButton.jsx";
import AddTaskForm from "../../components/tasks/AddTaskForm.jsx";
import { FaPaw } from "react-icons/fa";
import { createTask } from "../../services/taskService.js";
import formatDate from "../../hooks/global/formatDate.js";

const IconExample = () => <FaPaw color="#577399" />;


const TaskManager = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { filters, handleAddFilter } = useTaskFilters();
  const { taskList, fetchTasks } = useTaskFetcher(user, filters, search);

  const availableFilters = ["pending", "in_progress", "completed", "cancelled", "low", "medium", "high", "urgent"];
  const fullDate = new Date();
  const date = formatDate(fullDate);
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][fullDate.getDay()];
  //initialized in true to test
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCreateTask = (formData) => {
    createTask(formData, user.id);
    fetchTasks();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }


  useEffect(() => {
    if (!user) {
      return;
    }

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

          <img src={IconExample()} alt="calendar image" className="w-[50%] h-[50%]" />
        </div>

      </div>

      <FilterPanel
        availableFilters={availableFilters}
        filters={filters}
        handleAddFilter={handleAddFilter}
      />


      <div className="grid grid-cols-3 gap-4">

        {taskList.length > 0 && taskList.map((task) => (

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

      <AddTaskButton handleAddTask={toggleModal} />

      <AddTaskForm handleCreateTask={handleCreateTask} isActive={isModalOpen} userId={1} />

    </div>

  );
};

export default TaskManager;
