import { Namespace, Socket } from "socket.io";
import { CommonOutputEvent } from "src/common.events";
import { usersStore } from "src/stores/users.store";
import { OutputEvent } from "./lobby.events";

const mainLobby = 'main lobby';
const users: { id: string, name: string }[] = [];

export class LobbyService {

    constructor(
        private socket: Socket,
        private namespace: Namespace
    ) {}

    public userLogIn(username: string): void {
        try {
            const newUser = usersStore.createUser(username);

            this.socket.join(mainLobby);
            this.socket.send('You have joined the room');

            this.namespace.to(mainLobby).emit(OutputEvent.UserJoined, newUser);
        } catch (e) {
            if (e instanceof Error) {
                this.socket.emit(CommonOutputEvent.Message, e.message);
            }
            return;
        }
    }

    public userDisconnected(): void {
        console.log(`User ${this.socket.id} disconnected`);
            
        const index = users.findIndex(u => u.id === this.socket.id);
        if (index >= 0) {
            this.namespace.to(mainLobby).emit(OutputEvent.UserLeft, users[index]);
            users.splice(index);
        }
    }
}