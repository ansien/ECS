import WebSocket from 'ws';
import { ServerInstanceOptions } from './EdosServer';
import { IMessageHandler } from './MessageHandler';
import { inject as Inject } from 'inversify';
import { TYPES } from '../containerTypes';

export interface SocketClient extends WebSocket {
    id: number;
    authenticated: boolean;
    room: string | undefined;
    channels: number[];
}

export class WebSocketServer
{
    @Inject(TYPES.IMessageHandler) private _messageHandler!: IMessageHandler;

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
        this._wsServer.on('connection', (ws: SocketClient) => {
            ws.id = ++this._connectionCounter;
            ws.authenticated = false;
            ws.channels = [];

            ws.on('message', (message) => {
                this._messageHandler.handleMessage(ws, message);
            });
        });
    }
}