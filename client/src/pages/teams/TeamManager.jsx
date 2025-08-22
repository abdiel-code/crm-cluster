import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

import { handleCreateTeam } from "../../hooks/teams/useTeamActions.js";

import CreateTeamForm from "../../components/teams/CreateTeamForm.jsx";
import AddTeamButton from "../../components/teams/AddTeamButton.jsx";

const TeamManager = () => {

  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const toggleCreateTeamModal = () => setIsCreateTeamModalOpen(prev => !prev);

  const { user } = useAuth();

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">

      <div className="flex items-center justify-around w-full mb-4">
        <h1>Team Manager</h1>
        <div>
          <input
            type="text"
            name="search"
            placeholder="Search team member"
            className="border border-gray-500 rounded-md px-2 py-1"
          />
        </div>
      </div>


      {isCreateTeamModalOpen && (
        <CreateTeamForm
          id={user.id}
          handleCreateTeam={handleCreateTeam}
        />
      )}
      <AddTeamButton toggleCreateTeamModal={toggleCreateTeamModal} />

    </div>
  );
}

export default TeamManager;
