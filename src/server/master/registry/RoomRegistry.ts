import { SocketClient } from '../WebSocketServer';
import { Room } from '../../common/Room';

export class RoomRegistry
{
    private static _rooms: Map<string, Room> = new Map();

    public static joinRoom(client: SocketClient, roomName: string): void {
        let room = RoomRegistry.rooms.get(roomName)

        if (!room) {
            room = new Room();
            this._rooms.set(roomName, room);
        }

        room.addClient(client);
        client.room = roomName;
    }

    static get rooms(): Map<string, Room> {
        return this._rooms;
    }
}
