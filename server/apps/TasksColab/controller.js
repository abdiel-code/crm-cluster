import { createTask, getTasks, updateTask, deleteTask } from "./taskService.js";
import withGlobalRole from "../../core/middleware/withGlobalRole.js";
import withTeamRole from "../../core/middleware/withTeamRole.js";

const registerTaskEvents = (socket) => {
  socket.on("createTask", async (taskData, callback) => {
    console.log("backend receive taskData", taskData);

    if (!taskData || typeof taskData !== "object") {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA",
      });
      return;
    }

    withTeamRole(["admin", "editor"], taskData.team_id, socket, async () => {
      console.log("comes here if there is role and proceed to await handler");

      try {
        const task = await createTask(taskData);
        console.log("backend send task", task);

        callback(task);

        socket.emit("taskCreated", task);
        socket.to(task.team_id).emit("taskCreated", task);
      } catch (error) {
        socket.emit("taskError", {
          message: error.message,
          code: "CREATE_FAILED",
        });
      }
    });
  });

  socket.on("deleteTask", async (taskId, teamId, callback) => {
    console.log("delete task backend called with data", taskId, teamId);

    if (!taskId || !teamId) {
      socket.emit("taskError", {
        message: "Invalid task data",
        code: "INVALID_DATA",
      });
      return;
    }

    withTeamRole(["admin", "editor"], teamId, socket, async () => {
      console.log("comes here if there is role and proceed to await handler");

      try {
        const task = await deleteTask(taskId, teamId);
        console.log("task deleted", task);

        callback(task);

        socket.emit("taskDeleted", task);
        socket.to(task.team_id).emit("taskDeleted", task);
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
        console.log(
          "comes here if there is role and proceed to await handler updateTask"
        );

        const task = await updateTask(taskData);
        console.log("task updated", task);

        callback(task);

        socket.emit("taskUpdated", task);
        socket.to(task.team_id).emit("taskUpdated", task);
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

    console.log("filters", filters);

    withTeamRole(
      ["admin", "editor, viewer"],
      filters.teamId,
      socket,
      async () => {
        try {
          console.log(
            "comes here if there is role and proceed to await handler getTasks"
          );
          const tasks = await getTasks(filters);
          callback(tasks);

          socket.emit("tasks", tasks);
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
