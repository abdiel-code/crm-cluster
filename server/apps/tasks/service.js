export function buildTaskQuery({ userId, status, priority, dueDate, search }) {
  let query = "SELECT * FROM tasks WHERE user_id = ?";
  const params = [userId];

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

  return { query, params };
}
