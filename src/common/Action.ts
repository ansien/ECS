import { ActionMessage } from './types';

export abstract class Action
{
    abstract serialize(): ActionMessage;
    abstract deserialize(input: ActionMessage): void;
}