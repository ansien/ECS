import WebSocket from 'ws';
import { MessageHandler } from './MessageHandler';
import { ServerInstanceOptions } from './ServerInstance';

export interface WebSocketConnection extends WebSocket {
    id: number;
    authenticated: boolean;
}

export class WebSocketServer
{
    private _wsServer: WebSocket.Server;
    private _connectionCounter = 0;

    constructor(options: ServerInstanceOptions) {
        const port = options.port ?? 3000;

        this._wsServer = new WebSocket.Server({
            port,
            maxPayload: 10 * 1024 * 1024,
        });

        console.log('WS Server running on port:', port);

        this.bindWsEvents();
    }

    private bindWsEvents(): void {
        this._wsServer.on('connection', (ws: WebSocketConnection) => {
            ws.id = ++this._connectionCounter;
            ws.authenticated = false;

            ws.on('message', (message) => {
                MessageHandler.handleMessage(ws, message);
            });
        });
    }
}