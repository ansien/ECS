import WebSocket from 'ws';
import { SocketClient } from './WebSocketServer';
import { ActionMessage, ActionMessageEnvelope, MESSAGE_TYPE, MessageEnvelope } from '../../common/types';
import { IPublicRegistry } from './registry/PublicRegistry';
import { inject as Inject } from 'inversify';
import { TYPES } from '../containerTypes';

export interface IMessageHandler {
    handleMessage(client: SocketClient, message: WebSocket.Data): void;
    handleActionMessage(client: SocketClient, actionMessageEnvelope: ActionMessageEnvelope): void;
}

export class MessageHandler implements IMessageHandler
{
    @Inject(TYPES.IPublicRegistry) private _publicRegistry!: IPublicRegistry;

    public handleMessage(client: SocketClient, message: WebSocket.Data): void {
        if (typeof message !== 'string') {
            return;
        }

        let parsedMessage: MessageEnvelope;

        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            console.log('Failed to parse message JSON:', e);
            return;
        }

        const messageType = parsedMessage[0];

        switch(messageType) {
            case MESSAGE_TYPE.ACTION:
                this.handleActionMessage(client, parsedMessage as ActionMessageEnvelope);
                break;
            default:
                return;
        }
    }

    public handleActionMessage(client: SocketClient, actionMessageEnvelope: ActionMessageEnvelope): void {
        console.debug('@handleActionMessage', actionMessageEnvelope);

        const actionHandler = this._publicRegistry.getActionHandler(actionMessageEnvelope[1]);
        if (!actionHandler) return;

        const actionMessage: ActionMessage = actionMessageEnvelope.splice(0, 2);

        actionHandler.handle(client, actionMessage);
    }
}
