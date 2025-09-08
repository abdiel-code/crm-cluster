import React, { useEffect, useState } from "react";
import TaskChart from "./TaskChart.jsx";
import FilterPanel from "./FilterPanel.jsx";
import AddTaskButton from "./AddTaskButton.jsx";
import AddTaskForm from "./AddTaskForm.jsx";
import UpdateTaskForm from "./UpdateTaskForm.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import NotificationBar from "../core/NotificationBar.jsx";
import formatDate from "../../hooks/global/formatDate.js";
import { useTeam } from "../../context/TeamContext.jsx";

const TaskManagerBase = ({
  user,
  filters,
  handleAddFilter,
  taskList,
  fetchTasks,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
}) => {
  const { activeTeam } = useTeam();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState({
    isOpen: false,
    task: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    task: null,
  });
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const availableFilters = [
    "pending",
    "in_progress",
    "completed",
    "cancelled",
    "low",
    "medium",
    "high",
    "urgent",
  ];
  const fullDate = new Date();
  const date = formatDate(fullDate);
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][fullDate.getDay()];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("search", e.target.value);
    console.log("search", search);
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleDeleteModal = (task = null) => {
    setDeleteConfirm((prev) =>
      prev.isOpen ? { isOpen: false, task: null } : { isOpen: true, task }
    );
  };
  const toggleUpdateModal = (task = null) => {
    setIsUpdateModalOpen((prev) =>
      prev.isOpen ? { isOpen: false, task: null } : { isOpen: true, task }
    );
  };

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (user) fetchTasks({ ...filters, search });
    }, 1000);
    return () => clearTimeout(delay);
  }, [user, filters, search, fetchTasks]);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <NotificationBar message={message} isVisible={isVisible} />

      <div className="flex items-center justify-around w-full mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            placeholder="Search task"
            onChange={handleSearch}
            className="border border-gray-500 rounded-md px-2 py-1"
          />
          <button
            onClick={() => fetchTasks({ ...filters, search })}
            className="bg-[#577399] text-white rounded-md px-3 py-1"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-[#BDD5EA] w-[90%] h-[20%] flex items-center justify-around rounded-3xl">
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl font-bold">{day}</p>
          <p className="text-xl">{date}</p>
        </div>
        <div className="w-[2px] h-[90%] bg-white"></div>
        <div className="flex flex-col items-center gap-2 text-lg">
          <p>Today you have</p>
          <p>{taskList.length} tasks left</p>
        </div>
      </div>

      <FilterPanel
        availableFilters={availableFilters}
        filters={filters}
        handleAddFilter={handleAddFilter}
      />

      {activeTeam && (
        <p className="text-2xl font-bold">
          Tasks for team: {activeTeam.team_name} ({activeTeam.team_id})
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <TaskChart
              key={task.id}
              task={task}
              fetchTasks={fetchTasks}
              toggleUpdateModal={toggleUpdateModal}
              toggleDeleteModal={toggleDeleteModal}
              handleUpdateTask={handleUpdateTask}
              handleMessage={handleMessage}
            />
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>

      <AddTaskButton toggleModal={toggleModal} />
      <AddTaskForm
        handleCreateTask={handleCreateTask}
        handleMessage={handleMessage}
        isActive={isModalOpen}
        toggleModal={toggleModal}
        userId={user?.id}
        teamId={activeTeam?.team_id}
      />

      {isUpdateModalOpen.isOpen && (
        <UpdateTaskForm
          task={isUpdateModalOpen.task}
          isUpdateModalOpen={isUpdateModalOpen}
          toggleUpdateModal={toggleUpdateModal}
          handleUpdate={handleUpdateTask}
          handleMessage={handleMessage}
          teamId={activeTeam?.team_id}
        />
      )}

      {deleteConfirm.isOpen && (
        <DeleteConfirmModal
          task={deleteConfirm.task}
          deleteConfirm={deleteConfirm}
          toggleDeleteModal={toggleDeleteModal}
          handleDelete={handleDeleteTask}
          handleMessage={handleMessage}
          teamId={activeTeam?.team_id}
          teamIdRequired={activeTeam?.team_id ? true : false}
        />
      )}
    </div>
  );
};

export default TaskManagerBase;
