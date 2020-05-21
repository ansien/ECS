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
}
