import { log } from "../../logWrapper.js";

export function buildTaskQuery({
  userId,
  teamId,
  status,
  priority,
  dueDate,
  search,
  requiredTeamId = false,
}) {
  log("team id", teamId);
  log("required team id", requiredTeamId);

  log("team id is valid", teamId);
  log("user id is valid", userId);

  if (!userId) throw new Error("Unauthorized: userId missing");

  log("User id is valid");

  if (requiredTeamId && !teamId)
    throw new Error("Unauthorized: teamId missing");

  log("Team id is valid");

  log("build id, teamid, status, priority, duedate, search", userId);

  let query = "";
  const params = [];

  if (requiredTeamId) {
    query = "SELECT * FROM tasks WHERE team_id = ?";
    params.push(teamId);
  } else {
    query = "SELECT * FROM tasks WHERE user_id = ?";
    params.push(userId);
  }

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (priority) {
    query += " AND priority = ?";
    params.push(priority);
  }

  if (dueDate) {
    query += " AND DATE(due_date) = ?";
    params.push(dueDate);
  }

  if (search) {
    query += " AND (title LIKE ? OR description LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  log("query", query);
  log("params", params);

  if (!requiredTeamId) {
    query += "AND team_id IS NULL";
  }

  return { query, params };
}
