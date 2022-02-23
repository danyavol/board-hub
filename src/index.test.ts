import { Server } from "http";
import { createSocketClient, startServer } from "./utils/websocket-test-utils";

const port = 4010;

describe("WebSocket Server", () => {
    let server: Server;

    beforeAll(async () => {
        server = await startServer(port);
    });

    afterAll(() => server.close());

    test("Create Socket Client", async () => {
        await createSocketClient(port);
    });
})