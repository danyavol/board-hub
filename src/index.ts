import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log('a user connected');
});

server.listen(4000);
