import { Engine } from './Engine';

export abstract class System
{
    abstract onAttach(engine: Engine): void;
    abstract onDetach(engine: Engine): void;
    abstract update(delta: number): void;
}