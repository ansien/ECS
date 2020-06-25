import { EdosActionMetadata } from './EdosAction';
import { Action } from '../Action';
import { EdosActionHandlerMetadata } from './EdosActionHandler';
import { Newable } from '../../../dist/types';
import { ActionHandler } from '../../server/master/ActionHandler';

export class MetadataStorage
{
    private static _instance: MetadataStorage;

    private _actionMetadatas = new Map<string, EdosActionMetadata>();
    private _actionHandlerMetadatas = new Map<string, EdosActionHandlerMetadata>();

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

    public addActionHandlerMetadata(metadata: EdosActionHandlerMetadata): void {
        if (this._actionHandlerMetadatas.has(metadata.target.name)) {
            throw new Error('Duplicate action handler definition.');
        }

        this._actionHandlerMetadatas.set(metadata.target.name, metadata);
    }

    public getActionMetadata(action: Newable<Action>): EdosActionMetadata | undefined {
        return this._actionMetadatas.get(action.name);
    }

    public getActionMetadataByInstance(action: Action): EdosActionMetadata | undefined {
        return this._actionMetadatas.get(action.constructor.name);
    }

    public getActionHandlerMetadata(handler: Newable<ActionHandler>): EdosActionHandlerMetadata | undefined {
        return this._actionHandlerMetadatas.get(handler.name);
    }
}