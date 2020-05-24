import { MetadataStorage } from './MetadataStorage';

export interface EdosActionValueOptions {
    interpolated: boolean;
}

export class EdosActionValueMetadata {
    constructor(public target: object, public propertyKey: string, public options: EdosActionValueOptions) {}
}

export function EdosActionValue(options: EdosActionValueOptions) {
    return function (target: object, propertyKey: string): void {
        const metadata = new EdosActionValueMetadata(target, propertyKey, options);
        MetadataStorage.getInstance().addActionValueMetadata(metadata);
    };
}