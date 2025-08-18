import React, { useEffect, useState } from "react";

const UpdateTaskForm = ({ task, isUpdateModalOpen, toggleUpdateModal, handleUpdate }) => {
  const [formData, setFormData] = useState({ ...task });

  const hanleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData, task.id);
    toggleUpdateModal();
  };

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

  return (

    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-out w-[90%] max-w-xl
    ${isUpdateModalOpen.isOpen ? 'bottom-1/2 opacity-100 translate-y-1/2' : 'bottom-0 opacity-0 translate-y-0 pointer-events-none'}
  `}
    >
      <h1 className="font-bold text-2xl text-center mb-4">Update Task</h1>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold text-lg mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={hanleChange}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-lg mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={hanleChange}
            className="border rounded px-3 py-2 resize-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="priority" className="font-bold text-lg mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={hanleChange}
            className="border rounded px-3 py-2"
            style={{ color: priorityColors[formData.priority] }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="due_date" className="font-bold text-lg mb-1">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={hanleChange}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="font-bold text-lg mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={hanleChange}
            className="border rounded px-3 py-2 text-white"
            style={{ backgroundColor: statusColors[formData.status] }}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-[#577399] text-white px-4 py-2 rounded hover:bg-[#455a7c]"
        >
          Update
        </button>
        <button
          type="button"
          onClick={toggleUpdateModal}
          className="bg-[#FF847E] text-white px-4 py-2 rounded hover:bg-[#F7B1AB]"
        >
          Cancel
        </button>
      </div>
    </div>
  )


};

export default UpdateTaskForm;
