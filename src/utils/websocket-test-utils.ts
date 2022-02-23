import { Server, createServer } from "http";
import { createWebSocketSever } from "./websocket-server";
import { io, Socket } from "socket.io-client";

export function startServer(port: number): Promise<Server> {
    return new Promise((resolve) => {
        const server = createServer();
        createWebSocketSever(server);
        server.listen(port, () => resolve(server));
    });
}

export function createSocketClient(port: number): Promise<Socket> {
    return new Promise((resolve) => {
        const socket = io(`ws://localhost:${port}`);
        socket.on('connect', () => resolve(socket));
    });
}