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
  createTeam: async (data) => {
    const { name, description, userId } = data;

    if (!userId)
      return {
        success: false,
        message: "Unauthorized: userId missing",
        data: null,
      };

    if (!name?.trim())
      return {
        success: false,
        message: "Name is required and cannot be empty",
        data: null,
      };

    const findUser = async (userId) => {
      const [user] = await db.query("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      return user;
    };

    const user = await findUser(userId);

    if (user.length === 0)
      return {
        success: false,
        message: "Unauthorized: User does not exist",
        data: null,
      };

    return {
      success: true,
      message: "Team created successfully",
      data: data,
    };
  },
});

test("Create team", async () => {
  const response = await emitAndAwait("createTeam", {
    name: "test",
    description: "test",
    userId: 1,
  });
  expect(response.success).toBe(true);
  expect(response.data.name).toBe("test");
  expect(response.data.description).toBe("test");
});

test("Can't create team without name", async () => {
  const response = await emitAndAwait("createTeam", {
    name: "",
    description: "test",
    userId: 1,
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("Name is required and cannot be empty");
  expect(response.data).toBeNull();
});

test("Can't create team without id", async () => {
  const response = await emitAndAwait("createTeam", {
    name: "test",
    description: "test",
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("Unauthorized: userId missing");
  expect(response.data).toBeNull();
});

test("Can't create team if user does not exist", async () => {
  const response = await emitAndAwait("createTeam", {
    name: "test",
    description: "test",
    userId: 455,
  });
  expect(response.success).toBe(false);
  expect(response.message).toBe("Unauthorized: User does not exist");
  expect(response.data).toBeNull();
});
