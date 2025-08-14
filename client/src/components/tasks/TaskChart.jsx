import React, { useState } from "react";

const TaskChart = ({ title, description, status: initialStatus, priority, dueDate, craetedAt, id }) => {


  const [status, setStatus] = useState(initialStatus);
  const statusColors = {
    pending: '#577399',
    in_progress: '#ffb347',
    completed: '#38A169',
    cancelled: '#F7B1AB',
  }
  const priorityColors = {
    low: '#577399',
    medium: '#ffff00',
    high: '#F7B1AB',
    urgent: '#ff0000',
  }

  const handleOption = (e) => {
    setStatus(e.target.value);
    // axios.put(`/api/tasks/${id}`, { status: e.target.value })
  }

  const handleDelete = () => {
    // axios.delete(`/api/tasks/${id}`)
  }

  const handleModalEdit = () => {

  }



  return (
    <div className='border-gray-400 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.2)] p-2 
      w-full h-full rounded-[20px] flex flex-col justify-around items-center box-border hover:border-2 hover:border-[#577399]'>

      <p className="text-gray-500 text-xl">Created at: {craetedAt}</p>
      <p className="font-bold text-2xl">{title}</p>
      <p className="text-[#577399] font-bold text-xl">{description}</p>
      <p className="font-bold text-xl" style={{ color: priorityColors[priority] }}>
        Priority: {priority}
      </p>
      <p className="font-bold">Due date: {dueDate}</p>

      <div className="w-[90%] h-[1px] bg-[#495867]"></div>

      <div className="flex items-center gap-1">
        <button className="bg-[#bdd5ea] py-1 px-4 text-white rounded-[10px] font-medium text-[1.1rem] hover:bg-[#577399] cursor-pointer">
          Edit
        </button>

        <select
          value={status}
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
