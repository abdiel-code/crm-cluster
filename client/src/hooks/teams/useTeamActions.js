import {
  createTeam,
  getMyTeams,
  deleteTeam,
  updateTeam,
  getTeam,
  sendJoinRequest,
  getRequests,
  handleRequest,
  getTeamMembers,
  deleteTeamUser,
  updateTeamUser,
  getJoinedTeams,
  leaveTeam,
  connectTeam,
} from "./service.js";
import { log } from "../../core/logWrapper.js";

export const handleCreateTeam = async (formData) => {
  try {
    const team = await createTeam(formData);
    log("Team created successfully:", team);
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team please try again later.");
  }
};

export const handleGetMyTeams = async (userId) => {
  try {
    const myTeams = await getMyTeams(userId);
    log("My teams:", myTeams);
    return myTeams;
  } catch (error) {
    console.error("Error getting my teams:", error);
    throw new Error("Failed to get my teams please try again later.");
  }
};

export const handleDeleteTeam = async (teamId) => {
  log("handleDelete teamId", teamId);

  try {
    const team = await deleteTeam(teamId);
    log("Team deleted successfully:", team);
    return team;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Failed to delete team please try again later.");
  }
};

export const handleUpdateTeam = async (teamData) => {
  log("handleUpdate teamData", teamData);

  try {
    log("processing update team");
    const team = await updateTeam(teamData);
    log("Team updated successfully:", team);
    return team;
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Failed to update team please try again later.");
  }
};

export const handleGetTeam = async (teamId) => {
  if (!teamId) throw new Error("Team id is required");

  try {
    log("handleGet teamId", teamId);
    const team = await getTeam(teamId);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error getting team:", error);
    throw new Error("Failed to get team please try again later.");
  }
};

export const handleJoinRequest = async (teamId, userId) => {
  log("handleJoinRequest teamId and userId", teamId, userId);

  if (!teamId) throw new Error("Team id is required");

  log("handleJoinRequest teamId accepted");

  if (!userId) throw new Error("Unauthorized: userId missing");

  log("handleJoinRequest userId accepted");

  try {
    log("Sending join request");
    const team = await sendJoinRequest(teamId, userId);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error sending join request:", error);
    throw new Error("Failed to send join request please try again later.");
  }
};

export const handleGetRequests = async (userId) => {
  if (!userId) throw new Error("Unauthorized: userId missing");
  try {
    const requests = await getRequests(userId);
    log("Requests:", requests);
    return requests;
  } catch (error) {
    console.error("Error getting requests:", error);
    throw new Error("Failed to get requests please try again later.");
  }
};

export const handleSentRequest = async (teamId, userId, resolution) => {
  log(
    "handleSentRequest teamId userId, resolution",
    teamId,
    userId,
    resolution
  );

  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  try {
    log("Trying to handle request");

    const team = await handleRequest(teamId, userId, resolution);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw new Error("Failed to accept request please try again later.");
  }
};

export const handleGetTeamMembers = async (teamId) => {
  if (!teamId) throw new Error("Team id is required");

  log("handleGetTeamMembers teamId accepted");

  try {
    log("Trying to get team members");
    const team = await getTeamMembers(teamId);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error getting team members:", error);
    throw new Error("Failed to get team members please try again later.");
  }
};

export const handleDeleteMember = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("handleDeleteMember teamId and userId accepted", teamId, userId);

  try {
    log("Trying to delete team member");
    const team = await deleteTeamUser(teamId, userId);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw new Error("Failed to delete team member please try again later.");
  }
};

export const handleUpdateRole = async (userId, teamId, role) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("handleUpdateRole teamId and userId accepted", teamId, userId);

  try {
    log("Trying to update team member role", userId, teamId, role);
    const team = await updateTeamUser(userId, teamId, role);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error updating team member role:", error);
    throw new Error(
      "Failed to update team member role please try again later."
    );
  }
};

export const handleJoinedTeams = async (userId) => {
  if (!userId) throw new Error("Unauthorized: userId missing");

  try {
    log("Trying to get joined teams");
    const teams = await getJoinedTeams(userId);
    log("Teams:", teams);
    return teams;
  } catch (error) {
    console.error("Error getting joined teams:", error);
    throw new Error("Failed to get joined teams please try again later.");
  }
};

export const handleLeaveTeam = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("handleLeaveTeam teamId and userId accepted", teamId, userId);

  try {
    log("Trying to leave team");
    const team = await leaveTeam(teamId, userId);
    log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error leaving team:", error);
    throw new Error("Failed to leave team please try again later.");
  }
};

export const handleTeamConnect = async (teamId, setActiveTeam) => {
  try {
    const teamData = await connectTeam(teamId);
    if (teamData?.[0]) {
      setActiveTeam(teamData[0]);
      localStorage.setItem("activeTeam", JSON.stringify(teamData[0]));
    }
    return teamData;
  } catch (error) {
    console.error("Error connecting to team:", error);
    throw error;
  }
};
