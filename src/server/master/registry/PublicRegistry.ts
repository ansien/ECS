import { ActionHandler } from '../ActionHandler';
import { Newable } from '../../../../dist/types';
import { MetadataStorage } from '../../../common/metadata/MetadataStorage';
import { injectable as Injectable } from 'inversify';

export interface IPublicRegistry {
    registerActionHandler(Handler: Newable<ActionHandler>): void;
    getActionHandler(id: number): ActionHandler | undefined;
}

@Injectable()
export class PublicRegistry implements IPublicRegistry
{
    private _handlers: Map<number, ActionHandler> = new Map();

    public registerActionHandler(Handler: Newable<ActionHandler>): void {
        const handlerMetadata = MetadataStorage.getInstance().getActionHandlerMetadata(Handler);
        if (!handlerMetadata) throw new Error(`Provided handler ${Handler.name} is not registered.`);

        const Action = handlerMetadata.options.action;

        const actionMetadata = MetadataStorage.getInstance().getActionMetadata(Action);
        if (!actionMetadata) throw new Error(`Provided action ${Action.name} is not registered.`);

        const actionId = actionMetadata.options.id;

        if (this._handlers.has(actionId)) {
            throw new Error(`Handler for action with ID: ${actionId} is already registered`);
        }

        this._handlers.set(actionId, new Handler());
    }

    public getActionHandler(id: number): ActionHandler | undefined {
        return this._handlers.get(id);
    }
}