import { ActionHandler } from '../../../../src/server/ActionHandler';
import { SocketClient } from '../../../../src/server/WebSocketServer';
import { ConnectActionMessage } from '../../common/action/ConnectAction';

export class ConnectActionHandler extends ActionHandler
{
    constructor() {
        super(1);
    }

    handle(client: SocketClient, message: ConnectActionMessage): void {
        client.authenticated = true;
        console.log('@ConnectActionHandler', message);
    }
}