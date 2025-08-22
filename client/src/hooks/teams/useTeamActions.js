import { createTeam, getMyTeams, deleteTeam } from "./service.js";

export const handleCreateTeam = async (formData) => {

  try {
    const team = await createTeam(formData);
    console.log("Team created successfully:", team);
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team please try again later.");
  }
}

export const handleGetMyTeams = async (userId) => {
  try {

    const myTeams = await getMyTeams(userId);
    console.log("My teams:", myTeams);
    return myTeams;

  } catch (error) {
    console.error("Error getting my teams:", error);
    throw new Error("Failed to get my teams please try again later.");

  }
}

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
}
