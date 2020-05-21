import { ActionHandler } from '../ActionHandler';

export class ActionHandlerRegistry
{
    private _actionHandlers: Map<number, ActionHandler> = new Map();

    public registerActionHandler(actionHandler: ActionHandler): void {
        this._actionHandlers.set(actionHandler.actionId, actionHandler);
    }

    get actionHandlers(): Map<number, ActionHandler> {
        return this._actionHandlers;
    }
}
