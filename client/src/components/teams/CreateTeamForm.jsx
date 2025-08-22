import React, { useState } from "react";

const CreateTeamForm = ({ id, handleCreateTeam, toggleCreateTeamModal, refreshTeams }) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    id: id,
    role: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <h2 className="mb-4">Create Team</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreateTeam(formData);
        refreshTeams();
        toggleCreateTeamModal();
      }}>

        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Team Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Team Description"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Team
        </button>
      </form>


    </div>
  )

}

export default CreateTeamForm;
