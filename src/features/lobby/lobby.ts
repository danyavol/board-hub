import { Server } from "socket.io";

const mainLobby = 'main lobby';
const users: { id: string, name: string }[] = [];

export function initLobby(server: Server): void {
    const lobby = server.of('lobby');

    lobby.on("connection", (socket) => {
        console.log(`User ${socket.id} connected`);

        socket.on('log in', (nickname: string) => {
            if (users.find(u => u.id === socket.id)) {
                socket.send('You already logged in');
                return;
            }
            
            if (!nickname.match(/^(\w|\d){2,30}$/)) {
                socket.send('Your nickname does not match requirements');
                return;
            }

            if (users.find(u => u.name === nickname)) {
                socket.send('User with such name already exist');
                return;
            }

            const newUser = { id: socket.id, name: nickname };
            users.push(newUser);
                
            socket.join(mainLobby);
            socket.send('You have joined the room');

            lobby.to(mainLobby).emit('user joined', newUser);
        });


        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected`);
            
            const index = users.findIndex(u => u.id === socket.id);
            if (index >= 0) {
                lobby.to(mainLobby).emit('user left', users[index]);
                users.splice(index);
            }
        });
    });

}