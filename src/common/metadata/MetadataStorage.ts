import { EdosActionMetadata } from './EdosAction';
import { EdosActionValueMetadata } from './EdosActionValue';
import { Action } from '../Action';
import { EdosActionHandlerMetadata } from './EdosActionHandler';

export class MetadataStorage
{
    private static _instance: MetadataStorage;

    private _actionMetadatas = new Map<string, EdosActionMetadata>();
    private _actionValueMetadatas = new Map<string, Map<string, EdosActionValueMetadata>>();
    private _actionHandlerMetadatas = new Map<number, EdosActionHandlerMetadata>();

    private constructor() {}

    public static getInstance(): MetadataStorage {
        if (!MetadataStorage._instance) {
            MetadataStorage._instance = new MetadataStorage();
        }

        return MetadataStorage._instance;
    }

    public addActionMetadata(metadata: EdosActionMetadata): void {
        if (this._actionMetadatas.has(metadata.target.name)) {
            throw new Error('Duplicate action definition.');
        }

        this._actionMetadatas.set(metadata.target.name, metadata);
    }

    public addActionValueMetadata(metadata: EdosActionValueMetadata): void {
        if (!this._actionValueMetadatas.has(metadata.target.constructor.name)) {
            this._actionValueMetadatas.set(metadata.target.constructor.name, new Map<string, EdosActionValueMetadata>())
        }

        const mapTarget = this._actionValueMetadatas.get(metadata.target.constructor.name);

        if (mapTarget) {
            mapTarget.set(metadata.propertyKey, metadata);
        }
    }

    public addActionHandlerMetadata(metadata: EdosActionHandlerMetadata): void {
        if (this._actionHandlerMetadatas.has(metadata.options.id)) {
            throw new Error('Duplicate action handler definition.');
        }

        console.log('@@@@@@', metadata.options.id, metadata);

        this._actionHandlerMetadatas.set(metadata.options.id, metadata);
    }

    public getActionMetadata(action: Action): EdosActionMetadata {
        const actionMetadata = this._actionMetadatas.get(action.constructor.name);

        if (!actionMetadata) {
            throw new Error('Could not find action.');
        }

        return actionMetadata;
    }

    public getActionMetadataById(id: number): EdosActionMetadata {
        let actionMetadata;

        this._actionMetadatas.forEach(metadata => {
            if (metadata.options.id === id) {
                actionMetadata = metadata;
            }
        })

        if (!actionMetadata) {
            throw new Error('Could not find action.');
        }

        return actionMetadata;
    }

    public getActionValueMetadatas(action: Action): Map<string, EdosActionValueMetadata> {
        const actionValueMetadatas = this._actionValueMetadatas.get(action.constructor.name);

        if (!actionValueMetadatas) {
            return new Map();
        }

        return actionValueMetadatas;
    }

    public getActionHandlerMetadata(id: number): EdosActionHandlerMetadata {
        console.log(this._actionHandlerMetadatas);

        const actionHandlerMetadata = this._actionHandlerMetadatas.get(id);

        if (!actionHandlerMetadata) {
            throw new Error('Could not find action handler.');
        }

        return actionHandlerMetadata;
    }
}