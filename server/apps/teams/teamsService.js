import connection from "../../core/database/connection.js";
import { log } from "../../logWrapper.js";
const acceptedRoles = ["admin", "editor", "user", "viewer"];
export const createTeam = async (teamData) => {
  const { name, description, id: userId } = teamData;

  if (!name?.trim()) throw new Error("Name is required and cannot be empty");
  if (!userId) throw new Error("Unauthorized: userId missing");

  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      "INSERT INTO teams (name, description, created_by) VALUES (?, ?, ?)",
      [name, description, userId]
    );
    if (result.affectedRows === 0) throw new Error("Team could not be created");

    const [userTeam] = await connection.query(
      "INSERT INTO user_teams (user_id, team_id, role, status) VALUES (?, ?, ?, ?)",
      [userId, result.insertId, "admin", "active"]
    );

    if (userTeam.affectedRows === 0) {
      throw new Error("Team creation failed: user could not be assigned");
    }

    await connection.commit();

    return {
      success: true,
      message: "Team created successfully",
      data: {
        id: result.insertId,
        name,
        description,
        created_by: userId,
        role: "admin",
        status: "active",
      },
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};

export const getMyTeams = async (userId) => {
  if (!userId) throw new Error("Unauthorized: userId missing");

  try {
    const [result] = await connection.query(
      "SELECT * FROM teams WHERE created_by = ?",
      [userId]
    );

    if (result.length === 0) return { found: false, teams: null };

    return {
      success: true,
      message: "Teams found successfully",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteTeam = async (teamId, userId) => {
  log("deleteTeam teamId", teamId);
  log("deleteTeam userId", userId);

  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  const [findTeam] = await connection.query(
    "SELECT * FROM teams WHERE created_by = ?",
    [userId]
  );

  log("findTeams where created_by", findTeam);

  if (findTeam.length === 0) throw new Error("Team not found or unauthorized");

  log("find team success");

  const [result] = await connection.query(
    "DELETE FROM teams WHERE id = ? AND created_by = ?",
    [teamId, userId]
  );

  log("deleteTeam result", result);

  if (result.affectedRows === 0) throw new Error("Team could not be deleted");

  log("deleteTeam success");

  return { success: true, message: "Team deleted successfully", data: result };
};

export const updateTeam = async (teamData, userId) => {
  log("updateTeam has data?", teamData);

  const { id, name, description } = teamData;

  log("Something is null at updateTeam?", id, name, description, userId);

  if (!id) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("UserId and teamId are valid");

  if (!name?.trim() && !description)
    return { success: false, message: "No fields to update", data: null };

  log("name and description are valid");

  let query = "UPDATE teams SET";
  const params = [];
  const updates = [];

  if (name) {
    updates.push("name = ?");
    params.push(name);
  }

  if (description) {
    updates.push("description = ?");
    params.push(description);
  }

  query += " " + updates.join(", ") + " WHERE id = ? AND created_by = ?";
  params.push(id, userId);

  const [result] = await connection.query(query, params);

  log("updateTeam result", result);

  if (result.affectedRows === 0) throw new Error("Team could not be updated");

  if (result.affectedRows > 0) log("Team updated successfully");

  return { success: true, message: "Team updated successfully", data: result };
};

export const getTeam = async (teamData, userId) => {
  log("getTeam has data?", teamData);
  const teamId = teamData;

  log("getTeam id and userId", teamId, userId);

  if (!teamId || !userId) throw new Error("Missing team id or userId");
  log("Team id and user id are valid");

  const [result] = await connection.query("SELECT * FROM teams WHERE id = ?", [
    teamId,
  ]);

  log("Team found?", result);

  if (result.length === 0) return { success: false, message: "Team not found" };

  return { success: true, message: "Team found successfully", data: result };
};

export const getTeamMembers = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");

  const [result] = await connection.query(
    `SELECT ut.*, u.name 
   FROM user_teams ut
   JOIN users u ON ut.user_id = u.id
   WHERE ut.team_id = ? AND ut.status = ? AND ut.user_id != ?`,
    [teamId, "active", userId]
  );

  if (result.length === 0) {
    return {
      success: true,
      message: "No team members found",
      data: [],
    };
  }

  return {
    success: true,
    message: "Team members found successfully",
    data: result,
  };
};

export const kickUser = async (teamId, userId, deleterId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!deleterId) throw new Error("Unauthorized: deleterId missing");

  log("UserId and teamId are valid on kickuser backend call");

  const [isCreator] = await connection.query(
    "SELECT created_by FROM teams WHERE id = ?",
    [teamId]
  );

  log("isCreator", isCreator);

  if (isCreator[0].created_by === userId) {
    throw new Error("Creator cannot be deleted");
  }

  const [userExists] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND user_id = ?",
    [teamId, userId]
  );

  if (userExists.length === 0)
    return {
      deleted: false,
      teamId: id,
      message: "User not on team or does not exist",
    };

  if (userExists[0].role === "admin" && isCreator[0].created_by !== deleterId) {
    throw new Error("Admin cannot be deleted");
  }

  log("team Id", teamId);
  log("user Id", userId);

  const [result] = await connection.query(
    "DELETE FROM user_teams WHERE team_id = ? AND user_id = ?",
    [teamId, userId]
  );

  if (result.affectedRows === 0)
    throw new Error("Team user could not be deleted");

  return { deleted: true, teamId: id, message: "Team user deleted" };
};

export const updateTeamUser = async (userId, teamId, userRole) => {
  if (!userId) throw new Error("User id is required");
  if (!teamId) throw new Error("Team id is required");
  if (!userRole) throw new Error("User role is required");

  if (!acceptedRoles.includes(userRole))
    throw new Error("User role not accepted");

  log("updateTeamUser userId, teamId and userRole accepted");

  //check if uerId is creator

  const [isCreator] = await connection.query(
    "SELECT created_by FROM teams WHERE id = ?",
    [teamId]
  );

  if (isCreator[0].created_by === userId) {
    throw new Error("Creator cannot be updated");
  }

  const query = `UPDATE user_teams SET role = ? WHERE team_id = ? AND user_id = ?`;
  const params = [userRole, teamId, userId];

  const [result] = await connection.query(query, params);

  if (result.affectedRows === 0)
    throw new Error("Team user could not be updated");

  return {
    success: true,
    updated: true,
    message: "Team user updated successfully",
    user_id: userId,
    team_id: teamId,
    role: userRole,
  };
};

export const joinRequest = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("User and team id received");

  const [userInTeam] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND user_id = ?",
    [teamId, userId]
  );

  log("user is in the team", userInTeam);

  //Check if user is already in the team
  if (userInTeam.length > 0) {
    if (userInTeam[0].status === "active") {
      return {
        success: false,
        message: "User is already in the team",
        data: userInTeam,
      };
    }

    if (userInTeam[0].status === "pending") {
      return {
        success: false,
        message: "Join request already sent",
        data: userInTeam,
      };
    }

    if (userInTeam[0].status === "rejected") {
      return {
        success: false,
        message: "Join request already declined, please try again later",
        data: userInTeam,
      };
    }
  }

  const [result] = await connection.query(
    "INSERT INTO user_teams (user_id, team_id, status) VALUES (?, ?, ?)",
    [userId, teamId, "pending"]
  );

  if (result.affectedRows === 0)
    throw new Error("Join request could not be sent");

  return {
    success: true,
    message: "Join request sent successfully",
    data: result,
  };
};

export const getRequests = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  log("Team id is valid", teamId);
  if (!userId) throw new Error("Unauthorized: userId missing");
  log("User id is valid", userId);

  const [result] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND status = 'pending'",
    [teamId]
  );

  if (result.length === 0)
    return { success: false, message: "No requests found" };

  return {
    success: true,
    message: "Requests found successfully",
    data: result,
  };
};

export const acceptRequest = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log(
    "User and team id received in acceptRequest, teamId , userId",
    teamId,
    userId
  );

  const [userRequestStatus] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND user_id = ? AND status = ?",
    [teamId, userId, "pending"]
  );

  if (userRequestStatus.length === 0)
    return { success: false, message: "Request not found" };

  const [result] = await connection.query(
    "UPDATE user_teams SET status = 'active', role = ? WHERE team_id = ? AND user_id = ?",
    ["viewer", teamId, userId]
  );

  if (result.affectedRows === 0)
    throw new Error("Request could not be accepted");

  return {
    success: true,
    message: "Request accepted successfully",
    data: result,
  };
};

export const rejectRequest = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("User and team id received in acceptRequest");

  const [userRequestStatus] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND user_id = ? AND status = ?",
    [teamId, userId, "pending"]
  );

  log("User request status", userRequestStatus);

  if (userRequestStatus.length === 0)
    return { success: false, message: "Request not found" };

  const [result] = await connection.query(
    "UPDATE user_teams SET status = 'rejected' WHERE team_id = ? AND user_id = ?",
    [teamId, userId]
  );

  if (result.affectedRows === 0) throw new Error("Failed to reject request");

  return {
    success: true,
    message: "Request rejected successfully",
    data: result,
  };
};

export const getJoinedTeams = async (userId) => {
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("User id is valid", userId);

  const [result] = await connection.query(
    `SELECT ut.*, t.name, t.description
    FROM user_teams ut
    JOIN teams t ON ut.team_id = t.id
    WHERE ut.user_id = ? AND ut.status = ? AND t.created_by != ?`,
    [userId, "active", userId]
  );

  if (result.length === 0)
    return { success: true, message: "No joined teams found", data: [] };

  return {
    success: true,
    message: "Joined teams found successfully",
    data: result,
  };
};

export const leaveTeam = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("User and team id received in leaveTeam");

  const [isOnTeam] = await connection.query(
    "SELECT * FROM user_teams WHERE team_id = ? AND user_id = ?",
    [teamId, userId]
  );

  log("Is user on team", isOnTeam);

  if (isOnTeam.length === 0)
    return { success: false, message: "User is not on the team" };

  const [result] = await connection.query(
    "DELETE FROM user_teams WHERE team_id = ? AND user_id = ?",
    [teamId, userId]
  );

  if (result.affectedRows === 0) throw new Error("Failed to leave team");

  return {
    success: true,
    message: "Left team successfully",
    data: result,
  };
};

export const connectTeam = async (teamId, userId) => {
  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  log("Team id is valid", teamId);
  log("User id is valid", userId);

  const [result] = await connection.query(
    `SELECT ut.*, t.name AS team_name
     FROM user_teams ut
     INNER JOIN teams t ON ut.team_id = t.id
     WHERE ut.team_id = ? AND ut.user_id = ? AND ut.status = ?`,
    [teamId, userId, "active"]
  );

  if (result.length === 0) throw new Error("Team not found");

  return {
    success: true,
    message: "Team found successfully",
    data: result,
  };
};
