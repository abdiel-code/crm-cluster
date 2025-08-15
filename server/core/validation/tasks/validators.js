
const acceptedStatus = ["pending", "in_progress", "completed", "cancelled"]
const acceptedPriority = ["low", "medium", "high", "urgent"]

const isValid = ({ status, priority, dueDate, title }, { requiredTitle = false } = {}) => {

  const errors = []

  if (status && !acceptedStatus.includes(status)) errors.push("Invalid status")
  if (priority && !acceptedPriority.includes(priority)) errors.push("Invalid priority")
  if (dueDate && isNaN(Date.parse(dueDate))) errors.push("Invalid due date")
  if (requiredTitle && (!title || title.trim() === "")) errors.push("Title is required")

  return errors.length > 0 ? { errors } : false
}

export default isValid
