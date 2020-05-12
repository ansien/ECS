import { Map } from 'immutable';
import { Newable } from './types';
import { EntityEvent, EntityEventHandlerFunction, EntityEventSubscription } from './EntityEvent';

export abstract class Component
{
    private _eventSubscriptions: Map<string, EntityEventSubscription> = Map();

    abstract serialize(): string;
    abstract deserialize(serializedData: string): void;
    abstract allowMultiple: boolean;

    subscribeToEvent<P extends EntityEvent>(eventDefinition: Newable<P>, handlerFunction: EntityEventHandlerFunction<P>): void {
        this._eventSubscriptions = this._eventSubscriptions.set(eventDefinition.name, { entityEvent: eventDefinition, handlerFunction });
    }

    unsubscribeFromEvent(eventDefinition: Newable<EntityEvent>): void {
        this._eventSubscriptions = this._eventSubscriptions.remove(eventDefinition.name);
    }

    handleEvent(event: EntityEvent): void {
        const eventSubscription = this._eventSubscriptions.get(event.constructor.name);

        if (!eventSubscription) {
            return;
        }

        eventSubscription.handlerFunction(event);
    }

    get eventSubscriptions(): Map<string, EntityEventSubscription> {
        return this._eventSubscriptions;
    }
}