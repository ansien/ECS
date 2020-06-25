import WebSocket from 'ws';
import { ServerSchema } from '../../example/game/client';

// export type ClientSideSocketNS<N extends ServerSchema> = ClientSideSocketI<
//     N['ServerMessages'],
//     N['ClientMessages'],
//     N['ClientRPCs']
// >;

export class ClientEngine<S extends ServerSchema>
{
    private _wsConnection!: WebSocket;

    public async connect(wsServerUri: string): Promise<boolean> {
        this._wsConnection = new WebSocket(wsServerUri);

        return new Promise((resolve, reject) => {
            this._wsConnection.onopen = (): void => resolve(true);
            this._wsConnection.onclose = (): void => reject('Connection closed');
            this._wsConnection.onerror = (e): void => reject(`Connection error: ${e}`);
        })
    }

    public async emit<K extends keyof S['ClientRPCs']>(
        type: K,
        info: S['ClientRPCs'][K]['request'],
    ): Promise<S['ClientRPCs'][K]['response']> {
        console.log(info);

        return new Promise(() => {

        });
    }
}