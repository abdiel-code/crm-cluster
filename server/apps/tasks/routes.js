import express from "express"
import validateRole from "../../core/middleware/validateRole.js"
import validateToken from "../../core/middleware/validateToken.js"

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./controller.js"

const router = express.Router()

router.use(validateToken)
router.get("/users/:userId/tasks", validateRole("user"), getTasks)
router.post("/users/:userId/tasks", validateRole("user"), createTask)
router.put("/users/:userId/tasks/:taskId", validateRole("user"), updateTask)
router.delete("/users/:userId/tasks/:taskId", validateRole("admin"), deleteTask)

export default router
