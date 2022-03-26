import { Server } from "socket.io";
import { CommonInputEvent } from "src/common.events";
import { InputEvent } from "./lobby.events";
import { LobbyService } from "./lobby.service";

export function initLobby(namespace: string, server: Server): void {
    const lobby = server.of(namespace);

    lobby.on(CommonInputEvent.Connect, (socket) => {
        const service = new LobbyService(socket, lobby);

        socket.on(CommonInputEvent.Disconnect, service.userDisconnected);
        socket.on(InputEvent.LogIn, service.userLogIn);
    });
}