import { Newable } from './types';

export interface EntityEventHandlerFunction<F extends EntityEvent> {
    (entityEvent: F): void;
}

export interface EntityEventSubscription {
    entityEvent: Newable<EntityEvent>;
    handlerFunction: Function;
}

export abstract class EntityEvent
{
    private _isHandled = false;
    private _isPrevented = false;

    public handle(): void {
        this._isHandled = true;
    }

    public prevent(): void {
        this._isPrevented = true;
    }

    get isHandled(): boolean {
        return this._isHandled;
    }

    get isPrevented(): boolean {
        return this._isPrevented;
    }
}