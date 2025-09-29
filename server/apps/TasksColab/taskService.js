import connection from "../../core/database/connection.js";
import isValid from "../../core/validation/tasks/validators.js";
import { buildTaskQuery } from "../tasks/service.js";
import { log } from "../../logWrapper.js";

export const createTask = async (taskData) => {
  log("processing data to mysql", taskData);

  const {
    title,
    description,
    status,
    priority,
    due_date,
    user_id: userId,
    team_id: teamId,
  } = taskData;

  if (!title?.trim()) throw new Error("Title is required and cannot be empty");
  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  const [result] = await connection.query(
    "INSERT INTO tasks (title, description, status, priority, due_date, user_id, team_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, description, status, priority, due_date, userId, teamId]
  );

  if (result.affectedRows === 0) throw new Error("Task could not be created");

  return {
    success: true,
    message: "Task created successfully",
    data: {
      id: result.insertId,
      title,
      description,
      status,
      priority,
      due_date,
      user_id: userId,
      team_id: teamId,
    },
  };
};

export const deleteTask = async (taskId, teamId) => {
  if (!taskId) throw new Error("Unauthorized: taskId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  log("taskId and teamId is valid");

  const [existing] = await connection.query(
    "SELECT * FROM tasks WHERE id = ? AND team_id = ?",
    [taskId, teamId]
  );

  if (existing.length === 0) throw new Error("Task not found or unauthorized");

  const [result] = await connection.query(
    "DELETE FROM tasks WHERE id = ? AND team_id = ?",
    [taskId, teamId]
  );

  if (result.affectedRows === 0) throw new Error("Task could not be deleted");

  return {
    success: true,
    message: "Task deleted successfully",
    data: result,
  };
};

export const updateTask = async (taskData) => {
  const {
    id: taskId,
    user_id: userId,
    title,
    description,
    status,
    priority,
    due_date,
    team_id: teamId,
  } = taskData;

  log("processing data to mysql", taskData);

  log("Task id", taskId);
  log("User id", userId);
  log("Team id", teamId);

  if (!taskId) throw new Error("Unauthorized: taskId missing");
  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  log("valid data");

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

  const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [
    taskId,
  ]);

  return {
    success: true,
    message: "Task updated successfully",
    data: rows[0],
  };
};

export const getTasks = async (filters) => {
  log("processing data to mysql on getTasks", filters);

  const { status, priority, due_date, search, userId, teamId } = filters;

  if (!userId) throw new Error("Unauthorized: userId missing");
  if (!teamId) throw new Error("Unauthorized: teamId missing");

  const isInvalidInformation = isValid({ status, priority, due_date });

  if (isInvalidInformation)
    throw new Error({
      errors: isInvalidInformation.errors,
      details: isInvalidInformation,
      code: "INVALID_INFORMATION",
    });

  log("information is valid");

  const { query, params } = buildTaskQuery({
    userId,
    teamId,
    status,
    priority,
    due_date,
    search,
    requiredTeamId: true,
  });

  const [tasks] = await connection.query(query, params);

  log("tasks founded", tasks);

  if (tasks.length === 0) {
    return {
      success: true,
      message: "Tasks not found",
      data: [],
    };
  }

  return {
    success: true,
    message: "Tasks found successfully",
    data: tasks,
  };
};
