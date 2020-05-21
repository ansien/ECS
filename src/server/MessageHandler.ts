import WebSocket from 'ws';
import { ActionMessage, MESSAGE_TYPE, MessageBase } from '../common/MessageSerializer';
import { SocketClient } from './WebSocketServer';
import { ActionHandlerRegistry } from './registry/ActionHandlerRegistry';

export class MessageHandler
{
    private _actionHandlerRegistry: ActionHandlerRegistry;

    constructor(actionHandlerRegistry: ActionHandlerRegistry) {
        this._actionHandlerRegistry = actionHandlerRegistry
    }

    public handleMessage(client: SocketClient, message: WebSocket.Data): void {
        if (typeof message !== 'string') {
            return;
        }

        let parsedMessage: MessageBase;

        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            console.log('Failed to parse message JSON:', e);
            return;
        }

        const messageType = parsedMessage[0];

        switch(messageType) {
            case MESSAGE_TYPE.ACTION:
                this.handleActionMessage(client, parsedMessage as ActionMessage);
                break;
            default:
                return;
        }
    }

    public handleActionMessage(client: SocketClient, actionMessage: ActionMessage): void {
        console.debug('@handleAction:', actionMessage);

        const actionHandler = this._actionHandlerRegistry.actionHandlers.get(actionMessage[1]);
        if (!actionHandler) return;

        actionHandler.handle(client, actionMessage);
    }
}
