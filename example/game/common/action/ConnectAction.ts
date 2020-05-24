import { EdosAction } from '../../../../src/common/metadata/EdosAction';
import { Action } from '../../../../src/common/Action';
import { ActionMessage } from '../../../../src/common/types';

export interface ConnectActionMessage extends ActionMessage {
    [0]: string;
}

@EdosAction({ id: 1 })
export class ConnectAction extends Action
{
    JWT!: string;

    constructor(JWT: string) {
        super();

        this.JWT = JWT;
    }

    serialize(): ConnectActionMessage {
        return [
            this.JWT
        ]
    }

    deserialize(input: ConnectActionMessage) {
        this.JWT = input[0];
    }
}