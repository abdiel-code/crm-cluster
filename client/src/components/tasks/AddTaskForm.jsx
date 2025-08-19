import React, { useState } from 'react'

const AddTaskForm = ({ handleCreateTask, isActive, userId, toggleModal, handleMessage }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'low',
    due_date: "",
    user_id: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await handleCreateTask(formData);
    handleMessage(response.message);
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'low',
      due_date: "",
      user_id: userId
    })
    toggleModal();
  };



  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-[4px_4px_4px_4px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out
    ${isActive ? 'bottom-1/2 opacity-100 translate-y-1/2' : 'bottom-0 opacity-0 translate-y-0 pointer-events-none'}
  `}
    >

      <h1 className='text-xl text-center font-bold'>Add Task</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 py-6">

        <div className="absolute top-0 left-0 w-full h-4 bg-[#577399] rounded-t-lg"></div>

        <div>
          <label htmlFor="title" className="block mb-2 text-[1.2rem]">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className='rounded-2xl bg-gray-300 focus:outline-none transition-transform duration-300 ease-in-out focus:scale-105 px-5 py-1 text-[1rem] focus:border-1 focus:border-[#577399]'
          />
        </div>

<div>
          <label htmlFor="description" className="block mb-2 text-[1.2rem]">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className='rounded-2xl bg-gray-300 focus:outline-none transition-transform duration-300 ease-in-out focus:scale-105 px-5 py-2 text-[1rem] focus:border-1 focus:border-[#577399] resize-none h-20' 
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-2 text-[1.2rem]">Status</label>
          <select 
            id="status"
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            className='rounded-2xl bg-gray-300 focus:outline-none transition-transform duration-300 ease-in-out focus:scale-105 px-5 py-1 text-[1rem] focus:border-1 focus:border-[#577399] w-full'
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

                <div>
          <label htmlFor="priority" className="block mb-2 text-[1.2rem]">Priority</label>
          <select 
            id="priority"
            name="priority" 
            value={formData.priority} 
            onChange={handleChange} 
            className='rounded-2xl bg-gray-300 focus:outline-none transition-transform duration-300 ease-in-out focus:scale-105 px-5 py-1 text-[1rem] focus:border-1 focus:border-[#577399] w-full'
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>


        <div>
          <label htmlFor="due_date" className="block mb-2 text-[1.2rem]">Due Date</label>
          <input 
            id="due_date" 
            type="date" 
            name="due_date" 
            value={formData.due_date} 
            onChange={handleChange} 
            className='rounded-2xl bg-gray-300 focus:outline-none transition-transform duration-300 ease-in-out focus:scale-105 px-5 py-1 text-[1rem] focus:border-1 focus:border-[#577399] w-full'
          />
        </div>

        <div className="flex justify-around gap-4">
          <button type="submit" className="py-2 px-3 rounded-xl bg-[#577399] text-white cursor-pointer hover:bg-[#495867]">
            Add Task
          </button>

          <button
            type="button"
            className="py-2 px-3 rounded-xl bg-[#FF847E] text-white cursor-pointer hover:bg-[#F7B1AB]"
            onClick={toggleModal}
          >
            Cancel
          </button>

        </div>
      </form>

      <div className="absolute bottom-0 left-0 w-full h-4 bg-[#577399] rounded-b-lg"></div>
    </div>
  )
}

export default AddTaskForm
