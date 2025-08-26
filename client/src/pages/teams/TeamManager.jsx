import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  handleCreateTeam,
  handleDeleteTeam,
  handleUpdateTeam,
  handleGetTeam,
  handleJoinRequest,
} from "../../hooks/teams/useTeamActions.js";
import { useTeamManager } from "../../hooks/teams/useTeamManager.js";
import CreateTeamForm from "../../components/teams/CreateTeamForm.jsx";
import AddTeamButton from "../../components/teams/AddTeamButton.jsx";
import MyTeamsChart from "../../components/teams/MyTeamsChart.jsx";
import DeleteTeamModal from "../../components/teams/DeleteTeamModal.jsx";
import UpdateTeamForm from "../../components/teams/UpdateTeamForm.jsx";
import TeamChart from "../../components/teams/TeamChart.jsx";
import useModal from "../../hooks/teams/modalHook.js";
import NotificationButton from "../../components/teams/NotificationButton.jsx";
import NotificationModal from "../../components/teams/NotificationModal.jsx";

const TeamManager = () => {
  const { user } = useAuth();
  const {
    teams: myTeams,
    requests,
    loading,
    refreshTeams,
    refreshRequests,
  } = useTeamManager(user?.id);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [deleteModal, toggleDeleteModal] = useModal();
  const [updateModal, toggleUpdateModal] = useModal();
  const [notificationModal, toggleNotificationModal] = useModal();
  const [searchId, setSearchId] = useState("");
  const [foundTeam, setFoundTeam] = useState(null);

  const toggleCreateTeamModal = () => setIsCreateTeamModalOpen((prev) => !prev);

  const handleSearch = async () => {
    setFoundTeam(null);

    try {
      const team = await handleGetTeam(searchId);
      setFoundTeam(team);
    } catch (error) {
      console.error("Error searching for team:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-2 items-center">
      <div className="flex items-center justify-around w-full mb-4">
        <h1 className="text-2xl font-bold">Team Manager</h1>
        <div>
          <input
            type="text"
            name="search"
            placeholder="Search team by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="border border-gray-500 rounded-md px-2 py-1"
          />

          <button
            className="ml-2 px-3 py-1 bg-[#577399] text-white rounded-md hover:bg-[#495867] cursor-pointer"
            disabled={!searchId.trim()}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">Found Team</h1>
        {foundTeam && (
          <TeamChart
            key={foundTeam.id}
            team={foundTeam[0]}
            userId={user.id}
            handleJoinRequest={handleJoinRequest}
          />
        )}
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

      {notificationModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
          <NotificationModal
            requests={requests}
            toggleNotificationModal={toggleNotificationModal}
          />
        </div>
      )}

      <div className="fixed right-6 bottom-6 flex flex-col items-center gap-4 z-50">
        <NotificationButton
          toggleNotificationModal={toggleNotificationModal}
          requests={requests}
        />
        <AddTeamButton toggleCreateTeamModal={toggleCreateTeamModal} />
      </div>
    </div>
  );
};

export default TeamManager;
