import { createTeam } from "./service.js";

export const handleCreateTeam = async (formData) => {

    console.log("handleCreateTeam called with formData:", formData);
    try {
        const team = await createTeam(formData);
        console.log("Team created successfully:", team);
        return team;
    } catch (error) {
        console.error("Error creating team:", error);
        throw new Error("Failed to create team please try again later.");
    }
}