import { createServer } from "http";
import { Server } from "socket.io";
import ioClient from "socket.io-client";
import app from "../../app.js";

export function setupSocketTest(eventHandlers = {}) {
  let ioServer, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer(app);
    ioServer = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = ioClient(`http://localhost:${port}`, {
        auth: { token: "mockToken123" },
      });
      ioServer.on("connection", (socket) => {
        for (const [event, handler] of Object.entries(eventHandlers)) {
          socket.on(event, async (data) => {
            try {
              const response = await handler(data);
              socket.emit(`${event}Response`, response);
            } catch (error) {
              socket.emit(`${event}Response`, {
                success: false,
                message: error.message || "Something went wrong",
                data: null,
              });
            }
          });
        }
      });
      clientSocket.on("connect", () => {
        done();
      });
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.close();
  });

  return {
    getClient: () => clientSocket,
    emitAndAwait: (event, data) =>
      new Promise((resolve, reject) => {
        clientSocket.once(`${event}Response`, resolve);
        clientSocket.emit(event, data);
      }),
  };
}
