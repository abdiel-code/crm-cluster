import {
  createTeam,
  getMyTeams,
  deleteTeam,
  updateTeam,
  getTeam,
} from "./service.js";

export const handleCreateTeam = async (formData) => {
  try {
    const team = await createTeam(formData);
    console.log("Team created successfully:", team);
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team please try again later.");
  }
};

export const handleGetMyTeams = async (userId) => {
  try {
    const myTeams = await getMyTeams(userId);
    console.log("My teams:", myTeams);
    return myTeams;
  } catch (error) {
    console.error("Error getting my teams:", error);
    throw new Error("Failed to get my teams please try again later.");
  }
};

export const handleDeleteTeam = async (teamId) => {
  console.log("handleDelete teamId", teamId);

  try {
    const team = await deleteTeam(teamId);
    console.log("Team deleted successfully:", team);
    return team;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Failed to delete team please try again later.");
  }
};

export const handleUpdateTeam = async (teamData) => {
  console.log("handleUpdate teamData", teamData);

  try {
    console.log("processing update team");
    const team = await updateTeam(teamData);
    console.log("Team updated successfully:", team);
    return team;
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Failed to update team please try again later.");
  }
};

export const handleGetTeam = async (teamId) => {
  if (!teamId) throw new Error("Team id is required");

  try {
    console.log("handleGet teamId", teamId);
    const team = await getTeam(teamId);
    console.log("Team:", team);
    return team;
  } catch (error) {
    console.error("Error getting team:", error);
    throw new Error("Failed to get team please try again later.");
  }
};
