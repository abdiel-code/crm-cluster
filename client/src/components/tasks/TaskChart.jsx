import React, { useState } from "react";
import formatDate from "../../hooks/global/formatDate.js";

const userLocale = navigator.language || "en-US";

const TaskChart = ({ task, fetchTasks, toggleUpdateModal, toggleDeleteModal, handleUpdateTask }) => {


  const { id, title, description, due_date, priority, status = "pending" } = task;

  const formattedDueDate = formatDate(due_date, userLocale);


  const statusColors = {
    pending: '#577399',
    in_progress: '#ffb347',
    completed: '#38A169',
    cancelled: '#F7B1AB',
  }
  const priorityColors = {
    low: '#577399',
    medium: '#ffb347',
    high: '#F7B1AB',
    urgent: '#ff0000',
  }


  const handleOption = (e) => {
    const newStatus = e.target.value;

    const { due_date, ...rest } = task;
    const updatedTask = { ...rest, status: newStatus };

    handleUpdateTask(updatedTask, id);
    fetchTasks();
  };

  return (
    <div className='border-gray-400 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.2)] p-2 
      w-full h-full rounded-[20px] flex flex-col justify-around items-center box-border hover:border-2 hover:border-[#577399]'>

      <p
        className="font-medium text-2xl"
        style={{
          textAlign: 'center',
          wordBreak: 'break-word',
          textAlignLast: 'center'
        }}
      >{title}</p>

      <p
        className="text-[#495867] font-medium text-xl block"
        style={{
          textAlign: 'center',
          wordBreak: 'break-word',
          textAlignLast: 'center'
        }}
      >
        {description}
      </p>
      <p className="font-bold text-xl" style={{ color: priorityColors[priority] }}>
        Priority: {priority}
      </p>
      <p className="font-bold">Expires {formattedDueDate}</p>

      <div className="w-[90%] h-[1px] bg-[#495867] my-2"></div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="bg-[#bdd5ea] py-1 px-4 text-white rounded-[10px] font-medium text-[1.1rem] hover:bg-[#577399] cursor-pointer"
          onClick={() => toggleUpdateModal(task)}
        >
          Edit
        </button>

        <select
          value={status}
          name="status"
          onChange={handleOption}
          className="py-1 px-3 text-white text-[1.1rem] font-medium rounded-lg border border-gray-300 cursor-pointer
          focus:outline-none focus:ring-2 transition duration-200"
          style={{ backgroundColor: statusColors[status] }}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          type="button"
          onClick={() => toggleDeleteModal(task)}
          className="bg-[#F7B1AB] w-10 h-10 text-white rounded-full font-bold text-[1.1rem] 
          hover:bg-[#FF847E] cursor-pointer flex justify-center items-center">
          <div className="w-6 h-1 bg-white rounded">

          </div>
        </button>
      </div>
    </div>
  )
}

export default TaskChart;
