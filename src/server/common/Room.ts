import { SocketClient } from '../master/WebSocketServer';

export class Room
{
    private _connectedClients: Set<SocketClient> = new Set();

    public addClient(client: SocketClient): void {
        this._connectedClients.add(client);
    }
}
