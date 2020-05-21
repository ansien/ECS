import { SocketClient } from './WebSocketServer';
import { ActionMessage } from '../common/MessageSerializer';

export abstract class ActionHandler
{
    private readonly _actionId: number;

    protected constructor(actionId: number) {
        this._actionId = actionId;
    }

    abstract handle(client: SocketClient, message: ActionMessage): void;

    get actionId(): number {
        return this._actionId;
    }
}
