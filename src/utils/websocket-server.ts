import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export function createWebSocketSever(server: HttpServer): void {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log('a user connected');
    });
    
}