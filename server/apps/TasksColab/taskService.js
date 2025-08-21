import connection from "../../core/database/connection.js";
import isValid from "../../core/validation/tasks/validators.js";
import { buildTaskQuery } from "../tasks/service.js";

export const createTask = async (taskData) => {
  const { title, description, status, priority, due_date, teamId, userId } = taskData;

  if (!title?.trim()) throw new Error("Title is required and cannot be empty");
  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  const [result] = await connection.query(
    "INSERT INTO tasks (...) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, description, status, priority, due_date, teamId, userId]
  );

  const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
  return rows[0];
};


export const deleteTask = async (taskData) => {
  const { taskId, userId, teamId } = taskData;

  if (!taskId) throw new Error("Unauthorized: taskId missing");
  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  const [existing] = await connection.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ? AND team_id = ?",
    [taskId, userId, teamId]
  );

  if (existing.length === 0) throw new Error("Task not found or unauthorized");

  const [result] = await connection.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ? AND team_id = ?",
    [taskId, userId, teamId]
  );

  if (result.affectedRows === 0) throw new Error("Task could not be deleted");

  return existing[0];
};

export const updateTask = async (taskData) => {
  const { taskId, title, description, status, priority, due_date, teamId, userId } = taskData;

  if (!taskId) throw new Error("Unauthorized: taskId missing");
  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  const fields = [];
  const values = [];

  if (title) {
    fields.push("title = ?");
    values.push(title);
  }

  if (description) {
    fields.push("description = ?");
    values.push(description);
  }

  if (status) {
    fields.push("status = ?");
    values.push(status);
  }

  if (priority) {
    fields.push("priority = ?");
    values.push(priority);
  }

  if (due_date) {
    fields.push("due_date = ?");
    values.push(due_date);
  }

  if (fields.length === 0) throw new Error("No fields to update");

  const query = `
    UPDATE tasks
    SET ${fields.join(", ")}
    WHERE id = ? AND user_id = ? AND team_id = ?
  `;

  values.push(taskId, userId, teamId);

  const [result] = await connection.query(query, values);

  if (result.affectedRows === 0) throw new Error("Task could not be updated");

  const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [taskId]);
  return rows[0];
};

export const getTasks = async (filters) => {

  const { userId, teamId, status, priority, due_date, search } = filters;

  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  const isInvalidInformation = isValid({ status, priority, due_date })

  if (isInvalidInformation) throw new Error({
    errors: isInvalidInformation.errors,
    details: isInvalidInformation,
    code: "INVALID_INFORMATION"
  });

  const { query, params } = buildTaskQuery({ userId, teamId, status, priority, due_date, search });
  const [tasks] = await connection.query(query, params);
  if (tasks.length === 0) { return [] };

  return tasks

}
