import WebSocket from 'ws';
import { ServerInstanceOptions } from './ServerInstance';
import { MessageHandler } from './MessageHandler';

export interface SocketClient extends WebSocket {
    id: number;
    authenticated: boolean;
    room: number;
    channels: number[];
}

export class WebSocketServer
{
    private _wsServer: WebSocket.Server;
    private _connectionCounter = 0;

    private _messageHandler: MessageHandler;

    constructor(options: ServerInstanceOptions, messageHandler: MessageHandler) {
        this._messageHandler = messageHandler

        const port = options.port ?? 3000;

        this._wsServer = new WebSocket.Server({
            port,
            maxPayload: 10 * 1024 * 1024,
        });

        console.log('WS Server running on port:', port);

        this.bindWsEvents();
    }

    private bindWsEvents(): void {
        this._wsServer.on('connection', (ws: SocketClient) => {
            ws.id = ++this._connectionCounter;
            ws.authenticated = false;
            ws.room = -1;
            ws.channels = [];

            console.debug('@connection:', ws);

            ws.on('message', (message) => {
                console.debug('@message:', message);
                this._messageHandler.handleMessage(ws, message);
            });
        });
    }
}