import { Server, Socket } from "socket.io";
import { Controllers } from "src/controllers/controllers";

export interface Message<T = any> {
    controller: Controllers
    action: string,
    data: T
}

export interface ControllerParams {
    server: Server;
    socket: Socket;
    message: Message;
}

export type Controller = (params: ControllerParams) => void;
