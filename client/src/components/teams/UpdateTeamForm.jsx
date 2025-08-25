import React, { useState } from "react";

const UpdateTeamForm = ({
  id,
  handleUpdateTeam,
  toggleUpdateTeamModal,
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

    console.log("formData", formData);

    try {
      console.log("processing update team");
      await handleUpdateTeam(formData);
      console.log("Processing refresh");
      refreshTeams();
      toggleUpdateTeamModal();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="w-[25%] h-[45%] flex flex-col items-center shadow-[4px_4px_0px_rgba(0,0,0,0.20)] bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Update Team</h2>

      <form
        className="w-full h-full flex flex-col gap-4 items-center justify-around"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xl">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Team Name"
            className="text-xl focus:scale-105 transition-all duration-300 ease-in-out border-2 border-[#577399] rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-xl">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Team Description"
            className="text-xl focus:scale-105 transition-all duration-300 ease-in-out border-2 border-[#577399] rounded-md"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <button
            type="submit"
            className="bg-[#577399] text-white px-4 py-2 rounded-md hover:bg-[#495867] transition-colors cursor-pointer"
          >
            Update Team
          </button>
          <button
            type="button"
            onClick={toggleUpdateTeamModal}
            className="bg-[#F7B1AB] text-white px-4 py-2 rounded-md hover:bg-[#FF847E] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTeamForm;
