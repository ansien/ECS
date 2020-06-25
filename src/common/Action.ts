import { ActionMessage } from './types';

export type ActionEntryType = { [key: number]: object };

export abstract class Action
{
    private readonly _id: number;

    protected constructor(id: number) {
        this._id = id;
    }

    abstract serialize(): ActionMessage;
    abstract deserialize(input: ActionMessage): void;

    get id(): number {
        return this._id;
    }
}