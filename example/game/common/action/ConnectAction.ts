import { Action } from '../../../../src/common/Action';
import { ActionMessage, MESSAGE_TYPE } from '../../../../src/common/MessageSerializer';

export interface ConnectActionMessage extends ActionMessage {
    [2]: string;
}

export class ConnectAction extends Action
{
    JWT!: string;

    constructor(JWT: string) {
        super(1);

        this.JWT = JWT;
    }

    serialize(): ConnectActionMessage {
        return [
            MESSAGE_TYPE.ACTION,
            this.ID,
            this.JWT
        ]
    }

    deserialize(input: ConnectActionMessage): ConnectAction {
        this.JWT = input[2];

        return this;
    }
}