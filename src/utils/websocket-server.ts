import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { controllersList } from "src/controllers/controllers";
import { Message } from "src/interfaces/core.interface";

export function createWebSocketSever(server: HttpServer): void {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log('a user connected');

        socket.on('message', (message: Message) => {
            const controller = controllersList[message?.controller];
            if (!controller) return;

            controller({
                server: io,
                socket: socket,
                message
            });
        });

        socket.on("disconnect", () => {
            console.log('user disconnected');
          });
    });

}