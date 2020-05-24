import { MetadataStorage } from './MetadataStorage';
import { ActionHandler } from '../../server/master/ActionHandler';

export interface EdosActionHandlerOptions {
    id: number;
}

export class EdosActionHandlerMetadata {
    constructor(public target: ActionHandler, public options: EdosActionHandlerOptions) {}
}

export function EdosActionHandler(options: EdosActionHandlerOptions) {
    return function<T extends { new(): ActionHandler }>(ActionHandler: T): void {
        const metadata = new EdosActionHandlerMetadata(new ActionHandler(), options);
        MetadataStorage.getInstance().addActionHandlerMetadata(metadata);
    };
}