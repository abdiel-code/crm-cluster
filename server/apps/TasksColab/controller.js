import { createTask, getTasks, updateTask, deleteTask } from "./taskService.js";
import withGlobalRole from "../../core/middleware/withGlobalRole.js";
import withTeamRole from "../../core/middleware/withTeamRole.js";
import { log } from "../../logWrapper.js";
const registerTaskEvents = (socket) => {
  socket.on("createTask", async (taskData, callback) => {
    log("backend receive taskData", taskData);

    if (!taskData || typeof taskData !== "object") {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA",
      });
      return;
    }

    withTeamRole(["admin", "editor"], taskData.team_id, socket, async () => {
      log("comes here if there is role and proceed to await handler");

      try {
        const task = await createTask(taskData);
        log("backend send task", task);

        callback(task);

        socket.to(task.data.team_id).emit("taskCreated", task.data);
        socket.emit("taskCreated", task.data);
        log("emitting message", task.message);
        socket.emit("barSignal", {
          message: task.message,
          duration: 3000,
        });
      } catch (error) {
        callback({
          success: false,
          error: error.message,
        });
        socket.emit("taskError", {
          message: error.message,
          code: "CREATE_FAILED",
        });
      }
    });
  });

  socket.on("deleteTask", async (taskId, teamId, callback) => {
    log("delete task backend called with data", taskId, teamId);

    if (!taskId || !teamId) {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA",
      });
      return;
    }

    withTeamRole(["admin", "editor"], teamId, socket, async () => {
      log("comes here if there is role and proceed to await handler");

      try {
        const result = await deleteTask(taskId, teamId);
        log("task deleted", result);

        callback(result);

        log("taskId", taskId);

        socket.to(teamId).emit("taskDeleted", taskId);
        socket.emit("taskDeleted", taskId);
        socket.emit("barSignal", {
          message: result.message,
          duration: 3000,
        });
      } catch (error) {
        socket.emit("taskError", {
          success: false,
          message: error.message,
          code: "DELETE_FAILED",
        });
      }
    });
  });

  socket.on("updateTask", async (taskData, callback) => {
    if (!taskData || typeof taskData !== "object") {
      socket.emit("taskError", {
        success: false,
        message: "Invalid task data",
        code: "INVALID_DATA",
      });
      return;
    }

    withTeamRole(["admin", "editor"], taskData.team_id, socket, async () => {
      try {
        log(
          "comes here if there is role and proceed to await handler updateTask"
        );

        const task = await updateTask(taskData);
        log("task updated", task);

        callback(task);

        socket.to(task.data.team_id).emit("taskUpdated", task.data);
        socket.emit("taskUpdated", task.data);
        socket.emit("barSignal", {
          message: task.message,
          duration: 3000,
        });
      } catch (error) {
        socket.emit("taskError", {
          success: false,
          message: error.message,
          code: "UPDATE_FAILED",
        });
      }
    });
  });

  socket.on("getTasks", async (filters, callback) => {
    if (!filters || typeof filters !== "object") {
      socket.emit("taskError", {
        success: false,
        message: "Invalid task data",
        code: "INVALID_DATA",
      });
      return;
    }

    log("filters", filters);

    log("socket for get tasks", socket);

    withTeamRole(
      ["admin", "editor", "viewer"],
      filters.teamId,
      socket,
      async () => {
        try {
          log(
            "comes here if there is role and proceed to await handler getTasks"
          );
          const tasks = await getTasks(filters);
          callback(tasks);

          socket.emit("tasks", tasks);
          log("filters.teamId", filters.teamId);
          socket.to(filters.teamId).emit("tasks", tasks);
        } catch (error) {
          socket.emit("taskError", {
            success: false,
            message: error.message,
            code: "GET_FAILED",
          });
        }
      }
    );
  });
};

export default registerTaskEvents;
