import { MetadataStorage } from './MetadataStorage';

export interface EdosActionOptions {
    id: number;
}

export class EdosActionMetadata {
    constructor(public target: Function, public options: EdosActionOptions) {}
}

export function EdosAction(options: EdosActionOptions) {
    return function (target: Function): void {
        const metadata = new EdosActionMetadata(target, options);
        MetadataStorage.getInstance().addActionMetadata(metadata);
    };
}