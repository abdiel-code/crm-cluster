import connection from "../../core/database/connection.js"

// Get all tasks
export const getTasks = async (req, res) => {
  const userId = req.params.userId

  try {
    if (!userId) res.status(400).json({ message: "User id is required" })

    const [tasks] = await connection.query("SELECT * FROM tasks WHERE user_id = ?", [userId])

    if (tasks.length === 0) res.status(200).json({ message: "You have no tasks" })


    return res.status(200).json(tasks)


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Temporary server error, please try again" });
  }
}

// Create task
export const createTask = async (req, res) => {
  const userId = req.params.userId
  const { title, description, status, priority, due_date } = req.body

  if (!title) res.status(400).json({ message: "Title is required" })

  try {

    const [result] = await connection.query(
      "INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, title, description || null, status || "pending", priority || "low", due_date || null]
    );

    return res.status(200).json({ message: "Task created successfully", taskId: result.insertId });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating task, please try again" });
  }
}

// Update task

export const updateTaks = async (req, res) => {
  const taskId = req.params.taskId
  const userId = req.params.userId
  const { title, description, status, priority, due_date } = req.body

  try {
    const [result] = await connection.query(
      "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ? AND user_id = ?",
      [title, description, status, priority, due_date, taskId, userId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found or you don't have permission to update it" })

    return res.status(200).json({ message: "Task updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating task, please try again" });
  }
}

// Delete task
export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId
  const userId = req.params.userId

  try {
    const [result] = await connection.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found or you don't have permission to delete it" })

    return res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting task, please try again" });
  }
}

