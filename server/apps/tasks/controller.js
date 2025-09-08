import connection from "../../core/database/connection.js";
import { buildTaskQuery } from "./service.js";
import isValid from "../../core/validation/tasks/validators.js";

const acceptedStatus = ["pending", "in_progress", "completed", "cancelled"];
const acceptedPriority = ["low", "medium", "high", "urgent"];

// Get all tasks
export const getTasks = async (req, res) => {
  const userId = req.params.userId;
  const { status, priority, dueDate, search } = req.query;

  console.log("processing data to mysql on getTasks", req.query);

  const isInvalidInformation = isValid({ status, priority, dueDate });

  if (isInvalidInformation) return res.status(400).json(isInvalidInformation);

  try {
    if (!userId)
      return res.status(400).json({ message: "User id is required" });

    const { query, params } = buildTaskQuery({
      userId,
      status,
      priority,
      dueDate,
      search,
    });

    const [tasks] = await connection.query(query, params);
    if (tasks.length === 0) {
      return res.status(200).json({ message: "Tasks not found" });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Temporary server error, please try again" });
  }
};

// Create task
export const createTask = async (req, res) => {
  const userId = req.params.userId;
  const { title, description, status, priority, due_date } = req.body;
  const isInvalidInformation = isValid(
    { status, priority, due_date, title },
    { requiredTitle: true }
  );

  if (isInvalidInformation) return res.status(400).json(isInvalidInformation);

  try {
    const [result] = await connection.query(
      "INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)",
      [
        userId,
        title,
        description || null,
        status || "pending",
        priority || "low",
        due_date || null,
      ]
    );

    return res
      .status(200)
      .json({ message: "Task created successfully", taskId: result.insertId });
  } catch (error) {
    console.log(error);
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while creating task, please try again" });
  }
};

// Update task

export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;

  const { title, description, status, priority, due_date } = req.body;
  let query = "UPDATE tasks SET title = ?, description = ?";
  const params = [title, description];

  try {
    if (!taskId)
      return res.status(400).json({ message: "Task id is required" });
    if (!userId)
      return res.status(400).json({ message: "User id is required" });

    if (!title || title.trim() === "")
      return res.status(400).json({ message: "Title is required" });

    if (status) {
      if (!acceptedStatus.includes(status))
        return res.status(400).json({ message: "Invalid status" });
      query += ", status = ?";
      params.push(status);
    }

    if (priority) {
      if (!acceptedPriority.includes(priority))
        return res.status(400).json({ message: "Invalid priority" });
      query += ", priority = ?";
      params.push(priority);
    }

    if (due_date) {
      if (isNaN(Date.parse(due_date)))
        return res.status(400).json({ message: "Invalid due date" });
      query += ", due_date = ?";
      params.push(due_date);
    }

    query += " WHERE id = ? AND user_id = ?";
    params.push(taskId, userId);

    const [result] = await connection.query(query, params);

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({
          message: "Task not found or you don't have permission to update it",
        });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating task, please try again" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;

  try {
    const [result] = await connection.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({
          message: "Task not found or you don't have permission to delete it",
        });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while deleting task, please try again" });
  }
};
