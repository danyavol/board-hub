import { MessageService } from "@services/message.service";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { controllersList } from "src/controllers/controllers";

export function createWebSocketSever(server: HttpServer): void {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log('a user connected');

        socket.on('message', (message: string) => {
            const parsedMessage = MessageService.parseMessage(message);
            if (!parsedMessage) return;
            const controller = controllersList[parsedMessage.controller];
            if (!controller) return;

            controller({
                server: io,
                socket: socket,
                message: parsedMessage
            });
        });
    });
    
}