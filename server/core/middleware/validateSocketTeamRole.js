import connection from "../database/connection.js";

const validateSocketTeamRole = (teamId, ...allowedRoles) => {
  return async (socket, next) => {
    const userId = socket.user.id;

    try {
      const [teamRows] = await connection.query(
        "SELECT created_by FROM teams WHERE id = ?",
        [teamId]
      );

      if (teamRows.length === 0) {
        return next(new Error("Team not found"));
      }

      const isCreator = teamRows[0].created_by === userId;

      if (isCreator) return next();

      const [roleRows] = await connection.query(
        "SELECT role FROM user_teams WHERE team_id = ? AND user_id = ?",
        [teamId, userId]
      );

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
