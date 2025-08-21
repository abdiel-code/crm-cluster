import io from "socket.io-client";

describe("Socket connected test", () => {
  let socket;

  beforeAll(() => {
    socket = io("http://localhost:3030", {
      reconnection: false,
      timeout: 5000,
    });
  });

  afterAll(() => {
    if (socket.connected) socket.disconnect();
  });

  test("should connect to the server", (done) => {
    socket.on("connect", () => {
      expect(socket.connected).toBe(true);
      expect(socket.id).toBeDefined();
      done();
    });
    socket.on("connect_error", (err) => {
      done(err);
    });

  });

});
