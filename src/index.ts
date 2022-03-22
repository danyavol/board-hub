import { createServer } from "http";
import { Server } from "socket.io";
import { initLobby } from "./features/lobby/lobby";

const PORT = 4000;

const httpServer = createServer();
const socketServer = new Server(httpServer, {
    cors: { origin: "*" },
    
});

initLobby(socketServer);

httpServer.listen(PORT);
console.log(`Listening at ws://localhost:${PORT}`)
