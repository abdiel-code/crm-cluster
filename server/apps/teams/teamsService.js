import connection from "../../core/database/connection.js";

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
        status: "active"
      }
    }

  } catch (error) {
    await connection.rollback();
    throw error;
  }

}

export const getMyTeams = async (userId) => {

  if (!userId) throw new Error("Unauthorized: userId missing");

  try {

    const [result] = await connection.query("SELECT * FROM teams WHERE created_by = ?", [userId]);

    if (result.length === 0) return { found: false, teams: null };

    return {
      success: true,
      message: "Teams found successfully",
      data: result
    }

  } catch (error) {

    throw error
  }
}

export const deleteTeam = async (teamId, userId) => {

  console.log("deleteTeam teamId", teamId)
  console.log("deleteTeam userId", userId)

  if (!teamId) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  const [findTeam] = await connection.query("SELECT * FROM teams WHERE created_by = ?", [userId]);

  console.log("findTeams where created_by", findTeam)

  if (findTeam.length === 0) throw new Error("Team not found or unauthorized");

  console.log("find team success")

  const [result] = await connection.query("DELETE FROM teams WHERE id = ? AND created_by = ?", [teamId, userId]);

  console.log("deleteTeam result", result)

  if (result.affectedRows === 0) throw new Error("Team could not be deleted");

  console.log("deleteTeam success")

  return { success: true, message: "Team deleted successfully", data: result };
}

export const updateTeam = async (teamData) => {
  const { id, name, description, userId } = teamData;

  if (!id) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  const [result] = await connection.query("UPDATE teams SET name = ?, description = ? WHERE id = ? AND created_by = ?",
    [name, description, id, userId]);

  if (result.affectedRows === 0) throw new Error("Team could not be updated");

  return { updated: true, teamId: id };
}

export const getTeam = async (teamData) => {

  const { id, userId } = teamData;

  if (!id || !userId) throw new Error("Missing team id or userId");

  const [result] = await connection.query("SELECT * FROM teams WHERE id = ?", [id]);

  if (result.length === 0) return { found: false, team: null };

  return { found: true, team: result[0] }
}

export const getTeamUsers = async (teamData) => {
  const { id } = teamData;

  if (!id) throw new Error("Team id is required");

  const [result] = await connection.query("SELECT * FROM user_teams WHERE team_id = ?", [id]);

  if (result.length === 0) return { found: false, users: null };

  return { found: true, users: result }
}

export const deleteTeamUser = async (teamData) => {
  const { id, userId } = teamData;

  if (!id) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  const [result] = await connection.query("DELETE FROM user_teams WHERE team_id = ? AND user_id = ?", [id, userId]);

  if (result.affectedRows === 0) throw new Error("Team user could not be deleted");

  return { deleted: true, teamId: id };
}

export const updateTeamUser = async (teamData) => {
  const { id, userId, role, status } = teamData;

  if (!id) throw new Error("Team id is required");
  if (!userId) throw new Error("Unauthorized: userId missing");

  const updates = [];
  const params = [];

  if (role) {
    updates.push("role = ?");
    params.push(role);
  }
  if (status) {
    updates.push("status = ?");
    params.push(status);
  }

  if (updates.length === 0) throw new Error("No fields to update");

  const query = `UPDATE user_teams SET ${updates.join(", ")} WHERE team_id = ? AND user_id = ?`;
  params.push(id, userId);

  const [result] = await connection.query(query, params);

  if (result.affectedRows === 0) throw new Error("Team user could not be updated");

  return { updated: true, userId };
};
