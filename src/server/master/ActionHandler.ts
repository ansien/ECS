import { SocketClient } from './WebSocketServer';
import { ActionMessage } from '../../common/types';

export abstract class ActionHandler
{
    abstract handle(client: SocketClient, messsage: ActionMessage): void;
}
