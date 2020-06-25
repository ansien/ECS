import { ActionEntryType } from '../../../src/common/Action';

export enum ACTION {
    HANDSHAKE
}

export interface Actions extends ActionEntryType {
    [ACTION.HANDSHAKE]: {
        JWT: string;
    }
}