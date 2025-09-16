import connection from "../../core/database/connection.js";

export const sendMessage = async (message) => {
  if (!message || typeof message !== "object") {
    throw new Error("Invalid message data");
  }

  const { senderId, teamId } = message;

  if (!senderId || !teamId) {
    throw new Error("Sender ID and team ID are required");
  }

  const [isInTeam] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND user_id = ?",
    [teamId, senderId]
  );

  if (isInTeam.length === 0) {
    throw new Error("User is not in the team");
  }

  //  console.log("Message will be sended");

  return {
    success: true,
    message: "Message sent successfully",
    data: message,
  };
};
