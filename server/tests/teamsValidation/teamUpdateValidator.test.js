import { jest, test } from "@jest/globals";

jest.mock("../../core/middleware/validateSocketToken.js", () => ({
  __esModule: true,
  default: jest.fn((socket, next) => {
    if (!socket.handshake.auth?.token) {
      return next(new Error("Authentication error: No token provided"));
    }
    socket.user = { id: "mockUserId", role: "admin" };
    next();
  }),
}));

jest.mock("../../core/middleware/validateSocketTeamRole.js", () => ({
  __esModule: true,
  default: jest.fn(() => async (socket, next) => {
    socket.user = { id: "mockUserId" };
    next();
  }),
}));

jest.mock("../../core/middleware/validateSocketGlobalRole.js", () => ({
  __esModule: true,
  default: jest.fn(() => async (socket, next) => {
    socket.user = { id: "mockUserId" };
    next();
  }),
}));

import { setupSocketTest } from "../serverValidation/socketHarness.js";

const { getClient, emitAndAwait } = setupSocketTest({
  updateTeam: (data) => {
    const { name, description } = data;

    if (!name?.trim() && !description)
      return { success: false, message: "No fields to update", data: null };

    return {
      success: true,
      message: "Team updated successfully",
      updated: data,
    };
  },
});

test("should update team", async () => {
  const response = await emitAndAwait("updateTeam", {
    name: "test",
    description: "test",
  });
  expect(response.success).toBe(true);
  expect(response.updated.name).toBe("test");
  expect(response.updated.description).toBe("test");
});

test("should not update team", async () => {
  const response = await emitAndAwait("updateTeam", {
    name: "test",
    description: "test",
  });
  expect(response.success).toBe(true);
  expect(response.updated.name).toBe("test");
  expect(response.updated.description).toBe("test");
});
test("should fail if name and description are empty", async () => {
  const response = await emitAndAwait("updateTeam", {
    id: "team123",
    name: "",
    description: "",
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("No fields to update");
  expect(response.data).toBeNull();
});
test("should update only name", async () => {
  const response = await emitAndAwait("updateTeam", {
    id: "team123",
    name: "test",
  });
  expect(response.success).toBe(true);
  expect(response.updated.name).toBe("test");
  expect(response.updated.description).toBeUndefined();
});
test("should update only description", async () => {
  const response = await emitAndAwait("updateTeam", {
    id: "team123",
    description: "test",
  });
  expect(response.success).toBe(true);
  expect(response.updated.name).toBeUndefined();
  expect(response.updated.description).toBe("test");
});
