import { MetadataStorage } from './MetadataStorage';
import { Newable } from '../../../dist/types';
import { Action } from '../Action';

export interface EdosActionHandlerOptions {
    action: Newable<Action>;
}

export class EdosActionHandlerMetadata {
    constructor(public target: Function, public options: EdosActionHandlerOptions) {}
}

export function EdosActionHandler(options: EdosActionHandlerOptions) {
    return function (target: Function): void {
        const metadata = new EdosActionHandlerMetadata(target, options);
        MetadataStorage.getInstance().addActionHandlerMetadata(metadata);
    };
}