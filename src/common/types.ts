export enum MESSAGE_TYPE {
    ACTION
}

export interface MessageEnvelope extends Array<unknown> {
    [0]: MESSAGE_TYPE;
}

export interface ActionMessageEnvelope extends MessageEnvelope {
    [1]: number; // Action ID
}

export interface ActionMessage extends Array<unknown> {
    [0]: number; // Action ID
}