import WebSocket from 'ws';
import { SocketClient } from './WebSocketServer';
import { ActionMessage, ActionMessageEnvelope, MESSAGE_TYPE, MessageEnvelope } from '../../common/types';
import { MetadataStorage } from '../../common/metadata/MetadataStorage';

export class MessageHandler
{
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
        console.debug('@handleAction:', actionMessageEnvelope);

        const actionHandlerMetadata = MetadataStorage.getInstance().getActionHandlerMetadata(actionMessageEnvelope[1]);

        if (!actionHandlerMetadata) {
            return
        }

        const actionMessage: ActionMessage = actionMessageEnvelope.splice(0, 2);

        actionHandlerMetadata.target.handle(client, actionMessage);
    }
}
