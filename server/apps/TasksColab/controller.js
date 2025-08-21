import validateSocketRole from "../../core/middleware/validateSocketRole";
import { createTask, deleteTask, updateTask } from "./taskService";
import withRole from "./withRole";

const registerTaskEvents = (socket) => {
  socket.on("createTask", async (taskData) => {

    if (!taskData || typeof taskData !== "object") {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA"
      });
      return;
    }

    withRole(["admin", "editor"], socket, async () => {
      try {
        const task = await createTask(taskData);
        socket.emit("taskCreated", task);

        socket.to(task.team_id).emit("taskCreated", task);
      } catch (error) {
        socket.emit("taskError", {
          message: error.message,
          code: "CREATE_FAILED"
        })

      }

    })

  })

  socket.on("deleteTask", async (taskData) => {
    if (!taskData || typeof taskData !== "object") {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA"
      });
      return;
    }
    withRole(["admin", "editor"], socket, async () => {
      try {
        const task = await deleteTask(taskData);
        socket.emit("taskDeleted", task);

        socket.to(task.team_id).emit("taskDeleted", task);
      } catch (error) {
        socket.emit("taskError", {
          message: error.message,
          code: "DELETE_FAILED"
        })
      }

    })

  })

  socket.on("updateTask", async (taskData) => {
    if (!taskData || typeof taskData !== "object") {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA"
      });
      return;
    }
    withRole(["admin", "editor"], socket, async () => {

      try {
        const task = await updateTask(taskData);
        socket.emit("taskUpdated", task);

        socket.to(task.team_id).emit("taskUpdated", task);
      } catch (error) {
        socket.emit("taskError", {
          message: error.message,
          code: "UPDATE_FAILED"
        })
      }
    })
  })

  socket.on("getTasks", async (filters) => {
    if (!filters || typeof filters !== "object") {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA"
      });
      return;
    }
    try {
      const tasks = await getTasks(filters);
      socket.emit("tasks", tasks);
    } catch (error) {
      socket.emit("taskError", {
        message: error.message,
        details: error.details,
        code: "GET_FAILED"
      })
    }
  })

}

export default registerTaskEvents
