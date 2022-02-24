import { createServer } from "http";
import { createWebSocketSever } from "./utils/websocket-server";

const server = createServer();

createWebSocketSever(server);

server.listen(4000);
