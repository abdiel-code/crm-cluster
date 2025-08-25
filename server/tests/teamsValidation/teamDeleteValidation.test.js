import db from "../../core/database/connection.js";
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
  deleteTeam: async (data) => {
    const { teamId, userId } = data;

    if (!data || Object.keys(data).length === 0) {
      return { success: false, message: "Data is required", data: null };
    }

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized: userId missing",
        data: null,
      };
    }

    if (!teamId) {
      return { success: false, message: "Team id is required", data: null };
    }

    const [findTeam] = await db.query(
      "SELECT * FROM teams WHERE id = ? AND created_by = ?",
      [teamId, userId]
    );

    if (findTeam.length === 0) {
      return { success: false, message: "Team not found", data: null };
    }

    return { success: true, message: "Team deleted", data: findTeam[0] };
  },
});

test("Delete team", async () => {
  const response = await emitAndAwait("deleteTeam", {
    teamId: 33,
    userId: 7,
  });
  expect(response.success).toBe(true);
  expect(response.message).toBe("Team deleted");
});

test("Can't delete team without id", async () => {
  const response = await emitAndAwait("deleteTeam", {
    teamId: "",
    userId: 7,
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("Team id is required");
  expect(response.data).toBeNull();
});

test("Can't delete team without user id", async () => {
  const response = await emitAndAwait("deleteTeam", {
    teamId: 33,
    userId: "",
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("Unauthorized: userId missing");
  expect(response.data).toBeNull();
});

test("Can't delete without data", async () => {
  const response = await emitAndAwait("deleteTeam", {});
  expect(response.success).toBe(false);
  expect(response.message).toBe("Data is required");
  expect(response.data).toBeNull();
});

test("Can't delete team because team doesn't exist", async () => {
  const response = await emitAndAwait("deleteTeam", {
    teamId: 7,
    userId: 33,
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("Team not found");
  expect(response.data).toBeNull();
});
