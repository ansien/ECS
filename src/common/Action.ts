import { ActionMessage } from './MessageSerializer';

export abstract class Action
{
    private readonly _ID: number;

    protected constructor(ID: number) {
        this._ID = ID;
    }

    abstract serialize(): ActionMessage;
    abstract deserialize(input: ActionMessage): Action;

    get ID(): number {
        return this._ID;
    }
}