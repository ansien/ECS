import * as t from 'io-ts';
import { ClientEngine } from '../../../src/client/ClientEngine';

const unchecked = <T>() => t.unknown as t.Type<T>;

export interface RuntimeClientRPCStructure {
    [name: string]: {
        request: t.Type<any>;
        response: t.Type<any>;
    };
}
export interface RuntimeClientMessagesStructure {
    [name: string]: t.Type<any>;
}
export interface RuntimeServerMessagesStructure {
    [name: string]: t.Type<any>;
}

export type RuntimeNamespaceSchema = {
    ServerMessages: RuntimeServerMessagesStructure;
    ClientMessages: RuntimeClientMessagesStructure;
    ClientRPCs: RuntimeClientRPCStructure;
};

export interface ClientRPCStructure {
    [name: string]: {
        request: any;
        response: any;
        error?: any;
    };
}

export type ToCompileTime<S extends RuntimeNamespaceSchema> = {
    ServerMessages: {
        [k in keyof S['ServerMessages']]: t.TypeOf<S['ServerMessages'][k]>;
    };
    ClientMessages: {
        [k in keyof S['ClientMessages']]: t.TypeOf<S['ClientMessages'][k]>;
    };
    ClientRPCs: {
        [k in keyof S['ClientRPCs']]: {
            request: t.TypeOf<S['ClientRPCs'][k]['request']>;
            response: t.TypeOf<S['ClientRPCs'][k]['response']>;
            error: unknown;
        };
    };
};

export interface ServerSchema {
    ClientMessages: any; // { [name: string]: any };
    ServerMessages: any; // { [name: string]: any };
    ClientRPCs: ClientRPCStructure;
}

export const runtimeSchema = {
    ServerMessages: {},
    ClientRPCs: {
        postMessage: {
            request: t.strict({
                message: t.string,
                channel: t.union([t.literal('en'), t.literal('ru')]),
            }),
            response: unchecked<"ok">(),
        },
    },
    ClientMessages: {},
};

const clientEngine = new ClientEngine<ToCompileTime<typeof runtimeSchema>>();

(async () => {
    // const connectResult = await clientEngine.connect('ws://127.0.0.1:3030');
    // console.log('@c', connectResult);

    const actionResponse = await clientEngine.emit('postMessage', {
        message: '123',
        channel: 'en'
    });

    console.log('@a', actionResponse);
})();