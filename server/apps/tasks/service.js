export function buildTaskQuery({
  userId,
  teamId,
  status,
  priority,
  dueDate,
  search,
  requiredTeamId = false,
}) {
  console.log("team id", teamId);
  console.log("required team id", requiredTeamId);

  console.log("team id is valid", teamId);
  console.log("user id is valid", userId);

  if (!userId) throw new Error("Unauthorized: userId missing");

  console.log("User id is valid");

  if (requiredTeamId && !teamId)
    throw new Error("Unauthorized: teamId missing");

  console.log("Team id is valid");

  console.log("build id, teamid, status, priority, duedate, search", userId);

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

  console.log("query", query);
  console.log("params", params);

  if (!requiredTeamId) {
    query += "AND team_id IS NULL";
  }

  return { query, params };
}
