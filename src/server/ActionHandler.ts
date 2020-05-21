import { SocketClient } from './WebSocketServer';
import WebSocket from 'ws';

export abstract class ActionHandler
{
    private readonly _actionId: number;

    protected constructor(actionId: number) {
        this._actionId = actionId;
    }

    abstract handle(connection: SocketClient, message: WebSocket.Data): void;

    get actionId(): number {
        return this._actionId;
    }
}
