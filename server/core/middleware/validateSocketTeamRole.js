import connection from "../database/connection.js";

const validateSocketTeamRole = (teamId, ...allowedRoles) => {

  console.log("validateSocketTeamRole roles", allowedRoles);
  console.log("validateSocketTeamRole teamId", teamId);

  return async (socket, next) => {
    const userId = socket.user.id;

    console.log("the user has reached validateSocketTeamRole", userId);

    try {

      const [teamRows] = await connection.query(
        "SELECT created_by FROM teams WHERE id = ?",
        [teamId]
      );

      console.log("The team rows gived by validateSocketTeamRole", teamRows);

      if (teamRows.length === 0) {
        return next(new Error("Team not found"));
      }

      console.log("team rows gived a team");

      const isCreator = teamRows[0].created_by === userId;
      console.log("is creator then will return next", isCreator);
      if (isCreator) return next();

      const [roleRows] = await connection.query(
        "SELECT role FROM user_teams WHERE team_id = ? AND user_id = ?",
        [teamId, userId]
      );

      console.log("validateSocketTeamRole roleRows", roleRows);

      if (roleRows.length === 0) {
        return next(new Error("User not part of this team"));
      }

      const userRole = roleRows[0].role;
      if (!allowedRoles.includes(userRole)) {
        return next(new Error("Forbidden: insufficient team role"));
      }

      next();
    } catch (err) {
      console.error("Error in validateSocketRole:", err);
      next(new Error("Internal server error"));
    }
  };
};

export default validateSocketTeamRole;
