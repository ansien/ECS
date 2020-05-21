import { ActionHandler } from '../../../../src/server/ActionHandler';
import WebSocket from 'ws';
import { SocketClient } from '../../../../src/server/WebSocketServer';

export class ConnectActionHandler extends ActionHandler
{
    constructor() {
        super(1);
    }

    handle(connection: SocketClient, message: WebSocket.Data): void {
        connection.authenticated = true;
    }
}