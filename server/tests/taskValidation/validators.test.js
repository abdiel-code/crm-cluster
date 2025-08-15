import isValid from "../../core/validation/tasks/validators.js";

describe("isValid", () => {
  test("returns false when all inputs are valid", () => {
    const result = isValid({
      status: "pending",
      priority: "medium",
      dueDate: "2022-01-01",
      title: "Test task",
    }, { requiredTitle: true });

    expect(result).toBe(false);
  });
});

test("returns error for invalid status", () => {
  const result = isValid({ status: "unknown" });
  expect(result.errors).toContain("Invalid status");
})

test("returns error for invalid priority", () => {
  const result = isValid({ priority: "extreme" });
  expect(result.errors).toContain("Invalid priority");
})

test("returns error for invalid due date", () => {
  const result = isValid({ dueDate: "invalid-date" });
  expect(result.errors).toContain("Invalid due date");
})

test("returns error for empty title", () => {
  const result = isValid({ title: "" }, { requiredTitle: true });
  expect(result.errors).toContain("Title is required");
})

test("returns multiple errors", () => {
  const result = isValid({
    status: "unknown",
    priority: "extreme",
    dueDate: "invalid-date",
    title: "",
  }, { requiredTitle: true });
  expect(result.errors).toEqual([
    "Invalid status",
    "Invalid priority",
    "Invalid due date",
    "Title is required"
  ])
})
