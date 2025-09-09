import React, { useState } from "react";

const CreateTeamForm = ({
  id,
  handleCreateTeam,
  toggleCreateTeamModal,
  refreshTeams,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    id: id,
    role: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleCreateTeam(formData);
      refreshTeams();
      toggleCreateTeamModal();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="w-[90%] sm:w-[25%] h-auto sm:h-[45%] flex flex-col items-center shadow-[4px_4px_0px_rgba(0,0,0,0.20)] bg-white rounded-md p-4 gap-4">
      <h2 className="text-2xl font-bold text-center">Create Team</h2>

      <form
        className="w-full flex flex-col gap-4 items-center justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="text-xl">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Team Name"
            className="text-xl px-2 py-1 focus:scale-[1.02] transition-all duration-300 ease-in-out border-2 border-[#577399] rounded-md w-full"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="description" className="text-xl">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Team Description"
            className="text-xl px-2 py-1 focus:scale-[1.02] transition-all duration-300 ease-in-out border-2 border-[#577399] rounded-md w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center w-full">
          <button
            type="submit"
            className="bg-[#577399] text-white px-4 py-2 rounded-md hover:bg-[#495867] transition-colors cursor-pointer w-full sm:w-auto"
          >
            Create Team
          </button>
          <button
            type="button"
            onClick={toggleCreateTeamModal}
            className="bg-[#F7B1AB] text-white px-4 py-2 rounded-md hover:bg-[#FF847E] transition-colors cursor-pointer w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamForm;
