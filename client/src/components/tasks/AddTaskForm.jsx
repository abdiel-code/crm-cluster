import React, { useState } from 'react'

const AddTaskForm = ({ handleCreateTask, isActive, userId }) => {
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

    console.log("name", name);
    console.log("value", value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCreateTask(formData);
  };

  return (
    <div className={isActive
      ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-[4px_4px_4px_4px_rgba(0,0,0,0.2)]  '
      : 'hidden'}>

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
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='rounded-2xl bg-gray-300 focus:outline-none transition-transform duration-300 ease-in-out focus:scale-105 px-5 py-1 text-[1rem] focus:border-1 focus:border-[#577399]'

          />
        </div>

        {/* Status selector*/}

        <select name="status" value={formData.status} onChange={handleChange} className='text-[1.2rem]'>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Priority selector*/}

        <select name="priority" value={formData.priority} onChange={handleChange} className='text-[1.2rem]'>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>


        <div>
          <label htmlFor="due_date" className="block mb-2 text-[1.2rem]">Due Date</label>
          <input
            id="due_date"
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="py-2 px-3 rounded-xl bg-[#577399] text-white cursor-pointer hover:bg-[#495867]">
          Add Task
        </button>
      </form>

      <div className="absolute bottom-0 left-0 w-full h-4 bg-[#577399] rounded-b-lg"></div>
    </div>
  )
}

export default AddTaskForm
