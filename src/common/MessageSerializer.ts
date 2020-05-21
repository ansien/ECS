import { Action } from './Action';

export enum MESSAGE_TYPE {
    ACTION
}

export interface MessageBase {
    [0]: MESSAGE_TYPE;
}

export interface ActionMessage extends MessageBase {
    [1]: number; // Action ID
}

export class MessageSerializer
{
    public static serializeAction(action: Action): string {
        const serializedAction = action.serialize();

        return JSON.stringify(serializedAction);
    }

    public static deserializeMessage(message: string): void {
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
