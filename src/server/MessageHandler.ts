import WebSocket from 'ws';
import { ActionMessage, MESSAGE_TYPE, MessageBase } from '../common/MessageSerializer';
import { WebSocketConnection } from './WebSocketServer';

export class MessageHandler
{
    public static handleMessage(connection: WebSocketConnection, message: WebSocket.Data): void {
        if (typeof message !== 'string') {
            return;
        }

        let parsedMessage: MessageBase;

        try {
            parsedMessage = JSON.parse(message);
        } catch (e) {
            console.debug('Failed to parse message JSON:', e);
            return;
        }

        const messageType = parsedMessage[0];

        switch(messageType) {
            case MESSAGE_TYPE.ACTION:
                this.handleActionMessage(parsedMessage as ActionMessage);
                break;
            default:
                return;
        }
    }

    public static handleActionMessage(actionMessage: ActionMessage) {
        console.log('@handleAction:', actionMessage);
    }
}
