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
router.get("/:userId/tasks", validateRole("agent"), getTasks)
router.post("/:userId/tasks", validateRole("agent"), createTask)
router.put("/:userId/tasks/:taskId", validateRole("agent"), updateTask)
router.delete("/:userId/tasks/:taskId", validateRole("admin"), deleteTask)

export default router
