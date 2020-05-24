import WebSocket from 'ws';
import { MessageSerializer } from './MessageSerializer';
import { Action } from '../common/Action';

export class ClientEngine
{
    private _wsConnection!: WebSocket;

    public async connect(masterWsServerUri: string): Promise<boolean> {
        this._wsConnection = new WebSocket(masterWsServerUri);

        return new Promise((resolve, reject) => {
            this._wsConnection.onopen = (): void => resolve(true);
            this._wsConnection.onclose = (): void => reject('Connection closed');
            this._wsConnection.onerror = (e): void => reject(`Connection error: ${e}`);
        })
    }

    public async sendAction(action: Action): Promise<boolean> {
        if (this._wsConnection.readyState !== WebSocket.OPEN) {
            return false;
        }

        const serializedAction = MessageSerializer.serializeAction(action);
        this._wsConnection.send(serializedAction);

        return true;
    }
}