import { ActionHandler } from '../../../../src/server/master/ActionHandler';
import { SocketClient } from '../../../../src/server/master/WebSocketServer';
import { RoomRegistry } from '../../../../src/server/master/registry/RoomRegistry';
import { ConnectActionMessage } from '../../common/action/ConnectAction';
import { EdosActionHandler } from '../../../../src/common/metadata/EdosActionHandler';

@EdosActionHandler({ id: 1 })
export class ConnectActionHandler extends ActionHandler
{
    handle(client: SocketClient, message: ConnectActionMessage): void {
        // @TODO: Verify JWT, get user from DB, get room from user

        client.authenticated = true;

        const roomName = '123';

        RoomRegistry.joinRoom(client, roomName);
    };
}