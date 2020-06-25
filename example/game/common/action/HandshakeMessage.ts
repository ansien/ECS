import { Action } from '../../../../src/common/Action';
import { ActionMessage } from '../../../../src/common/types';

export interface HandshakeMessageEnvelope extends ActionMessage {
    [1]: string;
}

export class HandshakeMessage extends Action
{
    JWT: string;

    constructor(JWT: string) {
        super(1);

        this.JWT = JWT;
    }

    serialize(): HandshakeMessageEnvelope {
        return [
            this.id,
            this.JWT
        ]
    }

    deserialize(input: HandshakeMessageEnvelope) {
        this.JWT = input[1];
    }
}