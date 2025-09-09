import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  handleCreateTeam,
  handleDeleteTeam,
  handleUpdateTeam,
  handleGetTeam,
  handleJoinRequest,
  handleSentRequest,
  handleGetTeamMembers,
  handleDeleteMember,
  handleUpdateRole,
  handleLeaveTeam,
  handleTeamConnect,
} from "../../hooks/teams/useTeamActions.js";
import { useTeamManager } from "../../hooks/teams/useTeamManager.js";
import CreateTeamForm from "../../components/teams/CreateTeamForm.jsx";
import AddTeamButton from "../../components/teams/AddTeamButton.jsx";
import MyTeamsChart from "../../components/teams/MyTeamsChart.jsx";
import DeleteTeamModal from "../../components/teams/DeleteModal.jsx";
import UpdateTeamForm from "../../components/teams/UpdateTeamForm.jsx";
import TeamChart from "../../components/teams/TeamChart.jsx";
import useModal from "../../hooks/teams/modalHook.js";
import NotificationButton from "../../components/teams/NotificationButton.jsx";
import NotificationModal from "../../components/teams/NotificationModal.jsx";
import JoinedTeamChart from "../../components/teams/JoinedTeamChart.jsx";

const TeamManager = () => {
  const { user } = useAuth();
  const {
    teams: myTeams,
    joinedTeams,
    requests,
    loading,
    refreshTeams,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-4 gap-2">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Team Manager
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
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
            className="border border-gray-500 rounded-md px-2 py-1 w-full sm:w-auto"
          />

          <button
            className="px-3 py-1 bg-[#577399] text-white rounded-md hover:bg-[#495867] cursor-pointer mx-auto sm:mx-0 flex items-center justify-center gap-2 w-fit"
            disabled={!searchId.trim()}
            onClick={handleSearch}
          >
            <FaSearch className="block sm:hidden" />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4 mt-4">
        <h1 className="text-2xl font-bold text-center">Found Team</h1>

        {foundTeam && foundTeam.length > 0 ? (
          <div className="w-full sm:w-[90%]">
            <TeamChart
              key={foundTeam[0].id}
              team={foundTeam[0]}
              userId={user.id}
              handleJoinRequest={handleJoinRequest}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500 italic text-base sm:text-xl px-2">
            Search for a team to get results.
          </p>
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
              handleGetTeamMembers={handleGetTeamMembers}
              handleDeleteMember={handleDeleteMember}
              handleUpdateRole={handleUpdateRole}
              handleTeamConnect={handleTeamConnect}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 italic text-xl">
            No teams found.
          </p>
        )}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">Joined Teams</h1>
        {joinedTeams.length > 0 ? (
          joinedTeams.map((team) => (
            <JoinedTeamChart
              key={team.id}
              team={team}
              handleGetTeamMembers={handleGetTeamMembers}
              handleLeaveTeam={handleLeaveTeam}
              refreshTeams={refreshTeams}
              handleTeamConnect={handleTeamConnect}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 italic text-xl">
            You're not part of any teams yet.
          </p>
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
            id={deleteModal.id}
            toggleDeleteModal={toggleDeleteModal}
            handleDeleteFunction={handleDeleteTeam}
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
            handleSentRequest={handleSentRequest}
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
