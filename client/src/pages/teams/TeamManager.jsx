import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  handleCreateTeam,
  handleDeleteTeam,
  handleUpdateTeam,
} from "../../hooks/teams/useTeamActions.js";
import { useTeamManager } from "../../hooks/teams/useTeamManager.js";
import CreateTeamForm from "../../components/teams/CreateTeamForm.jsx";
import AddTeamButton from "../../components/teams/AddTeamButton.jsx";
import MyTeamsChart from "../../components/teams/MyTeamsChart.jsx";
import DeleteTeamModal from "../../components/teams/DeleteTeamModal.jsx";
import UpdateTeamForm from "../../components/teams/UpdateTeamForm.jsx";
import useModal from "../../hooks/teams/modalHook.js";

const TeamManager = () => {
  const { user } = useAuth();
  const { teams: myTeams, loading, refreshTeams } = useTeamManager(user?.id);

  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [deleteModal, toggleDeleteModal] = useModal();
  const [updateModal, toggleUpdateModal] = useModal();

  const toggleCreateTeamModal = () => setIsCreateTeamModalOpen((prev) => !prev);

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <div className="flex items-center justify-around w-full mb-4">
        <h1 className="text-2xl font-bold">Team Manager</h1>
        <div>
          <input
            type="text"
            name="search"
            placeholder="Search teams"
            className="border border-gray-500 rounded-md px-2 py-1"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">My Teams</h1>
        {myTeams.length > 0 ? (
          myTeams.map((team) => (
            <MyTeamsChart
              key={team.id}
              team={team}
              toggleDeleteModal={toggleDeleteModal}
              toggleUpdateModal={toggleUpdateModal}
            />
          ))
        ) : (
          <p>No teams found.</p>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {isCreateTeamModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
          <CreateTeamForm
            id={user.id}
            handleCreateTeam={handleCreateTeam}
            toggleCreateTeamModal={toggleCreateTeamModal}
            refreshTeams={refreshTeams}
          />
        </div>
      )}
      <AddTeamButton toggleCreateTeamModal={toggleCreateTeamModal} />

      {deleteModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
          <DeleteTeamModal
            teamId={deleteModal.id}
            toggleDeleteModal={toggleDeleteModal}
            handleDeleteTeam={handleDeleteTeam}
            refreshTeams={refreshTeams}
          />
        </div>
      )}

      {updateModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
          <UpdateTeamForm
            id={updateModal.id}
            handleUpdateTeam={handleUpdateTeam}
            toggleUpdateTeamModal={toggleUpdateModal}
            refreshTeams={refreshTeams}
          />
        </div>
      )}
    </div>
  );
};

export default TeamManager;
