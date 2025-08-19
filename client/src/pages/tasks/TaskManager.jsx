import React, { useState, useEffect} from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TaskChart from "../../components/tasks/TaskChart.jsx";
import useTaskFilters from "../../hooks/tasks/useTaskFilters.js";
import useTaskFetcher from "../../hooks/tasks/useTaskFetcher.js";
import useTaskActions from "../../hooks/tasks/useTaskActions.js";
import FilterPanel from "../../components/tasks/FilterPanel.jsx";
import AddTaskButton from "../../components/tasks/AddTaskButton.jsx";
import AddTaskForm from "../../components/tasks/AddTaskForm.jsx";
import DeleteConfirmModal from "../../components/tasks/DeleteConfirmModal.jsx";
import NotificationBar from "../../components/core/NotificationBar.jsx";

import { FaPaw } from "react-icons/fa";

import formatDate from "../../hooks/global/formatDate.js";
import UpdateTaskForm from "../../components/tasks/UpdateTaskForm.jsx";


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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState({
    isOpen: false,
    task: null
  });
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    task: null
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => setSearch(e.target.value);

  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }

  const toggleDeleteModal = (task = null) => {
    if (deleteConfirm.isOpen) {
      setDeleteConfirm({ isOpen: false, task: null });
      return;
    }

    if (task) {
      setDeleteConfirm({ isOpen: true, task });
    } else {
      setDeleteConfirm({ isOpen: false, task: null });
    }
  }

  const toggleUpdateModal = (task = null) => {
    if (isUpdateModalOpen.isOpen) {
      setIsUpdateModalOpen({ isOpen: false, task: null });
      return;
    }

    if (task) {
      setIsUpdateModalOpen({ isOpen: true, task });
    } else {
      setIsUpdateModalOpen({ isOpen: false, task: null });
    }

  };

  const { handleCreateTask, handleUpdateTask, handleDeleteTask } = useTaskActions(user, fetchTasks, toggleUpdateModal);

  const handleMessage = (msg) => {
    setMessage(msg);
  }

useEffect(() => {
  if (!user) return;

  fetchTasks({ ...filters, search });
}, [user, filters, search, fetchTasks]);


useEffect(() => {
  if (isUpdateModalOpen.isOpen) {
    setShowModal(true);
    setTimeout(() => setIsAnimating(true), 10);
  } else {
    setIsAnimating(false);
    const timer = setTimeout(() => setShowModal(false), 500);
    return () => clearTimeout(timer);
  }
}, [isUpdateModalOpen.isOpen]);

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


      <NotificationBar message={message} isVisible={isVisible}/>

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

      <div className="bg-[#BDD5EA] w-[90%] h-[20%] flex items-center justify-around rounded-3xl">

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
            task={task}
            fetchTasks={fetchTasks}
            toggleUpdateModal={toggleUpdateModal}
            toggleDeleteModal={toggleDeleteModal}
            handleUpdateTask={handleUpdateTask}
            handleMessage={handleMessage}
          />

        ))}

        {taskList.length === 0 && (
          <p>No tasks found</p>
        )}
      </div>


      <AddTaskButton toggleModal={toggleModal} />


{isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500">
      </div>
)}

      <div className="z-60">

        <AddTaskForm 
        handleCreateTask={handleCreateTask} 
        handleMessage={handleMessage}
        isActive={isModalOpen} 
        toggleModal={toggleModal} 
        userId={user.id} />

      </div>


      {showModal && (
  <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500
      ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
  >
    <UpdateTaskForm
      task={isUpdateModalOpen.task}
      isUpdateModalOpen={isUpdateModalOpen}
      toggleUpdateModal={toggleUpdateModal}
      handleUpdate={handleUpdateTask}
      handleMessage={handleMessage}
    />
  </div>
)}

      {deleteConfirm.isOpen &&
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40 flex items-center justify-center">

          <DeleteConfirmModal
          task={deleteConfirm.task}
          deleteConfirm={deleteConfirm}
          toggleDeleteModal={toggleDeleteModal}
          handleDelete={handleDeleteTask}
          handleMessage={handleMessage}          
          />
        </div>
      }

    </div>
 
  );
};

export default TaskManager;
